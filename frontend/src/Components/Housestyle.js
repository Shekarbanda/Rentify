import { RoughNotation } from "react-rough-notation";
import { useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import House from "../assets/image-removebg-preview.png";
import { useNavigate } from "react-router-dom";

const Housestyle = () => {
  const componentRef = useRef(null);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/explore-rentals");
  };

  return (
    <section
      ref={componentRef}
      className="flex flex-col gap-5 mt-10 mb-8 justify-center items-center"
    >
      <img src={House} alt="House" className="h-52 w-52" />
      <h2 className="text-3xl font-bold text-center max-w-sm">
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
      <p className="max-w-lg mt-7 text-center text-lg text-secondary-foreground">
        Contact us to get more rental income from your home with our
        professional rental service.
      </p>
      <button
        onClick={handleNavigation}
        className="flex items-center max-w-fit rounded-full mt-4 px-6 py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Explore Rentals <FaArrowRight className="ml-2" />
      </button>
    </section>
  );
};

export default Housestyle;
