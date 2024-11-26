import axios from "axios";
import { ITrip } from "@/app/types/trip";

export const addTrip = async (newTrip: ITrip): Promise<ITrip> => {
    try {
      const response = await axios.post("/api/trips", newTrip);
      // console.log(response.data.newTrip);
      return response.data.newTrip;
    } catch (error) {
      console.error("Error adding trip:", error);
      throw new Error("Failed to add trip");
    }
  };
  