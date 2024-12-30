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
export { handle as GET, handle as POST };
