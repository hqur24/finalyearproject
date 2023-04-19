from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpRequest, HttpResponse, JsonResponse
import datetime, json
from rest_framework import viewsets, generics, status, permissions, serializers, exceptions
from .forms import RegistrationForm, LoginForm
from .serializers import ExamTypeSerializer, MoodSerializer, AssignmentSerializer, ExamSerializer, ApplicationSerializer, UserSerializer
from .models import CustomUser, Mood, Exam, Assignment, Application
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect

# Create your views here.

#EDIT FOR REDIRECTION
# def index(request):
#     if request.user.is_authenticated:
#         return HttpResponse("logged in")
#     else:
#         return HttpResponse("not logged in")
    



##### ------------------ ITEM (Moods, Assignments, Exams) VIEW FUNCTIONS ------------------------
@method_decorator(csrf_exempt, name='dispatch')
class MoodAPI(APIView):
    permission_classes =(permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['author'] = int|(request.user.id)
        print('Request data:', data)

        serializer = MoodSerializer(data=data)
        # if serializer.is_valid(raise_exception=True):
        #     serializer.save()
        #     print('serializer.data[\'author\']:', serializer.data['author'])  # <-- Debugging statement
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            print('serializer.data[\'author\']:', serializer.data['author'])  # <-- Debugging statement
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        username = request.user.username
        #print('Current user:', username)

        mood_data = []
        #for mood in Mood.objects.filter(author__username=username):
        for mood in Mood.objects.all():
            mood_item = {}
            user_data= {
                'username' : mood.author.username,
            }
            mood_item['id'] = mood.id 
            mood_item['mood_date'] = mood.mood_date
            mood_item['mood_choice'] = mood.mood_choice
            mood_item['author'] = user_data['username']

            mood_data.append(mood_item)
        return JsonResponse({'moods': mood_data})

@method_decorator(csrf_exempt, name='dispatch')
class AssignmentAPI(APIView):
    permission_classes =(permissions.AllowAny, )

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['author'] = int(request.user.id)
        print('Request data:', data)

        serializer = AssignmentSerializer(data=data)
        # if serializer.is_valid(raise_exception=True):
        #     serializer.save()
        #     print('serializer.data[\'author\']:', serializer.data['author'])  # <-- Debugging statement
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            print('serializer.data[\'author\']:', serializer.data['author'])  # <-- Debugging statement
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        assignment_data = []
        username = request.user.username

        # This if frontend is running on same port as Django
        #for assignment in Assignment.objects.filter(author__username=username):

        #This if frontend is running on :3000 port 
        for assignment in Assignment.objects.all():
            assignment_item = {}
            user_data= {
                'username' : assignment.author.username,
            }
            assignment_item['id'] = assignment.id
            assignment_item['assignment_title'] = assignment.assignment_title
            assignment_item['assignment_desc'] = assignment.assignment_desc
            assignment_item['assignment_due_date'] = assignment.assignment_due_date
            assignment_item['assignment_status'] = assignment.assignment_status
            assignment_item['author'] = user_data['username']

            assignment_data.append(assignment_item)

        
        assignment_data.sort(key=lambda x: x['assignment_due_date'])
        return JsonResponse({'assignments': assignment_data})
    
    def patch(self, request, assignment_id):
        updated_assignment = Assignment.objects.get(id=assignment_id)
        serializer = AssignmentSerializer(updated_assignment, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            print('serializer.data[\'author\']:', serializer.data['author'])  # <-- Debugging statement
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
@method_decorator(csrf_exempt, name='dispatch')
class ExamAPI(APIView):
    permission_classes =(permissions.AllowAny, )
    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['author'] = int|(request.user.id)
        print('Request data:', data)

        serializer = ExamSerializer(data=data)
        # if serializer.is_valid(raise_exception=True):
        #     serializer.save()
        #     print('serializer.data[\'author\']:', serializer.data['author'])  # <-- Debugging statement
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            print('serializer.data[\'author\']:', serializer.data['author'])  # <-- Debugging statement
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    def get(self, request):
        exam_data = []
        username = request.user.username

        # This if frontend is running on same port as Django
        #for exam in Exam.objects.filter(author__username=username):

        #This if frontend is running on :3000 port 
        for exam in Exam.objects.all():
            exam_item = {}
            user_data= {
                'username' : exam.author.username,
            }
            exam_item['id'] = exam.id
            exam_item['exam_name'] = exam.exam_name
            exam_item['exam_date'] = exam.exam_date
            exam_item['exam_type'] = exam.exam_type
            exam_item['exam_status'] = exam.exam_status
            exam_item['author'] = user_data['username']

            exam_data.append(exam_item)
        return JsonResponse({'exams': exam_data})
    
    def patch(self, request, exam_id):
        updated_exam = Exam.objects.get(id=exam_id)
        serializer = ExamSerializer(updated_exam, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            print('serializer.data[\'author\']:', serializer.data['author'])  # <-- Debugging statement
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
@method_decorator(csrf_exempt, name='dispatch')
class ApplicationAPI(APIView):
    permission_classes =(permissions.AllowAny, )

    def post(self, request, *args, **kwargs):
        data = request.data.copy()
        data['author'] = int(request.user.id)
        print('Request data:', data)

        serializer = ApplicationSerializer(data=data)
        # if serializer.is_valid(raise_exception=True):
        #     serializer.save()
        #     print('serializer.data[\'author\']:', serializer.data['author'])  # <-- Debugging statement
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            print('serializer.data[\'author\']:', serializer.data['author'])  # <-- Debugging statement
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        #return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        application_data = []
        username = request.user.username

        # This if frontend is running on same port as Django
        #for application in Application.objects.filter(author__username=username):

        #This if frontend is running on :3000 port 
        for application in Application.objects.all():
            application_item = {}
            user_data= {
                'username' : application.author.username,
            }

            application_item['id'] = application.id
            application_item['application_company'] = application.application_company
            application_item['application_deadline'] = application.application_deadline
            application_item['application_type'] = application.application_type
            application_item['application_notes'] = application.application_notes
            application_item['application_status'] = application.application_status
            application_item['author'] = user_data['username']

            application_data.append(application_item)

        
        application_data.sort(key=lambda x: x['application_deadline'])
        return JsonResponse({'applications': application_data})

    def patch(self, request, application_id):
        updated_application = Application.objects.get(id=application_id)
        serializer = ApplicationSerializer(updated_application, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            print('serializer.data[\'author\']:', serializer.data['author'])  # <-- Debugging statement
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    

##### ----------------- AUTHENTICATION VIEW FUNCTIONS -------------------------------------
#Register View Function
@method_decorator(csrf_exempt, name='dispatch')
class RegisterAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
    #     try:
    #         serializer = UserSerializer(data=request.data)
    #         if serializer.is_valid():
    #             serializer.create(request.data)
    #             return Response({"success": "User Created Successfully"})#, "data": serializer.data})

    #     except exceptions.ValidationError as e :
    #         return Response({"error": 'Error occured'})
        
        # else:
        #     return Response({"error": "An error occurred."})
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(request.data)
            return Response({"success": "User Created Successfully"})#, "data": serializer.data})

            # return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({"error": "An error occurred."})

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
            return Response({'success': 'Logged in successfully' , 'User' : serializer.data['username']})#, JsonResponse({'authenticated': True})
        else:
            return Response({'error': 'Invalid credentials'}) #status=status.HTTP_400_BAD_REQUEST)# , JsonResponse({'authenticated': True})

#CSRF Token View Function
@method_decorator(ensure_csrf_cookie, name='dispatch')
class CSRFTokenRetrieveAPI(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, format=None):
        return Response({ 'success': 'CSRF token set ' })
    
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
            return Response({'error': 'An error occurred when logging out.'})

#View all users API Function
class UsersViewAPI(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        users = CustomUser.objects.all()

        users = UserSerializer(users, many=True)
        return Response(users.data)
    
class GetCurrentUserAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


    
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

class ApplicationView(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    queryset = Application.objects.all()

# class ExamTypeView(APIView):
#     serializer_class = ExamTypeSerializer
#     queryset = Exam.objects.all()
