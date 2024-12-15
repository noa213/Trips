


// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Container,
//   Typography,
//   Grid,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
//   SelectChangeEvent,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemSecondaryAction,
//   IconButton,
//   Button,
//   Box,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import BudgetCalculator from "./BudgetCalculator";
// import { ITrip } from "../types/trip";
// import { IPoll } from "../types/poll";
// import { IBudgetCategories } from "../types/BudgetCategories";
// import { ITask } from "../types/task";
// import { IMemory } from "../types/memory";
// import { TripItem } from "../types/tripItem";
// import { Link as ScrollLink } from "react-scroll";
// import { addTrip } from "../services/trips";
// import CreatePoll from "@/app/components/CreatePoll"


// const CreateTripDialog = () => {
//   // const CreateTripDialog: React.FC<{ onAddTrip: (newTrip: ITrip) => void }> = ({
//   //   onAddTrip,
//   // }) => {
//   const [trip, setTrip] = useState<ITrip>({
//     title: "",
//     destination: "",
//     dates: {
//       start: new Date(),
//       end: new Date(),
//     },
//     budget: {
//       total: 0,
//       categories: {
//         transportation: 0,
//         accommodation: 0,
//         food: 0,
//         activities: 0,
//         misc: 0,
//       },
//       tripType: "urban",
//     },
//     participants: [],
//     tasks: [],
//     polls: [],
//     memories: [],
//     status: "active",
//   });
//   const [polls, setPolls] = useState<IPoll[]>([]);  // מערך הסקרים


//   const [poll, setPoll] = useState<IPoll>({
//     pollId: crypto.randomUUID(),
//     title: '',
//     questions: [],
//     status: "open",
//   });




//   const [task, setTask] = useState<ITask>({
//     taskId: crypto.randomUUID(),
//     title: "",
//     assignedTo: "Unassigned",
//     status: "notStarted",
//     dueDate: new Date(),
//   });
//   const [showCreatePoll, setShowCreatePoll] = useState(false);

//   const [memory, setMemory] = useState<IMemory>({
//     imageUrl: "",
//     description: "",
//     userId: "",
//     timestamp: new Date(),
//   });
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);



