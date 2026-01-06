from src.proto.posts_pb2 import (
    GetPostPreviewsRequest,
    GetPostPreviewsResponse,
    GetPostRequest,
    GetPostResponse,
    Post,
    PostPreview,
)

import grpc
import src.proto.posts_pb2_grpc as posts_pb2_grpc


from logging import getLogger

logger = getLogger(__name__)


class PostsServicer(posts_pb2_grpc.PostsServiceServicer):
    def __init__(self, posts: dict[str, Post]):
        self.posts = posts
        sorted_posts = sorted(
            posts.values(), key=lambda post: post.date.seconds, reverse=True
        )
        self.post_previews = [
            PostPreview(id=post.id, title=post.title) for post in sorted_posts
        ]

    def GetPost(
        self, request: GetPostRequest, context: grpc.ServicerContext
    ) -> GetPostResponse:
        if request.id not in self.posts:
            context.abort(grpc.StatusCode.NOT_FOUND, f"Post {request.id} not found")
        post = self.posts[request.id]
        return GetPostResponse(post=post)

    def GetPostPreviews(
        self, request: GetPostPreviewsRequest, context: grpc.ServicerContext
    ) -> GetPostPreviewsResponse:
        return GetPostPreviewsResponse(previews=self.post_previews)
