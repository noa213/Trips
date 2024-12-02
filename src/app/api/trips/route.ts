import connect from "@/app/lib/db/mongo-db";
import Trip from "@/app/lib/moduls/trip";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const data = await Trip.find();
    console.log(data);
    
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json("Error in fetching " + error);
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('before connect');

    await connect();
    console.log('after connect');
    
    const { title, destination, dates, budget, tasks, polls, memories, status } = await req.json();
    const trip = new Trip({ title, destination, dates, budget, tasks, polls, memories, status});
    console.log('before save trip');
    await trip.save();
    console.log('after save trip');

    // return await GET();
    return NextResponse.json({ newTrip: trip });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}