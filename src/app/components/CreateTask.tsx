"use client";
import React, { useState } from "react";
import { ITask } from "../types/task";
import { ICreateTaskProps } from "../types/CreateTaskProps";
import {
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

const CreateTask: React.FC<ICreateTaskProps> = ({ onCreate, participants }) => {
  const [task, setTask] = useState<Omit<ITask, "taskId">>({
    title: "",
    assignedTo: null,
    status: "not started",
    dueDate: new Date(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>
  ) => {
    if ("target" in e && "value" in e.target && "name" in e.target) {
      const { name, value } = e.target;

      if (name === "assignedTo") {
        const selectedUser =
          participants.find((p) => p.email === value) || null;
        console.log("selectedUser", selectedUser);
        setTask((prevTask) => ({
          ...prevTask,
          assignedTo: selectedUser,
        }));
      } else {
        setTask((prevTask) => ({
          ...prevTask,
          [name]: name === "dueDate" ? new Date(value) : value,
        }));
      }
    } else {
      console.error("Unhandled event type");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(" before save task", task);
    if (!task.title) return;
    const newTask: ITask = {
      taskId: `task-${Date.now()}`,
      ...task,
    };
    console.log(" after save newTask", newTask);

    onCreate(newTask);
    setTask({
      title: "",
      assignedTo: null,
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

      {/* Title */}
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

      {/* Assign To */}
      <div className="mb-4">
        <label
          htmlFor="assignedTo"
          className="block text-sm font-medium text-gray-700"
        >
          Assign To
        </label>
        <FormControl fullWidth>
          <Select
            name="assignedTo"
            value={task.assignedTo?.email || ""}
            onChange={handleChange}
            renderValue={(value) => {
              if (!value) return <Typography>Select a participant</Typography>;
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
                <ListItemText
                  primary={participant.name}
                  secondary={participant.email}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Due Date */}
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

      {/* Status */}
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
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Create Button */}
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
