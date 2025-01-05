import { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

// declare module "next-auth" {
//   // הרחבת הממשק User עם שדה נוסף role
//   interface User extends DefaultUser {
//     role: string; // שדה חדש role
//     firstTime?: boolean; // שדה אופציונלי חדש
//   }

//   // הרחבת הממשק Session כך שה-user כולל את השדות החדשים
//   interface Session extends DefaultSession {
//     user: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role: string; // תפקיד המשתמש
//       firstTime?: boolean; // האם המשתמש חדש
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   // הרחבת הממשק JWT עם שדות חדשים
//   interface JWT extends DefaultJWT {
//     role: string; // תפקיד המשתמש
//     firstTime?: boolean; // האם המשתמש חדש
//   }
// }


// import { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

// declare module "next-auth" {
//   interface User extends DefaultUser {
//     role: string; // הוספת תפקיד
//     firstTime?: boolean; // הוספת שדה ראשון
//   }

//   interface Session extends DefaultSession {
//     user: User; // השתמש במשתמש המורחב
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     role: string; // הוספת תפקיד ב-JWT
//     firstTime?: boolean; // הוספת שדה ראשון ב-JWT
//   }
// }


// // הרחבת User, Session ו-JWT
// declare module "next-auth" {
//   interface User extends DefaultUser {
//     role: string; // הוספת שדה role
//     firstTime?: boolean; // הוספת שדה firstTime
//   }

//   interface Session extends DefaultSession {
//     user: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role: string; // הוספת שדה role
//       firstTime?: boolean; // הוספת שדה firstTime
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     role: string; // הוספת שדה role
//     firstTime?: boolean; // הוספת שדה firstTime
//   }
// }
