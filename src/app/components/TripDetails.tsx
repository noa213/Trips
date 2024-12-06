"use client";
import { useEffect, useState } from "react";
import { ITrip } from "../types/trip";
import { getTrip, updateTrip } from "../services/trips";
import { useParams } from "next/navigation";
import { MdModeEdit } from "react-icons/md";
import BudgetComponent from "./BudgetComponent";

const TripDetail = () => {
  const [trip, setTrip] = useState<ITrip | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [updatedValue, setUpdatedValue] = useState<string>("");
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

  const handleSave = async (field: string) => {
    if (trip) {
      let updatedTrip = { ...trip };
      const [start, end] = await updatedValue
        .split(" - ")
        .map((date) => new Date(date));
      // console.log("strat | end", start, end);

      field === "dates"
        ? (updatedTrip.dates = { start, end })
        : (updatedTrip = { ...trip, [field]: updatedValue });
      console.log("updatedTripppp", updatedTrip.budget);

      const response = await updateTrip(updatedTrip);
      // console.log("updatedTripppp", response.budget);

      setTrip(response);
      setEditingField(null);
    }
  };

  const handleEditClick = (field: string, currentValue: string) => {
    setEditingField(field);
    setUpdatedValue(currentValue);
  };

  // console.log("trip", trip?.dates);
  return (
    <>
      {trip && trip.dates ? (
        <div className="trip-detail p-6 rounded-lg shadow-lg border max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">{trip.title}</h1>

          {/* Destination */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-bold">Destination:</span>
            {editingField === "destination" ? (
              <>
                <input
                  className="border p-2 rounded w-full"
                  type="text"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                />
                <button
                  onClick={() => handleSave("destination")}
                  className="ml-2 px-3 py-2 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{trip.destination}</span>
                <MdModeEdit
                  onClick={() =>
                    handleEditClick("destination", trip.destination)
                  }
                  className="cursor-pointer text-blue-500 ml-2"
                />
              </>
            )}
          </div>

          {/* Dates */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-bold">Dates:</span>
            {editingField === "dates" ? (
              <>
                <input
                  className="border p-2 rounded w-full"
                  type="text"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                />
                <button
                  onClick={() => handleSave("dates")}
                  className="ml-2 px-3 py-2 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>
                  {new Date(trip.dates.start).toLocaleDateString()} -{" "}
                  {new Date(trip.dates.end).toLocaleDateString()}
                </span>
                <MdModeEdit
                  onClick={() =>
                    handleEditClick(
                      "dates",
                      `${trip.dates.start} - ${trip.dates.end}`
                    )
                  }
                  className="cursor-pointer text-blue-500 ml-2"
                />
              </>
            )}
          </div>

          {/* Budget */}
          {/* <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-bold">Budget:</span>
            {editingField === "budget" ? (
              <>
                <input
                  className="border p-2 rounded w-full"
                  type="number"
                  value={updatedValue}
                  onChange={(e) => setUpdatedValue(e.target.value)}
                />
                <button
                  onClick={() => handleSave("budget.total")}
                  className="ml-2 px-3 py-2 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>${trip.budget.total}</span>
                <MdModeEdit
                  onClick={() =>
                    handleEditClick("budget", trip.budget.total.toString())
                  }
                  className="cursor-pointer text-blue-500 ml-2"
                />
              </>
            )}
          </div> */}
          <BudgetComponent
            budget={trip.budget}
            onSave={(updatedBudget) => {
              console.log("Updated budget:", updatedBudget);
              // Save the updated budget to the server or state
            }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* You can display additional details like participants, status, etc. */}
    </>
  );
};

export default TripDetail;
