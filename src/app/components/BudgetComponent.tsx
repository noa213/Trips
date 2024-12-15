// import { useState } from "react";
// import { MdModeEdit } from "react-icons/md";
import { IBudgetCategories } from "../types/BudgetCategories";
import BudgetCalculator from "./BudgetCalculator";
import { IBudgetProps } from "../types/BudgetProps";
import EditableField from "./EditableField";

const BudgetComponent: React.FC<IBudgetProps> = ({ budget, onSave }) => {
  const handleSave = (field: string, value: string) => {
    const updatedBudget = { ...budget };
    if (field === "total") {
      updatedBudget.total = parseFloat(value);
      updatedBudget.categories = BudgetCalculator(
        updatedBudget.total,
        budget.tripType
      );
    } else if (field.startsWith("categories.")) {
      const categoryKey = field.split(".")[1];
      updatedBudget.categories[categoryKey as keyof IBudgetCategories] =
        parseFloat(value);
    }
    onSave(updatedBudget);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Budget Details</h2>

      {/* Total Budget */}
      <div className="flex items-center justify-between mb-4">
        <EditableField
          label="Total Budget"
          value={budget.total.toString()}
          field="total"
          onSave={handleSave}
          inputType="number"
        />
      </div>

      {/* Budget Categories */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Categories</h3>
        {Object.entries(budget.categories).map(([category, amount], index) => (
          <div className="flex items-center justify-between mb-2" key={index}>
            <EditableField
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              value={amount.toString()}
              field={`categories.${category}`}
              onSave={handleSave}
              inputType="number"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetComponent;
