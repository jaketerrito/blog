from proto.posts_pb2 import (
    CreatePostRequest,
    CreatePostResponse,
    DeletePostRequest,
    DeletePostResponse,
    GetPostRequest,
    GetPostResponse,
    GetPostsRequest,
    GetPostsResponse,
    UpdatePostRequest,
    UpdatePostResponse,
)

from util.mapper import convert_model_to_proto
import grpc
import proto.posts_pb2_grpc as posts_pb2_grpc
from repository.PostsRepository import PostsRepository
from util.exceptions import PostNotFoundError


# TODO: authorization should have seperate class and not be in the servicer
# Methods like can_read_post, can_edit_post, can see private posts
class PostsServicer(posts_pb2_grpc.PostsServiceServicer):
    def __init__(self, posts_repository: PostsRepository):
        self.posts_repository = posts_repository

    def GetPost(
        self, request: GetPostRequest, context: grpc.ServicerContext
    ) -> GetPostResponse:
        try:
            post = self.posts_repository.get_post(request.id)
            return GetPostResponse(post=convert_model_to_proto(post))
        except PostNotFoundError as e:
            context.abort(grpc.StatusCode.NOT_FOUND, str(e))

    def GetPosts(
        self, request: GetPostsRequest, context: grpc.ServicerContext
    ) -> GetPostsResponse:
        posts = self.posts_repository.get_posts()
        return GetPostsResponse(posts=[convert_model_to_proto(post) for post in posts])

    def CreatePost(
        self, request: CreatePostRequest, context: grpc.ServicerContext
    ) -> CreatePostResponse:
        id = self.posts_repository.create_post()
        return CreatePostResponse(id=id)

    def UpdatePost(
        self, request: UpdatePostRequest, context: grpc.ServicerContext
    ) -> UpdatePostResponse:
        try:
            post = self.posts_repository.update_post(
                request.id, request.title, request.content
            )
            return UpdatePostResponse(post=convert_model_to_proto(post))
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
