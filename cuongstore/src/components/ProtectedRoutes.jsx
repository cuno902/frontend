import { Outlet, Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedAdminLayout = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        if (decoded.role === "admin") {
            return <Outlet />; 
        } else {
            return <Navigate to="/" replace />;
        }
    } catch (error) {
        console.error("Invalid token:", error);
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedAdminLayout;
