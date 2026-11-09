'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import './PageBackground.css';

export function PageBackground({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const section = pathname.replace(/\/$/, '').split('/').slice(2);
  const enabled = section.length === 1 && ['resume', 'about', 'contact'].includes(section[0]);
  const fixed = enabled && ['resume', 'about', 'contact'].includes(section[0]);
  return <div className={enabled ? `section-home-background${fixed ? ' section-home-background-fixed' : ''}` : undefined}>{children}</div>;
}
