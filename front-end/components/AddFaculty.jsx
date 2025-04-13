import { useState } from "react";
import { API_URL } from "../API";

function AddFaculty() {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [contactInfo, setContactInfo] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [error, setError] = useState(null);


async function handleSubmit(e) {
    e.preventDefault();

    const newFaculty = { name, bio, profileImage, contactInfo, departmentId };

    try {
        const response = await fetch(`${API_URL}/faculty`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(newFaculty),
        });

        if (response.ok) {
            window.location.href = "/faculty";
        } else {
            setError("Failed to add faculty member");
        }
    } catch (error) {
        setError("An error occurred while adding the faculty member");
        console.error(error);
    }
}

    return (
        <div>
            <h2> Add New Faculty </h2>
           

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>

                <div>
                    <label> Bio </label>
                    <input type="text" value={bio} onChange={(e)=> setBio(e.target.value)} required />
                </div>

                <div>
                    <label>Image</label>
                    <textarea
                        value={profileImage}
                        onChange={(e) => setProfileImage(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label> Contact Info </label>
                    <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
                </div> 

                <div>
                    <label>Department ID</label>
                     <input type="text" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)} required/>
                </div>

                <div>
                    <button>Add Faculty Member</button>
                </div>



            </form>



        </div>
    );
}

export default AddFaculty