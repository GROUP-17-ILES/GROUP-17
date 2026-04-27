from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework.response import Response
from app import serializers
from rest_framework.decorators import action

# Create your views here.
class StudentInternView(generics.ListCreateAPIView):
    queryset = StudentIntern.objects.all()
    serializer_class = StudentInternSerializer
    
class AcademicSupervisorView(generics.ListCreateAPIView):
    queryset = AcademicSupervisor.objects.all()
    serializer_class = AcademicSupervisorSerializer

class WorkplaceSupervisorView(generics.ListCreateAPIView):
    queryset = WorkplaceSupervisor.objects.all()
    serializer_class = WorkplaceSupervisorSerializer
    
class InternshipPlacementView(generics.ListCreateAPIView):
    queryset = InternshipPlacement.objects.all()
    serializer_class = InternshipPlacementSerializer

class UserProfileView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    
class UserDetailView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

class EvaluationView(generics.ListCreateAPIView):   
    queryset = Evaluation.objects.all()
    serializer_class = EvaluationSerializer

class EvaluationCriteriaView(generics.ListCreateAPIView):
    queryset = EvaluationCriteria.objects.all()
    serializer_class = EvaluationCriteriaSerializer

class WeeklyLogView(generics.ListCreateAPIView):
    queryset = WeeklyLog.objects.all()
    serializer_class = WeeklyLogSerializer


    def update(self, request, *args,**kwargs):
        instance =self.get_object()

        if instance.status=="APPROVED":
            return Response({"error": "Cannot edit approved log"}, status=400)
        return super().update(request, *args, **kwargs)
    @action(detail=True,methods=['post'])
    def change_status(self,request,pk=None):
        log= self.get_object()
        new_status=request.data.get('status')
        if not log.can_transition(new_status):
            return Response(
                {"error": "Invalid state transition"},
status=status.HTTP_400_BAD_REQUEST
            )
        old_status= log.status
        log.status= new_status
        log.save()

        StatusHistory.objects.create(
            log=log,
            old_status=new_status,
            changed_by=request.customuser
            )
        return Response({"message": "Status updated"})

    
