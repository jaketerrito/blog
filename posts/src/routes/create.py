from fastapi import APIRouter, status
from pydantic import BaseModel
from src.deps import AdminRequired

from src.models import BlogPost

router = APIRouter(prefix="/blog-post")


class CreateBlogResponse(BaseModel):
    blog_post_id: str


@router.put("", status_code=status.HTTP_201_CREATED, dependencies=[AdminRequired])
async def create_blog_post() -> CreateBlogResponse:
    blog_post = BlogPost(
        public=False,
    )
    await blog_post.save()
    return CreateBlogResponse(blog_post_id=str(blog_post.id))
