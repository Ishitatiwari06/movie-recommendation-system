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

export default MovieCard;
