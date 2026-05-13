import { useState } from "react";
import API from "../services/api";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

function Home() {

    const [movies, setMovies] = useState([]);

    const fetchRecommendations = async (movie) => {

        const res = await API.get(`/recommend/${movie}`);

        setMovies(res.data.recommendations);
    };

    return (
        <div>

            <SearchBar onSearch={fetchRecommendations} />

            {
                movies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        title={movie}
                    />
                ))
            }

        </div>
    );
}

export default Home;