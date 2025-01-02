// "use client"
// import { signIn, signOut, useSession } from "next-auth/react";

// const LogIn = () => {
//   const { data: session, status } = useSession();

//   if (status === "loading") return <p>Loading...</p>;

//   if (!session) {
//     return (
//       <button onClick={() => signIn("google")}>
//         Sign in with Google
//       </button>
//     );
//   }

//   if (session.user.firstTime) {
//     return (
//       <div   >
//         <h1>Welcome, {session.user.name}!</h1>
//         <p>This is your first time logging in!</p>
//         <button onClick={() => signOut()}>Sign out</button>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Welcome back, {session.user.name}!</h1>
//       <button onClick={() => signOut()}>Sign out</button>
//     </div>
//   );
// }

// export default LogIn
