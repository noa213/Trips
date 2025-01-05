import connect from "@/app/lib/db/mongo-db";
// import Trip from "@/app/lib/moduls/trip";
import { NextRequest } from "next/server";

// export async function PUT(req: NextRequest) {
//     try {
//       await connect();
//       const { _id, taskId } = await req.json();
//       console.log(_id, taskId);
//       const updatedTrip = await Trip.findOneAndUpdate(
//         { "tasks.taskId": taskId },
//         { $set: { "tasks.$[poll].options": options } },
//         {
//           arrayFilters: [
//             { "tasks.taskId": taskId },
//           ],
//           new: true,
//         }
//       );
//       if (updatedTrip) {
//         const updatedPoll = updatedTrip.polls.find(
//           (poll) => poll.taskId === taskId
//         );
//         return NextResponse.json(updatedPoll);
//       } else {
//         return NextResponse.json({ message: "Poll not found" }, { status: 404 });
//       }
//       // return NextResponse.json(updatedTrip);
//     } catch (error) {
//       return NextResponse.json({ message: "Error: " + error }, { status: 500 });
//     }
//   }

export async function PUT(req: NextRequest) {
  // try {
    console.log("PUT");

    await connect();
    const { taskId, ...updatedTask } = await req.json();
    const { task } = await req.json();
    console.log("updatedTask", updatedTask);
    console.log("taskId", taskId);
    console.log("task", task);

  //   const updatedTrip = await Trip.findOneAndUpdate(
  //     { "tasks.taskId": taskId },
  //     { $set: { "tasks.$": updatedTask } },
  //     { new: true }
  //   );

  //   if (!updatedTrip) {
  //     return NextResponse.json({ message: "Task not found" }, { status: 404 });
  //   }

  //   const updatedTaskData = updatedTrip.tasks.find(
  //     (task) => task.taskId === taskId
  //   );
  //   return NextResponse.json(updatedTaskData);
  // } catch (error) {
  //   return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  // }
}
