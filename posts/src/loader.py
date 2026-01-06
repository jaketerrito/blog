from src.proto.posts_pb2 import Post
from pathlib import Path
from google.protobuf.timestamp_pb2 import Timestamp


def load_post(path: Path) -> Post:
    text = path.read_text(encoding="utf-8")
    lines = text.splitlines()

    title = lines[0].strip()
    post_id = lines[1].strip()
    post_date = Timestamp()
    post_date.FromJsonString(lines[2])
    if lines[3].strip() != "":
        raise ValueError(f"{path} missing blank line after header")

    content = "\n".join(lines[4:]).lstrip()

    return Post(
        id=post_id,
        title=title,
        date=post_date,
        content=content,
    )


def load_posts(directory: str) -> dict[str, Post]:
    base = Path(directory)
    posts: dict[str, Post] = {}

    for path in base.iterdir():
        if not path.is_file():
            continue

        post = load_post(path)
        if post.id in posts:
            raise ValueError(f"Duplicate post id: {post.id}")
        posts[post.id] = post

    return posts
