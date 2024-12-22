import mongoose, { Model, Schema } from "mongoose";
import { IMessage } from "@/app/types/message";

const messages: Schema<IMessage> = new Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
  });
  

  const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messages);

  
export default Message;