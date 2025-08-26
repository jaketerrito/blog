from datetime import datetime
from unittest.mock import Mock
from pytest import fixture
from service.PostsServicer import PostsServicer
from repository.PostsRepository import PostsRepository
from proto.posts_pb2 import GetPostRequest
from database.model.post import Post as PostModel


@fixture
def posts_servicer() -> PostsServicer:
    posts_repository = Mock(spec=PostsRepository)
    return PostsServicer(posts_repository)


def test_get_post(posts_servicer: PostsServicer):
    posts_servicer.posts_repository.get_post.return_value = PostModel(
        id="1",
        title="Test Post",
        content="Test Content",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    result = posts_servicer.GetPost(GetPostRequest(id="1"), Mock())
    assert result.post.id == "1"
