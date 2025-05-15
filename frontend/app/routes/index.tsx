// app/routes/index.tsx
import { AuthoredPosts } from "@/modules/posts/components/AuthoredPosts";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <div>
      <AuthoredPosts author_id="test" />
    </div>
  );
}
