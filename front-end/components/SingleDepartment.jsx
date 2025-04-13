import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { API_URL } from "../API";
import { useAuth } from "./AuthContext";

function SingleDepartment() {
    const {id} = useParams();
    const [department,setDepartment] = useState(null);
    const [error, setError] = useState(null); 
    const { isLoggedIn } = useAuth();
    

async function fetchSingleDepartment(id) {
    try {
        const response = await fetch(`${API_URL}/departments/${id}`);
        const json = await response.json();
        return json;
} catch (error) {
    console.error(error);
    setError("Could not fetch department");
}
}

useEffect( () => {
    async function fetchDepartment() {
        try {
            const singleDepartmentPage = await fetchSingleDepartment(id);
            if (singleDepartmentPage) {
                setDepartment(singleDepartmentPage);
            } else {
                alert("Could not fetch department page")
            }
        } catch (error) {
            console.error(error);
        }
    }
    fetchDepartment();
}, [id]);

if (error) {
    return <p>{error}</p>;
}

if (!department) {
    return <p>Loading department details...</p>;
}



return  (
    <>
        <div className="depTitle">
                <h4>{department.name}</h4>
        </div>

        <div>
        <img src={department.image} alt={`image of department: ${department.name}`}/>
        </div>

                
          
                <div className="facultyList">
                    <h5>Meet Our Faculty</h5>
                    {department.faculty && department.faculty.length > 0 ? (
                        department.faculty.map((professor) => (
                            <div key={professor.id}>
                                <h6> Professor: {professor.name}</h6>
                                <p>  <img src={professor.profileImage} alt="professor image" /> </p>
                                <p> Bio: {professor.bio}</p>
                            </div>
                        ))
                    ) : (
                        <p>No faculty available in this department.</p>
                    )}
                </div>
           



        <div className="descript">
            <p> Description: {department.description} </p>
            <p> Contact Info: {department.contactInfo} </p>
        </div>
        

    </>
);
}





export default SingleDepartment