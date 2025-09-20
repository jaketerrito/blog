import { createContext } from "react";

export type AuthContextValue = {
  userEmail: string;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
