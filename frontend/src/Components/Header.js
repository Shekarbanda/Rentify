import { RoughNotation } from "react-rough-notation";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import b1 from "../assets/first_.jpg";
import { PiCheckCircle } from "react-icons/pi";

const Header = () => {
  return (
    <section className="flex flex-col md:flex-row gap-8 justify-between py-6 items-center">
      <div className="flex flex-col px-8 gap-4 items-center">
        <h2 className="text-center text-3xl md:text-4xl font-bold">
          Find What You Need on <br className="mb-[30px]" />
          <RoughNotation
            type="highlight"
            padding={[0, 50]}
            className="text-muted"
            style={{ zIndex: 0 }}
            animationDelay={200}
            show={true}
          >
            <p className="text-white mt-5 inline-block z-1">Rentify</p>
          </RoughNotation>
        </h2>
        <p className="max-w-xs lg:max-w-sm text-center md:text-sm lg:text-base">
          Rent or lease items hassle-free with full management support. Earn
          more and get the best value for your rentals, whether short or
          long-term.
        </p>
        <Link
          to="/explore-rentals"
          className="flex items-center max-w-fit bg-blue-600 text-white px-6 py-2 rounded-full mt-4 transition hover:bg-blue-700"
        >
          Explore Rentals <FaArrowRight className="ml-2" />
        </Link>
        <div className="flex gap-3 flex-wrap justify-center">
          <div className="flex items-center gap-1">
            <PiCheckCircle className="w-5 h-5" />
            <span className="text-xs lg:text-base">Earn Money</span>
          </div>
          <div className="flex items-center gap-1">
            <PiCheckCircle className="w-5 h-5" />
            <span className="text-xs lg:text-base">Rental Income</span>
          </div>
          <div className="flex items-center gap-1">
            <PiCheckCircle className="w-5 h-5" />
            <span className="text-xs lg:text-base">Long-term rental</span>
          </div>
        </div>
      </div>

      <div className="px-4">
        <img
          src={b1}
          className="rounded-3xl h-72 md:h-80 w-full lg:w-[35rem] lg:h-[25rem] xl:w-[40rem] xl:h-[25rem] object-cover"
          alt="rentify showcase"
        />
      </div>
    </section>
  );
};

export default Header;
