from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from typing import cast

from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from rest_framework.response import Response

from .models import User
from core.ai_response_schema import AIResponseSerializer


# ─────────────────────────────────────────────
# User model tests
# ─────────────────────────────────────────────

class UserModelTest(TestCase):
    def test_create_user(self):
        UserModel = get_user_model()
        user = UserModel.objects.create_user(username='testuser', password='testpass')
        self.assertEqual(user.username, 'testuser')


# ─────────────────────────────────────────────
# Auth token tests
# ─────────────────────────────────────────────

class AuthTokenTests(APITestCase):
    client: APIClient

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass123')

    def test_token_obtain_and_refresh(self):
        url = reverse('token_obtain_pair')
        response = cast(Response, self.client.post(url, {'username': 'testuser', 'password': 'testpass123'}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsNotNone(response.data)
        if response.data is not None:
            self.assertIn('access', response.data)
            self.assertIn('refresh', response.data)

            refresh_url = reverse('token_refresh')
            refresh_token = response.data['refresh']
            refresh_response = cast(Response, self.client.post(refresh_url, {'refresh': refresh_token}))
            self.assertEqual(refresh_response.status_code, status.HTTP_200_OK)
            self.assertIsNotNone(refresh_response.data)
            if refresh_response.data is not None:
                self.assertIn('access', refresh_response.data)


# ─────────────────────────────────────────────
# API smoke tests
# ─────────────────────────────────────────────

class APISmokeTests(APITestCase):
    client: APIClient

    def test_ai_endpoint_requires_auth(self):
        url = '/api/v1/core/ai/answer/'
        response = cast(Response, self.client.post(url, {}))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_ai_endpoint_requires_prompt_when_authed(self):
        user = User.objects.create_user(username='smokeuser', password='smokepass123')
        self.client.force_authenticate(user=user)
        url = '/api/v1/core/ai/answer/'
        response = cast(Response, self.client.post(url, {}))
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIsNotNone(response.data)
        if response.data is not None:
            self.assertIn('error', response.data)


# ─────────────────────────────────────────────
# AI output schema validation tests
# ─────────────────────────────────────────────

class AIOutputSchemaValidationTests(APITestCase):
    def test_valid_ai_response(self):
        data = {
            "schema_version":   "1.0",
            "summary":          "Test summary",
            "key_points":       ["a", "b"],
            "step_by_step":     [],
            "legal_reference":  [],
            "action_items":     ["do this"],
            "confidence_score": 0.8,
            "risk_level":       "Low",
        }
        serializer = AIResponseSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)

    def test_invalid_ai_response_missing_summary(self):
        data = {"confidence_score": 0.5}
        serializer = AIResponseSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('summary', serializer.errors)

    def test_confidence_score_out_of_range(self):
        data = {
            "summary":          "Test",
            "confidence_score": 1.5,
        }
        serializer = AIResponseSerializer(data=data)
        self.assertFalse(serializer.is_valid())