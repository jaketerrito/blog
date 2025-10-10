import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { canEdit } from "@/features/posts/utils";
import { getUserAuthData } from "@/features/auth";
import { getPost } from "@/features/posts";
import { EditPost, DeletePostButton } from "@/features/posts/components";

export const Route = createFileRoute("/post/edit/$postId")({
  beforeLoad: async ({ params }) => {
    const userAuthData = await getUserAuthData();
    const userCanEdit = canEdit(userAuthData);
    if (userCanEdit === false) {
      throw redirect({
        to: "/post/$postId",
        params: { postId: params.postId },
      });
    }
  },
  loader: async ({ params }) => {
    const post = await getPost({ data: params.postId });
    if (!post) {
      throw redirect({ to: "/", params: { postId: params.postId } });
    }
    return post;
  },
  component: EditPostPage,
});

function EditPostPage() {
  const post = Route.useLoaderData();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate({ to: "/post/$postId", params: { postId: post.id } });
  };

  return (
    <div>
      <EditPost post={post} onSuccess={handleSuccess} />
      <DeletePostButton postId={post.id} />
    </div>
  );
}
