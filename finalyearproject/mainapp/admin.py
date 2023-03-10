from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Mood, Exam, Assignment

# Register your models here.
CustomUser = get_user_model()

admin.site.register(CustomUser, UserAdmin)
# admin.site.register(UserAdmin)
admin.site.register(Mood)
admin.site.register(Exam)
admin.site.register(Assignment)