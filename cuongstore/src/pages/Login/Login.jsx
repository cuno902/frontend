
import "./Login.css"

import React, { useState } from "react";
import {loginUser} from "../../services/AuthServices.js"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      const decoded = jwtDecode(data.token);
      window.dispatchEvent(new Event("authChanged"));
       if (decoded.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Đăng nhập không thành công");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng Nhập</h2>
      {error && <p className="error">{error}</p>}
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>Chưa có tài khoản? <a href="/register">Đăng kí</a></p>
    </div>
  );
};

export default Login;
