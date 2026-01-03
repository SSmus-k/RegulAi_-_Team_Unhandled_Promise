from rest_framework import generics, permissions
from .models import ComplianceChecklist
from .serializers import ComplianceChecklistSerializer

class ComplianceChecklistView(generics.ListCreateAPIView):
    queryset = ComplianceChecklist.objects.all()
    serializer_class = ComplianceChecklistSerializer
    permission_classes = [permissions.IsAuthenticated]
