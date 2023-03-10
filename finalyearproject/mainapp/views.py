
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpRequest, HttpResponse, JsonResponse
import datetime
from rest_framework import viewsets

from .forms import RegistrationForm, LoginForm
from .serializers import MoodSerializer, AssignmentSerializer, ExamSerializer, UserSerializer
from .models import CustomUser, Mood, Exam, Assignment
from django.views.decorators.csrf import csrf_exempt
from django.core.serializers.json import DjangoJSONEncoder
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json
from django.http.multipartparser import MultiPartParser

# Create your views here.

#EDIT FOR REDIRECTION
def index(request):
    if request.user.is_authenticated:
        return HttpResponse("logged in")
    else:
        return HttpResponse("not logged in")

@csrf_exempt
def registerview(request):
    context = {}
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password')
            account = authenticate(email=email, password=raw_password)
            login(request, account)
            return redirect('index')
        else: 
            context['registration_form'] = form
    else:
        form = RegistrationForm()
        context['registration_form'] = form
    return render(request, 'mainapp/register.html', context)
    
@csrf_exempt
def loginview(request):
    context = {}

    user = request.user
    if user.is_authenticated:
        return redirect('index')
    
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)

            if user:
                login(request, user)
                return redirect('index')
            
    else:
        form = LoginForm()

    context['login_form'] = form
    return render(request, 'mainapp/login.html', context)


# def signup(request):
#     if request.method == "POST":
#         form = UserCreationForm(request.POST)
        
#         if form.is_valid():
#             user = form.save()
#             login(request, user)
#             return redirect('/')
#     else:
#         form = UserCreationForm()

#     return render(request,'templates/registration/signup.html', {'form': form})
#      #       username = form.cleaned_data['username']
#       #      password = form.cleaned_data['password1']
#        #     user = authenticate(username=username,passeord=password)
#         #    messages.success(request, ("Signup successful"))
#          #   return redirect(index)
#     #return render(request, 'registration/signup.html')
#     #pass


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


#---------------------------------------------------
# api functions (from web programming way) 


# @csrf_exempt
# def moods_api(request) -> HttpResponse:
#     '''
#     API method. If request method is GET, all objects within database are returned
#     If method is POST then object is sent.
#   '''

#     if request.method == 'GET':

#         return JsonResponse({
#             'moods': [
#                 mood.to_dict()
#                 for mood in Mood.objects.all()
#             ]
#     }) 


#     if request.method == 'POST':
#         m= json.loads(request.body)

#         mood_added = Mood.objects.create(
#         mood_choice = m["mood_choice"],
#         mood_date = m["mood_date"],)

#         mood_added.save()
#         return JsonResponse(m)
