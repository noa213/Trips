'use client'
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface ITripForm {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  budget: number;
}

const CreateTripDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trip, setTrip] = useState<ITripForm>({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: name === "budget" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Trip Created:", trip);
    setIsOpen(false); // Close the dialog
  };

  return (
    <>
      {/* Button to open dialog */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsOpen(true)}
      >
        Create New Trip
      </Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create a New Trip</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            {/* Title */}
            <TextField
              label="Trip Title"
              name="title"
              value={trip.title}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />

            {/* Destination */}
            <TextField
              label="Destination"
              name="destination"
              value={trip.destination}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />

            {/* Dates */}
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={trip.startDate}
              onChange={handleChange}
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={trip.endDate}
              onChange={handleChange}
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              required
            />

            {/* Budget */}
            <TextField
              label="Budget (Total)"
              name="budget"
              type="number"
              value={trip.budget}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setIsOpen(false)} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Save Trip
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateTripDialog;
