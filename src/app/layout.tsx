import type { Metadata } from "next";
import "./globals.css";
import Surveys from "./components/Surveys";
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
        {/* <Surveys />  */}
        <Navbar /> 
        {children} 
      </body>
    </html>
  );
}
