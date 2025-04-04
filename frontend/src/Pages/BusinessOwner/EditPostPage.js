import React, { useEffect, useState } from "react";
import {
  FaClipboardList,
  FaBoxOpen,
  FaPlusCircle,
  FaClock,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Footer from "../../Components/Footer";
import { useNavigate } from "react-router";
import { IoIosArrowDown } from "react-icons/io";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setItems } from "../../Redux/Slices/ItemSlice";
import EditItem from "../../Components/EditItem";

export default function EditItemPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [isOpen, setIsOpen] = useState(false);
  const User = useSelector((state) => state.User.value);

  const [loading, setLoading] = useState(true);
  const myAds = useSelector((state)=>state.Item.value);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const url = useSelector((state) => state.api.value);

  const fetchMyads = async () => {
    try {
      const response = await axios.get(`${url}item/get-my-ads`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
            "Content-Type": "multipart/form-data", // Correct content type for file uploads
          },
        }
      );
      if (response.status === 200) {
        const items = response?.data?.data?.items || [];
        dispatch(setItems(items));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyads();
  }, [url]);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    toast.success("Logged out successfully");
  };
  

  return (
    <>
      <div className="w-[100%] lg:z-50  fixed bg-[rgb(214,222,228)]">
        <div
          className={`max-w-[1400px] z-[50] flex mx-auto  box-sizing h-[5rem] border-b-2 items-center `}
        >
          <div className="w-[1400px] flex justify-between items-center h-[5rem]">
            <div className="flex items-center h-[5rem] mt-3 text-[1.5rem] font-bold ml-6 cursor-pointer">
              <span className="bg-[black] p-1 mb-2 rounded-lg text-[white]">
                Rent
              </span>{" "}
              <span className="">Ify</span>
            </div>
            <div className="flex gap-5 hidden lg:flex">
              <div className="flex items-center">
                <div className="relative">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => {
                      toggleSection();
                      toggleMenu();
                    }}
                  >
                    {User?.profileImage ? (
                      <img
                        alt="profile"
                        className="w-9 h-9 rounded-full"
                        src={User?.profileImage}
                      />
                    ) : (
                      <FaUserCircle className="w-9 h-9" />
                    )}{" "}
                    <span className="ml-1 mr-1">{ User?.name}</span>
                    <IoIosArrowDown
                      className={`w-5 h-5 ml-1 transform transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-[200px] bg-white border rounded-lg shadow-lg z-50">
                      <div className="flex flex-col   rounded-t-lg ">
                        <div className="flex gap-2 p-2 items-center  rounded-t-lg">
                          {User?.profileImage ? (
                            <img
                              alt="profile"
                              className="w-9 h-9 rounded-full"
                              src={User?.profileImage}
                            />
                          ) : (
                            <FaUserCircle className="w-9 h-9" />
                          )}
                          <span className="ml-1 mr-1">{ User?.name}</span>
                        </div>
                        <button
                          className="px-4 py-2 mt-2 mb-5  bg-[#002f34] mx-auto text-white w-[90%] h-[2.5rem] bg-[#002f34] rounded-sm cursor-pointer"
                          onClick={() => nav("/business/profile")}
                        >
                          View and edit profile
                        </button>
                      </div>
                      <hr></hr>
                      <ul className="py-2 text-gray-700">
                        <li
                          onClick={handleLogout}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        >
                          <FaSignOutAlt className="mr-2" /> Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="sm:px-3 text-lg rounded text-primary sm:py-2 hover:text-[white] hover:bg-[black] transition-all duration-200"
              >
                Logout
              </button>
            </div>
            <div
              className={`h-[6rem] items-center mr-6 ${
                menuOpen ? "hidden" : "flex"
              } lg:hidden ease-in-out transition-h duration-500 cursor-pointer`}
              onClick={() => setMenuOpen(true)}
            >
              <RiMenu2Line className="w-[50px] h-[50px]" />
            </div>
            <div
              className={`h-[6rem] items-center mr-6 ${
                menuOpen ? "flex" : "hidden"
              } lg:hidden ease-in-out transition-all duration-500 cursor-pointer`}
              onClick={() => setMenuOpen(false)}
            >
              <RxCross2 className="w-[50px] h-[50px]" />
            </div>
          </div>
        </div>
      </div>

      <div className=" max-w-[1400px]  mx-auto bg-white flex pt-[80px] shadow-lg border border-[rgba(5,10,27,0.2)]">
        {/* Sidebar / Menu */}
        <div
          className={`fixed lg:static inset-y-0 left-0 sm:w-64 w-60 bg-white shadow-lg lg:shadow-none p-4 space-y-4 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } -translate-x-full lg:translate-x-0 transition-transform h-full`}
        >
          <button
            className={`w-full flex items-center p-2 transition rounded  hover:bg-blue-200`}
            onClick={() => nav("/business/dashboard")}
          >
            <FaClipboardList className="mr-2" /> Dashboard
          </button>
          <button
            className={`w-full flex items-center p-2 transition rounded bg-blue-200  hover:bg-blue-200`}
            onClick={() => nav("/business/items")}
          >
            <FaBoxOpen className="mr-2" /> Items
          </button>
          <button
            className={`w-full flex items-center p-2 transition rounded  hover:bg-blue-200`}
            onClick={() => nav("/business/add-item")}
          >
            <FaPlusCircle className="mr-2" /> Add Item
          </button>
          <button
            className={`w-full flex items-center p-2 transition rounded requests  hover:bg-blue-200`}
            onClick={() => nav("/business/requests")}
          >
            <FaClock className="mr-2" /> Requests
          </button>
          <button
            className={`w-full flex items-center p-2 transition rounded profile  hover:bg-blue-200`}
            onClick={() => nav("/business/profile")}
          >
            <FaUser className="mr-2" /> Profile
          </button>
          <button
            className={`w-full flex items-center p-2 transition rounded profile  hover:bg-blue-200`}
            onClick={handleLogout}
          >
            <FaSignOutAlt className="mr-2 " /> Logout
          </button>
        </div>

        {/* Content Area */}

        <div className="flex-1 min-h-[65vh] lg:min-h-[78.5vh] md:min-h-[80.5vh] flex flex-col mb-7 p-3 bg-[rgba(231,235,240,0.29)]">
          <EditItem/>
        </div>
      </div>
      <Footer />
    </>
  );
}
