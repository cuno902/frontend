import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminTypes.css";

const API_URL = `${import.meta.env.VITE_API_LINK}/api/types`;

const AddType = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You are not authorized. Please log in again.");
    return;
  }

  try {
    await axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert("Type added successfully!");
    navigate("/admin/types");
  } catch (error) {
    console.error("Error adding type:", error);
    alert(error.response?.data?.message || "Failed to add type. Please try again.");
  }
};

  return (
    <div className="admin-container">
      <h1 className="admin-title">Add New Product Type</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
        <input {...register("name")} placeholder="Type Name" className="admin-input" required />
        <button type="submit" className="admin-button">Add Type</button>
      </form>
    </div>
  );
};

export default AddType;
