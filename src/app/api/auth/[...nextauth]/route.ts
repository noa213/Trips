



// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import connect from "@/app/lib/db/mongo-db";
// import User from "@/app/lib/moduls/user";




//   const handle = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       await connect();

//       if (user) {
//         const existingUser = await User.findOne({ email: user.email });

//         if (!existingUser) {
//           await User.create({ email: user.email, name: user.name });
//           token.firstTime = true;
//         } else {
//           token.firstTime = false;
//         }
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.firstTime = Boolean(token.firstTime ?? false);
            
//       }
//       return session;
//     },
//   },
// });
// export {handle as GET, handle as POST}




// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import connect from "@/app/lib/db/mongo-db";
// import User from "@/app/lib/moduls/user";
// import nextauth from "@/app/types/next-auth"
// const handle = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       await connect(); // התחברות למאגר הנתונים

//       if (user) {
//         const existingUser = await User.findOne({ email: user.email });

//         if (!existingUser) {
//           // יצירת משתמש חדש עם תפקיד ברירת מחדל 'user'
//           await User.create({
//             email: user.email,
//             name: user.name,
//             role: "user", // ברירת מחדל, ניתן לשנות ל-"admin" במקרים מסוימים
//           });
//           token.firstTime = true;
//           token.role = "user"; // שומר את ה-role ב-token
//         } else {
//           token.firstTime = false;
//           token.role = existingUser.role; // מושך את ה-role מהמשתמש הקיים
//         }
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.firstTime = Boolean(token.firstTime ?? false);
//         session.user.role = token.role; // מעביר את ה-role ל-session
//       }
//       return session;
//     },
//   },
// });

// export { handle as GET, handle as POST };





// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import connect from "@/app/lib/db/mongo-db";
// import User from "@/app/lib/moduls/user";

// const handle = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       await connect(); // התחברות למאגר הנתונים

//       if (user) {
//         const existingUser = await User.findOne({ email: user.email });

//         if (!existingUser) {
//           // יצירת משתמש חדש עם תפקיד ברירת מחדל 'user'
//           await User.create({
//             email: user.email,
//             name: user.name,
//             role: "user", // ברירת מחדל, ניתן לשנות ל-"admin" במקרים מסוימים
//           });
//           token.firstTime = true;
//           token.role = "user"; // שומר את ה-role ב-token
//         } else {
//           token.firstTime = false;
//           token.role = existingUser.role; // מושך את ה-role מהמשתמש הקיים
//         }
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.firstTime = Boolean(token.firstTime ?? false);
//         session.user.role = token.role; // מעביר את ה-role ל-session
//       }
//       return session;
//     },
//   },
// });

// export { handle as GET, handle as POST };




import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connect from "@/app/lib/db/mongo-db";
import User from "@/app/lib/moduls/user";

const handle = NextAuth({
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
      await connect(); // התחברות למאגר הנתונים

      if (user) {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // יצירת משתמש חדש עם תפקיד ברירת מחדל 'user'
          await User.create({
            email: user.email,
            name: user.name,
            role: "user", // ברירת מחדל, ניתן לשנות ל-"admin" במקרים מסוימים
          });
          token.firstTime = true;
          token.role = "user"; // שומר את ה-role ב-token
        } else {
          token.firstTime = false;
          token.role = existingUser.role; // מושך את ה-role מהמשתמש הקיים
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.firstTime = Boolean(token.firstTime ?? false);
        session.user.role = token.role; // מעביר את ה-role ל-session
      }
      return session;
    },
  },
  
});

export { handle as GET, handle as POST };
