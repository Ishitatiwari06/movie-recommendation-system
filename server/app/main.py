from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle
import os
from dotenv import load_dotenv
import requests #to call TMDB API
from app.collaborative import recommend_movies
from app.database import engine
from app.models import Base
from app.database import SessionLocal
from app.models import User
from app.auth import hash_password
from app.auth import verify_password, create_access_token
from app.models import Watchlist

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

@app.get("/recommend/user/{user_id}")
def recommend_user(user_id: int):
    try:
        recommendations = recommend_movies(user_id)
        return {
            "success": True,
            "recommendations": recommendations
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

def hybrid_recommend(movie_name, user_id):

    content_recommendations = recommend(movie_name)

    collaborative_recommendations = recommend_movies(user_id)

    combined = list(
        set(
            content_recommendations +
            collaborative_recommendations
        )
    )

    return combined[:10]

@app.get("/recommend/hybrid/{user_id}/{movie_name}")
def hybrid(user_id: int, movie_name: str):

    recommendations = hybrid_recommend(
        movie_name,
        user_id
    )

    return {
        "success": True,
        "recommendations": recommendations
    }
# it will create all the tables linked to base
Base.metadata.create_all(bind=engine)

@app.post("/signup")
def signup(username: str, password: str):

    db = SessionLocal()

    user = User(
        username=username,
        password=hash_password(password)
    )

    db.add(user)

    db.commit()

    return {
        "success": True
    }

@app.post("/login")
def login(username: str, password: str):

    db = SessionLocal()

    user = db.query(User).filter(
        User.username == username
    ).first()

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    if not verify_password(
        password,
        user.password
    ):
        return {
            "success": False,
            "message": "Wrong password"
        }

    token = create_access_token(
        {"sub": username}
    )

    return {
        "success": True,
        "token": token
    }

@app.post("/watchlist")
def add_watchlist(user_id: int, movie_title: str):

    db = SessionLocal()

    item = Watchlist(
        user_id=user_id,
        movie_title=movie_title
    )

    db.add(item)

    db.commit()

    return {
        "success": True
    }

@app.get("/watchlist/{user_id}")
def get_watchlist(user_id: int):

    db = SessionLocal()

    items = db.query(Watchlist).filter(
        Watchlist.user_id == user_id
    ).all()

    return items