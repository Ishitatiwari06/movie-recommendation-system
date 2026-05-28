import { useState } from "react";
import API from "../services/api";

function Signup() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const handleSignup = async () => {

        try {

            await API.post(
                "/signup",
                null,
                {
                    params: {
                        username,
                        password
                    }
                }
            );

            alert("Signup successful");

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div>

            <h1>Signup</h1>

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

            <button onClick={handleSignup}>
                Signup
            </button>

        </div>
    );
}

export default Signup;