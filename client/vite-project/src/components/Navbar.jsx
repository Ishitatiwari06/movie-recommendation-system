import { Link, useNavigate } from "react-router-dom";

function Navbar() {
<<<<<<< HEAD
    const navigate = useNavigate();
    const username=localStorage.getItem("username");
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
=======
    const username =
    localStorage.getItem("username");
    const logout = () => {
>>>>>>> 8c36bdb430514b78d5c5e9ecc4edfd2a03895d01

        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");

        alert("Logged out");
    };
    return (
<<<<<<< HEAD
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/">Home</Link>
            </div>
            <div className="nav-center">
                {username && <span className="welcome">Welcome, {username}!</span>}
            </div>
            <div className="nav-right">
                <Link to="/watchlist">Watchlist</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <button className="btn-danger" onClick={logout}>Logout</button>
            </div>
=======

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

>>>>>>> 8c36bdb430514b78d5c5e9ecc4edfd2a03895d01
        </nav>
    );
}

export default Navbar;