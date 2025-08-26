from datetime import datetime, timezone
from typing import List, Optional
from database.model.post import Post
from database.connection import init_db
from util.exceptions import PostNotFoundError

class PostsRepository:
    def __init__(self):
        init_db()

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
        return post.id

    def update_post(
        self, id: str, title: Optional[str], content: Optional[str]
    ) -> Post:
        post = Post.objects(id=id).first()
        if post is None:
            raise PostNotFoundError(id)

        if title is not None:
            post.title = title
        if content is not None:
            post.content = content
        post.updated_at = datetime.now(timezone.utc)
        post.save()
        return post

    def delete_post(self, id: str) -> None:
        post = Post.objects(id=id).first()
        if post is None:
            raise PostNotFoundError(id)
        post.delete()
