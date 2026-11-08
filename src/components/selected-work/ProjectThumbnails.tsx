import React from 'react';
import Image from 'next/image';

export function SaturnOVThumbnail() {
  return (
    <Image
      src="/images/projects/saturno-v-portada.png"
      alt="Saturn V - Apollo 11"
      width={2992}
      height={1632}
      sizes="(min-width: 1024px) 928px, 100vw"
      className="w-full h-full object-contain bg-[#050608]"
    />
  );
}

export function GuitarraVisualThumbnail() {
  return (
    <Image
      src="/images/projects/guitarravisual-portada-blues.png"
      alt="GuitarraVisual - Improvisar Blues"
      width={3014}
      height={1634}
      sizes="(min-width: 1024px) 928px, 100vw"
      className="w-full h-full object-contain bg-[#0b1014]"
    />
  );
}

export function BigotesThumbnail() {
  return (
    <div className="w-full h-full bg-[#f4effc] relative p-4 flex flex-col justify-between overflow-hidden">
      {/* Background pastel decorative blobs */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-purple-200/50 rounded-full blur-xl" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-blue-200/40 rounded-full blur-xl" />

      {/* Pet Avatars Row */}
      <div className="flex items-center justify-center gap-4 relative z-10 pt-1">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full ring-2 ring-purple-400 bg-white shadow-sm flex items-center justify-center text-xl overflow-hidden">
            🐱
          </div>
          <span className="text-[10px] font-medium text-zinc-700 mt-1">Muza</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full ring-2 ring-purple-300 bg-white shadow-sm flex items-center justify-center text-xl overflow-hidden">
            🐈‍⬛
          </div>
          <span className="text-[10px] font-medium text-zinc-700 mt-1">Oli</span>
        </div>
        <div className="w-7 h-7 rounded-full bg-white/80 border border-purple-200 flex items-center justify-center text-purple-600 font-bold text-xs shadow-sm mb-4">
          +
        </div>
      </div>

      {/* Floating UI Card */}
      <div className="relative z-10 bg-white/95 rounded-xl p-3 shadow-sm border border-purple-100 flex flex-col gap-2">
        <div className="flex items-center justify-between border-b border-zinc-100 pb-1.5 text-[10px]">
          <span className="font-semibold text-purple-900">Registros</span>
          <span className="text-zinc-400">Ficha</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-purple-50 flex items-center justify-center text-purple-700 text-xs">
              ⚖️
            </div>
            <div>
              <p className="text-[9px] text-zinc-500 uppercase leading-none">Peso</p>
              <p className="text-xs font-bold text-zinc-800">5.2 kg</p>
            </div>
          </div>
          <span className="text-[9px] text-zinc-400">Hoy 10:24</span>
        </div>
      </div>
    </div>
  );
}

export function FamilyPhotosThumbnail() {
  return (
    <div className="w-full h-full bg-[#f8f6f0] p-3 flex flex-col relative overflow-hidden font-serif">
      {/* Background vintage texture subtle */}
      <div className="text-[9px] font-sans text-zinc-400 tracking-wider uppercase mb-1">Archivo Familiar · 1952-2024</div>
      
      {/* Family Tree Nodes diagram */}
      <div className="flex-1 relative flex items-center justify-between px-2">
        {/* Branch lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <line x1="25%" y1="50%" x2="50%" y2="30%" stroke="#d1c7bd" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="25%" y1="50%" x2="50%" y2="70%" stroke="#d1c7bd" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50%" y1="30%" x2="80%" y2="25%" stroke="#d1c7bd" strokeWidth="1.5" />
          <line x1="50%" y1="70%" x2="80%" y2="75%" stroke="#d1c7bd" strokeWidth="1.5" />
        </svg>

        {/* Sepia photo node 1 */}
        <div className="relative z-10 bg-white p-1 shadow-sm border border-amber-900/10 rotate-[-2deg]">
          <div className="w-12 h-14 bg-[#e8dfd5] flex items-center justify-center text-zinc-600 text-xs grayscale contrast-125">
            👥
          </div>
          <p className="text-[7px] text-zinc-600 font-sans text-center mt-0.5">1952</p>
        </div>

        {/* Sepia photo node 2 */}
        <div className="relative z-10 bg-white p-1 shadow-sm border border-amber-900/10 rotate-[2deg]">
          <div className="w-14 h-16 bg-[#e0d6cb] flex items-center justify-center text-zinc-600 text-xs grayscale contrast-125">
            📷
          </div>
          <p className="text-[7px] text-zinc-600 font-sans text-center mt-0.5">Familia Tonti</p>
        </div>

        {/* Sepia photo node 3 */}
        <div className="relative z-10 bg-white p-1 shadow-sm border border-amber-900/10 rotate-[-1deg]">
          <div className="w-12 h-12 bg-[#ebe4db] flex items-center justify-center text-zinc-600 text-xs grayscale contrast-125">
            🌳
          </div>
          <p className="text-[7px] text-zinc-600 font-sans text-center mt-0.5">Árbol 3G</p>
        </div>
      </div>
    </div>
  );
}
