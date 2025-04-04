import { useState, useEffect } from "react";
import Unauthorized from "../Pages/Unauthorized";
import { jwtDecode } from "jwt-decode";

const BusinessProtectedRoute2 = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const [User, setUser] = useState();

  useEffect(() => {
    if (isAuthenticated) {
      setUser(jwtDecode(localStorage.getItem("token")));
    }
  }, [isAuthenticated]);

  // If user role is "business", restrict access
  if (User && User?.role === "business") {
    return <Unauthorized />;
  }

  return children;
};

export default BusinessProtectedRoute2;
