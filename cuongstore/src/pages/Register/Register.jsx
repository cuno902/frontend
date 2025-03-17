
import React, { useState } from "react";
import {registerUser} from "../../services/AuthServices.js"
import { useNavigate } from "react-router-dom";
import "../Login/Login.css"

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Đăng kí thất bại");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng kí</h2>
      {error && <p className="error">{error}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Tên người dùng" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>Đã có tải khoản? <a href="/login">Đăng nhập</a></p>
    </div>
  );
};

export default Register;
