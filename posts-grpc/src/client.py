import grpc
from src.proto.posts_pb2 import GetPostRequest
import src.proto.posts_pb2_grpc as posts_pb2_grpc

if __name__ == "__main__":
    channel = grpc.insecure_channel("localhost:50051")
    stub = posts_pb2_grpc.PostsStub(channel)
    response = stub.GetPost(GetPostRequest(id="1"))
    print(response)
