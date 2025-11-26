import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div
      className="
        relative w-full overflow-hidden
        flex flex-col gap-5 md:gap-10 lg:gap-0 lg:flex-row items-center
        justify-center lg:justify-between
        px-4 sm:px-6 md:px-10 py-6 sm:py-8 lg:py-10 xl:py-10
      "
      style={{
        backgroundImage: `url("/assets/footerBg.webp")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left: Logo + tagline */}
      <div className="flex flex-col items-center justify-center gap-3 sm:gap-4">
        <Image
          src="/assets/mainLogo.webp"
          alt="Footer Logo"
          width={3840}
          height={1519}
          className="object-contain w-36 sm:w-44 md:w-52 lg:w-[200px]"
          // sizes="(max-width: 640px) 9rem, (max-width: 768px) 11rem, (max-width: 1024px) 13rem, 200px"
        />
        <div className="text-white">
          <p className="font-bangers text-sm sm:text-base md:text-md text-center">
            for gamers, by gamers.
          </p>
          <p className="font-bangers text-xs sm:text-sm md:text-md text-center">
            @2022 RAGEEFFECT
          </p>
        </div>
      </div>

      {/* Center: Navigation */}
      <nav
        aria-label="Footer navigation"
        className="
          w-full max-w-[900px]
          grid grid-cols-2 md:grid-cols-4
          gap-4 sm:gap-6 md:gap-8 lg:gap-12
          place-items-center
          mt-6 lg:mt-0
          lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:justify-center
        "
      >
        <Link
          href="#ascendants-section"
          className="block font-bangers text-xl sm:text-2xl md:text-3xl text-white text-center"
        >
          Ascendants
        </Link>
        <Link
          href="#genesis-gems"
          className="block font-bangers text-xl sm:text-2xl md:text-3xl text-white text-center"
        >
          Genesis Gems
        </Link>
        <Link
          href="#lore-section"
          className="block font-bangers text-xl sm:text-2xl md:text-3xl text-white text-center"
        >
          Lore
        </Link>
        <Link
          href="#"
          className="block font-bangers text-xl sm:text-2xl md:text-3xl text-white text-center"
        >
          Whitepaper
        </Link>
      </nav>

      {/* Right: Socials */}
      <div className="flex flex-row lg:flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10 mt-6 lg:mt-0">
        <Link
          href="https://x.com/WeAreAscendants"
          target="_blank"
          aria-label="Twitter/X"
        >
          <Image
            src="/assets/twitter.webp"
            alt="twitter"
            width={500}
            height={500}
            className="
              relative z-[10] cursor-pointer
              w-8 h-auto sm:w-10 md:w-12 lg:w-[2vw]
            "
            sizes="(max-width: 640px) 2rem, (max-width: 768px) 2.5rem, (max-width: 1024px) 3rem, 2vw"
          />
        </Link>
        <Link
          href="https://discord.com/invite/theascendants"
          target="_blank"
          aria-label="Discord"
        >
          <Image
            src="/assets/discord.webp"
            alt="discord"
            width={500}
            height={500}
            className="
              relative z-[10] cursor-pointer
              w-10 h-auto sm:w-12 md:w-14 lg:w-[3vw] 
            "
            sizes="(max-width: 640px) 2.5rem, (max-width: 768px) 3rem, (max-width: 1024px) 3.5rem, 3vw"
          />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
