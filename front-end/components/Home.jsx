import { useState, useEffect } from "react"
import { API_URL } from "../API"
import { Link } from "react-router-dom";


function Home( { searchParams } ) {
   const [allDepartments, setAllDepartments] = useState([]);


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


   return (
    <div>
        Home
    </div>
    
   );
}

export default Home;