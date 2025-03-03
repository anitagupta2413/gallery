"use client";
import { useEffect, useState } from "react";
import SignUp from "./signup/page";
import { toast } from "react-toastify";
import { ToastContainer } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  useLogoutMutation,
  useDeleteUserMutation,
  useGetUserQuery,
} from "../../apislices/AuthSlice";
import { useDispatch } from "react-redux";
import {
  deleteUser,
  logout,
  setUser,
} from "../../store/reducers/AuthReducers";
import { useAuth } from "@/hooks/useAuthh";
export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [userLogoutAPI, { isLoggingOut }] = useLogoutMutation();
  const [userDeleteAPI, { isDeleting }] = useDeleteUserMutation();

  const {data : userr , isSuccess} = useGetUserQuery();

  useEffect(() => {
    if(isSuccess && userr){
      dispatch(setUser(userr));
    }
  }, [userr , dispatch , isSuccess])

  const userLogout = async () => {
    try {
      const response = await userLogoutAPI();
      dispatch(logout());
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userDelete = async () => {
    try {
      const response = await userDeleteAPI();
      dispatch(deleteUser());
    } catch (error) {
      console.error(
        "Failed to delete user:",
        error.response?.data?.message || error.message
      );
    }
  };

  if (!user) return <SignUp />;
  return (
    <div>
      <div>Hello world</div>
      <button onClick={userLogout}>Log out</button>
      <button onClick={userDelete}>user delete</button>
      <ToastContainer position="top-right" />
    </div>
  );
}
