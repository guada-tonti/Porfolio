'use client';

import { useId, useRef, type CSSProperties, type PointerEvent } from 'react';
import Image from 'next/image';
import './HeroVisual.css';

// Broad diagonal passes reveal real bristle texture, then pencil gestures draw on top.
const strokes = [
  ['M160 340 L360 35', 180, 0],
  ['M70 570 L560 90', 165, 0.24],
  ['M310 610 L660 125', 190, 0.52],
  ['M510 560 L760 40', 170, 0.8],
  ['M610 760 L840 90', 210, 1.08],
  ['M920 130 L850 810', 220, 1.36],
  ['M140 820 L700 370', 220, 1.6],
  ['M260 880 L810 680', 190, 1.88],
  ['M480 880 L900 790', 190, 2.12],
  // Overlapping full-length brush passes fill every remaining gap through drawing.
  // Extend beyond the canvas so neither endpoint leaves an unrevealed corner.
  ...Array.from({ length: 8 }, (_, index) => [
    `M-300 ${-150 + index * 200} L1300 ${-502 + index * 200}`,
    310,
    0.7 + index * 0.22,
  ] as const),
] as const;
const collageLayers = [
  {
    "name": "saturn-sketch",
    "x": 110,
    "y": 198,
    "width": 168,
    "height": 194
  },
  {
    "name": "saturn-photo",
    "x": 288,
    "y": 173,
    "width": 456,
    "height": 315
  },
  {
    "name": "color-palette",
    "x": 753,
    "y": 199,
    "width": 145,
    "height": 273
  },
  {
    "name": "code-window",
    "x": 903,
    "y": 216,
    "width": 376,
    "height": 259
  },
  {
    "name": "landscape",
    "x": 166,
    "y": 487,
    "width": 365,
    "height": 257
  },
  {
    "name": "interface",
    "x": 537,
    "y": 500,
    "width": 208,
    "height": 292
  },
  {
    "name": "voxel-world",
    "x": 758,
    "y": 488,
    "width": 347,
    "height": 336
  },
  {
    "name": "wireframe",
    "x": 1111,
    "y": 452,
    "width": 166,
    "height": 340
  },
  {
    "name": "chair-sketch",
    "x": 161,
    "y": 755,
    "width": 297,
    "height": 316
  },
  {
    "name": "cat-astronaut",
    "x": 554,
    "y": 791,
    "width": 313,
    "height": 279
  },
  {
    "name": "neural-network",
    "x": 875,
    "y": 823,
    "width": 324,
    "height": 261
  },
  {
    "name": "landscape-nodes",
    "x": 18,
    "y": 419,
    "width": 174,
    "height": 293
  },
  {
    "name": "cat-nodes",
    "x": 422,
    "y": 836,
    "width": 166,
    "height": 253
  }
] as const;

const pencil = [
  'M46 154 C190 48 201 116 151 162 C105 198 198 108 215 145 C254 209 77 397 160 352 C221 340 250 312 280 302',
  'M421 162 C500 75 629 -4 562 54 L471 106 Q451 122 524 97 L497 125',
  'M70 483 C-43 615 70 603 168 543 L244 502',
  'M487 825 C629 756 764 847 900 764 C1016 681 1020 608 934 684',
];

