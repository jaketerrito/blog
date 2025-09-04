// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { postsClient } from "../client";

export const getTest = createServerFn().handler(async () => {
  const response = await postsClient.getPosts({});

  return response.posts;
});

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const data = await getTest();
    return { data };
  },
});

function Home() {
  const { data } = Route.useLoaderData();
  return (
    <div>
      <h1>WOOWO</h1>
      <p>{data.map((post) => post.title).join(", ")}</p>
    </div>
  );
}
