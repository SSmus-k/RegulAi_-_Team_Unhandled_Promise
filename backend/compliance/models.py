from django.db import models
from regulations.models import Regulation
from users.models import User

class ComplianceChecklist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    business_action = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class ComplianceStep(models.Model):
    checklist = models.ForeignKey(ComplianceChecklist, related_name='steps', on_delete=models.CASCADE)
    description = models.TextField()
    deadline = models.DateField(null=True, blank=True)
    approval_required = models.BooleanField(default=False)
    regulation = models.ForeignKey(Regulation, on_delete=models.SET_NULL, null=True)
