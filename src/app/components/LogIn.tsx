
// // import React from 'react'


// // // import NextAuth from "next-auth";
// // // import GoogleProvider from "next-auth/providers/google";

// // // const LogIn = () => {
// // //   return (
// // //     <div>LogIn</div>
// // //   )
// // // }



// // // export default LogIn




// // import { signIn, signOut, useSession } from "next-auth/react";

// // export default function LogIn() {
// //   const { data: session } = useSession();

// //   return (
// //     <div>
// //       {!session ? (
// //         <button onClick={() => signIn("google")}>Sign in with Google</button>
// //       ) : (
// //         <div>
// //           <p>Welcome, {session.user?.name}!</p>
// //           <button onClick={() => signOut()}>Sign out</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// import { signIn, signOut, useSession } from "next-auth/react";

// export default function HomePage() {
//   const { data: session, status } = useSession();

//   if (status === "loading") return <p>Loading...</p>;

//   if (!session) {
//     // אם המשתמש לא מחובר
//     return (
//       <button onClick={() => signIn("google")}>
//         Sign in with Google
//       </button>
//     );
//   }

//   if (session.user.firstTime) {
//     // אם זהו המשתמש הראשון
//     return (
//       <div>
//         <h1>Welcome, {session.user.name}!</h1>
//         <p>This is your first time logging in!</p>
//         <button onClick={() => signOut()}>Sign out</button>
//       </div>
//     );
//   }

//   // אם מדובר במשתמש חוזר
//   return (
//     <div>
//       <h1>Welcome back, {session.user.name}!</h1>
//       <button onClick={() => signOut()}>Sign out</button>
//     </div>
//   );
// }


"use client"
import { signIn, signOut, useSession } from "next-auth/react";

export default function LogIn() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (!session) {
    return (
      <button onClick={() => signIn("google")}>
        Sign in with Google
      </button>
    );
  }

  if (session.user.firstTime) {
    return (
      <div>
        <h1>Welcome, {session.user.name}!</h1>
        <p>This is your first time logging in!</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome back, {session.user.name}!</h1>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}


