from datetime import datetime, timezone
from mongoengine import Document, StringField, DateTimeField


def get_current_time() -> datetime:
    return datetime.now(timezone.utc)


class Post(Document):
    title = StringField(required=True, default="")
    content = StringField(required=True, default="")
    created_at = DateTimeField(required=True, default=get_current_time)
    updated_at = DateTimeField(required=True, default=get_current_time)

    def save(self, *args, **kwargs):
        self.updated_at = get_current_time()
        return super().save(*args, **kwargs)
