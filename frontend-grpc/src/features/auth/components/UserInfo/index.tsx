import { useContext } from "react";
import { LoginButton } from "@/features/auth/components/LoginButton";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { AuthContext } from "@/features/auth/context";

export function UserInfo() {
  const authContext = useContext(AuthContext);

  if (authContext === null) {
    return <LoginButton />;
  }
  const { userEmail } = authContext;

  return (
    <div>
      Logged in as {userEmail}
      <LogoutButton />
    </div>
  );
}
