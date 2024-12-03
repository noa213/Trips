import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo-db";
import Trip from "@/app/lib/moduls/trip";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connect();
    const data = await Trip.findById(params.id);
    if (!data) {
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    }
    return NextResponse.json( data );
  } catch (error) {
    return NextResponse.json("Error in fetching " + error);
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
