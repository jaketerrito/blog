import { createFileRoute } from "@tanstack/react-router";
import { postsClient } from "../../client";

export const Route = createFileRoute("/post/$postId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const { post } = await postsClient.getPost({ id: params.postId });
    return post;
  },
});

function RouteComponent() {
  const post = Route.useLoaderData();
  if (!post) {
    return "404";
  }
  return (
    <div>
      <h1>{post.title || "No title"}</h1>
      <p>{post.content || "No content"}</p>
      <p>{post.createdAt?.toLocaleString()}</p>
      <p>{post.updatedAt?.toLocaleString()}</p>
    </div>
  );
}
