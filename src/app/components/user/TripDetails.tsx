
// // "use client";
// // import { useEffect, useState } from "react";
// // import { ITrip } from "../../types/trip";
// // import { getTrip } from "../../services/trips";
// // import { useParams } from "next/navigation";
// // import BudgetComponent from "../BudgetComponent";
// // // import { List, ListItem, ListItemText } from "@mui/material";
// // import Polls from "../Polls";
// // import Tasks from "../Tasks";
// // import { Icon } from "@mui/material";
// // import GroupChat from "../GroupChat";




// // const TripDetail = () => {
// //   const [trip, setTrip] = useState<ITrip>();
// //   const [ShowGroupChat, setShowGroupChat] = useState(false);
// //   const router = useParams();
// //   const id = router.tripId;
// //   const tripId = Array.isArray(id) ? id[0] : id;




// //   const handleClick = () => {
// //     setShowGroupChat(!ShowGroupChat);
// //   };





// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await getTrip(tripId);
// //         setTrip(response);
// //       } catch (error) {
// //         console.error("Failed to fetch trip:", error);
// //       }
// //     };
// //     fetchData();
// //   }, [tripId])







// // const [images, setImages] = useState<File[]>([]);

// // const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //   if (e.target.files) {
// //     const newImages = Array.from(e.target.files);
// //     setImages((prev) => [...prev, ...newImages]);

// //   }
// //   };

// //   const handleDownload = (image: File) => {
// //     const url = URL.createObjectURL(image);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = image.name;
// //     a.click();
// //     URL.revokeObjectURL(url);
// //   };


















// //   return (
// //     <>
// //       {trip ? (
// //         <div className="trip-detail p-6 rounded-lg shadow-lg border max-w-2xl mx-auto">
// //           <h1 className="text-2xl font-bold mb-4">{trip.title}</h1>

// //           {/* Destination */}
// //           <div className="mb-4">
// //             <strong>Destination:</strong> {trip.destination}
// //           </div>

// //           {/* Dates */}
// //           <div className="flex items-center justify-between mb-4">
// //             <div>
// //               <strong>Start Date:</strong>{" "}
// //               {new Date(trip.dates.start).toLocaleDateString()}
// //             </div>
// //             <div>
// //               <strong>End Date:</strong>{" "}
// //               {new Date(trip.dates.end).toLocaleDateString()}
// //             </div>
// //           </div>

// //           {/* Budget */}
// //           <BudgetComponent budget={trip.budget} />

// //           {/* Tasks */}
// //           <Tasks tasksList={trip.tasks} />
// //           {/* <div className="tasks mt-6">
// //             <h3 className="text-xl font-semibold mb-2">Tasks</h3>
// //             <List>
// //               {trip.tasks ? (
// //                 trip.tasks.map((task) => (
// //                   <ListItem
// //                     key={task.taskId}
// //                     sx={{ borderBottom: "1px solid #ccc" }}
// //                   >
// //                     <ListItemText
// //                       primary={task.title}
// //                       secondary={`Status: ${task.status} | Due Date: ${new Date(
// //                         task.dueDate
// //                       ).toLocaleDateString()}`}
// //                     />
// //                   </ListItem>
// //                 ))
// //               ) : (
// //                 <p>No tasks available for this trip.</p>
// //               )}
// //             </List>
// //           </div> */}


// //           {/* Polls */}
// //           <Polls pollsList={trip.polls} />
// //           <button
// //             className="fixed bottom-4 right-4 p-2 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center justify-center space-x-2"
// //             onClick={handleClick}>

// //             <span className=" text-md  font-light font-yellowtailcursive" >צוטטו יחדיו </span>
// //             <Icon></Icon>
// //           </button>

// //           {/* {ShowGroupChat && <GroupChat tripId={tripId} />} */}
// //           {ShowGroupChat && (
// //             <div className="fixed bottom-16 right-4 w-96 h-[32rem] bg-white border shadow-xl rounded-xl overflow-hidden"
// //             >
// //               <GroupChat tripId={tripId} />
// //             </div>
// //           )}




// //           {/* image */}
// //           {/* <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen"> */}
// //           <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen max-w-4xl mx-auto">


// //             <h1 className="text-3xl font-semibold text-gray-800 mb-6">
// //             Pictures from the trip
// //             </h1>
// //             <label className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition mb-6">
// //             Adding a picture
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 multiple
// //                 className="hidden"
// //                 onChange={handleFileUpload}
// //               />
// //             </label>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
// //               {images.map((image, index) => (
// //                 <div
// //                   key={index}
// //                   className="relative bg-white rounded-lg shadow-md overflow-hidden"
// //                 >
// //                   <img
// //                     src={URL.createObjectURL(image)}
// //                     alt={image.name}
// //                     className="w-full h-48 object-cover"
// //                   />
// //                   <button
// //                     className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
// //                     onClick={() => handleDownload(image)}
// //                   >
// //                     ⬇ Download
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>

