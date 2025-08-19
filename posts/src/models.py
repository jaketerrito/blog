from datetime import UTC, datetime
from typing import Optional

import pymongo
from beanie import Document
from pydantic import Field
from pymongo import IndexModel


class BlogPost(Document):
    public: bool = False
    created_at: datetime = datetime.now(UTC)
    updated_at: datetime = datetime.now(UTC)
    title: Optional[str] = Field(default=None, max_length=100)
    content: Optional[str] = Field(default=None, max_length=100000)

    class Settings:
        indexes = [
            IndexModel(
                [
                    ("public"),
                    ("created_at", pymongo.DESCENDING),
                ],
                name="public_created_at_index",
            ),
            IndexModel(
                [
                    ("created_at", pymongo.DESCENDING),
                ],
                name="created_at_index",
            ),
        ]
