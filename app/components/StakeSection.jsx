"use client";

import Image from "next/image";
import React from "react";

// StakeSection
// Layout matches the provided mock: dark image background, left copy + CTA,
// right "How it works?" card with its own image background.
export default function StakeSection() {
  return (
    <section
      className="relative w-full py-10 lg:py-40 lg:pb-10 overflow-hidden flex flex-col gap-[2rem] lg:gap-[3rem] items-center justify-center px-4 sm:px-6 md:px-10"
      style={{
        backgroundImage:
          "url('/assets/stakeBg1.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute -top-15 left-0 w-full h-[10%] bg-black/40 backdrop-blur-md blur-xl"></div>
      {/* Content container */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-[3rem] md:gap-[2rem] items-start w-full max-w-[100rem]">
        {/* Left: Title, blurb, CTA */}
        <div className="text-white mt-[3rem] flex flex-col items-start gap-6">
          <h1 className="font-bangers uppercase tracking-wider text-[34px] sm:text-5xl md:text-5xl xl:text-6xl leading-[0.9] drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">
            Stake your RAK. Farm $RGE
          </h1>

          <p className="max-w-md lg:pl-[3rem] font-bangers text-white/90 text-sm sm:text-base md:text-xl leading-tight">
            Your RAK NFT isn't just a collectible - it's your ticket to the core
            of the Rage Effect ecosystem. Stake it to generate $RGE, the token
            that fuels your in-game power, upgrades, and ecosystem access.
          </p>
        </div>

        {/* Right: How it works card */}
        <div className="w-full h-full flex items-center justify-center xl:justify-end">
          <div
            className="relative w-full max-w-[630px] rounded-2xl p-6 sm:p-8 md:p-10 lg:pb-[4rem] text-white/95"
            style={{
              backgroundImage:
                "url('/assets/StakeBlock.webp')",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h2 className="font-bangers uppercase text-2xl sm:text-3xl md:text-4xl text-center mb-[1.5rem] lg:mb-[3rem]">
              How it works?
            </h2>

            <ul className="font-bangers space-y-[1rem] lg:space-y-[1.7rem]  lg:leading-[2rem] text-lg sm:text-xl md:text-3xl">
              <li className="list-disc list-inside">
                Earn $RGE and in‑game XP
              </li>
              <li className="list-disc list-inside">
                Rewards scale based on:
                <div className=" ml-[2rem] lg:ml-[2.8rem] mt-2 space-y-[0.1rem]">
                  <div className="before:content-['–'] before:mr-2">
                    The rarity of your gems
                  </div>
                  <div className="before:content-['–'] before:mr-2">
                    The duration of your stake
                  </div>
                </div>
              </li>
              <li className="list-disc list-inside">
                Rewards can be claimed every 7 days
              </li>
              <li className="list-disc list-inside">
                Un‑staking early may result in yield penalties
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-[100rem] w-full flex items-center justify-center lg:justify-start">
        <button
          style={{
            backgroundImage: "url('/assets/btnImg.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="mt-2  lg:ml-[3rem] inline-flex items-center justify-center px-8 sm:px-[5rem] py-3 rounded-full bg-[#ff4c4c] hover:brightness-110 transition-all text-white font-bangers text-3xl sm:text-5xl shadow-[0_8px_0_rgba(0,0,0,0.35)]"
          aria-label="Stake"
        >
          Stake
        </button>
      </div>
      {/* Optional soft vignette for depth */}
      {/* <div className="pointer-events-none absolute inset-0 bg-black/20" /> */}
    </section>
  );
}
