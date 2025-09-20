export const logout = () => {
  window.location.href = "/logout";
};

export function LogoutButton() {
  return <button onClick={logout}>Logout</button>;
}
