
"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const SignIn = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-xs font-light text-[#9B111E]">Loading...</p>;
  }

  if (!session) {
    return (
      <button
        className="bg-[#9B111E] text-[#F5F5DC] px-4 py-2 rounded-lg font-medium text-sm transition-all hover:bg-[#8A0F1B] hover:shadow-lg focus:ring-2 focus:ring-[#F5F5DC] absolute top-5 right-10 z-50"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    );
  }

  return (
    <div className="flex items-center space-x-4 absolute top-3 right-10 z-50 bg-transparent">
      <p className="text-sm font-medium text-[#9B111E]">
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            overflow: "hidden",
            marginRight: "8px",
            border: "nome",
            padding: "0",
            backgroundColor: "transparent",
            cursor: "pointer",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Image
            src={session!.user.image || "/default-avatar.png"}
            alt={session.user?.name || "User"}
            width={100}
            height={100}
            style={{
              objectFit: "cover",
              pointerEvents: "auto",
            }}
          />
        </div>
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
};

export default SignIn;
