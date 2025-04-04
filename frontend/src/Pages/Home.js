import React, { useEffect } from "react";
import Header from "../Components/Header";
import Items from "../Components/Items";
import Steps from "../Components/Steps";
import BannerSlider from "../Components/BannerSlider";
import Housestyle from "../Components/Housestyle";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Home() {
  const User = useSelector((state) => state.User.value);
  const navigate = useNavigate();
  useEffect(() => {
    if (User?.role === "business") {
      navigate("/business/dashboard");
    }
  }, [User]);

  return (
    <>
      <div className="w-[100%] mx-auto z-[50] fixed">
        <Navbar />
      </div>
      <div className="max-w-[1400px] pt-[100px] mx-auto px-2 sm:px-3">
        <Header />
        <Items />
        <Steps />
        <BannerSlider />
        <Housestyle />
      </div>
      <Footer />
    </>
  );
}
