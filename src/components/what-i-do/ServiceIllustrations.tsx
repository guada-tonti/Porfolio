import React from 'react';

export function ProductDesignIllustration() {
  return (
    <div className="w-full h-44 relative flex items-center justify-center overflow-hidden bg-transparent select-none">
      {/* Background soft pink/peach artistic circle */}
      <div className="absolute w-24 h-24 rounded-full bg-rose-200/50 -top-2 left-8 blur-sm pointer-events-none" />
      {/* Teal brush splash */}
      <div className="absolute w-20 h-28 bg-cyan-200/40 rounded-3xl rotate-12 right-10 pointer-events-none" />

      {/* Modern UI Window frame */}
      <div className="relative z-10 w-44 bg-white/95 rounded-lg shadow-sm border border-zinc-200/80 p-2.5 flex flex-col gap-2 rotate-[-2deg]">
        <div className="flex items-center gap-1.5 border-b border-zinc-100 pb-1.5">
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <div className="ml-auto w-12 h-1.5 bg-zinc-100 rounded-full" />
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-9 h-9 rounded-md bg-amber-100/90 flex items-center justify-center text-amber-800 text-sm font-bold">
            📐
          </div>
          <div className="flex-1 space-y-1">
            <div className="w-full h-2 bg-zinc-200 rounded" />
            <div className="w-3/4 h-1.5 bg-zinc-100 rounded" />
          </div>
        </div>
        <div className="flex gap-1.5 mt-0.5">
          <div className="w-5 h-5 rounded-full bg-cyan-100 flex items-center justify-center text-[10px]">✨</div>
          <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center text-[10px]">🎨</div>
          <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[10px]">⚙️</div>
        </div>
      </div>

      {/* Floating cursor & hand-drawn doodle */}
      <div className="absolute z-20 bottom-4 right-8 bg-black text-white px-1.5 py-0.5 rounded text-[9px] font-mono shadow flex items-center gap-1">
        <span>cursor</span>
        <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3l7 18 3-7 7-3L3 3z" />
        </svg>
      </div>
    </div>
  );
}

export function DesignEngineerIllustration() {
  return (
    <div className="w-full h-44 relative flex items-center justify-center overflow-hidden bg-transparent select-none">
      {/* Blueprint grid subtle */}
      <div className="absolute w-28 h-28 border border-sky-300/40 rotate-12 rounded bg-sky-50/30 flex items-center justify-center">
        <div className="w-20 h-20 border border-sky-400/30 grid grid-cols-3 grid-rows-3" />
      </div>

      {/* Dark IDE terminal card */}
      <div className="relative z-10 w-44 bg-zinc-900 rounded-lg shadow-sm border border-zinc-800 p-2.5 font-mono text-[9px] text-zinc-300 rotate-[2deg]">
        <div className="flex items-center gap-1.5 pb-1.5 border-b border-zinc-800">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
          <span className="text-[7px] text-zinc-500 ml-1">App.tsx</span>
        </div>
        <div className="mt-1.5 space-y-1 font-mono text-[8px]">
          <p className="text-pink-400">const <span className="text-cyan-300">build</span> = () =&gt; &#123;</p>
          <p className="pl-2 text-zinc-400">return &lt;<span className="text-amber-300">Design</span> /&gt;;</p>
          <p className="text-pink-400">&#125;;</p>
        </div>
      </div>

      {/* Floating pill badge with code bracket */}
      <div className="absolute z-20 -bottom-1 left-12 bg-rose-500 text-white font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-sm -rotate-6">
        &lt;/&gt;
      </div>

      {/* Wireframe globe / sphere graphic */}
      <div className="absolute z-0 top-3 right-8 w-12 h-12 rounded-full border border-dashed border-zinc-400/60 flex items-center justify-center">
        <div className="w-full h-[0.5px] bg-zinc-400/50" />
      </div>
    </div>
  );
}

export function GraphicDesignIllustration() {
  return (
    <div className="w-full h-44 relative flex items-center justify-center overflow-hidden bg-transparent select-none">
      {/* Torn blue paper strip */}
      <div className="absolute w-16 h-28 bg-blue-500/70 -rotate-12 -left-2 top-2 rounded-sm shadow-sm" />

      {/* Big Editorial Typography card */}
      <div className="relative z-10 w-36 h-28 bg-stone-100 rounded border border-stone-300 shadow-sm flex items-center justify-center rotate-[-3deg] p-2">
        <span className="font-serif text-5xl font-bold text-zinc-900 tracking-tighter">
          Aa
        </span>
      </div>

      {/* Monochromatic halftone/eye accent sticker */}
      <div className="absolute z-20 bottom-3 left-10 w-16 h-10 bg-zinc-800 rounded border border-white flex items-center justify-center shadow-md overflow-hidden rotate-6">
        <span className="text-xl">👁️</span>
      </div>

      {/* Checkerboard graphic swatch */}
      <div className="absolute z-20 top-4 right-10 w-8 h-8 grid grid-cols-2 grid-rows-2 shadow border border-zinc-900 rotate-12">
        <div className="bg-black" />
        <div className="bg-white" />
        <div className="bg-white" />
        <div className="bg-black" />
      </div>
    </div>
  );
}

