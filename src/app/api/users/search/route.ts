import { NextResponse } from "next/server";
import connect from "@/app/lib/db/mongo-db";
import User from "@/app/lib/moduls/user";

// GET - חיפוש משתמשים לפי מייל
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  // אם אין פרמטר query או אם הוא לא מיתר
  if (!query || typeof query !== "string") {
    return NextResponse.json(
      { error: "Invalid query parameter" },
      { status: 400 }
    );
  }

  try {
    // חיבור למסד נתונים
    await connect();
    console.log("Query:", query); // לוג של המחרוזת המבוקשת

    // חיפוש משתמשים לפי המייל
    const users = await User.find({ email: { $regex: query, $options: "i" } })
      .select("email name -_id")
      .limit(10);

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
