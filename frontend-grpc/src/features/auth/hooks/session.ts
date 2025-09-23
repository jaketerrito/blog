// Server function to get the email from x-user-email header
// This should read the x-user-email header from the request if available, storing in a session

import { createServerFn } from "@tanstack/react-start";
import { getWebRequest, useSession } from "@tanstack/react-start/server";
import { AuthContextValue } from "@/features/auth/context/AuthContext";

type SessionData = {
  userEmail: string;
};

// TODO: provide secret for password
const getAuthSession = () => {
  return useSession<SessionData>({
    name: "auth",
    password: "wowthisisasasdfn321pin4i21n4i21n4",
  });
};

export const clearUserSession = createServerFn().handler(async () => {
  const session = await getAuthSession();
  session.clear();
});

export const login = createServerFn().handler(async () => {
  const request = getWebRequest();
  const authUserEmail =
    request.headers.get("x-user-email") || process.env.DEV_USER;
  const session = await getAuthSession();

  if (authUserEmail && session.data.userEmail !== authUserEmail) {
    await session.update({
      userEmail: authUserEmail,
    });
  }
});

export const getAuthContext = createServerFn().handler(
  async (): Promise<AuthContextValue | null> => {
    const session = await getAuthSession();

    if (!session.data.userEmail) {
      return null;
    }

    return {
      userEmail: session.data.userEmail,
    };
  },
);
