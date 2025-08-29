from pytest import fixture
from repository.PostsRepository import PostsRepository
from util.exceptions import PostNotFoundError
from pytest import raises


@fixture
def posts_repository() -> PostsRepository:
    return PostsRepository()


def test_create_post(posts_repository: PostsRepository):
    post_id = "123"
    post = posts_repository.get_post(post_id)
    with raises(PostNotFoundError):
        posts_repository.get_post(post_id)


def test_get_post_not_found(posts_repository: PostsRepository):
    with raises(PostNotFoundError):
        posts_repository.get_post("123")