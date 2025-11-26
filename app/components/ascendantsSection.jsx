"use client";

import Image from "next/image";
import React, { useState } from "react";

const AscendantsSection = () => {
  const characters = [
    {
      id: 1,
      image: "/assets/Phantom1.webp",
      bg: "/assets/phantomBg.webp",
      info: "Phantom Army – Ruthless rulers of the surface, who seized control in the chaos after WW3.",
    },
    {
      id: 2,
      image: "/assets/Inferno.webp",
      bg: "/assets/InfernoBg.webp",
      info: "Inferno  – Merciless warriors, forged in the flames of the Gem’s deadly blast.",
    },
    {
      id: 3,
      image: "/assets/Stormborn.webp",
      bg: "/assets/stormbornBg.webp",
      info: "Stormborn Rebels – Fierce freedom fighters, battling to return water to the people.",
    },
    {
      id: 4,
      image: "/assets/Eclipse.webp",
      bg: "/assets/eclipseBg.webp",
      info: "Eclipse – Ancient guardians of the underground, now broken and scarred by civil war.",
    },
  ];

  const [selectedChar, setSelectedChar] = useState(0);
  const CDN = "";

  return (
    <section
      id="ascendants-section"
      className="
        relative w-full xl:min-h-screen overflow-hidden
        flex flex-col lg:flex-row items-center
        justify-center lg:justify-between px-4 sm:px-6 md:px-8 lg:py-10 xl:py-0
      "
      style={{
        backgroundImage: `url('${CDN}${characters[selectedChar].bg}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute  -top-15 left-0 w-full h-[10%] bg-black/20 backdrop-blur-xl blur-sm "></div>
      {/* Left column */}
      <div
        className="
          relative z-10
          flex flex-col items-center xl:items-start justify-between
          w-full lg:w-[60%] gap-6 md:gap-8 pt-10 md:pt-12 lg:pt-0 h-auto xl:h-[80vh]
        "
      >
        <div>
          {/* Title with bg that hugs text */}
          <div
            className="relative inline-block bg-no-repeat bg-center px-3 sm:px-4 pb-1"
            style={{
              backgroundImage:
                "url('/assets/ascendantsTextBg.webp')",
              backgroundSize: "100% 100%",
            }}
          >
            <h2 className="font-bangers text-white px-3 sm:px-5 py-2 sm:py-3 tracking-wide uppercase text-[20px] sm:text-4xl md:text-5xl leading-none">
              WHAT ARE ASCENDANTS?
            </h2>
          </div>

          {/* Intro blurb */}
          <p className="md:mt-4 max-w-3xl font-oskariRegular text-white/90 text-sm sm:text-[15px] md:text-2xl leading-5 md:leading-6 md:ml-2 mt-3">
            Ascendants are a PFP collection of 2,149, each inspired by the rich
            lore of our universe.
          </p>
        </div>

        {/* Center graphic (scales down on small, preserves your lg width) */}
        <div className="w-full">
          <Image
            src={`${CDN}/assets/ascendantsGraphic.webp`}
            alt="Ascendants graphic"
            width={878}
            height={398}
            className="
              mx-auto
              w-[95%] sm:w-[90%] md:w-[85%] lg:w-[90%]   /* gentle scale rules */
              max-w-[878px]
            "
            sizes="
              (max-width: 640px) 95vw,
              (max-width: 768px) 90vw,
              (max-width: 1024px) 85vw,
              900px
            "
          />
          <div
            className="flex items-center justify-center
            absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/3 aspect-[878/398] h-auto
              mx-auto
              w-[95%] sm:w-[90%] md:w-[85%] lg:w-[90%]   /* gentle scale rules */
              max-w-[878px]
            "
            sizes="
              (max-width: 640px) 95vw,
              (max-width: 768px) 90vw,
              (max-width: 1024px) 85vw,
              900px
            "
          >
            <div
              className="w-full h-full"
              onClick={() => setSelectedChar(0)}
            ></div>
            <div
              className="w-full h-full"
              onClick={() => setSelectedChar(1)}
            ></div>
            <div
              className="w-full h-full"
              onClick={() => setSelectedChar(2)}
            ></div>
            <div
              className="w-full h-full"
              onClick={() => setSelectedChar(3)}
            ></div>
          </div>
        </div>

        <p className="max-w-3xl font-oskariRegular text-white/90 text-sm sm:text-[15px] md:text-2xl leading-5 md:leading-6 md:ml-2">
          {characters[selectedChar].info}
        </p>
      </div>

      {/* Right character image */}
      {/* On mobile/tablet: sits below content, centered.
          On lg+: keeps your absolute anchored look. */}
      <div
        className="
          w-full lg:w-[40%]
          relative lg:absolute lg:right-0 lg:bottom-0
          flex lg:block justify-center
          mt-6 md:mt-10 lg:mt-0
          z-0
        "
      >
        <Image
          src={`${CDN}/assets/characterFrame.webp`}
          alt="Ascendants character"
          width={879}
          height={936}
          className="
            w-full sm:w-full md:w-full lg:w-full md:block
            max-w-[879px]
            pointer-events-none select-none
          "
          sizes="
            (max-width: 640px) 70vw,
            (max-width: 768px) 60vw,
            (max-width: 1024px) 55vw,
            40vw
          "
        />
      </div>
      {/* Dynamic right character image (single mount for better perf) */}
      <div
        className={`
          
          absolute ${
            selectedChar === 3
              ? "w-[135%] md:w-[115%] md:h-[53%] lg:h-auto lg:w-[55%] bottom-0 right-0"
              : "w-full lg:w-[40%] bottom-0 right-0"
          }
          flex lg:block justify-center
          mt-6 md:mt-10 lg:mt-0 overflow-visible
          z-0
        `}
      >
        <Image
          key={selectedChar}
          src={`${CDN}${characters[selectedChar].image}`}
          alt="Ascendants character"
          width={879}
          height={936}
          className={`
            w-full sm:w-full md:w-full lg:w-full
            md:block max-w-[879px] pointer-events-none select-none
          `}
          sizes="
            (max-width: 640px) 70vw,
            (max-width: 768px) 60vw,
            (max-width: 1024px) 55vw,
            40vw
          "
        />
      </div>
    </section>
  );
};

export default AscendantsSection;
