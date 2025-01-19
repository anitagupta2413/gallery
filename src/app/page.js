'use client'
import SignUp from "./signup/page";

export default function Home() {
  const token = localStorage.getItem('auth_token');
  if(!token) return <SignUp/>
  return (
    <div>
      Hello world
    </div>
  );
}
