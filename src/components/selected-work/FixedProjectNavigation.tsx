'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export function FixedProjectNavigation({ children, label, className, previousHref, nextHref }: {
  children: ReactNode; label: string; className: string; previousHref: string; nextHref: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, video, audio, [contenteditable], [role="slider"], [role="spinbutton"], [role="textbox"], [role="combobox"], [role="listbox"], [role="menu"], [role="tablist"], [role="dialog"]'))) return;
      event.preventDefault();
      router.push(event.key === 'ArrowRight' ? nextHref : previousHref);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [router, previousHref, nextHref]);

  useEffect(() => {
    const nav = ref.current;
    const footer = document.querySelector('footer');
    if (!nav || !footer) return;
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const overlap = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
      nav.style.bottom = `${overlap}px`;
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    observer.observe(footer);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
    };
  }, []);

  return <nav ref={ref} aria-label={label} className={className}>{children}</nav>;
}
