from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import os
from dotenv import load_dotenv
import requests #to call TMDB API

load_dotenv()

TMDB_API_KEY = os.getenv("TMDB_API_KEY")

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Movie Recommendation API"}

# CORS -cross-origin resource sharing
# allows frontend to access backend resources from different origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

movies = pickle.load(open("models/movie_list.pkl", "rb"))
similarity = pickle.load(open("models/similarity.pkl", "rb"))

@app.get("/recommend/{movie_name}")
def recommend(movie_name: str):

    matched_movies = movies[
    movies['title'].str.contains(movie_name, case=False, na=False)
]

    if matched_movies.empty:
        return {
            "success": False,
            "message": "Movie not found",
            "recommendations": []
        }

    movie_index = matched_movies.index[0]

    distances = similarity[movie_index]

    movies_list = sorted(
        list(enumerate(distances)), #enumerate() - returns index and value as a tuple
        reverse=True,
        key=lambda x: x[1] #sort by similarity score
    )[1:6]

    recommendations = []

    for i in movies_list:
        recommendations.append({
            "title": movies.iloc[i[0]].title,
            "poster": fetch_poster(
                movies.iloc[i[0]].title
            )
        })

    return {
        "success": True,
        "recommendations": recommendations
    }

def fetch_poster(movie_title):

    if not TMDB_API_KEY:
        return None

    url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDB_API_KEY}&query={movie_title.split('(')[0].strip()}"

    try:
        response = requests.get(url, timeout=10) #sends req
        response.raise_for_status()
        data = response.json()
    except requests.RequestException:
        return None
    except ValueError:
        return None

    if data.get('results'):

        poster_path = data['results'][0]['poster_path']

        return f"https://image.tmdb.org/t/p/w500{poster_path}"

    return None