from proto.posts_pb2 import CreatePostRequest, CreatePostResponse, DeletePostRequest, DeletePostResponse, GetPostRequest, GetPostResponse, GetPostsRequest, GetPostsResponse, Post, UpdatePostRequest, UpdatePostResponse
import grpc
import proto.posts_pb2_grpc as posts_pb2_grpc
from repository.PostsRepository import PostsRepository

# TODO: authorization should have seperate class and not be in the servicer
# Methods like can_read_post, can_edit_post, can see private posts
class PostsServicer(posts_pb2_grpc.PostsServicer):
    def __init__(self, posts_repository: PostsRepository):
        self.posts_repository = posts_repository

    def GetPost(self, request: GetPostRequest, context: grpc.ServicerContext) -> GetPostResponse:
        post = self.posts_repository.get_post(request.id)
        # TODO: does user have access to this post?
        return GetPostResponse(post=post)

    def GetPosts(self, request: GetPostsRequest, context: grpc.ServicerContext) -> GetPostsResponse:
        # TODO: Filter posts that user has access to
        posts = self.posts_repository.get_posts()
        return GetPostsResponse(posts=posts)
    
    def CreatePost(self, request: CreatePostRequest, context: grpc.ServicerContext) -> CreatePostResponse:
        # TODO: does user have access to create a post?
        post = self.posts_repository.create_post()
        return CreatePostResponse(id=post.id)
        
    def UpdatePost(self, request: UpdatePostRequest, context: grpc.ServicerContext) -> UpdatePostResponse:
        # TODO: does user have access to update this post?
        # TODO: how do we handle partial updates?
        post = self.posts_repository.update_post(request.post)
        return UpdatePostResponse(post=post)
    
    def DeletePost(self, request: DeletePostRequest, context: grpc.ServicerContext) -> DeletePostResponse:
        # TODO: does user have access to delete this post?
        self.posts_repository.delete_post(request.id)
        return DeletePostResponse()