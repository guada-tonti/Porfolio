import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/data/types';
import { dictionaries } from '@/data/content';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Sobre Guada Tonti - Trayectoria y Filosofía' : 'About Guada Tonti - Practice & Background',
    description: isEs
      ? 'Product Designer, Visual Designer y Creative Technologist con más de 12 años de experiencia profesional en diseño.'
      : 'Product Designer, Visual Designer, and Creative Technologist with 12+ years of professional design experience.',
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
    <article className="w-full max-w-4xl mx-auto px-6 md:px-12 pt-6 pb-12 md:py-20">
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
      </div>

      <div className="leading-relaxed text-zinc-700">
        <div className="space-y-6 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
          <p>{dict.aboutPage.bioParagraph1}</p>
          <p>{dict.aboutPage.bioParagraph2}</p>
          <p>{dict.aboutPage.bioParagraph3}</p>

          <section className="pt-4" aria-labelledby="working-style-title">
            <h2 id="working-style-title" className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-6">
              {dict.aboutPage.workingStyleTitle}
            </h2>
            <div className="space-y-6">
              {dict.aboutPage.workingStyle.map(item => (
                <div key={item.title}>
                  <h3 className="font-semibold text-zinc-950 mb-1">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="py-6 border-y border-zinc-200">
            <p className="text-xl md:text-2xl text-zinc-600 font-serif italic">
              {dict.aboutPage.closingQuote}
            </p>
          </div>

          {dict.aboutPage.moreSections.map((section, index) => (
            <section key={section.title} className="pt-4" aria-labelledby={`about-extra-${index}`}>
              <h2 id={`about-extra-${index}`} className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-6">
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>


      </div>
      {/* Availability calendar temporarily hidden. Restore the ProjectAvailability import and render here when needed. */}
    </article>
  );
}
