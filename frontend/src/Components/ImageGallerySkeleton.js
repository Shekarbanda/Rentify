import SkeletonSVG from "../assets/img-skeleton.svg";

const ImageGallerySkeleton = ({ size }) => {
  const otherImages = Array.of(size);
  return (
    <div className="grid grid-cols-2 gap-4 rounded-lg overflow-hidden">
      <img
        src={SkeletonSVG}
        className="md:w-full h-[500px] grid-rows-2 rounded-xl object-cover animate-pulse bg-muted"
        alt="skeleton image1"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 ">
        {[...Array(size)].map((image, index) => (
          <img
            key={index}
            src={SkeletonSVG}
            className="w-full h-60 rounded-xl object-cover animate-pulse bg-muted"
            alt="skeleton image2"
          />
        ))}
      </div>
    </div>

    // <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 `}>
    //   <img
    //     src={SkeletonSVG}
    //     className="md:w-full h-120 rounded-xl object-cover animate-pulse bg-muted"
    //     alt="skeleton image1"
    //   />
    //   <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
    //     <img
    //       src={SkeletonSVG}
    //       className="w-full h-44 rounded-xl object-cover animate-pulse bg-muted"
    //       alt="skeleton image2"
    //     />
    //     <img
    //       src={SkeletonSVG}
    //       className="w-full h-44 rounded-xl object-cover animate-pulse bg-muted"
    //       alt="skeleton image3"
    //     />
    //     <img
    //       src={SkeletonSVG}
    //       className="w-full h-44 rounded-xl object-cover animate-pulse bg-muted"
    //       alt="skeleton image4"
    //     />
    //     <img
    //       src={SkeletonSVG}
    //       className="w-full h-44 rounded-xl object-cover animate-pulse bg-muted"
    //       alt="skeleton image5"
    //     />
    //   </div>
    // </div>
  );
};

export default ImageGallerySkeleton;
