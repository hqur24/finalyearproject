# Generated by Django 4.1 on 2023-03-08 16:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0004_assignments_exams_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Assignments',
            new_name='Assignment',
        ),
        migrations.RenameModel(
            old_name='Exams',
            new_name='Exam',
        ),
        migrations.RenameModel(
            old_name='Moods',
            new_name='Mood',
        ),
    ]
