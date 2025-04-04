import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router";

export default function ProfileCard({ details }) {
  const [imageError, setImageError] = useState(false);
  const nav = useNavigate();

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md border border-[rgba(5,10,27,0.2)] transition-shadow flex items-center space-x-4 ">
      {imageError || !details?.profileImage ? (
        <CgProfile className="w-12 h-12 text-gray-500" />
      ) : (
        <img
          src={details?.profileImage}
          alt="Owner"
          className="w-12 h-12 rounded-full"
          onError={() => setImageError(true)}
        />
      )}
      <div>
        <h3 className="text-lg font-semibold ml-1">{details?.name}</h3>
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition"
          onClick={() => nav(`/profile/${details._id}`)}
        >
          View Profile
        </button>
      </div>
    </div>
  );
}
