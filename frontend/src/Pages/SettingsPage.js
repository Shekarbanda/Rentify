import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setUser } from "../Redux/Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Category from "../Components/Category";
import Footer from "../Components/Footer";

const SettingsPage = () => {
  const User = useSelector((state) => state.User.value);
  const [upiId, setUpiId] = useState(User?.upi_id);
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, seterrorMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const url = useSelector((state) => state.api.value);
  const token = localStorage.getItem("token");

  const fetch = async () => {
    try {
      const response = await axios.post(
        `${url}user/islogin`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );
      dispatch(setUser(response?.data?.data?.user));
      setUpiId(response?.data?.data?.user?.upi_id);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  // ✅ Handle UPI ID Update
  const handleUpiUpdate = async () => {
    if (!upiId.match(/^\w+@\w+$/)) {
      toast.error("❌ Invalid UPI ID format!");
      return;
    }

    await handleSave();
    toast.success("✅ UPI ID updated successfully!");
  };

  const handleSave = async () => {
    setisLoading(true);
    const profile = {
      upi_id: upiId,
      password: newPassword,
      oldPassword: oldPassword,
    };
    try {
      const response = await axios.post(
        `${url}user/edit-profile`,
        { profile }, // Send formData directly, NOT wrapped inside an object
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
            "Content-Type": "multipart/form-data", // Correct content type for file uploads
          },
        }
      );

      if (response?.status === 200) {
        dispatch(setUser(response?.data?.data?.user));
        seterrorMessage("");
        toast.success("Updated Successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      seterrorMessage(err?.response?.data?.message);
    } finally {
      setisLoading(false);
    }
  };

  // ✅ Handle Password Change
  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      seterrorMessage("All fields are required!");
      return;
    }
    if (newPassword !== confirmPassword) {
      seterrorMessage("Passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      seterrorMessage("Password must be at least 6 characters long!");
      return;
    }
    await handleSave();
  };

  return (
    <>
      <div className="w-[100%] mx-auto z-[50] fixed">
        <Navbar />
      </div>
      <div className="pt-[80px] mx-auto">
        <Category />
      </div>
      <div className="min-h-[73.5vh] lg:min-h-[77vh] md:min-h-[78.5vh] flex flex-col items-center justify-center p-4 mb-5">
        <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-2xl">
          <div>
            <h1 className="text-xl font-bold text-center">
              ⚙️ Account Settings
            </h1>
          </div>
          <divContent>
            {/* ✅ UPI ID Update */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                New UPI ID
              </label>
              <input
                type="text"
                placeholder="example@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-lg"
              />
              <button
                onClick={handleUpiUpdate}
                className="mt-3 p-2 w-full bg-[#002f34] text-white rounded-md mt-5 border-2"
              >
                Update UPI ID
              </button>
            </div>

            <hr className="my-4 border-gray-300" />

            {/* ✅ Password Change */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Old Password
              </label>
              <input
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-lg"
              />

              <label className="block text-sm font-medium text-gray-700 mt-3">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-lg"
              />

              <label className="block text-sm font-medium text-gray-700 mt-3">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full p-2 border rounded-lg"
              />
              {errorMessage && (
                <span className="text-red-500 text-md block ml-2 mt-2">
                  {errorMessage}
                </span>
              )}

              <button
                onClick={handlePasswordChange}
                className="mt-3 p-2 w-full bg-[#002f34] text-white rounded-md mt-5 border-2"
              >
                Change Password
              </button>
            </div>
          </divContent>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default SettingsPage;
