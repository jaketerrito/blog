// Server function to get the email from x-user-email header
// This should read the x-user-email header from the request if available, storing in a session

import { createServerFn } from "@tanstack/react-start";
import { getWebRequest, useSession } from "@tanstack/react-start/server";
import { UserAuthenticationData } from "..";

// TODO: upgrade so we can use useSesssion from react-start + createServerOnlyFn(fn)
const getUserAuthenticationSession = () => {
  return useSession<UserAuthenticationData>({
    name: "auth",
    password: process.env.AUTH_SESSION_SECRET,
  });
};

export const invalidateUserAuthentication = createServerFn().handler(
  async () => {
    const session = await getUserAuthenticationSession();
    session.clear();
  },
);

export const authenticate = createServerFn().handler(async () => {
  const request = getWebRequest();
  const authUserEmail =
    request.headers.get("x-user-email") || process.env.DEV_USER;
  const session = await getUserAuthenticationSession();

  if (authUserEmail && session.data.userEmail !== authUserEmail) {
    await session.update({
      userEmail: authUserEmail,
    });
  }
});

export const getUserAuthData = createServerFn().handler(
  async (): Promise<UserAuthenticationData | null> => {
    const session = await getUserAuthenticationSession();

    if (!session.data.userEmail) {
      return null;
    }

    return {
      userEmail: session.data.userEmail,
    };
  },
);
