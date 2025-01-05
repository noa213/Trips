import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { emails, subject, pollResults } = await req.json();
  console.log(emails, subject, pollResults);
  if (!emails || !subject || !pollResults)
    return NextResponse.json({ status: 500, error: "Missing required fields" });
  try {
    // יצירת transporter לשליחת המייל
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // המייל שלך מתוך קובץ הסביבה
        pass: process.env.EMAIL_PASS, // סיסמה או App Password
      },
    });

    // הגדרת פרטי המייל
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emails.join(","), // רשימה של מיילים מופרדים בפסיקים
      subject: "steps",
      // html: `<h1>${pollResults.message}</h1>`,
      // שלח את ההודעה בלבד
      // html: `<h1>${"נפתח סקר חדש לגבי הטיול הבא שלך נא היכנס ללינק המצורף על מנת לענות עליו"}</h1>`,
      html: subject,
    };

    // שליחת המייל
    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({
      status: 500,
      message: "Email sent successfully",
      info,
    });
  } catch (error) {
    // הדפסת השגיאה בצורה מפורטת
    const e = error as Error;
    console.error("Error sending email:", e.message);
    return NextResponse.json({
      status: 500,
      error: "Failed to send email",
      details: e.message,
    });
  }
}
