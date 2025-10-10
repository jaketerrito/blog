from grpc_interceptor import ServerInterceptor

from logging import getLogger

logger = getLogger(__name__)


class ErrorLogger(ServerInterceptor):
    def intercept(self, method, request, context, method_name):
        try:
            return method(request, context)
        except Exception as e:
            logger.error(f"Error in {method_name}: {e}", exc_info=True)
            raise
