from django.contrib import admin
from .models import ComplianceChecklist, ComplianceStep

admin.site.register(ComplianceChecklist)
admin.site.register(ComplianceStep)
