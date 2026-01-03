from django.core.management.base import BaseCommand
from regulations.models import Regulation, Rule

class Command(BaseCommand):
    help = 'Seed initial regulations and rules'

    def handle(self, *args, **kwargs):
        reg, _ = Regulation.objects.get_or_create(
            title='Company Registration Act',
            description='Regulates company registration in Nepal.',
            source='Nepal Government',
            effective_date='2020-01-01'
        )
        Rule.objects.get_or_create(
            regulation=reg,
            business_type='Private Limited',
            business_action='registration',
            mapping_logic='Submit registration form, pay fee, get approval.'
        )
        self.stdout.write(self.style.SUCCESS('Seeded regulations and rules.'))
