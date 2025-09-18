import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/oauth2/callback')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/oauth2_callback"!</div>
}
