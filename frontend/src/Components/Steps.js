import { RoughNotation } from "react-rough-notation";

// Card Data
const cardData = [
  {
    id: 1,
    title: "Sign Up",
    desc: "Create an account to access Rentify’s amazing rental platform.",
  },
  {
    id: 2,
    title: "Browse Listings",
    desc: "Explore rental items and filter results to suit your preferences.",
  },
  {
    id: 3,
    title: "View Details",
    desc: "Check item descriptions, prices, and owner details before renting.",
  },
  {
    id: 4,
    title: "Request Item",
    desc: "Send rental requests directly to the owner with special requirements.",
  },
  {
    id: 5,
    title: "Track & Manage",
    desc: "Manage requests and track rentals easily from your dashboard.",
  },
];

// Main Component
const Steps = () => {
  return (
    <section>
      <h2 className="text-center text-3xl md:text-4xl font-bold">
        Use Rentify <br className="mb-[30px]" />
        <RoughNotation
          type="highlight"
          padding={[0, 50]}
          className="text-muted"
          style={{ zIndex: 0 }}
          animationDelay={900}
          show={true}
        >
          <p className="text-white mt-5 inline-block z-1">in 5 easy steps</p>
        </RoughNotation>
      </h2>
      <div className="flex justify-evenly flex-wrap gap-[50px] mt-6 w-[90%] mx-auto">
        {cardData.map((d) => {
          return (
            <div
              key={d.id}
              className=" flex flex-col gap-2 items-center justify-center"
            >
              <div className="w-10 h-10 rounded-full font-semibold bg-black text-white pt-1 text-lg text-center">
                {d.id}
              </div>
              <h1 className="text-xl -mt-1.5 font-semibold ">{d.title}</h1>
              <p className="max-w-xs text-center">{d.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Steps;
