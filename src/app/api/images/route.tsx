import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid"; // ליצירת מזהה ייחודי לכל תמונה
import Trip from "@/app/lib/moduls/trip"; // השתמש במודול שלך
import connect from "@/app/lib/db/mongo-db";

export async function POST(req: NextRequest) {
  try {
    // קריאה לגוף הבקשה (יש צורך בניתוח גוף הבקשה)
    const formData = await req.formData();
    const file = formData.get("image") as File;
    if (!file) {
      return NextResponse.json({ message: "No image uploaded" }, { status: 400 });
    }

    // יצירת שם קובץ ייחודי לתמונה
    const fileName = `${uuidv4()}${path.extname(file.name)}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    // שמירת התמונה במערכת הקבצים המקומית (במקרה שלך בתוך תיקיית "public/uploads")
    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);
    fs.writeFileSync(filePath, uint8Array);

    // הוספת ה-URL של התמונה ל-MongoDB
    const imageUrl = `/uploads/${fileName}`;
    const { tripId } = await req.json();

    await connect();
    const updatedTrip = await Trip.findByIdAndUpdate(
      tripId,
      { $push: { images: { url: imageUrl } } },
      { new: true }
    );

    if (!updatedTrip) {
      return NextResponse.json({ message: "Trip not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Image uploaded successfully", imageUrl });
  } catch (error: unknown) { // שים לב ל-unknown כאן
    if (error instanceof Error) { // כאן אנחנו בודקים אם מדובר באובייקט של Error
      console.error(error.message);  // תוכל לגשת כאן לשדות error.message
      return NextResponse.json({ message: "Error uploading image", error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}
