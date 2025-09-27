import { getUserAuthData, useCanDelete } from "@/features/auth";
import { postsClient } from "@/lib/grpc/posts";
import { useMutation } from "@tanstack/react-query";
import { createServerFn, useServerFn } from "@tanstack/react-start";

const useDeletePostServerFn = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const authContext = await getUserAuthData();
    const canDelete = useCanDelete(authContext);
    if (!canDelete) {
      throw new Error("User cannot delete posts");
    }
    await postsClient.deletePost({ id });
  });

export const useDeletePost = (options?: { onSuccess?: () => void }) => {
  const deletePost = useServerFn(useDeletePostServerFn);
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      await deletePost({ data: id });
    },
    onSuccess: options?.onSuccess,
  });
  return mutation;
};
