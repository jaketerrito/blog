import { useCanCreate } from "@/features/auth";
import { useCreatePost } from "../hooks";

export const NewPostButton = () => {
  const canCreate = useCanCreate();
  if (!canCreate) {
    return null;
  }
  const { mutate: createPost } = useCreatePost();
  return <button onClick={() => createPost()}>New Post</button>;
};
