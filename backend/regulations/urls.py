from django.urls import path
from .views import RegulationListCreateView, RuleListCreateView

urlpatterns = [
    path('', RegulationListCreateView.as_view(), name='regulation-list-create'),
    path('rules/', RuleListCreateView.as_view(), name='rule-list-create'),
]
