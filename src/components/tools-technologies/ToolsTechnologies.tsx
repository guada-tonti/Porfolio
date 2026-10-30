'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { dictionaries } from '@/data/content';
import type { Locale } from '@/data/types';
import './ToolsTechnologies.css';

const tools = [
  { id: 'codex', name: 'OpenAI Codex', width: 36 },
  { id: 'antigravity', name: 'Google Antigravity', width: 36 },
  { id: 'lovable', name: 'Lovable', width: 38 },
  { id: 'claude', name: 'Claude', width: 36 },
  { id: 'cursor', name: 'Cursor', width: 36 },
  { id: 'comfyui', name: 'ComfyUI', width: 36 },
  { id: 'google-flow', name: 'Google Flow', width: 72 },
  { id: 'github', name: 'GitHub', width: 36 },
  { id: 'posthog', name: 'PostHog', width: 42 },
  { id: 'figma', name: 'Figma', width: 28 },
  { id: 'figma-weave', name: 'Figma Weave', width: 41 },
  { id: 'illustrator', name: 'Adobe Illustrator', width: 36 },
  { id: 'photoshop', name: 'Adobe Photoshop', width: 36 },
  { id: 'firefly', name: 'Adobe Firefly', width: 36 },
  { id: 'rive', name: 'Rive', width: 72 },
  { id: 'html5', name: 'HTML', width: 36 },
  { id: 'css', name: 'CSS', width: 36 },
  { id: 'javascript', name: 'JavaScript', width: 36 },
];

export function ToolsTechnologies({ currentLocale }: { currentLocale: Locale }) {
  const viewport = useRef<HTMLDivElement>(null);
  const group = useRef<HTMLUListElement>(null);
  const [overflowing, setOverflowing] = useState(false);
  const [tooltip, setTooltip] = useState<{ name: string; left: number } | null>(null);
  const showTooltip = (event: ReactPointerEvent<HTMLLIElement>, name: string) => {
    const container = viewport.current;
    if (!container || container.dataset.dragging || event.pointerType === 'touch') return;
    const bounds = container.getBoundingClientRect();
    const logo = event.currentTarget.getBoundingClientRect();
    const padding = Math.min(90, bounds.width / 2);
    setTooltip({ name, left: Math.max(padding, Math.min(bounds.width - padding, logo.left + logo.width / 2 - bounds.left)) });
  };
  const title = dictionaries[currentLocale].toolsTechnologiesTitle;

  useEffect(() => {
    const container = viewport.current;
    const list = group.current;
    if (!container || !list) return;
    const update = () => {
      setOverflowing(list.scrollWidth > container.clientWidth);
      container.style.setProperty('--tools-duration', `${list.scrollWidth / 24}s`);
    };
    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(list);
    update();

    let drag: { pointerId: number; x: number; animation?: Animation } | null = null;
    const pointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0 || list.scrollWidth <= container.clientWidth) return;
      const animation = container.querySelector('.tools-marquee-track')?.getAnimations()[0];
      drag = { pointerId: event.pointerId, x: event.clientX, animation };
      container.dataset.dragging = 'true';
      setTooltip(null);
      animation?.pause();
      container.setPointerCapture(event.pointerId);
    };
    const pointerMove = (event: PointerEvent) => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      const delta = event.clientX - drag.x;
      drag.x = event.clientX;
      if (drag.animation) {
        // Match the base 24px/s speed and wrap within one complete logo group.
        const duration = list.scrollWidth / 24 * 1000;
        const time = Number(drag.animation.currentTime ?? 0) - delta / 24 * 1000;
        drag.animation.currentTime = ((time % duration) + duration) % duration;
      } else {
        // Reduced motion uses native scrolling, with no automatic playback.
        container.scrollLeft -= delta;
      }
    };
    const pointerUp = (event: PointerEvent) => {
      if (!drag || drag.pointerId !== event.pointerId) return;
      const animation = drag.animation;
      drag = null;
      delete container.dataset.dragging;
      if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
      if (event.pointerType !== 'touch' && container.matches(':hover')) animation?.pause();
      else animation?.play();
    };
    const pointerEnter = (event: PointerEvent) => {
      if (event.pointerType !== 'touch') container.querySelector('.tools-marquee-track')?.getAnimations()[0]?.pause();
    };
    const pointerLeave = () => {
      setTooltip(null);
      if (!drag && !container.matches(':focus-visible')) container.querySelector('.tools-marquee-track')?.getAnimations()[0]?.play();
    };
    container.addEventListener('pointerenter', pointerEnter);
    container.addEventListener('pointerdown', pointerDown);
    container.addEventListener('pointermove', pointerMove);
    container.addEventListener('pointerup', pointerUp);
    container.addEventListener('pointercancel', pointerUp);
    container.addEventListener('lostpointercapture', pointerUp);
    container.addEventListener('pointerleave', pointerLeave);
    return () => {
      observer.disconnect();
      container.removeEventListener('pointerenter', pointerEnter);
      container.removeEventListener('pointerdown', pointerDown);
      container.removeEventListener('pointermove', pointerMove);
      container.removeEventListener('pointerup', pointerUp);
      container.removeEventListener('pointercancel', pointerUp);
      container.removeEventListener('lostpointercapture', pointerUp);
      container.removeEventListener('pointerleave', pointerLeave);
    };
  }, []);

  return (
    <section className="w-full border-t border-zinc-200/80 bg-white" aria-labelledby="tools-technologies-title">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10">
        <h2 id="tools-technologies-title" className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-6">
          {title}
        </h2>
        <div className="tools-marquee-shell">
        <div ref={viewport} className={'tools-marquee-viewport'} data-moving={overflowing} tabIndex={0} role="region" aria-label={title}>
          <div className={'tools-marquee-track'}>
            {[false, true].map(duplicate => (
              <ul key={String(duplicate)} ref={duplicate ? undefined : group}
                className={`${'tools-marquee-group'} ${duplicate ? 'tools-marquee-duplicate' : ''}`} aria-hidden={duplicate || undefined}>
                {tools.map(tool => (
                  <li key={tool.id} className={'tools-marquee-logo'}
                    onPointerEnter={event => showTooltip(event, tool.name)}
                    onPointerMove={event => showTooltip(event, tool.name)}
                    onPointerLeave={() => setTooltip(null)}>
                    <Image src={`/images/tools/${tool.id}.svg`} alt={duplicate ? '' : tool.name}
                      width={tool.width} height={36} className={`h-9 object-contain ${(tool.id === 'google-flow' || tool.id === 'figma-weave') ? 'invert' : ''}`} loading="lazy" draggable={false} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        {tooltip && <span role="tooltip" className="tools-marquee-tooltip" style={{ left: tooltip.left }}>{tooltip.name}</span>}
        </div>
      </div>
    </section>
  );
}
