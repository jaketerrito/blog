import { createFileRoute } from '@tanstack/react-router'
import { getUserEmail } from './api/private';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
  loader: async () => {
    const email = await getUserEmail();
    return { email };
  },
})

function RouteComponent() {
  const { email: userEmail } = Route.useLoaderData();

  return <div>Hello {userEmail}</div>
}
