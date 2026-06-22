import "../styles/MovieCard.css";
import API from "../services/api";

function MovieCard({ movie }) {

    const addToWatchlist = async () => {
        try {
            await API.post(
                "/watchlist",
                null,
                {
                    params: {
                        user_id: 1,
                        movie_title: movie.title
                    }
                }
            );

            alert("Added to watchlist");

        } catch (error) {
            console.error(error);
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

            <div className="movie-info">
                <h3>{movie.title}</h3>
                <button className="btn" onClick={addToWatchlist}>Add</button>
            </div>
        </div>
    );
}

export default MovieCard;
