from rest_framework import serializers
from datetime import date
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import InternshipPlacement, WeeklyLog, Evaluation, EvaluationCriteria

CustomUser = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'name', 'role', 'phone_number', 'created_at']
        read_only_fields = ['id', 'created_at']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'password2', 'email', 'name', 'role', 'phone_number']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    def create(self, validated_data):
        validated_data.pop('password2')
        user = CustomUser.objects.create_user(**validated_data)
        return user

class InternshipPlacementSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    user_email = serializers.ReadOnlyField(source='user.email')
    workplace_supervisor_name = serializers.SerializerMethodField()
    academic_supervisor_name = serializers.SerializerMethodField()
    is_active = serializers.ReadOnlyField()
    duration_weeks = serializers.ReadOnlyField()
    
    class Meta:
        model = InternshipPlacement
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'status', 'approved_at', 'rejection_reason']
    
    def get_workplace_supervisor_name(self, obj):
        if obj.workplace_supervisor:
            return obj.workplace_supervisor.username
        return None
    
    def get_academic_supervisor_name(self, obj):
        if obj.academic_supervisor:
            return obj.academic_supervisor.username
        return None
    def validate(self, data):
        """Comprehensive validation for placement"""
        user = data.get('user')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        
        if start_date and end_date:
            if start_date > end_date:
                raise serializers.ValidationError({
                    'end_date': 'End date must be after start date'
                })
            
            if start_date < date.today():
                raise serializers.ValidationError({
                    'start_date': 'Start date cannot be in the past'
                })
        
    
        if user and start_date and end_date:
            overlapping = InternshipPlacement.objects.filter(
                user=user,
                status__in=['pending', 'active'],  # Only check active/pending placements
                start_date__lte=end_date,
                end_date__gte=start_date
            )
            
            if self.instance:
                overlapping = overlapping.exclude(id=self.instance.id)
            
            if overlapping.exists():
                overlap = overlapping.first()
                raise serializers.ValidationError({
                    'non_field_errors': f'You already have a placement from {overlap.start_date} to {overlap.end_date} at {overlap.company_name}'
                })
        
        if start_date and end_date:
            days = (end_date - start_date).days
            if days < 28:  # 4 weeks
                raise serializers.ValidationError({
                    'end_date': 'Internship must be at least 4 weeks (28 days)'
                })
        
        if start_date and end_date:
            days = (end_date - start_date).days
            if days > 84:  # 12 weeks
                raise serializers.ValidationError({
                    'end_date': 'Internship cannot exceed 12 weeks (84 days) without special approval'
                })  
        return data
    
    def create(self, validated_data):
        """Auto-set status to pending on creation"""
        validated_data['status'] = 'pending'
        return super().create(validated_data)
class WeeklyLogSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = WeeklyLog
        fields = '__all__'
        read_only_fields = ['date_submitted', 'status']

    def validate_week_number(self, value):
        if value < 1 or value > 52:
            raise serializers.ValidationError("Week number must be between 1 and 52")
        return value

class EvaluationCriteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EvaluationCriteria
        fields = '__all__'

class EvaluationSerializer(serializers.ModelSerializer):
    criteria_name = serializers.ReadOnlyField(source='criteria.name')
    user_name = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Evaluation
        fields = '__all__'
        read_only_fields = ['created_at']

    def validate_score(self, value):
        if value < 0 or value > 100:
            raise serializers.ValidationError("Score must be between 0 and 100")
        return value
