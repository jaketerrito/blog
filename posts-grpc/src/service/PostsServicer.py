from src.proto.posts_pb2 import (
    CreatePostRequest,
    CreatePostResponse,
    DeletePostRequest,
    DeletePostResponse,
    GetPostPreviewsRequest,
    GetPostPreviewsResponse,
    GetPostRequest,
    GetPostResponse,
    UpdatePostRequest,
    UpdatePostResponse,
)

from src.util.mapper import post_model_to_post_proto, post_model_to_post_preview_proto
import grpc
import src.proto.posts_pb2_grpc as posts_pb2_grpc
from src.repository.PostsRepository import PostsRepository
from src.util.exceptions import PostNotFoundError


# TODO: authorization should have seperate class and not be in the servicer
# Methods like can_read_post, can_edit_post, can see private posts
# Perhaps just handle that in infra
class PostsServicer(posts_pb2_grpc.PostsServiceServicer):
    def __init__(self, posts_repository: PostsRepository):
        self.posts_repository = posts_repository

    def GetPost(
        self, request: GetPostRequest, context: grpc.ServicerContext
    ) -> GetPostResponse:
        try:
            post = self.posts_repository.get_post(request.id)
            return GetPostResponse(post=post_model_to_post_proto(post))
        except PostNotFoundError as e:
            context.abort(grpc.StatusCode.NOT_FOUND, str(e))

    def GetPostPreviews(
        self, request: GetPostPreviewsRequest, context: grpc.ServicerContext
    ) -> GetPostPreviewsResponse:
        previews = self.posts_repository.get_posts()
        return GetPostPreviewsResponse(
            previews=[post_model_to_post_preview_proto(post) for post in previews]
        )

    def CreatePost(
        self, request: CreatePostRequest, context: grpc.ServicerContext
    ) -> CreatePostResponse:
        id = self.posts_repository.create_post()
        return CreatePostResponse(id=id)

    def UpdatePost(
        self, request: UpdatePostRequest, context: grpc.ServicerContext
    ) -> UpdatePostResponse:
        title = request.title if request.HasField("title") else None
        content = request.content if request.HasField("content") else None
        try:
            post = self.posts_repository.update_post(request.id, title, content)
            return UpdatePostResponse(post=post_model_to_post_proto(post))
        except PostNotFoundError as e:
            context.abort(grpc.StatusCode.NOT_FOUND, str(e))

    def DeletePost(
        self, request: DeletePostRequest, context: grpc.ServicerContext
    ) -> DeletePostResponse:
        try:
            self.posts_repository.delete_post(request.id)
            return DeletePostResponse()
        except PostNotFoundError as e:
            context.abort(grpc.StatusCode.NOT_FOUND, str(e))
