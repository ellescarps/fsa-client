import { useState, useEffect } from "react"
import { API_URL } from "../API"
import { Link, useNavigate } from "react-router-dom";


function AllDepartments( { searchParams } ) {
   const [allDepartments, setAllDepartments] = useState([]);
   const navigate = useNavigate();

async function fetchDepartments() {
    try {
        const response = await fetch(`${API_URL}/departments`);
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
        return [];
    }
}


   useEffect ( () => {
        async function getDepartments() {
            try {
                const departments = await fetchDepartments();
                setAllDepartments(departments);
            } catch (error) {
                console.error(error);
            }
        }
        getDepartments();
   }, []);


const departmentsToDisplay = 
searchParams ? allDepartments.filter( (department) => department.name.toLowerCase().includes(searchParams) )
: allDepartments;

async function handleDelete(departmentId) {
    const confirmDelete = confirm("Are you sure you want to delete this department?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_URL}/departments/${departmentId}}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });


            if (response.ok) {
                setAllDepartments((prev) => 
                    prev.filter((dept) => dept.id !== departmentId)
                );
            } else {
                alert("Failed to delete department");
            }
    } catch (error) {
        console.error(error);
    }
    
}



   return (
    <div>
       
       {localStorage.getItem("token") && (
            <button onClick={() => navigate("/faculty/new")}>Add Faculty</button>
            )}
   
            <div className="homebody">

            {allDepartments.length === 0 ? (
             <p>Departments loading...</p>
                ) : (
                <ul>
                {departmentsToDisplay.map( (department) => {
                     return(
                     <li key= {department.id}>

                        <div className="depTitle1">
                         <h4>{department.name}</h4>
                        </div>

                     <div className="depCover1">
                        {department.image ? (
                         <a href={`/departments/${department.id}`}>
                         <img 
                        src={department.image}
                        alt={`image of department: ${department.name}`}
                        />
                        </a>
                        ) : (
                        <p>Image not available</p>
                        )}
                        </div>



                {localStorage.getItem("token") && (
                               <div className="details">
                               <Link to={`/departments/${department.id}`}>
                                   <button>View Faculty</button>
                               </Link>
                             

                               <button onClick={() => navigate(`/departments/edit/${department.id}`)}>
                                   Edit Department
                               </button>
       
                               <button onClick={() => handleDelete(department.id)}>
                                   Delete Department
                               </button>
                               </div>
                )}
                     
                

                    </li>

                );
            })}
                </ul>
            )}
        </div>
     


    </div>
   );
}

export default AllDepartments;