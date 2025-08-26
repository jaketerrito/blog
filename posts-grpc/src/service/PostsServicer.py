from proto.posts_pb2 import (
    CreatePostRequest,
    CreatePostResponse,
    DeletePostRequest,
    DeletePostResponse,
    GetPostRequest,
    GetPostResponse,
    GetPostsRequest,
    GetPostsResponse,
    Post,
    UpdatePostRequest,
    UpdatePostResponse,
)
import grpc
import proto.posts_pb2_grpc as posts_pb2_grpc
from repository.PostsRepository import PostNotFoundError, PostsRepository
from google.protobuf.timestamp_pb2 import Timestamp
from database.model.post import Post as PostModel


# TODO: authorization should have seperate class and not be in the servicer
# Methods like can_read_post, can_edit_post, can see private posts
class PostsServicer(posts_pb2_grpc.PostsServicer):
    def __init__(self, posts_repository: PostsRepository):
        self.posts_repository = posts_repository

    def convert_model_to_proto(self, post_model: PostModel) -> Post:
        return Post(
            id=post_model.id,
            title=post_model.title,
            content=post_model.content,
            created_at=Timestamp().FromDatetime(post_model.created_at),
            updated_at=Timestamp().FromDatetime(post_model.updated_at),
        )

    def GetPost(
        self, request: GetPostRequest, context: grpc.ServicerContext
    ) -> GetPostResponse:
        try:
            post_model = self.posts_repository.get_post(request.id)
        except PostNotFoundError as e:
            context.abort(grpc.StatusCode.NOT_FOUND, str(e))
        return GetPostResponse(post=self.convert_model_to_proto(post_model))

    def GetPosts(
        self, request: GetPostsRequest, context: grpc.ServicerContext
    ) -> GetPostsResponse:
        posts = self.posts_repository.get_posts()
        return GetPostsResponse(
            posts=[self.convert_model_to_proto(post) for post in posts]
        )

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
                request.post.id, request.post.title, request.post.content
            )
        except PostNotFoundError as e:
            context.abort(grpc.StatusCode.NOT_FOUND, str(e))
        return UpdatePostResponse(post=self.convert_model_to_proto(post))

    def DeletePost(
        self, request: DeletePostRequest, context: grpc.ServicerContext
    ) -> DeletePostResponse:
        try:
            self.posts_repository.delete_post(request.id)
        except PostNotFoundError as e:
            context.abort(grpc.StatusCode.NOT_FOUND, str(e))
        return DeletePostResponse()
