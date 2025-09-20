export const login = () => {
  const original_path = window.location.pathname;
  const redirectParam =
    original_path !== "/"
      ? `?redirect=${encodeURIComponent(original_path)}`
      : "";
  window.location.href = `/login${redirectParam}`;
};

export function LoginButton() {
  return <button onClick={login}>Login</button>;
}
