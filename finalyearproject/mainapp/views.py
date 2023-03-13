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


# Create your views here.

#EDIT FOR REDIRECTION
def index(request):
    if request.user.is_authenticated:
        return HttpResponse("logged in")
    else:
        return HttpResponse("not logged in")
    
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

class LogoutAPI(APIView):
    def post(self, request, format=None):
        try:
            logout(request)
            return Response({'success': 'Logged out successfully'})
        except:
            return Response({'Failure': 'An error occurred when logging out.'})


class UsersViewAPI(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        users = CustomUser.objects.all()

        users = UserSerializer(users, many=True)
        return Response(users.data)
    
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
