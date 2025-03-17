import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const AdminNavbar = () => {
  const navigate = useNavigate();
   const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

 
  return (
    <nav className={`admin-navbar ${menuOpen ? "open" : ""}`}>
      <div className="admin-navbar-container">
        {/* Logo */}
        <Link to="/admin" className="admin-navbar-logo">
          Admin Panel
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="admin-navbar-hamburger" onClick={toggleMenu}>
          <span className="admin-navbar-hamburger-line"></span>
          <span className="admin-navbar-hamburger-line"></span>
          <span className="admin-navbar-hamburger-line"></span>
        </div>

        <ul className={`admin-navbar-links ${menuOpen ? "active" : ""}`}>
          <Link to="/admin/products" className="admin-navbar-link">Products</Link>
          <Link to="/admin/users" className="admin-navbar-link">Users</Link>
          <Link to="/admin/types" className="admin-navbar-link">Types</Link>
          <button onClick={handleLogout} className="admin-navbar-link logout-button">Logout</button>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
