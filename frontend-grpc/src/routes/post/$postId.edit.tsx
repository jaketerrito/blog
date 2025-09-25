import { createFileRoute } from "@tanstack/react-router";
import { useCanEdit } from "@/features/auth/hooks/authorize";

export const Route = createFileRoute("/post/$postId/edit")({
  component: EditPost,
});

function EditPost() {
  const canEdit = useCanEdit();
  if (canEdit === false) {
    return <div></div>;
  }
  const { postId } = Route.useParams();

  return <div>Edit Post {postId}</div>;
}
