from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        # Hide sensitive info
        if response.status_code == 401:
            response.data = {'detail': 'Authentication credentials were not provided or are invalid.'}
        elif response.status_code == 403:
            response.data = {'detail': 'You do not have permission to perform this action.'}
        # Log server-side errors
        if response.status_code >= 500:
            logger.error(f"Server error: {exc}")
    else:
        # Fallback for unhandled errors
        logger.error(f"Unhandled exception: {exc}")
        return Response({'detail': 'Internal server error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return response
