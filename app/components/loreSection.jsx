"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const DUR_MS = 420; // animation duration in ms
const EASING = [0.22, 1, 0.36, 1];

const LoreSection = () => {
  const CDN = "";
  // --- Normal array (your 6 slides) ---
  const slides = [
    {
      title: "1. The Fall of the Old World",
      desc: "World War 3 ended the old world. What rose from the ashes was far worse. Four strangers. One shattered Earth. And a flood of powers no one understands. The fight for the Auric Gem begins.",
      img: "/assets/lore1.webp",
    },
    {
      title: "2. The Awakening",
      desc: "The Auric Gem awakened. The Earth shattered. Is this the end, or merely the beginning? The only way to know is to ascend.",
      img: "/assets/lore2.webp",
    },
    {
      title: "3. The Phantom Army’s Descent",
      desc: "Deep below, the Phantom Army’s drill struck the heart of the Earth, unraveling the balance between surface and shadow. They drilled into darkness and found a kingdom untouched by war. What they awakened can’t be undone.",
      img: "/assets/lore3.webp",
    },
    {
      title: "4. The Virelurks Rise",
      desc: "Born from failed experiments and twisted by desperation, the Virelurks were meant to save us. Now they stalk the drowned cities, hunting what’s left of us in the dark.",
      img: "/assets/lore4.webp",
    },
    // {
    //   title: "5. The Eclipse Kingdom",
    //   desc: "They called it a myth, a paradise sealed beneath the surface. The Eclipse Kingdom lived in balance, cradled by waterfalls and protected by the Auric Gem. It pulsed gently a guardian, not a weapon.",
    //   img: "/assets/lore6.webp",
    // },
    {
      title: "5. The King’s Fall",
      desc: "He ruled the shadows with wisdom. He welcomed the surface with hope. But peace was fragile. The Eclipse King’s fall didn’t just break a kingdom, it cracked Earth’s last balance.",
      img: "/assets/lore5.webp",
    },
    {
      title: "COMING SOON", // used only for a11y; we’ll render a big banner instead
      desc: "",
      img: "", // no image
      comingSoon: true,
    },
    // {
    //   title: "6. The King’s Fall",
    //   desc: "He ruled the shadows with wisdom. He welcomed the surface with hope. But peace was fragile. The Eclipse King’s fall didn’t just break a kingdom, it cracked Earth’s last balance.",
    //   img: "/assets/lore5.webp",
    // },
    // {
    //   title: "7. The Stormborn Rebellion",
    //   desc: "They don’t wear uniforms, they wear scars. Born from the floods, forged by rebellion, the Stormborn don’t fight for power, they fight to reclaim it.",
    //   img: "/assets/lore7.webp",
    // },
    // {
    //   title: "8. The Inferno Syndicates",
    //   desc: "The Auric blast didn’t kill him. It crowned him. The Inferno Syndicates rose from the wreckage, wielding powers they never asked for, in a world that can’t contain them. Chaos isn’t coming. It already burns.",
    //   img: "/assets/lore8.webp",
    // },
    // {
    //   title: "9. The Final Clash",
    //   desc: "The battlefield is set. The fight for the Auric Gem reaches its breaking point. Only one path remains.. To ascend or to be forgotten.",
    //   img: "/assets/lore10.webp",
    // },
    // {
    //   title: "10. Choose Your Ascendant",
    //   desc: "The battlefield is set. The fight for the Auric Gem reaches its breaking point. Only one path remains.. To ascend or to be forgotten.",
    //   img: "/assets/lore11.webp",
    // },
  ];

  // Extended list for seamless loop: [last, ...slides, first]
  const extended = [slides[slides.length - 1], ...slides, slides[0]];

  // Start at first real slide
  const [idx, setIdx] = useState(1);
  const [lock, setLock] = useState(false); // prevent rapid clicks

  // refs and motion value
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const slideWidthRef = useRef(0);

  // compute realIndex for text
  const realIndex = (idx - 1 + slides.length) % slides.length;
  const current = slides[realIndex]; // ✅ add this

  // helpers to move to slide (animated)
  const goto = (newIdx, opts = {}) => {
    setIdx(newIdx);
    setLock(true);
    const target = -newIdx * slideWidthRef.current;
    animate(x, target, { duration: DUR_MS / 1000, ease: EASING }).then(() => {
      setLock(false);
      // snap if we're on clone
      if (newIdx === extended.length - 1) {
        // jump without animation to 1
        x.set(-1 * slideWidthRef.current);
        setIdx(1);
      } else if (newIdx === 0) {
        x.set(-(extended.length - 2) * slideWidthRef.current);
        setIdx(extended.length - 2);
      }
    });
  };

  const next = () => {
    if (lock) return;
    goto(idx + 1);
  };
  const prev = () => {
    if (lock) return;
    goto(idx - 1);
  };

  // initialize sizes and x position
  useEffect(() => {
    const setSizes = () => {
      const w = containerRef.current?.offsetWidth || 0;
      slideWidthRef.current = w; // each slide takes full container width
      x.set(-idx * w);
    };
    setSizes();
    const ro = new ResizeObserver(setSizes);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update text when idx (realIndex) changes but do not re-render animations here
  useEffect(() => {
    // nothing else needed — text uses realIndex
  }, [idx]);

  // drag end handler using framer's info
  const onDragEnd = (e, info) => {
    const offset = info.offset.x; // positive means dragged right
    const velocity = info.velocity.x;

    // threshold depends on width
    const threshold = Math.min(80, slideWidthRef.current * 0.12);
    const velocityThreshold = 800;

    if (offset < -threshold || velocity < -velocityThreshold) {
      goto(idx + 1);
    } else if (offset > threshold || velocity > velocityThreshold) {
      goto(idx - 1);
    } else {
      // snap back
      goto(idx);
    }
  };

  return (
    <div
      id="lore-section"
      className="
        relative w-full overflow-hidden
        px-3 sm:px-5 md:px-8 py-10
        flex flex-col gap-6 items-center justify-between
      "
      style={{
        backgroundImage:
          "url('/assets/loreBg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Lore Carousel"
    >
      <div className="absolute -top-15 left-0 w-full h-[10%] bg-black/60 backdrop-blur-3xl blur-sm " />

      {/* Title bar */}
      <div className="w-full flex items-start">
        <div
          className="relative inline-block bg-no-repeat bg-center px-3 sm:px-4"
          style={{
            backgroundImage: "url('/assets/loreTextBg.webp')",
            backgroundSize: "100% 100%",
          }}
        >
          <h2 className="font-bangers text-white px-3 sm:px-5 py-2 sm:py-3 tracking-wide uppercase text-[20px] sm:text-4xl md:text-5xl leading-none">
            LORE
          </h2>
        </div>
      </div>

      {/* Slide text */}
      <div className="flex flex-col items-center w-full justify-center mt-4 xl:mt-0">
        {/* NEW: Swap text area when on Coming Soon */}
        {current?.comingSoon ? (
          <div className="md:self-start ml-5 h-[12vh] flex items-center">
            <h1 className="font-bangers text-white/90 text-3xl sm:text-5xl md:text-6xl tracking-wider"></h1>
          </div>
        ) : (
          <div className="md:self-start transition-opacity duration-300 opacity-100 ml-5 h-[12vh]">
            <h1 className="font-oskariBold text-white/90 text-sm sm:text-[15px] md:text-3xl leading-5 md:leading-6">
              {current.title}
            </h1>
            <p className="font-oskariRegular text-white/90 text-sm sm:text-[15px] md:text-2xl leading-5 md:leading-6 md:ml-4 mt-2 max-w-[78ch] h-[100%] overflow-hidden">
              {current.desc}
            </p>
          </div>
        )}

        {/* Image carousel row */}
        <div className="flex items-center justify-center w-full gap-3 sm:gap-6 px-3 sm:px-6 md:px-10 mt-4 md:mt-6 select-none">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="shrink-0 p-2 sm:p-3 rounded-full opacity-90 hover:opacity-100 hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          >
            <Image
              src="/assets/backwardButton.webp"
              width={51}
              height={50}
              alt="Previous"
              className="w-4 sm:w-9 md:w-12 lg:w-[5%] lg:min-w-10"
              draggable={false}
            />
          </button>

          <div className="relative w-[60%] overflow-hidden" ref={containerRef}>
            <motion.div
              drag="x"
              dragElastic={0.12}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              style={{ x }}
              className="flex items-center"
            >
              {extended.map((s, i) => {
                const isComingSoon = s?.comingSoon; // ✅ no TS casting

                return (
                  <div
                    key={i}
                    style={{ width: slideWidthRef.current || "100%" }}
                    className="flex justify-center items-center flex-shrink-0"
                  >
                    <div
                      className="w-[100%] xs:w-[82%] sm:w-[74%] md:w-[64%] lg:w-[90%] transition-transform relative px-1 lg:px-4 py-3"
                      aria-hidden={i !== idx}
                    >
                      {/* If it's the Coming Soon slide */}
                      {isComingSoon ? (
                        <div
                          className="w-full min-h-[180px] sm:min-h-[260px] md:min-h-[360px] lg:min-h-[420px] xl:min-h-[460px] 2xl:min-h-[520px] flex items-center justify-center rounded-md"
                          role="img"
                          aria-label="Coming soon"
                        >
                          <span className="font-bangers text-white/90 text-2xl sm:text-5xl md:text-6xl lg:text-7xl tracking-widest">
                            COMING SOON...
                          </span>
                        </div>
                      ) : (
                        <>
                          {/* Border overlay */}
                          <div className="absolute top-0 left-0 w-full h-full">
                            <Image
                              src="/assets/loreBorder.webp"
                              alt="Frame"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <Image
                            src={
                              s.img.startsWith("http")
                                ? s.img
                                : `${CDN}${s.img}`
                            }
                            alt={`Lore visual ${i}`}
                            width={1146}
                            height={620}
                            className="w-full h-auto rounded-md"
                            sizes="(max-width: 420px) 88vw,(max-width: 640px) 82vw,(max-width: 768px) 74vw,(max-width: 1024px) 64vw,55vw"
                            draggable={false}
                          />
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <button
            onClick={next}
            aria-label="Next slide"
            className="shrink-0 p-2 sm:p-3 rounded-full opacity-90 hover:opacity-100 hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          >
            <Image
              src="/assets/backwardButton.webp"
              width={51}
              height={50}
              alt="Next"
              className="w-4 sm:w-9 md:w-12 lg:w-[5%] lg:min-w-10 rotate-180"
              draggable={false}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoreSection;
