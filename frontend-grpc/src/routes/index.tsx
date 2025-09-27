// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import { usePostPreviewsServerFn, PostPreview } from "@/features/posts";
import { NewPostButton } from "@/features/posts/components/NewPostButton";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    return {
      postPreviews: await usePostPreviewsServerFn(),
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
          <PostPreview postPreview={postPreview} />
        </div>
      ))}
      <NewPostButton />
    </div>
  );
}
