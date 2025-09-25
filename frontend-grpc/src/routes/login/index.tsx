import { createFileRoute, redirect } from "@tanstack/react-router";
import { authenticate } from "@/features/auth/hooks/authenticate";

export const Route = createFileRoute("/login/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirectPath: (search.redirect as string) || "/",
    };
  },
  loaderDeps: ({ search: { redirectPath } }) => ({ redirectPath }),
  loader: async ({ deps: { redirectPath } }) => {
    await authenticate();
    throw redirect({ to: redirectPath });
  },
});
