from datetime import datetime, timedelta
from beanie import PydanticObjectId
from fastapi import status
from pytest_asyncio import fixture

from src.models import BlogPost
from src.routes.read import BlogPostPreview


@fixture()
async def blog_post():
    """Create a test blog post"""
    blog_post = BlogPost(
        public=True,
    )
    await blog_post.save()
    yield blog_post
    await blog_post.delete()


def test_get_public(client, blog_post):
    response = client.get(
        f"/blog-post/{blog_post.id}",
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["_id"] == str(blog_post.id)


@fixture()
async def private_blog_post():
    blog_post = BlogPost(
        title="private",
        public=False,
        created_at=datetime.now() - timedelta(days=99),
    )
    await blog_post.save()
    yield blog_post
    await blog_post.delete()


def test_admin_get_not_public(client, private_blog_post):
    response = client.get(
        f"/blog-post/{private_blog_post.id}",
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["_id"] == str(private_blog_post.id)


def test_not_admin_get_not_public(client, private_blog_post, admin_status):
    admin_status.return_value = False

    response = client.get(
        f"/blog-post/{private_blog_post.id}",
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_not_exist(client):
    non_existent_id = PydanticObjectId()

    response = client.get(
        f"/blog-post/{non_existent_id}",
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


@fixture()
async def public_blog_posts():
    blog_posts = []
    for i in range(10):
        blog_post = BlogPost(
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
def test_get_blog_posts(client, public_blog_posts):
    response = client.get(
        "/blog-post",
    )
    assert response.status_code == status.HTTP_200_OK
    response_json = response.json()
    assert len(response_json) == len(public_blog_posts)
    assert response_json[-1] == str(public_blog_posts[0].id)
    assert response_json[0] == str(
        public_blog_posts[-1].id
    )  # sorted so newest is first (ignore private)


def test_get_blog_posts_pagination(client, public_blog_posts):
    response = client.get(
        "/blog-post",
        params={"skip": len(public_blog_posts) - 1, "limit": 2},
    )
    assert response.status_code == status.HTTP_200_OK
    response_json = response.json()
    assert len(response_json) == 1
    assert BlogPostPreview(**response_json[0]) == BlogPostPreview(
        id=str(public_blog_posts[0].id), title=public_blog_posts[0].title
    )


def test_admin_get_blog_posts_private(client, public_blog_posts, private_blog_post):
    response = client.get(
        "/blog-post",
    )
    assert response.status_code == status.HTTP_200_OK
    response_json = response.json()
    assert len(response_json) == len(public_blog_posts) + 1
    assert BlogPostPreview(**response_json[-1]) == BlogPostPreview(
        id=str(private_blog_post.id), title=private_blog_post.title
    )
