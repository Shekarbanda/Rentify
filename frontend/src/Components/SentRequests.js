import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const requests = [
  {
    id: 1,
    itemName: "Camera",
    price: 12000,
    itemDescription: "High-quality DSLR Camera for professional photography.",
    user: { name: "Shekar", contact: "shekar@example.com" },
    status: "Pending",
  },
  {
    id: 2,
    itemName: "Laptop",
    price: 12000,
    itemDescription: "Gaming laptop with high-end specs.",
    user: { name: "Muni", contact: "muni@example.com" },
    status: "Approved",
  },
  {
    id: 3,
    itemName: "Laptop",
    price: 12000,
    itemDescription: "Gaming laptop with high-end specs.",
    user: { name: "Muni", contact: "muni@example.com" },
    status: "Pending",
  },
  {
    id: 4,
    itemName: "Laptop",
    price: 12000,
    itemDescription: "Gaming laptop with high-end specs.",
    user: { name: "Muni", contact: "muni@example.com" },
    status: "Completed",
  },
  {
    id: 5,
    itemName: "Laptop",
    price: 12000,
    itemDescription: "Gaming laptop with high-end specs.",
    user: { name: "Muni", contact: "muni@example.com" },
    status: "Approved",
  },
];

export default function SentRequests() {
  const nav = useNavigate();
  const [activeTab, setActiveTab] = useState("Pending");
  const path = useLocation().pathname;
  function HandleProfileNavigate() {
    if (path === "/requests") {
      nav("/profile/userid123");
    } else {
      nav("/business/requests/profile/userid", { state: { from: path } });
    }
  }

  const handleNavigate = (status) => {
    if (path === "/sent-requests") {
      nav("/item/id123", { state: { from: path, status: status } });
    } else {
      nav("/business/requests/item/id", {
        state: { from: path, status: status },
      });
    }
  };

  const filteredRequests = requests.filter(
    (request) =>
      (activeTab === "pending" && request.status === "pending") ||
      (activeTab === "approved" && request.status === "approved") ||
      (activeTab === "completed" && request.status === "completed")
  );

  return (
    <div className="max-w-[2000px] mx-auto sm:p-2">
      <h2 className="text-3xl font-semibold mb-4 text-center py-3 border-b border-[rgba(91,92,96,0.2)]">
        REQUESTS SENT
      </h2>
      {/* Tabs */}
      <div className="flex justify-center flex-wrap mb-6">
        {["pending", "approved", "completed"].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative cursor-pointer text-lg sm:text-xl px-2 text-center sm:px-[40px] py-2 border-r border-l transition-all hover:bg- ${
              activeTab === tab
                ? "bg-teal-600 text-white font-bold"
                : " text-gray-800"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <div
              key={request.id}
              className="bg-white p-4 rounded-lg shadow-md border transition-all "
              whileHover={{ scale: 1.03 }}
            >
              <div className="max-w-[1000px] lg:min-w-[800px] sm:gap-10 gap-3 sm:px-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{request.itemName}</h2>
                  <p>Price: {request.price}</p>
                  <div className="mt-2">
                    <span className="font-medium">Requested by:</span>{" "}
                    {request.user.name}
                  </div>
                  <div className="mt-1">
                    <span className="font-medium">Contact:</span>{" "}
                    {request.user.contact}
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-[10px] sm:text-[1rem]">
                  <button
                    className="bg-teal-600 text-white hover:bg-teal-700 transition-all px-3 py-1 rounded"
                    onClick={() => handleNavigate(request.status)}
                  >
                    View Full Details
                  </button>
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={HandleProfileNavigate}
                  >
                    User Profile
                  </button>
                </div>
              </div>
              <div className="flex space-x-2 mt-4 sm:px-4 text-[10px] sm:text-[1rem]">
                {activeTab == "Pending" ? (
                  <>
                    <span className="py-1 text-red-500 rounded">
                      Not accepted yet
                    </span>
                  </>
                ) : activeTab == "Approved" ? (
                  <>
                    <span className="py-1 text-green-500 rounded">
                      Accepted
                    </span>
                  </>
                ) : (
                  <span className=" py-1 text-blue-500 rounded">
                    Rent Completed
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No {activeTab.toLowerCase()} requests found.
          </p>
        )}
      </div>
    </div>
  );
}
