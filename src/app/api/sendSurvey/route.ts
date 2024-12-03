

// import nodemailer from 'nodemailer';
// import { NextApiRequest, NextApiResponse } from 'next';

// // פונקציה למענה על בקשות POST
// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const { emails, subject, surveyResults } = req.body;

//   if (!emails || !subject || !surveyResults) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail', // אפשר להשתמש גם בשירותים אחרים כמו Outlook
//       auth: {
//         user: process.env.EMAIL_USER, // המייל שלך מתוך קובץ הסביבה
//         pass: process.env.EMAIL_PASS, // סיסמה או App Password
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: emails.join(','), // רשימה של מיילים מופרדים בפסיקים
//       subject: subject,
//       html: `<h1>Survey Results</h1><pre>${JSON.stringify(
//         surveyResults,
//         null,
//         2
//       )}</pre>`,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Email sent successfully', info });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// }









// import nodemailer from 'nodemailer';
// import { NextApiRequest, NextApiResponse } from 'next';

// // פונקציה למענה על בקשות POST
// export async function POST(req: NextApiRequest, res: NextApiResponse) {

//   const { emails, subject, surveyResults } = req.body;

//   if (!emails || !subject || !surveyResults) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }


//   try {
//     // יצירת אובייקט transporter עבור שליחת המייל
//     const transporter = nodemailer.createTransport({
//       service: 'gmail', // אפשר גם להשתמש בשירותים אחרים
//       auth: {
//         user: process.env.EMAIL_USER, // המייל מתוך קובץ הסביבה
//         pass: process.env.EMAIL_PASS, // סיסמה או App Password
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: emails.join(','), // רשימה של מיילים מופרדים בפסיקים
//       subject: subject,
//       html: `<h1>Survey Results</h1><pre>${JSON.stringify(
//         surveyResults,
//         null,
//         2
//       )}</pre>`,
//     };

//     // שליחת המייל
//     const info = await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Email sent successfully', info });
//   } catch (error: unknown) {
//     // טיפול בשגיאה
//     if (error instanceof Error) {
//       console.error('Error sending email:', error.message);
//       res.status(500).json({
//         error: 'Failed to send email',
//         details: error.message,
//       });
//     } else {
//       // במידה וה'error' לא מסוג 'Error', הדפס את השגיאה הכללית
//       console.error('Unexpected error:', error);
//       res.status(500).json({
//         error: 'Unexpected error occurred',
//         details: 'An unexpected error occurred.',
//       });
//     }
//   }
// }



// import nodemailer from 'nodemailer';
// import { NextApiRequest, NextApiResponse } from 'next';

// // פונקציה למענה על בקשות POST
// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const { emails, subject, surveyResults } = req.body;

//   // הדפסת כל משתני הסביבה
//   console.log(process.env.EMAIL_USER);  // יפלט את הערך

//   if (!emails || !subject || !surveyResults) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER, // המייל שלך מתוך קובץ הסביבה
//         pass: process.env.EMAIL_PASS, // סיסמה או App Password
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: emails.join(','), // רשימה של מיילים מופרדים בפסיקים
//       subject: subject,
//       html: `<h1>Survey Results</h1><pre>${JSON.stringify(
//         surveyResults,
//         null,
//         2
//       )}</pre>`,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Email sent successfully', info });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// }






// import nodemailer from 'nodemailer';
// import { NextApiRequest, NextApiResponse } from 'next';

// export async function POST(req: NextApiRequest, res: NextApiResponse) {
//   const { emails, subject, surveyResults } = req.body;

//   if (!emails || !subject || !surveyResults) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }


//   console.log(process.env.EMAIL_USER);



//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: emails.join(','),
//       subject: subject,
//       html: `<h1>${surveyResults.message}</h1>`,  // שלח את ההודעה בלבד
//     };

//     const info = await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Email sent successfully', info });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to send email' });
//   }
// }































import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';





console.log("EMAIL_USER:", process.env.EMAIL_USER);  // הדפסת המשתנים


console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { emails, subject, surveyResults } = req.body;

 
  // הדפסת נתוני סביבה (במידה ונתקלת בבעיה עם המשתנים הסביבתיים)
  console.log("EMAIL_USER:", process.env.EMAIL_USER);  // הדפסת המשתנים
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

  // הדפסת הנתונים המתקבלים ב-POST (כדי לוודא שהנתונים הגיעו כראוי)
  console.log("Received data:", req.body); 

  // בדיקת שדות חובה
  if (!emails || !subject || !surveyResults) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // יצירת transporter לשליחת המייל
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // המייל שלך מתוך קובץ הסביבה
        pass: process.env.EMAIL_PASS, // סיסמה או App Password
      },
    });

    // הגדרת פרטי המייל
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emails.join(','),  // רשימה של מיילים מופרדים בפסיקים
      subject: subject,
      html: `<h1>${surveyResults.message}</h1>`,  // שלח את ההודעה בלבד
    };

    // שליחת המייל
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    // הדפסת השגיאה בצורה מפורטת
    const e = error as Error;
    console.error("Error sending email:", e.message);
    res.status(500).json({ error: 'Failed to send email', details: e.message });
  }
}
