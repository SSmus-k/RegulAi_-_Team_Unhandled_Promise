from django.urls import path
from .views import UserBusinessesListView

urlpatterns = [
    path('user/<int:user_id>/businesses/', UserBusinessesListView.as_view(), name='user-businesses-list'),
]
