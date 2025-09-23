// src/routes/index.tsx
import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { postsClient } from "../lib/grpc";

export const getPostPreviews = createServerFn().handler(async () => {
  const { previews } = await postsClient.getPostPreviews({});
  return previews;
});

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    return {
      postPreviews: await getPostPreviews(),
    };
  },
});

function Home() {
  const { postPreviews } = Route.useLoaderData();

  return (
    <div>
      <br />
      <h1>Posts</h1>
      {postPreviews.map((postPreview) => (
        <div key={postPreview.id}>
          <Link to={"/post/$postId"} params={{ postId: postPreview.id }}>
            {postPreview.title || "Untitled"}
          </Link>
        </div>
      ))}
    </div>
  );
}
