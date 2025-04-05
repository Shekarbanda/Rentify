import React from "react";
import {
  FaCar,
  FaBicycle,
  FaLaptop,
  FaHome,
  FaCouch,
  FaTools,
  FaCalendarAlt,
  FaFootballBall,
  FaThLarge,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setCategories, setSearch } from "../Redux/Slices/CategorySlice";
import { useNavigate } from "react-router";

const categories = [
  { name: "ALL", icon: <FaThLarge size={15} /> },
  { name: "CARS", icon: <FaCar size={15} /> },
  { name: "BIKES", icon: <FaBicycle size={15} /> },
  { name: "ELECTRONICS", icon: <FaLaptop size={15} /> },
  { name: "PROPERTIES", icon: <FaHome size={15} /> },
  { name: "FURNITURE", icon: <FaCouch size={15} /> },
  { name: "SERVICE", icon: <FaTools size={15} /> },
  { name: "EVENT_RENTALS", icon: <FaCalendarAlt size={15} /> },
  { name: "SPORTS", icon: <FaFootballBall size={15} /> },
];

export default function Category() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (cat) => {
    dispatch(setCategories(cat?.name));
    dispatch(setSearch(""));
    navigate("/explore-rentals");
  };
  return (
    <div className="mx-auto text-center pt-1 bg-[rgba(236,238,241,0.68)]">
      <div className="max-w-[1400px] p-1 mx-auto">
        {/* Scrollable container */}
        <div className="flex md:justify-between overflow-x-auto scrollbar mx-auto scrollbar-[red] px-1 lg:px-2">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => handleClick(cat)}
              className="flex flex-col items-center cursor-pointer p-1 hover:text-[rgb(5,100,188)] min-w-[100px]"
            >
              {cat.icon}
              <span className="mt-2 text-[10px] md:text-xs ">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
