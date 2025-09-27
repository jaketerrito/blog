import { postsClient } from "@/lib/grpc/posts";
import { createServerFn } from "@tanstack/react-start";


export const usePostServerFn = createServerFn().validator((id: string) => id).handler(async ({ data: id }) => {
  const { post } = await postsClient.getPost({ id });
  return post;  
});
