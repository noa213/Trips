import axios from "axios";
import { ITrip } from "@/app/types/trip";

export const getTrips = async (): Promise<ITrip[]> => {
  try {
    const response = await axios.get("/api/trips");
    console.log("response get trips: ",response.data);    
    return response.data;
  } catch (error) {
    console.error("Error fetching trips:", error);
    throw new Error("Failed to fetch trips");
  }
};

export const getTrip = async (id: string): Promise<ITrip> => {
  try {
    const response = await axios.get(`/api/trips/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trip:", error);
    throw new Error("Failed to fetch trips");
  }
};

export const addTrip = async (newTrip: ITrip): Promise<ITrip> => {
    try {
      const response = await axios.post("/api/trips", newTrip);
      return response.data.newTrip;
    } catch (error) {
      console.error("Error adding trip:", error);
      throw new Error("Failed to add trip");
    }
  };
  
  export const updateTrip = async (updateTrip: ITrip): Promise<ITrip> => {
    try {
      const response = await axios.put(`/api/trips/${updateTrip._id}`, updateTrip);
      return response.data;
    } catch (error) {
      console.error("Error updating trip:", error);
      throw new Error("Failed to update trip");
    }
  };
  