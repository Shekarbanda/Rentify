import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import banner1 from "../assets/1st.webp";
import banner2 from "../assets/2nd.webp";
import banner3 from "../assets/3rd.webp";
import banner4 from "../assets/4th.webp";
import banner5 from "../assets/5th.webp";
import { RoughNotation } from "react-rough-notation";

const banners = [banner1, banner2, banner3, banner4, banner5];

const BannerSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
    resetAutoScroll();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
    resetAutoScroll();
  };

  const resetAutoScroll = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000); // Resume auto-scroll after 10 seconds
  };

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        handleNext();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPaused, currentIndex]);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden mt-7">
      <h2 className="text-3xl font-bold text-center max-w-sm mt-5 mb-5 mx-auto">
        Are you ready for the <br />
        <span className="font-semibold">
          <RoughNotation
            type="box"
            padding={[0, 10]}
            animationDelay={3000}
            show
          >
            professional experience?
          </RoughNotation>
        </span>
      </h2>
      <div
        className="flex transition-transform ease-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Banner ${index + 1}`}
            className="w-full max-h-[500px] flex-shrink-0 rounded-lg"
          />
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute sm:top-[60%] top-[80%] left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <FaChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute sm:top-[60%] top-[80%] right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
};

export default BannerSlider;
