"use client";
import React, { useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { sendPoll } from "@/app/services/polls";
import { Option, Question, IPoll } from "@/app/types/poll";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const CreatePoll = () => {
  const [poll, setPoll] = useState<IPoll>({
    id: Date.now(),
    title: "newPollTitle",
    questions: [],
    status: "open",
  });
  const [newPollTitle, setNewPollTitle] = useState("");
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newOptionText, setNewOptionText] = useState("");
  const questionRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const [showCreateTripDialog, setshowCreateTripDialog] = useState(false);

  const handleSendPoll = () => {
    sendPoll(poll);
  };

  const createPoll = () => {
    const newPoll: IPoll = {
      id: Date.now(),
      title: newPollTitle,
      questions: [],
      status: "open",
    };
    setPoll(newPoll);
    setNewPollTitle("");
  };

  const addQuestion = () => {
    if (!newQuestionText || !poll.id) return;

    const newQuestion: Question = {
      id: Date.now(),
      questionText: newQuestionText,
      options: [],
    };

    setPoll((prevPoll) => ({
      ...prevPoll,
      questions: [...prevPoll.questions, newQuestion],
    }));

    setNewQuestionText("");

    setTimeout(() => {
      const newQuestionRef = questionRefs.current.get(newQuestion.id);
      if (newQuestionRef) {
        newQuestionRef.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const addOption = (questionId: number) => {
    if (!newOptionText || !poll.id) return;

    const updatedPoll = {
      ...poll,
      questions: poll.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: [...question.options, { text: newOptionText, votes: 0 }],
            }
          : question
      ),
    };

    setPoll(updatedPoll);
    setNewOptionText("");
  };

  const voteOption = (questionId: number, optionIndex: number) => {
    const updatedPoll = {
      ...poll,
      questions: poll.questions.map((question) => {
        if (question.id === questionId) {
          const updatedOptions = question.options.map((option, index) =>
            index === optionIndex
              ? { ...option, votes: option.votes + 1 }
              : option
          );
          return { ...question, options: updatedOptions };
        }
        return question;
      }),
    };

    setPoll(updatedPoll);
  };

  const renderChart = (options: Option[]) => {
    const data = {
      labels: options.map((option) => option.text),
      datasets: [
        {
          label: "Votes",
          data: options.map((option) => option.votes),
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
      ],
    };

    return <Bar data={data} />;
  };

  const backToCreateTripDialog = () => {
    setshowCreateTripDialog(true);
    console.log({ poll });
  };

  if (!poll)
    return <div>No poll selected. Please go back and select a poll.</div>;

  if (showCreateTripDialog) return;
  // <CreateTripDialog />

  return (
    <div className="container p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Voting System</h1>

      {!poll.id ? (
        <>
          <div>
            <input
              type="text"
              value={newPollTitle}
              onChange={(e) => setNewPollTitle(e.target.value)}
              className="border p-2"
              placeholder="Poll Title"
            />
            <button
              onClick={createPoll}
              className="bg-[#9B111E] text-white p-2 ml-4"
            >
              Create Poll
            </button>
            <button
              className="bg-[#9B111E] text-white p-2 ml-4"
              onClick={backToCreateTripDialog}
            >
              Back
            </button>
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-2xl mb-4">Poll: {poll.title}</h2>

          <div>
            <input
              type="text"
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              className="border p-2"
              placeholder="Add a question"
            />
            <button
              onClick={addQuestion}
              className="bg-[#9B111E] text-white p-2 ml-4"
            >
              Add Question
            </button>
          </div>

          {poll.questions.map((question) => (
            <div
              key={question.id}
              className="mt-6"
              ref={(el) => {
                if (el) {
                  questionRefs.current.set(question.id, el);
                }
              }}
            >
              <h3 className="text-xl">{question.questionText}</h3>
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mt-2"
                >
                  <p>{option.text}</p>
                  <button
                    onClick={() => voteOption(question.id, index)}
                    className="bg-blue-500 text-white p-2"
                  >
                    Vote
                  </button>
                </div>
              ))}
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  value={newOptionText}
                  onChange={(e) => setNewOptionText(e.target.value)}
                  className="border p-2"
                  placeholder="Add option"
                />
                <button
                  onClick={() => addOption(question.id)}
                  className="bg-[#9B111E] text-white p-2 ml-4"
                >
                  Add Option
                </button>
              </div>
              <div className="mt-4">{renderChart(question.options)}</div>
            </div>
          ))}

          <button
            onClick={handleSendPoll}
            className="bg-green-500 text-white p-2 mt-6"
          >
            Send poll via Email
          </button>

          <button
            onClick={() => backToCreateTripDialog()}
            className="bg-gray-500 text-white p-2 mt-6"
          >
            Back to CreateTripDialog
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatePoll;
