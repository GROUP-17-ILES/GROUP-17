from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class User(AbstractUser):
    ROLE_CHOICES = (
        ('internshipadministrator', 'InternshipAdmin'),
        ('studentintern', 'StudentIntern'),
        ('workplacesupervisor', 'WorkplaceSupervisor'),
        ('workplacesupervisor', 'WorkplaceSupervisor')
    )
    role = models.CharField(max_length=25, choices=ROLE_CHOICES)
