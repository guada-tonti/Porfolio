import Image from 'next/image';
import type { ReactNode } from 'react';

export function ProjectHero({ children, backgroundSrc }: { children: ReactNode; backgroundSrc?: string }) {
  return (
    <header className="relative isolate mb-8 pb-[196px] md:pb-[216px] text-center">
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 left-1/2 -translate-x-1/2 w-screen -top-28 md:-top-16 bottom-0 border-y border-zinc-200/80 bg-white">
        {backgroundSrc && <Image src={backgroundSrc} alt="" fill sizes="100vw" preload className="object-cover object-center" />}
      </div>
      {children}
    </header>
  );
}

export function ProjectHeroVisual({ children }: { children: ReactNode }) {
  return <div className="relative z-10 -mt-[100px] md:-mt-[176px]">{children}</div>;
}
