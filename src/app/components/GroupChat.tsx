






import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { IMessage } from "@/app/types/message";
import { getMessages } from "../services/messages";

const GroupChat: React.FC = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMessages();
        setMessages(response);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchData();
  }, [setMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault(); // מונע התנהגות ברירת מחדל
    if (inputValue.trim() && session?.user?.name) {
      setMessages((prev) => [
        ...prev,
        { name: session?.user?.name || "Anonymous", content: inputValue },
      ]);

      try {
        await axios.post("/api/messages", {
          name: session?.user?.name || "Anonymous",
          content: inputValue,
        });
      } catch (error) {
        console.error("Error while saving message:", error);
      }

      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
      {/* <div className="p-6 bg-gradient-to-r from-teal-500 to-blue-600 text-white"> */}
      <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white">

        <h2 className="text-2xl font-bold text-center">📢 Group Chat</h2>
      </div>
      <div className="p-4 h-80 overflow-y-auto bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.name === session?.user?.name ? "text-right" : "text-left"
            }`}
          >
            <span  className="block text-gray-600">
              {msg.name ? msg.name : "Anonymous"}
            </span>
            <span className="font-semibold text-gray-700">{msg.content}</span>
           
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-gray-200 flex items-center">
        <input
          type="text"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={(e) => sendMessage(e)}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;





