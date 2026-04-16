from datetime import datetime
from django.db import models
from django.contrib.auth.models import User

user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='academicsupervisor')
department = models.CharField(max_length=20, blank=False)
employee_id = models.CharField(max_length=20, unique=True)
created_at = models.DateTimeField(auto_now_add=True)
updated_at: models.DateTimeField[datetime] = models.DateTimeField(auto_now=True)

def __str__(self):
        return f"{self.user.username} - {self.department}"