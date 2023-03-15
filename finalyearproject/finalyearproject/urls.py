"""finalyearproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django import views
from django.contrib import admin
from django.urls import path, include, re_path
# from rest_framework import routers
from mainapp.views import index, UserView,RegisterAPI, LoginAPI, CSRFTokenRetrieve, AuthenticationCheckAPI, LogoutAPI, UsersViewAPI # login_api, register_api, authenticated_api, logout_api, 
from rest_framework import routers
from django.views.generic import TemplateView
<<<<<<< Updated upstream
from mainapp import urls
=======
>>>>>>> Stashed changes

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('admin/', admin.site.urls),
<<<<<<< Updated upstream
    path('auth/login/', LoginAPI.as_view(), name='login'),
    path('auth/register/', RegisterAPI.as_view(), name='register'),
    path('auth/authenticated/', AuthenticationCheckAPI.as_view(), name='authenticated'),
    path('auth/logout/', LogoutAPI.as_view(), name='logout'),
=======
    path('', index),
    path('login/', LoginAPI.as_view(), name='login'),
    path('register/', RegisterAPI.as_view(), name='register'),
    path('authenticated/', AuthenticationCheckAPI.as_view(), name='authenticated'),
    path('logout/', LogoutAPI.as_view(), name='logout'),
>>>>>>> Stashed changes
    path('csrf_token/', CSRFTokenRetrieve.as_view(), name='csrf'),
    path('viewusers/', UsersViewAPI.as_view(), name='usersview'),
    path('', include('mainapp.urls')),
]

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
