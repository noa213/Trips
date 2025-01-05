
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-xs font-light text-[#66BB6A]">Loading...</p>;
  }

  if (!session) {
    return (
      <button
        className="bg-[#66BB6A] text-[#F5F5DC] px-4 py-2 rounded-lg font-medium text-sm transition-all hover:bg-[#81C784] hover:shadow-lg focus:ring-2 focus:ring-[#F5F5DC] absolute top-3.5 right-10 z-50"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4 absolute top-3 right-10 z-50 bg-transparent">
      <p className="text-sm font-medium text-[#66BB6A]">
        <Image
          src={session!.user.image || "/default-avatar.png"}
          alt={session.user?.name || "User"}
          width={24}
          height={24}
          className="rounded-full w-6 h-6"
        />
        {session.user?.name}
      </p>
      <button
        className="bg-[#66BB6A] text-[#F5F5DC] px-4 py-2 rounded-lg font-medium text-sm transition-all hover:bg-[#81C784] hover:shadow-lg focus:ring-2 focus:ring-[#F5F5DC]"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </div>
  );
}
