import { createFileRoute, useParentMatches } from '@tanstack/react-router'

export const Route = createFileRoute('/post/$id/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  const parentMatchs = useParentMatches()
  const parentData = parentMatchs[parentMatchs.length - 1].loaderData
  console.log(parentData)
  return (
    <div>
      this test no work
    </div>
  )
}


