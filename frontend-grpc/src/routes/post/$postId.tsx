import { createFileRoute, Outlet } from "@tanstack/react-router";
import { usePostServerFn, Post } from "@/features/posts";


export const Route = createFileRoute("/post/$postId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await usePostServerFn({ data: params.postId });
  },
});

function RouteComponent() {
  const post = Route.useLoaderData();
  if (!post) {
    return <div>404 - Post not found</div>;
  }
  return (
    <div>
      <Post post={post} />
      <Outlet />
    </div>
  );
}
