import { IBudgetCategories } from "./BudgetCategories";
export interface ITrip {
  title: string;
  destination: string;
  dates: {
    start: Date;
    end: Date;
  };
  budget: {
    total: number;
    // spent: number;
    categories: IBudgetCategories;
    tripType: "urban" | "nature" | "family";
    participants: Array<{
      userId: string;
      share: number;
    }>;
  };
  tasks: Array<{
    taskId: string;
    title: string;
    assignedTo: string;
    status: "notStarted" | "inProgress" | "completed";
    dueDate: Date;
  }>;
  polls: Array<{
    pollId: string;
    question: string;
    options: Array<{
      option: string;
      votes: number;
    }>;
    status: "open" | "closed";
  }>;
  memories: Array<{
    imageUrl: string;
    description: string;
    userId: string;
    timestamp: Date;
  }>;
  status: "active" | "completed" | "cancelled";
}
