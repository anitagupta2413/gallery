"use client";
import { useEffect, useState } from "react";
import SignUp from "./signup/page";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      console.log("this works");
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/verify-user`,
          {
            withCredentials: true,
          }
        );
        if (response?.data?.message) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (error) {
        toast.error(error);
      }
    };

    verifyUser();
  }, []);

  const userLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/user-logout`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_APP_API_URL}/api/auth/user-delete`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        router.push("/signup");
      }
    } catch (error) {
      console.error(
        "Failed to delete user:",
        error.response?.data?.message || error.message
      );
    }
  };

  if (!authenticated) return <SignUp />;
  return (
    <div>
      <div>Hello world</div>
      <button onClick={userLogout}>Log out</button>
      <button onClick={userDelete}>user delete</button>
      <ToastContainer position="top-right" />
    </div>
  );
}
