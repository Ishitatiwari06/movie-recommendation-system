import { useEffect, useState } from "react";
import API from "../services/api";

function Watchlist() {

    const [movies, setMovies] = useState([]);

    useEffect(() => {

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
                movies.map((movie, index) => (

                    <p key={index}>
                        {movie.movie_title}
                    </p>
                ))
            }

        </div>
    );
}

export default Watchlist;