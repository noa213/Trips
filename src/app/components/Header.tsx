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
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", 
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", 
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Slide ${index}`}
            fill
            priority={index === 0} 
            loading="eager" 
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40">
        <h1 className="text-white text-4xl font-yellowtail font-bold mb-4">STEPS</h1>
        <p className="text-white text-xl">Planning your next step</p>
      </div>
    </div>
  );
};

export default OpeningPage;
