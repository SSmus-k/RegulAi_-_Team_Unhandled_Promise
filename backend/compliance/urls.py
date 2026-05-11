from django.urls import path
from .views import ComplianceChecklistView, ComplianceStepStatusView

urlpatterns = [
    path("", ComplianceChecklistView.as_view(), name="compliance-checklist"),
    path("steps/<int:step_id>/status/", ComplianceStepStatusView.as_view(), name="compliance-step-status"),
]