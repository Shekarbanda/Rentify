import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import Gallery from "./Gallery";
import SkeletonSVG from "../assets/img-skeleton.svg";
import DetailCard from "./DetailCard";
import PriceCard from "./PriceCard";
import LocationCard from "./LocationCard";
import ImageGallerySkeleton from "./ImageGallerySkeleton";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const Details = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [load, setload] = useState(true);
  const url = useSelector((state) => state.api.value);
  const [itemDetails, setitemDetails] = useState([]);
  const { itemId } = useParams();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchItems = async () => {
    try {
      const response = await axios.get(
        `${url}item/get-item-details/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
            "Content-Type": "application/json", // Ensure proper content type
          },
        }
      );
      if (response.status === 200) {
        const item = response?.data?.data?.item || [];
        setitemDetails(item);
      }
    } catch (err) {
      console.error(err);
      navigate('/explore-rentals');
    } finally {
      setload(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [url]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % itemDetails?.images?.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + itemDetails?.images?.length) % itemDetails?.images?.length
    );
  };

  const mainImageUrl = itemDetails?.images?.[0];
  const otherImages = itemDetails?.images?.slice(1, 6);

  return (
    <div className="max-w-[1400px] mx-auto p-4">
      <div className="md:block hidden">
        {load ? (
          <ImageGallerySkeleton size={4} />
        ) : (
          <>
            <Gallery mainImageUrl={mainImageUrl} otherImages={otherImages} />
          </>
        )}
      </div>

      {load ? (
        <div className={`grid grid-cols-1 gap-4 md:hidden`}>
          <img
            src={SkeletonSVG}
            className="w-full h-full rounded-xl object-cover animate-pulse bg-muted"
            alt="skeleton image1"
          />
          <div className="flex gap-2">
            {itemDetails?.images?.map((img, index) => (
              <img
                key={index}
                src={SkeletonSVG}
                alt={`Thumbnail ${index}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                  activeIndex === index ? "border-black" : "border-transparent"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="relative w-full md:hidden h-full">
            <img
              src={itemDetails?.images?.[activeIndex]}
              alt="Main"
              className="w-full h-60 object-cover rounded-lg"
            />
            {/* Navigation Buttons for Small Screens */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/70 rounded-full md:hidden"
            >
              <AiOutlineArrowLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/70 rounded-full md:hidden"
            >
              <AiOutlineArrowRight size={24} />
            </button>
          </div>
          <div className="flex md:hidden overflow-x-auto gap-2 mt-4">
            {itemDetails?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 ${
                  activeIndex === index ? "border-black" : "border-transparent"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-[30px] mb-[30px] gap-4">
        <DetailCard details={itemDetails} loading={load} />
        <PriceCard details={itemDetails} loading={load} />
        <LocationCard details={itemDetails} loading={load} />
      </div>
    </div>
  );
};

export default Details;
