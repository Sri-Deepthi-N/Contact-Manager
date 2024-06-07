import { useState, useEffect } from "react";
import axios from "axios";
import { FaTabletScreenButton, FaEnvelope, FaUser } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"; 

const Form = () => {
    const [name, setName] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [email, setEmail] = useState("");
    const [editId, setEditId] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate(); 

    const [list, setList] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/list");
                setList(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEdit) {
            const response = await axios.post("http://localhost:3000/list", {
                name: name,
                mobileno: mobileno,
                email: email,
            });
            setList([...list, response.data]);
            setName("");
            setMobileno("");
            setEmail("");
            navigate(-1);
        } else {
            const response = await axios.put(`http://localhost:3000/list/${editId}`, { name, mobileno, email });
            const updatedArray = list && list?.map((item) => {
                return item._id === editId ? { ...item, name, mobileno, email } : item;
            });
            setList(updatedArray);
            setIsEdit(false);
            setEditId("");
            setMobileno("");
            setName("");
            setEmail("");
        }
    }

    return (
        <div className="container">
            <form onSubmit={(e) => handleSubmit(e)}>
                <FaUser className="icon" /><input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required /><br /><br />
                <FaTabletScreenButton className="icon" /><input type="number" value={mobileno} placeholder="Mobile Number" onChange={(e) => setMobileno(e.target.value)} required /><br /><br />
                <FaEnvelope className="icon" /><input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} required /><br /><br />
                <Link to="/home"><button type="button">Cancel</button></Link>
                <button type="submit" style={{marginLeft:"225px"}}>Add</button>
            </form>
        </div>
    );
}

export default Form;
