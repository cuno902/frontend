import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminTypes.css";

const API_URL = "http://localhost:3000/api/types"; 

const AdminTypes = () => {
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };


  const isTokenValid = (token) => {
    return token && token.length > 0;
  };

  const token = getAuthToken();
  useEffect(() => {
    
    if (!isTokenValid(token)) {
      toast.error("You need to be logged in to update a user.");
      navigate("/login"); 
    } else {
      fetchTypes();
    } 
  }, []);

  const fetchTypes = async () => {
    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTypes(res.data);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const deleteType = async (id) => {
    if (!isTokenValid(token)) {
        toast.error("You need to be logged in to delete a user.");
        navigate("/login");
        return;
      }
    if (!window.confirm("Are you sure you want to delete this type?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      fetchTypes();
    } catch (error) {
      console.error("Error deleting type:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Product Types</h1>
      <button className="admin-button" onClick={() => navigate("/admin/types/add")}>
        Add New Type
      </button>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Type Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type) => (
            <tr key={type._id}>
              <td>{type.name}</td>
              <td>
                <button onClick={() => navigate(`/admin/types/update/${type._id}`)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => deleteType(type._id)} className="delete-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTypes;
