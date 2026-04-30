from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    ROLE_CHOICES=(
         ('studentintern','StudentIntern'),
         ('workplacesupervisor','WorkplaceSupervisor'),
         ('academicsupervisor','AcademicSupervisor')
         ('internshipadministrator','InternshipAdministrator')
    )
    name=models.CharField(max_length=30,null=False,blank=False)
    role=models.CharField(max_length=15,choices=ROLE_CHOICES)
    phone_number=models.CharField(max_length=15,blank=True,null=True)
    email=models.EmailField(unique=True)
    ID_number=models.IntegerField()
    def __str__(self): 
     return self.username
    
    def get_user_type_instances(self):
        if self.role=='studentintern':
            return hasattr(self,'studentintern') and self.studentintern
        elif self.role=='workplace supervisior':
            return hasattr(self,'workplace supervisior') and self.workplacesupervisior
        elif self.role=='academic supervisior':
            return hasattr(self,'academic supervisior') and self.academicsupervisior
        elif self.role=='internship administrator':
            return hasattr(self,'internship administrator') and self.internshipadministrator
        return None
    
class InternshipPlacement(models.Model):
     user=models.OneToOneField(CustomUser,on_delete=models.CASCADE)
     company_name=models.CharField(max_length=40)
     department=models.CharField(max_length=20)
     supervisior_name=models.CharField(max_length=20)
     start_date=models.DateField()
     end_date=models.DateField()
     def __str__(self):
         return f'{self.user.username} - {self.company_name}'

class WeeklyLog(models.Model):
     STATUS_CHOICES=[
         ('DRAFT' ,'Draft'),
         ('SUBMITTED','Submitted'),
         ('APPROVED','Approved'),
         ('REJECTED','Rejected'),
     ]
     user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
     week_number=models.IntegerField()
     description=models.TextField()
     date_submitted=models.DateTimeField(auto_now_add=True)
     status=models.CharField(max_length=10)
     choices=STATUS_CHOICES, default='DRAFT'

     def can_transition(self,new_status):
         allowed_transistion={
             'DRAFT':['SUBMITTED'],
             'SUBMITTED':['APPROVED','REJECTED'],
             'REJECTED':['DRAFT'],
             'APPROVED':[],

         }
         return new_status in allowed_transistion.get(self.status, [])
     def __str__(self):
         return f'Week{self.week_number}  -  {self.user.username} - {self.status}'

class StatusHistory(models.Model):
    log=models.ForeignKey(WeeklyLog,on_delete=models.CASCADE,related_name='history')
    old_status=models.CharField(max_length=10)
    new_status=models.CharField(max_length=10)
    changed_by=models.ForeignKey(CustomUser,on_delete=models.SET_NULL, null=True)
    changed_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
         return f"{self.old_status} - {self.new_status}"
class EvaluationCriteria(models.Model):
     name=models.CharField(max_length=20)
     max_score=models.IntegerField()
     def __str__(self):
         return self.name

class Evaluation(models.Model):
     user=models.ForeignKey(CustomUser,on_delete=models.CASCADE)
     criteria=models.ManyToManyField(EvaluationCriteria,on_delete=models.CASCADE)
     score=models.IntegerField()
     comments=models.TextField(blank=True,null=True)
     def __str__(self):
         return f'{self.user.username}  -  {self.criteria.name}'
from django.db import models


