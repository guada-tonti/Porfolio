'use client';

import { useId, useState, type CSSProperties } from 'react';

// Centerline reveal strokes follow Guada, then Tonti; the original artwork
// supplies the visible ink so its brush texture and outline stay intact.
const strokes = [
  ['M187 100 C120 35 8 191 18 270 S135 267 174 220 L161 285', 0, 420],
  ['M112 211 Q166 164 178 192', 420, 130],
  ['M246 128 C213 240 228 294 267 266 S335 177 335 98', 550, 310],
  ['M366 267 L442 61 L467 246', 860, 230],
  ['M362 225 L493 164', 1090, 120],
  ['M547 57 L524 237', 1210, 150],
  ['M520 50 C699 56 599 211 525 237', 1360, 270],
  ['M630 229 L721 19 L747 226', 1630, 230],
  ['M617 206 L762 138', 1860, 120],
  ['M66 386 L248 326', 1980, 150],
  ['M163 352 L142 556', 2130, 170],
  ['M283 377 C357 340 359 446 299 512 S192 497 283 377', 2300, 300],
  ['M373 523 L414 361 L476 488 L496 334', 2600, 270],
  ['M536 329 L662 293', 2870, 130],
  ['M593 310 L571 474', 3000, 160],
  ['M719 289 L686 472', 3160, 180],
] as const;

export function BrandLogo({ animateOnLoad = false }: { animateOnLoad?: boolean }) {
  const [isWriting, setIsWriting] = useState(animateOnLoad);
  const maskId = useId().replace(/:/g, '');
  return (
    <span
      className="site-header-logo brand-logo"
      data-writing={isWriting || undefined}
      onPointerMove={event => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="Guada Tonti" className="brand-logo-original" />
      {isWriting && (
        <svg className="brand-logo-writing" viewBox="0 0 780 578" aria-hidden="true" onAnimationEnd={event => { if (event.target === event.currentTarget) setIsWriting(false); }}>
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="780" height="578">
              {strokes.map(([d, delay, duration], index) => (
                <path key={index} d={d} pathLength="1" fill="none" stroke="white" strokeWidth="68" strokeLinecap="round" strokeLinejoin="round"
                  style={{ '--stroke-delay': `${delay / 2}ms`, '--stroke-duration': `${duration / 2}ms` } as CSSProperties} />
              ))}
            </mask>
          </defs>
          <image href="/logo.svg" width="780" height="578" mask={`url(#${maskId})`} />
        </svg>
      )}
      <span className="brand-logo-color" aria-hidden="true" />
    </span>
  );
}
