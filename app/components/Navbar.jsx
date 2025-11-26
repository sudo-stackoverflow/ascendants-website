"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const Navbar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const firstLinkRef = useRef(null);
  const overlayRef = useRef(null);
  const tlRef = useRef(null);

  // Fixed + center-logo hysteresis (unchanged)
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY || 0;
          setIsFixed(y > 0);
          setShowLogo((prev) => (prev ? y > 480 : y > 560));
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Build GSAP shutter timeline once
  useLayoutEffect(() => {
    if (!overlayRef.current) return;

    const ctx = gsap.context(() => {
      const overlay = overlayRef.current;

      // Ensure overlay starts off-screen and inert
      // gsap.set(overlay, { yPercent: -100, opacity: 0 });
      overlay.style.pointerEvents = "none";

      const links = overlay.querySelectorAll(".nav-link");

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onReverseComplete: () => {
          // Make overlay inert only after it fully closes
          if (overlayRef.current)
            overlayRef.current.style.pointerEvents = "none";
        },
      });

      tl.to(overlay, { yPercent: 0, opacity: 1, duration: 0.6 }, 0).from(
        links,
        { y: 24, stagger: 0.06, duration: 0.45 },
        0.1
      );

      tlRef.current = tl;

      // Sync timeline to current state (in case menuOpen starts true)
      if (menuOpen) {
        overlay.style.pointerEvents = "auto";
        tl.progress(1).pause(0); // jump to end-open state visually, keep paused
      } else {
        tl.progress(0).pause(0);
      }
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Play / reverse on toggle
  useEffect(() => {
    const tl = tlRef.current;
    const overlay = overlayRef.current;
    if (!tl || !overlay) return;

    if (menuOpen) {
      overlay.style.pointerEvents = "auto";
      tl.play(0);
    } else {
      tl.reverse();
    }
  }, [menuOpen]);

  // Lock body scroll & focus the first link when open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const id = setTimeout(() => firstLinkRef.current?.focus(), 0);

      const onKey = (e) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);

      return () => {
        clearTimeout(id);
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [menuOpen]);

  return (
    <>
      <div
        className={`w-full fixed top-0 left-0 right-0 z-40 ${
          showLogo
            ? "bg-black/40 backdrop-blur-md px-7 py-4 sm:px-10 sm:py-8 xl:px-20 xl:py-5"
            : "px-7 py-10 sm:px-10 sm:py-14 xl:px-20 xl:py-12"
        } flex justify-between items-center `}
      >
        <div className="w-[50%] flex items-center justify-start" />

        {/* Center logo (unchanged) */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-opacity  duration-300 ease-out will-change-transform ${
            showLogo
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <Image
            src="/assets/mainLogo.webp"
            alt="Ascendants logo"
            width={3840}
            height={1519}
            className={`h-13 md:h-16 w-auto object-contain`}
          />
        </div>

        {/* Right: Hamburger */}
        <div className="w-[50%] flex items-center justify-end">
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-overlay"
            onClick={() => setMenuOpen((s) => !s)}
            className="relative inline-flex items-center justify-center w-9 h-9 md:h-12 md:w-12 rounded-full focus:outline-none transition cursor-pointer"
          >
            <Image
              src={
                menuOpen
                  ? "/assets/close.svg"
                  : "/assets/hamburger.webp"
              }
              alt=""
              width={50}
              height={50}
              aria-hidden="true"
              className={`pointer-events-none cursor-pointer ${
                showLogo ? "invert" : "invert-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Fullscreen Overlay (your color restored) */}
      <div
        id="nav-overlay"
        ref={overlayRef}
        className="fixed inset-0 opacity-0  z-50 bg-[#da0e0f]"
        aria-hidden={!menuOpen}
      >
        {/* Close button */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="h-12 w-12 rounded-full flex items-center justify-center bg-black/20 hover:bg-black/30 text-white focus:outline-none focus:ring-2 focus:ring-white/60 cursor-pointer transition"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="pointer-events-none"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Menu content */}
        <nav
          className="h-full w-full flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <ul className="flex flex-col items-center justify-center gap-8 w-full">
            <li className="w-full flex justify-center text-center">
              <Link
                ref={firstLinkRef}
                href="#ascendants-section"
                onClick={() => setMenuOpen(false)}
                className="nav-link block font-bangers text-4xl md:text-5xl w-[80%] md:w-[50%] xl:w-[20%] px-6 py-3 pr-7 rounded-full bg-[#ffdd80] text-black hover:scale-[1.03] transition shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                Ascendants
              </Link>
            </li>
            <li className="w-full flex justify-center text-center">
              <Link
                href="#genesis-gems"
                onClick={() => setMenuOpen(false)}
                className="nav-link block font-bangers text-4xl md:text-5xl w-[80%] md:w-[50%] xl:w-[20%] px-6 py-3 pr-7 rounded-full bg-[#fc5921] text-black hover:scale-[1.03] transition shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                Genesis Gems
              </Link>
            </li>
            <li className="w-full flex justify-center text-center">
              <Link
                href="#lore-section"
                onClick={() => setMenuOpen(false)}
                className="nav-link block font-bangers text-4xl md:text-5xl w-[80%] md:w-[50%] xl:w-[20%] px-6 py-3 pr-7 rounded-full bg-[#ffdd80] text-black hover:scale-[1.03] transition shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                Lore
              </Link>
            </li>
            <li className="w-full flex justify-center text-center">
              <Link
                href="#"
                onClick={() => setMenuOpen(false)}
                className="nav-link block font-bangers text-4xl md:text-5xl w-[80%] md:w-[50%] xl:w-[20%] px-6 py-3 pr-7 rounded-full bg-[#fb2a13] text-black hover:scale-[1.03] transition shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                Whitepaper
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
