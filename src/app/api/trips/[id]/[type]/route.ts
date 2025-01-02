import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo-db";
import Trip from "@/app/lib/moduls/trip";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; type: string } }
) {
  try {
    const { id, type } = params;
    const { searchParams } = new URL(req.url);
    // const tripId = searchParams.get("tripId");
    const itemId = searchParams.get("itemId");
    console.log("tripId", id);
    console.log("type", type);
    console.log("searchParams", searchParams);
    console.log("itemId", itemId);

    if (!itemId) {
      return NextResponse.json(
        { message: "Item ID is required" },
        { status: 400 }
      );
    }

    await connect();
    // Validate type
    if (!["tasks", "polls", "memories"].includes(type)) {
      return NextResponse.json(
        { message: "Invalid type provided" },
        { status: 400 }
      );
    }
    console.log("www");
    
    // Update the trip document
    const updatedTrip = await Trip.findByIdAndUpdate(
      id,
      { $pull: { [type]: { _id: itemId } } }, // Use $pull to remove the item by ID
      { new: true }
    );
    console.log("updatedTrip",updatedTrip);
    
    return !updatedTrip
      ? NextResponse.json({ message: "Trip not found" }, { status: 404 })
      : NextResponse.json(updatedTrip);
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
