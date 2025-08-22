from concurrent import futures
from proto.posts_pb2 import GetPostResponse, Post
import proto.posts_pb2_grpc as posts_pb2_grpc
import grpc

print("ASDFDSF")
print("Starting server.py")

class PostsSevicer(posts_pb2_grpc.PostsServicer):
    def GetPost(self, request, context):
        print("Getting Post WOWOWOWOW")
        return GetPostResponse(post=Post(id="1", title="Hello, World!"))

def serve():
    print("In serve() function")
    try:
        server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
        posts_pb2_grpc.add_PostsServicer_to_server(PostsSevicer(), server)
        server.add_insecure_port("[::]:50051")
        print("Server started")

        server.start()
        print("Server is running and waiting for connections")
        server.wait_for_termination()
    except Exception as e:
        print(f"Error in serve(): {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    print("Main block executed")
    serve()
