import { Link } from "react-router-dom";

function Navbar() {
    const username =
    localStorage.getItem("username");
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");

        alert("Logged out");
    };
    return (

        <nav>
            <p>Welcome {username}</p>
            <Link to="/">Home</Link>

            <Link to="/login">Login</Link>

            <Link to="/signup">Signup</Link>

            <Link to="/watchlist">
                Watchlist
            </Link>
            <button onClick={logout}>
                Logout
            </button>

        </nav>
    );
}

export default Navbar;