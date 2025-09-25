import { createContext, useContext } from "react";
import type { User } from "./UserProvider";

export interface UserContextType {
  user: User | null;
  updateUser: (user: User) => void;
  clearUser: () => Promise<void>;
}

const UserContext=createContext<UserContextType | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext); 
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserContext;