import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        if (e) e.preventDefault();
        setError("");
        if (!username || !password) {
            setError("Username and password are required.");
            return;
        }
        try {

            await API.post( //(url,req body,params)
                "/signup",
                null,
                { params: { username, password } }
            );

            localStorage.setItem("username", username);
            navigate("/login");

        } catch (err) {
            console.error(err);
            setError("Signup failed. Try a different username.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="auth-card">
                <h2>Create account</h2>
                <form onSubmit={handleSignup}>
                    <div className="form-field">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <input
                            className="search-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <p className="muted">{error}</p>}

                    <div style={{ marginTop: 12 }}>
                        <button className="btn" disabled={loading}>
                            {loading ? "Creating..." : "Signup"}
                        </button>
                    </div>
                </form>
                <div style={{ marginTop: "15px", textAlign: "center" }}>
                    <p>
                        Already a user?{" "}
                        <button
                            type="button"
                            className="link-btn"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;