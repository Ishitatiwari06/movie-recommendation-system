import { use } from "react";
import "../styles/MovieCard.css";
import API from "../services/api";

function MovieCard({ movie }) {
    const userId = localStorage.getItem("userId");
    const addToWatchlist = async () => {
        
        try {

<<<<<<< HEAD
    const addToWatchlist = async () => {
        try {
=======
>>>>>>> 8c36bdb430514b78d5c5e9ecc4edfd2a03895d01
            await API.post(
                "/watchlist",
                null,
                {
                    params: {
<<<<<<< HEAD
                        user_id: 1,
=======
                        user_id: userId,
>>>>>>> 8c36bdb430514b78d5c5e9ecc4edfd2a03895d01
                        movie_title: movie.title
                    }
                }
            );

            alert("Added to watchlist");

        } catch (error) {
<<<<<<< HEAD
            console.error(error);
        }
    };

=======

            console.log(error);
        }
    };
>>>>>>> 8c36bdb430514b78d5c5e9ecc4edfd2a03895d01
    return (
        <div className="movie-card">
            <div className="poster-wrap">
                {movie.poster ? (
                    <img
                        src={movie.poster}
                        alt={movie.title}
                    />
                ) : (
<<<<<<< HEAD
                    <div className="no-poster">No Poster</div>
                )}
            </div>
=======
                    <p>No Poster</p>
                )
            }

            <h3>{movie.title}</h3>
            <button onClick={addToWatchlist}>
                Add to Watchlist
            </button>
>>>>>>> 8c36bdb430514b78d5c5e9ecc4edfd2a03895d01

            <div className="movie-info">
                <h3>{movie.title}</h3>
                <button className="btn" onClick={addToWatchlist}>Add</button>
            </div>
        </div>
    );
}

<<<<<<< HEAD
=======

>>>>>>> 8c36bdb430514b78d5c5e9ecc4edfd2a03895d01
export default MovieCard;
