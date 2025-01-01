import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo-db";
import Chat from "@/app/lib/moduls/chat";

export async function GET(
  req: NextRequest,
  { params }: { params: { tripId: string } }
) {
  try {
    await connect();
    const chat = await Chat.findOne({ tripId: params.tripId });
    console.log(chat);

    if (chat) {
      return NextResponse.json({ messages: chat.messages });
    } else {
      return NextResponse.json({ messages: [] });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { name, content, tripId } = await req.json();
  console.log(name, content, tripId);

  try {
    await connect();
    let chat = await Chat.findOne({ tripId });
    if (!chat) {
      chat = new Chat({ tripId, messages: [] });
    }
    chat.messages.push({ name, content });
    await chat.save();
    return NextResponse.json({ message: "Message saved successfully" });
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
