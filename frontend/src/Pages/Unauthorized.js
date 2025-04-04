import { useState } from "react";
import Login from "./Login";
import { useSelector } from "react-redux";

const Unauthorized = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const User = useSelector((state) => state.User.value);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
        <p className="mt-4 text-gray-700">{`You are logged in as a ${
          User?.role === "business" ? "business" : "individual user"
        } account. Please log in as a ${
          User?.role === "business" ? "individual user" : "business"
        } to access this page.`}</p>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="mt-6 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Go to Login
        </button>
      </div>
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
};

export default Unauthorized;
