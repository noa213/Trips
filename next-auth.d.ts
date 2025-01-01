import { DefaultSession, DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    firstTime?: boolean;
  }

  interface Session extends DefaultSession {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      firstTime?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    firstTime?: boolean;
  }
}
