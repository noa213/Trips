"use client";
import React, { useEffect, useState } from "react";
import {  useSession } from "next-auth/react";
import {
  TextField,
  Container,
  Typography,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BudgetCalculator from "./BudgetCalculator";
import CreateTask from "./CreateTask";
import CreatePoll from "./CreatePoll";
import { ITrip } from "../types/trip";
import { IBudgetCategories } from "../types/BudgetCategories";
import { TripItem } from "../types/tripItem";
import { ITask } from "../types/task";
import { IPoll } from "../types/poll";
import { addTrip } from "../services/trips";
// import Image from "next/image";
// import { Session } from "inspector/promises";
import UserAutocomplete from "./UserAutocomplete";
import { IUser } from "../types/user";
import { sendPoll } from "../services/polls";
import Navigation from "./Navigation";


const tripTypeImages: { [key: string]: string } = {
  urban: "/./images/urban.jpg",
  nature: "/images/nature.jpg",
  family: "/images/family.jpg",
};
const CreateTrip: React.FC<{ onAddTrip: (newTrip: ITrip) => void }> = ({
  onAddTrip,
}) => {  
  const { data: session } = useSession();
  
  const [trip, setTrip] = useState<ITrip>({
    title: "",
    adminNmame: "",
    destination: "",
    dates: {
      start: new Date(),
      end: new Date(),
    },
    budget: {
      total: 0,
      categories: {
        transportation: 0,
        accommodation: 0,
        food: 0,
        activities: 0,
        misc: 0,
      },
      tripType: "urban",
    },
    // 
    participants: [session!.user as IUser],
    tasks: [],
    polls: [],
    memories: [],
    image: tripTypeImages.urban,
    status: "active",
    images: [],
  });

  const [addTask, setAddTask] = useState(false);
  const [addPoll, setAddPoll] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const [isChecked, setIsChecked] = useState<boolean>(false);

  // const handleSendEail = () => {
  //   setIsChecked((prev) => !prev);
  //   console.log(isChecked);

  // }

  const [isChecked, setIsChecked] = useState<boolean>(false);


  const handleSendail = () => {
    setIsChecked((prev) => !prev); // שינוי מצב הצ'קבוקס
  };
  const handleRemoveItem1 = (item: any, type: string) => {
    console.log("Remove item:", item, type);
  };


  useEffect(() => { }, [trip]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value,
    }));
  };

  const handleTotalBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const totalBudget = parseFloat(e.target.value);
    setTrip((prevTrip) => ({
      ...prevTrip,
      budget: {
        ...prevTrip.budget,
        total: totalBudget,
        categories: BudgetCalculator(totalBudget, prevTrip.budget.tripType),
      },
    }));
  };

  const handleTripTypeChange = (e: SelectChangeEvent<string>) => {
    const tripType = e.target.value as string;
    setTrip((prevTrip) => ({
      ...prevTrip,
      tripType,
      budget: {
        ...prevTrip.budget,
        categories: BudgetCalculator(prevTrip.budget.total, tripType),
      },
    }));
  };

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = parseFloat(value);

    // Update categories
    const newCategories = {
      ...trip.budget.categories,
      [name]: newValue,
    };

    // Calculate total budget
    const totalBudgetUsed = Object.values(newCategories).reduce(
      (sum, amount) => sum + amount,
      0
    );

    // Check if total budget exceeds
    if (totalBudgetUsed > trip.budget.total) {
      setErrorMessage("Total budget exceeded!");
    } else {
      setErrorMessage(null);
    }

    setTrip((prevTrip) => ({
      ...prevTrip,
      budget: {
        ...prevTrip.budget,
        categories: newCategories,
      },
    }));
  };

  const getCategoryPercentage = (category: keyof IBudgetCategories) => {
    const categoryValue =
      trip.budget.categories[category as keyof IBudgetCategories];
    if (trip.budget.total === 0) return 0;
    return ((categoryValue / trip.budget.total) * 100).toFixed(2);
  };

  const handleCreateTask = () => {
    setAddTask(true);
  };

  const handleAddTask = (newTask: ITask) => {
    if (newTask.title.trim() !== "")
      setTrip((prevTrip) => ({
        ...prevTrip,
        tasks: [...prevTrip.tasks, newTask],
      }));
    setAddTask(false);
  };

  const handleCreatePoll = () => {
    setAddPoll(!addPoll);
  };

  const handleAddPoll = (newPoll: IPoll) => {
    console.log("newPoll", newPoll);

    if (newPoll.question.trim() !== "")
      setTrip((prevTrip) => ({
        ...prevTrip,
        polls: [...prevTrip.polls, newPoll],
      }));
    setAddPoll(false);
  };

  const handleCreateUser = () => {
    setAddUser(!addUser);
  };

  // const handleAddUser = (newUsers: IUser[]) => {
  //   if (newUsers.email !== "")
  //     setTrip((prevTrip) => ({
  //       ...prevTrip,
  //       participants: [...prevTrip.participants, newUser],
  //     }));
  //   setAddUser(false);
  // };


  const handleAddUser = (newUsers: IUser[]) => {
    if (newUsers.length > 0) {
      setTrip((prevTrip) => ({
        ...prevTrip,
        participants: [
          ...prevTrip.participants,
          ...newUsers.map((user) => ({
            email: user.email,
            image: user.image,
            name: user.name,
          })),
        ],
      }));
    }
    setAddUser(false);
  };

  // const handleAddMemory = () => {
  //   if (memory.description.trim() !== "") {
  //     setTrip((prevTrip) => ({
  //       ...prevTrip,
  //       memories: [...prevTrip.memories, memory],
  //     }));
  //     setMemory({
  //       imageUrl: "",
  //       description: "",
  //       userId: "",
  //       timestamp: new Date(),
  //     });
  //   }
  // };

  const handleRemoveItem = (
    // list: TripItem[],
    item: TripItem,
    type: "tasks" | "polls" | "memories"
  ) => {
    setTrip((prevTrip) => ({
      ...prevTrip,
      [type]: prevTrip[type].filter((i) => i !== item),
    }));
  };

  const handleSave = async () => {
    trip.adminNmame = session?.user.name;
    console.log("trip", trip);
    const response = await addTrip(trip);
    // sendPoll(trip.polls);
    onAddTrip(response);
    console.log("after add", response.polls);
  };

 
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Sidebar for Navigation */}
        <Navigation />
        {/* Main Content */}
        <Grid item xs={12} sm={9}>
          <Box sx={{ padding: 4 }}>
            {/* Basic Details */}
            <Grid item xs={12} id="basic-details" sx={{ marginBottom: 4 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#81C784" }}
              >
                Basic Details
              </Typography>
              {addUser ? (
                <UserAutocomplete
                  onCreate={handleAddUser}
                />
               ) : (
                <div>
              <Button
                    variant="contained"
                    onClick={handleCreateUser}
                    color="primary"
                    style={{ marginBottom: "1rem" }}
                  >
                    Add User
                  </Button>
                </div>
              )}

              <TextField
                label="Trip Title"
                name="title"
                value={trip.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 1,
                }}
              />
              <TextField
                label="Destination"
                name="destination"
                value={trip.destination}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 1,
                }}
              />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Start Date"
                    type="date"
                    value={trip.dates.start.toISOString().split("T")[0]}
                    onChange={(e) =>
                      setTrip((prevTrip) => ({
                        ...prevTrip,
                        dates: {
                          ...prevTrip.dates,
                          start: new Date(e.target.value),
                        },
                      }))
                    }
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    sx={{
                      backgroundColor: "#f9f9f9",
                      borderRadius: 1,
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="End Date"
                    type="date"
                    value={trip.dates.end.toISOString().split("T")[0]}
                    onChange={(e) =>
                      setTrip((prevTrip) => ({
                        ...prevTrip,
                        dates: {
                          ...prevTrip.dates,
                          end: new Date(e.target.value),
                        },
                      }))
                    }
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    sx={{
                      backgroundColor: "#f9f9f9",
                      borderRadius: 1,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Budget */}
            <Grid item xs={12} id="budget-details" sx={{ marginBottom: 4 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#81C784" }}
              >
                Budget Details
              </Typography>
              <TextField
                label="Total Budget"
                name="total"
                type="number"
                value={trip.budget.total}
                onChange={handleTotalBudgetChange}
                fullWidth
                margin="normal"
                required
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: 1,
                }}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Trip Type</InputLabel>
                <Select
                  value={trip.budget.tripType}
                  onChange={handleTripTypeChange}
                  name="tripType"
                  label="Trip Type"
                  sx={{
                    backgroundColor: "#f9f9f9",
                    borderRadius: 1,
                  }}
                >
                  <MenuItem value="urban">Urban</MenuItem>
                  <MenuItem value="nature">Nature</MenuItem>
                  <MenuItem value="family">Family</MenuItem>
                </Select>
              </FormControl>
              {Object.entries(trip.budget.categories).map(
                ([category, amount]) => (
                  <Grid
                    container
                    spacing={2}
                    key={category}
                    alignItems="center"
                  >
                    <Grid item xs={8}>
                      <TextField
                        label={
                          category.charAt(0).toUpperCase() + category.slice(1)
                        }
                        name={category}
                        type="number"
                        value={amount}
                        onChange={handleBudgetChange}
                        fullWidth
                        margin="normal"
                        sx={{
                          backgroundColor: "#f9f9f9",
                          borderRadius: 1,
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" align="right">
                        {getCategoryPercentage(
                          category as keyof IBudgetCategories
                        )}
                        % of Total Budget
                      </Typography>
                    </Grid>
                  </Grid>
                )
              )}
              {errorMessage && (
                <Typography
                  variant="body2"
                  color="error"
                  align="center"
                  sx={{ marginTop: 2 }}
                >
                  {errorMessage}
                </Typography>
              )}
            </Grid>

            {/* Tasks */}
            <Grid item xs={12} id="tasks">
              <Typography variant="h6">Tasks</Typography>
              {addTask ? (
                <CreateTask
                  onCreate={handleAddTask}
                  participants={trip.participants}
                />
              ) : (
                <>
                  <Button
                    variant="contained"
                    onClick={handleCreateTask}
                    color="primary"
                    style={{ marginBottom: "1rem" }}
                  >
                    Add Task
                  </Button>
                  <List>
                    {trip.tasks ? (
                      trip.tasks.map((task) => (
                        <ListItem
                          key={task.taskId}
                          sx={{ borderBottom: "1px solid #ccc" }}
                        >
                          <ListItemText
                            primary={task.title}
                            secondary={`Status: ${task.status
                              } | Due Date: ${task.dueDate.toLocaleDateString()}`}
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
                      <Typography variant="body2" color="textSecondary">
                        No tasks added yet.
                      </Typography>
                    )}
                  </List>
                </>
              )}
            </Grid>

            {/* Polls */}
            <Grid item xs={12} id="polls">
              <Typography variant="h6">Polls</Typography>
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
                        <div className="flex flex-col items-start space-y-4 p-4">
                          <h1 className="text-gray-700 text-sm font-semibold">Do you want to send travelers this survey?</h1>

                          {/* מיכל הצ'קבוקס */}
                          <div
                            className={`w-16 h-8 flex items-center justify-${isChecked ? "end" : "start"} bg-gray-300 rounded-full p-1 cursor-pointer transition-all duration-300 ease-in-out`}
                            onClick={handleSendail}
                          >
                            {/* הכדור הפנימי */}
                            <div
                              className={`w-6 h-6  rounded-full shadow-md transition-all duration-300 ease-in-out ${isChecked ? "bg-green-500 translate-x-0.5" : "bg-white translate-x-0"}`}
                            />
                          </div>

                          {/* כפתור המחיקה ימוקם מימין */}
                          <div className="flex justify-end w-full">
                            <IconButton edge="end" onClick={() => handleRemoveItem1(poll,"polls")}>
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </div>

                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No polls added yet.
                  </Typography>
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
            </Grid>

            {/* Save Button */}
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                size="large"
                sx={{
                  padding: "10px 20px",
                  fontWeight: "bold",
                  backgroundColor: "#81C784",
                }}
              >
                Save Trip
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateTrip;
