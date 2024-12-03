import { IBudgetCategories } from "./BudgetCategories";
import { IMemory } from "./memory";
import { IPoll } from "./poll";
import { ITask } from "./task";
export interface ITrip {
  _id?: string;
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
  tasks: Array<ITask>;
  polls: Array<IPoll>;
  memories: Array<IMemory>;
  status: "active" | "completed" | "cancelled";
}
