import statistics
from urllib import response
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpRequest, HttpResponse, JsonResponse
import datetime, json
from rest_framework import viewsets, generics, status, permissions
from .forms import RegistrationForm, LoginForm
from .serializers import MoodSerializer, AssignmentSerializer, ExamSerializer, UserSerializer
from .models import CustomUser, Mood, Exam, Assignment
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers.json import DjangoJSONEncoder
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.http.multipartparser import MultiPartParser
from django.views.decorators.http import require_http_methods
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from builtins import list

# Create your views here.

#EDIT FOR REDIRECTION
def index(request):
    if request.user.is_authenticated:
        return HttpResponse("logged in")
    else:
        return HttpResponse("not logged in")
    



##### ------------------ ITEM (Moods, Assignments, Exams) VIEW FUNCTIONS ------------------------
@method_decorator(csrf_exempt, name='dispatch')
class MoodsAPI(APIView):
    permission_classes =(permissions.AllowAny, )

    def get(self, request):
        mood_data = []
        for mood in Mood.objects.all():
            mood_item = {}
            user_data= {
                'username' : mood.author.username,
            }

            mood_item['mood_date'] = mood.mood_date
            mood_item['mood_choice'] = mood.mood_choice
            mood_item['author'] = user_data['username']

            mood_data.append(mood_item)
        return JsonResponse({'moods': mood_data})
    
class AssignmentAPI(APIView):
    permission_classes =(permissions.AllowAny, )

    def get(self, request):
        assignment_data = []
        for assignment in Assignment.objects.all():
            assignment_item = {}
            user_data= {
                'username' : assignment.author.username,
            }

            assignment_item['assignment_title'] = assignment.assignment_title
            assignment_item['assignment_desc'] = assignment.assignment_desc
            assignment_item['due_date'] = assignment.due_date
            assignment_item['author'] = user_data['username']

            assignment_data.append(assignment_item)
        return JsonResponse({'assignments': assignment_data})
    
@method_decorator(csrf_exempt, name='dispatch')
class ExamsAPI(APIView):
    permission_classes =(permissions.AllowAny, )

    def get(self, request):
        exam_data = []
        for exam in Exam.objects.all():
            exam_item = {}
            user_data= {
                'username' : exam.author.username,
            }

            exam_item['exam_name'] = exam.exam_name
            exam_item['exam_date'] = exam.exam_date
            exam_item['exam_type'] = exam.exam_type
            exam_item['author'] = user_data['username']

            exam_data.append(exam_item)
        return JsonResponse({'exams': exam_data})

##### ----------------- AUTHENTICATION VIEW FUNCTIONS -------------------------------------
#Register View Function
@method_decorator(csrf_exempt, name='dispatch')
class RegisterAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(request.data)
            Response({"message": "User Created Successfully", "data": serializer.data})

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Login View Function
@method_decorator(csrf_exempt, name='dispatch')
class LoginAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            serializer = UserSerializer(user)
            #print(request.session)
            request.session.modified = True
            return Response({'Success': 'Logged in successfully' , 'User' : serializer.data['username']})#, JsonResponse({'authenticated': True})
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)# , JsonResponse({'authenticated': True})

#CSRF Token View Function
@method_decorator(ensure_csrf_cookie, name='dispatch')
class CSRFTokenRetrieve(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        return Response({ 'Operation successful': 'CSRF has been set ' })
    
# @method_decorator(csrf_exempt, name='dispatch')
class AuthenticationCheckAPI(APIView):
    def get(self, request, format=None):
        user = self.request.user 

        isAuthenticated = user.is_authenticated

        if isAuthenticated:
            return Response({ 'isAuthenticated': 'success' })
        else:
            return Response({ 'isAuthenticated': 'failure' })

#Logout View Function
class LogoutAPI(APIView):
    def post(self, request, format=None):
        try:
            logout(request)
            return Response({'success': 'Logged out successfully'})
        except:
            return Response({'Failure': 'An error occurred when logging out.'})

#View all users API Function
class UsersViewAPI(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        users = CustomUser.objects.all()

        users = UserSerializer(users, many=True)
        return Response(users.data)
    
#------------------- DJANGO REST FRAMEWORK VIEW FUNCTIONS (mainly for browsable rest api) -----------------------------
#These work with serializers 
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    

class MoodView(viewsets.ModelViewSet):
    serializer_class = MoodSerializer
    queryset = Mood.objects.all()


class AssignmentView(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.all()

class ExamView(viewsets.ModelViewSet):
    serializer_class = ExamSerializer
    queryset = Exam.objects.all()
