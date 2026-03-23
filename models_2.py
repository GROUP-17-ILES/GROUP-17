from django.db import models 
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('studentintern', 'Student Intern'),
        ('workplacesupervisor', 'Workplace Supervisor'),
        ('academicsupervisor', 'Academic Supervisor'),
        ('internshipadministrator', 'Internship Administrator')
    )
    # REQUIRED FIELD constraint applied (blank=False)
    name = models.CharField(max_length=255, blank=False)
    role = models.CharField(
        max_length=25, 
        choices=ROLE_CHOICES, 
        default='studentintern'
    )
    #Optional field
    phone_number = models.CharField(
        max_length=15, 
        blank=True, 
        null = True)
    email = models.EmailField(unique=True)
    #Track when user was created
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    def get_user_type_instance(self):
        """Get the specific user type instance based on role"""
        if self.role == 'studentintern':
            return hasattr(self, 'studentintern') and self.studentintern
        elif self.role == 'workplacesupervisor':
            return hasattr(self, 'workplacesupervisor') and self.workplacesupervisor
        elif self.role == 'academicsupervisor':
            return hasattr(self, 'academicsupervisor') and self.academicsupervisor
        elif self.role == 'internshipadministrator':
            return hasattr(self, 'internshipadministrator') and self.internshipadministrator
        return None

class AcademicSupervisor(models.Model):
    # One-to-one relationship implemented
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='academicsupervisor')
    department = models.CharField(max_length=20, blank=False)
    employee_id = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.department}"
    
class StudentIntern(models.Model):
    # One-to-one relationship implemented
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='studentintern')
    student_number = models.IntegerField(unique=True)
    course_of_study = models.CharField(max_length=30, blank=False)
    university_name = models.CharField(max_length=50, blank=False)
    current_year_of_study = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.student_number}"
