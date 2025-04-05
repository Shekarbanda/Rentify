import React from "react";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import EditItem from "../../Components/EditItem";

export default function EditPostPage() {
  return (
    <>
      <div className="w-[100%] mx-auto z-[50] fixed">
        <Navbar />
      </div>
      <div className=" flex flex-col min-h-screen">
      <div className="max-w-[1400px]  flex-1 flex flex-col pt-[50px] lg:pt-[72px] mx-auto  pb-[50px] ">
        <EditItem />
      </div>
      <Footer />
      </div>
    </>
  );
}
