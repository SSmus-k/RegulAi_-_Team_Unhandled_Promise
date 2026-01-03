from rest_framework import generics, permissions
from .models import Regulation, Rule
from .serializers import RegulationSerializer, RuleSerializer

class RegulationListCreateView(generics.ListCreateAPIView):
    queryset = Regulation.objects.all()
    serializer_class = RegulationSerializer
    permission_classes = [permissions.IsAuthenticated]

class RuleListCreateView(generics.ListCreateAPIView):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer
    permission_classes = [permissions.IsAuthenticated]
