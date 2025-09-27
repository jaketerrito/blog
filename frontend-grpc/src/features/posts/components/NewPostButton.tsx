import { useCanCreate, UserAuthenticationContext } from "@/features/auth";
import { useCreatePost } from "../hooks";
import { useContext } from "react";

export const NewPostButton = () => {
  const authContext = useContext(UserAuthenticationContext);
  const canCreate = useCanCreate(authContext);
  if (!canCreate) {
    return null;
  }
  const { mutate: createPost } = useCreatePost();
  return <button onClick={() => createPost()}>New Post</button>;
};
