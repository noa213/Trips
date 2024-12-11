// // // import NextAuth from "next-auth";
// // // import GoogleProvider from "next-auth/providers/google";
// // // import connect from "@/app/lib/db/mongo-db"; // פונקציה לחיבור למסד הנתונים
// // // import User from "@/app/lib/moduls/user"; // המודל של המשתמש

// // // export default NextAuth({
// // //   providers: [
// // //     GoogleProvider({
// // //       clientId: process.env.GOOGLE_CLIENT_ID!,
// // //       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// // //     }),
// // //   ],
// // //   session: {
// // //     strategy: "jwt", // אם אתה רוצה להשתמש ב-JWT לניהול session
// // //   },
// // //   callbacks: {
// // //     async jwt({ token, user }) {
// // //       // חיבור למסד הנתונים
// // //       await connect();

// // //       if (user) {
// // //         const existingUser = await User.findOne({ email: user.email });

// // //         if (!existingUser) {
// // //           // אם המשתמש לא קיים, נוסיף אותו
// // //           await User.create({ email: user.email, name: user.name });
// // //           token.firstTime = true; // משתנה המצב בפעם הראשונה
// // //         } else {
// // //           token.firstTime = false;
// // //         }
// // //       }

// // //       return token;
// // //     },
// // //     async session({ session, token }) {
// // //       session.user.firstTime = token.firstTime || false; // עדכון session עם הסטטוס של הפעם הראשונה
// // //       return session;
// // //     },
// // //   },
// // // });






// // import NextAuth from "next-auth";
// // import GoogleProvider from "next-auth/providers/google";
// // import connect from "@/app/lib/db/mongo-db"; // פונקציה לחיבור למסד הנתונים
// // import User from "@/app/lib/moduls/user"; // המודל של המשתמש

// // export default NextAuth({
// //   providers: [
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_CLIENT_ID!,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// //     }),
// //   ],
// //   session: {
// //     strategy: "jwt",
// //   },
// //   callbacks: {
// //     async jwt({ token, user }) {
// //       await connect();
// //       if (user) {
// //         const existingUser = await User.findOne({ email: user.email });
// //         if (!existingUser) {
// //           await User.create({ email: user.email, name: user.name });
// //           token.firstTime = true;
// //         } else {
// //           token.firstTime = false;
// //         }
// //       }
// //       return token;
// //     },
// //     async session({ session, token }) {
// //       session.user.firstTime = token.firstTime || false;
// //       return session;
// //     },
// //   },
// // });










// import "next-auth";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import connect from "@/app/lib/db/mongo-db"; // פונקציה לחיבור למסד הנתונים
// import User from "@/app/lib/moduls/user"; // המודל של המשתמש
// import { Session } from "next-auth";
// import { JWT } from "next-auth/jwt";


// export default NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//     ],
//     session: {
//         strategy: "jwt", // אם אתה רוצה להשתמש ב-JWT לניהול session
//     },
//     callbacks: {
//         async jwt({ token, user }) {
//             // חיבור למסד הנתונים
//             await connect();

//             if (user) {
//                 const existingUser = await User.findOne({ email: user.email });

//                 if (!existingUser) {
//                     // אם המשתמש לא קיים, נוסיף אותו
//                     await User.create({ email: user.email, name: user.name });
//                     token.firstTime = true;
//                 } else {
//                     token.firstTime = false;
//                 }
//             }

//             return token;
//         },
//         // async session({ session, token }) {
//         //   // TypeScript יודע כעת ש-session.user.firstTime קיים
//         //   session.user.firstTime = token.firstTime || false;
//         //   return session;
//         // },
    

//         async session({ session, token }: { session: Session; token: JWT }) {
//             if (session.user) {
//               session.user.firstTime = token.firstTime ?? false;
//             }
//             return session;
//           }
          

//         // async session({ session, token }) {
//         //     // כאן אנחנו מוודאים ש-firstTime יהיה תמיד bool ולא undefined
//         //     session.user.firstTime = token.firstTime ?? false;  // אם firstTime לא קיים, נמיר ל- false
//         //     return session;
//         // }
       
//         // async session({ session, token }) {
//         //     if (session.user) {
//         //       // כאן אנחנו מוודאים ש-firstTime יהיה תמיד bool ולא undefined
//         //       session.user.firstTime = token.firstTime ?? false;  // אם firstTime לא קיים, נמיר ל- false
//         //     }
//         //     return session;
//         //   }
//     },
// });












import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connect from "@/app/lib/db/mongo-db";
import User from "@/app/lib/moduls/user";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      await connect();

      if (user) {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({ email: user.email, name: user.name });
          token.firstTime = true;
        } else {
          token.firstTime = false;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.firstTime = Boolean(token.firstTime ?? false);
            
      }
      return session;
    },
  },
});
