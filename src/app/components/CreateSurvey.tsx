

'use client';

import React, { useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { sendSurvey } from '@/app/services/survey';
import { Option, Question, Survey } from "@/app/types/survy"

// import {sendSurvey} from "@/app/services/Survey"

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

// interface Survey {
//   id: number;
//   title: string;
//   questions: Question[];
//   status: 'open' | 'closed'; // חייב להיות אחד מהערכים הללו
// }

const Home = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [newSurveyTitle, setNewSurveyTitle] = useState('');
  const [currentSurveyId, setCurrentSurveyId] = useState<number | null>(null);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptionText, setNewOptionText] = useState('');
  const questionRefs = useRef<Map<number, HTMLDivElement>>(new Map()); // Map to hold refs for each question




  const handleSendSurvey = () => {

    sendSurvey(surveys, currentSurveyId);
  };



  // יצירת סקר חדש
  const createSurvey = () => {
    const newSurvey: Survey = {
      id: Date.now(),
      title: newSurveyTitle,
      questions: [],
      status: 'open',  // סטטוס ברירת מחדל
    };
    setSurveys([...surveys, newSurvey]);
    setNewSurveyTitle('');
    setCurrentSurveyId(newSurvey.id); // עובר לסקר החדש
  };

  // הוספת שאלה
  const addQuestion = () => {
    if (!newQuestionText || currentSurveyId === null) return;

    const newQuestion: Question = {
      id: Date.now(),
      questionText: newQuestionText,
      options: [],
    };

    const updatedSurveys = surveys.map((survey) =>
      survey.id === currentSurveyId
        ? { ...survey, questions: [...survey.questions, newQuestion] }
        : survey
    );

    setSurveys(updatedSurveys);
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
    if (!newOptionText || currentSurveyId === null) return;

    const updatedSurveys = surveys.map((survey) => {
      if (survey.id === currentSurveyId) {
        const updatedQuestions = survey.questions.map((question) =>
          question.id === questionId
            ? {
              ...question,
              options: [...question.options, { text: newOptionText, votes: 0 }],
            }
            : question
        );
        return { ...survey, questions: updatedQuestions };
      }
      return survey;
    });

    setSurveys(updatedSurveys);
    setNewOptionText('');
  };

  // הצבעה לאופציה
  const voteOption = (questionId: number, optionIndex: number) => {
    const updatedSurveys = surveys.map((survey) => {
      if (survey.id === currentSurveyId) {
        const updatedQuestions = survey.questions.map((question) => {
          if (question.id === questionId) {
            const updatedOptions = question.options.map((option, index) =>
              index === optionIndex ? { ...option, votes: option.votes + 1 } : option
            );
            return { ...question, options: updatedOptions };
          }
          return question;
        });
        return { ...survey, questions: updatedQuestions };
      }
      return survey;
    });

    setSurveys(updatedSurveys);
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


  return (
   
    <div className="container p-6">
      <h1 className="  text-3xl font-bold text-center mb-6">Voting System</h1>

      {currentSurveyId === null ? (
        <>
          <div>
            <input
              type="text"
              value={newSurveyTitle}
              onChange={(e) => setNewSurveyTitle(e.target.value)}
              className="border p-2"
              placeholder="Survey Title"
            />
            <button onClick={createSurvey} className="bg-[#9B111E] text-white p-2 ml-4">
              Create Survey
            </button>
          </div>
          <div className="mt-6">
            <h2 className="text-2xl mb-4">My Surveys</h2>
            {surveys.map((survey) => (
              <div key={survey.id} className="mb-4">
                <button
                  onClick={() => setCurrentSurveyId(survey.id)}
                  className="p-2 w-full text-left border bg-white"
                >
                  {survey.title}
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-2xl mb-4">
            Survey: {surveys.find((s) => s.id === currentSurveyId)?.title}
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

          {surveys
            .find((s) => s.id === currentSurveyId)
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
            onClick={handleSendSurvey}
            className="bg-green-500 text-white p-2 mt-6"
          >
            Send Survey via Email
          </button>



          <button
            onClick={() => setCurrentSurveyId(null)}
            className="bg-gray-500 text-white p-2 mt-6"
          >
            Back to Surveys
          </button>









        </div>
      )}

    </div>

  );
};

export default Home;
