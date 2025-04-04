import React, { useState } from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { AiOutlineShareAlt } from "react-icons/ai";
import { useNavigate } from "react-router";
import Login from "../Pages/Login";

export default function BackNavbar() {
  const [isfavourite, setisfavourite] = useState(false);
  const [islogin, setislogin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const nav = useNavigate();
  return (
    <div className="flex items-center max-w-[1350px] mb-5 px-3 mx-auto justify-between">
      <div className="flex items-center gap-2">
        <button
          variant="outline"
          size="icon"
          onClick={() => nav(-1)}
          className="shadow-sm hover:bg-[rgb(221,230,233)] border border-gray rounded-md text-center hover:text-accent-foreground w-7 h-7 sm:w-9 md:w-10 sm:h-9 md:h-10"
        >
          <HiArrowNarrowLeft className="text-base sm:text-[30px] mx-auto md:text-3xl" />{" "}
        </button>
        <div className="text-base sm:text-2xl md:text-3xl">
          {"Item Details"}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          variant="outline"
          size="icon"
          className="shadow-sm hover:bg-[rgb(221,230,233)] border border-gray rounded-md text-center hover:text-accent-foreground w-7 h-7 sm:w-9 md:w-10 sm:h-9 md:h-10"
        >
          <AiOutlineShareAlt
            className={`h-7 w-7 text-base sm:text-[30px] mx-auto md:text-3xl`}
          />
        </button>

        {
          <button
            variant="outline"
            size="icon"
            className="shadow-sm  w-7 h-7 sm:w-9 md:w-10 sm:h-9 md:h-10"
            onClick={() =>
              islogin ? setisfavourite(!isfavourite) : setIsLoginOpen(true)
            }
          >
            <FaHeart
              className={`h-7 w-7  ${
                isfavourite ? "text-red-500" : "text-[rgba(45,43,43,0.25)]"
              }`}
            />
          </button>
        }
      </div>
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}
