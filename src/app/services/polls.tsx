import axios from "axios";
import { IPoll } from "../types/poll";

export const getPolls = async (): Promise<IPoll[]> => {
  try {
    const response = await axios.get("/api/polls");
    return response.data;
  } catch (error) {
    console.error("Error fetching polls:", error);
    throw new Error("Failed to fetch polls");
  }
};




// export const sendPoll = async (polls: IPoll[]) => {
//   const emails = prompt("Enter recipient emails separated by commas:");
//   if (!emails) return;

//   try {
//     const response = await axios.post("/api/sendpoll", {
//       emails: emails.split(",").map((email) => email.trim()),
//       subject: `Poll Results: ${polls
//         .map((poll) => poll.question)
//         .join(" | ")}`,
//       pollResults: polls,
//     });

//     alert(response.data.message || "Poll sent successfully!");
//   } catch (err) {
//     console.error("Error in client-side sendpoll:", err);
//     alert("Failed to send Poll.");
//   }
// };



export const sendPoll = async (polls: IPoll[], emails: string[]) => {
  if (!emails || emails.length === 0) return;

  try {
    const response = await axios.post("/api/sendpoll", {
      emails: emails.map((email) => email.trim()),
      subject: `Hi everyone,

      New questions are now open for voting! Please take a moment to check them out and share your thoughts.

      Here are the questions: ${polls
          .map((poll) => poll.question)
          .join(" | ")}
          https://trips-delta.vercel.app/`,
      pollResults: polls,
    });

    alert(response.data.message || "Poll sent successfully!");
  } catch (err) {
    console.error("Error in client-side sendpoll:", err);
    alert("Failed to send Poll.");
  }
};



export const updatePoll = async (poll: IPoll): Promise<void> => {
  try {
    const response = await axios.put(`/api/polls`, poll);
    console.log("Polls updated successfully:", response.data);
    // return response.data;
  } catch (error) {
    console.error("Error updating vote:", error);
    throw new Error("Failed to update vote");
  }
};
