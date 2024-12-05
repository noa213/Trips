







"use client"
import Link from 'next/link';
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Tabs,
  Tab,
} from "@mui/material";

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
          style: { background: "#9B111E" },
        }}
        textColor="inherit"
      >
        <Tab
          label="תכנון טיול"
          component={Link}
          href="/pages/Planning_a_trip"
          sx={{
            color: value === 0 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label="טיולים קודמים"
          component={Link}
          href="/pages/Previous_trips"
          sx={{
            color: value === 1 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
        <Tab
          label="דף הבית"
          component={Link}
          href="/"
          sx={{
            color: value === 2 ? "#9B111E" : "#374151",
            "&.mui-selected": { color: "#9B111E" },
          }}
        />
      </Tabs>
    </>
  );
}

export default Navbar;
