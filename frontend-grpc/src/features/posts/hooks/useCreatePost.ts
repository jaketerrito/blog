import { postsClient } from "@/lib/grpc/posts";
import { useMutation } from "@tanstack/react-query";
import { createServerFn, useServerFn } from "@tanstack/react-start";


const useCreatePostServerFn = createServerFn().handler(async () => {
// TODO: auth chceck
  const { id } = await postsClient.createPost({});
  return id;  
});

const useCreatePost = () => {
    const createPost = useServerFn(useCreatePostServerFn);
    const mutation = useMutation({
        mutationFn: () => {
            return createPost()
        },
    });
    return mutation;
}

export { useCreatePost };
