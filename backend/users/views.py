
from rest_framework import generics, permissions
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.models import Business
from apps.serializers import BusinessSerializer

class AllowCreateUserOrAuthenticatedRead(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return request.user and request.user.is_authenticated

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowCreateUserOrAuthenticatedRead]


# GET /api/v1/users/businesses
class MyBusinessesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            businesses = Business.objects.filter(user=user)
            serializer = BusinessSerializer(businesses, many=True)
            return Response({
                "status": "success",
                "data": serializer.data,
                "message": "Fetched businesses successfully."
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "status": "error",
                "data": [],
                "message": f"Error fetching businesses: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
