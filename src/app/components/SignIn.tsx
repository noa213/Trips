"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-xs font-light text-[#9B111E]">Loading...</p>;
  }

  if (!session) {
    return (
      <button
        className="bg-[#9B111E] text-[#F5F5DC] px-4 py-2 rounded-lg font-medium text-sm transition-all hover:bg-[#8A0F1B] hover:shadow-lg focus:ring-2 focus:ring-[#F5F5DC] absolute top-10 right-10 z-50"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4 absolute top-10 right-10 z-50 bg-transparent">
      <p className="text-sm font-medium text-[#9B111E]">
        <Image
          src={session!.user.image || "/default-avatar.png"}
          alt={"session.user?.name"}
          width={24}
          height={24}
        />
        {session.user?.name}
      </p>
      <button
        className="bg-[#9B111E] text-[#F5F5DC] px-4 py-2 rounded-lg font-medium text-sm transition-all hover:bg-[#8A0F1B] hover:shadow-lg focus:ring-2 focus:ring-[#F5F5DC]"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
