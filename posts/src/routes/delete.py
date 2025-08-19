from beanie import PydanticObjectId
from fastapi import APIRouter, status
from src.exceptions import BlogPostNotFoundException
from src.deps import AdminRequired
from src.models import BlogPost

router = APIRouter(prefix="/blog-post")


@router.delete(
    "/{blog_post_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[AdminRequired],
)
async def delete_blog_post(blog_post_id: str) -> None:
    # TODO: check that pydanticobjectid is valid
    blog_post = await BlogPost.find_one(BlogPost.id == PydanticObjectId(blog_post_id))

    if not blog_post:
        raise BlogPostNotFoundException(blog_post_id)

    await blog_post.delete()
