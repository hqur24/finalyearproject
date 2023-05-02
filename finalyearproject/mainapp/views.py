from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpRequest, HttpResponse, JsonResponse
import datetime, json
from rest_framework import viewsets, generics, status, permissions, serializers, exceptions
from .forms import RegistrationForm, LoginForm
# from .serializers import ExamTypeSerializer, MoodSerializer, AssignmentSerializer, ExamSerializer, ApplicationSerializer, UserSerializer
# from .models import CustomUser, Mood, Exam, Assignment, Application
from .serializers import *
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie, csrf_protect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from django.db.models import Q

from moodanalysis.mood_analysis import *
from pointsystem.point_system import *

##### ------------------ ITEM (Moods, Assignments, Exams) VIEW FUNCTIONS ------------------------
@method_decorator(csrf_exempt, name='dispatch')
class MoodAPI(APIView):
    #permission_classes =(permissions.IsAuthenticated,)

    def post(self, request):
        username = request.user.username

        if not request.user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data
        inputted_date = data.get('mood_date')

        #Filtering query which checks that there arent any existing entries from the same user for the same date already in the database.
        existing_check = Mood.objects.filter(Q(author__username=username) & Q(mood_date=inputted_date)).first()

        #If entry exists, return conflict error. 
        if existing_check:
            return Response({'exists': 'A mood entry for this user and date already exists.'}, status=status.HTTP_409_CONFLICT)

        serializer = MoodSerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        username = request.user.username
      
        mood_data = []
        for mood in Mood.objects.filter(author__username=username):
        #for mood in Mood.objects.all():
            mood_item = {}
            user_data= {
                'username' : mood.author.username,
            }
            mood_item['id'] = mood.id 
            mood_item['mood_date'] = mood.mood_date
            mood_item['mood_choice'] = mood.mood_choice
            mood_item['author'] = user_data['username']

            mood_data.append(mood_item)
        mood_data.sort(key=lambda x: x['mood_date'], reverse=True)
        return JsonResponse({'moods': mood_data})
    
    def delete(self, request, mood_id):
        deleted_mood= Mood.objects.get(id=mood_id)
        try:
            deleted_mood.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class AssignmentAPI(APIView):
    #permission_classes =(permissions.IsAuthenticated, )

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data
        data['author'] = int(request.user.id)

        serializer = AssignmentSerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        assignment_data = []
        username = request.user.username

        for assignment in Assignment.objects.filter(author__username=username):
        #for assignment in Assignment.objects.all():
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
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, assignment_id):
        deleted_assignment = Assignment.objects.get(id=assignment_id)
        try:
            deleted_assignment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
@method_decorator(csrf_exempt, name='dispatch')
class ExamAPI(APIView):
    #permission_classes =(permissions.AllowAny, )

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data
        data['author'] = int(request.user.id)

        serializer = ExamSerializer(data=data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        exam_data = []
        username = request.user.username

        for exam in Exam.objects.filter(author__username=username):
        #for exam in Exam.objects.all():
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
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, exam_id):
        deleted_exam = Exam.objects.get(id=exam_id)
        try:
            deleted_exam.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
@method_decorator(csrf_exempt, name='dispatch')
class ApplicationAPI(APIView):
    permission_classes =(permissions.AllowAny, )

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        data = request.data
        data['author'] = int(request.user.id)

        serializer = ApplicationSerializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        application_data = []
        username = request.user.username

        for application in Application.objects.filter(author__username=username):
        #for application in Application.objects.all():
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
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, application_id):
        deleted_application = Application.objects.get(id=application_id)
        try:
            deleted_application.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        except serializers.ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
    
##### ----------------- MOOD MACHINE LEARNING VIEW FUNCTIONS -------------------------------------
class MoodAnalysisAPI(APIView):
    def get(self, request, id):
        df = generate_dataframe(id)
        barchart = generate_barchart(df)
        dates = generate_dates(df)
        return JsonResponse({'occurrences': barchart, 'dates': dates})
    
class PointSystemAPI(APIView):
    def get(self, request, id):
        assignments_no = count_assignments(id)
        exams_no = count_exams(id)
        applications_no = count_applications(id)
        moods_no = count_moods(id)

        points_calc = calculate_points(assignments_no, exams_no, applications_no, moods_no)
        level_calc = calculate_level(points_calc)
        away_calc = calculate_points_away(points_calc)
        return JsonResponse({'points': points_calc, 'level': level_calc, 'away': away_calc})
    
        # return JsonResponse({'points': points_calc, 'level': level_calc, 'assignments num': assignments_no, 'exams num': exams_no, 'applications num': applications_no, 'moods num': moods_no})


##### ----------------- AUTHENTICATION VIEW FUNCTIONS -------------------------------------
#Register View Function
@method_decorator(csrf_exempt, name='dispatch')
class RegisterAPI(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(request.data)
            return Response({"success": "User Created Successfully"})#, "data": serializer.data})
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
    
class GetExtraCurrentUserAPI(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        serializer = ExtraUserSerializer(request.user)
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
