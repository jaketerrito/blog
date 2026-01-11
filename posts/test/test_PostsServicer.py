from unittest.mock import Mock
from pytest import fixture, raises
from src.proto.posts_pb2 import (
    GetPostRequest,
    GetPostPreviewsRequest,
    Post,
)
import grpc

from google.protobuf.timestamp_pb2 import Timestamp
from src.PostsServicer import PostsServicer


@fixture
def context() -> Mock:
    context = Mock()

    # Configure the mock context to raise an exception when abort is called
    def abort_side_effect(code, details):
        rpc_error = grpc.RpcError(code, details)
        raise rpc_error

    context.abort.side_effect = abort_side_effect
    return context


def create_post(date_string: str, title: str, content: str, post_id: str) -> Post:
    date = Timestamp()
    date.FromJsonString(date_string)
    post = Post(title=title, content=content, date=date, id=post_id)
    return post


def test_get_post(context: Mock):
    post = create_post("2025-01-05T22:30:00Z", "test", "test", "test")
    posts_servicer = PostsServicer({post.id: post})
    result = posts_servicer.GetPost(GetPostRequest(id=post.id), context)
    assert result.post == post


def test_get_post_not_found(context: Mock):
    posts_servicer = PostsServicer({})
    with raises(grpc.RpcError):
        posts_servicer.GetPost(GetPostRequest(id="TEST"), context)

    context.abort.assert_called_once_with(
        grpc.StatusCode.NOT_FOUND, "Post TEST not found"
    )


def test_get_post_previews(context: Mock):
    old_post = create_post("2025-01-05T22:30:00Z", "test1", "test1", "test1")
    new_post = create_post("2025-02-05T22:30:00Z", "test", "test", "test")
    posts_servicer = PostsServicer({"old": old_post, "new": new_post})
    result = posts_servicer.GetPostPreviews(GetPostPreviewsRequest(), context)
    assert len(result.previews) == 2
    assert result.previews[0].id == new_post.id
    assert result.previews[1].id == old_post.id


def test_get_no_post_previews(context: Mock):
    posts_servicer = PostsServicer({})
    result = posts_servicer.GetPostPreviews(GetPostPreviewsRequest(), context)
    assert len(result.previews) == 0
