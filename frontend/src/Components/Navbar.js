import React, { useEffect, useState } from "react";
import { GrFavorite } from "react-icons/gr";
import { CiSearch } from "react-icons/ci";
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { LuClipboardList } from "react-icons/lu";
import { useNavigate } from "react-router";
import Signup from "../Pages/Signup";
import Login from "../Pages/Login";
import { IoIosArrowDown } from "react-icons/io";
import { FaCamera, FaQuestion } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";
import {
  FaPlus,
  FaList,
  FaHeart,
  FaCog,
  FaClock,
  FaSignOutAlt,
} from "react-icons/fa";
import { setUser } from "../Redux/Slices/UserSlice";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "./Spinner";
import { setLocation, setSearch } from "../Redux/Slices/CategorySlice";

export default function Navbar() {
  const [mobile, setmobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [islogin, setislogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User.value);
  const [isLoading, setisLoading] = useState(false);
  const url = useSelector((state) => state.api.value);
  const token = localStorage.getItem("token");
  const search = useSelector((state) => state.Category.search);
  const location = useSelector((state) => state.Category.location);

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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decoded = jwtDecode(localStorage.getItem("token"));
      fetch();
      setislogin(true);
    }
  }, [localStorage.getItem("token")]);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  const [requestDropdownOpen, setRequestDropdownOpen] = useState(false);

  const toggleRequestDropdown = () => {
    setRequestDropdownOpen(!requestDropdownOpen);
  };

  function handleMenuClick(menu) {
    if (islogin) {
      switch (menu) {
        case "view-profile":
          nav("/user-profile");
          break;
        case "add-item":
          nav("/post");
          break;
        case "my-ads":
          nav("/myads");
          break;
        case "wishlist":
          nav("/wishlist");
          break;
        case "received":
          nav("/receive-requests");
          break;
        case "sent":
          nav("/sent-requests");
          break;
        case "settings":
          nav("/settings");
          break;
          case "help":
            nav("/help");
            break;
        default:
          nav("/");
      }
    } else {
      switch (menu) {
        case "view-profile":
          localStorage.setItem("redirectPath", "/user-profile");
          setIsLoginOpen(true);
          break;
        case "add-item":
          localStorage.setItem("redirectPath", "/post");
          setIsLoginOpen(true);
          break;
        case "my-ads":
          localStorage.setItem("redirectPath", "/myads");
          setIsLoginOpen(true);
          break;
        case "settings":
          nav("/settings");
          break;
          case "help":
            nav("/help");
            break;
        case "wishlist":
          localStorage.setItem("redirectPath", "/wishlist");
          setIsLoginOpen(true);
          break;
        case "received":
          localStorage.setItem("redirectPath", "/requests");
          setIsLoginOpen(true);
          break;
        case "sent":
          localStorage.setItem("redirectPath", "/sent-requests");
          setIsLoginOpen(true);
          break;
        default:
          nav("/");
      }
    }
  }

  const handleLogout = async () => {
    setisLoading(true);
    localStorage.removeItem("token");
    window.location.href = "/";
    toast.success("Logged out successfully");
    setisLoading(false);
  };

  return (
    <>
      <div
        className={`max-w-[100%] z-[50] flex mx-auto box-sizing h-[5rem] shadow-md border-b-2 lg:border-[white] items-center bg-[rgb(214,222,228)] justify-center`}
      >
        <div className="w-[1400px] lg:flex justify-around hidden">
          <div
            className="cursor-pointer flex items-center h-[5rem] text-[1.5rem] font-bold"
            onClick={() => nav("/")}
          >
            <span className="bg-[black] p-1 rounded-lg text-[white]">Rent</span>{" "}
            <span className="">Ify</span>
          </div>

          <>
            <div className="flex items-center h-[5rem]">
              <select
                name="location"
                value={location}
                onChange={(e) => dispatch(setLocation(e.target.value))}
                className="w-[250px] sm:w-[200px] h-[2.8rem] rounded-[4px] p-2 border border-black mr-2 cursor-pointer"
              >
                <option>India</option>
                <option>Hyderabad</option>
                <option>Bangalore</option>
              </select>
            </div>

            <div className="flex items-center h-[5rem] ">
              <input
                type="text"
                onChange={(e) => dispatch(setSearch(e.target.value))}
                
                value={search}
                placeholder="Find Items,Cars,Bikes and more..."
                className="border border-black w-[30vw] sm:w-[15vw] xl:w-[650px] h-[2.8rem] rounded-l-[4px] p-3 text-[1.2rem]"
              />
              <div onClick={()=>nav('/explore-rentals')} className="w-[50px] m-auto bg-[#002f34] text-white flex justify-center items-center rounded-r-[4px]">
                <CiSearch className="w-[25px] h-[2.8rem] cursor-pointer" />
              </div>
            </div>
            <div
              className="w-[35px] flex items-center h-[5rem] cursor-pointer ml-1"
              onClick={() => handleMenuClick("wishlist")}
            >
              <GrFavorite className="w-[80px] h-[40px] p-1 hover:bg-[pink] hover:rounded-full" />
            </div>

            <div className="flex items-center h-[5rem]">
              <button
                className={`sm:px-3 text-lg rounded text-primary sm:py-2 hover:text-[white] hover:bg-[black] transition-all duration-200 ${
                  islogin ? "hidden" : ""
                }`}
                onClick={() => {
                  setIsSignupOpen(true);
                }}
              >
                Register
              </button>
            </div>
            <div className="flex items-center h-[5rem]">
              <button
                className={`sm:px-3 text-lg rounded text-primary sm:py-2 hover:text-[white] hover:bg-[black] transition-all duration-200 ${
                  islogin ? "hidden" : ""
                }`}
                onClick={() => {
                  setIsLoginOpen(true);
                }}
              >
                Login
              </button>
            </div>
            <div className="flex items-center h-[5rem]">
              <button
                className={`sm:px-3 text-lg rounded text-primary sm:py-2 hover:text-[white] hover:bg-[black] transition-all duration-200 ${
                  islogin ? "" : "hidden"
                }`}
                onClick={() => {
                  handleMenuClick("add-item");
                }}
              >
                <span className="flex items-center gap-1">
                  <FaPlus className=" inline" />
                  Add Item
                </span>
              </button>
            </div>
          </>
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
                  <span className="ml-1 mr-1">{islogin ? User?.name : ""}</span>
                  <IoIosArrowDown
                    className={`w-5 h-5 transform transition-transform duration-300 ${
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
                        {islogin ? User?.name : "Welcome to Rentify!"}
                      </div>
                      <button
                        className="px-4 py-2 mt-2 mb-5  bg-[#002f34] mx-auto text-white w-[90%] h-[2.5rem] bg-[#002f34] rounded-sm cursor-pointer"
                        onClick={() => handleMenuClick("view-profile")}
                      >
                        {islogin ? "View and edit profile" : "Login"}{" "}
                      </button>
                    </div>
                    <hr></hr>
                    <ul className="py-2 text-gray-700">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleMenuClick("add-item")}
                      >
                        <FaCamera className="mr-2" /> Add Item
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleMenuClick("my-ads")}
                      >
                        <FaList className="mr-2" /> My ADS
                      </li>
                      {islogin && (
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                          onClick={toggleRequestDropdown}
                        >
                          <FaClock className="mr-2" /> Requests
                          <IoIosArrowDown
                            className={`ml-auto ${
                              requestDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </li>
                      )}

                      {requestDropdownOpen && (
                        <ul className="ml-6 bg-gray-50 shadow-md rounded-md">
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => handleMenuClick("sent")}
                          >
                            📤 Sent
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => handleMenuClick("received")}
                          >
                            📥 Received
                          </li>
                        </ul>
                      )}
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleMenuClick("wishlist")}
                      >
                        <FaHeart className="mr-2" /> Wishlist
                      </li>
                      {islogin && (
                        <>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                            onClick={() => handleMenuClick("settings")}
                          >
                            <FaCog className="mr-2" /> Settings
                          </li>
                        </>
                      )}
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleMenuClick("help")}
                      >
                        <FaQuestion className=" mr-2" /> Help
                      </li>

                      <li
                        onClick={handleLogout}
                        className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center ${
                          islogin ? "" : "hidden"
                        }`}
                      >
                        <FaSignOutAlt className="mr-2" />{" "}
                        {isLoading ? <Spinner /> : "Logout"}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1500px] flex justify-between lg:hidden">
          <div
            className="flex items-center h-[5rem] mt-3 text-[1.5rem] font-bold ml-6 cursor-pointer"
            onClick={() => nav("/")}
          >
            <span className="bg-[black] p-1  rounded-lg text-[white]">
              Rent
            </span>{" "}
            <span className="">Ify</span>
          </div>
          <div
            className={`h-[6rem] items-center mr-6 ${
              mobile ? "hidden" : "flex"
            } ease-in-out transition-h duration-500 cursor-pointer`}
            onClick={() => setmobile(true)}
          >
            <RiMenu2Line className="w-[50px] h-[50px]" />
          </div>
          <div
            className={`h-[6rem] items-center mr-6 ${
              mobile ? "flex" : "hidden"
            } ease-in-out transition-all duration-500 cursor-pointer`}
            onClick={() => setmobile(false)}
          >
            <RxCross2 className="w-[50px] h-[50px]" />
          </div>
        </div>
      </div>
      {mobile && (
        <div className="h-[100vh] z-[50] block lg:hidden w-full bg-[rgb(214,222,228)] ease-in-out transition-all duration-500">
          <div className="w-full p-4 flex gap-[20px] border-sizing pb-[50px] border-b border-[#002f34]">
            {User?.profileImage ? (
              <img
                alt="profile"
                className="w-12 h-12 mt-2 rounded-full"
                src={User?.profileImage}
              />
            ) : (
              <FaUserCircle className="w-12 h-12 mt-2" />
            )}
            <div className="flex flex-col w-[80%]">
              <h1 className="text-[1.3rem] font-bold">
                {islogin ? User?.name : "Welcome to Rentify!"}
              </h1>
             
              {islogin ? (
                <button
                  className="text-white w-[90%] h-[2.5rem] bg-[#002f34] rounded-sm mt-4"
                  onClick={() => handleMenuClick("view-profile")}
                >
                  View and edit profile
                </button>
              ) : (
                <>
                  <button
                    className="text-white w-[90%] h-[2.5rem] bg-[#002f34] rounded-sm mt-4"
                    onClick={() => setIsLoginOpen(true)}
                  >
                    Login
                  </button>
                  <button
                    className="text-white w-[90%] h-[2.5rem] bg-[#002f34] rounded-sm mt-2 mb-2"
                    onClick={() => setIsSignupOpen(true)}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col text-[1.3rem] border-b border-[#002f34]">
            <button
              className="h-[3.5rem] w-full text-left p-4 hover:bg-[rgb(123,194,217)]"
              onClick={() => handleMenuClick("add-item")}
            >
              <span>
                <FaCamera className="inline mr-3" />
              </span>{" "}
              Add Item
            </button>
            <button
              className="h-[3.5rem] w-full text-left p-4 hover:bg-[rgb(123,194,217)]"
              onClick={() => handleMenuClick("my-ads")}
            >
              <LuClipboardList className="inline mr-3" /> My ADS
            </button>
            {islogin && (
                        <li
                          className="px-4 py-2 hover:bg-[rgb(123,194,217)] cursor-pointer flex items-center justify-between"
                          onClick={toggleRequestDropdown}
                        >
                          <FaClock className="mr-2" /> Requests
                          <IoIosArrowDown
                            className={`ml-auto ${
                              requestDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </li>
                      )}

                      {requestDropdownOpen && (
                        <ul className="ml-6  shadow-md rounded-md">
                          <li
                            className="px-4 py-2 hover:bg-[rgb(123,194,217)] cursor-pointer flex items-center"
                            onClick={() => handleMenuClick("sent")}
                          >
                            📤 Sent
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-[rgb(123,194,217)] cursor-pointer flex items-center"
                            onClick={() => handleMenuClick("received")}
                          >
                            📥 Received
                          </li>
                        </ul>
                      )}
            <button
              className="h-[3.5rem] w-full text-left p-4 hover:bg-[rgb(123,194,217)]"
              onClick={() => handleMenuClick("wishlist")}
            >
              <GrFavorite className="inline mr-3" /> Wishlist
            </button>
            {islogin && (
              <>
                <button
                  className="h-[3.5rem] w-full text-left p-4 hover:bg-[rgb(123,194,217)]"
                  onClick={() => handleMenuClick("settings")}
                >
                  <FaCog className="inline mr-3" /> Settings
                </button>
              </>
            )}
            <button
              className="h-[3.5rem] w-full text-left p-4 hover:bg-[rgb(123,194,217)]"
              onClick={() => handleMenuClick("help")}
            >
              <FaQuestion className="inline mr-3" /> Help
            </button>
            <button
              onClick={handleLogout}
              className={`h-[3.5rem] w-full text-left p-4 hover:bg-[rgb(123,194,217)] ${
                islogin ? "" : "hidden"
              }`}
            >
              <FaSignOutAlt className="mr-2 inline" />{" "}
              {isLoading ? <Spinner /> : "Logout"}
            </button>
          </div>
        </div>
      )}
      <Signup isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}
