"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FAQS = [
  {
    q: "What are Genesis Gems?",
    a: `Genesis Gems are a limited collection of powerful digital relics within The Ascendants' universe, designed to unlock abilities, access, and progression across the ecosystem.
Perks:
- Exclusive prize pools.
- Free Ascendants mint.
- Free Inferno Battle Pass.
- Earn higher in-game points.
- Early access to Ascendants: Legends.
- Earn stackable XP and faster Legends progression.
- 0.5% $RGE airdrop and increased staking rewards.`,
  },
  {
    q: "Are The Ascendants connected?",
    a: "Yes, both ecosystems are connected - enhancing gameplay and offering unique benefits to each other.",
  },
  {
    q: "How many Genesis Gems are there?",
    a: "555",
  },
  {
    q: "What chain are Genesis Gems launching on?",
    a: "They will mint exclusively on Ethereum mainnet.",
  },
  {
    q: "What’s the mint price?",
    a: "TBA.",
  },
  {
    q: "When is the mint date?",
    a: "TBA.",
  },
  // {
  //   q: "What’s the utility of owning a Genesis Gem?",
  //   a: "* Unlock player abilities in Ascendants Legends. * Free tournaments with exclusive prize pools. * Early access to game phases & private tests. * Stackable XP & faster Legends progression. * 0.5% $RGE airdrop + increased staking rewards. * Free Ascendant mint + guaranteed WL spots. * Exclusive Rage & Ascendants Legends cosmetics.",
  // },
  {
    q: "Will Genesis Gems be part of the game?",
    a: "Yes. Beyond collectibles, Genesis Gems actively enhance gameplay in The Ascendants Ecosystem and future expansions.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null); // index | null

  const toggle = (i) => setOpen((prev) => (prev === i ? null : i));

  function renderAnswerWithPerks(raw) {
    if (!raw) return null;

    // Split into lines, normalize whitespace
    const lines = raw.split(/\r?\n/).map((l) => l.trim());

    // Find "Perks:" line
    const perksIndex = lines.findIndex((l) => /^perks:?$/i.test(l));
    if (perksIndex === -1) {
      // No perks section -> return as a plain paragraph
      return <p className="font-sans leading-relaxed">{raw}</p>;
    }

    // Everything before "Perks:" becomes the intro paragraph
    const intro = lines.slice(0, perksIndex).join(" ");

    // Everything after becomes list candidates; keep lines starting with - or •
    const perkItems = lines
      .slice(perksIndex + 1)
      .filter((l) => /^[-•]\s*/.test(l))
      .map((l) =>
        l
          .replace(/^[-•]\s*/, "")
          .replace(/\.$/, "")
          .trim()
      ) // strip leading dash/dot and trailing period
      .filter(Boolean);

    return (
      <div className="space-y-3">
        {intro && <p className="font-sans leading-relaxed">{intro}</p>}
        <div>
          <div className="mb-1 font-semibold tracking-wide">Perks:</div>
          <ul className="list-disc list-inside space-y-2 font-sans leading-relaxed">
            {perkItems.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen relative flex flex-col justify-start items-center gap-10 pt-20 pb-24 overflow-hidden"
      style={{
        backgroundImage: "url('/assets/faqBg.webp')",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute  -top-15 left-0 w-full h-[5.5%] bg-black/40 backdrop-blur-xl blur-sm "></div>
      <h1 className="text-4xl md:text-6xl font-bangers text-[#FCEC0C]">
        Frequently Asked Questions
      </h1>

      <div className="w-[90%] md:w-[70%] flex flex-col gap-6">
        {FAQS.map((item, i) => {
          const isOpen = open === i;

          // detect if answer contains "*"
          const isBulletList = item.a.trim().startsWith("*");
          const bulletItems = isBulletList
            ? item.a.split("*").filter((line) => line.trim() !== "")
            : [];

          return (
            <div
              key={i}
              /* IMPORTANT: stack header + panel vertically */
              className={[
                "rounded-[6px] transition-all duration-300 flex flex-col overflow-hidden", // <- flex-col here
                isOpen
                  ? "bg-gradient-to-b from-[#350f0a] to-[#530901] ring-8 ring-[#f65e07]"
                  : "ring-none",
              ].join(" ")}
              style={
                isOpen
                  ? {}
                  : {
                      backgroundImage:
                        "url('/assets/faqBlock.webp')",
                      backgroundSize: "100% 100%",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }
              }
            >
              {/* Header row */}
              <button
                onClick={() => toggle(i)}
                className="w-full py-6 px-8 text-2xl md:text-3xl font-bangers flex items-center justify-between"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
              >
                <span className="text-white drop-shadow">{item.q}</span>
                <IoIosArrowDown
                  size={44}
                  className={
                    "text-white transition-transform duration-300 " +
                    (isOpen ? "rotate-180" : "rotate-0")
                  }
                />
              </button>

              {/* Answer panel (always mounted so transitions work on close as well) */}
              <div
                id={`faq-panel-${i}`}
                className={
                  "px-8 pb-6 text-base md:text-xl text-white/90 overflow-hidden transition-[max-height,opacity] duration-300 " +
                  (isOpen
                    ? "max-h-120 opacity-100"
                    : "max-h-0 opacity-0 hidden")
                }
                aria-hidden={!isOpen}
              >
                {isBulletList ? (
                  <ul className="list-disc list-inside space-y-2 font-sans leading-relaxed">
                    {bulletItems.map((line, idx) => (
                      <li key={idx}>{line.trim()}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-sans leading-relaxed">
                    {" "}
                    {renderAnswerWithPerks(item.a)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
