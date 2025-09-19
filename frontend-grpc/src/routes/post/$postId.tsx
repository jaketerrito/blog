import { createFileRoute } from "@tanstack/react-router";
import { postsClient } from "../../client";
import { createServerFn } from "@tanstack/react-start";

const getPost = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { post } = await postsClient.getPost({ id: id });
    return post;
  });

export const Route = createFileRoute("/post/$postId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await getPost({ data: params.postId });
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
