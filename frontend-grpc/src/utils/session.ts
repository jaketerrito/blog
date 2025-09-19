// Server function to get the email from x-user-email header
// This should read the x-user-email header from the request if available, storing in a session

import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

// Attempt to return the email from the session
export const getUserEmail = createServerFn().handler(async () => {
    const request = getWebRequest();
    const userEmail = request.headers.get("x-user-email");
    return userEmail || null;
  });
  