import { getUserAuthData } from "@/features/auth";
import { createServerFn } from "@tanstack/react-start";
import { canCreate, canDelete, canEdit } from "./utils";
import {
  PostsServiceClient,
  PostsServiceDefinition,
  UpdatePostRequest,
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

export const createPost = createServerFn().handler(async () => {
  const authContext = await getUserAuthData();
  const userCanCreate = canCreate(authContext);
  if (!userCanCreate) {
    throw new Error("User cannot create posts");
  }
  const { id } = await postsClient.createPost({});
  return id;
});

export const deletePost = createServerFn()
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    const authContext = await getUserAuthData();
    const userCanDelete = canDelete(authContext);
    if (!userCanDelete) {
      throw new Error("User cannot delete posts");
    }
    await postsClient.deletePost({ id });
  });

export const updatePost = createServerFn()
  .validator((data: UpdatePostRequest) => data)
  .handler(async ({ data }) => {
    const authContext = await getUserAuthData();
    const userCanEdit = canEdit(authContext);
    if (!userCanEdit) {
      throw new Error("User cannot edit posts");
    }
    await postsClient.updatePost(data);
  });
