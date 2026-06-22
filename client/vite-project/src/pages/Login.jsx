import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setError("");
        if (!username || !password) {
            setError("Please enter username and password.");
            return;
        }
        try {
            setLoading(true);
            const res = await API.post(
                "/login",
                null,
                {
                    params: { username, password }
                }
            );

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", username);
            navigate("/");

        } catch (err) {
            console.error(err);
            setError("Login failed. Check credentials.");
        } finally {
            setLoading(false);
            
            // why? - Stores JWT token so user remains logged in after refresh.
            localStorage.setItem( 
                "token",
                res.data.token
            );
            localStorage.setItem(
                "userId",
                res.data.user_id
            );

            localStorage.setItem(
                "username",
                res.data.username
            );
            alert("Login successful");
            window.location.reload();

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div className="container">
            <div className="auth-card">
                <h2>Welcome back</h2>
                <form onSubmit={handleLogin}>
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
                            {loading ? "Signing in..." : "Login"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;