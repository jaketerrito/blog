/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { LoginButton } from "../components/loginButton";
import { LogoutButton } from "../components/logoutButton";
import { getUserEmail } from "../utils/session";
import { useServerFn } from "@tanstack/react-start";

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
        title: "TanStack Start Starter",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => <div>This a custom Page not found</div>,
});

function RootComponent() {
  return (
    <RootDocument>
      <Link to="/">Home</Link> <br />
      <LoginButton /> <br />
      <LogoutButton /> <br />
      <Outlet />
    </RootDocument>
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
