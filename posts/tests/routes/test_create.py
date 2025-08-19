from beanie import PydanticObjectId
from fastapi import status


def test_create_blog_post(client):
    response = client.put(
        "/blog-post",
    )
    assert response.status_code == status.HTTP_201_CREATED
    assert PydanticObjectId.is_valid(response.json()["blog_post_id"])


def test_create_blog_post_not_admin(client, admin_status):
    admin_status.return_value = False

    response = client.put(
        "/blog-post",
    )
    assert response.status_code == status.HTTP_403_FORBIDDEN
