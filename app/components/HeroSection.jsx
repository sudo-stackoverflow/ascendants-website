"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* --- small helpers --- */
const useHydrated = () => {
  const [h, setH] = useState(false);
  useEffect(() => setH(true), []);
  return h;
};
const useFontsReady = () => {
  const [ready, setReady] = useState(true);
  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      document.fonts &&
      document.fonts.ready
    ) {
      setReady(false);
      document.fonts.ready.finally(() => setReady(true));
    }
  }, []);
  return ready;
};

/* Measure natural width of an inline element */
function useMeasureWidth() {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const measure = () => setW(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

/* Measure width and height of an element */
function useMeasureRect() {
  const ref = useRef(null);
  const [rect, setRect] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setRect({ width: r.width, height: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, rect.width, rect.height];
}

function NewsletterSlideUltraSmooth() {
  const hydrated = useHydrated();
  const fontsReady = useFontsReady();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [referral, setReferral] = useState("");
  const scrollYRef = useRef(0);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalIsError, setModalIsError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const inputRef = useRef(null);
  const frameRef = useRef(null);

  // Offscreen measurers (no flicker, no layout impact)
  const [btnRef, btnW] = useMeasureWidth();
  const [formRef, formW, formH] = useMeasureRect();

  // Ready when client, fonts loaded, and both widths/heights known
  const ready = hydrated && fontsReady && btnW > 0 && formW > 0 && formH > 0;

  // Focus when opened
  useEffect(() => {
    if (open && inputRef.current) {
      const id = setTimeout(() => inputRef.current?.focus(), 10);
      return () => clearTimeout(id);
    }
  }, [open]);

  // Click outside to close (capture so nothing can stop it)
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (!frameRef.current) return;
      if (!frameRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, [open]);

  // Escape to close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll on mobile while form is open to prevent viewport jump
  useEffect(() => {
    if (!open) return;
    if (typeof window === "undefined") return;
    scrollYRef.current = window.scrollY || window.pageYOffset || 0;
    const body = document.body;
    const html = document.documentElement;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      obBehavior: html.style.overscrollBehaviorY,
    };
    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    html.style.overscrollBehaviorY = "contain";
    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      html.style.overscrollBehaviorY = prev.obBehavior || "";
      const y = scrollYRef.current || 0;
      window.scrollTo(0, y);
    };
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMsg("");
    setSubmitting(true);
    try {
      const res = await fetch(
        "https://api.rageeffect.io/ascendants_backend/php/bl_CollectEmail.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, referral: referral || null }),
          mode: "cors",
        }
      );
      const data = await res.json().catch(() => null);
      if (!data) throw new Error("Invalid response");
      const status = data.status;
      if (status === "success") {
        setModalIsError(false);
        setModalMessage("");
        setShowModal(true);
        setOpen(false);
        setEmail("");
        setReferral("");
      } else {
        const msg = data.message || "Something went wrong. Please try again.";
        setModalIsError(true);
        setModalMessage(msg);
        setShowModal(true);
        setOpen(false);
      }
    } catch (err) {
      setModalIsError(true);
      setModalMessage("Network error. Please try again.");
      setShowModal(true);
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  // Target size (no animation until ready -> zero glitches)
  const targetWidth = open ? formW + 20 || 320 : Math.max(160, btnW || 160);
  const targetHeight = open ? Math.max(56, formH + 20) : 56;

  return (
    <div className="relative">
      {/* Hidden measurers */}
      <div className="fixed -left-[9999px] top-0 opacity-0 pointer-events-none select-none">
        <div ref={btnRef} className="inline-flex">
          <button className="font-bangers whitespace-nowrap text-3xl md:text-4xl text-black bg-[#fc5921] rounded-full px-7 py-2">
            Claim your early access
          </button>
        </div>
        <div ref={formRef} className="inline-flex">
          <div className="bg-white/95 border border-gray-300 rounded-2xl md:rounded-3xl">
            <div className="flex flex-col justify-center items-center gap-2 p-3 w-[min(100vw-2rem,360px)] sm:w-[min(100vw-3rem,420px)] md:w-[480px] lg:w-[520px]">
              <p className=" text-xs md:text-2xl leading-snug text-center px-1 font-bangers">
                Claim your early access
              </p>
              <p className=" text-xs md:text-base leading-snug text-center px-1 font-bangers max-w-[520px]">
                Be the first to play Ascendants' Legends. Sign up now and unlock
                your referral code to invite friends.
              </p>
              <input className="px-4 py-2 w-full" />
              <input className="px-4 py-2 w-full" />
              <div className="px-5 py-2 w-full font-bangers text-xl text-center">
                Join the Ascent
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frame that animates width/height only (no reflow) */}
      <motion.div
        ref={frameRef}
        className="relative overflow-visible will-change-[width,height] max-w-[calc(100vw-1.25rem)] sm:max-w-[calc(100vw-2rem)] md:max-w-none"
        style={{
          width: ready ? targetWidth : "auto",
          height: ready ? targetHeight : "auto",
          overflowAnchor: "none",
        }}
        animate={ready ? { width: targetWidth, height: targetHeight } : false}
        initial={false} // prevent first-load animation
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
      >
        <div className="relative h-full">
          <AnimatePresence initial={false} mode="wait">
            {!open ? (
              <motion.button
                key="btn"
                type="button"
                onClick={() => ready && setOpen(true)}
                className="absolute inset-0 font-bangers whitespace-nowrap text-3xl md:text-4xl text-black bg-[#fc5921] rounded-full px-7 py-2 hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
              >
                Claim your early access
              </motion.button>
            ) : (
              <motion.form
                key="form"
                onSubmit={submit}
                className="absolute inset-0 flex flex-col items-stretch gap-2 p-2 bg-black/25 backdrop-blur-xl border border-gray-200 rounded-2xl md:rounded-3xl shadow-sm flex flex-col justify-center items-center overflow-hidden"
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
              >
                <div className="flex flex-col items-stretch gap-2 p-3 w-[min(100vw-2rem,360px)] sm:w-[min(100vw-3rem,420px)] md:w-[480px] lg:w-[520px] mx-auto">
                  <p className=" text-2xl md:text-2xl leading-snug text-center px-1 font-bangers text-white">
                    Claim your early access
                  </p>
                  <p className=" text-md md:text-base leading-snug text-center px-1 font-bangers text-white mx-auto max-w-[520px]">
                    Be the first to play Ascendants' Legends. Sign up now and
                    unlock your referral code to invite friends.
                  </p>
                  <label htmlFor="nl-email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="nl-email"
                    ref={inputRef}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="px-4 py-2 w-full text-white placeholder-white/80 bg-transparent outline-none"
                  />
                  <label htmlFor="nl-referral" className="sr-only">
                    Referral Code (optional)
                  </label>
                  <input
                    id="nl-referral"
                    type="text"
                    value={referral}
                    onChange={(e) => setReferral(e.target.value)}
                    placeholder="Referral code (optional)"
                    className="px-2 md:px-4 py-2 w-full text-white placeholder-white/80 bg-transparent outline-none"
                  />
                  {errorMsg ? (
                    <div className="text-red-200 text-xs md:text-sm text-center px-1">
                      {errorMsg}
                    </div>
                  ) : null}
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full px-5 py-2 rounded-full bg-[#fc5921] text-xl font-bangers text-black transition-transform ${
                      submitting
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:scale-[1.03]"
                    }`}
                  >
                    {submitting ? "Submitting…" : "Join the Ascent"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            key="success-modal"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="relative z-10 mx-4 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 text-center shadow-2xl"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {modalIsError && (
                <>
                  <h3 className="font-bangers text-4xl md:text-5xl text-red-200 mb-2">
                    Something went wrong
                  </h3>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    {modalMessage}
                  </p>
                </>
              )}
              {!modalIsError && (
                <>
                  <h3 className="font-bangers text-4xl md:text-5xl text-white mb-2">
                    You’re In!
                  </h3>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed">
                    We’ll notify you when the gates open. Share your in-game
                    referral code to earn XP and climb the leaderboard.
                  </p>
                </>
              )}
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setModalIsError(false);
                    setModalMessage("");
                  }}
                  className="px-6 py-2 rounded-full bg-[#fc5921] text-black font-bangers text-2xl hover:scale-[1.03] transition-transform"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const HeroSection = () => {
  return (
    <div
      id="hero-section"
      className="w-full h-screen relative flex flex-col justify-start items-center landscape:py-5 landscape:lg:py-30 landscape:xl:py-20 py-30 xl:py-20 z-0 overflow-hidden bg-[url('/assets/orangebg4.webp')] bg-no-repeat bg-center bg-[length:300%_100%] md:bg-[length:100%_100%]" // ⬅️ clip the growing overlay
      // style={{
      //   backgroundImage:
      //     "url('/assets/orangebg4.webp')",
      //   // "url('/assets/orangebg4.png')",
      //   backgroundSize: "100% 100%",
      // }}
    >
      <div
        id="hero-overlay"
        className="pointer-events-none absolute inset-0 z-20 scale-y-0 will-change-transform"
        style={{
          background:
            "linear-gradient(rgba(200,13,12,0) 0%, rgba(200,13,12,0.85) 35%, rgba(200,13,12,1) 70%)",
          // GSAP controls opacity/scale via ScrollTrigger; start hidden
          opacity: 0,
        }}
      />
      <div className="absolute w-full h-full bottom-0 left-1/2 -translate-x-1/2 flex justify-center items-end z-1">
        <Image
          src="/assets/Border.webp"
          alt="Hero Background"
          width={1554}
          height={963}
          objectFit="cover"
          className="w-full h-full"
        />
      </div>
      <div className="absolute w-[250vw] h-[70%] landscape:w-full landscape:bottom-0 landscape:lg:bottom-7 landscape:h-full landscape:lg:w-[250vw] landscape:lg:h-[70%] landscape:xl:w-full landscape:xl:h-full xl:w-full xl:h-full bottom-7 left-1/2 -translate-x-1/2 flex justify-center items-end -z-1">
        <Image
          src="/assets/sunCastleFinal.webp"
          alt="Hero Background"
          width={4556}
          height={2153}
          objectFit="cover"
          className="w-auto h-full landscape:w-[60%] landscape:h-auto landscape:lg:w-auto landscape:lg:h-full lg:w-[38%] landscape:xl:w-[70%] landscape:xl:h-auto xl:w-[67%] lg:h-auto"
          priority
        />
      </div>
      <div className="absolute w-full h-full landscape:bottom-1 landscape:lg:bottom-6 bottom-6 right-[15%] xl:right-[24%] translate-x-1/2 flex justify-center items-end z-2">
        <Image
          src="/assets/p22.webp"
          alt="Hero Background"
          width={864}
          height={1144}
          objectFit="cover"
          className="w-[40%] landscape:w-[15%] landscape:xl:w-[12%] lg:w-[15%] xl:w-[12%] h-auto rotate-y-180 landscape:rotate-y-0 lg:rotate-y-0"
        />
      </div>
      <div className="absolute w-full h-full landscape:bottom-1 landscape:lg:bottom-6 bottom-6 left-1/2 -translate-x-[49%] flex justify-center items-end z-2">
        <Image
          src="/assets/p12.webp"
          alt="Hero Background"
          width={944}
          height={1008}
          objectFit="cover"
          className="w-[38%] landscape:w-[12%] landscape:lg:w-[16%] landscape:xl:w-[11%] lg:w-[16%] xl:w-[10%] h-auto"
        />
      </div>
      <div className="absolute w-full h-full landscape:bottom-1 landscape:lg:bottom-6 bottom-6 left-[22%] lg:left-[10%] xl:left-[20%] -translate-x-1/2 flex justify-center items-end z-2">
        <Image
          src="/assets/p32.webp"
          alt="Hero Background"
          width={1344}
          height={1796}
          objectFit="cover"
          className="w-[70%] landscape:w-[20%] landscape:lg:w-[25%] landscape:xl:w-[19%] lg:w-[25%] xl:w-[17%] h-auto rotate-y-180 landscape:rotate-y-0 lg:rotate-y-0"
        />
      </div>
      <div className="w-[70%] landscape:w-[30%] landscape:lg:w-[50%] landscape:xl:w-[30%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[30%]">
        <Image
          src="/assets/heroLogo.webp"
          width={656}
          height={240}
          alt="Hero Text"
          className="w-full"
          priority
        />
      </div>
      <div className="relative z-10 landscape:h-[60%] landscape:lg:h-full landscape:xl:h-[60%] h-full xl:h-[60%] flex justify-center items-center gap-4">
        {/* <Link href="https://theascendants.xyz/legends" target="_blank">
          <button className="text-black font-bangers text-4xl landscape:text-4xl landscape:lg:text-7xl landscape:xl:text-4xl md:text-7xl bg-[#fc5921] rounded-full text-center flex items-center justify-center px-7 py-2 cursor-pointer hover:scale-105 transition-transform duration-300">
            Play Game
          </button>
        </Link> */}
        {/* Newsletter */}
        <NewsletterSlideUltraSmooth />
      </div>
      {/* <Image
        src="/assets/gem1.png"
        alt="Hero Image"
        width={240}
        height={240}
        className="w-[10%] h-auto absolute right-0 -bottom-38"
      />
      <Image
        src="/assets/gem2.png"
        alt="Hero Image"
        width={240}
        height={240}
        className="w-[18%] h-auto absolute right-60 -bottom-54"
      />
      <Image
        src="/assets/gem3.png"
        alt="Hero Image"
        width={240}
        height={240}
        className="w-[10%] h-auto absolute left-0 -bottom-42"
      /> */}
      <div className="absolute -bottom-5 left-0 w-full h-[4%] bg-black blur-md -z-1"></div>
    </div>
  );
};

export default HeroSection;
