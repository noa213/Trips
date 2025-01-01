// "use client";
// import { useEffect, useState } from "react";
// import { ITrip } from "../../types/trip";
// import { getTrip } from "../../services/trips";
// import { useParams } from "next/navigation";
// import BudgetComponent from "../BudgetComponent";
// // import { List, ListItem, ListItemText } from "@mui/material";
// import Polls from "../Polls";
// import Tasks from "../Tasks";

// const TripDetail = () => {
//   const [trip, setTrip] = useState<ITrip>();
//   const router = useParams();
//   const id = router.tripId;
//   const tripId = Array.isArray(id) ? id[0] : id;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getTrip(tripId);
//         setTrip(response);
//       } catch (error) {
//         console.error("Failed to fetch trip:", error);
//       }
//     };
//     fetchData();
//   }, [tripId]);

//   return (
//     <>
//       {trip ? (
//         <div className="trip-detail p-6 rounded-lg shadow-lg border max-w-2xl mx-auto">
//           <h1 className="text-2xl font-bold mb-4">{trip.title}</h1>

//           {/* Destination */}
//           <div className="mb-4">
//             <strong>Destination:</strong> {trip.destination}
//           </div>

//           {/* Dates */}
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <strong>Start Date:</strong>{" "}
//               {new Date(trip.dates.start).toLocaleDateString()}
//             </div>
//             <div>
//               <strong>End Date:</strong>{" "}
//               {new Date(trip.dates.end).toLocaleDateString()}
//             </div>
//           </div>

//           {/* Budget */}
//           <BudgetComponent budget={trip.budget} />

//           {/* Tasks */}
//           <Tasks tasksList={trip.tasks} />
//           {/* <div className="tasks mt-6">
//             <h3 className="text-xl font-semibold mb-2">Tasks</h3>
//             <List>
//               {trip.tasks ? (
//                 trip.tasks.map((task) => (
//                   <ListItem
//                     key={task.taskId}
//                     sx={{ borderBottom: "1px solid #ccc" }}
//                   >
//                     <ListItemText
//                       primary={task.title}
//                       secondary={`Status: ${task.status} | Due Date: ${new Date(
//                         task.dueDate
//                       ).toLocaleDateString()}`}
//                     />
//                   </ListItem>
//                 ))
//               ) : (
//                 <p>No tasks available for this trip.</p>
//               )}
//             </List>
//           </div> */}

//           {/* Polls */}
//           <Polls pollsList={trip.polls} />
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </>
//   );
// };

// export default TripDetail;

"use client";
import { useEffect, useState } from "react";
import { ITrip } from "../../types/trip";
import { getTrip } from "../../services/trips";
import { useParams } from "next/navigation";
import BudgetComponent from "../BudgetComponent";
// import { List, ListItem, ListItemText } from "@mui/material";
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

  const handleClick = () => {
    setShowGroupChat(!ShowGroupChat);
  };

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
          <Tasks tasksList={trip.tasks} participants={trip.participants}/>

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

            {/* {ShowGroupChat && <GroupChat tripId={tripId} />} */}
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
