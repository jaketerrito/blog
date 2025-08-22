from proto.posts_pb2 import Post
from typing import List

class PostsRepository:
    def __init__(self):
        pass

    def get_post(self, id: str) -> Post:
        return Post(id=id, title="Hello, World!")

    def get_posts(self) -> List[Post]:
        pass
    
    def create_post(self) -> Post:
        pass

    def update_post(self, post: Post) -> Post:
        pass

    def delete_post(self, id: str) -> None:
        pass