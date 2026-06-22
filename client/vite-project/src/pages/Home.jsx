import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
<<<<<<< HEAD
    const [message, setMessage] = useState("");
=======
    const [message,setMessage]= useState("");
>>>>>>> 8c36bdb430514b78d5c5e9ecc4edfd2a03895d01
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
            setMovies(res.data.recommendations || []);

<<<<<<< HEAD
        } catch (error) {
            console.error(error);
            setMessage("Something went wrong. Try again.");
        } finally {
            setLoading(false);
        }
=======
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
>>>>>>> 8c36bdb430514b78d5c5e9ecc4edfd2a03895d01
    };

    return (
        <div className="container">
            <h1>Movie Recommendations</h1>

            <SearchBar onSearch={fetchRecommendations} />
<<<<<<< HEAD

            {loading && <p className="muted">Loading...</p>}
            {message && <p className="muted">{message}</p>}

            <div className="movies-grid">
=======
            {loading && <p>Loading...</p>}
            {message && <p>{message}</p>}
           
>>>>>>> 8c36bdb430514b78d5c5e9ecc4edfd2a03895d01
                {movies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        movie={movie}
                    />
                ))}
<<<<<<< HEAD
            </div>
=======

>>>>>>> 8c36bdb430514b78d5c5e9ecc4edfd2a03895d01
        </div>
    );
}

export default Home;