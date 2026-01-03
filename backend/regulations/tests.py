from django.test import TestCase
from .models import Regulation

class RegulationModelTest(TestCase):
    def test_create_regulation(self):
        reg = Regulation.objects.create(title='Test Law', description='Desc', source='Gov', effective_date='2025-01-01')
        self.assertEqual(reg.title, 'Test Law')
