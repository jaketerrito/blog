from concurrent import futures
import grpc
from src.service.PostsServicer import PostsServicer
import src.proto.posts_pb2_grpc as posts_pb2_grpc

from src.repository.PostsRepository import PostsRepository
from src.database.connection import init_db_connection
from src.interceptor.ErrorLogger import ErrorLogger
from grpc_reflection.v1alpha import reflection
from src.proto.posts_pb2 import DESCRIPTOR


def serve():
    init_db_connection()
    print("In serve() function")
    try:
        server = grpc.server(
            futures.ThreadPoolExecutor(max_workers=10), interceptors=[ErrorLogger()]
        )
        posts_pb2_grpc.add_PostsServiceServicer_to_server(
            PostsServicer(PostsRepository()), server
        )

        # Reflection allows grpcui to discover methods, exposing this on internet not good idea
        SERVICE_NAMES = (
            DESCRIPTOR.services_by_name["PostsService"].full_name,
            reflection.SERVICE_NAME,
        )
        reflection.enable_server_reflection(SERVICE_NAMES, server)

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
