"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/interns/', StudentInternView.as_view(), name='studentintern-list'),
    path('', AcademicSupervisorView.as_view(), name='academic-supervisor-list'),
    path('api/workplace-supervisors/', WorkplaceSupervisorView.as_view(), name='workplace-supervisor-list'),
    path('api/internship-placements/', InternshipPlacementView.as_view(), name='internship-placement-list'),
    path('api/user-profiles/', UserProfileView.as_view(), name='user-profile-list'),
    path('api/user-details/', UserDetailView.as_view(), name='user-detail-list'),
    path('api/evaluations/', EvaluationView.as_view(), name='evaluation-list'),
    path('api/evaluation-criteria/', EvaluationCriteriaView.as_view(), name='evaluation-criteria-list'),
    path('api/weekly-logs/', WeeklyLogView.as_view(), name='weekly-log-list'),
    
]
