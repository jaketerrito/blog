import { createContext } from "react";

export interface UserAuthenticationContextValue {
  userEmail: string;
}

export const UserAuthenticationContext =
  createContext<UserAuthenticationContextValue | null>(null);
