import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaCalendar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"; // Ensure correct import
import Spinner from "./Spinner";
import { setItems } from "../Redux/Slices/ItemSlice";

export default function OwnerItemCard({ details, isload }) {
  const path = useLocation().pathname;
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  const url = useSelector((state) => state.api.value);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  function handleNavigate() {
    if (path === "/myads") {
      nav(`/edit-item/${details?._id}`); // Passing item details if needed
    } else {
      nav(`/business/edit-item/${details?._id}`);
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const response = await axios.delete(
        `${url}item/delete-item/${details._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        }
      );

      if (response?.status === 200) {
        dispatch(setItems(response?.data?.data?.items));
        toast.success("Item Deleted Successfully");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setisLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const createdDate = new Date(dateString);
    const today = new Date();
    const diffTime = today - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays >= 2 && diffDays <= 7) return `${diffDays} days ago`;

    return createdDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    }); // Example: "6 March"
  };

  if (isload) {
    return (
      <div className="border rounded-lg p-2 border-[rgba(5,10,27,0.2)] shadow-sm animate-pulse flex flex-row items-center space-y-0 sm:space-x-4">
        <div className="lg:w-32 lg:h-32 h-20 w-20 bg-gray-300 rounded-lg"></div>
        <div className="flex-1 space-y-2 px-3">
          <div className="h-6 bg-gray-300 rounded w-24"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-48"></div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="h-10 bg-gray-300 rounded w-16"></div>
          <div className="h-10 bg-gray-300 rounded w-16"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-2 border-[rgba(5,10,27,0.2)] shadow-sm hover:shadow-md transition-shadow flex flex-row items-center space-y-0 sm:space-x-4">
      {/* Image Section */}
      <img
        src={details?.images?.[0]}
        alt="Item Thumbnail"
        className="lg:w-32 lg:h-32 h-20 w-20 object-cover rounded-lg"
      />

      {/* Content Section */}
      <div className="flex-1 space-y-2 px-3 text-left">
        <h2 className="sm:text-2xl text-lg font-bold">₹ {details?.price}/mo</h2>
        <p className="sm:text-lg text-md">
          {details?.title?.charAt(0)?.toUpperCase() + details?.title?.slice(1)}
        </p>
        <p className="sm:text-sm text-[10px] text-gray-500 flex items-center">
          <FaLocationDot className="inline mr-1" />
          {details?.location?.toUpperCase()}{" "}
          <span className="ml-4 my-center">
            <FaCalendar className="inline" /> {formatDate(details?.createdAt)}
          </span>
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col space-y-2">
        <button
          onClick={handleNavigate} // Moved onClick to the button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center"
        >
          <AiOutlineEdit className="mr-2" />
          <p className="hidden sm:block">Edit</p>
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center"
        >
          <AiOutlineDelete className="mr-2" />
          <div className="hidden sm:block">
            {isLoading ? <Spinner /> : "Delete"}
          </div>
        </button>
      </div>
    </div>
  );
}
