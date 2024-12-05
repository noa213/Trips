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
    <div className="trip-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-white text-gray-800">
      {trips.length === 0 ? (
        <p className="text-gray-500 text-center text-xl">No trips found.</p>
      ) : (
        trips.map((trip) => <TripCard key={trip._id} trip={trip} />)
      )}
      <AddTripButton />
    </div>
  );
};

export default TripList;
