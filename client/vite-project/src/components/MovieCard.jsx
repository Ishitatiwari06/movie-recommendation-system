import "../styles/MovieCard.css";

function MovieCard({ movie }) {

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

        </div>
    );
}

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

        console.log(error);
    }
};

<button onClick={addToWatchlist}>
    Add to Watchlist
</button>

export default MovieCard;
