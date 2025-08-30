from src.util.mapper import convert_model_to_proto
from src.database.model.post import Post
from bson import ObjectId


def test_convert_model_to_proto():
    post_model = Post(
        id=ObjectId(),
        title="Test Post",
        content="Test Content",
    )
    proto_post = convert_model_to_proto(post_model)
    assert proto_post.id == str(post_model.id)
    assert proto_post.title == post_model.title
    assert proto_post.content == post_model.content
    assert (
        proto_post.created_at.ToDatetime().timestamp()
        == post_model.created_at.timestamp()
    )
    assert (
        proto_post.updated_at.ToDatetime().timestamp()
        == post_model.updated_at.timestamp()
    )
