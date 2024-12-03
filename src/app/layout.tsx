import type { Metadata } from "next";
import "./globals.css";
import CreateSurvey from "./components/CreateSurvey";
import Navbar from "@/app/components/Navbar"

export const metadata: Metadata = {
  title: "Triply",
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
        <CreateSurvey /> 
        <Navbar /> 
        {children} 
      </body>
    </html>
  );
}
