import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import { setUser } from "../Redux/Slices/UserSlice";
import initiatePayment from "./Payment";

export default function RequestsComponent() {
  const nav = useNavigate();
  const location = useLocation();
  const isSentRequests = location.pathname.includes("sent");
  const [activeTab, setActiveTab] = useState("pending");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnloading, setbtnLoading] = useState(false);
  const url = useSelector((state) => state.api.value);
  const token = localStorage.getItem("token");
  const [showUpiPopup, setShowUpiPopup] = useState(false);
  const [upiId, setUpiId] = useState("");
  const User = useSelector((state)=>state.User.value);
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(localStorage.getItem("orderId") || null);
  const [errorMessage,seterrorMessage] = useState("");

  async function fetchRequests() {
    setLoading(true);
    try {
      const endpoint = isSentRequests
        ? "item/requests-sent"
        : "item/requests-received";
      const response = await axios.post(
        url + endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      if (response?.data?.data?.receivedRequests) {
        setRequests(response?.data?.data?.receivedRequests);
      } else {
        setRequests(response?.data?.data?.sentRequests);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchRequests();
  }, [isSentRequests, token, url, activeTab]);

  const filteredRequests = Array.isArray(requests) && requests?.filter(
    (request) => request.status === activeTab
  );

  function handleProfileNavigate(userId) {
    if (
      location.pathname === "/sent-requests" ||
      location.pathname === "/receive-requests"
    ) {
      nav(`/profile/${userId}`, { state: { from: location.pathname } });
    } else {
      nav(`/business/requests/profile/${userId}`, {
        state: { from: "/receive-requests" },
      });
    }
  }

  function handleNavigate(itemId) {
    if (
      location.pathname === "/sent-requests" ||
      location.pathname === "/receive-requests"
    ) {
      nav(`/item/${itemId}`, {
        state: { from: location.pathname, status: activeTab },
      });
    } else {
      nav(`/business/requests/item/${itemId}`, {
        state: { from: "/receive-requests", status: activeTab },
      });
    }
  }

  const handleAccept = async (requestId) => {
    setbtnLoading('accept'+requestId);

    if (!User?.upi_id) {
      setShowUpiPopup(true);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${url}item/accept-request/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      if (response?.status === 200) {
        fetchRequests();
        setRequests(response?.data?.data?.requests);
        toast.success("Accepted the request");
      }
    } catch (error) {
      setbtnLoading(false);
      toast.error("failed to accept");
      
    } finally {
      setbtnLoading(false);
    }
  };

  const handleUpiSubmit = async () => {
    setbtnLoading('save');
    const profile = {upi_id:upiId};
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
      seterrorMessage(err?.response?.data?.message);
      setbtnLoading(false);
    }  finally {
      setbtnLoading(false);
    }
  };

  useEffect(() => {
    const checkPaymentStatus = async () => {
        if (!orderId) return;

        try {
            const response = await fetch(`${url}item/payment-status/${orderId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();
            if (data?.data?.order_status==="PAID") {
                toast.success("✅ Payment Successful!");
            } else {
                toast.error("❌ Payment Failed! Please try again.");
            }
        } catch (error) {
            console.error("❌ Error checking payment status:", error);
            toast.error("❌ Error checking payment status.");
        } finally {
            localStorage.removeItem("orderId");
            setOrderId(null);
        }
    };

    if (orderId) {
        checkPaymentStatus();
    }
}, [orderId]);

  const handleReject = async (requestId) => {
    setbtnLoading('reject'+requestId);
    try {
      const response = await axios.post(
        `${url}item/reject-request/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      if (response?.status === 200) {
        fetchRequests();
        setRequests(response?.data?.data?.requests);
        toast.success("Rejected the request");
      }
    } catch (error) {
      toast.error("failed to reject");
      setbtnLoading(false);
    } finally {
      setbtnLoading(false);
    }
  };

  const handleCancelRequest = async (requestId) => {
    setbtnLoading('cancel'+requestId);
    try {
      const response = await axios.post(
        `${url}item/cancel-request/${requestId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );
      if (response?.status === 200) {
        fetchRequests();
        toast.success(`Request Canceled`);
      }
    } catch (err) {
      console.error(err?.response?.data);
    } finally {
      setbtnLoading(false);
    }
  };

  return (
    <div className="md:w-[700px] mx-auto sm:p-2">
      <h2 className="text-xl lg:text-3xl font-semibold mb-4 text-center py-3 border-b border-gray-300">
        {isSentRequests ? "SENT RENTAL REQUESTS" : "RECEIVED RENTAL REQUESTS"}
      </h2>
      {/* Tabs */}
      <div className="flex justify-center flex-wrap mb-6">
        {["pending", "approved", "completed"].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer lg:w-40 text-center text-lg px-4 py-2 border mx-2 rounded transition-all ${
              activeTab === tab
                ? "bg-teal-600 text-white font-bold"
                : "text-gray-800 hover:bg-gray-200"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      {/* Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center py-6">
          <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredRequests?.length > 0 ? (
        <div className="space-y-4">
          {filteredRequests?.map((request) => (
            <div
              key={request.id}
              className="bg-white p-4 rounded-lg shadow-md border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {request?.itemId?.title}
                  </h2>
                  <p>Price: ₹ {request?.itemId?.price}</p>
                  <div className="mt-2 font-medium">
                    {isSentRequests ? "Owner:" : "Requested by:"}{" "}
                    {isSentRequests
                      ? request?.receiverId?.name
                      : request?.senderId?.name}
                  </div>
                  <div className="mt-1">
                    Contact:{" "}
                    {isSentRequests
                      ? request?.receiverId?.email
                      : request?.senderId?.email}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-teal-600 text-white hover:bg-teal-700 px-3 py-1 rounded"
                    onClick={() => handleNavigate(request?.itemId?._id)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() =>
                      isSentRequests
                        ? handleProfileNavigate(request?.receiverId?._id)
                        : handleProfileNavigate(request?.senderId?._id)
                    }
                  >
                    View Profile
                  </button>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                {isSentRequests
                  ? activeTab === "pending" && (
                      <div className="w-full flex justify-between items-center gap-2">
                        <span className="py-1 text-green-500">
                          Waiting for approval
                        </span>
                        <button
                          onClick={() => handleCancelRequest(request?._id)}
                          className="w-[40%] md:h-10 p-1 rounded-md mt-2 border-2 text-[#002f34] border-[#002f34] hover:bg-[#002f34] hover:text-white"
                        >
                          {btnloading==='cancel'+request?._id ? <Spinner /> : "Cancel Request"}
                        </button>
                      </div>
                    )
                  : activeTab === "pending" && (
                      <div className="w-full flex justify-between items-center gap-2">
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded"
                          onClick={() => handleAccept(request._id)}
                        >
                          {btnloading==='accept'+request._id?<Spinner/>:"Accept"}
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded"
                          onClick={() => handleReject(request._id)}
                        >
                          {btnloading==='reject'+request._id?<Spinner/>:"Reject"}
                        </button>
                      </div>
                    )}
                {isSentRequests
                  ? activeTab === "approved" && (
                      <div className="w-full flex justify-between items-center gap-2">
                        <span className="py-1 text-green-500">
                          Request approved
                        </span>
                        <button onClick={async() => {
                          setbtnLoading('payment'+request._id);
                          await initiatePayment(url,request?.itemId?.price,request?._id);
                          setbtnLoading(false);
                        }} className=" w-[40%] md:h-10 p-1 rounded-md mt-2 border-2 bg-[#002f34] text-white">
                          {btnloading==='payment'+request._id?<Spinner/>:'Proceed with payment'}
                        </button>
                      </div>
                    )
                  : activeTab === "approved" && (
                      <div className="w-full flex justify-between items-center gap-2">
                        <span className="px-3 py-1 bg-green-500 text-white rounded">
                          Approved
                        </span>
                        <span className="px-3 py-1 bg-[#002f34] text-white rounded md:text-lg text-xs">
                          Waiting for payment from user
                        </span>
                      </div>
                    )}
                {activeTab === "completed" && (
                  <>
                    <span className="py-1 text-green-500">Rent Completed</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No {activeTab.toLowerCase()} requests found.
        </p>
      )}

<div className="md:w-[700px] mx-auto sm:p-2">
      {showUpiPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-semibold mb-4">Add UPI ID</h2>
            <p className="text-gray-700 mb-2">To receive payment, please add your UPI ID.</p>
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => {setShowUpiPopup(false);seterrorMessage("");setUpiId("");setbtnLoading(false)}}>Cancel</button>
              <button className="px-4 py-2 bg-teal-600 text-white rounded" onClick={handleUpiSubmit}>{btnloading==='save'?<Spinner/>:"Save"}</button>
            </div>
            {errorMessage && (
            <span className="text-red-500 text-center mt-3 text-md block ml-2 mt-2">
              {errorMessage}
            </span>
          )}
            <p className="text-sm text-center text-gray-500 mt-4">You can edit your payment details in <span className="text-teal-600 cursor-pointer" onClick={() => nav('/settings')}>Settings</span>.</p>
          
          </div>
          
        </div>
      )}
     
      
    </div>
    </div>
  );
}
