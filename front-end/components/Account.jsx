import { useState,useEffect } from "react"
import { API_URL } from "../API";
import {jwtDecode} from "jwt-decode";


function Account() {
const [adminData, setAdminData] = useState(null);
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true); 
const token = localStorage.getItem("token");


let id = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      id = decoded.id;
    } catch (err) {
      console.error("Failed to decode token:", err);
      setError("Invalid token");
    }
  }

  useEffect(() => {
    if (!token || !id) {
      setLoading(false);
      return;
    }


const fetchAdminData = async () => {
    try {
   
        const response = await fetch(`${API_URL}/admin/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch account data.");
        }

        const data = await response.json();
        setAdminData(data); 
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
};   
    fetchAdminData();
}, [token, id]);


if (!token) {
    return <p>You must be logged in to view your account.</p>;
}

if (loading) {
    return <p>Loading your account details...</p>;
}

if (error) {
    return <p>Error: {error}</p>;
}

    return(
        <div>
            <div className="acctback">
            <div className="acct">
             <h1>Welcome!</h1>

             <div className="div-acct">
                {adminData ? (
                    <div>
                        <p>Welcome, {adminData.email}</p>
                    </div>
                ) : (
                    <p>Loading your account details...</p>
                )}
            </div>
            </div>
            <p className="acctp"> ✨account updates and article submissions coming soon...✨</p>
            </div>    
       
        </div>
    )
}

export default Account