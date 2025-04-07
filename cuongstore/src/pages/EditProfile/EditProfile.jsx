import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProfile.css";

const EditProfile = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", email: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_LINK}/api/users/profile/${id}`,{
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setUser({ username: response.data.username, email: response.data.email });
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${import.meta.env.VITE_API_LINK}/api/users/${id}`, user,{
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
            alert("Profile updated successfully!");
            navigate(`/profile/${id}`);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" name="username" value={user.username} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} required />

                <button type="submit">Save Changes</button>
                <button type="button" className="cancel-btn" onClick={() => navigate(`/profile/${id}`)}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditProfile;
