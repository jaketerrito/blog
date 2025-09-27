import { useContext } from "react";
import { UserAuthenticationContext } from "../context/UserAuthenticationContext";

export function useCanEdit(): boolean {
  const authenticationContext = useContext(UserAuthenticationContext);
  if (!authenticationContext) {
    return false;
  }
  return authenticationContext.userEmail !== null;
}

export function useCanCreate(): boolean {
  const authenticationContext = useContext(UserAuthenticationContext);
  if (!authenticationContext) {
    return false;
  }
  return authenticationContext.userEmail !== null;
}
