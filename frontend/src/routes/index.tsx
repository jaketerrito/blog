// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { getPostPreviews, PostPreviewList } from "@/features/posts";
import { NewPostButton } from "@/features/posts/components/NewPostButton";

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
      <PostPreviewList postPreviews={postPreviews} />
      <NewPostButton />
    </div>
  );
}
