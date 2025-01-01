// import axios from "axios";
// import { IMessage } from "../types/message";


// // export const getMessages = async (): Promise<IMessage[]> => {
// //     try {
// //       const response = await axios.get("/api/messages");
// //       console.log("response get messages: ",response.data);    
// //       return response.data;
// //     } catch (error) {
// //       console.error("Error fetching messages:", error);
// //       throw new Error("Failed to fetch messages");
// //     }
// //   };
  

// import React, { useEffect, useState, useRef } from "react";
// import { useSession } from "next-auth/react";
// import { Realtime } from "ably";




// // app.get("/api/chats/:channelName", async (req, res) => {
// //   const { channelName } = req.params;
// //   const chat = await ChatModel.findOne({ channelName }); // MongoDB
// //   if (!chat) {
// //     // אם הצ'אט לא קיים, צור חדש
// //     const newChat = await ChatModel.create({ channelName, messages: [] });
// //     return res.json(newChat);
// //   }
// //   res.json(chat);
// // });

// // app.post("/api/chats/:channelName/messages", async (req, res) => {
// //   const { channelName } = req.params;
// //   const { name, content } = req.body;

// //   const chat = await ChatModel.findOneAndUpdate(
// //     { channelName },
// //     { $push: { messages: { name, content } } },
// //     { new: true, upsert: true }
// //   );

// //   res.json(chat);
// // });