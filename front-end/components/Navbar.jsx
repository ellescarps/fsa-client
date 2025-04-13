import { Link, Navigate, useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext";

function Navbar({ setSearchParams }) {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        logout();
        navigate("/");
    };


    return( 
        <>
            <div className="navbar">

            <div className="leftnav">
                <form>
                        <label>
                         🪄 {" "}
                         <input type="text" placeholder="search" onChange={(e) => setSearchParams(e.target.value.toLowerCase())} />
                         </label>
                  </form>
            </div>

            <div className="rightnav">
            <Link to="/">Home</Link>
            <Link to="/departments">Departments</Link>
            <Link to="/faculty">Faculty</Link>
        
        {!token ? (
            <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </>
        ) : (
            <div>
            <Link to="/account">Account</Link>
        
            <button onClick={handleLogout}>Logout</button>
            </div>
    )}
            </div>
            </div>

        </>
    )
}


export default Navbar