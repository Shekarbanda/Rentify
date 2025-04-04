import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";

export default function Nav() {
  const nav = useNavigate();
  return (
    <div className="w-[100%] mx-auto z-[50] fixed">
      <div
        className={`max-w-[1600px] z-[50] flex mx-auto box-sizing h-[5.5rem] shadow-md border-b-2 lg:border-[white] items-center bg-[rgb(214,222,228)] justify-center`}
      >
        <div className="w-[1500px] flex justify-between p-5">
          <div className="cursor-pointer flex items-center h-[5.5rem] text-[2rem] font-bold">
            <span className="bg-[black] p-1 rounded-lg text-[white]">Rent</span>{" "}
            <span className="">Ify</span>
          </div>
          <RxCross2
            onClick={() => nav("/")}
            className="w-[50px] lg:w-[30px] lg:h-[30px] cursor-pointer h-[50px] my-auto"
          />
        </div>
      </div>
    </div>
  );
}
