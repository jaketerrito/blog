import { createChannel, createClient } from "nice-grpc";
import {
  PostsServiceClient,
  PostsServiceDefinition,
} from "@/generated/proto/posts";

const API_URL = process.env.POSTS_API_URL || "localhost:50051";

const channel = createChannel(API_URL);

export const client: PostsServiceClient = createClient(
  PostsServiceDefinition,
  channel,
);
