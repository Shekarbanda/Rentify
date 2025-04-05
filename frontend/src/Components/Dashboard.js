import React, { useEffect, useState } from "react";
import OwnerItemCard from "./OwnerItemCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setItems, setLoad } from "../Redux/Slices/ItemSlice";
import axios from "axios";
import Spinner from "./Spinner";

export default function Dashboard() {
  const myAds = useSelector((state) => state.Item.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const load = useSelector((state) => state.Item.load);
  const url = useSelector((state) => state.api.value);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState();

  const token = localStorage.getItem("token");

  async function fetchRequests() {
    setLoading(true);
    try {
      const response = await axios.post(
        url + "item/requests-received",
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
  }, [token, url]);

  const fetchMyads = async () => {
    dispatch(setLoad(true));
    try {
      const response = await axios.get(`${url}item/get-my-ads`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in Authorization header
          "Content-Type": "multipart/form-data", // Correct content type for file uploads
        },
      });
      if (response.status === 200) {
        const items = response?.data?.data?.items || [];
        dispatch(setItems(items));
        dispatch(setLoad(false));
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

  return (
    <>
      <div>
        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}

          <h1 className="text-center text-3xl font-semibold p-4  rounded-lg shadow-sm ">
            WELCOME TO DASHBOARD
          </h1>
          {/* Main Content */}
          <div className="p-4">
            {/* Dashboard Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-green-200 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Total Items</h3>
                <p className="text-3xl">{requests?myAds.length:<Spinner/>}</p>
              </div>

              <div className="p-4 bg-yellow-200 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Pending Requests</h3>
                <p className="text-3xl">
                  {
                    requests?requests.filter((request) => request.status === "pending")
                      .length:<Spinner/>
                  }
                </p>
              </div>
              <div className="p-4 bg-purple-200 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Completed Rents</h3>
                <p className="text-3xl">
                  {
                    requests?requests.filter(
                      (request) => request.status === "completed"
                    ).length:<Spinner/>
                  }
                </p>
              </div>
            </div>

            {/* Items Section */}
            <h2 className="text-2xl font-bold mb-4">Recent Items</h2>
            <div className="grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-4 ">
              {myAds?.length > 0 ? (
                myAds
                  ?.slice(0, 6)
                  .map((myAd, index) => (
                    <OwnerItemCard key={index} details={myAd} isload={false} />
                  ))
              ) : load ? (
                [...Array(6)].map((id) => <OwnerItemCard isload={true} />)
              ) : (
                <div className="col-span-2 text-center text-gray-500 text-lg py-6">
                  <h2>
                    🚀 No ads found! Looks like it's time to post your first
                    item.
                  </h2>
                  <button
                    onClick={() => navigate("/business/add-item")}
                    className="mt-5 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Add Item
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
