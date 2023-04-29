from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from datetime import date


# Create your models here.


class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        """
        Creates and saves a User with the given email and password.
        """
        if not email or not username:
            raise ValueError('The Email and username field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
class CustomUser(AbstractUser):
    email = models.EmailField(max_length = 254, unique = True, blank=False)

    objects = CustomUserManager() 
    
    def __str__(self):
        return self.username
    
    def to_dict(self):
        return {
            'email': self.email,
        }
    

class Mood(models.Model):
    HAPPY = "Happy"
    SAD = "Sad"
    TIRED = "Tired"
    ANGRY = "Angry"
    EXCITED = "Excited"

    MOOD_CHOICES = [
        (HAPPY, "Happy"),
        (SAD, "Sad"),
        (TIRED, "Tired"),
        (ANGRY, "Angry"),
        (EXCITED, "Excited"),
    ]

    mood_choice = models.CharField(max_length=10, choices=MOOD_CHOICES, default=HAPPY, null=False)
    mood_date = models.DateField(default = date.today, null=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1, null=False) #set to 1 as default but overriden with user logged in


    def to_dict(self):
        return{
            'mood_choice': self.mood_choice,
            'mood_date': self.mood_date,
            'author': self.author,
        }

    def __str__(self):
        return "({}, {}, {})".format(self.get_mood_choice_display(), self.mood_date.strftime("%Y-%m-%d"), self.author)
        # string = self.mood_choice,self.mood_date, self.author.username
        # return str(string)

class Assignment(models.Model):
    assignment_title = models.CharField(max_length = 254)
    assignment_desc = models.CharField(max_length = 750)
    assignment_due_date = models.DateField(default= date.today)
    assignment_status = models.BooleanField(default=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1) #set to 1 as default but overriden with user logged in

    def __str__(self):
        # return self.assignment_title
        return f"({self.assignment_title}, {self.assignment_desc}, {self.assignment_due_date}, {self.assignment_status}, {self.author.username})"


    def to_dict(self):
        return{
            'assignment_title': self.assignment_title,
            'assignment_desc': self.assignment_desc,
            'assignment_due_date': self.assignment_due_date,
            'assignment_status': self.assignment_status,
            'author': self.author,
        }

class Exam(models.Model):

    FINAL = "Final"
    MIDTERM = "Midterm"
    TERMTIME = "Termtime"
    QUIZ = "Quiz"

    EXAM_CHOICES = [
        (FINAL, "Final Exam"),
        (MIDTERM, "Midterm"),
        (TERMTIME, "Termtime Exam"),
        (QUIZ, "Quiz/MCQ"),
    ]

    exam_name = models.CharField(max_length=254)
    exam_date = models.DateField(default=date.today)
    exam_type = models.CharField(max_length=10,choices=EXAM_CHOICES, default=FINAL)
    exam_status = models.BooleanField(default=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1) #set to 1 as default but overriden with user logged in

    def __str__(self):
        return f"({self.exam_name}, {self.exam_date}, {self.exam_type}, {self.exam_status}, {self.author.username})"
        # return self.exam_name

    def to_dict(self):
        return{
            'exam_name': self.exam_name,
            'exam_date': self.exam_date,
            'exam_type': self.exam_type,
            'exam_status':self.exam_status,
            'author':self.author
        }
    

class Application(models.Model):

    GraduateJob = "Graduate Job"
    Internship = "Internship"
    Other = "Other"

    APPLICATION_CHOICES = [
        (GraduateJob, "Graduate Job"),
        (Internship, "Internship"),
        (Other, "Other Type"),
    ]

    application_company = models.CharField(max_length=254)
    application_deadline = models.DateField(default=date.today)
    application_type = models.CharField(max_length=15,choices=APPLICATION_CHOICES, default=GraduateJob)
    application_notes = models.CharField(max_length = 750)
    application_status = models.BooleanField(default=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1) #set to 1 as default but overriden with user logged in

    def __str__(self):
        # return self.application_company
        return f"({self.application_company}, {self.application_deadline}, {self.application_type}, {self.application_notes}, {self.application_status}, {self.author.username})"

    def to_dict(self):
        return{
            'application_company': self.application_company,
            'application_deadline': self.application_deadline,
            'application_type': self.application_type,
            'application_notes': self.application_notes,
            'application_status':self.application_status,
            'author':self.author,
        }    