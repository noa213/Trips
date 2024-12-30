import mongoose, { Model, Schema } from "mongoose";
import { IChat } from "@/app/types/chat";

const chats: Schema<IChat> = new Schema({
  tripId: { type: String, required: true }, // מזהה הטיול
  messages: [
    {
      name: { type: String, required: true },
      content: { type: String, required: true }
    }
  ]
});

const Chat: Model<IChat> =
  mongoose.models.Chat || mongoose.model<IChat>("Chat", chats);

export default Chat;
