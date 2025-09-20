import { createFileRoute, Navigate } from "@tanstack/react-router";
import { login } from "../../modules/funcs/session";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
  loader: async () => {
    await login();
  },
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: (search.redirect as string) || "/",
    };
  },
});

function RouteComponent() {
  const { redirect } = Route.useSearch();
  return <Navigate to={redirect} />;
}
