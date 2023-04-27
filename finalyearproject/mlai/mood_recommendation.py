from mainapp.models import Mood, CustomUser
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder

def analyse_mood(request):
    username = request.user.username
    moods = Mood.objects.filter(author__username=username)
    list_moods = [mood_choice.mood_choice.lower() for mood_choice in moods]

    print('username:', username)
    print('list_moods:', list_moods)
    print("all options", set(list_moods))

    mood_choices = ['happy', 'sad', 'tired', 'excited', 'angry']

    # Use set union to get all possible mood choices
    all_options = set(list_moods) | set(mood_choices)
    all_options = [mood_choice for mood_choice in mood_choices if mood_choice in all_options]

    label_encoder = LabelEncoder()
    label_encoder.fit(all_options)

    # Transform the last 7 mood choices to integer labels
    last_7_labels = label_encoder.transform(list_moods[-7:])

    X = [list_moods[i:i+7] for i in range(len(list_moods)-6)]
    X_encoded = label_encoder.transform(X)

    model = LogisticRegression()
    model.fit(X, X_encoded.ravel())

    predicted_mood = label_encoder.inverse_transform(model.predict([last_7_labels]))[0]

    if predicted_mood == 'happy':
        recommendation = 'You seem to be in a good mood! You could try doing something that makes you happy, like watching a movie or hanging out with friends.'
    elif predicted_mood == 'sad':
        recommendation = 'It seems like you\'ve been feeling sad lately. How about trying some self-care activities, like taking a relaxing bath or listening to calming music?'
    elif predicted_mood == 'stressed':
        recommendation = 'It looks like you\'ve been feeling stressed lately. You could try practicing mindfulness or doing some breathing exercises to help you relax.'
    else:
        recommendation = 'It seems like your mood has been pretty neutral lately. How about trying a new hobby or activity to spice things up?'

    return recommendation








def analyse_mood_2(request):
    # username = request.POST.get('username')
    # user = CustomUser.objects.get(username=username)
    # Retrieve the last 7 moods for the user
    username = request.user.username

    moods = Mood.objects.filter(author__username=username)
    list_moods = [mood_choice.mood_choice.lower() for mood_choice in moods]


    # Train the Naive Bayes classifier
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(list_moods)
    y = range(len(list_moods))
    clf = MultinomialNB()
    clf.fit(X, y)

    # Predict the user's mood
    predicted_mood = clf.predict(vectorizer.transform([list_moods[-1]]))[0]
    print("predicted moooooood:", predicted_mood)

    return predicted_mood