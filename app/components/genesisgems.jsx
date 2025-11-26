"use client";

import Image from "next/image";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GenesisGems({
  bgTexture = "",
  shardsOverlay = "",
  gemArt = "",
}) {
  const CDN = "";
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const hero = document.getElementById("hero-section");
      const heroOverlay = document.getElementById("hero-overlay");
      const genesis = sectionRef.current;

      if (hero && sectionRef.current) {
        ScrollTrigger.create({
          trigger: hero,
          pin: hero,
          start: "top top",
          endTrigger: sectionRef.current,
          end: "top top",
          pinSpacing: false,
        });
      }

      if (hero && heroOverlay && genesis) {
        // Ensure initial state and origin for smooth scaleY reveal
        // gsap.set(heroOverlay, {
        //   // scaleY: 0,
        //   opacity: 0,
        //   transformOrigin: "bottom center",
        //   force3D: true,
        // });
        gsap.to(heroOverlay, {
          scaleY: 100,
          opacity: 1, // 🔑 make the gradient visible as it fills
          yPercent: -1200, // move up as it scales
          ease: "none",
          scrollTrigger: {
            trigger: genesis,
            start: "top bottom",
            end: "top top",
            scrub: true,
            anticipatePin: 1,
          },
        });
      }

      const gems = gsap.utils.toArray(".gem");
      if (!gems.length) return;

      gsap.to(".gem", {
        yPercent: (i) => [-130, -120, -130][i],
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
          invalidateOnRefresh: true,
          // markers: true,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const perks = [
    "Unlock Unique Player Abilities in Rage Effect",
    "Free Inferno Battle Pass with Access to Exclusive Prize Pools",
    "Early Access to Game Phases & Private Testing",
    "Stackable XP & Faster Legends Progression",
    "0.5% $RGE Airdrop & Boosted Staking Rewards",
    "Free Ascendants Mint & Guaranteed Whitelist Spot",
    "Exclusive Rage & Legends Cosmetics",
  ];

  return (
    <section
      id="genesis-gems"
      ref={sectionRef}
      className="relative z-10 w-full overflow-visible"
      aria-label="Genesis Gems"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10" />
      {bgTexture ? (
        <Image
          src={bgTexture.startsWith("http") ? bgTexture : `${CDN}${bgTexture}`}
          alt="background texture"
          fill
          className="-z-10 object-cover pointer-events-none select-none"
          sizes="100vw"
          onLoad={() => ScrollTrigger.refresh()}
        />
      ) : (
        <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none select-none bg-[url('/__placeholder-bg-texture__.webp')] bg-cover bg-center" />
      )}
      {shardsOverlay ? (
        <Image
          src={
            shardsOverlay.startsWith("http")
              ? shardsOverlay
              : `${CDN}${shardsOverlay}`
          }
          alt="red shards overlay"
          fill
          className="-z-10 object-cover opacity-30 mix-blend-multiply pointer-events-none select-none"
          sizes="100vw"
          onLoad={() => ScrollTrigger.refresh()}
        />
      ) : null}

      {/* Floating parallax gems (behind content) */}
      <div className="pointer-events-none select-none absolute inset-0 z-0">
        <div className="gem gem-1 z-40 absolute -top-[20%] lg:-top-[25%] flex justify-end items-start right-0 opacity-80 will-change-transform">
          <Image
            src="/assets/gem1.webp"
            alt="Gem 1"
            width={200}
            height={200}
            className="w-[60%] md:w-[100%] lg:w-full"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>
        <div className="z-40 gem gem-2 absolute -top-[13%] right-[12%] md:right-[20%] lg:-top-[17%] lg:right-[22%] opacity-80 will-change-transform">
          <Image
            src="/assets/gem2.webp"
            alt="Gem 2"
            width={260}
            height={260}
            className="w-[60%] md:w-[100%] lg:w-full"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>
        <div className="gem gem-3 absolute -top-[20%] lg:-top-[28%] left-0 opacity-80 will-change-transform">
          <Image
            src="/assets/gem3.webp"
            alt="Gem 3"
            width={180}
            height={180}
            className="w-[60%] md:w-[100%] lg:w-full"
            onLoad={() => ScrollTrigger.refresh()}
          />
        </div>
      </div>

      {/* Container — matches the previous section */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 md:px-8 py-8 sm:py-10 lg:py-16">
        {/* Title (bg hugs text) */}
        <div
          className="relative inline-block bg-no-repeat bg-center px-4 sm:px-5 pb-1"
          style={{
            backgroundImage:
              "url('/assets/genesisTextBg.webp')",
            backgroundSize: "100% 100%",
          }}
        >
          <h2 className="font-bangers text-white px-4 sm:px-6 py-2 sm:py-3 tracking-wide uppercase text-[20px] sm:text-4xl md:text-5xl leading-none">
            Genesis Gems
          </h2>
        </div>

        {/* Intro */}
        <p className="mt-3 md:mt-4 max-w-4xl font-oskariRegular text-white/90 text-sm sm:text-[15px] md:text-2xl leading-5 md:leading-6 md:ml-10">
          Genesis Gems are the core of the Ascendants ecosystem. Each faction
          has its own set of Gems, making them an essential part of gameplay and
          progression. With a limited supply of only 555, these Gems unlock
          exclusive advantages and rewards for their holders.
        </p>

        {/* Main layout — flex everywhere */}
        <div className="mt-5 flex w-full justify-center">
          <div
            className="
              flex w-full items-start justify-between gap-6 sm:gap-8 lg:gap-10
              flex-col lg:flex-row
            "
          >
            {/* Left: artwork block (fixed at lg, scales below) */}
            <div className="flex-shrink-0 self-center lg:self-start">
              <div
                className="
                  relative rounded-xl overflow-hidden
                  w-[240px] h-[240px]
                  sm:w-[300px] sm:h-[300px]
                  md:w-[340px] md:h-[340px]
                  lg:w-[380px] lg:h-[380px]
                "
              >
                <div className="absolute inset-0 bg-[radial-gradient(closest-side,#FF7426_0%,transparent_60%)] opacity-30" />
                <div className="absolute top-0 left-0 w-full h-full z-10">
                  <Image
                    src="/assets/gifBorder.webp"
                    alt="Gem 1"
                    width={400}
                    height={400}
                    className="object-contain"
                  />
                </div>
                {gemArt ? (
                  <Image
                    src={gemArt.startsWith("http") ? gemArt : `${CDN}${gemArt}`}
                    alt="Genesis Gem artwork"
                    fill
                    className="object-contain p-5 sm:p-6"
                    sizes="(max-width:640px) 240px,(max-width:768px) 300px,(max-width:1024px) 340px,380px"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-white/60 text-xs sm:text-sm p-4 sm:p-6 text-center">
                    <span>Gem Artwork Placeholder</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: perks card (flex-1) */}
            <div className="relative flex-1 min-w-0">
              <div
                className="
                  relative z-0
                  p-4 sm:p-6 lg:p-8
                  bg-no-repeat bg-top
                  mx-auto lg:mx-0
                  /* width rules mirroring your previous section feel */
                  w-[92vw] sm:w-[85vw] md:w-[78vw]
                  lg:w-auto
                  max-w-[980px]
                "
                style={{
                  backgroundImage: "url('/assets/genesisText.webp')",
                  backgroundSize: "100% 100%",
                }}
              >
                <h3 className="text-white font-extrabold font-oskariBold text-base sm:text-lg md:text-2xl tracking-wide mb-5 sm:mb-6 md:mb-8">
                  Perks of Holding a Genesis Gem:
                </h3>

                <ul className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                  {perks.map((item, idx) => (
                    <li
                      key={idx}
                      className="
                        flex items-start gap-3
                        font-oskariRegular text-white/90
                        text-[13px] sm:text-[15px] md:text-2xl
                        leading-5 sm:leading-6
                      "
                    >
                      <span className="mt-[7px] sm:mt-[8px] inline-block h-[6px] w-[6px] sm:h-2 sm:w-2 rotate-45 rounded-[1px] bg-white/90 shadow-[0_0_0_1px_rgba(255,255,255,0.35)]" />
                      <span className="pr-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Corner glow */}
              <div className="pointer-events-none select-none absolute -right-4 -bottom-4 h-16 w-16 sm:h-20 sm:w-20 opacity-30 bg-[conic-gradient(from_0deg,#FF3D3D_0deg,#B40E0E_140deg,#6A0B0B_320deg,#FF3D3D_360deg)] blur-[10px] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
