


import connect from "@/app/lib/db/mongo-db";
import { NextRequest, NextResponse } from "next/server";
import Message from "@/app/lib/moduls/message";



// export async function GET() {
//   try {
//     await connect();
//     const data = await Message.find().select(
//       "title destination dates status"
//     );
//     console.log('Fetched data:',NextResponse.json(data)); // הדפסת התשובה מה-API
//     return NextResponse.json(data);
//   } catch (error) {
//     return NextResponse.json("Error in fetching " + error);
//   }
// }





export async function GET() {
  try {
    await connect();
    const data = await Message.find()
    console.log("gvdfhsduijok,vbnhjirkl;dnhktgmfc",data);
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
      
    await connect();
    const {name,content} = await req.json();
    console.log("Received data:", { name, content });
    const message = new Message({name,content});
    await message.save();
    return NextResponse.json({ newMessage: message });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
