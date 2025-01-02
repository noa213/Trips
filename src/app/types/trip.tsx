import { IBudgetCategories } from "./BudgetCategories";
import { IImage } from "./image";
import { IMemory } from "./memory";
import { IPoll } from "./poll";
import { ITask } from "./task";
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
  participants: Array<{
    email: string;
    name:string;
  }>;
  tasks: Array<ITask>;
  polls: Array<IPoll>;
  memories: Array<IMemory>;
  image: string;
  status: "active" | "completed" | "cancelled";
  images: Array<IImage>;
}



