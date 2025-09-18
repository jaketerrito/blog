import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/oauth2/callback")({
  component: OAuth2CallbackComponent,
});

function OAuth2CallbackComponent() {
  return (
    <div>
      <h1>Authentication Complete</h1>
      <p>✅ You have been successfully authenticated via Google OAuth.</p>
      <p>Your authentication cookies have been set by Envoy Gateway.</p>
      <br />
      <p>You can now:</p>
      <ul>
        <li><a href="/login">Check your login status</a></li>
        <li><a href="/">Go to Home</a></li>
      </ul>
      <br />
      <p><small>Note: If you visit /login and it doesnt show you as authenticated, there may be a cookie propagation issue with your Envoy Gateway configuration.</small></p>
    </div>
  );
}