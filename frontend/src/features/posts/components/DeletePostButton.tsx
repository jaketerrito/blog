import { canDelete } from "../utils";
import { UserAuthenticationContext } from "@/features/auth";
import { useDeletePost } from "../hooks";
import { useContext } from "react";
import { useNavigate } from "@tanstack/react-router";

export const DeletePostButton = ({ postId }: { postId: string }) => {
  const authContext = useContext(UserAuthenticationContext);
  const userCanDelete = canDelete(authContext);
  const navigate = useNavigate();

  if (!userCanDelete) {
    return null;
  }

  const { mutate: deletePost } = useDeletePost({
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  return <button onClick={() => deletePost(postId)}>Delete Post</button>;
};
