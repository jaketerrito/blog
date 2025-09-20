export const login = () => {
    window.location.href = "/login";
};

export function LoginButton() {
  return (
    <button onClick={login}>Login</button>
  );
}