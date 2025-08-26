from datetime import datetime
from util.mapper import convert_model_to_proto
from database.model.post import Post


def test_convert_model_to_proto():
    post_model = Post(
        id="1",
        title="Test Post",
        content="Test Content",
        created_at=datetime.now(),
        updated_at=datetime.now(),
    )
    proto_post = convert_model_to_proto(post_model)
    assert proto_post.id == post_model.id
    assert proto_post.title == post_model.title
    assert proto_post.content == post_model.content
    assert proto_post.created_at.ToDatetime() == post_model.created_at
    assert proto_post.updated_at.ToDatetime() == post_model.updated_at