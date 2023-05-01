from django.test import TestCase, Client
from mainapp.models import CustomUser, Mood, Assignment, Exam, Application
from django.contrib.auth import get_user_model, get_user
from datetime import date

# AUTHENTICATION MODEL TESTS 
class testRegister(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='testUser',
                                                         email='user@testing.com',
                                                         password='testpass')
    def testRegisterCorrect(self):
        self.assertEqual(self.user.username, 'testUser')
        self.assertEqual(self.user.email, 'user@testing.com')
        self.assertTrue(self.user.check_password('testpass'))

    def testRegisterIncorrect(self):
        with self.assertRaises(ValueError): get_user_model().objects.create_user(username='',
                                                         email='incorrectuser@testing.com',
                                                         password='wrongpass')

class testLogin(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='testUser',
                                                         email='user@testing.com',
                                                         password='testpass')
    def testLoginCorrect(self):
        login = self.client.login(username='testUser', password='testpass')
        self.assertTrue(login)

    def testLoginIncorrect(self):
        login = self.client.login(username='wrongUser', password='wrongpass')
        self.assertFalse(login)



