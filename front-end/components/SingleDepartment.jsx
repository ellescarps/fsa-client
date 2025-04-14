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
    <div>

        
        <div>

        
        <div className="dep-img">
        <img src={department.image} alt={`image of department: ${department.name}`}/>
        </div>
        <div className="align3">
        <div className="depTitle3">
                <h4>{department.name}</h4>
        </div>
    

        <div className="descript3">
            <p> <strong>Description: </strong> {department.description} </p>
            <p> <strong>Contact Info:</strong> {department.contactInfo} </p>
        </div>
        </div>
        

    

                
          
                <div className="facultyList3">
                    <h5>Meet Your Professors</h5>
                    {department.faculty && department.faculty.length > 0 ? (
                        department.faculty.map((professor) => (
                            <div key={professor.id}>
                                <h6> Professor: {professor.name}</h6>
                                <p className="banner">  <img src={professor.profileImage} alt="professor image" /> </p>
                                <p className="pbio"> <strong>About Me</strong> <br /> {professor.bio}</p>
                            </div>
                        ))
                    ) : (
                        <p>No faculty available in this department.</p>
                    )}
                </div>
           



    </div>
    </div>
);
}





export default SingleDepartment