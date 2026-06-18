import { use } from "react";
import "../styles/MovieCard.css";

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

            {
                movie.poster ? (
                    <img
                        src={movie.poster}
                        alt={movie.title}
                        width="200"
                    />
                ) : (
                    <p>No Poster</p>
                )
            }

            <h3>{movie.title}</h3>
            <button onClick={addToWatchlist}>
                Add to Watchlist
            </button>

        </div>
    );
}


export default MovieCard;
