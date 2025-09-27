import { getUserAuthData, useCanCreate } from "@/features/auth";
import { postsClient } from "@/lib/grpc/posts";
import { useMutation } from "@tanstack/react-query";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { useRouter } from "@tanstack/react-router";

const useCreatePostServerFn = createServerFn().handler(async () => {
  const authContext = await getUserAuthData();
  const canCreate = useCanCreate(authContext);
  if (!canCreate) {
    throw new Error("User cannot create posts");
  }
  const { id } = await postsClient.createPost({});
  return id;
});

export const useCreatePost = () => {
  const createPost = useServerFn(useCreatePostServerFn);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      const postId = await createPost();
      // Invalidate all routes to refresh post previews (TODO: not necessary if we navigate away?)
      // await router.invalidate();
      router.navigate({ to: "/post/$postId/edit", params: { postId } });
    },
  });
  return mutation;
};
