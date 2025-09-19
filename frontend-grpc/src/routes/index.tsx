// src/routes/index.tsx
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { postsClient } from "../client";

export const getPostPreviews = createServerFn().handler(async () => {
  const { previews } = await postsClient.getPostPreviews({});
  return previews;
});

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    return await getPostPreviews();
  },
});

function Home() {
  const postPreviews = Route.useLoaderData();

  return (
    <div>
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