// //         </div>
// //       ) : (
// //         <p>Loading...</p>
// //       )}
// //     </>
// //   );
// // };

// // export default TripDetail;






































// "use client";
// import { useEffect, useState } from "react";
// import { ITrip } from "../../types/trip";
// import { getTrip } from "../../services/trips";
// import { useParams } from "next/navigation";
// import BudgetComponent from "../BudgetComponent";
// import Polls from "../Polls";
// import Tasks from "../Tasks";
// import { Icon } from "@mui/material";
// import GroupChat from "../GroupChat";
// import { IImage } from "@/app/types/image";
// import ImageUpload from "../ImageUploader";



// const TripDetail = () => {
//   const [trip, setTrip] = useState<ITrip>();
//   const [ShowGroupChat, setShowGroupChat] = useState(false);
//   const [images, setImages] = useState<IImage[]>([]);
//   const router = useParams();
//   const id = router.tripId;
//   const tripId = Array.isArray(id) ? id[0] : id;

//   const handleClick = () => {
//     setShowGroupChat(!ShowGroupChat);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getTrip(tripId);
//         console.log(response); // לוג לכל
//         setTrip(response);
//         setImages(response?.images ?? []);
//         // setImages(response.images || []); // אתחול מערך התמונות
//       } catch (error) {
//         console.error("Failed to fetch trip:", error);
//       }
//     };
//     fetchData();
//   }, [tripId]);

//   // const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files && trip) {
//   //     const file = e.target.files[0];
//   //     const formData = new FormData();
//   //     formData.append("image", file);

//   //     try {
//   //       // שליחת התמונה לשרת וקבלת URL
//   //       const response = await fetch("/api/trips/${updateTrip._id", {
//   //         method: "POST",
//   //         body: formData,
//   //       });

//   //       if (!response.ok) throw new Error("Failed to upload image");

//   //       const data = await response.json();
//   //       const newImage: IImage = { url: data.url };

//   //       // הוספת התמונה למערך התמונות המקומי
//   //       const updatedImages = [...images, newImage];
//   //       setImages(updatedImages);

//   //       // עדכון הטיול במונגו די בי
//   //       const updatedTrip = { ...trip, images: updatedImages };
//   //       await updateTrip( updatedTrip);

//   //       // עדכון ה-Trip ב-UI
//   //       setTrip(updatedTrip);
//   //     } catch (error) {
//   //       console.error("Error uploading image:", error);
//   //     }
//   //   }
//   // };







//   // const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (e.target.files && trip) {
//   //     const file = e.target.files[0];
//   //     const formData = new FormData();
//   //     formData.append("image", file);

//   //     try {
//   //       // שליחת התמונה לשרת ולקבל URL
//   //       const response = await fetch("/api/trips/${trip._id}/images", {
//   //         method: "POST",
//   //         body: formData,
//   //       });

//   //       if (!response.ok) throw new Error("Failed to upload image");

//   //       const data = await response.json();
//   //       const imageUrl = data.url; // קבלת ה-URL של התמונה

//   //       // עדכון המערך המקומי של התמונות
//   //       const newImage: IImage = { url: imageUrl };
//   //       const updatedImages = [...images, newImage];
//   //       setImages(updatedImages);

//   //       // עדכון הטיול במונגו די בי עם ה-URL של התמונה החדשה
//   //       await updateImage(trip._id, imageUrl); // עדכון ה-Trip בשרת

//   //       // עדכון ה-Trip ב-UI
//   //       const updatedTrip = { ...trip, images: updatedImages };
//   //       setTrip(updatedTrip);
//   //     } catch (error) {
//   //       console.error("Error uploading image:", error);
//   //     }
//   //   }
//   // };


//   // const handleDownload = (image: IImage) => {
//   //   const a = document.createElement("a");
//   //   a.href = image.url;
//   //   a.download = image.url.split("/").pop() || "image";
//   //   a.click();
//   // };

//   return (
//     <>
//       {trip ? (
//         <div className="trip-detail p-6 rounded-lg shadow-lg border max-w-2xl mx-auto">
//           <h1 className="text-2xl font-bold mb-4">{trip.title}</h1>

//           {/* Destination */}
//           <div className="mb-4">
//             <strong>Destination:</strong> {trip.destination}
//           </div>

//           {/* Dates */}
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <strong>Start Date:</strong>{" "}
//               {new Date(trip.dates.start).toLocaleDateString()}
//             </div>
//             <div>
//               <strong>End Date:</strong>{" "}
//               {new Date(trip.dates.end).toLocaleDateString()}
//             </div>
//           </div>

