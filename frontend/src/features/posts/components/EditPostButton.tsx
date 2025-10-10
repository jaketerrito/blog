import { canEdit } from "../utils";
import { UserAuthenticationContext } from "@/features/auth";
import { useContext } from "react";
import { useNavigate } from "@tanstack/react-router";

export const EditPostButton = ({ postId }: { postId: string }) => {
  const authContext = useContext(UserAuthenticationContext);
  const userCanEdit = canEdit(authContext);
  const navigate = useNavigate();

  if (!userCanEdit) {
    return null;
  }

  return (
    <button
      onClick={() => navigate({ to: "/post/edit/$postId", params: { postId } })}
    >
      Edit Post
    </button>
  );
};
