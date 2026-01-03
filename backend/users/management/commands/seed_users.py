from django.core.management.base import BaseCommand
from users.models import User

class Command(BaseCommand):
    help = 'Seed initial users'

    def handle(self, *args, **kwargs):
        User.objects.get_or_create(username='admin', email='admin@regulai.com', is_superuser=True, is_staff=True)
        User.objects.get_or_create(username='sme1', email='sme1@regulai.com', business_type='Private Limited')
        self.stdout.write(self.style.SUCCESS('Seeded users.'))
