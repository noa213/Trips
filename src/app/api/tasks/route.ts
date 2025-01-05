import connect from "@/app/lib/db/mongo-db";
import { NextRequest } from "next/server";



export async function PUT(req: NextRequest) {
  // try {
    console.log("PUT");

    await connect();
    const { ...updatedTask } = await req.json();
    const { task } = await req.json();
    console.log("updatedTask", updatedTask);
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
