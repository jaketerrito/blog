import { createFileRoute } from "@tanstack/react-router";
import { getPost, Post } from "@/features/posts";
import { EditPostButton } from "@/features/posts/components/EditPostButton";

export const Route = createFileRoute("/post/$postId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await getPost({ data: params.postId });
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
      <EditPostButton postId={post.id} />
    </div>
  );
}
