import axios from "axios";
import { IMessage } from "../types/message";


export const getMessages = async (): Promise<IMessage[]> => {
    try {
      const response = await axios.get("/api/messages");
      console.log("response get messages: ",response.data);    
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw new Error("Failed to fetch messages");
    }
  };
  