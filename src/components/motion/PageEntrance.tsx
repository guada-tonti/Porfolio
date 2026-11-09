'use client';

import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export function PageEntrance({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    // The home animates its text and paint separately; its background stays visible.
    if (/^\/(en|es)\/?$/.test(pathname)) return;
    const element = root.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element || preference.matches) return;

    // Relative top preserves the viewport positioning of the fixed BACK link.
    const animation = element.animate([
      { opacity: 0, top: '8px' },
      { opacity: 1, top: '0px' },
    ], {
      duration: 700,
      easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      fill: 'backwards',
    });
    const cancel = () => animation.cancel();
    const onPreference = () => { if (preference.matches) cancel(); };
    preference.addEventListener('change', onPreference);
    element.addEventListener('focusin', cancel);
    window.addEventListener('beforeprint', cancel);
    return () => {
      cancel();
      preference.removeEventListener('change', onPreference);
      element.removeEventListener('focusin', cancel);
      window.removeEventListener('beforeprint', cancel);
    };
  }, [pathname]);

  return <div ref={root} className="relative w-full">{children}</div>;
}
