import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useRouter } from "@tanstack/react-router";
import { createPost, deletePost, updatePost } from "./server";

export const useCreatePost = () => {
  const createPostFn = useServerFn(createPost);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      const postId = await createPostFn();
      // Invalidate all routes to refresh post previews (TODO: not necessary if we navigate away?)
      // await router.invalidate();
      router.navigate({ to: "/post/edit/$postId", params: { postId } });
    },
  });
  return mutation;
};

export const useDeletePost = (options?: { onSuccess?: () => void }) => {
  const deletePostFn = useServerFn(deletePost);
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await deletePostFn({ data: id });
    },
    onSuccess: options?.onSuccess,
  });
  return mutation;
};

export const useUpdatePost = () => {
  const updatePostFn = useServerFn(updatePost);
  const mutation = useMutation({
    mutationFn: async ({
      id,
      title,
      content,
    }: {
      id: string;
      title: string;
      content: string;
    }) => {
      await updatePostFn({ data: { id, title, content } });
    },
  });
  return mutation;
};
