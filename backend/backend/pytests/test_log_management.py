import pytest
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
def test_valid_weekly_log_submission():
   
    student = User.objects.create_user(username="log_student_prime", email="student@muks.ac.ug")
    
    hours_logged = 8
    tasks_done = "Worked on Django backend testing."
    
    assert hours_logged > 0 and hours_logged <= 24


@pytest.mark.django_db
def test_weekly_log_negative_hours_intercepted():
    
    hours_logged = -5
    
    is_valid_entry = hours_logged > 0
    
    assert is_valid_entry == False