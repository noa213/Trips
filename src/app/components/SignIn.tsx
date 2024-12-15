
// "use client"
// import { signIn, signOut, useSession } from "next-auth/react";

// export default function LogIn() {
  
//   const { data: session, status } = useSession();

//   if (status === "loading") return <p className="text-4xl md:text-6xl font-light text-center text-[#9B111E]">Loading...</p>;

//   if (!session) {
//     return (
//       <button className="bg-[#9B111E] text-[#F5F5DC] px-6 py-3 rounded-lg font-medium text-lg transition-all hover:bg-[#8A0F1B] hover:shadow-lg focus:ring-2 focus:ring-[#F5F5DC]"  onClick={() => signIn("google")}>
//         Sign in with Google
//       </button>
//     );
//   }

//   if (session.user.firstTime) {
    
//     return (
//       <div>
//         <h1 className="text-4xl md:text-6xl font-light text-center text-[#9B111E]">Welcome, {session.user.name}!</h1>
//         <p className="text-4xl md:text-6xl font-light text-center text-[#9B111E]">This is your first time logging in!</p>
//         <button className="bg-[#9B111E] text-[#F5F5DC] px-6 py-3 rounded-lg font-medium text-lg transition-all hover:bg-[#8A0F1B] hover:shadow-lg focus:ring-2 focus:ring-[#F5F5DC]" onClick={() => signOut()}>Sign out</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1 className="text-4xl md:text-6xl font-light text-center text-[#9B111E]">Welcome back, {session.user.name}!</h1>
//       <button className="bg-[#9B111E] text-[#F5F5DC] px-6 py-3 rounded-lg font-medium text-lg transition-all hover:bg-[#8A0F1B] hover:shadow-lg focus:ring-2 focus:ring-[#F5F5DC]" onClick={() => signOut()}>Sign out</button>
//     </div>
//   );
// }






"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignIn() {
  const { data: session, status } = useSession();

  return (
    <div className="absolute top-4 right-4">
      {status === "loading" ? (
       <p className="text-xs font-light text-[#9B111E]">
          Loading...
        </p>
      ) : !session ? (
        <button
          className="bg-[#9B111E] text-[#F5F5DC] px-4 py-2 rounded-lg font-medium text-sm transition-all hover:bg-[#8A0F1B] hover:shadow-lg focus:ring-2 focus:ring-[#F5F5DC]"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      ) : (
        <div className="flex items-center space-x-4">
          <p className="text-sm font-medium text-[#9B111E]">
            Welcome, {session.user?.name}!
          </p>
          <button
            className="bg-[#9B111E] text-[#F5F5DC] px-4 py-2 rounded-lg font-medium text-sm transition-all hover:bg-[#8A0F1B] hover:shadow-lg focus:ring-2 focus:ring-[#F5F5DC]"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

