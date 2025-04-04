import React from "react";

export default function DetailCard({ details, loading }) {
  if (loading) {
    return (
      <div className="border rounded-lg p-4 border-[rgba(5,10,27,0.2)] shadow-md animate-pulse">
        <div className="h-6 w-32 bg-gray-300 rounded mb-3"></div>
        <div className="h-6 w-48 bg-gray-300 rounded mb-5"></div>
        <hr className="mt-5 mb-5"></hr>
        <div className="h-6 w-40 bg-gray-300 rounded mb-3"></div>
        <div className="h-16 w-full bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 border border-[rgba(5,10,27,0.2)] shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-3">Details</h3>
      <p className="text-gray-700 font-semibold text-xl">
        {details?.title?.charAt(0)?.toUpperCase() + details?.title?.slice(1)}
      </p>
      <hr className="mt-5 mb-5"></hr>
      <h3 className="text-xl font-semibold mb-3">Description</h3>
      <p className="text-gray-700">
        {details?.description?.charAt(0)?.toUpperCase() +
          details?.description?.slice(1)}
      </p>
    </div>
  );
}
