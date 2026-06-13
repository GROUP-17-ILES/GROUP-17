import pytest
from unittest.mock import patch

@pytest.mark.django_db
class TestCustomUserSerializer:

    def test_serializer_accepts_custom_fields(self):
        from app.serializers import CustomUserSerializer
        
        data = {
            "username": "Jessie123",
            "email": "Jessie@example.com",
            "password": "securepassword",
            "name": "Jessie",
            "role": "student",
            "course_title": "Computer Science",
            "university_name": "Tech University",
            "year_of_study": 3,
            "place_of_work": "Research Lab",
            "department": "Engineering",
            "staff_ID": "STF-998",
            "ID_number": "123456789"
        }
        
        serializer = CustomUserSerializer(data=data)
        
        assert serializer.is_valid(), serializer.errors
        assert serializer.validated_data["staff_ID"] == "STF-998"
        assert serializer.validated_data["year_of_study"] == 3

    def test_serializer_fails_with_invalid_year(self):
        from app.serializers import CustomUserSerializer
        
        invalid_data = {
            "username": "Jessie",
            "year_of_study": "third year" 
        }
        
        serializer = CustomUserSerializer(data=invalid_data)
        
        assert not serializer.is_valid()
        assert "year_of_study" in serializer.errors

    def test_serializer_validation_logic_only(self):
        from app.serializers import CustomUserSerializer

        data = {
            "username": "Jessie_Test",
            "email": "jessie@example.com",
            "password": "password123",
            "name": "Jessie",
            "role": "student",
            "course_title": "Engineering",
            "university_name": "Tech Uni",
            "year_of_study": 2,
            "place_of_work": "Lab",
            "department": "IT",
            "staff_ID": "S123",
            "ID_number": "999888"
        }
        
        serializer = CustomUserSerializer(data=data)
        
        
        assert serializer.is_valid(), serializer.errors
        assert serializer.validated_data["course_title"] == "Engineering"
        assert serializer.validated_data["role"] == "student"
