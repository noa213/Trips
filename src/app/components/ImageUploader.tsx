// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import axios from "axios";
// import { IImage } from "../types/image"; // נניח שזו הטיפוס שלך
// import { ITrip } from "../types/trip";



// interface ImageUploadProps {
//   trip: ITrip;
//   setTrip: React.Dispatch<React.SetStateAction<ITrip>>;
// }

// const ImageUpload: React.FC<ImageUploadProps> = ({ trip, setTrip }) => {
//   const [image, setImage] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleFileUpload = async () => {
//     if (image && trip._id) {
//       const formData = new FormData();
//       formData.append("image", image);

//       try {
//         setLoading(true);
//         const response = await axios.post("/api/images", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//           params: { tripId: trip._id },
//         });

//         if (response.data.imageUrl) {
//           // עדכון התמונות בטיול
//           const updatedImages = [...trip.images, { url: response.data.imageUrl }];
//           setTrip({ ...trip, images: updatedImages });
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Upload and Download Images</h1>
//       <label style={styles.uploadButton}>
//         Upload Images
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           style={styles.fileInput}
//           onChange={handleFileUpload}
//         />
//       </label>
//       <div style={styles.grid}>
//         {images.map((image, index) => (
//           <div key={index} style={styles.card}>
//             <Image
//               src={URL.createObjectURL(image)}
//               alt={image.name}
//               width={100}
//               height={100}
//               style={styles.image}
//             />
//             <button
//               style={styles.downloadButton}
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

// export default ImageUpload;
