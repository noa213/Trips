export interface ITask {
  _id?: string;
  taskId: string;
  title: string;
  assignedTo: string;
  status: "not started" | "in progress" | "completed";
  dueDate: Date;
}
