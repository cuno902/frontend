import "./Header.css";
import React, { useEffect, useState } from "react";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
    const [user, setUser] = useState(null);

    const checkUser = () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedUser = jwtDecode(token);
                setUser(decodedUser);
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem("token");
                setUser(null);
            }
        } else {
            setUser(null);
        }
    };

    useEffect(() => {
        checkUser();

        window.addEventListener("authChanged", checkUser);

        return () => {
            window.removeEventListener("authChanged", checkUser);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.dispatchEvent(new Event("authChanged")); 
    };

    return (
        <header className="header">
            <div className="header-search">
                <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                <FaSearch className="search-icon" />
            </div>

            <div className="header-logo">
                <Link to="/" style={{textDecoration : "none", color: "black"}}>BluePeach</Link>
            </div>

            <div className="header-actions">
                {user ? (
                    <>
                        <Link to={`/profile/${user.id}`}>
                            <span className="header-icon">👋 {user.username}</span>
                        </Link>
                        <button onClick={handleLogout} className="logout-btn">Đăng xuất</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="header-icon"><FaUser /> Đăng nhập</Link>
                        <Link to="/register" className="header-icon">Đăng ký</Link>
                    </>
                )}
                <Link to="/cart" className="header-icon"><FaShoppingCart /> Giỏ hàng</Link>
            </div>
        </header>
    );
};

export default Header;
