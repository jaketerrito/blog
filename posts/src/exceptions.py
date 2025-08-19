from fastapi import HTTPException, status


class BlogPostNotFoundException(HTTPException):
    def __init__(self, blog_post_id: str):
        self.status_code = status.HTTP_404_NOT_FOUND
        self.detail = f"Blog post {blog_post_id} not found"


class AdminRequiredException(HTTPException):
    def __init__(self):
        self.status_code = status.HTTP_403_FORBIDDEN
        self.detail = "Admin access required"
