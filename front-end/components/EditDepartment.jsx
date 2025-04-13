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

            <form onSubmit={handleSubmit}>
            <h2>Edit Department</h2>

            <label> Name: </label>
            <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} /> 

            <label> Description: </label>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />

            <label> Contact Info: </label>
            <input type="text" value={form.contactInfo} onChange={(e) => setForm({...form, contactInfo: e.target.value})} />

            <label> Image: </label>
            <input type="text" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />


            <button type="submit"> Update department </button>
            </form>
       
        </div>
    );
}


export default EditDepartment