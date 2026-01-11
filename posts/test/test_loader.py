from src.loader import load_post
from google.protobuf.timestamp_pb2 import Timestamp


def test_load_post():
    posttitle = "title"
    postid = "id"
    postdate = "2025-01-05T22:30:00Z"
    postcontent = "This is\nblog post"
    text = "\n".join([posttitle, postid, postdate, postcontent])

    post = load_post(text)

    assert post.title == "title"
    assert post.id == "id"
    assert post.content == "This is\nblog post"

    date = Timestamp()
    date.FromJsonString("2025-01-05T22:30:00Z")
    assert post.date == date
