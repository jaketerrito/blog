from datetime import datetime, timedelta, timezone
import time

from pytest import fixture
from sqlalchemy import select
from src.repository.PostsRepository import PostsRepository
from src.util.exceptions import PostNotFoundError
from pytest import raises
from src.database.model.post import Post
from sqlalchemy.orm import Session

@fixture
def posts_repository(session: Session) -> PostsRepository:
    return PostsRepository(session)

def create_test_post(session: Session, params: dict) -> Post:
    post = Post(**params)
    session.add(post)
    session.flush()  # Flush to get the ID without committing
    return post

def test_get_post(session: Session, posts_repository: PostsRepository):
    post = create_test_post(session, {
        "title": "TEST",
        "content": "TEST",
    })
    post = posts_repository.get_post(post.id)
    assert post.title == "TEST"
    assert post.content == "TEST"


def test_get_post_not_found(posts_repository: PostsRepository):
    with raises(PostNotFoundError):
        posts_repository.get_post(0)


def test_get_posts(session: Session, posts_repository: PostsRepository):
    create_test_post(session, {
        "title": "TEST1",
        "content": "TEST1",
        "created_at": datetime.now(timezone.utc) - timedelta(days=1),
    })
    create_test_post(session, {
        "title": "TEST2",
        "content": "TEST2",
    })
    posts = posts_repository.get_posts()
    assert len(posts) == 2
    # Newest posts first
    assert posts[0].title == "TEST2"
    assert posts[0].content == "TEST2"
    assert posts[1].title == "TEST1"
    assert posts[1].content == "TEST1"


def test_create_post(session: Session, posts_repository: PostsRepository):
    post_id = posts_repository.create_post()
    post = session.execute(select(Post).where(Post.id == post_id)).scalar_one_or_none()
    assert post is not None


def test_update_post(session: Session, posts_repository: PostsRepository):
    original_post = create_test_post(session, {
        "title": "TEST",
        "content": "TEST",
    })
    original_updated_at = original_post.updated_at
    time.sleep(1.0)  # Sleep for 1 second
    updated_post = posts_repository.update_post(original_post.id, title="TEST2", content="TEST2")
    session.flush()
    assert updated_post.title == "TEST2"
    assert updated_post.content == "TEST2"
    assert updated_post.created_at == original_post.created_at
    assert updated_post.updated_at > original_updated_at

def test_update_post_no_changes(session: Session, posts_repository: PostsRepository):
    original_post = create_test_post(session, {
        "title": "TEST",
        "content": "TEST",
    })
    updated_post = posts_repository.update_post(original_post.id)
    assert updated_post.title == "TEST"
    assert updated_post.content == "TEST"




def test_update_post_not_found(posts_repository: PostsRepository):
    with raises(PostNotFoundError):
        posts_repository.update_post(0)
