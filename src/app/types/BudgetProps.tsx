import { IBudgetCategories } from "./BudgetCategories";

export interface IBudgetProps {
  budget: {
    total: number;
    categories: IBudgetCategories;
    tripType: string;
  };
  onSave: (updatedBudget: unknown) => void;
}
