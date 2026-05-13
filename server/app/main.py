from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pickle

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Movie Recommendation API"}

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
        list(enumerate(distances)),
        reverse=True,
        key=lambda x: x[1]
    )[1:6]

    recommendations = []

    for i in movies_list:
        recommendations.append(
            movies.iloc[i[0]].title
        )

    return {
        "success": True,
        "recommendations": recommendations
    }