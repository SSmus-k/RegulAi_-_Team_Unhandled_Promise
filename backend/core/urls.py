from django.urls import path
from .views import  AIAnswerView

urlpatterns = [
    # path('company-info/', CompanyInfoUploadView.as_view(), name='company-info-upload'),
    path('ai/answer/', AIAnswerView.as_view(), name='ai-answer'),
]
