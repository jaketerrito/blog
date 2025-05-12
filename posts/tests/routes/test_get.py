from datetime import datetime, timedelta

import pytest
from beanie import PydanticObjectId
from fastapi import status
from pytest_asyncio import fixture

from src.models import BlogPost
from tests.conftest import AUTHOR_ID


@fixture()
async def blog_post():
    """Create a test blog post"""
    blog_post = BlogPost(
        author_id=AUTHOR_ID,
        public=True,
    )
    await blog_post.save()
    yield blog_post
    await blog_post.delete()


@pytest.mark.parametrize("user_id", [AUTHOR_ID, None, "other"])
def test_exists_public(client, blog_post, user_id):
    headers = {"user-id": user_id} if user_id is not None else {}
    response = client.get(
        f"/blog-post/{blog_post.id}",
        headers=headers,
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["_id"] == str(blog_post.id)


@fixture()
async def private_blog_post():
    blog_post = BlogPost(
        author_id=AUTHOR_ID,
        title="private",
        public=False,
        created_at=datetime.now() - timedelta(days=1),
    )
    await blog_post.save()
    yield blog_post
    await blog_post.delete()


def test_exists_not_public(client, private_blog_post):
    # Test author access to private post
    response = client.get(
        f"/blog-post/{private_blog_post.id}",
        headers={"user-id": AUTHOR_ID},
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["_id"] == str(private_blog_post.id)

    response = client.get(
        f"/blog-post/{private_blog_post.id}",
        headers={"user-id": "other"},
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN


def test_not_exist(client):
    non_existent_id = PydanticObjectId()

    response = client.get(
        f"/blog-post/{non_existent_id}",
        headers={"user-id": "other"},
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


@fixture()
async def public_blog_posts():
    blog_posts = []
    for i in range(10):
        blog_post = BlogPost(
            author_id=AUTHOR_ID,
            title=str(i),
            public=True,
            created_at=datetime.now() + timedelta(days=i),
        )
        blog_posts.append(blog_post)

    for blog_post in blog_posts:
        await blog_post.save()
    yield blog_posts

    for blog_post in blog_posts:
        await blog_post.delete()


@fixture
def test_get_blog_posts_by_author(client, public_blog_posts):
    response = client.get(
        "/blog-post",
        params={"author_id": AUTHOR_ID},
    )
    assert response.status_code == status.HTTP_200_OK
    response_json = response.json()
    assert len(response_json) == len(public_blog_posts)
    assert response_json[-1] == str(public_blog_posts[0].id)
    assert response_json[0] == str(
        public_blog_posts[-1].id
    )  # sorted so newest is first (ignore private)


def test_get_blog_posts_by_author_pagination(client, public_blog_posts):
    response = client.get(
        "/blog-post",
        params={"author_id": AUTHOR_ID, "skip": len(public_blog_posts) - 1, "limit": 2},
    )
    assert response.status_code == status.HTTP_200_OK
    response_json = response.json()
    assert len(response_json) == 1
    assert response_json[0] == str(public_blog_posts[0].id)


def test_get_blog_posts_by_author_private(client, public_blog_posts, private_blog_post):
    response = client.get(
        "/blog-post",
        params={"author_id": AUTHOR_ID},
        headers={"user-id": AUTHOR_ID},
    )
    assert response.status_code == status.HTTP_200_OK
    response_json = response.json()
    assert len(response_json) == len(public_blog_posts) + 1
    assert str(private_blog_post.id) in response_json


def test_get_blog_posts_by_nonexistent_author(client):
    response = client.get(
        "/blog-post",
        params={"author_id": "NOTREAL"},
    )
    assert response.status_code == status.HTTP_200_OK
    response_json = response.json()
    assert len(response_json) == 0
