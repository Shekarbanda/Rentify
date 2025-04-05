import React, { useEffect, useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { setUser } from "../Redux/Slices/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Spinner from "../Components/Spinner";
import axios from "axios";
import toast from "react-hot-toast";

const Login = ({ isOpen, onClose }) => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [isloginForm, setisloginForm] = useState(true);
  const [type, setType] = useState("individual");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, seterrorMessage] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const url = useSelector((state) => state.api.value);

  useEffect(() => {
    if (pass !== confirmpass && !isloginForm) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  }, [pass, confirmpass, isloginForm]);

  const handleClose = (e) => {
    resetform();
    setisloginForm(true);
    seterrorMessage(false);
    if (e.target.id === "modal-overlay") onClose();
  };

  function resetform() {
    setemail("");
    setpass("");
    setconfirmpass("");
    setusername("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isloginForm) {
      if (!email || !pass) {
        seterrorMessage("Please fill in all fields");
        return;
      }
      setisLoading(true);
      try {
        const response = await axios.post(`${url}auth/login`, {
          email,
          password: pass,
        });
        if (response?.status === 200) {
          localStorage.setItem("token", response?.data?.data?.token);
          localStorage.setItem('expiry',Date.now());
          dispatch(setUser(response?.data?.data?.user));
          const redirectPath = localStorage.getItem("redirectPath") || "/";
          localStorage.removeItem("redirectPath");
          seterrorMessage(false);
          if (response?.data?.data?.user?.role === "business") {
            navigate("/business/dashboard");
          } else {
            if (redirectPath === "/") {
              window.location.href = "/";
            } else navigate(redirectPath, { replace: true });
          }
          toast.success("Welcome " + response?.data?.data?.user?.name);
          onClose();
        }
      } catch (err) {
        console.error(err?.response.data.message);
        seterrorMessage(err?.response?.data?.message);
      } finally {
        setisLoading(false);
      }
    } else {
      if (!email || !pass || !username || !type || !confirmpass) {
        seterrorMessage("Please fill in all fields");
        return;
      }
      setisLoading(true);
      try {
        const response = await axios.post(`${url}auth/signup`, {
          email,
          password: pass,
          name: username,
          role: type,
        });
        if (response?.status === 200) {
          localStorage.setItem("token", response?.data?.data?.token);
          localStorage.setItem('expiry',Date.now());
          dispatch(setUser(response?.data?.data?.user));
          const redirectPath = localStorage.getItem("redirectPath") || "/";
          localStorage.removeItem("redirectPath");
          seterrorMessage(false);
          if (response?.data?.data?.user?.role === "business") {
            navigate("/business/dashboard");
          } else {
            if (redirectPath === "/") {
              window.location.href = "/";
            } else navigate(redirectPath, { replace: true });
          }
          toast.success("Welcome " + response?.data?.data?.user?.name);
          onClose();
        }
      } catch (err) {
        console.error(err?.response.data.message);
        seterrorMessage(err?.response?.data?.message);
      } finally {
        setisLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex px-3 md:px-0 justify-center items-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white md:p-5 p-1 rounded-lg shadow-lg w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            resetform();
            setisloginForm(true);
            onClose();
          }}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl lg:text-3xl"
        >
          <RxCross2 />
        </button>
        <form
          onSubmit={handleSubmit}
          className="p-4 max-w-[1400px] mx-auto flex flex-col justify-center"
        >
          <h1 className="lg:text-3xl text-xl font-bold text-center mb-7">
            {isloginForm ? "Welcome to Rentify" : "Sign Up"}
          </h1>
          <div className="flex flex-col gap-5 mb-3">
            {!isloginForm && (
              <div className="flex items-center gap-2">
                <FaRegUser className="w-[30px] h-[30px]" />
                <input
                  className="w-[100%] mx-auto border border-black h-[3rem] text-lg px-3 py-2 rounded-md"
                  type="text"
                  name="name"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  placeholder="Enter Username"
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <CiMail className="w-[30px] h-[30px]" />
              <input
                className="w-[100%] mx-auto border border-black h-[3rem] text-lg px-3 py-2 rounded-md"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter Email"
              />
            </div>
            <div className="flex items-center gap-2 relative">
              <RiLockPasswordLine className="w-[30px] h-[30px]" />
              <input
                className="w-[100%] mx-auto border border-black h-[3rem] text-lg px-3 py-2 rounded-md"
                type={showPassword ? "text" : "password"}
                name="password"
                value={pass}
                onChange={(e) => setpass(e.target.value)}
                placeholder="Enter Password"
              />
              <div
                className="absolute right-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={25} />
                ) : (
                  <AiOutlineEye size={25} />
                )}
              </div>
            </div>
            {!isloginForm && (
              <div className="">
                <div className="flex items-center mb-1 gap-2 relative">
                  <RiLockPasswordLine className="w-[30px] h-[30px]" />
                  <input
                    className="w-[100%] mx-auto border border-black h-[3rem] text-lg px-3 py-2 rounded-md"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmpass}
                    onChange={(e) => setconfirmpass(e.target.value)}
                    placeholder="Confirm Your Password"
                  />
                  <div
                    className="absolute right-3 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={25} />
                    ) : (
                      <AiOutlineEye size={25} />
                    )}
                  </div>
                </div>
                {passwordError && (
                  <p className=" text-red-500 text-sm ml-10 mt-0">
                    {passwordError}
                  </p>
                )}
              </div>
            )}

            <div
              className={`flex md:flex-row flex-col gap-1 ml-10 ${
                isloginForm ? "hidden" : ""
              }`}
            >
              <h2 className="text-lg font-semibold mr-2">Account Type : </h2>
              <div className="flex gap-5">
                <div className="flex gap-1">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    defaultChecked
                    id="individual"
                    name="type"
                    value="individual"
                    onChange={() => setType("individual")}
                  />
                  <label
                    className="cursor-pointer text-[1.1rem]"
                    htmlFor="individual"
                  >
                    Individual
                  </label>
                </div>
                <div className="flex gap-1">
                  <input
                    className="cursor-pointer"
                    type="radio"
                    id="business"
                    name="type"
                    value="business"
                    onChange={() => setType("business")}
                  />
                  <label
                    className="cursor-pointer text-[1.1rem]"
                    htmlFor="business"
                  >
                    Business
                  </label>
                </div>
              </div>
            </div>
          </div>
          {errorMessage && (
            <span className="text-red-500 text-sm block ml-2 mt-2">
              {errorMessage}
            </span>
          )}
          {passwordError ? (
            <button
              type="submit"
              disabled
              className={`disabled:cursor-not-allowed text-white w-[100%] bg-[#002f34] h-[3rem] text-xl rounded-md mt-2 mx-auto`}
            >
              {isLoading ? <Spinner /> : isloginForm ? "Login" : "Signup"}
            </button>
          ) : (
            <button
              type="submit"
              className={` text-white w-[100%] bg-[#002f34] h-[3rem] text-xl  rounded-md mt-2 mx-auto`}
            >
              {isLoading ? <Spinner /> : isloginForm ? "Login" : "Signup"}
            </button>
          )}

          <p className="text-lg mx-auto mt-5 text-center">
            {isloginForm
              ? "New User? "
              : "Already have an account on Rentify? "}
            <span
              onClick={() => {
                resetform();
                seterrorMessage(false);
                setisloginForm(!isloginForm);
              }}
              className="text-[blue] cursor-pointer"
            >
              {isloginForm ? " Signup here" : " Login here"}
            </span>
          </p>
          <p
            className={`text-[10px] text-center mt-3 ${
              !isloginForm ? "" : "hidden"
            }`}
          >
            By creating this account, you agree to our Terms and Conditions &
            Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
