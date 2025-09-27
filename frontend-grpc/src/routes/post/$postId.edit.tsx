import { createFileRoute } from "@tanstack/react-router";
import { useCanEdit } from "@/features/auth/hooks/authorize";
import { useContext } from "react";
import { UserAuthenticationContext } from "@/features/auth";

export const Route = createFileRoute("/post/$postId/edit")({
  component: EditPost,
});

function EditPost() {
  const authContext = useContext(UserAuthenticationContext);
  const canEdit = useCanEdit(authContext);
  if (canEdit === false) {
    return <div></div>;
  }
  const { postId } = Route.useParams();

  return <div>Edit Post {postId}</div>;
}
