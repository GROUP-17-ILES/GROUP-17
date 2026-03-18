from django.db import models

from django.contrib.auth.models import AbstractUser
class CustomUser(AbstractUser):
    ROLE_CHOICES=(
         ('studentintern','StudentIntern'),
         ('workplacesupervisior','WorkplaceSupervisior'),
         ('academicsupervisior','AcademicSupervisior')
         ('internshipadministrator','InternshipAdministrator')
    )
    name=models.CharField(max_length=30)
    role=models.CharField(max_length=15,choices=ROLE_CHOICES)
    phone_number=models.CharField(max_length=15,blank=True,null=True)
    ID_number=models.IntegerField()
    def __str__(self): 
     return self.username
    
class InternshipPlacement(models.Model):
     user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
     company_name=models.CharField(max_length=40)
     department=models.CharField(max_length=20)
     supervisior_name=models.CharField(max_length=20)
     start_date=models.DateField()
     end_date=models.DateField()
     def __str__(self):
         return f'{self.user.username} - {self.company_name}'

class WeeklyLog(models.Model):
     user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
     week_number=models.IntegerField()
     description=models.TextField()
     date_submitted=models.DateTimeField(auto_now_add=True)
     def __str__(self):
         return f'Week{self.week_number}  -  {self.user.username}'

class EvaluationCriteria(models.Model):
     name=models.CharField(max_length=20)
     max_score=models.IntegerField()
     def __str__(self):
         return self.name

class Evaluation(models.Model):
     user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
     criteria=models.ForeignKey(EvaluationCriteria,on_delete=models.CASCADE)
     score=models.IntegerField()
     comments=models.TextField(blank=True,null=True)
     def __str__(self):
         return f'{self.user.username}  -  {self.criteria.name}'
