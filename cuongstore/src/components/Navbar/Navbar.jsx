import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-links">
        <Link to="/">HOME</Link>
        <Link to="/products">SẢN PHẨM</Link>
        <a href="https://shopee.vn" target="_blank" rel="noopener noreferrer">SHOPEE</a>
        <Link to="/contact">CONTACT</Link>
        <Link to="/about">VỀ CHÚNG TỚ</Link>
      </div>
    </nav>
  );
};

export default Navbar;
