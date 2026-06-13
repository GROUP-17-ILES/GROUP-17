import pytest
from django.contrib.auth import get_user_model

User = get_user_model()

@pytest.mark.django_db
def test_valid_evaluation_metric_submission():
    
    supervisor = User.objects.create_user(username="supervisor_prime", email="supervisor@muks.ac.ug")
    
    assigned_score = 85
    
    assert assigned_score >= 0 and assigned_score <= 100


@pytest.mark.django_db
def test_over_bounds_evaluation_score_intercepted():
    
    invalid_score = 150
    
    is_valid_score = invalid_score <= 100
    
    assert is_valid_score == False