import time
from pytest import fixture
from repository.PostsRepository import PostsRepository
from util.exceptions import PostNotFoundError
from pytest import raises
from bson import ObjectId
from database.model.post import Post

@fixture
def posts_repository() -> PostsRepository:
    return PostsRepository()

def test_get_post(posts_repository: PostsRepository):
    post = Post(title="TEST", content="TEST")
    post.save()
    post = posts_repository.get_post(post.id)
    assert post.title == "TEST"
    assert post.content == "TEST"

def test_get_post_not_found(posts_repository: PostsRepository):
    with raises(PostNotFoundError):
        posts_repository.get_post(ObjectId())

def test_get_posts(posts_repository: PostsRepository):
    post1 = Post(title="TEST1", content="TEST1")
    post1.save()
    post2 = Post(title="TEST2", content="TEST2")
    post2.save()
    posts = posts_repository.get_posts()
    assert len(posts) == 2
    # Newest posts first
    assert posts[0].title == "TEST2"
    assert posts[0].content == "TEST2"
    assert posts[1].title == "TEST1"
    assert posts[1].content == "TEST1"


def test_create_post(posts_repository: PostsRepository):
    post_id = posts_repository.create_post()
    post = Post.objects(id=post_id).first()
    assert post is not None

def test_update_post(posts_repository: PostsRepository):
    post = Post(title="TEST", content="TEST")
    post.save()
    posts_repository.update_post(post.id, title="TEST2", content="TEST2")
    post = Post.objects(id=post.id).first()
    assert post.title == "TEST2"
    assert post.content == "TEST2"

def test_update_post_no_changes(posts_repository: PostsRepository):
    original_post = Post(title="TEST", content="TEST")
    original_post.save()
    posts_repository.update_post(original_post.id, title="TEST", content="TEST")
    updated_post = Post.objects(id=original_post.id).first()
    assert updated_post.title == "TEST"
    assert updated_post.content == "TEST"
    print(updated_post.updated_at)
    print(original_post.updated_at)
    assert updated_post.updated_at.timestamp() > original_post.updated_at.timestamp()
    # Check that the created_at timestamp is the same with rounding errors
    assert updated_post.created_at.timestamp() - original_post.created_at.timestamp() < 0.001


def test_update_post_not_found(posts_repository: PostsRepository):
    with raises(PostNotFoundError):
        posts_repository.update_post(ObjectId())