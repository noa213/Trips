// // types/next-auth.d.ts
// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       firstTime?: boolean | undefined;  // אפשרות להיות boolean או undefined
//     };
//   }

//   interface Token {
//     firstTime?: boolean | undefined;  // אפשרות להיות boolean או undefined
//   }
// }



// types/next-auth.d.ts
// import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       firstTime?: boolean|undefined;  // הוספנו את firstTime
//       role?:string | null;
//     };
//   }

//   interface Token {
//     firstTime?: boolean|undefined;  // הוספנו את firstTime
//   }
// }





import NextAuth, { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

// הרחבת User, Session ו-JWT
declare module "next-auth" {
  interface User extends DefaultUser {
    role: string; // הוספת שדה role
    firstTime?: boolean; // הוספת שדה firstTime
  }

  interface Session extends DefaultSession {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      // role: string; // הוספת שדה role
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




