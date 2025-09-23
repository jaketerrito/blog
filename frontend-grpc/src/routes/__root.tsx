/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { getAuthContext } from "@/features/auth/hooks/session";
import { AuthContextProvider } from "@/features/auth/context";
import { Navbar } from "@/components";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Territo",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => <div>This a custom Page not found</div>,
  loader: async () => {
    return {
      authContext: await getAuthContext(),
    };
  },
});

function RootComponent() {
  const { authContext } = Route.useLoaderData();
  return (
    <AuthContextProvider authContext={authContext}>
      <RootDocument>
        <Navbar />
        <main style={{ padding: "2rem" }}>
          <Outlet />
        </main>
      </RootDocument>
    </AuthContextProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
