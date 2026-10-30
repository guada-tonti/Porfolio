'use client';

import React from 'react';

export function HeroCollage() {
  return (
    <div
      aria-label="Creative collage of Guada Tonti's world"
      className="relative w-full max-w-[490px] h-[480px] md:h-[530px] mx-auto select-none overflow-visible"
    >
      {/* 
        Subtle black hand-drawn decorative curved flourishes
        (drawn with clean SVG strokes)
      */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        viewBox="0 0 500 520"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="1.2"
        strokeLinecap="round"
      >
        {/* Left flowing decorative loop */}
        <path d="M 190 240 C 130 220, 110 320, 195 330 C 230 334, 250 290, 230 250" />
        {/* Right delicate accent loop under electric guitar */}
        <path d="M 400 370 C 440 390, 420 440, 370 410 C 350 395, 380 340, 415 365" />
      </svg>

      {/* 
        1. Large portrait-oriented photograph (Guada looking over cityscape at sunset with guitar)
        Rotated slightly ~2deg
      */}
      <div
        className="absolute top-2 left-6 md:left-10 w-[240px] md:w-[265px] h-[340px] md:h-[375px] bg-[#d37446] shadow-xl overflow-hidden rounded-[2px] transform rotate-[2.5deg] z-10 border border-black/10 group transition-transform duration-300 hover:rotate-1"
        style={{
          boxShadow: '0 18px 40px -12px rgba(0, 0, 0, 0.18)',
        }}
      >
        {/* Sunset city view mockup */}
        <div className="w-full h-full relative bg-gradient-to-b from-[#df7f5b] via-[#e59b7b] to-[#402a28] flex flex-col justify-between p-4">
          {/* City skyline silhouettes */}
          <div className="absolute inset-x-0 bottom-16 h-28 opacity-40 flex items-end justify-between px-2 pointer-events-none">
            <div className="w-6 h-20 bg-zinc-900" />
            <div className="w-8 h-24 bg-zinc-900" />
            <div className="w-5 h-16 bg-zinc-900" />
            <div className="w-9 h-28 bg-zinc-900" />
            <div className="w-7 h-20 bg-zinc-900" />
            <div className="w-6 h-14 bg-zinc-900" />
          </div>

          {/* Person from behind holding guitar */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-2">
            {/* Head & hair bun */}
            <div className="w-14 h-14 rounded-full bg-zinc-900 mb-1 relative shadow">
              <div className="w-6 h-6 rounded-full bg-zinc-800 -top-2 left-4 absolute" />
            </div>
            {/* Dark cozy sweater shoulders */}
            <div className="w-36 h-28 bg-zinc-900 rounded-t-3xl relative flex items-center justify-center">
              {/* Wooden acoustic guitar neck behind shoulder */}
              <div className="w-4 h-24 bg-amber-800 rotate-[-35deg] absolute -right-3 top-2 border border-amber-950 shadow-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* 
        2. Smaller photograph of a black & white tuxedo cat
        Positioned top right, rotated ~-1deg, with pink tape on top
      */}
      <div
        className="absolute top-4 right-1 md:right-3 w-[140px] md:w-[155px] h-[105px] md:h-[115px] bg-white p-1.5 shadow-lg rounded-[2px] transform -rotate-[1deg] z-20 transition-transform duration-300 hover:rotate-0"
        style={{
          boxShadow: '0 12px 28px -8px rgba(0, 0, 0, 0.16)',
        }}
      >
        {/* Pink washi tape accent */}
        <div className="absolute -top-3 left-4 w-12 h-5 bg-rose-300/85 shadow-xs transform -rotate-3 z-30" />

        {/* Tuxedo cat scene */}
        <div className="w-full h-full bg-[#1b222c] rounded-[1px] relative flex items-center justify-center overflow-hidden">
          <div className="text-3xl filter contrast-125">🐾</div>
          <div className="absolute bottom-1 text-[8px] tracking-wide text-zinc-300 font-sans font-medium">
            Bigotes &amp; Oli
          </div>
        </div>
      </div>

      {/* 
        3. Landscape illustration / mountain lake artwork
        Positioned below cat, rotated ~-3deg
      */}
      <div
        className="absolute top-[125px] md:top-[135px] right-0 md:right-2 w-[145px] md:w-[160px] h-[115px] md:h-[125px] bg-white p-1.5 shadow-lg rounded-[2px] transform -rotate-[3deg] z-20 transition-transform duration-300 hover:rotate-[-1deg]"
        style={{
          boxShadow: '0 14px 30px -10px rgba(0, 0, 0, 0.16)',
        }}
      >
        <div className="w-full h-full bg-gradient-to-b from-[#2d4059] via-[#ea5455] to-[#f07b3f] rounded-[1px] relative overflow-hidden flex flex-col justify-end p-2">
          {/* Mountain silhouettes & reflection */}
          <div className="w-0 h-0 border-l-[35px] border-l-transparent border-r-[35px] border-r-transparent border-b-[45px] border-b-[#1c2b3d] absolute bottom-6 left-2" />
          <div className="w-0 h-0 border-l-[45px] border-l-transparent border-r-[45px] border-r-transparent border-b-[55px] border-b-[#0f1924] absolute bottom-6 right-1" />
          {/* Lake water surface */}
          <div className="w-full h-6 bg-[#0c1520]/90 backdrop-blur-xs relative z-10 border-t border-cyan-400/30" />
        </div>
      </div>

      {/* 
        4. Partially visible electric guitar (Stratocaster style)
        Positioned bottom right, angled with blue tape accent
      */}
      <div
        className="absolute bottom-2 md:bottom-4 right-0 md:-right-2 w-[140px] md:w-[155px] h-[170px] md:h-[190px] z-15 overflow-hidden pointer-events-none select-none"
      >
        {/* Blue washi tape accent */}
        <div className="absolute top-8 -left-2 w-12 h-5 bg-sky-400/85 shadow-xs transform rotate-12 z-30 pointer-events-auto" />

        {/* Vintage white/aged cream Stratocaster guitar body */}
        <div className="relative w-full h-full flex flex-col items-center justify-end transform -rotate-[32deg] translate-y-6">
          <div className="w-28 h-40 bg-[#f7f2e7] rounded-3xl border-2 border-stone-300 shadow-xl relative p-3 flex flex-col items-center">
            {/* Pickguard */}
            <div className="w-20 h-28 bg-white rounded-2xl border border-stone-200 relative">
              {/* Pickups */}
              <div className="w-12 h-2.5 bg-black rounded-sm mx-auto mt-4 flex items-center justify-around px-1">
                <div className="w-1 h-1 rounded-full bg-stone-300" />
                <div className="w-1 h-1 rounded-full bg-stone-300" />
                <div className="w-1 h-1 rounded-full bg-stone-300" />
              </div>
              <div className="w-12 h-2.5 bg-black rounded-sm mx-auto mt-2 flex items-center justify-around px-1">
                <div className="w-1 h-1 rounded-full bg-stone-300" />
                <div className="w-1 h-1 rounded-full bg-stone-300" />
                <div className="w-1 h-1 rounded-full bg-stone-300" />
              </div>
              {/* Volume & tone knobs */}
              <div className="flex gap-1.5 justify-end pr-2 mt-3">
                <div className="w-3 h-3 rounded-full bg-amber-100 border border-stone-400 shadow-xs" />
                <div className="w-3 h-3 rounded-full bg-amber-100 border border-stone-400 shadow-xs" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
        5. Torn-paper illustration of Saturn
        Positioned front & center-right, overlapping the main photo
      */}
      <div
        className="absolute bottom-6 md:bottom-10 left-[110px] md:left-[140px] w-[180px] md:w-[205px] h-[145px] md:h-[160px] bg-[#fbf9f4] shadow-xl z-30 p-3 transform -rotate-[3deg] transition-transform duration-300 hover:rotate-[-1deg]"
        style={{
          boxShadow: '0 16px 36px -8px rgba(0, 0, 0, 0.22)',
          clipPath:
            'polygon(0% 4%, 5% 0%, 15% 3%, 30% 1%, 45% 4%, 60% 0%, 75% 3%, 90% 1%, 100% 5%, 98% 30%, 100% 60%, 97% 85%, 100% 98%, 85% 96%, 70% 99%, 50% 97%, 30% 100%, 15% 96%, 0% 98%, 3% 70%, 1% 40%)',
        }}
      >
        {/* Pink tape on top edge of torn paper */}
        <div className="absolute -top-3.5 left-10 w-10 h-4.5 bg-rose-300/80 shadow-xs transform rotate-2 z-40" />

        {/* Engraved / vintage stipple Saturn illustration */}
        <div className="w-full h-full relative flex items-center justify-center">
          <svg
            className="w-36 h-28 text-zinc-900"
            viewBox="0 0 160 120"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            {/* Saturn Body */}
            <circle cx="80" cy="60" r="28" fill="#faf7f0" stroke="currentColor" strokeWidth="1.4" />
            {/* Shading stippling / latitude lines on Saturn */}
            <path d="M 54 53 Q 80 57 106 53" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 1.5" />
            <path d="M 53 60 Q 80 64 107 60" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1 1.5" />
            <path d="M 55 67 Q 80 71 105 67" stroke="currentColor" strokeWidth="0.8" strokeDasharray="1.5 1.5" />

            {/* Saturn Ring Ellipse (front) */}
            <ellipse
              cx="80"
              cy="60"
              rx="62"
              ry="18"
              transform="rotate(-18 80 60)"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeDasharray="1 0"
            />
            <ellipse
              cx="80"
              cy="60"
              rx="55"
              ry="14"
              transform="rotate(-18 80 60)"
              stroke="currentColor"
              strokeWidth="0.9"
            />
          </svg>

          {/* Tiny decorative stars */}
          <div className="absolute top-2 right-4 text-zinc-800 text-[10px]">✦</div>
          <div className="absolute bottom-2 left-6 text-zinc-800 text-[8px]">✦</div>
        </div>
      </div>
    </div>
  );
}
