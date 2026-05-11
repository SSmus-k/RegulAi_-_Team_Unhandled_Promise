from rest_framework import generics, permissions, status
from rest_framework.permissions import BasePermission
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.conf import settings
from users.models import User

from .models import User
from .serializers import UserSerializer
from apps.models import Business
from apps.serializers import BusinessSerializer


class AllowCreateUserOrAuthenticatedRead(BasePermission):
    """Allow anyone to POST (signup). GET requires authentication."""
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return request.user and request.user.is_authenticated


class UserListCreateView(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowCreateUserOrAuthenticatedRead]

    def get_queryset(self):
        # Authenticated users can only see themselves, not every user
        user = self.request.user
        user_id = getattr(user, 'id', None)
        if user and user_id and user.is_authenticated:
            return User.objects.filter(id=user_id)
        return User.objects.none()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            # Return the actual validation errors so the frontend can show them
            return Response(
                {"error": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user = serializer.save()
        return Response(
            {
                "status": "success",
                "message": "Account created successfully.",
                "data": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
            },
            status=status.HTTP_201_CREATED,
        )


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)


class MyBusinessesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            businesses = Business.objects.filter(user=request.user)
            serializer = BusinessSerializer(businesses, many=True)
            return Response(
                {
                    "status": "success",
                    "data": serializer.data,
                    "message": "Fetched businesses successfully.",
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {
                    "status": "error",
                    "data": [],
                    "message": f"Error fetching businesses: {str(e)}",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )