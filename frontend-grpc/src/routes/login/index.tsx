import { createFileRoute } from '@tanstack/react-router'
import { getUserEmail } from '../../utils/session';



export const Route = createFileRoute('/login/')({
  component: RouteComponent,
  loader: async () => {
    const email = await getUserEmail();
    return { email };
  },
})

function RouteComponent() {
  const { email: userEmail } = Route.useLoaderData();
  return <div>Logged in as {userEmail}</div>
}

