'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export function FixedProjectNavigation({ children, label, className }: {
  children: ReactNode; label: string; className: string;
}) {
  const ref = useRef<HTMLElement>(null);

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
