import uuid
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

from src.mapper import post_model_to_post_proto, post_model_to_post_preview_proto
import grpc
import src.proto.posts_pb2_grpc as posts_pb2_grpc
from sqlalchemy.orm import sessionmaker


from sqlalchemy import select
from src.database.model.post import Post

from logging import getLogger

logger = getLogger(__name__)


class PostsServicer(posts_pb2_grpc.PostsServiceServicer):
    def __init__(self, session_factory: sessionmaker):
        self.session_factory = session_factory

    def GetPost(
        self, request: GetPostRequest, context: grpc.ServicerContext
    ) -> GetPostResponse:
        with self.session_factory() as session, session.begin():
            post = session.execute(
                select(Post).where(Post.id == uuid.UUID(request.id))
            ).scalar_one_or_none()
            if post is None:
                context.abort(grpc.StatusCode.NOT_FOUND, f"Post {request.id} not found")
            return GetPostResponse(post=post_model_to_post_proto(post))

    def GetPostPreviews(
        self, request: GetPostPreviewsRequest, context: grpc.ServicerContext
    ) -> GetPostPreviewsResponse:
        with self.session_factory() as session, session.begin():
            posts = (
                session.execute(select(Post).order_by(Post.created_at.desc()))
                .scalars()
                .all()
            )
            return GetPostPreviewsResponse(
                previews=[post_model_to_post_preview_proto(post) for post in posts]
            )

    def CreatePost(
        self, request: CreatePostRequest, context: grpc.ServicerContext
    ) -> CreatePostResponse:
        with self.session_factory() as session, session.begin():
            post = Post()
            session.add(post)
            session.flush()
            return CreatePostResponse(id=str(post.id))

    def UpdatePost(
        self, request: UpdatePostRequest, context: grpc.ServicerContext
    ) -> UpdatePostResponse:
        with self.session_factory() as session, session.begin():
            title = request.title if request.HasField("title") else None
            content = request.content if request.HasField("content") else None

            post = session.execute(
                select(Post).where(Post.id == uuid.UUID(request.id))
            ).scalar_one_or_none()
            if post is None:
                context.abort(grpc.StatusCode.NOT_FOUND, f"Post {request.id} not found")

            if title is not None:
                post.title = title
            if content is not None:
                post.content = content
            session.add(post)
            session.flush()  # force update time to change

            return UpdatePostResponse(post=post_model_to_post_proto(post))

    def DeletePost(
        self, request: DeletePostRequest, context: grpc.ServicerContext
    ) -> DeletePostResponse:
        with self.session_factory() as session, session.begin():
            post = session.execute(
                select(Post).where(Post.id == request.id)
            ).scalar_one_or_none()
            if post is None:
                context.abort(grpc.StatusCode.NOT_FOUND, f"Post {request.id} not found")
            session.delete(post)
            return DeletePostResponse()
