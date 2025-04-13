import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { API_URL } from "../API";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [generalError, setGeneralError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();
    const { token, login } = useAuth();

    async function handleSubmit(event) {
        event.preventDefault();


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email && !password) {
            alert("Please Register your account.");
            return;
        }

        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            return;
        } else {
            setEmailError(null);
        }

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long");
            return;
        } else {
            setPasswordError(null);
        }

        const formData = {
            email,
            password,
        };

        try {
            const response = await fetch(`${API_URL}/admin/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            console.log("response", response);
            const result = await response.json();

            if (!response.ok) {
                setGeneralError(result.message || "Registration failed.");
                return;
              }
            
              if (result.token) {
                localStorage.setItem("token", result.token);
                login(result.token);
                setSuccessMessage("Registration successful!");
              } else {
                setGeneralError("Registration failed. Please try again.");
              }
            } catch (error) {
              setGeneralError("Something went wrong. Please try again.");
            }
    }


const handleAuthenticateClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
        alert(`Token: ${token}`);
        navigate("/account");
    } else {
        alert("No token found. Please register or log in first");
    }
}


    return(
        <>

             <h3>Register</h3>

            <div>
            <form className="registerForm" onSubmit={handleSubmit}>
                    
                        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                            <br />
                        </label>

                        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
                        <label>
                            Password: 
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                            <br />
                        </label>
                        <br />

                        <div className="regbutton">
                            <button type="submit">Register</button>
                        </div>

                        <div>
                            <br />
                            <h2 className="title">Authenticate</h2>
                            {successMessage && <p>{successMessage}</p>}
                            {generalError && <p style={{ color: "red" }}>{generalError}</p>}

                            <div className="regbutton">
                                <button onClick={handleAuthenticateClick}>Authenticate Token</button>
                            </div>
                        </div>
                    </form>
            </div>










        </>
    );
}

export default Register