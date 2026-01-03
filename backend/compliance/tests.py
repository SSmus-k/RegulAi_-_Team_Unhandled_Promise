from django.test import TestCase
from users.models import User
from .models import ComplianceChecklist

class ComplianceChecklistTest(TestCase):
    def test_create_checklist(self):
        user = User.objects.create_user(username='testuser', password='testpass')
        checklist = ComplianceChecklist.objects.create(user=user, business_action='registration')
        self.assertEqual(checklist.business_action, 'registration')
