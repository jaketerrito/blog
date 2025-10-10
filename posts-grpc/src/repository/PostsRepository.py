from typing import List, Optional

from sqlalchemy import select
from sqlalchemy.orm import Session
from src.database.model.post import Post
from src.util.exceptions import PostNotFoundError

from logging import getLogger

logger = getLogger(__name__)


class PostsRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_post(self, id: str) -> Post:
        post = self.session.execute(select(Post).where(Post.id == id)).scalar_one_or_none()
        if post is None:
            raise PostNotFoundError(id)
        return post

    def get_posts(self) -> List[Post]:
        return self.session.execute(select(Post).order_by(Post.created_at.desc())).scalars().all()

    def create_post(self) -> str:
        post = Post()
        self.session.add(post)
        self.session.flush()
        return post.id

    def update_post(
        self, id: str, title: Optional[str] = None, content: Optional[str] = None
    ) -> Post:
        post = self.session.execute(select(Post).where(Post.id == id)).scalar_one_or_none()
        if post is None:
            raise PostNotFoundError(id)
        if title is not None:
            post.title = title
        if content is not None:
            post.content = content
        self.session.add(post)
        return post

    def delete_post(self, id: str) -> None:
        post = self.session.execute(select(Post).where(Post.id == id)).scalar_one_or_none()
        if post is None:
            raise PostNotFoundError(id)
        self.session.delete(post)
