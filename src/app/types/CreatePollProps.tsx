import { IPoll } from "./poll";

export interface ICreatePollProps {
    onCreate: (newPoll: IPoll) => void;
  }
  
  