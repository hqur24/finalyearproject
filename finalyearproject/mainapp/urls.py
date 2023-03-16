from django.urls import path, include

from . import views

# from mainapp.views import index, items_api, message_api
from django.conf.urls.static import static
from django.conf import settings 
from rest_framework import routers
from .views import MoodsAPI, ExamsAPI, AssignmentAPI, RegisterAPI, LoginAPI, LogoutAPI, AuthenticationCheckAPI, CSRFTokenRetrieveAPI, UsersViewAPI


router = routers.DefaultRouter()
# router.register(r'users', views.UserView, 'user')
router.register(r'moods', views.MoodView, 'mood')
router.register(r'assignments', views.AssignmentView, 'assignment')
router.register(r'exams', views.ExamView, 'exam')


urlpatterns = [
    path('', views.index, name='index'),
    path('api/', include(router.urls)),
    path('accounts/login/', LoginAPI.as_view(), name='login'),
    path('accounts/register/', RegisterAPI.as_view(), name='register'),
    path('accounts/authenticated/', AuthenticationCheckAPI.as_view(), name='authenticated'),
    path('accounts/logout/', LogoutAPI.as_view(), name='logout'),
    path('accounts/csrf_token/', CSRFTokenRetrieveAPI.as_view(), name='csrf'),
    path('viewusers/', UsersViewAPI.as_view(), name='usersview'),    path('items/moods/', MoodsAPI.as_view()),
    path('items/assignments/', AssignmentAPI.as_view()),
    path('items/exams/', ExamsAPI.as_view()),

]