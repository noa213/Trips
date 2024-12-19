import Trip from "@/app/lib/moduls/trip";
import connect from "@/app/lib/db/mongo-db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connect();
    const polls = await Trip.aggregate([
      { $unwind: "$polls" },
      { $replaceRoot: { newRoot: "$polls" } },
    ]);
    return NextResponse.json(polls);
  } catch (error) {
    return NextResponse.json(`Error in fetching polls: ${error}`);
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connect();
    const { _id, pollId, options } = await req.json();
    console.log(_id, pollId, options);
    const updatedTrip = await Trip.findOneAndUpdate(
      { "polls.pollId": pollId },
      { $set: { "polls.$[poll].options": options } },
      {
        arrayFilters: [
          { "poll.pollId": pollId },
        ],
        new: true,
      }
    );
    if (updatedTrip) {
      const updatedPoll = updatedTrip.polls.find(
        (poll) => poll.pollId === pollId
      );
      return NextResponse.json(updatedPoll);
    } else {
      return NextResponse.json({ message: "Poll not found" }, { status: 404 });
    }
    // return NextResponse.json(updatedTrip);
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
