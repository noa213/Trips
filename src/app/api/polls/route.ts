import Trip from "@/app/lib/moduls/trip";
import connect from "@/app/lib/db/mongo-db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const polls = await Trip.aggregate([
      { $unwind: "$polls" },
      { $replaceRoot: { newRoot: "$polls" } }
    ]);
    console.log(polls);
    
    return NextResponse.json(polls);
  } catch (error) {
    return NextResponse.json(`Error in fetching polls: ${error}`);
  }
}
