import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const username=localStorage.getItem("username");
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
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
        </nav>
    );
}

export default Navbar;