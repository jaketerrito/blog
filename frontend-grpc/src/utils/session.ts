// Server function to get the email from x-user-email header
// This should read the x-user-email header from the request if available, storing in a session

import { createServerFn } from "@tanstack/react-start";
import { getWebRequest, useSession } from "@tanstack/react-start/server";

type SessionData = {
  userEmail: string;
};

// Attempt to return the email from the session
export const getUserEmail = createServerFn().handler(async () => {
  const request = getWebRequest();
  const authUserEmail = request.headers.get("x-user-email");

  const session = await useSession<SessionData>({
    password: "wowthisisasasdfn321pin4i21n4i21n4",
  });

  if (authUserEmail && session.data.userEmail !== authUserEmail) {
    await session.update({
      userEmail: authUserEmail,
    });
  }

  return session.data.userEmail;
});
