from concurrent import futures
import grpc
from service.PostsServicer import PostsServicer
import proto.posts_pb2_grpc as posts_pb2_grpc
from repository.PostsRepository import PostsRepository

def wow():
    return 1

def serve():
    print("In serve() function")
    try:
        server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
        posts_pb2_grpc.add_PostsServicer_to_server(PostsServicer(PostsRepository()), server)
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
