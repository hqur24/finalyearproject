from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate


from mainapp.models import CustomUser

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='Required')

    class Meta:
        model = CustomUser
        fields = ('username', 'email')


class LoginForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ('username', 'password')

    def clean(self):
        username = self.cleaned_data['username']
        password = self.cleaned_data['password']

        if not authenticate(username=username, password=password):
            raise forms.ValidationError("Invalid login attempt")



