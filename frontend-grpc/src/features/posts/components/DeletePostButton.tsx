import { useCanDelete, UserAuthenticationContext } from "@/features/auth";
import { useDeletePost } from "../hooks";
import { useContext } from "react";
import { useNavigate } from "@tanstack/react-router";

export const DeletePostButton = ({ postId }: { postId: string }) => {
  const authContext = useContext(UserAuthenticationContext);
  const canDelete = useCanDelete(authContext);
  const navigate = useNavigate();

  if (!canDelete) {
    return null;
  }

  const { mutate: deletePost } = useDeletePost({
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  return <button onClick={() => deletePost(postId)}>Delete Post</button>;
};
