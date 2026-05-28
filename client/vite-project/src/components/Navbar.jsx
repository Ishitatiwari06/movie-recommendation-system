import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav>

            <Link to="/">Home</Link>

            <Link to="/login">Login</Link>

            <Link to="/signup">Signup</Link>

            <Link to="/watchlist">
                Watchlist
            </Link>

        </nav>
    );
}

const logout = () => {

    localStorage.removeItem("token");

    alert("Logged out");
};

<button onClick={logout}>
    Logout
</button>

export default Navbar;