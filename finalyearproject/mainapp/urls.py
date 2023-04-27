from django.urls import path, include, re_path
from django.views.generic import TemplateView
from . import views

# from mainapp.views import index, items_api, message_api
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from .views import MoodAPI, ExamAPI, AssignmentAPI, ApplicationAPI, RegisterAPI, LoginAPI, LogoutAPI, AuthenticationCheckAPI, CSRFTokenRetrieveAPI, UsersViewAPI, GetCurrentUserAPI, mlai_mood


router = routers.DefaultRouter()
# router.register(r'users', views.UserView, 'user')
router.register(r'moods', views.MoodView, 'mood')
router.register(r'assignments', views.AssignmentView, 'assignment')
router.register(r'exams', views.ExamView, 'exam')
router.register(r'applications', views.ApplicationView, 'application')


urlpatterns = [
    # path('', views.index, name='index'),
    # path('api/', include(router.urls)),
    path('accounts/login/', LoginAPI.as_view(), name='login'),
    path('accounts/register/', RegisterAPI.as_view(), name='register'),
    path('accounts/authenticated/',
         AuthenticationCheckAPI.as_view(), name='authenticated'),
    path('accounts/logout/', LogoutAPI.as_view(), name='logout'),
    path('accounts/csrf_token/', CSRFTokenRetrieveAPI.as_view(), name='csrf'),
    path('accounts/currentuser/', GetCurrentUserAPI.as_view(), name='currentuser'),
    path('accounts/viewusers/', UsersViewAPI.as_view(), name='usersview'),
    path('items/moods/', MoodAPI.as_view()),
    path('items/assignments/', AssignmentAPI.as_view(), name='assignments'),
    path('items/exams/', ExamAPI.as_view()),
    path('items/applications/', ApplicationAPI.as_view()),
    path('items/assignments/<int:assignment_id>/',
         AssignmentAPI.as_view(), name='assignment-individual'),
    path('items/analyse_mood', mlai_mood, name='analyse_mood'),

    path('api/', include(router.urls)),


]

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
