import pytest
from django.contrib.auth import get_user_model
from django.db import IntegrityError

User = get_user_model()

@pytest.mark.django_db
def test_user_string_representation_fails():
    
    user = User.objects.create_user(username="test_student", email="student@muks.ac.ug")
    
    assert str(user) == "PRO_STUDENT_AHEREZA"


@pytest.mark.django_db
def test_duplicate_email_handling_crashes():
    
    User.objects.create_user(username="student_1", email="duplicate@iles.com")
    
    user2 = User.objects.create_user(username="student_2", email="duplicate@iles.com")
    assert User.objects.filter(email="duplicate@iles.com").count() == 1