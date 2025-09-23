import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getPost } from "../../features/posts/hooks";
import { PostDetail } from "../../features/posts/components";

const getPostServerFn = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    return await getPost(id);
  });

export const Route = createFileRoute("/post/$postId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await getPostServerFn({ data: params.postId });
  },
});

function RouteComponent() {
  const post = Route.useLoaderData();
  return <PostDetail post={post} />;
}
