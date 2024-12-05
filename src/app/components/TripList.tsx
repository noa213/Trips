"use client";
import React, { useEffect, useState } from "react";
import { ITrip } from "../types/trip";
import { getTrips } from "../services/trips";
import AddTripButton from "./AddTripBtn";
import TripCard from "./TripCard";

const TripList = () => {
  const [trips, setTrips] = useState<ITrip[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTrips();
        setTrips(response);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };
    fetchData();
  }, [setTrips]);
  return (
    <div className="trip-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {trips.length === 0 ? (
        <p className="text-gray-500 text-center">No trips found.</p>
      ) : (
        trips.map((trip) => (
            <TripCard key={trip._id} trip={trip}/>
        //   <div
        //     key={trip._id}
        //     className="trip-card bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
        //   >
        //     <h3 className="text-xl font-semibold text-blue-600">
        //       {trip.title}
        //     </h3>
        //     <p className="text-gray-700">
        //       <strong>Destination:</strong> {trip.destination}
        //     </p>
        //     <p className="text-gray-700">
        //       <strong>Dates:</strong>{" "}
        //       {new Date(trip.dates.start).toLocaleDateString()} -{" "}
        //       {new Date(trip.dates.end).toLocaleDateString()}
        //     </p>
        //     <p
        //       className={`text-sm font-medium ${
        //         trip.status === "active" ? "text-green-500" : "text-red-500"
        //       }`}
        //     >
        //       <strong>Status:</strong> {trip.status}
        //     </p>
        //   </div>
        ))
      )}
      <AddTripButton />
    </div>
  );
};

export default TripList;
