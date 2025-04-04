import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaCalendarAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const defaultImage = "https://icon-library.com/images/download_103236.svg.svg";

export default function UserProfileComponent() {
  const { userId } = useParams();
  const url = useSelector((state) => state.api.value);
  const [loading, setLoading] = useState(true);
  const [profileDetails, setProfileDetails] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${url}item/get-user-profile/${userId}`);
      if (response.status === 200) {
        const profile = response?.data?.data?.user || {};
        setProfileDetails(profile);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [url]);

  const maskPhoneNumber = (phone) => {
    if (!phone) return "Unavailable";
    return phone.slice(0, 3) + "******" + phone.slice(-2);
  };

  return (
    <div className="max-w-4xl md:w-[500px] mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      {/* Profile Picture */}
      <div className="flex justify-center">
        {loading ? (
          <div className="w-32 h-32 rounded-full bg-gray-300 animate-pulse"></div>
        ) : (
          <img
            src={profileDetails?.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-200"
            onError={(e) => (e.target.src = defaultImage)}
          />
        )}
      </div>

      {/* User Details */}
      <div className="text-center mt-4">
        {loading ? (
          <div className="h-6 w-48 bg-gray-300 animate-pulse mx-auto mb-2 rounded"></div>
        ) : (
          <h2 className="text-2xl font-bold mb-2">
            {profileDetails?.name?.charAt(0)?.toUpperCase() +
              profileDetails?.name?.slice(1)}
          </h2>
        )}

        {loading ? (
          <div className="h-4 w-32 bg-gray-300 animate-pulse mx-auto rounded"></div>
        ) : (
          <p className="text-gray-600 flex items-center justify-center">
            <FaMapMarkerAlt className="mr-1" />{" "}
            {profileDetails !== ""
              ? profileDetails?.location?.toUpperCase()
              : "Unavailable"}
          </p>
        )}
      </div>

      {/* Contact Info */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
        <div className="space-y-2">
          {loading ? (
            <>
              <div className="h-4 w-64 bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 w-56 bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 w-48 bg-gray-300 animate-pulse rounded"></div>
            </>
          ) : (
            <>
              <p className="flex items-center">
                <FaEnvelope className="mr-2" /> {profileDetails?.email}
              </p>
              <p className="flex items-center">
                <FaPhone className="mr-2" />
                {token
                  ? profileDetails?.phone
                    ? profileDetails.phone
                    : "Unavailable"
                  : maskPhoneNumber(profileDetails.phone)}
              </p>
              <p className="flex items-center">
                <FaCalendarAlt className="mr-2" /> Joined on{" "}
                {new Date(profileDetails?.createdAt).toLocaleDateString()}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-semibold mb-3">Social Links</h3>
        {loading ? (
          <div className="h-6 w-32 bg-gray-300 animate-pulse mx-auto rounded"></div>
        ) : (
          <div className="flex space-x-4 justify-center">
            {profileDetails && (
              <a
                href={"https://www.linkedin.com/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <FaLinkedin size={24} />
              </a>
            )}
            {profileDetails && (
              <a
                href={"https://github.com/"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-900"
              >
                <FaGithub size={24} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
