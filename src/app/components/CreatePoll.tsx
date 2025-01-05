"use client";
import React, { useState } from "react";
import { ICreatePollProps } from "../types/CreatePollProps";
import { IPoll } from "../types/poll";

const CreatePoll: React.FC<ICreatePollProps> = ({ onCreate }) => {
  const [poll, setPoll] = useState<Omit<IPoll, "pollId">>({
    question: "",
    status: "open",
    options: [
      { value: "", votes: 0 },
      { value: "", votes: 0 },
    ],
  });

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoll((prevPoll) => ({ ...prevPoll, question: e.target.value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...poll.options];
    updatedOptions[index].value = value;
    setPoll((prevPoll) => ({ ...prevPoll, options: updatedOptions }));
  };

  const handleAddOption = () => {
    setPoll((prevPoll) => ({
      ...prevPoll,
      options: [...prevPoll.options, { value: "", votes: 0 }],
    }));
  };

  const handleRemoveOption = (index: number) => {
    if (poll.options.length > 2) {
      setPoll((prevPoll) => ({
        ...prevPoll,
        options: prevPoll.options.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPoll: IPoll = {
      pollId: `poll-${Date.now()}`,
      ...poll,
    };
    onCreate(newPoll);
    setPoll({
      question: "",
      status: "open",
      options: [
        { value: "", votes: 0 },
        { value: "", votes: 0 },
      ],
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-lg shadow-md border max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Create New Poll</h2>

      {/* Question Input */}
      <div className="mb-4">
        <label
          htmlFor="question"
          className="block text-sm font-medium text-gray-700"
        >
          Question
        </label>
        <input
          type="text"
          id="question"
          value={poll.question}
          onChange={handleQuestionChange}
          className="border rounded w-full px-3 py-2 mt-1"
          placeholder="Enter poll question"
        />
      </div>

      {/* Options Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Options
        </label>
        {poll.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={option.value}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="border rounded w-full px-3 py-2"
              placeholder={`Option ${index + 1}`}
            />
            {poll.options.length > 2 && (
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddOption}
          className="mt-2 text-blue-500 hover:text-blue-700"
        >
          + Add Option
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Poll
      </button>
    </form>
  );
};

export default CreatePoll;