//           {/* Budget */}
//           <BudgetComponent budget={trip.budget} />

//           {/* Tasks */}
//           <Tasks tasksList={trip.tasks} />

//           {/* Polls */}
//           <Polls pollsList={trip.polls} />

//           {/* Group Chat */}
//           <button
//             className="fixed bottom-4 right-4 p-2 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center justify-center space-x-2"
//             onClick={handleClick}
//           >
//             <span className=" text-md  font-light font-yellowtailcursive">צוטטו יחדיו</span>
//             <Icon></Icon>
//           </button>

//           {ShowGroupChat && (
//             <div className="fixed bottom-16 right-4 w-96 h-[32rem] bg-white border shadow-xl rounded-xl overflow-hidden">
//               <GroupChat tripId={tripId} />
//             </div>
//           )}







//           <div>
//             <h1>{trip.title}</h1>
//             <h1>{trip.images}</h1>
//             <div>
//               {trip.images.map((image, index) => (
//                 <img key={index} src={image.url} alt={`Trip Image ${index}`} />
//               ))}
//             </div>
//             <ImageUpload trip={trip} setTrip={(updatedTrip) => {/* עדכון הטיול */ }} />
//           </div>




























//           {/* Image Upload & Display
//           <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen max-w-4xl mx-auto">
//             <h1 className="text-3xl font-semibold text-gray-800 mb-6">Pictures from the trip</h1>
//             <label className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition mb-6">
//               Adding a picture
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="hidden"
//                 onChange={handleFileUpload}
//               />
//             </label>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
//               {images.map((image, index) => (
//                 <div key={index} className="relative bg-white rounded-lg shadow-md overflow-hidden">
//                   <img
//                     src={image.url}
//                     alt={image.url}
//                     className="w-full h-48 object-cover"
//                   />
//                   <button
//                     className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
//                     onClick={() => handleDownload(image)}
//                   >
//                     ⬇ Download
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div> */}
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </>
//   );
// };

// export default TripDetail;



























"use client";
import { useEffect, useState } from "react";
import { ITrip } from "../../types/trip";
import { getTrip } from "../../services/trips";
import { useParams } from "next/navigation";
import BudgetComponent from "../BudgetComponent";
import Polls from "../Polls";
import Tasks from "../Tasks";
import { Icon } from "@mui/material";
import GroupChat from "../GroupChat";
import { IImage } from "@/app/types/image";


const TripDetail = () => {
  const [trip, setTrip] = useState<ITrip>();
  const [ShowGroupChat, setShowGroupChat] = useState(false);
  const [ setImages] = useState<IImage[]>([]);
  const router = useParams();
  const id = router.tripId;
  const tripId = Array.isArray(id) ? id[0] : id;

  const handleClick = () => {
    setShowGroupChat(!ShowGroupChat);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTrip(tripId);
        console.log(response); // לוג לכל
        setTrip(response);
        setImages(response?.images ?? []);
      } catch (error) {
        console.error("Failed to fetch trip:", error);
      }
    };
    fetchData();
  }, [tripId]);

  return (
    <>
      {trip ? (
        <div className="trip-detail p-6 rounded-lg shadow-lg border max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">{trip.title}</h1>

          {/* Destination */}
          <div className="mb-4">
            <strong>Destination:</strong> {trip.destination}
          </div>

          {/* Dates */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <strong>Start Date:</strong>{" "}
              {new Date(trip.dates.start).toLocaleDateString()}
            </div>
            <div>
              <strong>End Date:</strong>{" "}
              {new Date(trip.dates.end).toLocaleDateString()}
            </div>
          </div>

          {/* Budget */}
          <BudgetComponent budget={trip.budget} />

          {/* Tasks */}
          <Tasks tasksList={trip.tasks} />

          {/* Polls */}
          <Polls pollsList={trip.polls} />

          {/* Group Chat */}
          <button
            className="fixed bottom-4 right-4 p-2 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center justify-center space-x-2"
            onClick={handleClick}
          >
            <span className="text-md font-light font-yellowtailcursive">צוטטו יחדיו</span>
            <Icon />
          </button>

          {ShowGroupChat && (
            <div className="fixed bottom-16 right-4 w-96 h-[32rem] bg-white border shadow-xl rounded-xl overflow-hidden">
              <GroupChat tripId={tripId} />
            </div>
          )}


          {/* <div>
            <h1>{trip.title}</h1>
            <div>
              {images.length > 0 ? (
                images?.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Trip Image ${index}`}
                    className="w-full h-48 object-cover"
                  />
                ))
              ) : (
                <p>No images available</p>
              )}
            </div>
            <ImageUpload trip={trip} setTrip={setTrip} />
          </div>  */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default TripDetail;



