import React from "react";
import Navbar from "../Components/Navbar";
import Category from "../Components/Category";
import "../index.css";
import Footer from "../Components/Footer";
import FreshCards from "../Components/FreshCards";

export default function ExploreItems() {
  return (
    <>
      <div className="w-[100%] mx-auto z-[50] fixed">
        <Navbar />
      </div>
      <div className="pt-[50px] lg:pt-[72px] mx-auto">
        <Category />
      </div>
      <div className="max-w-[1400px] min-h-[73.5vh] lg:min-h-[77vh] md:min-h-[78.5vh] mb-5 mx-auto px-4">
        <h1 className="text-2xl font-bold ml-2 md:ml-3 py-5">
          Fresh Recommendations
        </h1>
        <FreshCards />
      </div>
      <Footer />
    </>
  );
}
