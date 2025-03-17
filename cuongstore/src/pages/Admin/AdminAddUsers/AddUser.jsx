import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../AdminUser/AdminUsers.css";
import { toast } from "react-toastify";  // Import toast for error/success messages

const API_URL = "http://localhost:3000/api/users/register";

const AddUser = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();


  const getAuthToken = () => {
    return localStorage.getItem("token");
  };


  const isTokenValid = (token) => {
    return token && token.length > 0;
  };

  const onSubmit = async (data) => {
    const token = getAuthToken();

    if (!isTokenValid(token)) {
      toast.error("You need to be logged in to add a user.");
      navigate("/login");  
      return;
    }

    try {
      await axios.post(API_URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User added successfully!");
      navigate("/admin/users");  
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Error adding user. Please try again later.");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Add New User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="admin-form">
        <input
          type="text"
          name="username"
          placeholder="Tên người dùng"
          className="admin-input"
          {...register("username")}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="admin-input"
          {...register("email")}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          className="admin-input"
          {...register("password")}
          required
        />
        <select {...register("role")} className="admin-input" required>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit" className="admin-button">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
