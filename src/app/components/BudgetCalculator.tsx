import { IBudgetCategories } from "@/app/types/BudgetCategories"; // ייבוא הטיפוס המתאים

const BudgetCalculator = (
  totalBudget: number,
  tripType: string
): IBudgetCategories => {
  let categories: IBudgetCategories;

  switch (tripType) {
    case "urban":
      categories = {
        transportation: 35,
        accommodation: 25,
        food: 20,
        activities: 15,
        misc: 5,
      };
      break;
    case "nature":
      categories = {
        transportation: 25,
        accommodation: 20,
        food: 15,
        activities: 30,
        misc: 10,
      };
      break;
    case "family":
      categories = {
        transportation: 30,
        accommodation: 25,
        food: 25,
        activities: 15,
        misc: 5,
      };
      break;
    default:
      categories = {
        transportation: 30,
        accommodation: 25,
        food: 20,
        activities: 20,
        misc: 5,
      };
  }

  return Object.entries(categories).reduce((acc, [category, percentage]) => {
    acc[category as keyof IBudgetCategories] = (totalBudget * percentage) / 100;
    return acc;
  }, {} as IBudgetCategories);
};

export default BudgetCalculator;
