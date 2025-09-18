import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

// Server function to get the email from x-user-email header
const getUserEmail = createServerFn().handler(async () => {
  const request = getWebRequest();
  console.log(request);
  const userEmail = request.headers.get("x-user-email");
  return userEmail || null;
});

export const Route = createFileRoute("/login/")({
  component: LoginPage,
  loader: async () => {
    const email = await getUserEmail();
    return { email };
  },
});

function LoginPage() {
  const { email: userEmail } = Route.useLoaderData();

  const handleLogin = () => {
    window.location.href = "/login?redirect=true";
  };

  const handleLogout = () => {
    window.location.href = "/logout";
  };

  return (
    <div>
      <h1>Blog Authentication</h1>

      {userEmail ? (
        <div>
          <h2>✅ Authenticated</h2>
          <p>
            Email: <strong>{userEmail}</strong>
          </p>
          <button onClick={handleLogout}>Logout</button>
          <br />
          <a href="/">Go to Home</a>
        </div>
      ) : (
        <div>
          <h2>Not Authenticated</h2>
          <p>Click to login with Google OAuth through Envoy Gateway</p>
          <button onClick={handleLogin}>Login with Google</button>
        </div>
      )}
    </div>
  );
}
