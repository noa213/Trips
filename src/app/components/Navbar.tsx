// "use client"
// import Link from 'next/link';
// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   InputBase,
//   Button,
//   Tabs,
//   Tab,
// } from "@mui/material";


// const Navbar = () => {
//   const [value, setValue] = useState(0);
//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);

//   };
//   return (
//     <>
//       <Tabs
//         value={value}
//         onChange={handleChange}
//         className="bg-[#f7f2e7] text-gray-700 mt-2 px-4"
//         TabIndicatorProps={{
//           style: { background: "#9B111E" },
//         }}
//         // indicatorColor="primary"
//         textColor="inherit"
//       >
//         {/* #c0281a */}
//         <Tab href={`/pages/Planning_a_trip`}
//           label="תכנון טיול"
//           sx={{
//             color: value === 0 ? "#9B111E" : "#374151",
//             "&.mui-selected": { color: "#9B111E" },

//           }}
//         />
//         <Tab href={`/pages/Previous_trips`}
//           label="טיולים קודמים"
//           sx={{
//             color: value === 1 ? "#9B111E" : "#374151",
//             "&.mui-selected": { color: "#9B111E" },
//           }}
//         />

//         <Tab href={`/`}
//           label="דף הבית"
//           sx={{
//             color: value === 1 ? "#9B111E" : "#374151",
//             "&.mui-selected": { color: "#9B111E" },
//           }}
//         />

//       </Tabs>
//     </>
//   );
// }

// export default Navbar;



"use client";
import Link from 'next/link';
import React, { useState } from "react";
import { AppBar, Toolbar, Typography, InputBase, Button, Tabs, Tab } from "@mui/material";

const Navbar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        className="bg-[#f7f2e7] text-gray-700 mt-2 px-4"
        TabIndicatorProps={{
          style: { background: "#9B111E" },  // קו הבורדו מתחת לטאב הנבחר
        }}
        textColor="inherit"
      >
        <Tab
          component={Link} // השתמש בקישור אם אתה רוצה ניווט
          href="/pages/Planning_a_trip"
          label="תכנון טיול"
          sx={{
            color: value === 0 ? "#9B111E" : "#374151", // צבע טקסט טאב נבחר
            "&.mui-selected": { color: "#9B111E" }, // צבע טקסט כאשר הטאב נבחר
          }}
        />
        <Tab
          component={Link} // השתמש בקישור אם אתה רוצה ניווט
          href="/pages/Previous_trips"
          label="טיולים קודמים"
          sx={{
            color: value === 1 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          component={Link} // השתמש בקישור אם אתה רוצה ניווט
          href="/"
          label="דף הבית"
          sx={{
            color: value === 2 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
      </Tabs>
    </>
  );
};

export default Navbar;
