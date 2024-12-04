

'use client';

import React, { useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { sendPoll } from '@/app/services/polls';
import { Option, Question, IPoll } from "@/app/types/poll"
import CreateTripDialog from '@/app/components/CreateTripDialog'


// import {sendPoll} from "@/app/services/Poll"

ChartJS.register(CategoryScale, LinearScale, BarElement);

// interface Option {
//   text: string;
//   votes: number;
// }

// interface Question {
//   id: number;
//   questionText: string;
//   options: Option[];
// }

// interface Poll {
//   id: number;
//   title: string;
//   questions: Question[];
//   status: 'open' | 'closed'; // חייב להיות אחד מהערכים הללו
// }

const CreatePoll = () => {
  const [polls, setPolls] = useState<IPoll[]>([]);
  const [newPollTitle, setNewPollTitle] = useState('');
  const [currentPollId, setCurrentPollId] = useState<number | null>(null);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptionText, setNewOptionText] = useState('');
  const questionRefs = useRef<Map<number, HTMLDivElement>>(new Map()); // Map to hold refs for each question
  const [showCreateTripDialog, setshowCreateTripDialog] = useState(false);
  const currentPoll = polls.find(poll => poll.id === currentPollId);


  const handleSendPoll = () => {

    sendPoll(polls, currentPollId);
  };



  // יצירת סקר חדש
  const createPoll = () => {
    const newPoll: IPoll = {
      id: Date.now(),
      title: newPollTitle,
      questions: [],
      status: 'open',  // סטטוס ברירת מחדל
    };
    setPolls([...polls, newPoll]);
    setNewPollTitle('');
    setCurrentPollId(newPoll.id); // עובר לסקר החדש
  };

  // הוספת שאלה
  const addQuestion = () => {
    if (!newQuestionText || currentPollId === null) return;

    const newQuestion: Question = {
      id: Date.now(),
      questionText: newQuestionText,
      options: [],
    };

    const updatedPolls = polls.map((poll) =>
      poll.id === currentPollId
        ? { ...poll, questions: [...poll.questions, newQuestion] }
        : poll
    );

    setPolls(updatedPolls);
    setNewQuestionText('');

    // גלילה אל השאלה החדשה לאחר עדכון ה-state
    setTimeout(() => {
      const newQuestionRef = questionRefs.current.get(newQuestion.id);
      if (newQuestionRef) {
        newQuestionRef.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // מאפשר ל-React לעדכן את ה-DOM
  };

  // הוספת אופציה לשאלה
  const addOption = (questionId: number) => {
    if (!newOptionText || currentPollId === null) return;

    const updatedPolls = polls.map((poll) => {
      if (poll.id === currentPollId) {
        const updatedQuestions = poll.questions.map((question) =>
          question.id === questionId
            ? {
              ...question,
              options: [...question.options, { text: newOptionText, votes: 0 }],
            }
            : question
        );
        return { ...poll, questions: updatedQuestions };
      }
      return poll;
    });

    setPolls(updatedPolls);
    setNewOptionText('');
  };

  // הצבעה לאופציה
  const voteOption = (questionId: number, optionIndex: number) => {
    const updatedPolls = polls.map((poll) => {
      if (poll.id === currentPollId) {
        const updatedQuestions = poll.questions.map((question) => {
          if (question.id === questionId) {
            const updatedOptions = question.options.map((option, index) =>
              index === optionIndex ? { ...option, votes: option.votes + 1 } : option
            );
            return { ...question, options: updatedOptions };
          }
          return question;
        });
        return { ...poll, questions: updatedQuestions };
      }
      return poll;
    });

    setPolls(updatedPolls);
  };

  // הצגת גרף
  const renderChart = (options: Option[]) => {
    const data = {
      labels: options.map((option) => option.text),
      datasets: [
        {
          label: 'Votes',
          data: options.map((option) => option.votes),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
      ],
    };

    return <Bar data={data} />;
  };

  // console.log("EMAIL_USER:", process.env.EMAIL_USER);




  


  const backToCreateTripDialog = () => {
    setshowCreateTripDialog(!showCreateTripDialog);
  };

  if (showCreateTripDialog) {
    return <CreateTripDialog poll={currentPoll} />;
  }


  return (

    <div className="container p-6">
      <h1 className="  text-3xl font-bold text-center mb-6">Voting System</h1>

      {currentPollId === null ? (
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
              className="bg-[#9B111E] text-white p-2 ml-4">
              Create Poll
            </button>

            <button
              className="bg-[#9B111E] text-white p-2 ml-4"
              onClick={backToCreateTripDialog}>
              Back
            </button>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl mb-4">My Polls</h2>
            {polls.map((poll) => (
              <div key={poll.id} className="mb-4">
                <button
                  onClick={() => setCurrentPollId(poll.id)}
                  className="p-2 w-full text-left border bg-white"
                >
                  {poll.title}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-2xl mb-4">
            Poll: {polls.find((s) => s.id === currentPollId)?.title}
          </h2>

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

          {polls
            .find((s) => s.id === currentPollId)
            ?.questions.map((question) => (
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
            onClick={() => setCurrentPollId(null)}
            className="bg-gray-500 text-white p-2 mt-6"
          >
            Back to pools
          </button>









        </div>
      )}

    </div>

  );
};

export default CreatePoll;



