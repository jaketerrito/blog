from typing import Callable
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
from sqlalchemy.orm import sessionmaker, Session

from src.util.exceptions import PostNotFoundError


class PostsServicer(posts_pb2_grpc.PostsServiceServicer):
    def __init__(self, session_factory: sessionmaker, repository_factory: Callable[[Session], PostsRepository]):
        self.session_factory = session_factory
        self.repository_factory = repository_factory

    def GetPost(
        self, request: GetPostRequest, context: grpc.ServicerContext
    ) -> GetPostResponse:
        with self.session_factory() as session, session.begin():
            posts_repository = self.repository_factory(session)
            try:
                post = posts_repository.get_post(request.id)
                return GetPostResponse(post=post_model_to_post_proto(post))
            except PostNotFoundError as e:
                context.abort(grpc.StatusCode.NOT_FOUND, str(e))

    def GetPostPreviews(
        self, request: GetPostPreviewsRequest, context: grpc.ServicerContext
    ) -> GetPostPreviewsResponse:
        with self.session_factory() as session, session.begin():
            posts_repository = self.repository_factory(session)
            previews = posts_repository.get_posts()
            return GetPostPreviewsResponse(
                previews=[post_model_to_post_preview_proto(post) for post in previews]
            )

    def CreatePost(
        self, request: CreatePostRequest, context: grpc.ServicerContext
    ) -> CreatePostResponse:
        with self.session_factory() as session, session.begin():
            posts_repository = self.repository_factory(session)
            id = str(posts_repository.create_post())
            return CreatePostResponse(id=id)

    def UpdatePost(
        self, request: UpdatePostRequest, context: grpc.ServicerContext
    ) -> UpdatePostResponse:
        with self.session_factory() as session, session.begin():
            posts_repository = self.repository_factory(session)
            title = request.title if request.HasField("title") else None
            content = request.content if request.HasField("content") else None
            try:
                post = posts_repository.update_post(request.id, title, content)
                return UpdatePostResponse(post=post_model_to_post_proto(post))
            except PostNotFoundError as e:
                context.abort(grpc.StatusCode.NOT_FOUND, str(e))

    def DeletePost(
        self, request: DeletePostRequest, context: grpc.ServicerContext
    ) -> DeletePostResponse:
        with self.session_factory() as session, session.begin():
            posts_repository = self.repository_factory(session)
            try:
                posts_repository.delete_post(request.id)
                return DeletePostResponse()
            except PostNotFoundError as e:
                context.abort(grpc.StatusCode.NOT_FOUND, str(e))
