from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from .models import Business
from .serializers import BusinessSerializer


class UserBusinessesListView(generics.ListCreateAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Business.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {
                "status": "success",
                "data": serializer.data,
                "message": "Business created successfully.",
            },
            status=status.HTTP_201_CREATED,
        )

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(
            {
                "status": "success",
                "data": serializer.data,
                "message": "Businesses fetched successfully.",
            }
        )
    
class BusinessDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BusinessSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Business.objects.filter(user=self.request.user)
    

class DashboardView(views.APIView):
    serializer_class = BusinessSerializer

    def get(self, request):
        total_business = Business.objects.filter(
            user=request.user,   
        ).count()

        return Response({
            "success": True,
            "message": "Fetched successfully.",
            "data": {
                "total_business": total_business
            }
        })