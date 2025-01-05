"use client";
import { useEffect, useState } from "react";
import { ITrip } from "../../types/trip";
import { deleteTripItem, getTrip, updateTrip } from "../../services/trips";
import { useParams } from "next/navigation";
// import { MdModeEdit } from "react-icons/md";
import BudgetComponent from "../BudgetComponent";
import EditableField from "../EditableField";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import CreatePoll from "../CreatePoll";
import DeleteIcon from "@mui/icons-material/Delete";
import { IPoll } from "../../types/poll";
import { TripItem } from "../../types/tripItem";
import CreateTask from "../CreateTask";
import { ITask } from "../../types/task";

const AdminTripDetail = () => {
  const [trip, setTrip] = useState<ITrip>();
  const [updatedValue, setUpdatedValue] = useState<string>("");
  const [addTask, setAddTask] = useState(false);
  const [addPoll, setAddPoll] = useState(false);

  const router = useParams();
  const id = router.tripId;

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

  const handleSave = async (field: string, value?: unknown) => {
    if (trip) {
      let updatedTrip = { ...trip };
      if (field === "startDate" || field === "endDate")
        updatedTrip.dates[field === "startDate" ? "start" : "end"] = new Date(
          value as string
        );
      else updatedTrip = { ...trip, [field]: value ? value : updatedValue };
      try {
        const response = await updateTrip(updatedTrip);
        setTrip(response);
        setUpdatedValue("");
      } catch (error) {
        console.error("Failed to save trip:", error);
      }
    }
  };

  const handleCreateTask = () => {
    setAddTask(true);
  };

  const handleAddTask = async (newTask: ITask) => {
    if (newTask.title.trim() !== "") {
      const updatedTrip: ITrip = {
        ...trip!,
        tasks: [...trip!.tasks, newTask],
      };
      setAddTask(false);
      try {
        const response = await updateTrip(updatedTrip);
        setTrip(response);
        setUpdatedValue("");
      } catch (error) {
        console.error("Failed to save trip:", error);
      }
    }
  };

  const handleCreatePoll = () => {
    setAddPoll(!addPoll);
  };

  const handleAddPoll = async (newPoll: IPoll) => {
    if (newPoll.question.trim() !== "") {
      const updatedTrip: ITrip = {
        ...trip!,
        polls: [...trip!.polls, newPoll],
      };
      setAddPoll(false);
      try {
        const response = await updateTrip(updatedTrip);
        setTrip(response);
        setUpdatedValue("");
      } catch (error) {
        console.error("Failed to save trip:", error);
      }
    }
  };

  const handleRemoveItem = async (
    item: TripItem,
    type: "tasks" | "polls" | "memories"
  ) => {
    const updatedTrip: ITrip = {
      ...trip!,
      [type]: trip![type].filter((i) => i !== item),
    };
    try {
      console.log("tripItem", item);
      console.log("item", item._id);

      // איך אני שולחת את המזהה של הפריט?
      const response = await deleteTripItem(updatedTrip._id!, item._id!, type);
      setTrip(response);
    } catch (error) {
      console.error("Error deleting tripItem:", error);
    }
  };

  console.log(trip?.tasks);

  return (
    <>
      {trip ? (
        <div className="trip-detail p-6 rounded-lg shadow-lg border max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">{trip.title}</h1>

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

          {/* Tasks */}
          <div className="tasks mt-6">
            <h3 className="text-xl font-semibold mb-2">Tasks</h3>
            <List>
              {trip.tasks ? (
                trip.tasks.map((task) => (
                  <ListItem
                    key={task.taskId}
                    sx={{ borderBottom: "1px solid #ccc" }}
                  >
                    <ListItemText
                      primary={task.title}
                      secondary={`Status: ${task.status} | Due Date: ${new Date(
                        task.dueDate
                      ).toLocaleDateString()}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveItem(task, "tasks")}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <p>No tasks available for this trip.</p>
              )}
            </List>

            {addTask ? (
              <CreateTask
                onCreate={handleAddTask}
                participants={trip.participants}
              />
            ) : (
              <Button
                variant="contained"
                onClick={handleCreateTask}
                color="primary"
                style={{ marginBottom: "1rem" }}
              >
                Add Task
              </Button>
            )}
          </div>

          {/* Polls */}
          <div className="polls mt-6">
            <h3 className="text-xl font-semibold mb-2">Polls</h3>
            <List>
              {trip.polls ? (
                trip.polls.map((poll) => (
                  <ListItem
                    key={poll.pollId}
                    sx={{ borderBottom: "1px solid #ccc" }}
                  >
                    <ListItemText
                      primary={poll.question}
                      secondary={poll.options
                        .map((option) => option.value)
                        .join(" | ")}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveItem(poll, "polls")}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <p>No polls available for this trip.</p>
              )}
            </List>
            {addPoll ? (
              <CreatePoll onCreate={handleAddPoll} />
            ) : (
              <Button
                variant="contained"
                onClick={handleCreatePoll}
                color="primary"
                sx={{ marginBottom: "1rem" }}
              >
                Add Poll
              </Button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default AdminTripDetail;
