import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Profile.css";
import axios from "axios";

const Profile = () => {
    const { id } = useParams(); 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_LINK}/api/users/profile/${id}`,{
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setUser(response.data);
                console.log(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="profile-container">
            <h2>Thông tin các nhân</h2>
            <div className="profile-details">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Vai trò:</strong> {user.role}</p>
            </div>
            <Link to={`/edit-profile/${id}`}> 
            <button className="edit-btn">
                Sửa thông tin
            </button>
            </Link>
            <Link to={`/change-password/${id}`}>
            <button className="change-password-btn" onClick={() => navigate(`/change-password/${id}`)}>
                Đổi mật khẩu
            </button>
            </Link>
        </div>
        
    );
};

export default Profile;