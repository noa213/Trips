

"use client"
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import TripList from "./components/TripList";
import CreatePoll from "./components/CreatePoll";
import { SessionProvider } from "next-auth/react";
import GroupChat from "./components/GroupChat";
import IdeasForTrips from "./components/IdeasForTrips";
import ImageUploader from "./components/ImageUploader";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <SessionProvider>
      
          <Navbar />
          {/* <GroupChat></GroupChat> */}
          {/* <IdeasForTrips></IdeasForTrips>
         < ImageUploader></ImageUploader> */}
          {children}

        </SessionProvider>
       

      </body>
    </html>
  );
}
