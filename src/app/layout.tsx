// import type { Metadata } from "next";
// import "./globals.css";
// import CreateSurvey from "./components/CreatePoll";
// import Navbar from "@/app/components/Navbar"
// import CreateTripDialog from "./components/CreateTripDialog";
// import HomePage from "./components/HomePage";
// import LogIn from "./components/LogIn";

// export const metadata: Metadata = {
//   title: "Triply",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body>
//       <CreateTripDialog />
//         {/* <CreateSurvey />  */}
//         <Navbar />
//         {/* <Other></Other> */}
//         <LogIn></LogIn>
//         {children}
//       </body>
//     </html>
//   );
// }

// "use client";

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
