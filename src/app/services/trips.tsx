import axios from "axios";
import { ITrip } from "@/app/types/trip";

export const getTrip = async (id: string): Promise<ITrip> => {
  try {
    const response = await axios.get(`/api/trips/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trip:", error);
    throw new Error("Failed to fetch trips");
  }
};

export const getTrips = async (): Promise<ITrip[]> => {
  try {
    const response = await axios.get("/api/trips");
    return response.data;
  } catch (error) {
    console.error("Error fetching trips:", error);
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

export const deleteTrip = async (tripId: string): Promise<ITrip[]> => {
  try {
    const response = await axios.delete(`/api/trips?id=${tripId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting trip:", error);
    throw new Error("Failed to delete trip");
  }
};

export const deleteTripItem = async (
  tripId: string,
  itemId: string,
  type: "tasks" | "polls" | "memories"
): Promise<ITrip> => {
  try {
    const response = await axios.delete(`/api/trips/${tripId}/${type}?itemId=${itemId}`);
    console.log(`Item with ID ${itemId} from type ${type} in trip ${tripId} deleted successfully.`);
    return response.data;
  } catch (error) {
    console.error("Error deleting trip item:", error);
    throw new Error("Failed to delete trip item");
  }
};
