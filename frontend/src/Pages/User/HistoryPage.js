// import React from "react";
// import Navbar from "../../Components/Navbar";
// import Footer from "../../Components/Footer";
// import { useLocation, useNavigate } from "react-router";

// const items = [
//   {
//     id: 1,
//     itemName: "Camera",
//     price: 12000,
//     itemDescription: "High-quality DSLR Camera for professional photography.",
//     user: { name: "Shekar", contact: "shekar@example.com" },
//     status: "Completed",
//   },
//   {
//     id: 2,
//     itemName: "Laptop",
//     price: 12000,
//     itemDescription: "Gaming laptop with high-end specs.",
//     user: { name: "Muni", contact: "muni@example.com" },
//     status: "Completed",
//   },
//   {
//     id: 3,
//     itemName: "Laptop",
//     price: 12000,
//     itemDescription: "Gaming laptop with high-end specs.",
//     user: { name: "Muni", contact: "muni@example.com" },
//     status: "Completed",
//   },
//   {
//     id: 4,
//     itemName: "Laptop",
//     price: 12000,
//     itemDescription: "Gaming laptop with high-end specs.",
//     user: { name: "Muni", contact: "muni@example.com" },
//     status: "Completed",
//   },
//   {
//     id: 5,
//     itemName: "Laptop",
//     price: 12000,
//     itemDescription: "Gaming laptop with high-end specs.",
//     user: { name: "Muni", contact: "muni@example.com" },
//     status: "Completed",
//   },
// ];

// export default function HistoryPage() {
//   const nav = useNavigate();
//   const path = useLocation().pathname;
//   function HandleProfileNavigate() {
//     nav("/profile/userid123");
//   }

//   const handleNavigate = () => {
//     nav("/item/id", { state: { status: "Completed" } });
//   };
//   return (
//     <>
//       <div className="w-[100%] mx-auto z-[50] fixed">
//         <Navbar />
//       </div>

//       <div className="max-w-[1000px] flex-1 flex flex-col pt-[80px] px-2 p-3 sm:px-5 mx-auto border border-gray-100 pb-[50px]">
//         <h2 className="text-3xl font-semibold mb-4 text-center py-3 border-b border-[rgba(91,92,96,0.2)]">
//           HISTORY
//         </h2>
//         <div className="space-y-4">
//           {items.length > 0 ? (
//             items.map((request) => (
//               <div
//                 key={request.id}
//                 className="bg-white p-4 rounded-lg shadow-md border transition-all "
//                 whileHover={{ scale: 1.03 }}
//               >
//                 <div className="max-w-[1500px] lg:min-w-[800px] sm:gap-10 gap-3 sm:px-4 flex items-center justify-between">
//                   <div>
//                     <h2 className="text-xl font-semibold">
//                       {request.itemName}
//                     </h2>
//                     <p>Price: {request.price}</p>
//                     <div className="mt-2">
//                       <span className="font-medium">Owner:</span>{" "}
//                       {request.user.name}
//                     </div>
//                     <div className="mt-1">
//                       <span className="font-medium">Contact:</span>{" "}
//                       {request.user.contact}
//                     </div>
//                   </div>
//                   <div className="flex flex-col gap-2 text-[10px] sm:text-[1rem]">
//                     <button
//                       className="bg-teal-600 text-white hover:bg-teal-700 transition-all px-3 py-1 rounded"
//                       onClick={handleNavigate}
//                     >
//                       View Full Details
//                     </button>
//                     <button
//                       className="px-3 py-1 bg-blue-500 text-white rounded"
//                       onClick={HandleProfileNavigate}
//                     >
//                       User Profile
//                     </button>
//                   </div>
//                 </div>
//                 <div className="flex space-x-2 mt-4 sm:px-4 text-[10px] sm:text-[1rem]">
//                   <span className=" py-1 text-blue-500 rounded">
//                     Rent Completed
//                   </span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500">No History.</p>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }
