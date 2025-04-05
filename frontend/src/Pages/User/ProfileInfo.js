import React from "react";
import ProfileComponent from "../../Components/ProfileComponent";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import Category from "../../Components/Category";

export default function ProfileInfo() {
  return (
    <>
      <div className="w-[100%] mx-auto z-[50] fixed">
        <Navbar />
      </div>
      <div className="pt-[65px] lg:pt-[72px] mx-auto">
        <Category />
      </div>
      <div className="max-w-[1400px] min-h-[61.5vh] lg:min-h-[75vh] md:min-h-[77vh] flex-1 flex flex-col mx-auto mb-5 pb-[50px] ">
        <ProfileComponent />
      </div>
      <Footer />
    </>
  );
}
