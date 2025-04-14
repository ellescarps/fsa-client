import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_URL } from "../API";



function EditDepartment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        description: "",
        contactInfo: "",
        image: "",
    });

    useEffect(() => {
        async function fetchDepartment() {
            const response = await fetch(`${API_URL}/departments/${id}`);
            const json = await response.json();
            setForm(json);
        }
        fetchDepartment();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/departments/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(form),
            });

            if(response.ok) {
                navigate("/departments");
            } else {
                alert ("Failed to update department");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <div className="edit-form">
            <form onSubmit={handleSubmit}>
            <h2>Edit Department</h2>

            <label> Name: </label> 
            <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /> 
            <br /> <br />
            <label> Description: </label>
            <textarea rows="30" cols="20" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
            <br /> <br />
            <label> Contact Info: </label>
            <input type="text" value={form.contactInfo} onChange={(e) => setForm({...form, contactInfo: e.target.value})} />
            <br /> <br />
            <label> Image: </label>
            <input type="text" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />

            <br /> <br />
            <button type="submit"> Update Department </button>
            </form>
            </div>
        </div>
    );
}


export default EditDepartment