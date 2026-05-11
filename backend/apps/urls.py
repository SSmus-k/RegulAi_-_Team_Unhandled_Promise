from django.urls import path
from .views import UserBusinessesListView, ReportUploadView, ReportDetailView, UserReportsListView

urlpatterns = [
    path('businesses/', UserBusinessesListView.as_view()),
    path('reports/', UserReportsListView.as_view()),
    path('reports/upload/', ReportUploadView.as_view()),
    path('reports/<int:pk>/', ReportDetailView.as_view()),
]