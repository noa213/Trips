

'use client';

import React, { useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { sendPoll } from '@/app/services/polls';
import { Option, Question, IPoll } from "@/app/types/poll";
// import { ITrip } from '../types/trip';

ChartJS.register(CategoryScale, LinearScale, BarElement);

interface CreatePollProps {
  poll: IPoll;
  onPollUpdate: (updatedPoll: IPoll) => void;
}

const CreatePoll: React.FC<CreatePollProps> = ({ poll, onPollUpdate }) => {
  const [newPoll, setNewPoll] = useState<IPoll>(poll);
  const [newPollTitle, setNewPollTitle] = useState(poll.title || ''); // אם יש כותרת בסקר, נשתמש בה
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptionText, setNewOptionText] = useState('');
  const questionRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  
  const handleSendPoll = () => {
    sendPoll(newPoll); // שליחה עם ה-poll המעודכן
  };

  const addQuestion = () => {
    if (!newQuestionText) return;

    const newQuestion: Question = {
      id: Date.now(),
      questionText: newQuestionText,
      options: [],
    };

    setNewPoll((prevPoll) => ({
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
    if (!newOptionText) return;

    const updatedPoll = {
      ...newPoll, // עבודה עם ה-state המקומי newPoll
      questions: newPoll.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: [...question.options, { text: newOptionText, votes: 0 }],
            }
          : question
      ),
    };

    setNewPoll(updatedPoll);
    setNewOptionText('');
  };

  const voteOption = (questionId: number, optionIndex: number) => {
    const updatedPoll = {
      ...newPoll, // עבודה עם ה-state המקומי newPoll
      questions: newPoll.questions.map((question) => {
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

    setNewPoll(updatedPoll);
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

  const backSendPoll = () => {
    onPollUpdate(newPoll); // שליחה של ה-poll המעודכן להורה
  };

  const handlePollTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPollTitle(e.target.value);
    setNewPoll((prevPoll) => ({
      ...prevPoll,
      title: e.target.value, // עדכון כותרת הסקר
    }));
  };

  return (
    <div className="container p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Voting System</h1>

      <div>
        {/* ה-input של כותרת הסקר */}
        <input
          type="text"
          value={newPollTitle}
          onChange={handlePollTitleChange}
          className="border p-2"
          placeholder="Poll Title"
        />
      </div>

      <div>
        <input
          type="text"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
          className="border p-2"
          placeholder="Add a question"
        />
        <button onClick={addQuestion} className="bg-[#9B111E] text-white p-2 ml-4">
          Add Question
        </button>
      </div>

      {newPoll.questions.map((question) => (
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
            <div key={index} className="flex items-center justify-between mt-2">
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
        onClick={backSendPoll}
        className="bg-gray-500 text-white p-2 mt-6"
      >
        Back to CreateTripDialog
      </button>
    </div>
  );
};

export default CreatePoll;
