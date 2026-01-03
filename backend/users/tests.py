class APISmokeTests(APITestCase):
    def test_ai_endpoint_requires_prompt(self):
        url = reverse('core:ai-answer') if 'core:ai-answer' in self.client.reverse_lookup else '/api/v1/core/ai/'
        response = self.client.post(url, {})
        self.assertIn(response.status_code, [400, 401])
        self.assertIn('error', response.data)
from core.ai_response_schema import AIResponseSerializer

class AIOutputSchemaValidationTests(APITestCase):
    def test_valid_ai_response(self):
        data = {
            "schema_version": "1.0",
            "summary": "Test summary",
            "key_points": ["a", "b"],
            "step_by_step": [],
            "legal_reference": [],
            "action_items": ["do this"],
            "confidence_score": 0.8,
            "risk_level": "low"
        }
        serializer = AIResponseSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_invalid_ai_response_missing_fields(self):
        data = {
            "summary": "Test summary",
            "confidence_score": 0.5
        }
        serializer = AIResponseSerializer(data=data)
        self.assertFalse(serializer.is_valid())
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User

class AuthTokenTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')

    def test_token_obtain_and_refresh(self):
        url = reverse('token_obtain_pair')
        response = self.client.post(url, {'username': 'testuser', 'password': 'testpass123'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

        refresh_url = reverse('token_refresh')
        refresh_token = response.data['refresh']
        refresh_response = self.client.post(refresh_url, {'refresh': refresh_token})
        self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)
        self.assertIn('access', refresh_response.data)
from django.test import TestCase
from django.contrib.auth import get_user_model

class UserModelTest(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(username='testuser', password='testpass')
        self.assertEqual(user.username, 'testuser')
