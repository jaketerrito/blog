// Server function to get the email from x-user-email header
// This should read the x-user-email header from the request if available, storing in a session

import { createServerFn } from "@tanstack/react-start";
import { getWebRequest, useSession } from "@tanstack/react-start/server";
import { UserAuthenticationContextValue } from "@/features/auth/context/UserAuthenticationContext";

interface UserAuthenticationData {
  userEmail: string;
}

// TODO: provide secret for password
const getUserAuthenticationSession = () => {
  return useSession<UserAuthenticationData>({
    name: "auth",
    password: "wowthisisasasdfn321pin4i21n4i21n4",
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

export const createUserAuthenticationContext = createServerFn().handler(
  async (): Promise<UserAuthenticationContextValue | null> => {
    const session = await getUserAuthenticationSession();

    if (!session.data.userEmail) {
      return null;
    }

    return {
      userEmail: session.data.userEmail,
    };
  },
);
