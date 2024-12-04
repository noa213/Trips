import connect from "@/app/lib/db/mongo-db";
import Trip from "@/app/lib/moduls/trip";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const data = await Trip.findById(params.id);
    return !data
      ? NextResponse.json({ message: "Trip not found" }, { status: 404 })
      : NextResponse.json(data);
  } catch (error) {
    return NextResponse.json("Error in fetching " + error);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const updatedData = await req.json();
    await connect();
    const updatedTrip = await Trip.findByIdAndUpdate(updatedData._id, updatedData, {
      new: true,
    });
    return !updatedTrip
      ? NextResponse.json({ message: "Trip not found" }, { status: 404 })
      : NextResponse.json({ updatedTrip });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     await connect();
//     const { title, destination, dates, budget, tasks, polls, memories, status } = await req.json();
//     const trip = new Trip({ title, destination, dates, budget, tasks, polls, memories, status});
//     await trip.save();
//     // return await GET();
//     return NextResponse.json({ newTrip: trip });
//   } catch (error) {
//     return NextResponse.json({ message: "Error: " + error }, { status: 500 });
//   }
// }
