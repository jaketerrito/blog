from datetime import UTC, datetime
from typing import Optional

import pymongo
from beanie import Document
from pydantic import Field
from pymongo import IndexModel


class BlogPost(Document):
    author_id: str
    public: bool = False
    created_at: datetime = datetime.now(UTC)
    updated_at: datetime = datetime.now(UTC)
    title: Optional[str] = Field(default=None, max_length=100)
    content: Optional[str] = Field(default=None, max_length=100000)

    class Settings:
        indexes = [
            IndexModel(
                [
                    ("author_id"),
                    ("public"),
                    ("created_at", pymongo.DESCENDING),
                ],
                name="author_public_created_at_index",
            ),
            IndexModel(
                [
                    ("author_id"),
                    ("created_at", pymongo.DESCENDING),
                ],
                name="author_created_at_index",
            ),
        ]
