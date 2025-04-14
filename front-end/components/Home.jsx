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
        <div className="news-card">

            <div className="newspaper">
                 <h1 className="h1-art"> SCHOOL NEWS & EVENTS </h1>
            </div>
        </div>

    <div className="art-wrapper">
        <div className="article1">
        <h1 className="art-title">YEAR IN REVIEW</h1>
        <p className="p1-art">By: Hind Khoudary </p>
        <p className="p1-art">At the end of every year, newspapers print "year-in-review articles reflecting on the top news stories that affected their readers. <span className="art-img1"> <img src="https://cdn.pixabay.com/photo/2022/09/15/09/14/magic-book-7456056_1280.jpg" alt="magical book opened up" />  </span>As our school year draws to a close, the FSA has conducted just such a survey, and below are listed what you, the SHS students, feel are the top 10 most important events of our school year</p>
        <br /><button className="art-button">Click to See Article ➡️ </button>
        
        </div>
        
        <div className="article2">
        <h1 className="art-title">WHERE DO WE GO FROM HERE?</h1>
        <p className="p1-art">By: Bisan Owda</p>
        <p className="p1-art">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem cumque consequatur ducimus ratione accusamus architecto sequi quisquam tempora minima laborum, laudantium reiciendis! Eveniet iste esse architecto veniam dolor omnis impedit. <br /> <br />  <span className="astro">
        <img src="https://images.squarespace-cdn.com/content/v1/5fb8968ac20ad074c5dbba5c/43bb26e3-832c-4070-bef4-31e0221ef6eb/conjunctions.png" alt="natal chart with aspects" /> 
        </span> <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus debitis obcaecati repellendus dicta ducimus eveniet vero...</p> 
        <br /> <button className="art-button2">Click to See Article ➡️ </button>
        </div>
    </div>
       

        <div className="theatre">
        <h1 className="h1-drama">FALL AND SPRING SEASON MUSICALS</h1>
        <p className="check"> ✨ check back July 5th for established dates ✨</p>
        <div className="musical-grid">
        <img src="https://m.media-amazon.com/images/M/MV5BZTY0ZDQ1ZWEtZGQ3OS00YmZiLWI0YzYtODkyYWEwZTU2OWVlXkEyXkFqcGc@._V1_.jpg" alt="Merrily We Roll Along" />
        <img src="https://www.nonesuch.com/sites/g/files/g2000014771/files/styles/album_detail__545___545_/public/2022-07/STEPHEN%2520SONDHEIM%2520Company.jpg?itok=-5lu3iHI" alt="Company" />
        <img src="https://m.media-amazon.com/images/I/91hBD-m3oML._UF1000,1000_QL80_.jpg" alt="She Loves Me" />
        <img src="https://i.scdn.co/image/ab67616d0000b27317801b71dbb47ba2c842abd4" alt="Little Shop Of Horros" />
        <img src="https://m.media-amazon.com/images/I/71Nd92lXhCL._UF1000,1000_QL80_.jpg" alt="Cabaret" />
        <img src="https://images.squarespace-cdn.com/content/v1/60a2c0bcd21c7a61dd057c0e/1630450662704-36WVMZ54GNGUXOO5RS3T/hsm+1.jpeg" alt="High School Musical" />
        </div>
        </div>
    </div>
    
   );
}

export default Home;