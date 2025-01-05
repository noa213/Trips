"use client";
import React, { useEffect, useState } from "react";
import { ITrip } from "../types/trip";
import { deleteTrip, getTrips } from "../services/trips";
import TripCard from "./TripCard";
import AddTripButton from "./AddTripBtn";
import { IUser } from "../types/user";
import { useSession } from "next-auth/react";

const TripList = () => {
  const [trips, setTrips] = useState<ITrip[]>([]);
  const { data: session } = useSession();

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

  const handleAddTrip = (newTrip: ITrip) => {
    setTrips((prevTrips) => [...prevTrips, newTrip]);
  };

  const handleDelete = async (tripId: string) => {
    try {
      const response = await deleteTrip(tripId);
      setTrips(response);
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <>
      <div className="trip-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {trips ? (
          trips
            .filter((trip: ITrip) =>
              trip.participants.some(
                (participant: IUser) =>
                  participant.email === session?.user.email
              )
            )
            .map((trip: ITrip) => (
              <TripCard key={trip._id} trip={trip} onDelete={handleDelete} />
            ))
        ) : (
          <p className="text-gray-500 text-center">No trips found.</p>
        )}
      </div>
      <AddTripButton onAddTrip={handleAddTrip} />
    </>
  );
};

export default TripList;
