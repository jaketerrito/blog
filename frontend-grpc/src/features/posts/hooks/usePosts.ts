import { postsClient } from "@/lib/grpc/posts";

export async function getPost(id: string) {
  const { post } = await postsClient.getPost({ id });
  return post;
}
