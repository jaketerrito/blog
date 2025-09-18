import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/oauth2/callback")({
  beforeLoad: () => {
    // Immediate redirect back to login
    throw redirect({ to: '/login' });
  },
  component: OAuth2CallbackComponent,
});

function OAuth2CallbackComponent() {
  // Should not render due to redirect
  return (
    <div>
      <p>Redirecting...</p>
    </div>
  );
}