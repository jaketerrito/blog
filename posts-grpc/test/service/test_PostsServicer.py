from datetime import datetime
from unittest.mock import Mock
from pytest import fixture, raises
from src.service.PostsServicer import PostsServicer
from src.repository.PostsRepository import PostsRepository
from src.proto.posts_pb2 import (
    GetPostRequest,
    GetPostPreviewsRequest,
    CreatePostRequest,
    UpdatePostRequest,
)
from src.database.model.post import Post as PostModel
import grpc
from src.util.mapper import post_model_to_post_preview_proto, post_model_to_post_proto
from src.util.exceptions import PostNotFoundError
from bson import ObjectId


@fixture
def context():
    context = Mock()

    # Configure the mock context to raise an exception when abort is called
    def abort_side_effect(code, details):
        rpc_error = grpc.RpcError(code, details)
        raise rpc_error

    context.abort.side_effect = abort_side_effect
    return context


@fixture
def posts_servicer() -> PostsServicer:
    posts_repository = Mock(spec=PostsRepository)
    return PostsServicer(posts_repository)


@fixture
def post_model() -> PostModel:
    return PostModel(
        id=ObjectId(),
        title="Test Post",
        content="Test Content",
        updated_at=datetime.now(),
    )


def test_get_post(posts_servicer: PostsServicer, context: Mock, post_model: PostModel):
    posts_servicer.posts_repository.get_post.return_value = post_model
    result = posts_servicer.GetPost(GetPostRequest(id=str(post_model.id)), context)
    assert result.post == post_model_to_post_proto(post_model)


def test_get_post_not_found(posts_servicer: PostsServicer, context: Mock):
    post_id = ObjectId()
    posts_servicer.posts_repository.get_post.side_effect = PostNotFoundError(post_id)

    with raises(grpc.RpcError):
        posts_servicer.GetPost(GetPostRequest(id=str(post_id)), context)

    context.abort.assert_called_once_with(
        grpc.StatusCode.NOT_FOUND, PostNotFoundError.get_message(post_id)
    )


def test_get_post_previews(
    posts_servicer: PostsServicer, context: Mock, post_model: PostModel
):
    posts_servicer.posts_repository.get_posts.return_value = [post_model]
    result = posts_servicer.GetPostPreviews(GetPostPreviewsRequest(), context)
    assert len(result.previews) == 1
    assert result.previews[0] == post_model_to_post_preview_proto(post_model)


def test_get_no_post_previews(
    posts_servicer: PostsServicer, context: Mock, post_model: PostModel
):
    posts_servicer.posts_repository.get_posts.return_value = []
    result = posts_servicer.GetPostPreviews(GetPostPreviewsRequest(), context)
    assert len(result.previews) == 0


def test_create_post(
    posts_servicer: PostsServicer, context: Mock, post_model: PostModel
):
    id = str(ObjectId())
    posts_servicer.posts_repository.create_post.return_value = id
    result = posts_servicer.CreatePost(CreatePostRequest(), context)
    assert result.id == id


def test_update_post(
    posts_servicer: PostsServicer, context: Mock, post_model: PostModel
):
    posts_servicer.posts_repository.update_post.return_value = post_model
    result = posts_servicer.UpdatePost(
        UpdatePostRequest(
            id=str(post_model.id), title=post_model.title, content=post_model.content
        ),
        context,
    )
    assert result.post == post_model_to_post_proto(post_model)


def test_update_post_not_found(posts_servicer: PostsServicer, context: Mock):
    post_id = str(ObjectId())
    posts_servicer.posts_repository.update_post.side_effect = PostNotFoundError(post_id)
    with raises(grpc.RpcError):
        posts_servicer.UpdatePost(UpdatePostRequest(id=post_id), context)
    context.abort.assert_called_once_with(
        grpc.StatusCode.NOT_FOUND, PostNotFoundError.get_message(post_id)
    )


def test_update_post_no_changes(
    posts_servicer: PostsServicer, context: Mock, post_model: PostModel
):
    posts_servicer.posts_repository.update_post.return_value = post_model
    posts_servicer.UpdatePost(
        UpdatePostRequest(id=str(post_model.id)),
        context,
    )
    posts_servicer.posts_repository.update_post.assert_called_once_with(
        str(post_model.id), None, None
    )
