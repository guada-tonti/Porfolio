import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/data/types';
import { dictionaries } from '@/data/content';
import { ProjectAvailability } from '@/components/availability/ProjectAvailability';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Sobre Guada Tonti — Trayectoria y Filosofía' : 'About Guada Tonti — Practice & Background',
    description: isEs
      ? 'Product Designer, Visual Designer y Creative Technologist con 15 años de experiencia diseñando productos digitales.'
      : 'Product Designer, Visual Designer, and Creative Technologist with 15 years crafting digital products.',
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'es') {
    notFound();
  }

  const currentLocale = locale as Locale;
  const dict = dictionaries[currentLocale];

  return (
    <article className="w-full max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
      <div className="border-b border-zinc-200 pb-8 mb-10">
        <p className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-3">
          {currentLocale === 'es' ? 'PERFIL & OFICIO' : 'PROFILE & CRAFT'}
        </p>
        <h1 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight mb-4">
          {dict.aboutPage.title}
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 font-serif italic">
          {dict.aboutPage.subtitle}
        </p>
        <p className="mt-5 text-sm leading-relaxed text-zinc-500">
          <span className="font-semibold text-zinc-700">{dict.aboutPage.openToLabel}</span>{' '}
          {dict.aboutPage.openToOptions}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 leading-relaxed text-zinc-700">
        <div className="md:col-span-8 space-y-6 text-base">
          <p>{dict.aboutPage.bioParagraph1}</p>
          <p>{dict.aboutPage.bioParagraph2}</p>
          <p>{dict.aboutPage.bioParagraph3}</p>

          <div className="pt-6 border-t border-zinc-200">
            <h2 className="text-xl font-bold text-zinc-950 mb-3">
              {dict.aboutPage.experienceHeadline}
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              {currentLocale === 'es'
                ? 'El diseño no es únicamente cómo se ve, sino cómo opera, escala y se siente en manos de personas reales. Cada proyecto combina rigor en sistemas de diseño con sensibilidad artesanal.'
                : 'Design is not merely how it looks, but how it scales, operates, and resonates in the hands of real people. Every project balances robust design systems with artisanal craft.'}
            </p>
          </div>
        </div>

        <div className="md:col-span-4 space-y-6 border-t md:border-t-0 md:border-l border-zinc-200 md:pl-8 text-xs font-mono text-zinc-600">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-zinc-900 mb-2">Location</h3>
            <p>Buenos Aires, Argentina</p>
            <p className="text-zinc-400">UTC-3 / Worldwide Remote</p>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider text-zinc-900 mb-2">Focus Areas</h3>
            <ul className="space-y-1 text-zinc-600">
              <li>• Product Strategy &amp; UX</li>
              <li>• Design Systems (Figma + Code)</li>
              <li>• WebGL &amp; Creative Tech</li>
              <li>• AI Prototyping &amp; Workflows</li>
            </ul>
          </div>
        </div>
      </div>
      <ProjectAvailability currentLocale={currentLocale} variant="rows" />
    </article>
  );
}
