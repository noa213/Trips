// import jwt from 'jsonwebtoken';
// import { NextRequest, NextResponse } from 'next/server';

// export const authenticateUser = async (req: NextRequest, res: NextResponse, next: () => void): Promise<NextResponse | void> => {
//   const token = req.cookies.get('userToken')?.toString() || ''; 
//   if (!token) {
//     return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(token, 'yourSecretKey');  // טיפוס ההחזרה הוא אובייקט עם userId
//     req.userId = decoded.userId;  // מוסיף את ה-ID לבקשה
//     next();  // המשך לעיבוד הבקשה
//   } catch (error) {
//     return new NextResponse(JSON.stringify({ message: "Token is invalid or expired" }), { status: 401 });
// }};
