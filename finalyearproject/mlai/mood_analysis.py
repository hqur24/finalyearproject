import pandas as pd
from django.db import connection
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

def generate_dataframe(id):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT mainapp_mood.id, mainapp_customuser.id, mood_date, mood_choice FROM mainapp_mood INNER JOIN mainapp_customuser ON mainapp_mood.author_id = mainapp_customuser.id WHERE mainapp_mood.author_id='{id}'")
        
        rows = cursor.fetchall()
    #print(rows)
    dataframe = pd.DataFrame(rows, columns=['mood_id', 'author_id', 'mood_date', 'mood_choice'])
    print(dataframe.to_string())

    print("types:" , dataframe.dtypes)
    dataframe['mood_date'] = pd.to_datetime(dataframe['mood_date'])
    print("updated:" , dataframe.dtypes)
    return dataframe



def generate_piechart(df):
    occurrences = df['mood_choice'].value_counts().to_dict()
    print(type(occurrences))
    #occurrences = dict(occurrences)
    print(occurrences)
    return occurrences


    # occurrences.plot.pie(figsize=(5, 5), autopct='%1.1f%%', startangle=90)
    # plt.show()
