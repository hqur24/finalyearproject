# Generated by Django 4.1 on 2023-03-13 23:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0013_alter_customuser_managers'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exam',
            name='exam_type',
            field=models.CharField(choices=[('Final', 'Final Exam'), ('Midterm', 'Midterm'), ('Termtime', 'Termtime Exam'), ('Quiz', 'Quiz/MCQ')], default='Final', max_length=10),
        ),
        migrations.AlterField(
            model_name='mood',
            name='mood_choice',
            field=models.CharField(choices=[('Happy', 'Happy'), ('Sad', 'Sad'), ('Tired', 'Tired'), ('Angry', 'Angry'), ('Excited', 'Excited')], default='Happy', max_length=10),
        ),
    ]