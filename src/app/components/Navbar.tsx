"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import HomeIcon from "@mui/icons-material/Home";
// import TaskIcon from "@mui/icons-material/Task";
// import PollIcon from "@mui/icons-material/Poll";
// import TripIcon from "@mui/icons-material/Chat";

const Navbar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
    {/* <TripIcon/> */}
      <Tabs
        value={value}
        onChange={handleChange}
        className="bg-[#f7f2e7] text-gray-700 mt-2 px-4"
        TabIndicatorProps={{
          style: { background: "#9B111E" },
        }}
        textColor="inherit"
      >
        <Tab
          label="home"
          component={Link}
          href="/"
          sx={{
            color: value === 0 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label="trips"
          component={Link}
          href="/"
          sx={{
            color: value === 1 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label="tasks"
          component={Link}
          href="/"
          sx={{
            color: value === 2 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label="polls"
          component={Link}
          href="/pages/polls"
          sx={{
            color: value === 3 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label="new trip"
          component={Link}
          href="/"
          sx={{
            color: value === 4 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        {/* <Tab
          label="תכנון טיול"
          component={Link}
          href="/pages/Planning_a_trip"
          sx={{
            color: value === 5 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label="טיולים קודמים"
          component={Link}
          href="/pages/Previous_trips"
          sx={{
            color: value === 6 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        /> */}
      </Tabs>
      {/* <Tabs
        value={value}
        onChange={handleChange}
        className="bg-[#f7f2e7] text-gray-700 mt-2 px-4"
        TabIndicatorProps={{
          style: { background: "#9B111E" },
        }}
        textColor="inherit"
      >
        <Tab
          label={<HomeIcon />}
          component={Link}
          href="/"
          sx={{
            color: value === 0 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label={<TripIcon />}
          component={Link}
          href="/"
          sx={{
            color: value === 1 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label={<TaskIcon />}
          component={Link}
          href="/"
          sx={{
            color: value === 2 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label={<PollIcon />}
          component={Link}
          href="/"
          sx={{
            color: value === 3 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label="new trip"
          component={Link}
          href="/"
          sx={{
            color: value === 4 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label="תכנון טיול"
          component={Link}
          href="/pages/Planning_a_trip"
          sx={{
            color: value === 5 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label="טיולים קודמים"
          component={Link}
          href="/pages/Previous_trips"
          sx={{
            color: value === 6 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
      </Tabs> */}

    </>
  );
};

export default Navbar;
