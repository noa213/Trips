'use client'
import { useEffect, useState } from "react";
import { ITrip } from "../types/trip";
import { getTrip } from "../services/trips";
import { useParams } from 'next/navigation';
const TripDetail = () => {
  const [trip, setTrip] = useState<ITrip | null>(null);
  const router = useParams();
  const  id = router.tripId;
  // const { id } = useParams();
  console.log(id)

  const tripId = Array.isArray(id) ? id[0] : id; 
  console.log(tripId)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTrip(tripId);
        setTrip(response);
      } catch (error) {
        console.error("Failed to fetch trip:", error);
      }
    };
    fetchData();
  }, [setTrip]);

  if (!trip) return <p>Loading...</p>;

  return (
    <div className="trip-detail">
      <h2 className="text-2xl font-bold">{trip!.title}</h2>
      <p className="text-gray-600">Destination: {trip!.destination}</p>
      <p className="text-gray-600">
        Dates: {new Date(trip!.dates.start).toLocaleDateString()} -{" "}
        {new Date(trip!.dates.end).toLocaleDateString()}
      </p>
      <p className="text-gray-600">Total Budget: ${trip!.budget.total}</p>
      {/* You can display additional details like participants, status, etc. */}
    </div>
  );
};

export default TripDetail;
