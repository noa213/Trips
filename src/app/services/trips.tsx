import axios from "axios";
import { ITrip } from "@/app/types/trip";

export const getTrips = async (): Promise<ITrip[]> => {
  try {
    const response = await axios.get("/api/trips");
    console.log("response get trips: ",response.data);
    
    return response.data.data;
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw new Error("Failed to fetch trips");
  }
};

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
  