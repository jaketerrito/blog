import { invalidateUserAuthentication } from "@/features/auth";

export const logout = async () => {
  await invalidateUserAuthentication();
  window.location.href = "/logout";
};

export function LogoutButton() {
  return <button onClick={logout}>Logout</button>;
}
