import { useCanEdit, UserAuthenticationContext } from "@/features/auth";
import { useContext } from "react";
import { useNavigate } from "@tanstack/react-router";

export const EditPostButton = ({ postId }: { postId: string }) => {
  const authContext = useContext(UserAuthenticationContext);
  const canEdit = useCanEdit(authContext);
  const navigate = useNavigate();

  if (!canEdit) {
    return null;
  }

  return <button onClick={() => navigate({ to: "/post/edit/$postId", params: { postId } })}>Edit Post</button>;
};
