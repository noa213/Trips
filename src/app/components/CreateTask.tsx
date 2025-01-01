"use client";
import React, { useState } from "react";
import { ITask } from "../types/task";
import { ICreateTaskProps } from "../types/CreateTaskProps";
import {
  FormControl,
  InputLabel,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

const CreateTask: React.FC<ICreateTaskProps> = ({ onCreate, participants }) => {
  const [task, setTask] = useState<Omit<ITask, "taskId">>({
    title: "",
    assignedTo: "",
    status: "not started",
    dueDate: new Date(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    if ("target" in e && "value" in e.target && "name" in e.target) {
      const { name, value } = e.target;
      setTask((prevTask) => ({
        ...prevTask,
        [name]: name === "dueDate" ? new Date(value) : value,
      }));
    } else {
      console.error("Unhandled event type");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("task", task);
    if (!task.title) return;
    const newTask: ITask = {
      taskId: `task-${Date.now()}`,
      ...task,
    };
    onCreate(newTask);
    setTask({
      title: "",
      assignedTo: "",
      status: "not started",
      dueDate: new Date(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-lg shadow-md border max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Task Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={task.title}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2 mt-1"
          placeholder="Enter task title"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="assignedTo"
          className="block text-sm font-medium text-gray-700"
        >
          Assign To
        </label>
        <FormControl fullWidth>
          {/* <InputLabel>Choose a Participant</InputLabel> */}
          <Select
            name="assignedTo"
            onChange={handleChange}
            renderValue={(value) => {
              const selected = participants.find((p) => p.email === value);
              return (
                <Typography>
                  {selected?.name} ({selected?.email})
                </Typography>
              );
            }}
          >
            {participants.map((participant) => (
              <MenuItem key={participant.email} value={participant.email}>
                <ListItem sx={{ padding: 0 }}>
                  <ListItemText
                    primary={participant.name}
                    secondary={participant.email}
                  />
                </ListItem>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* <select
          name="assignedTo"
          id="assignedTo"
          value={task.assignedTo}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2 mt-1"
        >
          <option value="">Select a participant</option>
          {participants.map((participant) => (
            <option key={participant.email} value={participant.name}>
              <ListItem
                key={participant.email}
                sx={{ borderBottom: "1px solid #ccc" }}
              >
                <ListItemText
                  primary={participant.name}
                  secondary={participant.email}
                />
              </ListItem>
            </option>
          ))}
        </select> */}
      </div>
      <div className="mb-4">
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-700"
        >
          Due Date
        </label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          value={task.dueDate.toISOString().split("T")[0]}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2 mt-1"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          name="status"
          id="status"
          value={task.status}
          onChange={(e) =>
            setTask((prevTask) => ({
              ...prevTask,
              [e.target.name]: e.target.value,
            }))
          }
          className="border rounded w-full px-3 py-2 mt-1"
        >
          <option value="notStarted">Not Started</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      {/* <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          name="status"
          id="status"
          value={task.status}
          onChange={handleChange}
          className="border rounded w-full px-3 py-2 mt-1"
        >
          <option value="notStarted">Not Started</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div> */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
