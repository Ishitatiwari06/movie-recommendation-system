import { useState } from "react";

function SearchBar({ onSearch }) {

    const [movie, setMovie] = useState("");

    return (
        <div>
            <input
                type="text"
                placeholder="Search movie..."
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
            />

            <button onClick={() => onSearch(movie)}>
                Recommend
            </button>
        </div>
    );
}

export default SearchBar;