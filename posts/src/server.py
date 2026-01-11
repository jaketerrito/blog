from concurrent import futures
import grpc
from src.PostsServicer import PostsServicer
import src.proto.posts_pb2_grpc as posts_pb2_grpc

from src.interceptor.ErrorLogger import ErrorLogger
from grpc_reflection.v1alpha import reflection
from src.proto.posts_pb2 import DESCRIPTOR
from src import config
from src.loader import load_posts
import logging

logger = logging.getLogger(__name__)


def serve():
    posts = load_posts(config.CONTENT_DIR)

    try:
        server = grpc.server(
            futures.ThreadPoolExecutor(max_workers=10), interceptors=[ErrorLogger()]
        )

        posts_pb2_grpc.add_PostsServiceServicer_to_server(PostsServicer(posts), server)

        SERVICE_NAMES = (
            DESCRIPTOR.services_by_name["PostsService"].full_name,
            reflection.SERVICE_NAME,
        )
        reflection.enable_server_reflection(SERVICE_NAMES, server)

        server.add_insecure_port(f"[::]:{config.PORT}")
        server.start()
        logger.info("Server is running and waiting for connections")
        server.wait_for_termination()
    except Exception as e:
        logger.error(f"Error in serve(): {e}")
        import traceback

        traceback.print_exc()


if __name__ == "__main__":
    serve()
