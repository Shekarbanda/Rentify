import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import FreshCards from "../../Components/FreshCards";
import Category from "../../Components/Category";

export default function WishlistPage() {
  return (
    <>
      <div className="w-[100%] mx-auto z-[50] fixed">
        <Navbar />
      </div>
      <div className="pt-[50px] lg:pt-[72px] mx-auto">
        <Category />
      </div>
      <div className="max-w-[1400px] min-h-[65vh] lg:min-h-[77.5vh] md:min-h-[78.5vh] flex-1 flex flex-col px-2 p-3 sm:px-5 mx-auto border border-gray-100 pb-[50px]">
        <h2 className="text-xl lg:text-3xl font-semibold mb-4 text-center py-3 border-b border-[rgba(91,92,96,0.2)]">
          WISHLIST
        </h2>
        <FreshCards iswishlist={"true"} />
      </div>
      <Footer />
    </>
  );
}
