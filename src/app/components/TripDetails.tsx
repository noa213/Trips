"use client";
import { useEffect, useState } from "react";
import { ITrip } from "../types/trip";
import { getTrip, updateTrip } from "../services/trips";
import { useParams } from "next/navigation";
// import { MdModeEdit } from "react-icons/md";
import BudgetComponent from "./BudgetComponent";
import EditableField from "./EditableField";

const TripDetail = () => {
  const [trip, setTrip] = useState<ITrip | null>(null);
  // const [editingField, setEditingField] = useState<string | null>(null);
  const [updatedValue, setUpdatedValue] = useState<string>("");
  const router = useParams();
  const id = router.tripId;

  const tripId = Array.isArray(id) ? id[0] : id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTrip(tripId);
        setTrip(response);
        console.log(response);
      } catch (error) {
        console.error("Failed to fetch trip:", error);
      }
    };
    fetchData();
  }, [tripId]);

  const handleSave = async (field: string, value?: unknown) => {
    if (trip) {
      let updatedTrip = { ...trip };



      if (field === "startDate") {
        updatedTrip.dates.start = new Date(value as string);
      } else if (field === "endDate") {
        updatedTrip.dates.end = new Date(value as string);
      } else {
        updatedTrip = { ...trip, [field]: value ? value : updatedValue };
      }
  
      try {
        const response = await updateTrip(updatedTrip);
        setTrip(response);
        setUpdatedValue(""); // מאפס את הערך שהוזן
      } catch (error) {
        console.error("Failed to save trip:", error);
      }
      // const [start, end] = await updatedValue
      //   .split(" - ")
      //   .map((date) => new Date(date));

      // // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      // field === "dates"
      //   ? (updatedTrip.dates = { start, end })
      //   : (updatedTrip = { ...trip, [field]: value ? value : updatedValue });
      // console.log("updatedTripppp", updatedTrip.budget);

      // const response = await updateTrip(updatedTrip);
      // setTrip(response);
      // // setEditingField(null);
      // setUpdatedValue("");
    }
  };

  // const handleEditClick = (field: string, currentValue: string) => {
  //   setEditingField(field);
  //   setUpdatedValue(currentValue);
  // };

  // console.log("trip", trip?.dates);
  return (
    <>
      {trip && trip.dates ? (
        <div className="trip-detail p-6 rounded-lg shadow-lg border max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">{trip.title}</h1>

          {/* Destination */}
          <EditableField
            label="Destination"
            value={trip.destination}
            field="destination"
            onSave={(field, value) => handleSave(field, value)}
          />

          {/* Dates */}
          <div className="flex items-center justify-between mb-4">
            <EditableField
              label="Start Date"
              // value={trip.dates.start.split("T")[0]} 
              value={new Date(trip.dates.start).toISOString().split("T")[0]}

              field="startDate"
              inputType="date"
              onSave={(field, value) =>
                handleSave("dates", { ...trip.dates, start: new Date(value) })
              }
            />
            <EditableField
              label="End Date"
              value={new Date(trip.dates.end).toISOString().split("T")[0]}
              field="endDate"
              inputType="date"
              onSave={(field, value) =>
                handleSave("dates", { ...trip.dates, end: new Date(value) })
              }
            />
          </div>

          {/* <div className="flex items-center justify-between mb-4">
            <EditableField
              label="Start Date"
              value={new Date(trip.dates.start).toLocaleDateString()}
              field="startDate"
              onSave={(field, value) =>
                handleSave("dates", { ...trip.dates, start: new Date(value) })
              }
            />
            <EditableField
              label="End Date"
              value={new Date(trip.dates.end).toLocaleDateString()}
              field="endDate"
              onSave={(field, value) =>
                handleSave("dates", { ...trip.dates, end: new Date(value) })
              }
            />
          </div> */}

          {/* Budget */}
          <BudgetComponent
            budget={trip.budget}
            onSave={(updatedBudget) => {
              handleSave("budget", updatedBudget);
            }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default TripDetail;
