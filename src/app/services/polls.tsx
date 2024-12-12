import axios from "axios";
import { IPoll } from "../types/poll";

export const sendPoll = async (polls: IPoll[]) => {
  const emails = prompt("Enter recipient emails separated by commas:");
  if (!emails) return;

  try {
    const response = await axios.post("/api/sendpoll", {
      emails: emails.split(",").map((email) => email.trim()),
      subject: `Poll Results: ${polls.map((poll) => poll.title).join(" | ")}`,
      pollResults: polls,
    });

    alert(response.data.message || "Poll sent successfully!");
  } catch (err) {
    console.error("Error in client-side sendpoll:", err); // הדפסת השגיאה בצד הלקוח
    alert("Failed to send Poll.");
  }
};