//   // const handleSave = async () => {
//   //   const response = await addTrip(trip);
//   //   onAddTrip(response);
//   //   console.log("response Details:", response);
//   // };

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setTrip((prevTrip) => ({
//       ...prevTrip,
//       [name]: value,
//     }));
//   };

//   const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const newValue = parseFloat(value);

//     // Update categories
//     const newCategories = {
//       ...trip.budget.categories,
//       [name]: newValue,
//     };

//     // Calculate total budget
//     const totalBudgetUsed = Object.values(newCategories).reduce(
//       (sum, amount) => sum + amount,
//       0
//     );

//     // Check if total budget exceeds
//     if (totalBudgetUsed > trip.budget.total) {
//       setErrorMessage("Total budget exceeded!");
//     } else {
//       setErrorMessage(null);
//     }

//     setTrip((prevTrip) => ({
//       ...prevTrip,
//       budget: {
//         ...prevTrip.budget,
//         categories: newCategories,
//       },
//     }));
//   };

//   const handleTotalBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const totalBudget = parseFloat(e.target.value);
//     setTrip((prevTrip) => ({
//       ...prevTrip,
//       budget: {
//         ...prevTrip.budget,
//         total: totalBudget,
//         categories: BudgetCalculator(totalBudget, prevTrip.budget.tripType),
//       },
//     }));
//   };

//   const handleTripTypeChange = (e: SelectChangeEvent<string>) => {
//     const tripType = e.target.value as string;
//     setTrip((prevTrip) => ({
//       ...prevTrip,
//       tripType,
//       budget: {
//         ...prevTrip.budget,
//         categories: BudgetCalculator(prevTrip.budget.total, tripType),
//       },
//     }));
//   };

//   const getCategoryPercentage = (category: keyof IBudgetCategories) => {
//     const categoryValue =
//       trip.budget.categories[category as keyof IBudgetCategories];
//     if (trip.budget.total === 0) return 0;
//     return ((categoryValue / trip.budget.total) * 100).toFixed(2);
//   };

//   // const handleCreateTask = (newTask: ITask) => {
//   //   console.log("New Task Created:", newTask);

//   //   if (newTask.title.trim() !== "") {
//   //     setTrip((prevTrip) => ({
//   //       ...prevTrip,
//   //       tasks: [...prevTrip.tasks, newTask],
//   //     }));
//   //   }
//   //   setAdd(false);
//   // };

//   // const handleAddTask = () => {
//   //   setAdd(true);
//   // };





//   const handleAddMemory = () => {
//     if (memory.description.trim() !== "") {
//       setTrip((prevTrip) => ({
//         ...prevTrip,
//         memories: [...prevTrip.memories, memory],
//       }));
//       setMemory({
//         imageUrl: "",
//         description: "",
//         userId: "",
//         timestamp: new Date(),
//       });
//     }
//   };

//   const handleRemoveItem = (
//     list: TripItem[],
//     item: TripItem,
//     type: "tasks" | "polls" | "memories"
//   ) => {
//     setTrip((prevTrip) => ({
//       ...prevTrip,
//       [type]: prevTrip[type].filter((i) => i !== item),
//     }));
//   };



//   const openaddpoll = () => {
//     setShowCreatePoll(!showCreatePoll);
//   };

//   const handlePollUpdate = (updatedPoll: IPoll) => {
//     console.log("Updated Poll:", updatedPoll);
//     setPolls((prevPolls) => [...prevPolls, updatedPoll]);
//     setPoll(updatedPoll); // עדכני את ה-state של ה-poll או עשי פעולה אחרת
//     setShowCreatePoll(false); // חוזרים למסך הקודם אחרי עדכון
//   };





//   return (
//     <Container maxWidth="lg">
//       <Grid container spacing={4}>
//         {/* Sidebar for Navigation */}
//         <Grid item xs={12} sm={3}>
//           <Box
//             sx={{
//               position: "sticky",
//               top: 0,
//               height: "100vh",
//               padding: 3,
//               backgroundColor: "#f4f4f4",
//               boxShadow: 2,
//               borderRadius: 2,
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{ fontWeight: "bold", color: "#81C784" }}
//             >
//               Navigation
//             </Typography>
//             <List>
//               <ListItem>
//                 <ScrollLink to="basic-details" smooth={true} duration={500}>
//                   Basic Details
//                 </ScrollLink>
//               </ListItem>
//               <ListItem>
//                 <ScrollLink to="budget-details" smooth={true} duration={500}>
//                   Budget Details
//                 </ScrollLink>
//               </ListItem>
//               <ListItem>
//                 <ScrollLink to="tasks" smooth={true} duration={500}>
//                   Tasks
//                 </ScrollLink>
//               </ListItem>
//               <ListItem>
//                 <ScrollLink to="polls" smooth={true} duration={500}>
//                   Polls
//                 </ScrollLink>

//               </ListItem>
//               <ListItem>
//                 <ScrollLink to="memories" smooth={true} duration={500}>
//                   Memories
//                 </ScrollLink>
//               </ListItem>
//             </List>
//           </Box>
//         </Grid>

//         {/* Main Content */}
//         <Grid item xs={12} sm={9}>
//           <Box sx={{ padding: 4 }}>
//             {/* Basic Details */}
//             <Grid item xs={12} id="basic-details" sx={{ marginBottom: 4 }}>
//               <Typography
//                 variant="h5"
//                 sx={{ fontWeight: "bold", color: "#81C784" }}
//               >
//                 Basic Details
//               </Typography>
//               <TextField
//                 label="Trip Title"
//                 name="title"
//                 value={trip.title}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//                 required
//                 sx={{
//                   backgroundColor: "#f9f9f9",
//                   borderRadius: 1,
//                 }}
//               />
//               <TextField
//                 label="Destination"
//                 name="destination"
//                 value={trip.destination}
//                 onChange={handleChange}
//                 fullWidth
//                 margin="normal"
//                 required
//                 sx={{
//                   backgroundColor: "#f9f9f9",
//                   borderRadius: 1,
//                 }}
//               />
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <TextField
//                     label="Start Date"
//                     type="date"
//                     value={trip.dates.start.toISOString().split("T")[0]}
//                     onChange={(e) =>
//                       setTrip((prevTrip) => ({
//                         ...prevTrip,
//                         dates: {
//                           ...prevTrip.dates,
//                           start: new Date(e.target.value),
//                         },
//                       }))
//                     }
//                     fullWidth
//                     margin="normal"
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     required
//                     sx={{
//                       backgroundColor: "#f9f9f9",
//                       borderRadius: 1,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={6}>
//                   <TextField
//                     label="End Date"
//                     type="date"
//                     value={trip.dates.end.toISOString().split("T")[0]}
//                     onChange={(e) =>
//                       setTrip((prevTrip) => ({
//                         ...prevTrip,
//                         dates: {
//                           ...prevTrip.dates,
//                           end: new Date(e.target.value),
//                         },
//                       }))
//                     }
//                     fullWidth
//                     margin="normal"
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                     required
//                     sx={{
//                       backgroundColor: "#f9f9f9",
//                       borderRadius: 1,
//                     }}
//                   />
//                 </Grid>
//               </Grid>
//             </Grid>

//             {/* Budget */}
//             <Grid item xs={12} id="budget-details" sx={{ marginBottom: 4 }}>
//               <Typography
//                 variant="h5"
//                 sx={{ fontWeight: "bold", color: "#81C784" }}
//               >
//                 Budget Details
//               </Typography>
//               <TextField
//                 label="Total Budget"
//                 name="total"
//                 type="number"
//                 value={trip.budget.total}
//                 onChange={handleTotalBudgetChange}
//                 fullWidth
//                 margin="normal"
//                 required
//                 sx={{
//                   backgroundColor: "#f9f9f9",
//                   borderRadius: 1,
//                 }}
//               />
//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Trip Type</InputLabel>
//                 <Select
//                   value={trip.budget.tripType}
//                   onChange={handleTripTypeChange}
//                   name="tripType"
//                   label="Trip Type"
//                   sx={{
//                     backgroundColor: "#f9f9f9",
//                     borderRadius: 1,
//                   }}
//                 >
//                   <MenuItem value="urban">Urban</MenuItem>
//                   <MenuItem value="nature">Nature</MenuItem>
//                   <MenuItem value="family">Family</MenuItem>
//                 </Select>
//               </FormControl>
//               {Object.entries(trip.budget.categories).map(
//                 ([category, amount]) => (
//                   <Grid
//                     container
//                     spacing={2}
//                     key={category}
//                     alignItems="center"
//                   >
//                     <Grid item xs={8}>
//                       <TextField
//                         label={
//                           category.charAt(0).toUpperCase() + category.slice(1)
//                         }
//                         name={category}
//                         type="number"
//                         value={amount}
//                         onChange={handleBudgetChange}
//                         fullWidth
//                         margin="normal"
//                         sx={{
//                           backgroundColor: "#f9f9f9",
//                           borderRadius: 1,
//                         }}
//                       />
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography variant="body2" align="right">
//                         {getCategoryPercentage(
//                           category as keyof IBudgetCategories
//                         )}
//                         % of Total Budget
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 )
//               )}
//               {errorMessage && (
//                 <Typography
//                   variant="body2"
//                   color="error"
//                   align="center"
//                   sx={{ marginTop: 2 }}
//                 >
//                   {errorMessage}
//                 </Typography>
//               )}
//             </Grid>

//             {/* Tasks
//             <Grid item xs={12} id="tasks">
//               <Typography variant="h6">Tasks</Typography>
//               {add ? (
//                 <CreateTask
//                   onCreate={handleCreateTask}
//                   participants={["Alice", "Bob", "Charlie"]}
//                 />
//               ) : (
//                 <>
//                   <Button
//                     variant="contained"
//                     onClick={handleAddTask}
//                     color="primary"
//                     style={{ marginBottom: "1rem" }}
//                   >
//                     Add Task
//                   </Button>

//                   <List>
//                     {trip.tasks ? (
//                       trip.tasks.map((task) => (
//                         <ListItem
//                           key={task.taskId}
//                           sx={{ borderBottom: "1px solid #ccc" }}
//                         >
//                           <ListItemText
//                             primary={task.title}
//                             secondary={`Status: ${
//                               task.status
//                             } | Due Date: ${task.dueDate.toLocaleDateString()}`}
//                           />
//                           <ListItemSecondaryAction>
//                             <IconButton
//                               edge="end"
//                               onClick={() =>
//                                 handleRemoveItem(trip.tasks, task, "tasks")
//                               }
//                             >
//                               <DeleteIcon />
//                             </IconButton>
//                           </ListItemSecondaryAction>
//                         </ListItem>
//                       ))
//                     ) : (
//                       <Typography variant="body2" color="textSecondary">
//                         No tasks added yet.
//                       </Typography>
//                     )}
//                   </List>
//                 </>
//               )}
//             </Grid> */}

//             {/* Polls */}
//             <Grid item xs={12} id="polls">
//               <Typography variant="h6">Polls</Typography>
//               {/* <TextField
//                 label="New Poll"
//                 value={poll}
//                 fullWidth
//                 margin="normal"
//               /> */}
//                {showCreatePoll
//                 ? <CreatePoll poll={poll} onPollUpdate={handlePollUpdate} />
//                 : <Button
//                   variant="contained"
//                   onClick={openaddpoll}
//                   color="primary"
//                   style={{ marginBottom: "1rem" }}
//                 >
//                   Add Poll
//                 </Button>
//               }

//               {/* <List>
//                 {trip.polls.map((poll, index) => (
//                   <ListItem key={index}>
//                     <ListItemText primary={poll.question} />
//                     <ListItemSecondaryAction>
//                       <IconButton
//                         edge="end"
//                         onClick={() =>
//                           handleRemoveItem(trip.polls, poll, "polls")
//                         }
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </ListItemSecondaryAction>
//                   </ListItem>
//                 ))}
//               </List> */}
//             </Grid>

//             {/* Memories */}
//             <Grid item xs={12} id="memories" sx={{ marginBottom: 4 }}>
//               <Typography
//                 variant="h5"
//                 sx={{ fontWeight: "bold", color: "#81C784" }}
//               >
//                 Memories
//               </Typography>
//               <TextField
//                 label="New Memory"
//                 value={memory}
//                 fullWidth
//                 margin="normal"
//                 sx={{
//                   backgroundColor: "#f9f9f9",
//                   borderRadius: 1,
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 onClick={handleAddMemory}
//                 color="primary"
//                 sx={{ marginBottom: "1rem" }}
//               >
//                 Add Memory
//               </Button>
//               <List>
//                 {trip.memories.map((memory, index) => (
//                   <ListItem key={index}>
//                     <ListItemText primary={memory.description} />
//                     <ListItemSecondaryAction>
//                       <IconButton
//                         edge="end"
//                         onClick={() =>
//                           handleRemoveItem(trip.memories, memory, "memories")
//                         }
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </ListItemSecondaryAction>
//                   </ListItem>
//                 ))}
//               </List>
//             </Grid>

//             {/* Save Button */}
//             <Grid
//               item
//               xs={12}
//               sx={{ display: "flex", justifyContent: "center" }}
//             >
//               <Button
//                 variant="contained"
//                 color="primary"
//                 // onClick={handleSave}
//                 size="large"
//                 sx={{
//                   padding: "10px 20px",
//                   fontWeight: "bold",
//                   backgroundColor: "#81C784",
//                 }}
//               >
//                 Save Trip
//               </Button>
//             </Grid>
//           </Box>
//         </Grid>
//       </Grid>
//     </Container>מ
//   );
// };

// export default CreateTripDialog;
















































