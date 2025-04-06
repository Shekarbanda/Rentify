import React, { useState } from "react";
import { FaCalendar, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router";
import Login from "../Pages/Login";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setWishlist } from "../Redux/Slices/ItemSlice";

const Card = ({ isLoading, iswishlist, item, style1 }) => {
  const [isFavorite, setIsFavorite] = useState(iswishlist);
  const nav = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const url = useSelector((state) => state.api.value);
  const dispatch = useDispatch();
  const islogin = localStorage.getItem("token");
  const wishlist = useSelector((state)=>state.Item.wishlist);
  
  const checkFavourite = (itemId) => Array.isArray(wishlist) && wishlist.some(
    (item) => item._id === itemId
  );

  // Default image
  const defaultImage = "https://statics.olx.in/olxin/misc/emptyState_v1.png";

  // Format Date
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const createdDate = new Date(dateString);
    const today = new Date();
    const diffTime = today - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if(diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday";
    if (diffDays >= 2 && diffDays <= 7) return `${diffDays} days ago`;

    return createdDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    }); // Example: "6 March"
  };

  const handleFavorite = async(itemId)=>{
    try{
      const response = await axios.post(`${url}item/toggle-wishlist/${itemId}`,{},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
      }
      });
      dispatch(setWishlist(response?.data?.data?.wishlist));
      toast.success(response?.data?.data?.message);
    }
    catch(err){
      toast.error("failed to update wishlist");
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse cursor-pointer bg-gray-200 rounded-lg">
        <div
          className={`${
            style1 ? "min-w-[250px]" : "lg:min-w-[250px]"
          } h-[200px] bg-gray-300 rounded-t-lg`}
        ></div>
        <div className="p-2 w-full">
          <div className="h-4 bg-gray-300 mb-3 rounded"></div>
          <div className="h-3 bg-gray-300 mb-3 rounded"></div>
          <div className="flex h-3 bg-gray-300 justify-between mt-3 mb-1">
            <div className="h-3 bg-gray-300 mb-1 rounded"></div>
            <div className="h-3 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`${
          style1 ? "min-w-[250px]" : "lg:min-w-[250px]"
        } mb-2 bg-white shadow-lg rounded-lg overflow-hidden`}
      >
        {/* Image Section with Wishlist */}
        <div className="relative">
          <img
            src={item?.images?.[0] || defaultImage}
            alt="Item"
            className="w-full sm:h-48 h-30 object-cover"
            onError={(e) => (e.target.src = defaultImage)}
            onClick={() => nav(`/item/${item?._id}`)}
          />
          {/* Wishlist Icon */}
          <button
            className="absolute top-3 right-3 text-gray-400 bg-white p-1 rounded-full transition duration-300"
            onClick={() =>
              islogin ? handleFavorite(item?._id) : setIsLoginOpen(true)
            }
          >
            <FaHeart
              className={`text-xl ${
               (checkFavourite(item?._id)?"text-red-500":"")

              }`}
            />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4" onClick={() => nav(`/item/${item?._id}`)}>
          <h2 className="text-xl font-semibold text-gray-800">
            ₹ {item?.price}/day
          </h2>
          <p className="text-gray-700 font-medium">
            {item?.title?.charAt(0)?.toUpperCase() + item?.title?.slice(1)}
          </p>
          <div className="md:flex md:justify-between mt-3 md:items-center ">
            <p className="text-gray-600 text-sm flex items-center mb-1">
              <FaLocationDot className="inline mr-[1px] " />
              {(item?.location)?.toUpperCase()}
            </p>
            <p className="text-gray-500 text-xs flex items-center">
              <FaCalendar className="inline ml-[1.5px] mr-[1px] " />
              {formatDate(item?.createdAt)?.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Card;
