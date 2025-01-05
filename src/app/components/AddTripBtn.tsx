import { useState } from "react";
import { ITrip } from "../types/trip";
import CreateTrip from "./CreateTrip";

const AddTripButton: React.FC<{ onAddTrip: (newTrip: ITrip) => void }> = ({
  onAddTrip,
}) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAddTrip = (newTrip: ITrip) => {
    setShowForm(!showForm);
    onAddTrip(newTrip)
  };
  
  return (
    <div>
      {showForm ? (
        <CreateTrip onAddTrip={handleAddTrip}/>
      ) : (
        <button
          onClick={toggleForm}
          className="bg-green-500 text-white p-2 rounded hover:bg-[#81C784]"
        >
          New Trip
        </button>
      )}
    </div>
  );
};

export default AddTripButton;
