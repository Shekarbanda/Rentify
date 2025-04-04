import React from "react";

export default function LocationCard({ details, loading }) {
  if (loading) {
    return (
      <div className="border rounded-lg p-4 border-[rgba(5,10,27,0.2)] shadow-md animate-pulse">
        <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
        <div className="h-6 w-48 bg-gray-300 rounded"></div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 border border-[rgba(5,10,27,0.2)] shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">Posted In</h3>
      <p className="text-gray-700">{details?.location?.toUpperCase()}</p>
    </div>
  );
}
