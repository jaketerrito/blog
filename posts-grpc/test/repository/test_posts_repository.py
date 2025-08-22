from repository.PostsRepository import PostsRepository

def test_get_post():
    posts_repository = PostsRepository()
    post = posts_repository.get_post("1")
    assert post.id == "1"
    assert post.title == "Hello, World!"