// Server function to get the email from x-user-email header
// This should read the x-user-email header from the request if available, storing in a session

import { createServerFn } from "@tanstack/react-start";
import { getWebRequest, useSession } from "@tanstack/react-start/server";

type SessionData = {
  userEmail: string;
};

// TODO: provide secret for password
// TODO: reusable method to get session
export const clearUserSession = createServerFn().handler(async () => {
  const session = await useSession<SessionData>({
    password: "wowthisisasasdfn321pin4i21n4i21n4",
  });
  session.clear();
});

export const loginUser = createServerFn().handler(async () => {
  const request = getWebRequest();
  const authUserEmail =
    request.headers.get("x-user-email") || process.env.DEV_USER;
  const session = await useSession<SessionData>({
    password: "wowthisisasasdfn321pin4i21n4i21n4",
  });

  if (authUserEmail && session.data.userEmail !== authUserEmail) {
    await session.update({
      userEmail: authUserEmail,
    });
  }
});

export const getUserEmail = createServerFn().handler(async () => {
  const session = await useSession<SessionData>({
    password: "wowthisisasasdfn321pin4i21n4i21n4",
  });

  return session.data.userEmail;
});
