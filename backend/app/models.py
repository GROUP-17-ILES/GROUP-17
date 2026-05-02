from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator

class CustomUser(AbstractUser):
    ROLE_CHOICES=(
         ('studentintern','StudentIntern'),
         ('workplacesupervisor','WorkplaceSupervisor'),
         ('academicsupervisor','AcademicSupervisor'),
         ('internshipadministrator','InternshipAdministrator')
    )
    name=models.CharField(max_length=30,null=False,blank=False)
    role=models.CharField(max_length=50,choices=ROLE_CHOICES)
    phone_number=models.CharField(max_length=15,blank=True,null=True)
    email=models.EmailField(unique=True)
    ID_number = models.CharField(max_length=20, unique=True) 
    REQUIRED_FIELDS = ['email', 'ID_number'] 
    created_at = models.DateTimeField(auto_now_add=True)


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
class AcademicSupervisor(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='academicsupervisor')
    department = models.CharField(max_length=20, blank=False)
    employee_id = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.department}"
    

class StudentIntern(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='studentintern')
    student_number = models.IntegerField(unique=True)
    course_of_study = models.CharField(max_length=30, blank=False)
    university_name = models.CharField(max_length=50, blank=False)
    current_year_of_study = models.IntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.student_number}"

class WorkplaceSupervisor(models.Model):
     user=models.OneToOneField(CustomUser,on_delete=models.CASCADE,related_name='workplacesupervisor')
     company_name=models.CharField(max_length=40)
     department=models.CharField(max_length=20)
     employee_id=models.CharField(max_length=20,unique=True)
     created_at=models.DateTimeField(auto_now_add=True)
     updated_at=models.DateTimeField(auto_now=True)
     def __str__(self):
         return f'{self.user.username} - {self.company_name}'

class InternshipPlacement(models.Model):
     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
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
     status=models.CharField(
         max_length=10,
           choices=STATUS_CHOICES, 
           default='DRAFT'
     )
     def can_transition(self,new_status):
         allowed_transition={
             'DRAFT':['SUBMITTED'],
             'SUBMITTED':['APPROVED','REJECTED'],
             'REJECTED':['DRAFT'],
             'APPROVED':[],

         }
         return new_status in allowed_transition.get(self.status, [])
     def __str__(self):
         return f'Week{self.week_number}  -  {self.user.username} '

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
     criteria=models.ForeignKey(EvaluationCriteria,on_delete=models.CASCADE)
     score=models.IntegerField()
     comments=models.TextField(blank=True,null=True)
     skills_learned=models.TextField(blank=True,null=True)
     challenges_faced=models.TextField(blank=True,null=True)
     feedback=models.TextField(blank=True,null=True)
     week_number=models.IntegerField(default=1)
     
     def __str__(self):
         return f'{self.user.username}  -  {self.criteria.name}'


class StudentGrade(models.Model):
     efficiency=models.IntegerField
     time_management=models.IntegerField
     problem_solving=models.IntegerField
     professionalism=models.IntegerField

     def save(self, *args, **kwargs):
         self.total_score=(
            (self.efficiency*0.25) +
            (self.time_management*0.250) +
            (self.problemsolving*0.25) +
            (self.professionalism*0.25)
         )

         if self.total_score>=80:
             self.grade='A'
         elif self.total_score>=70:
              self.grade='B'
         elif self.total_score>=60:
             self.grade='C'
         elif self.total_score>=50:
             self.grade='D'
         else :
             self.grade='F'
         super().save(*args, **kwargs)

class Meta:
     unique_together =['student']

     def __str__(self):
         return f'{self.user.username}  -  {self.criteria.name}'
from django.db import models

# Create your models here.
