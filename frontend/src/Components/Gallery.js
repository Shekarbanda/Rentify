import React from "react";

const defaultImage = "https://statics.olx.in/olxin/misc/emptyState_v1.png";
const Gallery = ({ mainImageUrl, otherImages = [] }) => {
  return (
    <div
      className={`grid gap-4 rounded-lg overflow-hidden ${
        otherImages.length === 0 ? "grid-cols-1" : "grid-cols-2"
      }`}
    >
      <img
        src={mainImageUrl}
        alt="mainimage "
        onError={(e) => (e.target.src = defaultImage)}
        className={`w-full object-cover mt-5 rounded-lg shadow-lg ${
          otherImages.length === 0 ? "h-[500px]" : "h-[500px] grid-rows-2"
        }`}
      />
      {otherImages.length > 0 && (
        <div
          className={`grid gap-x-4 gap-y-4 mt-5 ${
            otherImages.length === 1
              ? "grid-cols-1"
              : "grid-cols-2 sm:grid-cols-2"
          }`}
        >
          {otherImages.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`images${index}`}
              className="object-cover w-full h-60 rounded-lg shadow-sm"
              onError={(e) => (e.target.src = defaultImage)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
