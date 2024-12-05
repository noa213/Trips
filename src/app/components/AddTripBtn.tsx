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
    className="bg-[#81C784] text-white p-3 rounded-lg hover:bg-[#66BB6A] transition duration-300"
  >
    NEW TRIP
  </button>
  {showForm && <CreateDetailedTrip />}
</div>
  );
};

export default AddTripButton;
