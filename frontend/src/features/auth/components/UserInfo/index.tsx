import { useContext } from "react";
import { LoginButton } from "@/features/auth/components/LoginButton";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { UserAuthenticationContext } from "@/features/auth/context";

export function UserInfo() {
  const userAuthenticationContext = useContext(UserAuthenticationContext);

  if (userAuthenticationContext === null) {
    return <LoginButton />;
  }
  const { userEmail } = userAuthenticationContext;

  return (
    <div>
      Logged in as {userEmail}
      <LogoutButton />
    </div>
  );
}
