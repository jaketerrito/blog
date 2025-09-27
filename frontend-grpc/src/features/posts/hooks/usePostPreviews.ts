import { postsClient } from "@/lib/grpc/posts";
import { createServerFn } from "@tanstack/react-start";


export const usePostPreviewsServerFn = createServerFn().handler(async () => {
    const { previews } = await postsClient.getPostPreviews({});
    return previews;
});
