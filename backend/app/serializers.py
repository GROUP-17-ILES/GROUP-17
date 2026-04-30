from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, Evaluation, EvaluationCriteria, InternshipPlacement, StudentIntern, AcademicSupervisor, WeeklyLog, WorkplaceSupervisor

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'name', 'role', 'phone_number', 'created_at']
        read_only_fields = ['created_at']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'}) 
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'password2', 'name', 'role', 'phone_number']
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        password = validated_data.pop('password')
        user = CustomUser.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    
    def validate(self, attrs):
        username = attrs.get('username')
        password = attrs.get('password')
        
        if username and password:
            user = authenticate(request=self.context.get('request'),
                              username=username, password=password)
            if not user:
                raise serializers.ValidationError('Unable to log in with provided credentials.')
        else:
            raise serializers.ValidationError('Must include "username" and "password".') 
        attrs['user'] = user
        return attrs

class StudentInternSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role='studentintern'),
        source='user',
        write_only=True
    ) 
    class Meta:
        model = StudentIntern
        fields = ['id', 'user', 'user_id', 'student_number', 'course_of_study', 
                  'university_name', 'current_year_of_study', 'created_at']
        read_only_fields = ['created_at']

class WorkplaceSupervisorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role='workplacesupervisor'),
        source='user',
        write_only=True
    )
    class Meta:
        model = WorkplaceSupervisor
        fields = ['id', 'user', 'user_id', 'company_name', 'department', 
                  'employee_id', 'created_at']
        read_only_fields = ['created_at']

class AcademicSupervisorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.filter(role='academicsupervisor'),
        source='user',
        write_only=True
    )  
    class Meta:
        model = AcademicSupervisor
        fields = ['id', 'user', 'user_id', 'department', 'employee_id', 'created_at']
        read_only_fields = ['created_at']

class UserDetailSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'name', 'role', 'phone_number', 'profile', 'created_at']
    
    def get_profile(self, obj):
        if obj.role == 'studentintern' and hasattr(obj, 'studentintern'):
            return StudentInternSerializer(obj.studentintern).data
        elif obj.role == 'academicsupervisor' and hasattr(obj, 'academicsupervisor'):
            return AcademicSupervisorSerializer(obj.academicsupervisor).data
        return None
    
class InternshipPlacementSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=CustomUser.objects.all(),
        source='user',
        write_only=True
    )  
    class Meta:
        model = InternshipPlacement
        fields = ['id', 'user', 'user_id', 'company_name', 'department', 
                  'supervisior_name', 'start_date', 'end_date']

class EvaluationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False)  
    class Meta:
        model = Evaluation
        fields = ['user', 'week_number', 'criteria', 'score', 'comments', 'skills_learned', 'challenges_faced', 'feedback']
        
class EvaluationCriteriaSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False)
    class Meta:
        model = EvaluationCriteria
        fields = ['id','user' ,'name', 'max_score']

class WeeklyLogSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=False)
    class Meta:
        model = WeeklyLog
        fields = ['user', 'week_number', 'description', 'date_submitted']
