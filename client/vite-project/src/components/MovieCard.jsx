import { use } from "react";
import "../styles/MovieCard.css";
import API from "../services/api";

function MovieCard({ movie }) {
    const userId = localStorage.getItem("userId");
    const addToWatchlist = async () => {
        
        try {

            await API.post(
                "/watchlist",
                null,
                {
                    params: {
                        user_id: userId,
                        movie_title: movie.title
                    }
                }
            );

            alert("Added to watchlist");

        } catch (error) {

            console.log(error);
        }
    };
    return (
        <div className="movie-card">
            <div className="poster-wrap">
                {movie.poster ? (
                    <img
                        src={movie.poster}
                        alt={movie.title}
                    />
                ) : (
                    <div className="no-poster">No Poster</div>
                )}
            </div>
                    <p>No Poster</p>
                )

            <h3>{movie.title}</h3>
            <button onClick={addToWatchlist}>
                Add to Watchlist
            </button>

            <div className="movie-info">
                <h3>{movie.title}</h3>
                <button className="btn" onClick={addToWatchlist}>Add</button>
            </div>
        </div>
    );
}

export default MovieCard;
