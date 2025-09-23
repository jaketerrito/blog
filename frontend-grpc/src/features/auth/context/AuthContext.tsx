import { createContext } from "react";

export interface AuthContextValue {
  userEmail: string;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
