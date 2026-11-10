import { mobileProjectBackgrounds } from '@/data/mobileProjectBackgrounds';
import Image from 'next/image';
import type { ReactNode } from 'react';

export function ProjectHero({ children, backgroundSrc, projectId }: { children: ReactNode; backgroundSrc?: string; projectId?: string }) {
  const mobileBackground = mobileProjectBackgrounds[projectId ?? ''];

  return (
    <header className="relative isolate h-[325px] md:h-auto mb-8 md:pb-[216px] text-center">
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 left-1/2 -translate-x-1/2 w-screen -top-12 md:-top-16 bottom-0 overflow-hidden bg-white">
        {backgroundSrc && (
          <picture className={mobileBackground ? `absolute inset-x-0 -top-16 bottom-0 md:top-0 [clip-path:inset(0_0_50%_0)] md:[clip-path:none] ${projectId === 'dubai-storage' ? '-translate-y-3 md:translate-y-0' : ''}` : 'absolute inset-x-0 -top-16 bottom-0 md:top-0'}>
            {mobileBackground && <source media="(max-width: 767px)" srcSet={mobileBackground} />}
            <Image src={backgroundSrc} alt="" fill sizes="100vw" loading="eager" unoptimized={backgroundSrc.endsWith('.webp')} className={mobileBackground ? 'object-fill md:object-cover object-center' : 'object-cover object-center'} />
          </picture>
        )}
        {backgroundSrc && mobileBackground && (
          <div className="absolute inset-x-0 -top-16 bottom-0 -translate-y-4 [clip-path:inset(50%_0_0_0)] md:hidden">
            <Image src={mobileBackground} alt="" fill sizes="100vw" loading="eager" unoptimized className="object-fill object-center" />
          </div>
        )}
        <span className="absolute inset-0 z-10 border-y border-zinc-200/80" />
      </div>
      <div className="absolute inset-x-0 -top-12 bottom-[68px] flex flex-col justify-center md:static md:block">
        {children}
      </div>
    </header>
  );
}

export function ProjectHeroVisual({ children }: { children: ReactNode }) {
  return <div className="relative z-10 -mt-[100px] md:-mt-[176px]">{children}</div>;
}
