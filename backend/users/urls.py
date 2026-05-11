from django.urls import path
from .views import UserListCreateView, MyBusinessesView, MeView

urlpatterns = [
    path('', UserListCreateView.as_view(), name='user-list-create'),
    path('me/', MeView.as_view(), name='user-me'),
    path('businesses/', MyBusinessesView.as_view(), name='my-businesses'),
    path('me/businesses/', MyBusinessesView.as_view(), name='user-me-businesses'),
]