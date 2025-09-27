import { createContext } from "react";
import { UserAuthenticationData } from "..";


export const UserAuthenticationContext =
  createContext<UserAuthenticationData | null>(null);
