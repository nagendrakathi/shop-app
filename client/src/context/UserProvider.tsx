import React, { useEffect, useState } from "react";
import UserContext, { type UserContextType } from "./useUser";
import axiosInstance from "../lib/axios";
import API_PATHS from "../lib/apiPaths";
import { toast } from "react-toastify";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get<User>(API_PATHS.AUTH.GET_USER);
      setUser(res.data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const updateUser = (user: User) => {
    setUser(user);
  };

  const clearUser = async () => {
    try {
      await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
      toast.success("Logged out successfully");
      setUser(null);
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Failed to logout:", error);
    }
  };

  const contextValue: UserContextType = {
    user,
    updateUser,
    clearUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
