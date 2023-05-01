import pandas as pd
from django.db import connection

def count_assignments(id):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT mainapp_assignment.id, mainapp_customuser.id, assignment_title FROM mainapp_assignment INNER JOIN mainapp_customuser ON mainapp_assignment.author_id = mainapp_customuser.id WHERE mainapp_assignment.author_id='{id}'")
        
        rows = cursor.fetchall()
    dataframe = pd.DataFrame(rows, columns=['assignment_id', 'author_id', 'assignment_title'])
    val = len(dataframe)
    return val

def count_exams(id):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT mainapp_exam.id, mainapp_customuser.id, exam_name FROM mainapp_exam INNER JOIN mainapp_customuser ON mainapp_exam.author_id = mainapp_customuser.id WHERE mainapp_exam.author_id='{id}'")
        
        rows = cursor.fetchall()
    dataframe = pd.DataFrame(rows, columns=['exam_id', 'author_id', 'exam_name'])
    val = len(dataframe)
    return val

def count_applications(id):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT mainapp_application.id, mainapp_customuser.id, application_company FROM mainapp_application INNER JOIN mainapp_customuser ON mainapp_application.author_id = mainapp_customuser.id WHERE mainapp_application.author_id='{id}'")
        
        rows = cursor.fetchall()
    dataframe = pd.DataFrame(rows, columns=['application_id', 'author_id', 'application_company'])
    val = len(dataframe)
    return val  

def count_moods(id):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT mainapp_mood.id, mainapp_customuser.id, mood_date, mood_choice FROM mainapp_mood INNER JOIN mainapp_customuser ON mainapp_mood.author_id = mainapp_customuser.id WHERE mainapp_mood.author_id='{id}'")
        
        rows = cursor.fetchall()
    dataframe = pd.DataFrame(rows, columns=['mood_id', 'author_id', 'mood_date', 'mood_choice'])
    val = len(dataframe)
    return val


def calculate_points(a, e, p, m):
    points = (0.5*a) + (0.5*e) + (0.5*p) + (0.7*m)
    return points



def calculate_level(points):
    if points < 10:
        level = 1
    elif points < 20:
        level = 2
    elif points < 30:
        level = 3
    elif points < 40:
        level = 4
    elif points < 50:
        level = 5
    else:
        level = 0 #0 represents max level possible
    return level 

def calculate_points_away(points):
    if points < 10:
        away = 10-points
    elif points < 20:
        away = 20-points
    elif points < 30:
        away = 30-points
    elif points < 40:
        away = 40-points
    elif points < 50:
        away = 50-points
    # else:
    #     away = 0 
    return away     
