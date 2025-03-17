import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AdminTypes.css";
import { toast } from "react-toastify";  // Ensure toast is imported for notifications

const API_URL = `${import.meta.env.VITE_API_LINK}/api/types`;

const EditType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { dirtyFields } } = useForm();
  const [currentName, setCurrentName] = useState('');

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const isTokenValid = (token) => {
    return token && token.length > 0;
  };

  const token = getAuthToken();

  useEffect(() => {
    if (!isTokenValid(token)) {
      toast.error("You need to be logged in to update a type.");
      navigate("/login");
    } else {
      fetchType();
    }
  }, [token, navigate]);

  const fetchType = async () => {
    try {
      const res = await axios.get(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setValue("name", res.data.name); 
      setCurrentName(res.data.name);
    } catch (error) {
      console.error("Error fetching type:", error);
      toast.error("Error fetching type details.");
    }
  };

  const onSubmit = async (data) => {
    if (!isTokenValid(token)) {
      toast.error("You need to be logged in to update a type.");
      navigate("/login");
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Type updated successfully!");
      navigate("/admin/types");
    } catch (error) {
      console.error("Error updating type:", error);
      toast.error("Error updating type. Please try again later.");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Edit Product Type</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
        <input
          {...register("name")}
          placeholder="Type Name"
          className="admin-input"
          required
        />
        <button type="submit" className="admin-button">
          Update Type
        </button>
      </form>
    </div>
  );
};

export default EditType;
