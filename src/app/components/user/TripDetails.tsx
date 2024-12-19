"use client";
import { useEffect, useState } from "react";
import { ITrip } from "../../types/trip";
import { getTrip } from "../../services/trips";
import { useParams } from "next/navigation";
import BudgetComponent from "../BudgetComponent";
import { List, ListItem, ListItemText } from "@mui/material";
import Polls from "../Polls";

const TripDetail = () => {
  const [trip, setTrip] = useState<ITrip>();
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
          <div className="tasks mt-6">
            <h3 className="text-xl font-semibold mb-2">Tasks</h3>
            <List>
              {trip.tasks ? (
                trip.tasks.map((task) => (
                  <ListItem
                    key={task.taskId}
                    sx={{ borderBottom: "1px solid #ccc" }}
                  >
                    <ListItemText
                      primary={task.title}
                      secondary={`Status: ${task.status} | Due Date: ${new Date(
                        task.dueDate
                      ).toLocaleDateString()}`}
                    />
                  </ListItem>
                ))
              ) : (
                <p>No tasks available for this trip.</p>
              )}
            </List>
          </div>

          {/* Polls */}
          <Polls pollsList={trip.polls}/>
          {/* <div className="polls mt-6">
            <h3 className="text-xl font-semibold mb-2">Polls</h3>
            <List>
              {trip.polls ? (
                trip.polls.map((poll) => (
                  <ListItem key={poll.pollId} sx={{ borderBottom: "1px solid #ccc" }}>
                    <ListItemText
                      primary={poll.question}
                      secondary={poll.options.map((option) => option.value).join(" | ")}
                    />
                  </ListItem>
                ))
              ) : (
                <p>No polls available for this trip.</p>
              )}
            </List>
          </div> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default TripDetail;
