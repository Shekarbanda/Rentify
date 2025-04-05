import React from "react";
import Footer from "../../Components/Footer";
import PostItem from "../../Components/PostItem";
import Navbar from "../../Components/Navbar";

export default function AddPost() {
  return (
    <>
      <div className="w-[100%] mx-auto z-[50] fixed">
        <Navbar />
      </div>
      <div className="w-100 flex flex-col min-h-screen">
      <div className="max-w-[1400px]  flex-1 flex flex-col pt-[65px] lg:pt-[72px] mx-auto  pb-[50px] ">
        <PostItem />
      </div>
      <Footer />
      </div>
    </>
  );
}
