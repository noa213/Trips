"use client";
import React from "react";
import { ITrip } from "../types/trip";
import { useRouter } from "next/navigation";

const TripCard: React.FC<{ trip: ITrip }> = ({ trip }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`pages/trips/${trip._id}`);
  };
  return (
    <div
      className="trip-card border p-4 rounded-lg shadow-lg bg-[#F5F5F0] text-[#424242]"
      onClick={handleClick}
    >
      <h3 className="text-xl font-bold text-[#81c784]">{trip.title}</h3>
      <p className="text-[#757575]">Destination: {trip.destination}</p>
      <p className="text-[#757575]">
        Dates: {new Date(trip.dates.start).toLocaleDateString()} -{" "}
        {new Date(trip.dates.end).toLocaleDateString()}
      </p>
      <p className="text-[#757575]">Budget: ${trip.budget.total}</p>
    </div>
  );
};

export default TripCard;
