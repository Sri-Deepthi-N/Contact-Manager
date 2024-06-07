import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaPen, FaTrashCan, FaTabletScreenButton, FaEnvelope, FaUser } from "react-icons/fa6";
import axios from "axios";

const Info = () => {
  const [list, setList] = useState(null);
  const [name, setName] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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

  // Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/list/${id}`);
      const newUser = list.filter((ele) => ele._id !== id);
      setList(newUser);
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  }

  // Edit
  const handleEdit = (user) => {
    setShowModal(true);
    setEditId(user._id);
    setName(user.name);
    setMobileno(user.mobileno);
    setEmail(user.email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/list/${editId}`, { name, mobileno, email });
      const updatedArray = list && list.map((item) => {
        return item._id === editId ? { ...item, name, mobileno, email } : item;
      });
      setList(updatedArray);
      setShowModal(false);
      setMobileno("");
      setName("");
      setEmail("");

    } catch (error) {
      console.error(error);
    }
  }

  const { id } = useParams();
  const filteredData = list?.filter((user) => user?._id === id);
  useEffect(() => { }, [filteredData]);

  return (
    <div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                <div><h2>Enter Your Details</h2>
                  <FaUser />
                  <input 
                    className="ipt" 
                    type="text" 
                    value={name} 
                    placeholder="Name" 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <FaTabletScreenButton />
                  <input 
                    className="ipt" 
                    type="number" 
                    value={mobileno} 
                    placeholder="Mobile Number" 
                    onChange={(e) => setMobileno(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <FaEnvelope />
                  <input 
                    className="ipt" 
                    type="email" 
                    value={email} 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                  />
                </div>
                <Link to="/home">
                  <button className="btn">Cancel</button>
                </Link>
                <button type="submit" className="btn">Edit</button>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="cont">
        {filteredData && filteredData.map((user) => (
          <div key={user.id || user.name} className="user-card">
            <p>{user.name}</p>
            <p>{user.mobileno}</p>
            <p>{user.email}</p>
            <button className="icon-btn" onClick={() => handleEdit(user)}><FaPen /></button>
            <button className="icon-btn" onClick={() => handleDelete(user._id)}><FaTrashCan /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Info;
