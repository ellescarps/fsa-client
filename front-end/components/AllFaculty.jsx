import { useState, useEffect } from "react"
import { API_URL } from "../API"
import { Link, useNavigate } from "react-router-dom";


function AllFaculty( {searchParams} ) {
   const [allFaculty, setAllFaculty] = useState([]);
   const navigate = useNavigate();


async function fetchFaculty() {
    try {
        const response = await fetch(`${API_URL}/faculty`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return [];
    }
}


   useEffect ( () => {
        async function getFaculty() {
            try {
                const faculty = await fetchFaculty();
                setAllFaculty(faculty);
            } catch (error) {
                console.error(error);
            }
        }
        getFaculty();
   }, []);


const facultyToDisplay = 
searchParams ? allFaculty.filter( (faculty) => faculty.name.toLowerCase().includes(searchParams) )
: allFaculty;


async function handleDelete(facultyId) {
    const confirmDelete = confirm("Are you sure you want to delete this faculty member?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_URL}/faculty/${facultyId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });


            if (response.ok) {
                setAllFaculty((prev) => 
                    prev.filter((fac) => fac.id !== facultyId));
            } else {
                alert("Failed to delete faculty member");
            }
    } catch (error) {
        console.error(error);
    }
    
}

   return (
    <div>

        <div>
        <div className="group1">
            <h1 className="h1-profs">FACULTY & STAFF</h1>
            <h2 className="directory">Directory </h2>
    
        </div>
        </div>

        <div className="test2">
        {localStorage.getItem("token") && ( 
                <button onClick={()=> navigate("/faculty/new")}>Add Faculty</button>
             )}
   </div>
   
        <div>

       
            {allFaculty.length === 0 ? (
                <p>faculty loading...</p>
            ) : (
                <div className="faculty-grid">
                
            {facultyToDisplay.map( (faculty) => {
                return(
                    <div key= {faculty.id} className="faculty-card">

                        <div className="depTitle">
                        <h4>{faculty.name}</h4>
                        </div>

                        <div className="depCover">
                        {faculty.profileImage ? (
                            <img 
                            src={faculty.profileImage}
                            alt={`profileImage of faculty: ${faculty.name}`}
                            />
                        ) : (
                            <p>profileImage not available</p>
                        )}
                        </div>


                       
                         <div>
                         <Link to={`/faculty/${faculty.id}`}>
                             <button className="fbutton1">Faculty Details</button>
                         </Link>   
                         </div>
                        
                         {localStorage.getItem("token") && (
                            <div className="details2">
 
                         <button onClick={() => navigate(`/faculty/edit/${faculty.id}`)}>
                             Edit Faculty
                         </button>
 
                         <button onClick={() => handleDelete(faculty.id)}>
                             Delete Faculty
                         </button>
                         </div>
                )}

    
                      
                    </div>

                );
            })}
                
                </div>
            )}
            

        </div>


    </div>
   );
}

export default AllFaculty