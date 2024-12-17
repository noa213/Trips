// import {
//     Checkbox,
//   List,
//   ListItem,
//   ListItemSecondaryAction,
//   ListItemText,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { ITask } from "../types/task";
// import { getTasks } from "../services/trips";

// const Tasks = () => {
//   const [tasks, setTasks] = useState<ITask[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getTasks();
//         setTasks(response);
//       } catch (error) {
//         console.error("Failed to fetch tasks:", error);
//       }
//     };
//     fetchData();
//   }, [setTasks]);

//   return (
//     //לעשות עם אפשרות להצביע במקום בלי להכנס לעמוד נוסף
//     <List>
//       {tasks ? (
//         tasks.map((task: ITask) => (
//           <ListItem key={task.taskId} sx={{ borderBottom: "1px solid #ccc" }}>
            
//             <Input type={Checkbox}><ListItemText
//               primary={task.title}
//               secondary={`Status: ${task.status} | Due Date: ${new Date(
//                 task.dueDate
//               ).toLocaleDateString()}`}
//             /></>
//             <ListItemSecondaryAction></ListItemSecondaryAction>
//           </ListItem>
//         ))
//       ) : (
//         <p>No tasks available for this trip.</p>
//       )}
//     </List>
//   );
// };

// export default Tasks;
