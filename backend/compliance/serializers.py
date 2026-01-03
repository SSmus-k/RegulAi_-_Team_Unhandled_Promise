from rest_framework import serializers
from .models import ComplianceChecklist, ComplianceStep

class ComplianceStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplianceStep
        fields = '__all__'

class ComplianceChecklistSerializer(serializers.ModelSerializer):
    steps = ComplianceStepSerializer(many=True, read_only=True)
    class Meta:
        model = ComplianceChecklist
        fields = ['id', 'user', 'business_action', 'created_at', 'updated_at', 'steps']
