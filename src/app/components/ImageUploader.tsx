

// "use client";

// import React, { useState } from "react";

// const ImageUploader = () => {
//   const [images, setImages] = useState<File[]>([]);

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newImages = Array.from(e.target.files);
//       setImages((prev) => [...prev, ...newImages]);
//     }
//   };

//   const handleDownload = (image: File) => {
//     const url = URL.createObjectURL(image);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = image.name;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl font-semibold text-gray-800 mb-6">
//         Upload and Download Images
//       </h1>
//       <label className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition mb-6">
//         Upload Images
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           className="hidden"
//           onChange={handleFileUpload}
//         />
//       </label>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className="relative bg-white rounded-lg shadow-md overflow-hidden"
//           >
//             <img
//               src={URL.createObjectURL(image)}
//               alt={image.name}
//               className="w-full h-48 object-cover"
//             />
//             <button
//               className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//               onClick={() => handleDownload(image)}
//             >
//               ⬇ Download
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageUploader;




















import React, { useState } from "react";
import axios from "axios";
import { IImage } from "../types/image"; // נניח שזו הטיפוס שלך
import { ITrip } from "../types/trip";



interface ImageUploadProps {
  trip: ITrip;
  setTrip: React.Dispatch<React.SetStateAction<ITrip>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ trip, setTrip }) => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (image && trip._id) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        setLoading(true);
        const response = await axios.post("/api/images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          params: { tripId: trip._id },
        });

        if (response.data.imageUrl) {
          // עדכון התמונות בטיול
          const updatedImages = [...trip.images, { url: response.data.imageUrl }];
          setTrip({ ...trip, images: updatedImages });
        }

        setLoading(false);
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
};

export default ImageUpload;
