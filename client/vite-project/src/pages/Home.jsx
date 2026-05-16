import { useState } from "react";
import API from "../services/api";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRecommendations = async (movie) => {

        try {

        setLoading(true);

        const res = await API.get(`/recommend/${movie}`);

        setMovies(res.data.recommendations);

    } catch (error) {

        console.log(error);

    } finally {

        setLoading(false);
    }
    };

    return (
        <div>

            <SearchBar onSearch={fetchRecommendations} />
            {
            loading && <p>Loading...</p>
            }
            {
                movies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        movie={movie}
                    />
                ))
            }

        </div>
    );
}

export default Home;