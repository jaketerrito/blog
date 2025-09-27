import { createFileRoute } from "@tanstack/react-router";
import { useCanEdit } from "@/features/auth/hooks/authorize";
import { useContext } from "react";
import { UserAuthenticationContext } from "@/features/auth";
import { DeletePostButton } from "@/features/posts/components/DeletePostButton";

export const Route = createFileRoute("/post/edit/$postId")({
  component: EditPost,
});

function EditPost() {
  const authContext = useContext(UserAuthenticationContext);
  const canEdit = useCanEdit(authContext);
  if (canEdit === false) {
    return <div>Not authorized</div>;
  }
  const { postId } = Route.useParams();

  return (
    <div>
      <h2>Edit Post {postId}</h2>
      <DeletePostButton postId={postId} />
    </div>
  );
}