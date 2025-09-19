import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';

// Server function to get the email from x-user-email header
export const getUserEmail = createServerFn().handler(async () => {
    const request = getWebRequest();
    const userEmail = request.headers.get("x-user-email");
    return userEmail || null;
  });

export const Route = createFileRoute('/api/private/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello /api/private/!</div>
}
