import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

ratings = pd.read_csv("data/ml-latest-small/ratings.csv")
movies = pd.read_csv("data//ml-latest-small/movies.csv")

user_movie_matrix = ratings.pivot_table(
    index='userId',
    columns='movieId',
    values='rating'
).fillna(0)

user_similarity = cosine_similarity(
    user_movie_matrix
)

user_similarity_df = pd.DataFrame(
    user_similarity,
    index=user_movie_matrix.index,
    columns=user_movie_matrix.index
)

def recommend_movies(user_id, num_recommendations=5):

    similar_users = user_similarity_df[user_id]\
        .sort_values(ascending=False)[1:11]

    watched_movies = ratings[
        ratings['userId'] == user_id
    ]['movieId'].values

    recommended_movies = {}

    for similar_user, similarity_score in similar_users.items():

        user_ratings = ratings[
            ratings['userId'] == similar_user
        ]

        for _, row in user_ratings.iterrows():

            movie_id = row['movieId']

            if movie_id in watched_movies:
                continue

            rating = row['rating']

            if movie_id not in recommended_movies:
                recommended_movies[movie_id] = 0

            recommended_movies[movie_id] += (
                rating * similarity_score
            )

    sorted_movies = sorted(
        recommended_movies.items(),
        key=lambda x: x[1],
        reverse=True
    )

    recommendations = []

    for movie_id, _ in sorted_movies[:num_recommendations]:

        movie_title = movies[
            movies['movieId'] == movie_id
        ]['title'].values[0]

        recommendations.append(movie_title)

    return recommendations