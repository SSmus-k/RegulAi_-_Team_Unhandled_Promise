from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    business_type = models.CharField(max_length=100, blank=True, null=True)
    # Add more fields as needed for SME context
