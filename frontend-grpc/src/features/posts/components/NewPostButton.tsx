import { canCreate } from "../utils";
import { UserAuthenticationContext } from "@/features/auth";
import { useCreatePost } from "../hooks";
import { useContext } from "react";

export const NewPostButton = () => {
  const authContext = useContext(UserAuthenticationContext);
  const userCanCreate = canCreate(authContext);
  if (!userCanCreate) {
    return null;
  }
  const { mutate: createPost } = useCreatePost();
  return <button onClick={() => createPost()}>New Post</button>;
};
