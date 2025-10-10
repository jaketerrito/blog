from datetime import datetime, timedelta, timezone
from unittest.mock import Mock
from pytest import fixture, raises
from src.proto.posts_pb2 import (
    GetPostRequest,
    GetPostPreviewsRequest,
    CreatePostRequest,
    UpdatePostRequest,
)
from src.database.model.post import Post as PostModel
import grpc
from src.mapper import post_model_to_post_preview_proto, post_model_to_post_proto
from sqlalchemy import select

import uuid

from sqlalchemy.orm import Session
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


@fixture(scope="function")
def posts_servicer(session_factory) -> PostsServicer:
    return PostsServicer(session_factory)


def create_test_post(session: Session, params: dict) -> PostModel:
    post = PostModel(**params)
    session.add(post)
    session.flush()
    return post


def test_get_post(session: Session, posts_servicer: PostsServicer, context: Mock):
    post = create_test_post(
        session,
        {
            "title": "TEST",
            "content": "TEST",
        },
    )
    post = post_model_to_post_proto(post)
    result = posts_servicer.GetPost(GetPostRequest(id=post.id), context)
    assert result.post == post


def test_get_post_not_found(
    session: Session, posts_servicer: PostsServicer, context: Mock
):
    id = str(uuid.uuid4())
    with raises(grpc.RpcError):
        posts_servicer.GetPost(GetPostRequest(id=id), context)

    context.abort.assert_called_once_with(
        grpc.StatusCode.NOT_FOUND, f"Post {id} not found"
    )


def test_get_post_previews(
    session: Session, posts_servicer: PostsServicer, context: Mock
):
    first_post = create_test_post(
        session,
        {
            "title": "TEST1",
            "content": "TEST1",
            "created_at": datetime.now(timezone.utc) - timedelta(days=1),
        },
    )
    first_preview = post_model_to_post_preview_proto(first_post)
    second_post = create_test_post(
        session,
        {
            "title": "TEST2",
            "content": "TEST2",
        },
    )
    second_preview = post_model_to_post_preview_proto(second_post)
    result = posts_servicer.GetPostPreviews(GetPostPreviewsRequest(), context)
    assert len(result.previews) == 2
    assert result.previews[0] == second_preview
    assert result.previews[1] == first_preview


def test_get_no_post_previews(
    session: Session, posts_servicer: PostsServicer, context: Mock
):
    result = posts_servicer.GetPostPreviews(GetPostPreviewsRequest(), context)
    assert len(result.previews) == 0


def test_create_post(session: Session, posts_servicer: PostsServicer, context: Mock):
    response = posts_servicer.CreatePost(CreatePostRequest(), context)
    post = session.execute(
        select(PostModel).where(PostModel.id == uuid.UUID(response.id))
    ).scalar_one_or_none()
    assert post is not None


def test_update_post(session: Session, posts_servicer: PostsServicer, context: Mock):
    original_post = create_test_post(
        session,
        {
            "title": "TEST",
            "content": "TEST",
            "created_at": datetime.now(timezone.utc) - timedelta(seconds=100),
            "updated_at": datetime.now(timezone.utc) - timedelta(seconds=100),
        },
    )
    original_post = post_model_to_post_proto(original_post)
    response = posts_servicer.UpdatePost(
        UpdatePostRequest(id=original_post.id, title="TEST2", content="TEST2"),
        context,
    )

    updated_post = response.post
    assert updated_post.title == "TEST2"
    assert updated_post.content == "TEST2"
    assert updated_post.created_at == original_post.created_at
    assert (
        updated_post.updated_at.ToMilliseconds()
        > original_post.updated_at.ToMilliseconds()
    )


def test_update_post_not_found(
    session: Session, posts_servicer: PostsServicer, context: Mock
):
    id = str(uuid.uuid4())
    with raises(grpc.RpcError):
        posts_servicer.UpdatePost(UpdatePostRequest(id=id), context)
    context.abort.assert_called_once_with(
        grpc.StatusCode.NOT_FOUND, f"Post {id} not found"
    )


def test_update_post_no_changes(
    session: Session, posts_servicer: PostsServicer, context: Mock
):
    original_post = create_test_post(
        session,
        {
            "title": "TEST",
            "content": "TEST",
        },
    )
    original_post = post_model_to_post_proto(original_post)

    response = posts_servicer.UpdatePost(
        UpdatePostRequest(id=original_post.id),
        context,
    )
    updated_post = response.post
    assert updated_post.title == "TEST"
    assert updated_post.content == "TEST"
    assert updated_post.created_at == original_post.created_at
    assert updated_post.updated_at == original_post.updated_at
