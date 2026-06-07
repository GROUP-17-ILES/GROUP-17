import pytest
from django.contrib.auth import get_user_model
from django.db import IntegrityError

User = get_user_model()

@pytest.mark.django_db
def test_user_creation_and_string_representation_passing():
    
    user = User.objects.create_user(username="test_student_user", email="student@muks.ac.ug")
    
    assert str(user) == "test_student_user"
    assert user.email == "student@muks.ac.ug"


@pytest.mark.django_db
def test_duplicate_email_raises_integrity_error():

    User.objects.create_user(username="student_1", email="duplicate@iles.com")
    
    with pytest.raises(IntegrityError):
        User.objects.create_user(username="student_2", email="duplicate@iles.com")