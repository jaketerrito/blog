import { ReactNode } from "react";
import { AuthContext, AuthContextValue } from "./AuthContext";

type Props = {
  authContext: AuthContextValue | null;
  children?: ReactNode;
};

export function AuthContextProvider({ authContext, children }: Props) {
  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}
