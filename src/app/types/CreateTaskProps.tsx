import { ITask } from "./task";

export interface ICreateTaskProps {
    onCreate: (newTask: ITask) => void;
    participants: string[];
  }
  