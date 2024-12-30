"use client";
import { useEffect, useState } from "react";
import { ITrip } from "../types/trip";
import { getTrip, updateTrip } from "../services/trips";
import { useParams } from "next/navigation";
// import { MdModeEdit } from "react-icons/md";
import BudgetComponent from "./BudgetComponent";
import EditableField from "./EditableField";
import GroupChat from "./GroupChat";
import Icon from "@mui/icons-material/Chat"
import "@fontsource/yellowtail";


const TripDetail = () => {

  const [trip, setTrip] = useState<ITrip | null>(null);
  // const [editingField, setEditingField] = useState<string | null>(null);
  const [updatedValue, setUpdatedValue] = useState<string>("");

  const [ShowGroupChat, setShowGroupChat] = useState(false);
  const router = useParams();
  const id = router.tripId;
  // const tripId = Array.isArray(router.tripId) ? router.tripId[0] : router.tripId;

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


  const handleClick = () => {
    setShowGroupChat(!ShowGroupChat);
  };


  const handleSave = async (field: string, value?: unknown) => {
    if (trip) {
      let updatedTrip = { ...trip };

      if (field === "startDate" || field === "endDate")
        updatedTrip.dates[field === "startDate" ? "start" : "end"] = new Date(
          value as string
        );

      else updatedTrip = { ...trip, [field]: value ? value : updatedValue };
      console.log("value", value);

      try {
        const response = await updateTrip(updatedTrip);
        setTrip(response);
        setUpdatedValue("");
      } catch (error) {
        console.error("Failed to save trip:", error);
      }
    }
  };


  console.log( trip)
  return (
    <>


      {trip && trip.dates ? (
        <div className="trip-detail p-6 rounded-lg shadow-lg border max-w-2xl mx-auto">



          <div>
            <h3>Participants:</h3>
            <ul>
              {trip.participants.map((participant, index) => (
                <li key={index}>
                  {participant.name} 
                </li>
              ))}
            </ul>
          </div>




          <h1 className="text-2xl font-bold mb-4">{trip.title}</h1>
          <h1 className="text-2xl font-bold mb-4">{trip.adminNmame}</h1>


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

          {/* Budget */}
          <BudgetComponent
            budget={trip.budget}
            onSave={(updatedBudget) => {
              handleSave("budget", updatedBudget);
            }}
          />
          {/* <button className="fixed bottom-4 right-4 p-4 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center justify-center space-x-2" onClick={handleClick}>צוטטו יחדיו את הטיול הבא שלכם  </button> */}
          <button
            className="fixed bottom-4 right-4 p-2 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 flex items-center justify-center space-x-2"
            onClick={handleClick}>

            <span className=" text-md  font-light font-yellowtailcursive" >צוטטו יחדיו </span>
            <Icon></Icon>
          </button>

          {/* {ShowGroupChat && <GroupChat tripId={tripId} />} */}
          {ShowGroupChat && (
            <div className="fixed bottom-16 right-4 w-96 h-[32rem] bg-white border shadow-xl rounded-xl overflow-hidden"
            >
              <GroupChat tripId={tripId} />
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}



    </>
  );
};

export default TripDetail;
