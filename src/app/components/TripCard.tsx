// "use client";
// import React from "react";
// import { ITrip } from "../types/trip";
// import { useRouter } from "next/navigation";

// const TripCard: React.FC<{ trip: ITrip }> = ({ trip }) => {
//   const router = useRouter();
//   const handleClick = () => {
//     router.push(`pages/trips/${trip._id}`);
//   };
//   return (
//     <div
//       className="trip-card border p-4 rounded-lg shadow-lg"
//       onClick={handleClick}
//     >
//       <h3 className="text-xl font-bold">{trip.title}</h3>
//       <p className="text-gray-600">Destination: {trip.destination}</p>
//       <p className="text-gray-600">
//         Dates: {new Date(trip.dates.start).toLocaleDateString()} -{" "}
//         {new Date(trip.dates.end).toLocaleDateString()}
//       </p>
//       <p className="text-gray-600">Budget: ${trip.budget.total}</p>
//     </div>
//   );
// };

// export default TripCard;


"use client";
import React, { useState } from "react";
import { ITrip } from "../types/trip";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";

const TripCard: React.FC<{ trip: ITrip; onDelete: (tripId: string) => void }> = ({ trip, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // למנוע מעבר לעמוד הפרטים בזמן לחיצה על מחיקה
    onDelete(trip._id!);
  };

  const handleClick = () => {
    // /api/trips?id=${tripId}
    router.push(`pages/trips/${trip._id}`);
  };

  return (
    <div
      className={`trip-card border p-4 rounded-lg shadow-lg relative ${
        isHovered ? "bg-gray-100" : "bg-white"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {isHovered && (
        <DeleteIcon
          className="absolute top-2 right-2 text-red-500 cursor-pointer hover:text-red-600"
          onClick={handleDelete}
          fontSize="small"
        />
      )}
      <h3 className="text-xl font-bold">{trip.title}</h3>
      <p className="text-gray-600">Destination: {trip.destination}</p>
      <p className="text-gray-600">
        Dates: {new Date(trip.dates.start).toLocaleDateString()} -{" "}
        {new Date(trip.dates.end).toLocaleDateString()}
      </p>
      <p className="text-[#757575]">Budget: ${trip.budget.total}</p>
    </div>
  );
};

export default TripCard;
