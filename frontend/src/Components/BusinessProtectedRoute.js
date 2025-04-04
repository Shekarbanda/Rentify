import { useState, useEffect } from "react";
import Login from "../Pages/Login";
import Unauthorized from "../Pages/Unauthorized";
import { jwtDecode } from "jwt-decode";

const BusinessProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem("token");
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [User,setUser] = useState();
    

    useEffect(() => {
        if (!isAuthenticated) {
            setIsLoginOpen(true);
        }
        else{
            setUser(jwtDecode(localStorage.getItem('token')));
        }
    }, [isAuthenticated]);

    // If user is not authenticated, show login modal
    if (!isAuthenticated) {
        return <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />;
    }

    // If user role is "business", restrict access
    if ((User) && (User?.role !== "business")) {
        return <Unauthorized/>
    }

    return children;
};

export default BusinessProtectedRoute;
