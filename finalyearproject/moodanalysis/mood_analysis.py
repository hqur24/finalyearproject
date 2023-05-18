import pandas as pd
from django.db import connection
# from sklearn.tree import DecisionTreeClassifier
# from sklearn.model_selection import train_test_split
# from sklearn.metrics import accuracy_score

def generate_dataframe(id):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT mainapp_mood.id, mainapp_customuser.id, mood_date, mood_choice FROM mainapp_mood INNER JOIN mainapp_customuser ON mainapp_mood.author_id = mainapp_customuser.id WHERE mainapp_mood.author_id='{id}'")
        
        rows = cursor.fetchall()
    dataframe = pd.DataFrame(rows, columns=['mood_id', 'author_id', 'mood_date', 'mood_choice'])
    dataframe['mood_date'] = pd.to_datetime(dataframe['mood_date'])
    print(dataframe)
    return dataframe

def generate_barchart(df):
    occurrences = df['mood_choice'].value_counts().to_dict()
    return occurrences

def generate_dates(df):
    df = df.sort_values(by=['mood_date'])
    firstrow = df.head(1)
    lastrow = df.tail(1)
    if firstrow.equals(lastrow) == True:
        return None
    df = pd.concat([firstrow, lastrow])
    df.insert(loc=0, column='Value', value=['First Entry', 'Latest Entry'])
    df = df.set_index('Value')
    dates = df.to_dict(orient='index')
    return dates

def weekday_count(df):
    df['week_day'] = df['mood_date'].dt.day_name()
    weekday_vals = df['week_day'].value_counts()
    df = weekday_vals.to_dict()
    return df

def happy_weekday_count(df):
    df['week_day'] = df['mood_date'].dt.day_name()
    df = df[df['mood_choice'] == 'Happy']
    happy_vals = df['week_day'].value_counts()
    df = happy_vals.to_dict()
    return df

def group_date(df):
    df['Week Ending'] = df['mood_date'] - pd.offsets.Week(weekday=0)
    weekly_data = df.groupby(pd.Grouper(key='Week Ending', freq='W')).size().reset_index(name='Count')
    weekly_data = weekly_data.to_dict(orient='index')
    return weekly_data