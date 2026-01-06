import { createServerFn } from "@tanstack/react-start";
import {
  PostsServiceClient,
  PostsServiceDefinition,
} from "@/generated/proto/posts";
import { createChannel, createClient } from "nice-grpc";

const postsClient: PostsServiceClient = createClient(
  PostsServiceDefinition,
  createChannel(process.env.POSTS_API_URL),
);

export const getPost = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const { post } = await postsClient.getPost({ id });
    return post;
  });

export const getPostPreviews = createServerFn().handler(async () => {
  const { previews } = await postsClient.getPostPreviews({});
  return previews;
});
