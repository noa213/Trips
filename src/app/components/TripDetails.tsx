// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import { ITrip } from "../types/trip";

const TripDetail = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [trip, setTrip] = useState<ITrip | null>(null);
//   const trip = router.state?.trip;

//   if (!trip) return <p>Loading...</p>;

  return (
    <div className="trip-detail">
        <p>dfgedrwsdgerf</p>
      {/* <h2 className="text-2xl font-bold">{trip.title}</h2>
      <p className="text-gray-600">Destination: {trip.destination}</p>
      <p className="text-gray-600">
        Dates: {new Date(trip.dates.start).toLocaleDateString()} -{" "}
        {new Date(trip.dates.end).toLocaleDateString()}
      </p>
      <p className="text-gray-600">Total Budget: ${trip.budget.total}</p> */}
      {/* You can display additional details like participants, status, etc. */}
    </div>
  );
};

export default TripDetail;
