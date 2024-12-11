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
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      firstTime?: boolean|undefined;  // הוספנו את firstTime
    };
  }

  interface Token {
    firstTime?: boolean|undefined;  // הוספנו את firstTime
  }
}
