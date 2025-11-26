import Image from "next/image";
import React from "react";

const RoadMapSection = () => {
  return (
    <div
      className="
        xl:min-h-screen w-full overflow-hidden relative
        px-3 sm:px-5 md:px-8 py-10
        flex flex-col lg:flex-row items-center justify-center
        gap-6 lg:gap-30  /* gap only on small screens */
      "
      style={{
        backgroundImage:
          "url('/assets/roadmapBg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute -top-15 left-0 w-full h-[5%] bg-black/40 backdrop-blur-md blur-xl"></div>

      {/* Title strip (unchanged on large screens) */}
      <div
        className="relative inline-block bg-no-repeat bg-center px-3 sm:px-4 xl:py-5 shrink-0 z-[20]"
        style={{
          backgroundImage: "url('/assets/roadMapTextBg.webp')",
          backgroundSize: "100% 100%",
        }}
      >
        <h2 className="font-bangers text-white px-3 sm:px-5 py-2 sm:py-3 tracking-wide uppercase text-[20px] sm:text-4xl md:text-5xl xl:text-7xl leading-none">
          Roadmap
        </h2>
      </div>

      {/* Image: scales down on small, keeps 40% on large */}
      <div className="flex justify-center z-[20] lg:w-[40%]">
        <Image
          src="/assets/roadMapFinalNew.webp"
          alt="Project roadmap"
          width={986}
          height={1018}
          className="w-[88%] sm:w-[72%] md:w-[60%] lg:w-[100%]"
          // sizes="
          //   (max-width: 640px) 88vw,
          //   (max-width: 768px) 72vw,
          //   (max-width: 1024px) 60vw,
          //   40vw
          // "
          unoptimized={true}
          priority={false}
        />
      </div>
    </div>
  );
};

export default RoadMapSection;
