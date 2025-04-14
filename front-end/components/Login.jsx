import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../API";
import { useAuth } from "./AuthContext"; 



function Login() {
 const { login } = useAuth();
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [emailError, setEmailError] = useState(null);
 const [passwordError, setPasswordError] = useState(null);
 const [generalError, setGeneralError] = useState(null);  
 const navigate = useNavigate();


async function handleSubmit(event) {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null)

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


    try {
        const response = await fetch(`${API_URL}/admin/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();

        if (!response.ok) {
            setGeneralError(result.error || "Invalid email or password");
            return;
        }


        localStorage.setItem("token", result.token);
        localStorage.setItem("adminId", result.admin.id);  

       if (result.token) {
        login(result.token);  
        alert("Login Successful!");
        navigate("/account");
      } else {
        setGeneralError("Login failed, Please check your credentials.");
      }
    } catch (error) {
      setGeneralError("Login failed. Please check your credentials.");
    }
  }



 return (
    <div>

      
    <div className="logBox">
        <div className="logContainer">
                <div className="h6div">
                     <h6>Login</h6>
             </div>
    

        <div>
        <form className="loginForm" onSubmit={handleSubmit}>
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            <label>
                Email: 
                <input type="email" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            </label>

            {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            <label>
                Password: 
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            </label>

            {generalError && <p style={{ color: "red" }}>{generalError}</p>}

            <button type="submit">Login</button>
        </form>
        </div>
        </div>
        </div>


        

    </div>


 )
}

export default Login