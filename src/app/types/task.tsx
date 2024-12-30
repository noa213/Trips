export interface ITask {
  taskId: string;
  title: string;
  assignedTo: string;
  status: "not started" | "in progress" | "completed";
  dueDate: Date;
}
