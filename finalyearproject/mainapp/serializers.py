from rest_framework import serializers
from .models import CustomUser, Mood, Assignment, Exam

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

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
