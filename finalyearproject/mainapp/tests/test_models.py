from django.test import TestCase
from mainapp.models import CustomUser, Mood, Assignment, Exam, Application
from django.contrib.auth import get_user_model
from datetime import date

# ITEM MODEL TESTS 
class testMoods(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='testuser',
                                                         email='testuser@example.com',
                                                         password='testpass')
        self.mood = Mood.objects.create(
            mood_choice=Mood.HAPPY,
            mood_date=date.today(),
            author=self.user
        )

    def testMoodDict(self):
        expected_dict = {
            'mood_choice': Mood.HAPPY,
            'mood_date': date.today(),
            'author': self.user,
        }
        self.assertEqual(self.mood.to_dict(), expected_dict)

    def testMoodStr(self):
        expected_string = f"({Mood.HAPPY}, {date.today()}, {self.user.username})"
        self.assertEqual(str(self.mood), expected_string)


class testAssignments(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='testuser',
                                                         email='testuser@example.com',
                                                         password='testpass')
        self.assignment = Assignment.objects.create(
            assignment_title='test title',
            assignment_desc='test desc',
            assignment_due_date=date.today(),
            assignment_status=False,
            author=self.user
        )

    def testAssignmentDict(self):
        expected_dict = {
            'assignment_title': 'test title',
            'assignment_desc': 'test desc',
            'assignment_due_date': date.today(),
            'assignment_status': False,
            'author': self.user,
        }
        self.assertEqual(self.assignment.to_dict(), expected_dict)

    def testAssignmentStr(self):
        expected_string = f"({'test title'}, {'test desc'}, {date.today()}, {False}, {self.user.username})"

        self.assertEqual(str(self.assignment), expected_string)


class testExams(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='testuser',
                                                         email='testuser@example.com',
                                                         password='testpass')
        self.exam = Exam.objects.create(
            exam_name='test exam name',
            exam_date=date.today(),
            exam_type=Exam.MIDTERM,
            exam_status=False,
            author=self.user
        )

    def testExamDict(self):
        expected_dict = {
            'exam_name': 'test exam name',
            'exam_date': date.today(),
            'exam_type': Exam.MIDTERM,
            'exam_status': False,
            'author': self.user,
        }
        self.assertEqual(self.exam.to_dict(), expected_dict)

    def testExamStr(self):
        expected_string = f"({'test exam name'}, {date.today()}, {Exam.MIDTERM}, {False}, {self.user.username})"

        self.assertEqual(str(self.exam), expected_string)


class testApplications(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='testuser',
                                                         email='testuser@example.com',
                                                         password='testpass')
        self.application = Application.objects.create(
            application_company='test company',
            application_deadline=date.today(),
            application_type=Application.GraduateJob,
            application_notes='test application notes',
            application_status=False,
            author=self.user
        )

    def testApplicationDict(self):
        expected_dict = {
            'application_company': 'test company',
            'application_deadline': date.today(),
            'application_type': Application.GraduateJob,
            'application_notes': 'test application notes',
            'application_status': False,
            'author': self.user
        }
        self.assertEqual(self.application.to_dict(), expected_dict)

    def testApplicationStr(self):
        expected_string = f"({'test company'}, {date.today()}, {Application.GraduateJob}, {'test application notes'}, {False}, {self.user.username})"
        self.assertEqual(str(self.application), expected_string)
