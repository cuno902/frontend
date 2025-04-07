import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ChangePassword.css";

const ChangePassword = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            setError("Mật khẩu không trùng khớp");
            return;
        }

        try {
            await axios.post(`${import.meta.env.VITE_API_LINK}/api/users/change-password/${id}`, {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            },{
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setSuccess("Password changed successfully!");
            setTimeout(() => navigate(`/profile/${id}`), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to change password");
        }
    };

    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <label>Mật khẩu cũ:</label>
                <input type="password" name="oldPassword"  onChange={handleChange} required />

                <label>Mật khẩu mới:</label>
                <input type="password" name="newPassword"  onChange={handleChange} required />

                <label>Xác nhận mật khẩu mơi:</label>
                <input type="password" name="confirmPassword"  onChange={handleChange} required />

                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}

                <button type="submit">Update Password</button>
                <button type="button" className="cancel-btn" onClick={() => navigate(`/profile/${id}`)}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
