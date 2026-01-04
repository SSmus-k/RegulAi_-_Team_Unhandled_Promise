from rest_framework import serializers
from .models import Business

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = [
            'id', 'user', 'name', 'type', 'industry', 'registration_number',
            'location', 'phone', 'website', 'status', 'employees', 'revenue', 'registration_date'
        ]
        read_only_fields = ['id', 'registration_date', 'status', 'user']
