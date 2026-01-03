from django.urls import path

from .views import UserListCreateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer

class MeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(UserSerializer(request.user).data)

urlpatterns = [
    path('', UserListCreateView.as_view(), name='user-list-create'),
    path('me/', MeView.as_view(), name='user-me'),
]
