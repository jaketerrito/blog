import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LoginButton } from "../LoginButton";
import { LogoutButton } from "../LogoutButton";

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
