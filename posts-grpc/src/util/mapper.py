from datetime import datetime
from src.database.model.post import Post as PostModel
from src.proto.posts_pb2 import Post as PostProto, PostPreview
from google.protobuf.timestamp_pb2 import Timestamp


def convert_datetime_to_timestamp(date: datetime) -> Timestamp:
    timestamp = Timestamp()
    timestamp.FromDatetime(date)
    return timestamp


def post_model_to_post_proto(post_model: PostModel) -> PostProto:
    return PostProto(
        id=str(post_model.id),
        title=post_model.title,
        content=post_model.content,
        created_at=convert_datetime_to_timestamp(post_model.created_at),
        updated_at=convert_datetime_to_timestamp(post_model.updated_at),
    )


def post_model_to_post_preview_proto(post_model: PostModel) -> PostPreview:
    return PostPreview(
        id=str(post_model.id),
        title=post_model.title,
    )
