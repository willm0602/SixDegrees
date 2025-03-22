import requests
import os
import json

API_KEY = os.environ['API_KEY']

def is_english(actor):
    roles = actor.get('known_for', [])
    for role in roles:
        lang = role.get('original_language')
        if lang == 'en':
            return True
    return False

def get_popularity_scores():
    actors = []
    for page in range(1, 16):
        URL = f'https://api.themoviedb.org/3/person/popular?page={page}&api_key={API_KEY}&language=en-US'
        resp = requests.get(URL)
        actors.extend(resp.json()['results'])
    actors = filter(is_english, actors)
    actors = sorted(actors, key=lambda a: a.get('popularity'))
    print(json.dumps(actors, indent=4))

get_popularity_scores()
