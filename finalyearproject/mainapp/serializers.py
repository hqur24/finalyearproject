from rest_framework import serializers
from .models import CustomUser, Mood, Assignment, Exam

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
    # author = serializers.SerializerMethodField()   
    class Meta:
        model = Mood
        fields = ('id', 'mood_choice', 'mood_date', 'author')

    def get_author(self, obj):
        print(self)
        print(obj)
        return obj.author.username


class AssignmentSerializer(serializers.ModelSerializer):
    # author = serializers.SerializerMethodField()
    class Meta:
        model = Assignment
        fields = ('id', 'assignment_title', 'assignment_desc', 'due_date', 'author')

    def get_author(self, obj):
        print(self)
        print(obj)
        return obj.author.username

class ExamSerializer(serializers.ModelSerializer):
    # author = serializers.SerializerMethodField()
    class Meta:
        model = Exam
        fields = ('id', 'exam_name', 'exam_date', 'exam_type', 'author')

    def get_author(self, obj):
        print(self)
        print(obj)
        return obj.author.username
