import { ITask } from "./task";
import { IUser } from "./user";

export interface ICreateTaskProps {
    onCreate: (newTask: ITask) => void;
    participants: IUser[];
  }
  