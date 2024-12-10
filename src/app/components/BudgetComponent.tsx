import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { IBudgetCategories } from "../types/BudgetCategories";
import BudgetCalculator from "./BudgetCalculator";
import { IBudgetProps } from "../types/BudgetProps";

const BudgetComponent: React.FC<IBudgetProps> = ({ budget, onSave }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [updatedValue, setUpdatedValue] = useState<string>("");

  const handleEditClick = (field: string, value: string) => {
    setEditingField(field);
    setUpdatedValue(value);
  };

  const handleSave = () => {
    const updatedBudget = { ...budget };
    if (editingField === "total") {
      updatedBudget.total = parseFloat(updatedValue);
      updatedBudget.categories = BudgetCalculator(updatedBudget.total, budget.tripType);
    } else if (editingField?.startsWith("categories.")) {
      const categoryKey = editingField.split(".")[1];
      updatedBudget.categories[categoryKey as keyof IBudgetCategories] =
        parseFloat(updatedValue);
    }
    onSave(updatedBudget);
    setEditingField(null);
    setUpdatedValue("");
  };

  return (
    <div className="budget-detail p-6 rounded-lg shadow-lg border max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Budget Details</h2>

      {/* Total Budget */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-600 font-bold">Total Budget:</span>
        {editingField === "total" ? (
          <>
            <input
              className="border p-2 rounded w-full"
              type="number"
              value={updatedValue}
              onChange={(e) => setUpdatedValue(e.target.value)}
            />
            <button
              onClick={handleSave}
              className="ml-2 px-3 py-2 bg-green-500 text-white rounded"
            >
              Save
            </button>
          </>
        ) : (
          <>
            <span>${budget.total}</span>
            <MdModeEdit
              onClick={() => handleEditClick("total", budget.total.toString())}
              className="cursor-pointer text-blue-500 ml-2"
            />
          </>
        )}
      </div>

      {/* Budget Categories */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Categories</h3>
        {Object.entries(budget.categories).map(([category, amount], index) => (
          <div className="flex items-center justify-between mb-2" key={index}>
            <span className="text-gray-600 font-bold capitalize">
              {category}:
            </span>
            {editingField === `categories.${category}` ? (
              <>
                <input
                  className="border p-2 rounded w-full"
                  type="number"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                />
                <button
                  onClick={handleSave}
                  className="ml-2 px-3 py-2 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>${amount}</span>
                <MdModeEdit
                  onClick={() =>
                    handleEditClick(`categories.${category}`, amount.toString())
                  }
                  className="cursor-pointer text-blue-500 ml-2"
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetComponent;
