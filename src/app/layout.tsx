"use client";

import "./globals.css";
import Navbar from "@/app/components/Navbar";
// import TripList from "./components/TripList";
// import SignIn from "./components/SignIn";
// import CreatePoll from "./components/CreatePoll";
import { SessionProvider } from "next-auth/react";

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
