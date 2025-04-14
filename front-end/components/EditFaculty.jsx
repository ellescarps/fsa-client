import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../API";



function EditFaculty() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        bio: "",
        contactInfo: "",
        profileImage: "",
        departmentId: "",
    });

    useEffect(() => {
        async function fetchFaculty() {
            const response = await fetch(`${API_URL}/faculty/${id}`);
            const json = await response.json();
            setForm(json);
        }
        fetchFaculty();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/faculty/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(form),
            });

            if(response.ok) {
                navigate("/faculty");
            } else {
                alert ("Failed to update faculty");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="edit-form">
            <form onSubmit={handleSubmit}>
            <h2>Edit Faculty</h2>

            <label> Name: </label>
            <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /> 
            <br /> <br />
            <label> Bio: </label>
            <textarea rows="30" cols="20" value={form.bio} onChange={(e) => setForm({...form, bio: e.target.value})} />
            <br /> <br />
            <label> Contact Info: </label>
            <input type="text" value={form.contactInfo} onChange={(e) => setForm({...form, contactInfo: e.target.value})} />
            <br /> <br />
            <label> Profile Image: </label>
            <input type="text" value={form.profileImage} onChange={(e) => setForm({...form, profileImage: e.target.value})} />
            <br /> <br />
            <label> Department ID: </label>
            <input type="text" value={form.departmentId} onChange={(e) => setForm({...form, departmentId: e.target.value})} />
            <br /> <br />
            <button type="submit"> Update Faculty </button>
            </form>
            </div>
        </div>
    );
}


export default EditFaculty