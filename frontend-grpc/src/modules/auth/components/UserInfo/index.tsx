import { useContext } from "react";
import { LoginButton } from "../LoginButton";
import { LogoutButton } from "../LogoutButton";
import { AuthContext } from "../../context";

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
