import { IUser } from "./user";

export interface ITask {
  _id?: string;
  taskId: string;
  title: string;
  assignedTo: IUser | null;
  status: "not started" | "in progress" | "completed";
  dueDate: Date;
}
