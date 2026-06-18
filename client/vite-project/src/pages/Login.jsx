import { useState } from "react";
import API from "../services/api";

function Login() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const res = await API.post(
                "/login",
                null,
                {
                    params: {
                        username,
                        password
                    }
                }
            );
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

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div>

            <h1>Login</h1>

            <input
                type="text"
                placeholder="Username"
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>
    );
}

export default Login;