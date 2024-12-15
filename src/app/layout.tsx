import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import TripList from "./components/TripList";
import HomePage from "./components/HomePage";

export const metadata: Metadata = {
  title: "Steps",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <SessionProvider> */}
        <HomePage />
        <Navbar />
        <TripList />
        {children} {/* </SessionProvider> */}
      </body>
    </html>
  );
}
