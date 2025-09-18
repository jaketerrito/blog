import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/oauth2/callback")({
  component: OAuth2CallbackComponent,
});

function OAuth2CallbackComponent() {
  // Envoy Gateway handles the OAuth flow, we just need to redirect back
  // Extract the original URL from the state parameter if needed
  const urlParams = new URLSearchParams(window.location.search);
  const state = urlParams.get('state');
  
  let redirectUrl = '/login';
  
  if (state) {
    try {
      const stateData = JSON.parse(atob(state));
      redirectUrl = stateData.url || '/login';
    } catch {
      // If state parsing fails, just go to login
      redirectUrl = '/login';
    }
  }
  
  // Redirect to the original URL or login page
  window.location.href = redirectUrl;
  
  return (
    <div>
      <p>Authentication successful. Redirecting...</p>
    </div>
  );
}