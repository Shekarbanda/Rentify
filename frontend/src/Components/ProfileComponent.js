import React, { useEffect, useState } from "react";
import { FaUserEdit, FaCamera } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { FaUserCircle } from "react-icons/fa";
import { setUser } from "../Redux/Slices/UserSlice";

export default function ProfileComponent() {
  const [isEditing, setIsEditing] = useState(false);
  const [role, setrole] = useState("");
  const url = useSelector((state) => state.api.value);
  const token = localStorage.getItem("token");
  const User = useSelector((state) => state.User.value);
  const [profile, setProfile] = useState(User);
  const [errorMessage, seterrorMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const [isLoad, setisLoad] = useState(true);

  const defaultImage =
    "https://icon-library.com/images/download_103236.svg.svg";

  useEffect(() => {
    if (User) {
      setisLoad(false);
      setrole(User?.role);
      setProfile(User);
    } else {
      setisLoad(true);
    }
  }, [User]);

  const handleEditToggle = () => setIsEditing(!isEditing);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      profileImage: file,
    }));
  };

  const handleDiscard = () => {
    setProfile(User);
    setIsEditing(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setisLoading(true);
    const formData = new FormData();
    formData.append("userId", profile?._id || ""); // From Redux state
    formData.append("name", profile?.name || "");
    formData.append("about", profile?.about || "");
    formData.append("phone", profile?.phone || "");
    formData.append("location", profile?.location || "");
    formData.append("businessName", profile?.businessName || ""); // Only for business role
    formData.append("businessAddress", profile?.businessAddress || ""); // Only for business role

    // Append profileImage only if it’s a File (not a string URL)
    if (profile?.profileImage && profile.profileImage instanceof File) {
      formData.append("profileImage", profile.profileImage);
    }
    
    try {
      const response = await axios.post(
        `${url}user/edit-profile`,
        formData , // Send formData directly, NOT wrapped inside an object
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
            "Content-Type": "multipart/form-data", // Correct content type for file uploads
          },
        }
      );

      if (response?.status === 200) {
        toast.success("Profile Updated");
        dispatch(setUser(response?.data?.data?.user));
        seterrorMessage("");
        setIsEditing(false);
      }
    } catch (err) {
      seterrorMessage(err?.response?.data?.message);
      console.log(err)
    } finally {
      setisLoading(false);
    }
  };

  if (isLoad) {
    return (
      <div className="w-full h-[50vh] flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="max-w-[1000px] mx-auto p-2 sm:px-8 bg-white shadow-lg rounded-lg mt-5">
      {!isEditing ? (
        <div className="lg:w-[750px] w-[300px] sm:w-[500px]">
          <h2 className=" text-xl lg:text-3xl   font-semibold mb-4 border-b border-[rgba(91,92,96,0.2)] py-3 text-center">
            PROFILE
          </h2>
          <div className="md:w-[150px] md:h-[150px] w-[110px] h-[110px] rounded-full bg-gray-200 mx-auto mb-2 flex justify-center items-center">
            {profile?.profileImage ? (
              <img
                alt="profile-image"
                className="md:w-[150px] md:h-[150px] w-[110px] h-[110px]  rounded-full"
                onError={(e) => (e.target.src = defaultImage)}
                src={profile?.profileImage}
              />
            ) : (
              <FaUserCircle className="md:w-[150px] md:h-[150px] w-[110px] h-[110px] " />
            )}
          </div>
          <div className="space-y-4 max-w-[800px]">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                readOnly
                className="w-full border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
              />
            </div>
            {role === "business" && (
              <>
                <div>
                  <label className="block text-sm font-medium">
                    Business/Shop Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={profile?.businessName}
                    readOnly
                    className="w-full border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Business/Shop Address
                  </label>
                  <input
                    type="text"
                    name="businessAddress"
                    value={profile?.businessAddress}
                    readOnly
                    className="w-full border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium">
                {role === "business"
                  ? "About Business (optional)"
                  : "About (optional)"}
              </label>
              <textarea
                name="about"
                value={profile?.about}
                readOnly
                className="w-full border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="text"
                readOnly
                name="phone"
                value={profile?.phone}
                onChange={handleChange}
                className="flex-1 w-full items-center border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={profile?.location}
                readOnly
                className="w-full border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                readOnly
                name="email"
                value={profile?.email}
                onChange={handleChange}
                className="flex-1 w-full items-center border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
              />
            </div>
            <button
              onClick={handleEditToggle}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all flex items-center"
            >
              <FaUserEdit className="mr-2" /> Edit Profile
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSave}
          className="lg:w-[750px] z-0 sm:w-[500px] w-[300px] pb-[40px]"
        >
          <h2 className=" text-3xl   font-semibold mb-4 border-b border-[rgba(91,92,96,0.2)] py-3 text-center">
            EDIT PROFILE
          </h2>
          <div className="space-y-4 max-w-[800px] z-0">
            <div className="relative z-0 rounded-full bg-gray-200 mb-4 md:w-[150px] md:h-[150px] w-[110px] h-[110px] rounded-full bg-gray-200 mx-auto mb-2 flex flex-col justify-center items-center">
              <input
                type="file"
                accept="image/*"
                encType="multipart/form-data"
                onChange={handleImageChange}
                name="profileImage"
                className=" hidden"
                id="profile-image"
              />
              {profile?.profileImage ? (
                <img
                  alt="profile-image"
                  className=" md:w-[150px] md:h-[150px] w-[110px] h-[110px]  rounded-full"
                  src={
                    typeof profile.profileImage === "string"
                      ? profile?.profileImage
                      : URL.createObjectURL(profile.profileImage)
                  }
                />
              ) : (
                <FaUserCircle className=" md:w-[150px] md:h-[150px] w-[110px] h-[110px] ]" />
              )}
              <label
                htmlFor="profile-image"
                className="absolute flex gap-2 items-center bottom-2 left-18 bg-black bg-opacity-50 text-white p-1 rounded-full cursor-pointer"
              >
                Choose <FaCamera />
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={profile?.name}
                onChange={handleChange}
                className="w-full border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
              />
            </div>
            {role === "business" && (
              <>
                <div>
                  <label className="block text-sm font-medium">
                    Business/Shop Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={profile?.businessName}
                    onChange={handleChange}
                    className="w-full border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Business/Shop Address
                  </label>
                  <input
                    type="text"
                    name="businessAddress"
                    value={profile?.businessAddress}
                    onChange={handleChange}
                    className="w-full border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium">
                {role === "business"
                  ? "About Business (optional)"
                  : "About (optional)"}
              </label>
              <textarea
                name="about"
                value={profile?.about}
                onChange={handleChange}
                className="w-full border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>

              <input
                type="text"
                name="phone"
                value={profile?.phone}
                onChange={handleChange}
                className="w-full flex-1 items-center border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={profile?.location}
                onChange={handleChange}
                className="w-full border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>

              <input
                type="email"
                name="email"
                readOnly
                value={!isLoad ? profile?.email : "Loading..."}
                className="flex-1 w-full items-center border border-[rgba(5,10,27,0.33)]  p-2 rounded-lg mt-1"
              />
            </div>
            {errorMessage && (
              <span className="text-red-500 text-sm block ml-2 mt-2">
                {errorMessage}
              </span>
            )}
            <div className="flex justify-end space-x-2 pb-5 mb-5">
              <button
                onClick={handleDiscard}
                className="px-4 py-2 h-[50px] bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
              >
                Discard
              </button>
              <button
                type="submit"
                className="px-4 w-[150px] h-[50px] py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all"
              >
                {isLoading ? <Spinner /> : "Save changes"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
