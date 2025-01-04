"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import SignIn from "./SignIn";

const Navbar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
    <SignIn/>
      <Tabs
        value={value}
        onChange={handleChange}
        className="bg-[#f7f2e7] text-gray-700 mt-2 px-4"
        TabIndicatorProps={{
          style: { background: "#66BB6A" },
        }}
        textColor="inherit"
      >
        <Tab
          label="Home"
          component={Link}
          href="/"
          sx={{
            color: value === 0 ? "#66BB6A" : "#374151",
            "&.mui-selected": { color: "#66BB6A" },
          }}
        />
        <Tab
          label="trips"
          component={Link}
          href="/pages/trips"
          sx={{
            color: value === 1 ? "#66BB6A" : "#374151",
            "&.mui-selected": { color: "#66BB6A" },
          }}
        />

        <Tab
          label="Information for the traveler"
          component={Link}
          href="/pages/Information_for_the_traveler"
          sx={{
            color: value === 2 ? "#66BB6A" : "#374151",
            "&.mui-selected": { color: "#66BB6A" },
          }}
        />

        <Tab
          label="about"
          component={Link}
          href="/pages/about"
          sx={{
            color: value === 3 ? "#66BB6A" : "#374151",
            "&.mui-selected": { color: "#66BB6A" },
          }}
        />


      </Tabs>
    </>
  );
};

export default Navbar;
