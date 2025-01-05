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

const TripDetail = () => {
  const [trip, setTrip] = useState<ITrip>();
  const [ShowGroupChat, setShowGroupChat] = useState(false);
  const router = useParams();
  const id = router.tripId;
  const tripId = Array.isArray(id) ? id[0] : id;

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
  }, [tripId]);

  const handleClick = () => {
    setShowGroupChat(!ShowGroupChat);
  };

  return (
    <>
      {trip ? (
        <div>
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
          <Tasks tasksList={trip.tasks} participants={trip.participants} />

          {/* Polls */}
          <Polls pollsList={trip.polls} />

          {/* Chat */}
          <>
            <button
              className="fixed bottom-4 right-4 p-2 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center justify-center space-x-2"
              onClick={handleClick}
            >
              <span className=" text-md  font-light font-yellowtailcursive">
                chatting together
              </span>
              <Icon></Icon>
            </button>

            {ShowGroupChat && (
              <div className="fixed bottom-16 right-4 w-96 h-[32rem] bg-white border shadow-xl rounded-xl overflow-hidden">
                <GroupChat tripId={tripId} />
              </div>
            )}
          </>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default TripDetail;
