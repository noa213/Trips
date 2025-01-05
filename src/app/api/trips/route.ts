import connect from "@/app/lib/db/mongo-db";
import Trip from "@/app/lib/moduls/trip";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const data = await Trip.find().select(
      "title destination dates participants status"
    );
   
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json("Error in fetching " + error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await connect();
    const {
      adminNmame,
      title,
      destination,
      dates,
      participants,
      budget,
      tasks,
      polls,
      memories,
      status,
      images,
    } = await req.json();
    console.log("111");
    
    const trip = new Trip({
      adminNmame,
      title,
      destination,
      dates,
      participants,
      budget,
      tasks,
      polls,
      memories,
      status,
      images,
    });
    console.log("222", tasks);
    
    await trip.save();
    console.log("333");
    
    return NextResponse.json({ newTrip: trip });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const tripId = searchParams.get("id");
    if (!tripId) {
      return NextResponse.json(
        { message: "Trip ID is required" },
        { status: 400 }
      );
    }
    await connect();
    const deletedTrip = await Trip.findByIdAndDelete(tripId);
    if (!deletedTrip)
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    const updatedTrips = await Trip.find();
    return NextResponse.json(updatedTrips);
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
