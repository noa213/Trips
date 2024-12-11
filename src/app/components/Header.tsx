// // import React from "react";
// // import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
// // import MenuIcon from "@mui/icons-material/Menu";

// // const Header: React.FC = () => {
// //   return (
// //       <AppBar position="static" color="primary">
// //         <Toolbar>
// //           <IconButton
// //             edge="start"
// //             color="inherit"
// //             aria-label="menu"
// //             sx={{ mr: 2 }}
// //           >
// //             <MenuIcon />
// //           </IconButton>

// //           <Typography variant="h6" sx={{ flexGrow: 1 }}>
// //             Steps
// //           </Typography>

// //           <Button color="inherit">Home</Button>
// //           <Button color="inherit">About</Button>
// //           <Button color="inherit">Contact</Button>
// //         </Toolbar>
// //       </AppBar>
// //   );
// // };

// // export default Header;

"use client";
import Image from "next/image";
import "@fontsource/yellowtail"; 

import React, { useState, useEffect } from "react";

const OpeningPage: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", // יער ירוק
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", // נוף עירוני בלילה
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Slide ${index}`}
            fill
            priority={index === 0} 
            loading="eager" 
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
        <h1 className="text-white text-6xl font-yellowtail font-bold mb-4">STEPS</h1>
        <p className="text-white text-2xl">planning your next step</p>
        {/* <link href="https://fonts.googleapis.com/css2?family=Yellowtail&family=Roboto:wght@400;700&family=Lato:wght@300;400&display=swap" rel="stylesheet"> */}

      </div>
    </div>
  );
};

export default OpeningPage;
