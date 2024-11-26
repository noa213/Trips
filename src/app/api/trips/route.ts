import connect from "@/app/lib/db/mongo-db";
import Trip from "@/app/lib/moduls/trip";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log('before connect');

    await connect();
    console.log('after connect');
    
    const { title, destination, dates, budget, tasks, polls, memories, status } = await req.json();
    const recipe = new Trip({ title, destination, dates, budget, tasks, polls, memories, status});
    await recipe.save();
    
    // return await GET();
    return NextResponse.json({ newRecipe: recipe });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
export async function GET() {
 
      return NextResponse.json({ message: "recipe" });
   
  }