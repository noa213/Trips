

// import React, { useEffect, useState, useRef } from "react";
// import { useSession } from "next-auth/react";
// import { Realtime } from "ably";
// import axios from "axios";
// import { IMessage } from "@/app/types/message";

// // יצירת מופע של Realtime
// const ably = new Realtime({
//   key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
// });

// interface GroupChatProps {
//   tripId: string; // מזהה הטיול (ID של MongoDB)
// }

// const GroupChat: React.FC<GroupChatProps> = ({ tripId }) => {
 
  
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const [inputValue, setInputValue] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement | null>(null);


//   // ערוץ Ably
 
  
//   const channel = ably.channels.get(tripId); // השתמש ב-ID של הטיול

//   // שמירת צ'אט חדש ושליפת הודעות קיימות
//   useEffect(() => {
//     const initializeChat = async () => {
//       try {
    
//         const response = await axios.get(`/api/messages/${tripId}`);
  
//         if (response.data.messages) {
//           setMessages(response.data.messages);
//         } else {
//           console.log("No chat found for this trip");
//         }
//       } catch (error) {
//         console.error("Error initializing chat:", error);
//       }
//     };
//     initializeChat();
//   }, [tripId]);

//   // האזנה להודעות חדשות בערוץ
//   useEffect(() => {
//     channel.subscribe("message", (message) => {
//       setMessages((prev) => [
//         ...prev,
//         { name: message.data.name, content: message.data.content },
//       ]);
//     });

//     return () => {
//       channel.unsubscribe("message");
//     };
//   }, [channel]);

//   // שליחת הודעה
//   const sendMessage = async (e?: React.MouseEvent<HTMLButtonElement>) => {
//     if (e) e.preventDefault();
//     if (inputValue.trim() && session?.user?.name) {
//       const newMessage = {
//         name: session?.user?.name || "Anonymous",
//         content: inputValue,
//       };

//       // עדכון הודעות מקומי
//       // setMessages((prev) => [...prev, newMessage]);

//       // שליחת ההודעה לערוץ Ably
//       channel.publish("message", newMessage);

//       // שמירת ההודעה בשרת
//       try {
//         const response = await axios.post(`/api/messages/${tripId}`, {
//           tripId:tripId,
//           name: newMessage.name,
//           content: newMessage.content,
//         });
    
        

//         // טיפול בתשובה לאחר שליחה
//         if (response.data.message) {
//           console.log(response.data.message);
//         }
//       } catch (error) {
//         console.error("Error saving message:", error);
//       }

//       setInputValue(""); // ניקוי שדה
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
//       <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
//         <h2 className="text-2xl font-bold text-center">📢 Group Chat</h2>
//       </div>
//       <div className="p-4 h-80 overflow-y-auto bg-gray-50">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`mb-4 ${msg.name === session?.user?.name ? "text-right" : "text-left"}`}
//           >
//             <span className="font-semibold text-gray-700">{msg.name || "Anonymous"}</span>
//             <span className="block text-gray-600">{msg.content}</span>
            
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>
//       <div className="p-4 bg-gray-200 flex items-center">
//         <input
//           type="text"
//           className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Type your message..."
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//         <button
//           onClick={(e) => sendMessage(e)}
//           className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default GroupChat;


























import React, { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Realtime } from "ably";
import axios from "axios";
import { IMessage } from "@/app/types/message";

const ably = new Realtime({
  key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
});

interface GroupChatProps {
  tripId: string; // מזהה הטיול (ID של MongoDB)
}

const GroupChat: React.FC<GroupChatProps> = ({ tripId }) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const channel = ably.channels.get(tripId);

  useEffect(() => {
    const initializeChat = async () => {
      try {
        const response = await axios.get(`/api/messages/${tripId}`);
        if (response.data.messages) {
          setMessages(response.data.messages);
        } else {
          console.log("No chat found for this trip");
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };
    initializeChat();
  }, [tripId]);

  // האזנה להודעות חדשות בערוץ
  useEffect(() => {
    channel.subscribe("message", (message) => {
      setMessages((prev) => [
        ...prev,
        { name: message.data.name, content: message.data.content },
      ]);
    });

    return () => {
      channel.unsubscribe("message");
    };
  }, [channel]);

  // גלילה אוטומטית לסוף הרשימה
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) e.preventDefault();
    if (inputValue.trim() && session?.user?.name) {
      const newMessage = {
        name: session?.user?.name || "Anonymous",
        content: inputValue,
      };

      channel.publish("message", newMessage);

      try {
        await axios.post(`/api/messages/${tripId}`, {
          tripId,
          name: newMessage.name,
          content: newMessage.content,
        });
      } catch (error) {
        console.error("Error saving message:", error);
      }

      setInputValue(""); // ניקוי שדה
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
            <span className="font-semibold text-gray-700">
              {msg.name || "Anonymous"}
            </span>
            <span className="block text-gray-600">{msg.content}</span>
          </div>
        ))}
        {/* אלמנט שמסמן את סוף הרשימה */}
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













