import axios from "axios";
import { ITask } from "../types/task";

export const updateTask = async (task: ITask): Promise<void> => {
    try {  
      console.log("updateTask", task);
        
      const response = await axios.put(`/api/tasks`, task);
      console.log("Tasks updated successfully:", response.data);
      // return response.data;
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Failed to update task");
    }
  };
  