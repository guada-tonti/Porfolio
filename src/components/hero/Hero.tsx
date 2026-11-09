'use client';

import React from 'react';
import './Hero.css';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Locale } from '@/data/types';
import { dictionaries } from '@/data/content';
import { HeroVisual } from './HeroVisual';
import { ProfessionalInfo } from '@/components/professional-info/ProfessionalInfo';

interface HeroProps {
  currentLocale: Locale;
}

export function Hero({ currentLocale }: HeroProps) {
  const dict = dictionaries[currentLocale];

  return (
    <section className="relative isolate w-full max-w-7xl mx-auto px-6 md:px-12 pt-6 md:pt-8 pb-16 md:pb-20">
      {/* Home background temporarily hidden; assets remain in public/images/hero/. */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography and CTAs */}
        <div className="hero-copy lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
          {/* Small uppercase label */}
          <p className="text-[10px] md:text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-4 md:mb-8">
            {dict.hero.tagline.split(' · ')[0]}
            <span className="hidden md:inline"> · </span>
            <span className="block md:inline">AI-FLUENT</span>
          </p>

          {/* Main Headline: Bold Sans-Serif */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-zinc-950 mb-2 md:mb-3">
            <span>{dict.hero.titleLine1}</span>
            <br />
            <span>{dict.hero.titleLine2}</span>
            <br />
            <span>{dict.hero.titleLine3}</span>
          </h1>

          {/* Second Headline: Smaller Italic Serif */}
          <p className="text-2xl sm:text-3xl md:text-4xl italic font-serif text-zinc-800 tracking-tight mb-4 md:mb-6">
            {dict.hero.subtitleItalic}
          </p>

          {/* Supporting text */}
          <p className="text-sm md:text-base text-zinc-600 max-w-lg leading-relaxed mb-6 md:mb-8">
            {dict.hero.description}
          </p>

          {/* Actions: Primary black pill button & secondary underlined text link */}
          <div className="flex flex-wrap items-center gap-6 mb-12 md:mb-0 md:pb-16">
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

          <ProfessionalInfo currentLocale={currentLocale} />
        </div>

        {/* Right Column: Layered Creative Collage */}
        <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
