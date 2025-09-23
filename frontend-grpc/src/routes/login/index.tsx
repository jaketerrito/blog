import { createFileRoute, redirect } from "@tanstack/react-router";
import { login } from "@/features/auth/hooks/session";

export const Route = createFileRoute("/login/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirectPath: (search.redirect as string) || "/",
    };
  },
  loaderDeps: ({ search: { redirectPath } }) => ({ redirectPath }),
  loader: async ({ deps: { redirectPath } }) => {
    await login();
    throw redirect({ to: redirectPath });
  },
});
