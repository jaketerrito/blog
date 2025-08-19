from beanie import PydanticObjectId
from fastapi import status
from pytest_asyncio import fixture

from src.models import BlogPost


@fixture()
async def blog_post():
    blog_post = BlogPost(
        public=True,
    )
    await blog_post.save()
    yield blog_post
    await blog_post.delete()


def test_delete_blog_post(client, blog_post):
    response = client.delete(
        f"/blog-post/{blog_post.id}",
    )
    assert response.status_code == status.HTTP_204_NO_CONTENT

    response = client.get(
        f"/blog-post/{blog_post.id}",
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_delete_nonexistent_blog_post(client):
    response = client.delete(
        f"/blog-post/{PydanticObjectId()}",
    )
    assert response.status_code == status.HTTP_404_NOT_FOUND


def test_delete_not_admin(client, blog_post, admin_status):
    admin_status.return_value = False

    response = client.delete(
        f"/blog-post/{blog_post.id}",
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN
