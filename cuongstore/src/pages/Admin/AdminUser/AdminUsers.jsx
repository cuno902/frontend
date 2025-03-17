import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminUsers.css";
import { toast } from "react-toastify"; 

const API_URL = "http://localhost:3000/api/users"; 

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem("token"); 
  };

  const isTokenValid = (token) => {
    return token && token.length > 0;
  };

  const fetchUsers = async () => {
    const token = getAuthToken();

    if (!isTokenValid(token)) {
      toast.error("You need to be logged in to view this page.");
      navigate("/login"); 
      return;
    }

    try {
      const res = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users. Please try again later.");
    }
  };

  const deleteUser = async (id) => {
    const token = getAuthToken();

    if (!isTokenValid(token)) {
      toast.error("You need to be logged in to delete a user.");
      navigate("/login");
      return;
    }

    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchUsers(); 
        toast.success("User deleted successfully.");
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user. Please try again later.");
      }
    }
  };

  const updateUser = (id) => {
    navigate(`/admin/users/update/${id}`);
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Manage Users</h1>

      <button onClick={() => navigate("/admin/users/add")} className="admin-button">
        Add User
      </button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
         
                <button onClick={() => updateUser(user._id)} className="edit-button">Edit</button>

                <button onClick={() => deleteUser(user._id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
