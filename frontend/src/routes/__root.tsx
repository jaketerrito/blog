/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { UserAuthenticationContext } from "@/features/auth/context";
import { Navbar } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getUserAuthData } from "@/features/auth";
import CSS from "@/styles/global.css?url";

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
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap",
      },
      { rel: "stylesheet", href: CSS },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => <div>This a custom Page not found</div>,
  loader: async () => {
    return {
      userAuthenticationData: await getUserAuthData(),
    };
  },
});

function RootComponent() {
  const { userAuthenticationData } = Route.useLoaderData();
  const queryClient = new QueryClient();

  return (
    <UserAuthenticationContext.Provider value={userAuthenticationData}>
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
