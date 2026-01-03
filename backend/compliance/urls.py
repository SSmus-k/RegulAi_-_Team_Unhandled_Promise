from django.urls import path
from .views import ComplianceChecklistView

urlpatterns = [
    path('', ComplianceChecklistView.as_view(), name='compliance-checklist'),
]
