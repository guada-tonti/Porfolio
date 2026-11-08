'use client';

import React from 'react';
import behanceCovers from '@/data/behanceCovers.json';
import importedCovers from '@/data/behanceImportedCovers.json';
import Image from 'next/image';
import { SaturnOVThumbnail, GuitarraVisualThumbnail } from './ProjectThumbnails';

export function CatalogThumb({ id, title }: { id: string; title: string }) {
  const cover = ({ ...behanceCovers, ...importedCovers } as Record<string, { src: string; width: number; height: number }>)[id];
  if (cover) return <Image src={cover.src} alt={title} width={cover.width} height={cover.height} sizes="(min-width: 1280px) 373px, (min-width: 768px) 50vw, 100vw" className="w-full h-full object-cover" />;
  switch (id) {
    case 'gig-flyers':
      return <Image src="/images/projects/gig-flyers/quinto-sueno.png" alt={title} width={1651} height={2184} sizes="(min-width: 1280px) 373px, (min-width: 768px) 50vw, 100vw" className="w-full h-full object-contain bg-[#26112e]" />;
    case 'poap-moments-redesign':
      return <Image src="/images/projects/poap-moments-portada.png" alt={title} width={1404} height={881} sizes="(min-width: 1280px) 373px, (min-width: 768px) 50vw, 100vw" className="w-full h-full object-cover bg-white" />;
    case 'philatelist':
      return (
        <Image
          src="/images/projects/philatelist-portada.png"
          alt={title}
          width={2996}
          height={1638}
          sizes="(min-width: 1280px) 373px, (min-width: 768px) 50vw, 100vw"
          className="w-full h-full object-contain bg-[#f5f1e8]"
        />
      );
    case 'remera-chenziqiang-argentina':
      return (
        <Image
          src="/images/projects/remera-chenziqiang-argentina-portada.png"
          alt={title}
          fill
          sizes="(min-width: 1280px) 373px, (min-width: 1024px) calc((100vw - 160px) / 3), (min-width: 768px) calc((100vw - 128px) / 2), calc(100vw - 48px)"
          className="object-cover bg-[#303030]"
        />
      );
    case 'guitarravisual':
      return <GuitarraVisualThumbnail />;

    case 'bigotes':
      return (
        <div className="w-full h-full bg-[#f4effc] relative p-3.5 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex items-center gap-1.5">
            <span className="font-serif font-black text-lg text-zinc-900 tracking-tight">Bigotes</span>
            <span className="text-sm">🐾</span>
          </div>
          <div className="flex items-center justify-between gap-3 mt-1">
            {/* Cute pets portraits */}
            <div className="flex -space-x-2">
              <div className="w-9 h-9 rounded-full bg-amber-100 border-2 border-white shadow-sm flex items-center justify-center text-base">🐶</div>
              <div className="w-9 h-9 rounded-full bg-purple-200 border-2 border-white shadow-sm flex items-center justify-center text-base">🐱</div>
              <div className="w-9 h-9 rounded-full bg-zinc-700 border-2 border-white shadow-sm flex items-center justify-center text-base">🐕‍🦺</div>
            </div>
            {/* Mobile App Frame */}
            <div className="w-24 bg-white rounded-t-lg shadow-md border border-purple-100 p-1.5 text-[7px] font-sans">
              <div className="w-6 h-1 bg-zinc-200 rounded-full mx-auto mb-1" />
              <div className="flex items-center justify-between border-b border-zinc-100 pb-0.5 mb-1">
                <span className="font-bold text-purple-900">Registros</span>
                <span className="text-zinc-400">Ficha</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <span className="text-purple-600">⚖️</span>
                  <span>4.2 kg</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-amber-500">🥣</span>
                  <span>Alimentación</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'health-clarity':
      return (
        <Image
          src="/images/projects/health-clarity-portada.png"
          alt={title}
          width={3016}
          height={1640}
          sizes="(min-width: 1280px) 373px, (min-width: 768px) 50vw, 100vw"
          className="w-full h-full object-contain bg-[#faf9f7]"
        />
      );

    case 'family-photos':
      return (
        <div className="w-full h-full bg-[#f8f6f0] relative p-3.5 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex items-center gap-1.5">
            <span className="font-serif italic font-bold text-lg text-zinc-900">Family Photos</span>
            <span className="text-xs">🌿</span>
          </div>
          {/* Collage of sepia photos */}
          <div className="relative flex items-center justify-center gap-2 mt-2">
            <div className="w-14 h-16 bg-[#eae1d5] rounded shadow-xs border border-amber-950/10 p-1 transform -rotate-3 flex flex-col items-center justify-center">
              <div className="text-sm">👥</div>
              <span className="text-[7px] text-zinc-600 font-mono mt-0.5">1950</span>
            </div>
            <div className="w-16 h-18 bg-white rounded shadow-sm border border-amber-950/15 p-1 transform rotate-2 flex flex-col items-center justify-center">
              <div className="text-base">👩‍🦳</div>
              <span className="text-[7px] font-bold text-zinc-800">Ana</span>
              <span className="text-[6px] text-zinc-400">1950 - 2020</span>
            </div>
          </div>
        </div>
      );

    case 'saturno-v':
      return <SaturnOVThumbnail />;

    case 'arcadeta':
      return (
        <div className="w-full h-full bg-[#ffd3e2] relative p-3.5 flex flex-col justify-between overflow-hidden select-none">
          <div className="flex items-center gap-1.5">
            <span className="font-mono font-black text-xl text-zinc-950 tracking-tighter transform -rotate-2">
              ARCADETA
            </span>
            <span className="text-amber-500 font-bold text-sm">⚡</span>
          </div>
          {/* Arcade Cabinet Graphic */}
          <div className="flex justify-end pr-3">
            <div className="w-24 h-24 bg-gradient-to-b from-purple-800 to-pink-700 rounded-t-xl border-2 border-zinc-900 shadow-md p-1.5 flex flex-col items-center justify-between">
              <div className="w-full bg-zinc-950 rounded py-0.5 text-center text-[7px] text-yellow-300 font-mono font-bold">
                JUEGOS
              </div>
              <div className="w-full h-9 bg-zinc-950 rounded flex items-center justify-center text-emerald-400 text-xs">
                👾
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-xs" />
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-xs" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'goal-scream-challenge':
      return <Image src="/images/projects/grito-de-gol-portada.png" alt={title} width={3014} height={1638} sizes="(min-width: 1280px) 373px, (min-width: 768px) 50vw, 100vw" className="w-full h-full object-contain bg-[#020915]" />;

    case 'ecosistema-colaborativo':
      return (
        <div className="w-full h-full bg-[#d8effb] relative p-3.5 flex flex-col justify-between overflow-hidden select-none">
          {/* Sun & Floating island 3D art */}
          <div className="flex justify-between items-start">
            <span className="w-6 h-6 rounded-full bg-amber-400 shadow-sm" />
            <span className="text-xs">☁️</span>
          </div>
          {/* Floating magical island */}
          <div className="relative w-full flex flex-col items-center">
            <div className="flex gap-1 text-base relative z-10 -mb-1">
              <span>🌳</span>
              <span>🌊</span>
              <span>🍄</span>
            </div>
            <div className="w-32 h-6 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-xl shadow border border-amber-950/40" />
          </div>
        </div>
      );

    case 'flete-express':
      return (
        <Image
          src="/images/projects/flete-express-portada-puzzle.png"
          alt={title}
          width={1498}
          height={1050}
          sizes="(min-width: 1280px) 373px, (min-width: 768px) 50vw, 100vw"
          className="w-full h-full object-contain bg-[#24292f]"
        />
      );

    default:
      return (
        <div className="w-full h-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-700">
          {title}
        </div>
      );
  }
}