export function HeroVisual() {
  const id = useId().replace(/:/g, '');
  const scene = useRef<HTMLDivElement>(null);
  const canAnimate = (event: PointerEvent) => event.pointerType === 'mouse'
    && window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;
  const moveScene = (event: PointerEvent<HTMLDivElement>) => {
    if (!canAnimate(event) || !scene.current) return;
    const bounds = scene.current.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    scene.current.style.setProperty('--parallax-x', `${x}`);
    scene.current.style.setProperty('--parallax-y', `${y}`);
  };
  const resetScene = () => {
    scene.current?.style.setProperty('--parallax-x', '0');
    scene.current?.style.setProperty('--parallax-y', '0');
  };
  const tiltLayer = (event: PointerEvent<HTMLDivElement>) => {
    if (!canAnimate(event)) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    event.currentTarget.style.setProperty('--tilt-x', `${-y * 11}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x * 11}deg`);
  };
  const resetLayer = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };
  return (
    <div className="hero-final-visual">
      <div className="hero-final-image" onPointerMove={moveScene} onPointerLeave={resetScene} onPointerCancel={resetScene}>
        <div ref={scene} className="hero-collage-scene" role="img" aria-label="Creative collage of visual design, code, wireframes and interactive worlds">
        <svg className="hero-paint" viewBox="0 0 1000 914" aria-hidden="true">
          <defs>
            {/* Matched from seven visible paint swatches in the original collage.
                sRGB matrix softens saturation and restores its lighter pastel palette. */}
            <filter id={`${id}-original-palette`} colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="0.776388 0.017065 0.193353 0 0.090295
                0.152001 0.667358 0.184449 0 0.076915
                0.123398 0.120376 0.805267 0 0.048006
                0 0 0 1 0" />
            </filter>
            <filter id={`${id}-dry-brush`} x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.025 0.075" numOctaves="2" seed="14" result="grain" />
              <feDisplacementMap in="SourceGraphic" in2="grain" scale="24" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <mask id={`${id}-paint`} maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="914">
              <g filter={`url(#${id}-dry-brush)`}>
                {strokes.map(([path, width, delay], index) => {
                  const [x1, y1, x2, y2] = path.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
                  const length = Math.hypot(x2 - x1, y2 - y1);
                  const dx = (x2 - x1) / length;
                  const dy = (y2 - y1) / length;
                  return (
                    <g key={index} fill="none" stroke="white" strokeLinecap="butt">
                      <path className="hero-paint-reveal" d={path} pathLength="1" strokeWidth={width * 0.78} style={{ animationDelay: `calc(var(--hero-paint-duration) * ${delay / 4.32})` }} />
                      {Array.from({ length: 23 }, (_, bristle) => {
                        // Stable uneven bristles extend the leading edge into tapered tips.
                        const across = (bristle / 22 - 0.5) * width;
                        const reach = ((bristle * 17 + index * 13) % 53) - 8;
                        const x = -dy * across + dx * reach;
                        const y = dx * across + dy * reach;
                        return <path key={bristle} className="hero-paint-reveal" d={path} pathLength="1" strokeWidth={4 + (bristle * 7 % 9)} transform={`translate(${x} ${y})`} style={{ animationDelay: `calc(var(--hero-paint-duration) * ${(delay + (bristle * 11 % 7) * 0.012) / 4.32})` }} />;
                      })}
                    </g>
                  );
                })}
              </g>
            </mask>
          </defs>
          <image href="/images/hero/paint-background-transparent-v2.png" width="1000" height="914" filter={`url(#${id}-original-palette)`} mask={`url(#${id}-paint)`} />
          <g fill="none" stroke="#302b28" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
            {pencil.map((path, index) => <path key={index} className="hero-pencil-reveal" d={path} pathLength="1" style={{ animationDelay: `calc(var(--hero-paint-duration) * ${(1.5 + index * 0.4) / 4.32})` }} />)}
          </g>
        </svg>
        <div className="hero-collage-foreground" aria-hidden="true">
          {collageLayers.map(layer => (
            <div key={layer.name} className="hero-collage-card"
              onPointerMove={tiltLayer} onPointerLeave={resetLayer} onPointerCancel={resetLayer}
              style={{ left: `${layer.x / 1312 * 100}%`, top: `${layer.y / 1199 * 100}%`, width: `${layer.width / 1312 * 100}%`, height: `${layer.height / 1199 * 100}%` } as CSSProperties}>
              <Image className="hero-collage-layer" src={`/images/hero/layers/${layer.name}.svg`}
                alt="" width={layer.width} height={layer.height} draggable={false} />
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}
