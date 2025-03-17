import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./AdminHome.css";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-home-container">
      <h1 className="admin-home-title">Admin Dashboard</h1>
      <div className="admin-home-buttons">
        <button onClick={() => navigate("/admin/products")} className="admin-home-button">
          Manage Products
        </button>
        <button onClick={() => navigate("/admin/types")} className="admin-home-button">
          Manage Product Types
        </button>
        <button onClick={() => navigate("/admin/users")} className="admin-home-button">
          Manage Users
        </button>
      </div>
    </div> 
  );
};

export default AdminHome;
