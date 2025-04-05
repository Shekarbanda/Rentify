import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import SentRequests from "../../Components/SentRequests";

export default function RequestsSent() {
  return (
    <>
      <div className="w-[100%] mx-auto z-[50] fixed">
        <Navbar />
      </div>
      <div className=" flex flex-col min-h-screen">
      <div className="max-w-[1400px] flex-1 flex flex-col pt-[65px] lg:pt-[72px] px-2 p-3 sm:px-5 mx-auto border border-gray-100 pb-[50px]">
        <SentRequests />
      </div>
      <Footer />
      </div>
    </>
  );
}
