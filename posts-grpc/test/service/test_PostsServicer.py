from datetime import datetime
from unittest.mock import Mock
from pytest import fixture, raises
from service.PostsServicer import PostsServicer
from repository.PostsRepository import PostsRepository
from proto.posts_pb2 import GetPostRequest, GetPostsRequest, CreatePostRequest, UpdatePostRequest, DeletePostRequest, DeletePostResponse
from database.model.post import Post as PostModel
import grpc
from util.mapper import convert_model_to_proto
from util.exceptions import PostNotFoundError

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
        id="1",
        title="Test Post",
        content="Test Content",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )

def test_get_post(posts_servicer: PostsServicer, context: Mock, post_model: PostModel):
    posts_servicer.posts_repository.get_post.return_value = post_model
    result = posts_servicer.GetPost(GetPostRequest(id=post_model.id), context)
    assert result.post == convert_model_to_proto(post_model)

def test_get_post_not_found(posts_servicer: PostsServicer, context: Mock):
    post_id = "test_post_id"
    posts_servicer.posts_repository.get_post.side_effect = PostNotFoundError(post_id)
    
    with raises(grpc.RpcError):
        posts_servicer.GetPost(GetPostRequest(id=post_id), context)
    
    context.abort.assert_called_once_with(grpc.StatusCode.NOT_FOUND, PostNotFoundError.get_message(post_id))

def test_get_posts(posts_servicer: PostsServicer, context: Mock, post_model: PostModel):
    posts_servicer.posts_repository.get_posts.return_value = [
        post_model
    ]
    result = posts_servicer.GetPosts(GetPostsRequest(), context)
    assert len(result.posts) == 1
    assert result.posts[0] == convert_model_to_proto(post_model)

def test_get_no_posts(posts_servicer: PostsServicer, context: Mock, post_model: PostModel):
    posts_servicer.posts_repository.get_posts.return_value = []
    result = posts_servicer.GetPosts(GetPostsRequest(), context)
    assert len(result.posts) == 0

def test_create_post(posts_servicer: PostsServicer, context: Mock, post_model: PostModel):
    id = "test_post_id"
    posts_servicer.posts_repository.create_post.return_value = id
    result = posts_servicer.CreatePost(CreatePostRequest(), context)
    assert result.id == id

def test_update_post(posts_servicer: PostsServicer, context: Mock, post_model: PostModel):
    posts_servicer.posts_repository.update_post.return_value = post_model
    result = posts_servicer.UpdatePost(UpdatePostRequest(id=post_model.id, title=post_model.title, content=post_model.content), context)
    assert result.post == convert_model_to_proto(post_model)

def test_update_post_not_found(posts_servicer: PostsServicer, context: Mock):
    post_id = "test_post_id"
    posts_servicer.posts_repository.update_post.side_effect = PostNotFoundError(post_id)
    with raises(grpc.RpcError):
        posts_servicer.UpdatePost(UpdatePostRequest(id=post_id), context)
    context.abort.assert_called_once_with(grpc.StatusCode.NOT_FOUND, PostNotFoundError.get_message(post_id))

def test_delete_post(posts_servicer: PostsServicer, context: Mock, post_model: PostModel):
    result = posts_servicer.DeletePost(DeletePostRequest(id=post_model.id), context)
    assert result == DeletePostResponse()

def test_delete_post_not_found(posts_servicer: PostsServicer, context: Mock):
    post_id = "test_post_id"
    posts_servicer.posts_repository.delete_post.side_effect = PostNotFoundError(post_id)
    with raises(grpc.RpcError):
        posts_servicer.DeletePost(DeletePostRequest(id=post_id), context)
    context.abort.assert_called_once_with(grpc.StatusCode.NOT_FOUND, PostNotFoundError.get_message(post_id))