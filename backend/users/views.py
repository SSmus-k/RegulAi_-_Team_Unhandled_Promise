
from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import BasePermission, SAFE_METHODS

class AllowCreateUserOrAuthenticatedRead(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return request.user and request.user.is_authenticated

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowCreateUserOrAuthenticatedRead]
