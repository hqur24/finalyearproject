import statistics
from urllib import response
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpRequest, HttpResponse, JsonResponse
import datetime, json
from rest_framework import viewsets, generics, status
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


# Create your views here.

#EDIT FOR REDIRECTION
def index(request):
    if request.user.is_authenticated:
        return HttpResponse("logged in")
    else:
        return HttpResponse("not logged in")

@api_view(['POST', 'GET'])
@csrf_exempt
def register_api(request):
    # if request.method == 'POST':

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        response = {"message": "User Created Successfully", "data": serializer.data}

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'GET'])
@csrf_exempt
def login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user:
        login(request, user)
        serializer = UserSerializer(user)
        #print(request.session)
        request.session.modified = True
        return Response(serializer.data)#, JsonResponse({'authenticated': True})

    
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)# , JsonResponse({'authenticated': True})

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# @csrf_exempt
# def is_authenticated(request):
#     if request.user.is_authenticated:
#         print user.is_authenticated

#         print("user is authenticated")
#         return HttpResponse('not auth')
#     else: 
#         return HttpResponse('not authenticated')

@api_view(['GET'])
def authenticated_api(request):
    if request.user.is_authenticated:
        return Response({"is_authenticated": True})
    else:
        return Response({"is_authenticated": False})
    
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
