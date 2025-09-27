/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { createUserAuthenticationContext } from "@/features/auth/hooks/authenticate";
import { UserAuthenticationContext } from "@/features/auth/context";
import { Navbar } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
      userAuthenticationContext: await createUserAuthenticationContext(),
    };
  },
});

function RootComponent() {
  const { userAuthenticationContext } = Route.useLoaderData();
  const queryClient = new QueryClient()

  return (
    <UserAuthenticationContext.Provider value={userAuthenticationContext}>
      <QueryClientProvider client={queryClient}>
        <RootDocument>
          <Navbar />
          <main>
            <Outlet />
          </main>
        </RootDocument>
      </QueryClientProvider>
    </UserAuthenticationContext.Provider>
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
