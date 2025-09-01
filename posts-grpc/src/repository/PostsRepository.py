from typing import List, Optional
from src.database.model.post import Post
from src.util.exceptions import PostNotFoundError

from logging import getLogger

logger = getLogger(__name__)


class PostsRepository:
    def get_post(self, id: str) -> Post:
        post = Post.objects(id=id).first()
        if post is None:
            raise PostNotFoundError(id)
        return post

    def get_posts(self) -> List[Post]:
        return Post.objects().order_by("-created_at")

    def create_post(self) -> str:
        post = Post()
        post.save()
        return str(post.id)

    def update_post(
        self, id: str, title: Optional[str] = None, content: Optional[str] = None
    ) -> Post:
        post = Post.objects(id=id).first()
        if post is None:
            raise PostNotFoundError(id)
        if title is not None:
            post.title = title
        if content is not None:
            post.content = content
        post.save()
        return post

    def delete_post(self, id: str) -> None:
        post = Post.objects(id=id).first()
        if post is None:
            raise PostNotFoundError(id)
        post.delete()
