import { createFileRoute, Navigate } from "@tanstack/react-router";
import { getUserEmail, loginUser } from "../../utils/session";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
  loader: async () => {
    await loginUser();
  },
});

function RouteComponent() {
  return <Navigate to="/" />;
}
// TODO: redirect back to original page