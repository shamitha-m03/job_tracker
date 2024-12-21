from django.urls import path
from . import views

urlpatterns = [
    path('api/jobs/', views.get_jobs, name='get_jobs'),
    path('api/jobs/create/', views.create_job, name='create_job'),
]