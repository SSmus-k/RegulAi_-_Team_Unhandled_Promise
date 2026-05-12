from django.urls import path
from .views import UserBusinessesListView, BusinessDetailView, DashboardView

urlpatterns = [
    path('', UserBusinessesListView.as_view(), name='user-businesses-list'),
    path('<int:pk>/', BusinessDetailView.as_view(), name='businesses-detail'),
    path('dashboard/', DashboardView.as_view())
]
