import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { API_URL } from "../API";

function SingleFaculty() {
    const {id} = useParams();
    const [faculty,setFaculty] = useState(null);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const token = localStorage.getItem("token"); 

useEffect( () => {
    setIsLoggedIn(!!token);
}, [token]);

async function fetchSingleFaculty(id) {
    try {
        const response = await fetch(`${API_URL}/faculty/${id}`);
        const json = await response.json();
        return json;
} catch (error) {
    console.error(error);
    setError("Could not fetch faculty");
}
}

useEffect( () => {
    async function fetchFaculty() {
        try {
            const singleFacultyPage = await fetchSingleFaculty(id);
            if (singleFacultyPage) {
                setFaculty(singleFacultyPage);
            } else {
                alert("Could not fetch faculty page")
            }
        } catch (error) {
            setError("Could not load data")
        }
    }
    fetchFaculty();
}, [id]);


return  (
    <>
       <div className="single-container">
      <div className="depTitle2">
        {faculty && faculty.name ? (
         <h4>{faculty.name}</h4>
           ) : (
           <p>Loading...</p>
               )}
      </div>

<div className="faculty-content">
{faculty && faculty.profileImage && (
  <div className="p-title">
  <img src={faculty.profileImage} alt={`profile image of faculty: ${faculty.name}`} />
  </div>
)}
</div>


<div className="descript4">
  {faculty && (
    <>
      <p className="pSingle"> <strong> Bio: </strong> {faculty.bio || "No bio available"}</p>
      <p className="pSingle"> <strong>Contact Info:</strong> {faculty.contactInfo || "No contact info available"}</p>
      <p className="pSingle"> <strong>Department ID:</strong> {faculty.departmentId || "No department info available"}</p>
    </>
  )}
</div>
</div>


    </>
);
}





export default SingleFaculty