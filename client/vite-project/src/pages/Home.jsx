import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message,setMessage]= useState("");
    const navigate = useNavigate();

    useEffect(() => {

        if (!localStorage.getItem("token")) {
            navigate("/login");
        }

    }, []);

    const fetchRecommendations = async (movie) => {

        try {

        setLoading(true);

        const res = await API.get(`/recommend/${movie}`);
        if (!res.data.success) {
            setMessage("No matching results found");
            setMovies([]);
            return;
        }
        setMessage("");
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
            {loading && <p>Loading...</p>}
            {message && <p>{message}</p>}
           
                {movies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        movie={movie}
                    />
                ))}

        </div>
    );
}

export default Home;