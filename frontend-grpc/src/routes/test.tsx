import { createFileRoute } from '@tanstack/react-router'
import { getUserEmail } from './api/private';
import { useServerFn } from '@tanstack/react-start';

export const Route = createFileRoute('/test')({
  component: RouteComponent,
  loader: async () => {
    const email = await getUserEmail();
    return { email };
  },
})

function RouteComponent() {
  const getEmail = useServerFn(getUserEmail);
  const freshemail  = getEmail();
  const { email: userEmail } = Route.useLoaderData();

  return <div>Hello {freshemail} {userEmail}</div>
}
