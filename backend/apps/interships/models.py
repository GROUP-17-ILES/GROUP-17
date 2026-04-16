from django.db import models


class Internship(models.Model):
    title = models.CharField(max_length=255)
    company = models.CharField(max_length=255)
    description = models.TextField()
    deadline = models.DateField()
    
class Placement(models.Model):
    student = models.ForeignKey('StudentIntern', on_delete=models.CASCADE)
    internship = models.ForeignKey('InternshipAdministrator', on_delete=models.CASCADE)
    workplacesupervisor = models.ForeignKey('WorkplaceSupervisor', on_delete=models.SET_NULL, null=True)
    academicsupervisor = models.ForeignKey('AcademicSupervisor', on_delete=models.SET_NULL, null=True)
    status = models.CharField(max_length=50)

