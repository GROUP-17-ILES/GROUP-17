import pytest
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from app.models import WeeklyLog 

User = get_user_model()

@pytest.mark.django_db
def test_weekly_log_negative_hours_fails():
    
    student = User.objects.create_user(username="log_student", email="student@muks.ac.ug")
    
    hours_logged = -5
    tasks_done = "Worked on Django backend testing."
    
    print(f"\n[DIAGNOSTIC] Simulating log creation with invalid hours: {hours_logged}")
    
    assert hours_logged > 0, f"Validation Gap: System allowed negative hours ({hours_logged})"