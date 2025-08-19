from datetime import datetime

from beanie import PydanticObjectId
from fastapi import APIRouter, status
from pydantic import BaseModel

from src.exceptions import BlogPostNotFoundException
from src.deps import AdminRequired
from src.models import BlogPost

router = APIRouter(prefix="/blog-post")


class UpdateOptions(BaseModel):
    model_config = {"extra": "forbid"}  # This rejects extra fields
    title: str | None = None
    content: str | None = None
    public: bool | None = None


@router.patch(
    "/{blog_post_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[AdminRequired],
)
async def update_blog_post(blog_post_id: str, updates: UpdateOptions) -> None:
    # TODO: check that pydanticobjectid is valid
    # Find the blog post
    blog_post = await BlogPost.find_one(BlogPost.id == PydanticObjectId(blog_post_id))

    # Check if blog post exists
    if not blog_post:
        raise BlogPostNotFoundException(blog_post_id)

    updates_dict = updates.model_dump(exclude_none=True)
    for key, value in updates_dict.items():
        setattr(blog_post, key, value)

    blog_post.updated_at = datetime.now()
    await blog_post.save()
