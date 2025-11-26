"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LeaderboardSection() {
  const [rows, setRows] = useState(
    Array.from({ length: 10 }, () => ({ rank: "", player: "", xp: "" }))
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await axios.get(
          "https://api.rageeffect.io/ascendants_backend/php/api/ranking-api.php",
          { params: { top: 10 } }
        );
        const data = res.data;
        if (cancelled) return;
        const mapped = (Array.isArray(data) ? data : [])
          .slice(0, 10)
          .map((item, i) => {
            const nick = item?.nick ?? "";
            const xp = item?.xp ?? "";
            const fracName = item?.fraction?.name ?? "";
            const fracColor = item?.fraction?.color ?? "";
            return {
              rank: String(i + 1),
              player: `${nick} - [${fracNameOrUnknown(fracName)}]`,
              xp: String(xp),
              fracColor: fracColor,
            };
          });
        setRows(mapped.length ? mapped : []);
      } catch (e) {
        console.error(e);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function fracNameOrUnknown(n) {
    return n || "Unknown";
  }

  return (
    <div
      className="w-full h-screen relative flex justify-center items-center py-20 overflow-hidden"
      style={{
        backgroundImage:
          "url('/assets/leaderboardBg.webp')",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="absolute  -top-15 left-0 w-full h-[10%] bg-black/40 backdrop-blur-xl blur-sm "></div>
      {/* Board background */}
      <div
        className="w-[70%] h-full relative justify-center items-center  hidden xl:flex"
        style={{
          backgroundImage:
            "url('/assets/leaderboardFinal.webp')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute -top-0 md:-top-4 w-[64%] md:w-[40%] left-1/2 -translate-x-1/2 font-bangers flex items-center justify-center text-center text-2xl md:text-5xl py-3 md:py-7 px-6 md:px-4 text-[#FCEC0C]"
          style={{
            backgroundImage:
              "url('/assets/leaderboardBlock.webp')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          Leaderboard
        </div>
        {/* Overlayed table */}
        <div className="w-full inset-0 px-8 md:px-12 lg:px-16 py-8 md:py-10 h-[80%] ">
          {/* Header */}
          <div className="grid grid-cols-[140px_1fr_140px] gap-x-10">
            <div className="h-14 md:h-16 bg-[#cf7b1a] flex items-center justify-center">
              <span className="text-black font-bold uppercase font-bangers tracking-wide text-lg md:text-4xl">
                Rank
              </span>
            </div>
            <div className="h-14 md:h-16 bg-[#cf7b1a] flex items-center justify-center">
              <span className="text-black font-bold uppercase font-bangers  text-lg md:text-4xl">
                Player
              </span>
            </div>
            <div className="h-14 md:h-16 bg-[#cf7b1a] flex items-center justify-center">
              <span className="text-black font-bold uppercase font-bangers  text-lg md:text-4xl">
                XP
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="mt-6 space-y-6 pr-2 overflow-y-scroll h-[90%] no-scrollbar">
            {rows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[140px_1fr_130px] gap-x-10 items-center"
              >
                {/* Rank small box */}
                <div className="flex justify-center">
                  <div className="h-14 md:h-[60px] w-full bg-[#1f1713]/90 rounded-sm flex items-center justify-center px-3">
                    <span className="text-white font-bangers text-lg md:text-2xl truncate w-full text-center">
                      {row.rank}
                    </span>
                  </div>
                </div>

                {/* Player wide bar */}
                <div className="h-14 md:h-[60px] w-full bg-[#1f1713]/90 rounded-sm flex items-center px-3">
                  <span
                    className="text-white font-bangers text-base md:text-xl truncate w-full"
                    title={row.player}
                  >
                    {row.player}
                  </span>
                </div>

                {/* XP small box */}
                <div className="flex justify-center">
                  <div className="h-14 md:h-[60px] w-full bg-[#1f1713]/90 rounded-sm flex items-center justify-center px-3">
                    <span className="text-white font-bangers text-lg md:text-2xl truncate w-full text-center">
                      {row.xp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile + tablet (landscape) leaderboard overlay - responsive */}
      <div
        className="w-[90%] h-full max-w-md md:max-w-2xl lg:max-w-3xl relative flex justify-center items-start py-5 xl:hidden"
        style={{
          backgroundImage:
            "url('/assets/leaderboardVertical.webp')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Title block (responsive position & sizing) */}
        <div
          className="absolute -top-6 md:-top-10 w-[64%] md:w-[50%] left-1/2 -translate-x-1/2 font-bangers flex items-center justify-center text-center text-2xl md:text-4xl py-3 md:py-5 px-6 md:px-8 text-[#FCEC0C]"
          style={{
            backgroundImage:
              "url('/assets/leaderboardBlock.webp')",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          Leaderboard
        </div>

        {/* Overlayed table area */}
        <div className="w-full h-full inset-0 px-6 md:px-10 py-6 md:py-8">
          {/* Header row */}
          <div className="grid grid-cols-[64px_1fr_84px] md:grid-cols-[140px_1fr_140px] gap-x-4 md:gap-x-10">
            <div className="h-12 md:h-16 bg-[#cf7b1a] flex items-center justify-center">
              <span className="text-black font-bold uppercase font-bangers tracking-wide text-sm md:text-4xl">
                Rank
              </span>
            </div>

            <div className="h-12 md:h-16 bg-[#cf7b1a] flex items-center justify-center">
              <span className="text-black font-bold uppercase font-bangers text-sm md:text-4xl">
                Player
              </span>
            </div>

            <div className="h-12 md:h-16 bg-[#cf7b1a] flex items-center justify-center">
              <span className="text-black font-bold uppercase font-bangers text-sm md:text-4xl">
                XP
              </span>
            </div>
          </div>

          {/* Rows (scrollable) */}
          <div className="mt-4 space-y-4 pr-2 overflow-y-auto max-h-[90%] md:max-h-[84%] no-scrollbar">
            {rows.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-[64px_1fr_84px] md:grid-cols-[140px_1fr_130px] gap-x-4 md:gap-x-10 items-center"
              >
                {/* Rank small box */}
                <div className="flex justify-center">
                  <div className="h-12 md:h-[60px] w-full bg-[#1f1713]/90 rounded-sm flex items-center justify-center px-3">
                    <span className="text-white font-bangers text-base md:text-2xl truncate w-full text-center">
                      {row.rank}
                    </span>
                  </div>
                </div>

                {/* Player wide bar */}
                <div className="h-12 md:h-[60px] w-full bg-[#1f1713]/90 rounded-sm flex items-center px-3">
                  <span
                    className="text-white font-bangers text-sm md:text-xl truncate w-full"
                    title={row.player}
                  >
                    {row.player}
                  </span>
                </div>

                {/* XP small box */}
                <div className="flex justify-center">
                  <div className="h-12 md:h-[60px] w-full bg-[#1f1713]/90 rounded-sm flex items-center justify-center px-3">
                    <span className="text-white font-bangers text-base md:text-2xl truncate w-full text-center">
                      {row.xp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
