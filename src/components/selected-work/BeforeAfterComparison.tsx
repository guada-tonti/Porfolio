'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/data/types';

export function BeforeAfterComparison({ locale, beforeSrc, afterSrc }: {
  locale: Locale; beforeSrc: string; afterSrc: string;
}) {
  const [position, setPosition] = useState(25);
  const animation = useRef<number | null>(null);
  const stopAnimation = () => {
    if (animation.current !== null) cancelAnimationFrame(animation.current);
    animation.current = null;
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;
    let start: number | null = null;
    const animate = (time: number) => {
      start ??= time;
      const elapsed = Math.max(time - start - 350, 0);
      const outwardDuration = 550;
      const returnDuration = 950;
      let offset: number;
      if (elapsed <= outwardDuration) {
        // Preserve the original outward movement.
        offset = Math.sin((Math.PI / 2) * (elapsed / outwardDuration)) ** 2;
      } else {
        const progress = Math.min((elapsed - outwardDuration) / returnDuration, 1);
        // A longer return with zero velocity and acceleration at the end.
        const eased = progress ** 3 * (progress * (progress * 6 - 15) + 10);
        offset = 1 - eased;
      }
      setPosition(25 + 5 * offset);
      animation.current = elapsed < outwardDuration + returnDuration ? requestAnimationFrame(animate) : null;
    };
    animation.current = requestAnimationFrame(animate);
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        stopAnimation();
        setPosition(25);
      }
    };
    reducedMotion.addEventListener('change', onMotionChange);
    return () => {
      stopAnimation();
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  }, []);
  const isEs = locale === 'es';
  return (
    <figure className="mb-10">
      <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 select-none">
        <div className="absolute inset-0 pointer-events-none bg-[#f1ecfa]">
          <div className="absolute overflow-hidden bg-white rounded-[clamp(4px,1.1vw,16px)]" style={{ left: '5%', right: '5%', top: '10.444%', bottom: '8.444%' }}>
            <Image src={afterSrc} alt={isEs ? 'Después: interfaz rediseñada de POAP Moments' : 'After: redesigned POAP Moments interface'} fill sizes="(min-width: 1024px) 836px, 90vw" className="object-cover object-top" />
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-[#e9e9eb]" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <div className="absolute overflow-hidden bg-white rounded-[clamp(4px,1.1vw,16px)]" style={{ left: '5%', right: '5%', top: '10.444%', bottom: '8.444%' }}>
            <Image src={beforeSrc} alt={isEs ? 'Antes: interfaz original de POAP Moments' : 'Before: original POAP Moments interface'} fill sizes="(min-width: 1024px) 836px, 90vw" className="object-cover object-top" />
          </div>
        </div>
        <span className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider pointer-events-none">{isEs ? 'Antes' : 'Before'}</span>
        <span className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider pointer-events-none">{isEs ? 'Después' : 'After'}</span>
        <input type="range" min="0" max="100" step="1" value={position}
          onPointerDown={stopAnimation}
          onKeyDown={stopAnimation}
          onChange={event => { stopAnimation(); setPosition(Number(event.target.value)); }}
          aria-label={isEs ? 'Comparar antes y después' : 'Compare before and after'}
          aria-valuetext={isEs ? `${Math.round(position)}% antes, ${Math.round(100 - position)}% después` : `${Math.round(position)}% before, ${Math.round(100 - position)}% after`}
          className="peer absolute inset-0 z-20 w-full h-full m-0 opacity-0 cursor-ew-resize touch-pan-y" />
        <div aria-hidden="true" className="absolute inset-y-0 w-px bg-white/95 shadow-sm pointer-events-none peer-focus-visible:ring-4 peer-focus-visible:ring-violet-500" style={{ left: `${position}%`, transform: 'translateX(-50%)' }}>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-10 rounded-[3px] bg-white text-zinc-500 shadow-sm">
            <span className="flex gap-[3px]"><span className="w-px h-3.5 bg-current" /><span className="w-px h-3.5 bg-current" /></span>
          </span>
        </div>
      </div>
    </figure>
  );
}
