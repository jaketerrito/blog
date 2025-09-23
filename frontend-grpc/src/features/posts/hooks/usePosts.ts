import { postsClient } from "@/lib/grpc";

export async function getPost(id: string) {
  const { post } = await postsClient.getPost({ id });
  return post;
}