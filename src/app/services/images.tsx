import axios from "axios";
import { IPoll } from "../types/poll";
import { IImage } from "../types/image";

export const getImage = async (): Promise<IImage[]> => {
  try {
    const response = await axios.get("/api/images");
    return response.data;
  } catch (error) {
    console.error("Error fetching polls:", error);
    throw new Error("Failed to fetch polls");
  }
};



// export const updateImage = async (image: IImage): Promise<void> => {
//   try {    
//     const response = await axios.put(`/api/images`, image);
//     console.log("Polls updated successfully:", response.data);
//     // return response.data;
//   } catch (error) {
//     console.error("Error updating vote:", error);
//     throw new Error("Failed to update vote");
//   }
// };



export const updateImage = async (tripId: string, imageUrl: string): Promise<void> => {
    try {
      // שולחים את המידע הנכון לשרת עם PUT
      const response = await axios.put(`/api/trips/${tripId}/images`, {
        tripId,       // זהו ה- ID של הטיול
        imageUrl,     // זהו ה- URL של התמונה החדשה
      });
  
      console.log("Image updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating image:", error);
      throw new Error("Failed to update image");
    }
  };
  