"use client";

import "./globals.css";
import Navbar from "@/app/components/Navbar";
// import TripList from "./components/TripList";
// import SignIn from "./components/SignIn";
// import CreatePoll from "./components/CreatePoll";
import { SessionProvider } from "next-auth/react";
import GroupChat from "./components/GroupChat";



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
        
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
