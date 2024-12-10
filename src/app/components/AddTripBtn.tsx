import { useState } from "react";
import CreateDetailedTrip from "./CreateTripDialog";
import { ITrip } from "../types/trip";

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
        <CreateDetailedTrip onAddTrip={handleAddTrip}/>
      ) : (
        <button
          onClick={toggleForm}
          className="bg-green-500 text-white p-2 rounded"
        >
          NEW TRIP
        </button>
      )}
    </div>
  );
};

export default AddTripButton;
