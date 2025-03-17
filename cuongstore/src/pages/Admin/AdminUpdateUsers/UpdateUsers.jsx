import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../AdminUser/AdminUsers.css";
import { toast } from "react-toastify";

const API_URL = `${import.meta.env.VITE_API_LINK}/api/users`; 

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [user, setUser] = useState(null);

  
  const getAuthToken = () => {
    return localStorage.getItem("token"); 
  };


  const isTokenValid = (token) => {
    return token && token.length > 0;
  };

  useEffect(() => {
    const token = getAuthToken();
    
   
    if (!isTokenValid(token)) {
      toast.error("You need to be logged in to update a user.");
      navigate("/login"); 
    } else {
      fetchUser(token); 
    }
  }, []);

  const fetchUser = async (token) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      Object.keys(res.data).forEach((key) => setValue(key, res.data[key]));
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Error fetching user details. Please try again later.");
    }
  };

 
  const onSubmit = async (data) => {
  const token = getAuthToken();

  if (!isTokenValid(token)) {
    toast.error("You need to be logged in to update a user.");
    navigate("/login");
    return;
  }

  try {
    // Ensure the format of data is what the backend expects
    const requestBody = {
      username: data.username,
      email: data.email,
      role: data.role,
    };

    await axios.put(`${API_URL}/${id}`, requestBody, {
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("User updated successfully!");
    navigate("/admin/users");
  } catch (error) {
    console.error("Error updating user:", error);
    toast.error("Error updating user. Please try again later.");
  }
};


  if (!user) return <p>Loading user details...</p>;

  return (
    <div className="admin-container">
      <h1 className="admin-title">Update User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
        <input {...register("username")} placeholder="UserName" className="admin-input" required />
        <input {...register("email")} placeholder="Email" type="email" className="admin-input" required />
        <select {...register("role")} className="admin-input" required>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select> 
        <button type="submit" className="admin-button">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
