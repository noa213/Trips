import { IBudgetCategories } from "./BudgetCategories";
import { IMemory } from "./memory";
import { IPoll } from "./poll";
import { ITask } from "./task";
import { IUser } from "./user";
export interface ITrip {
  _id?: string;
  // adminUser:string| null | undefined;
  adminNmame:string| null | undefined;
  title: string
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
  };
  participants: Array<IUser>;
  tasks: Array<ITask>;
  polls: Array<IPoll>;
  memories: Array<IMemory>;
  image: string;
  status: "active" | "completed" | "cancelled";
}



