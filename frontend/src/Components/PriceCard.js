import React, { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import { useLocation, useNavigate } from "react-router";
import Login from "../Pages/Login";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { setUser } from "../Redux/Slices/UserSlice";

export default function PriceCard({ details, loading }) {
  const location = useLocation();
  const isfromrequest = location.state?.from;
  const islogin = localStorage.getItem("token");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const url = useSelector((state) => state.api.value);
  const [reqStatus, setreqStatus] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [showUpiPopup, setShowUpiPopup] = useState(false);
  const [upiId, setUpiId] = useState("");
  const User = useSelector((state) => state.User.value);
  const dispatch = useDispatch();

  const checkRequestStatus = async () => {
    if (islogin) {
      try {
        const response = await axios.post(
          `${url}item/${
            isfromrequest === "/receive-requests"
              ? "check-receive-request-status"
              : "check-send-request-status"
          }`,
          {
            itemId: details?._id,
          },
          {
            headers: { Authorization: `Bearer ${islogin}` },
          }
        );
        if (response?.data?.data?.status !== "not_sent") {
          setreqStatus(response?.data?.data);
        } else {
          setreqStatus({ status: "not_sent" });
        }
      } catch (error) {
        console.error("Error checking request status:", error);
      }
    }
  };
  useEffect(() => {
    checkRequestStatus();
  }, [details, islogin, url, isLoading, isfromrequest]);

  const handleAccept = async (requestId) => {
    setisLoading(true);

    if (!User?.upi_id) {
      setShowUpiPopup(true);
      setisLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${url}item/accept-request/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${islogin}`, // Send token in Authorization header
          },
        }
      );
      if (response?.status === 200) {
        toast.success("Accepted the request");
        if (location.pathname.includes("/business")) {
          navigate("/business/requests");
        } else {
          navigate("/receive-requests");
        }
      }
    } catch (error) {
      toast.error("failed to accept");
    } finally {
      setisLoading(false);
    }
  };

  const handleUpiSubmit = async () => {
    setisLoading(true);
    const profile = {  upi_id: upiId };
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
        toast.success("Upi_id Updated");
        setShowUpiPopup(false);
      }
    } catch (err) {
    } finally {
      setisLoading(false);
    }
  };

  const handleReject = async (requestId) => {
    setisLoading(true);
    try {
      const response = await axios.post(
        `${url}item/reject-request/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${islogin}`, // Send token in Authorization header
          },
        }
      );
      if (response?.status === 200) {
        toast.success("Rejected the request");
        if (location.pathname.includes("/business")) {
          navigate("/business/requests");
        } else {
          navigate("/receive-requests");
        }
      }
    } catch (error) {
      toast.error("failed to reject");
    } finally {
      setisLoading(false);
    }
  };

  const handleSubmit = async () => {
    setisLoading(true);
    if (reqStatus?.status === "pending") {
      try {
        const response = await axios.post(
          `${url}item/cancel-request/${reqStatus?.requestId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${islogin}`, // Send token in Authorization header
            },
          }
        );
        if (response?.status === 200) {
          checkRequestStatus();
          toast.success(`Request Canceled`);
        }
      } catch (err) {
        console.error(err?.response?.data);
      } finally {
        setisLoading(false);
      }
    } else {
      try {
        const response = await axios.post(
          `${url}item/send-request`,
          { receiverId: details?.ownerId?._id, itemId: details?._id }, // Send formData directly, NOT wrapped inside an object
          {
            headers: {
              Authorization: `Bearer ${islogin}`, // Send token in Authorization header
              "Content-Type": "multipart/form-data", // Correct content type for file uploads
            },
          }
        );
        if (response?.status === 200) {
          checkRequestStatus();
          toast.success(`Request sent`);
        }
      } catch (err) {
        console.error(err?.response?.data);
      } finally {
        setisLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="border rounded-lg p-4 col-span-1 row-span-2 border-[rgba(5,10,27,0.2)] shadow-md animate-pulse">
        <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-48 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-40 bg-gray-300 rounded mb-4"></div>
        <div className="h-16 w-full bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 col-span-1 row-span-2 border border-[rgba(5,10,27,0.2)] shadow-md  transition-shadow">
      <h2 className="text-2xl font-bold">₹ {details?.price}/month</h2>
      <p className="text-lg my-2">
        {details?.title?.charAt(0)?.toUpperCase() + details?.title?.slice(1)}
      </p>
      <p className="text-sm text-gray-500 mb-6">
        {details?.location?.toUpperCase()} • {details?.postedTime}
      </p>
      {isfromrequest === "/receive-requests" ? (
        <>
          <h3 className="mb-2 text-xl ">Requested User Details</h3>
          <ProfileCard details={reqStatus?.senderId} />
        </>
      ) : isfromrequest === "/send-requests" ? (
        <>
          <h3 className="mb-2 text-xl ">Owner Details</h3>
          <ProfileCard details={reqStatus?.receiverId} />
        </>
      ) : (
        <>
          <h3 className="mb-2 text-xl ">Owner Details</h3>
          <ProfileCard details={details?.ownerId} />
        </>
      )}

      {isfromrequest === "/receive-requests" &&
      reqStatus?.status === "pending" ? (
        <div className="flex space-x-2 mt-4 sm:px-4 text-[10px] sm:text-[1rem]">
          <button
            onClick={() => handleAccept(reqStatus?.requestId)}
            className="px-3  py-1 bg-green-500 text-white rounded"
          >
            Accept
          </button>
          <button
            onClick={() => handleReject(reqStatus?.requestId)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Reject
          </button>
        </div>
      ) : isfromrequest !== "/receive-requests" &&
        reqStatus?.status === "pending" ? (
        <button
          className={` w-[60%] h-[2.6rem] ${
            reqStatus?.status === "pending"
              ? "border-2 text-[#002f34] border-[#002f34] hover:bg-[#002f34] hover:text-white"
              : "bg-[#002f34] text-white "
          } rounded-md mt-5`}
          onClick={() => (islogin ? handleSubmit() : setIsLoginOpen(true))}
        >
          {isLoading ? (
            <Spinner />
          ) : reqStatus?.status === "pending" ? (
            "Cancel Request"
          ) : (
            "Send Request"
          )}
        </button>
      ) : reqStatus?.status === "completed" ? (
        <p className=" py-1 text-blue-500 rounded pt-3 ml-3">Rent Completed</p>
      ) : reqStatus?.status === "approved" ? (
        <p className=" py-1 text-green-500 rounded pt-3 ml-3">
          {isfromrequest === "/receive-requests"
            ? "Request Approved by You"
            : `Request Approved by ${reqStatus?.receiverId?.name}`}
        </p>
      ) : (
        <button
          className={` w-[60%] h-[2.6rem] ${
            reqStatus?.status === "pending"
              ? "border-2 text-[#002f34] border-[#002f34] hover:bg-[#002f34] hover:text-white"
              : "bg-[#002f34] text-white "
          } rounded-md mt-5`}
          onClick={() => (islogin ? handleSubmit() : setIsLoginOpen(true))}
        >
          {isLoading ? (
            <Spinner />
          ) : reqStatus?.status === "pending" ? (
            "Cancel Request"
          ) : (
            "Send Request"
          )}
        </button>
      )}

      <div className="md:w-[700px] mx-auto sm:p-2">
        {showUpiPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-xl font-semibold mb-4">Add UPI ID</h2>
              <p className="text-gray-700 mb-2">
                To receive payment, please add your UPI ID.
              </p>
              <input
                type="text"
                placeholder="Enter UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => setShowUpiPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-teal-600 text-white rounded"
                  onClick={handleUpiSubmit}
                >
                  {isLoading?<Spinner/>:"Save"}
                </button>
              </div>
              <p className="text-sm text-center text-gray-500 mt-4">
                You can edit your payment details in{" "}
                <span
                  className="text-teal-600 cursor-pointer"
                  onClick={() => navigate("/settings")}
                >
                  Settings
                </span>
                .
              </p>
            </div>
          </div>
        )}
      </div>
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
