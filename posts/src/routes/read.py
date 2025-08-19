from typing import List, Optional

import pymongo
from beanie import PydanticObjectId
from fastapi import APIRouter, status
from pydantic import BaseModel

from src.exceptions import BlogPostNotFoundException
from src.deps import AdminStatus
from src.models import BlogPost

router = APIRouter(prefix="/blog-post")

@router.get("/{blog_post_id}", status_code=status.HTTP_200_OK)
async def get_blog_post(blog_post_id: str, is_admin: AdminStatus) -> BlogPost:
    try:
        blog_post_id_obj = PydanticObjectId(blog_post_id)
    except Exception:
        raise BlogPostNotFoundException(blog_post_id)

    blog_post = await BlogPost.find_one(BlogPost.id == blog_post_id_obj)

    # Check if blog post exists
    # Check if blog post is private and not an admin
    if not blog_post or (not blog_post.public and not is_admin):
        raise BlogPostNotFoundException(blog_post_id)

    return blog_post


class BlogPostPreview(BaseModel):
    id: str
    title: Optional[str]


@router.get("", status_code=status.HTTP_200_OK)
async def get_blog_posts(
    is_admin: AdminStatus,
    skip: int = 0,
    limit: int = 20,
) -> List[BlogPostPreview]:
    query = {}
    if not is_admin:
        query["public"] = True

    posts = (
        await BlogPost.find(query)
        .sort([("created_at", pymongo.DESCENDING)])
        .skip(skip)
        .limit(limit)
        .to_list()
    )

    return [BlogPostPreview(id=str(post.id), title=post.title) for post in posts]
