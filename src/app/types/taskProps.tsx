import { ITask } from "./task";
import { IUser } from "./user";

export interface ITasksProps {
  tasksList: ITask[];
  participants: IUser[];
}
