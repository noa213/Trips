// "use client";
// import React, { useState } from "react";
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
// } from "@mui/material";
// import BudgetCalculator from "./BudgetCalculator";
// import { ITrip } from "../types/trip";
// import { IBudgetCategories } from "../types/BudgetCategories";

// const CreateDetailedTrip: React.FC = () => {
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
//       participants: [],
//     },
//     tasks: [],
//     polls: [],
//     memories: [],
//     status: "active",
//   });

//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

//   return (
//     <Container maxWidth="lg">
//       <Grid container spacing={2}>
//         {/* Basic Details */}
//         <Grid item xs={12}>
//           <Typography variant="h6">Basic Details</Typography>
//           <TextField
//             label="Trip Title"
//             name="title"
//             value={trip.title}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Destination"
//             name="destination"
//             value={trip.destination}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Start Date"
//             type="date"
//             value={trip.dates.start.toISOString().split("T")[0]}
//             onChange={(e) =>
//               setTrip((prevTrip) => ({
//                 ...prevTrip,
//                 dates: {
//                   ...prevTrip.dates,
//                   start: new Date(e.target.value),
//                 },
//               }))
//             }
//             fullWidth
//             margin="normal"
//             InputLabelProps={{
//               shrink: true,
//             }}
//             required
//           />
//           <TextField
//             label="End Date"
//             type="date"
//             value={trip.dates.end.toISOString().split("T")[0]}
//             onChange={(e) =>
//               setTrip((prevTrip) => ({
//                 ...prevTrip,
//                 dates: {
//                   ...prevTrip.dates,
//                   end: new Date(e.target.value),
//                 },
//               }))
//             }
//             fullWidth
//             margin="normal"
//             InputLabelProps={{
//               shrink: true,
//             }}
//             required
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <Typography variant="h6">Basic Details</Typography>
//           <TextField
//             label="Trip Title"
//             name="title"
//             value={trip.title}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Destination"
//             name="destination"
//             value={trip.destination}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//         </Grid>

//         <Grid item xs={12}>
//           <Grid container spacing={2}>
//             <Grid item xs={6}>
//               <TextField
//                 label="Start Date"
//                 type="date"
//                 value={trip.dates.start.toISOString().split("T")[0]}
//                 onChange={(e) =>
//                   setTrip((prevTrip) => ({
//                     ...prevTrip,
//                     dates: {
//                       ...prevTrip.dates,
//                       start: new Date(e.target.value),
//                     },
//                   }))
//                 }
//                 fullWidth
//                 margin="normal"
//                 // InputLabelProps={{
//                 //   shrink: true,
//                 // }}
//                 required
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 label="End Date"
//                 type="date"
//                 value={trip.dates.end.toISOString().split("T")[0]}
//                 onChange={(e) =>
//                   setTrip((prevTrip) => ({
//                     ...prevTrip,
//                     dates: {
//                       ...prevTrip.dates,
//                       end: new Date(e.target.value),
//                     },
//                   }))
//                 }
//                 fullWidth
//                 margin="normal"
//                 // InputLabelProps={{
//                 //   shrink: true,
//                 // }}
//                 required
//               />
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* Budget */}
//         <Grid item xs={12}>
//           <Typography variant="h6">Budget Details</Typography>
//           <TextField
//             label="Total Budget"
//             name="total"
//             type="number"
//             value={trip.budget.total}
//             onChange={handleTotalBudgetChange}
//             fullWidth
//             margin="normal"
//             required
//           />

//           <FormControl fullWidth margin="normal">
//             <InputLabel>Trip Type</InputLabel>
//             <Select
//               value={trip.budget.tripType}
//               onChange={handleTripTypeChange}
//               name="tripType"
//               label="Trip Type"
//             >
//               <MenuItem value="urban">Urban</MenuItem>
//               <MenuItem value="nature">Nature</MenuItem>
//               <MenuItem value="family">Family</MenuItem>
//             </Select>
//           </FormControl>

//           {Object.entries(trip.budget.categories).map(([category, amount]) => (
//             <Grid container spacing={2} key={category} alignItems="center">
//               <Grid item xs={8}>
//                 <TextField
//                   label={category.charAt(0).toUpperCase() + category.slice(1)}
//                   name={category}
//                   type="number"
//                   value={amount}
//                   onChange={handleBudgetChange}
//                   fullWidth
//                   margin="normal"
//                 />
//               </Grid>
//               <Grid item xs={4}>
//                 <Typography variant="body2" align="right">
//                   {getCategoryPercentage(category as keyof IBudgetCategories)}%
//                   of Total Budget
//                 </Typography>
//               </Grid>
//             </Grid>
//           ))}

//           {/* Error message if budget exceeds */}
//           {errorMessage && (
//             <Typography
//               variant="body2"
//               color="error"
//               align="center"
//               marginTop={2}
//             >
//               {errorMessage}
//             </Typography>
//           )}
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default CreateDetailedTrip;



"use client";
import React, { useState } from "react";
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
  Button,
} from "@mui/material";
import BudgetCalculator from "./BudgetCalculator";
import { ITrip } from "../types/trip";
import { IBudgetCategories } from "../types/BudgetCategories";

const CreateDetailedTrip: React.FC = () => {
  const [trip, setTrip] = useState<ITrip>({
    title: "",
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
      participants: [],
    },
    tasks: [],
    polls: [],
    memories: [],
    status: "active",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSave = () => {
    console.log("Trip Details:", trip);
    alert("Trip details saved successfully!"); // פעולה לדוגמה
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value,
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
  const getCategoryPercentage = (category: keyof IBudgetCategories) => {
    const categoryValue =
      trip.budget.categories[category as keyof IBudgetCategories];
    if (trip.budget.total === 0) return 0;
    return ((categoryValue / trip.budget.total) * 100).toFixed(2);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {/* Basic Details */}
        <Grid item xs={12}>
          <Typography variant="h6">Basic Details</Typography>
          <TextField
            label="Trip Title"
            name="title"
            value={trip.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Destination"
            name="destination"
            value={trip.destination}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
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
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Budget */}
        <Grid item xs={12}>
          <Typography variant="h6">Budget Details</Typography>
          <TextField
            label="Total Budget"
            name="total"
            type="number"
            value={trip.budget.total}
            onChange={handleTotalBudgetChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Trip Type</InputLabel>
            <Select
              value={trip.budget.tripType}
              onChange={handleTripTypeChange}
              name="tripType"
              label="Trip Type"
            >
              <MenuItem value="urban">Urban</MenuItem>
              <MenuItem value="nature">Nature</MenuItem>
              <MenuItem value="family">Family</MenuItem>
            </Select>
          </FormControl>
          {Object.entries(trip.budget.categories).map(([category, amount]) => (
            <Grid container spacing={2} key={category} alignItems="center">
              <Grid item xs={8}>
                <TextField
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  name={category}
                  type="number"
                  value={amount}
                  onChange={handleBudgetChange}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" align="right">
                  {getCategoryPercentage(category as keyof IBudgetCategories)}%
                  of Total Budget
                </Typography>
              </Grid>
            </Grid>
          ))}
          {/* Error message if budget exceeds */}
          {errorMessage && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              marginTop={2}
            >
              {errorMessage}
            </Typography>
          )}
        </Grid>

        {/* Save Button */}
        <Grid item xs={12} align="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            size="large"
          >
            Save Trip
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CreateDetailedTrip;
