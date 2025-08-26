from datetime import datetime, timezone
from mongoengine import Document, StringField, DateTimeField


class Post(Document):
    title = StringField(required=True, default="")
    content = StringField(required=True, default="")
    created_at = DateTimeField(required=True, default=datetime.now(timezone.utc))
    updated_at = DateTimeField(required=True, default=datetime.now(timezone.utc))
