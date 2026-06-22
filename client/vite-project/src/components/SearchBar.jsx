import { useState } from "react";

function SearchBar({ onSearch }) {

    const [movie, setMovie] = useState("");

    const submit = () => {
        if (!movie) return;
        onSearch(movie.trim());
    };

    return (
        <div className="search-bar">
            <input
                className="search-input"
                type="text"
                placeholder="Search movie..."
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
            />

            <button className="btn" onClick={submit}>
                Recommend
            </button>
        </div>
    );
}

export default SearchBar;