import PlaceIcon from "@mui/icons-material/PlaceOutlined";
import MoneyIcon from "@mui/icons-material/AttachMoneyRounded";
import TaskIcon from "@mui/icons-material/TaskAltRounded";
import PollIcon from "@mui/icons-material/PollOutlined";

import React from 'react'
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";

const Navigation = () => {
  return (
    <Grid item xs={12} sm={3}>
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        padding: 3,
        backgroundColor: "#f4f4f4",
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "#81C784" }}
      >
        Navigation
      </Typography>
      <List>
        <ListItem>
          <ScrollLink to="basic-details" smooth={true} duration={500}>
            <PlaceIcon /> Basic Details
          </ScrollLink>
        </ListItem>
        <ListItem>
          <ScrollLink to="budget-details" smooth={true} duration={500}>
            <MoneyIcon /> Budget Details
          </ScrollLink>
        </ListItem>
        <ListItem>
          <ScrollLink to="tasks" smooth={true} duration={500}>
            <TaskIcon /> Tasks
          </ScrollLink>
        </ListItem>
        <ListItem>
          <ScrollLink to="polls" smooth={true} duration={500}>
          <PollIcon /> Polls
          </ScrollLink>
        </ListItem>
      </List>
    </Box>
  </Grid>
)
}

export default Navigation