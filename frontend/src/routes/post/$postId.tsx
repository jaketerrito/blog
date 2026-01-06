import { createFileRoute, redirect } from "@tanstack/react-router";
import { getPost, Post } from "@/features/posts";

export const Route = createFileRoute("/post/$postId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const post = await getPost({ data: params.postId });
    if (!post) {
      throw redirect({ to: "/", params: { postId: params.postId } });
    }
    return post;
  },
});

function RouteComponent() {
  const post = Route.useLoaderData();

  return (
    <div>
      <Post post={post} />
    </div>
  );
}
