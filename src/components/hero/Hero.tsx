'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Globe, CalendarDays } from 'lucide-react';
import { Locale } from '@/data/types';
import { dictionaries } from '@/data/content';
import { HeroVisual } from './HeroVisual';

interface HeroProps {
  currentLocale: Locale;
}

export function Hero({ currentLocale }: HeroProps) {
  const dict = dictionaries[currentLocale];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-8 md:pt-14 pb-16 md:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography and CTAs */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
          {/* Small uppercase label */}
          <p className="text-[10px] md:text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-6 md:mb-8">
            {dict.hero.tagline}
          </p>

          {/* Main Headline: Bold Sans-Serif */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-zinc-950 mb-3">
            <span>{dict.hero.titleLine1}</span>
            <br />
            <span>{dict.hero.titleLine2}</span>
            <br />
            <span>{dict.hero.titleLine3}</span>
          </h1>

          {/* Second Headline: Smaller Italic Serif */}
          <p className="text-2xl sm:text-3xl md:text-4xl italic font-serif text-zinc-800 tracking-tight mb-6">
            {dict.hero.subtitleItalic}
          </p>

          {/* Supporting text */}
          <p className="text-sm md:text-base text-zinc-600 max-w-lg leading-relaxed mb-8">
            {dict.hero.description}
          </p>

          {/* Actions: Primary black pill button & secondary underlined text link */}
          <div className="flex flex-wrap items-center gap-6 mb-12">
            <Link
              href={`/${currentLocale}/work`}
              className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs md:text-sm font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all group"
            >
              <span>{dict.hero.exploreWork}</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href={`/${currentLocale}/resume`}
              className="text-xs md:text-sm font-medium text-zinc-900 underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-colors"
            >
              {dict.hero.viewResume}
            </Link>
          </div>

          {/* Matching location and availability metadata blocks. */}
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-10">
            <div className="flex shrink-0 items-start gap-2.5 text-xs text-zinc-700">
              <Globe className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              <div>
                <p className="text-zinc-600 leading-tight">{dict.hero.locationCity}</p>
                <p className="font-bold text-zinc-950 leading-tight">{dict.hero.locationStatus}</p>
              </div>
            </div>
            <div className="flex min-w-0 items-start gap-2.5 text-xs text-zinc-700">
              <CalendarDays className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              <div className="min-w-0">
                <p className="text-zinc-600 leading-tight">{currentLocale === 'en' ? 'Open to' : 'Disponible para'}</p>
                <p className="font-bold text-zinc-950 leading-tight">{currentLocale === 'es' ? 'Proyectos freelance y contratos' : 'Freelance projects & Contractor roles'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Layered Creative Collage */}
        <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
