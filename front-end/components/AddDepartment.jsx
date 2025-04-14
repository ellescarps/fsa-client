import { useState } from "react";
import { API_URL } from "../API";

function AddDepartment() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [error, setError] = useState(null);


async function handleSubmit(e) {
    e.preventDefault();

    const newDepartment = { name, description, image, contactInfo };

    try {
        const response = await fetch(`${API_URL}/departments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(newDepartment),
        });

        if (response.ok) {
            window.location.href = "/departments";
        } else {
            setError("Failed to add department");
        }
    } catch (error) {
        setError("An error occurred while adding the department");
        console.error(error);
    }
}

    return (
        <div>
            <div className="add-form">
            <h2> Add New Department </h2>
           

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label> <br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /> 
                </div>
                <br /> <br />
                <div>
                    <label> Description: </label>
                    <input type="text" value={description} onChange={(e)=> setDescription(e.target.value)} required />
                </div>
                <br /> <br />
                <div>
                    <label>Image:</label> 
                    <textarea
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </div>
                <br /> 
                <div>
                    <label> Contact Info: </label>
                    <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
                </div>  <br /> <br />
                <div>
                    <button>Add Department</button>
                </div>



            </form>
            </div>


        </div>
    );
}

export default AddDepartment