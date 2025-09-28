import { createFileRoute } from "@tanstack/react-router";
import { canEdit } from "@/features/posts/utils";
import { useContext } from "react";
import { UserAuthenticationContext } from "@/features/auth";
import { DeletePostButton } from "@/features/posts/components/DeletePostButton";

export const Route = createFileRoute("/post/edit/$postId")({
  component: EditPost,
});

function EditPost() {
  const authContext = useContext(UserAuthenticationContext);
  const userCanEdit = canEdit(authContext);
  if (userCanEdit === false) {
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
