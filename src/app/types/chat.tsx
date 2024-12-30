import { IMessage } from "./message";

export interface IChat {
    tripId: string;        
    messages: IMessage[]; 
  }