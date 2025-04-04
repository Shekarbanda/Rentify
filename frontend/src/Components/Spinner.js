import React from "react";

const Spinner = () => {
  return (
    <div
      className="w-7 h-7 border-4 border-white-300 mx-auto text-center border-t-[#002f34] rounded-full animate-spin"
      role="status"
      aria-live="polite"
      aria-label="Please wait"
    ></div>
  );
};

export default Spinner;
