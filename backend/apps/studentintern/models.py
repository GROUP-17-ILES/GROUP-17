from django.db import models
from django.contrib.auth.models import User


class StudentIntern(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='studentintern')
    student_number = models.IntegerField(unique=True)
    course_of_study = models.CharField(max_length=30, blank=False)
    university_name = models.CharField(max_length=50, blank=False)
    current_year_of_study = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.student_number}"
