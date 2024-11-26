import connect from "@/app/lib/db/mongo-db";
import User from "@/app/lib/moduls/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { userId, data } = await req.json();

    let user = await User.findOne({ userId });

    if (!user) {
      user = new User({ userId, data: [data] });
    } else {
      user.data.push(data);
    }

    await user.save();

    return NextResponse.json({ success: true, message: "Data saved successfully", user });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Error saving data: " + error });
  }
}

// export async function GET() {
//   try {
//     await connect();
//     const data = await User.find();    
//     return NextResponse.json({ data });
//   } catch (error) {
//     return NextResponse.json("Error in fetching " + error);
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     await connect();
//     const { name, category, ingredients, instructions, image, isFavorite } = await req.json();
//     const recipe = new User({ name, category, ingredients, instructions, image, isFavorite});
//     await recipe.save();
    
//     // return await GET();
//     return NextResponse.json({ newRecipe: recipe });
//   } catch (error) {
//     return NextResponse.json({ message: "Error: " + error }, { status: 500 });
//   }
// }
