import { clearUserSession } from "../../funcs/session";

export const logout = async () => {
  await clearUserSession();
  window.location.href = "/logout";
};

export function LogoutButton() {
  return <button onClick={logout}>Logout</button>;
}
