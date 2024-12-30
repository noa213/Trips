<<<<<<< HEAD

import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";
=======
// import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

// // הרחבת User, Session ו-JWT
// declare module "next-auth" {
//   interface User extends DefaultUser {
//     // role: string; // הוספת שדה role
//     firstTime?: boolean; // הוספת שדה firstTime
//   }

//   interface Session extends DefaultSession {
//     user: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       // role: string; // הוספת שדה role
//       firstTime?: boolean; // הוספת שדה firstTime
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT extends DefaultJWT {
//     firstTime?: boolean; // הוספת שדה firstTime
//   }
// }

import { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";
>>>>>>> noa

// הרחבת User, Session ו-JWT
declare module "next-auth" {
  interface User extends DefaultUser {
    firstTime?: boolean; // הוספת שדה firstTime
  }

  interface Session extends DefaultSession {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      firstTime?: boolean; // הוספת שדה firstTime
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    // role: string; // הוספת שדה role
    firstTime?: boolean; // הוספת שדה firstTime
  }
}
