'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import './PageBackground.css';

export function PageBackground({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const section = pathname.replace(/\/$/, '').split('/').slice(2);
  const enabled = section.length === 1 && ['resume', 'about', 'contact'].includes(section[0]);
  return (
    <div className={enabled ? 'section-home-background' : undefined}>
      {enabled && (
        <link rel="preload" as="image" href="/images/hero/section-background-v1.webp"
          type="image/webp" media="(min-width: 1024px)" />
      )}
      {children}
    </div>
  );
}
