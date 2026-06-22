import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const username = localStorage.getItem("username");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link className="nav-brand" to="/">MovieLens</Link>
            </div>

            <div className="nav-center">
                {username ? (
                    <span className="welcome-pill">Welcome, {username}</span>
                ) : null}
            </div>

            <div className="nav-right">
                <Link to="/watchlist">Watchlist</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <button className="btn-danger" onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;