export interface ITask {
  taskId: string;
  title: string;
  assignedTo: string;
  status: "notStarted" | "inProgress" | "completed";
  dueDate: Date;
}