export function AICreativeIllustration() {
  return (
    <div className="w-full h-44 relative flex items-center justify-center overflow-hidden bg-transparent select-none">
      {/* Cosmic dream aesthetic with vivid sunset cloud palette */}
      <div className="w-44 h-28 rounded-xl bg-gradient-to-tr from-purple-900 via-indigo-600 to-amber-300 shadow-sm relative overflow-hidden flex items-end p-2 border border-purple-200/50">
        {/* Glowing sparkles */}
        <div className="absolute top-2 left-4 text-yellow-200 text-xs">✦</div>
        <div className="absolute top-4 right-6 text-pink-200 text-xs">✨</div>
        
        {/* Female profile silhouette / creative dream cloud */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-t from-pink-400/80 to-purple-800/60 blur-xs absolute -bottom-4 left-6" />
        
        {/* Floating AI Prompt Bar UI */}
        <div className="w-full bg-white/90 backdrop-blur-sm rounded-full py-1 px-2.5 flex items-center justify-between text-[8px] font-sans text-zinc-700 shadow-md relative z-10">
          <div className="flex items-center gap-1.5">
            <span className="text-purple-600 font-bold">✨</span>
            <span className="text-zinc-600 truncate">generate dreamscape...</span>
          </div>
          <div className="w-3 h-3 rounded-full bg-purple-600 flex items-center justify-center text-white text-[6px]">
            →
          </div>
        </div>
      </div>

      {/* Floating vector selection bounding box */}
      <div className="absolute top-4 left-10 w-14 h-14 border border-dashed border-pink-400 pointer-events-none rounded rotate-[-6deg]">
        <div className="w-1.5 h-1.5 bg-pink-500 absolute -top-1 -left-1" />
        <div className="w-1.5 h-1.5 bg-pink-500 absolute -bottom-1 -right-1" />
      </div>
    </div>
  );
}

export function InteractiveExperiencesIllustration() {
  return (
    <div className="w-full h-44 relative flex items-center justify-center overflow-hidden bg-transparent select-none">
      {/* Bauhaus / Memphis geometric architecture shapes */}
      <div className="relative flex items-end gap-1.5">
        {/* Terracotta arch */}
        <div className="w-12 h-20 rounded-t-full bg-[#d06b52] relative flex items-center justify-center">
          <div className="w-6 h-12 rounded-t-full bg-[#fbf8f3] self-end mb-0" />
        </div>

        {/* Forest green arch & pink sphere */}
        <div className="w-16 h-24 rounded-t-full bg-[#2a5549] relative flex flex-col items-center justify-center shadow-sm">
          {/* Sphere inside arch */}
          <div className="w-6 h-6 rounded-full bg-rose-300 shadow" />
          <div className="w-8 h-8 rounded-t-full bg-[#1b3a32] absolute bottom-0" />
        </div>

        {/* Cream / sand block with walking avatar figure */}
        <div className="w-10 h-16 bg-[#e4cfb7] relative flex flex-col items-center">
          {/* Little walking figure on top */}
          <div className="absolute -top-4 text-xs">🚶</div>
          <div className="w-6 h-6 bg-[#b89f82] mt-4" />
        </div>
      </div>
    </div>
  );
}

export function SideProjectsIllustration() {
  return (
    <div className="w-full h-44 relative flex items-center justify-center overflow-hidden bg-transparent select-none">
      {/* Cozy studio room scene */}
      <div className="w-44 h-28 rounded-xl bg-gradient-to-tr from-amber-100/80 via-rose-100/60 to-sky-100/80 border border-zinc-200/60 p-2 flex items-end justify-between relative shadow-sm">
        {/* Potted monstera plant */}
        <div className="flex flex-col items-center mb-1">
          <div className="text-xl leading-none">🪴</div>
          <div className="w-5 h-4 bg-amber-700/70 rounded-b-sm -mt-0.5" />
        </div>

        {/* Sleeping / playful cat next to laptop */}
        <div className="flex items-end gap-1.5 relative z-10">
          <div className="text-xl">🐱</div>
          {/* Laptop with smiley face */}
          <div className="w-10 h-7 bg-zinc-800 rounded-t-xs p-1 flex flex-col items-center justify-center text-amber-300 text-[8px] shadow">
            <span>:)</span>
            <div className="w-12 h-1 bg-zinc-400 rounded-full mt-1 -mb-1" />
          </div>
        </div>

        {/* Sunset window view in corner */}
        <div className="absolute top-2 right-2 w-10 h-8 rounded border border-zinc-300 bg-gradient-to-b from-sky-200 to-amber-200 overflow-hidden flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-amber-400/80 blur-[0.5px]" />
        </div>
      </div>
    </div>
  );
}
