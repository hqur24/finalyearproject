from rest_framework import serializers
from rest_framework.response import Response
from .models import CustomUser, Mood, Assignment, Exam, Application

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=254)
    email = serializers.CharField(max_length=254)
    password = serializers.CharField(min_length=6, write_only=True)

    class Meta:
        model = CustomUser
        fields = 'id', 'username', 'email', 'password'

    
    def create(self, validated_data):
        email = validated_data.get('email')
        username = validated_data.get('username')


        if CustomUser.objects.filter(username=username).exists():
            raise serializers.ValidationError("Username already exists")
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists")
        
        return CustomUser.objects.create_user(**validated_data)


class MoodSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    class Meta:
        model = Mood
        fields = '__all__'

    def get_author(self, obj):
        print(self)
        print(obj)
        return obj.author.username

class AssignmentSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    class Meta:
        model = Assignment
        fields = '__all__'


class ExamSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    class Meta:
        model = Exam
        fields = '__all__'

    def get_author(self, obj):
        print(self)
        print(obj)
        return obj.author.username


class ExamTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ('exam_type')


class ApplicationSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    class Meta:
        model = Application
        fields = '__all__'

    def get_author(self, obj):
        print(self)
        print(obj)
        return obj.author.username