import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Watchlist() {

    const [movies, setMovies] = useState([]);
    const navigate=useNavigate();
// Runs code when component loads. (mounting)
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
            return;
        }
        fetchWatchlist();

    }, []);

    const fetchWatchlist = async () => {

        try {

            const res = await API.get(
                "/watchlist/1"
            );

            setMovies(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div>

            <h1>My Watchlist</h1>

            {
                
                movies.length === 0 ? (
                    <p>No movies in watchlist.</p>
                ) : (
                    movies.map((movie, index) => (

                        <p key={index}>
                            {movie.movie_title}
                        </p>
                    ))
                )

            }

        </div>
    );
}

export default Watchlist;