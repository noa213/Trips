import { useState } from "react";
import CreateDetailedTrip from "./CreateTripDialog";

const AddTripButton = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <button
        onClick={toggleForm}
        className="bg-green-500 text-white p-2 rounded"
      >
        NEW TRIP
      </button>
      {showForm && <CreateDetailedTrip />}
    </div>
  );
};

export default AddTripButton;
