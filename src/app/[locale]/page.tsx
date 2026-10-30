import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/data/types';
import { dictionaries } from '@/data/content';
import { Hero } from '@/components/hero/Hero';
import { SelectedWork } from '@/components/selected-work/SelectedWork';
import { WhatIDo } from '@/components/what-i-do/WhatIDo';
import { Testimonials } from '@/components/testimonials/Testimonials';
import { ToolsTechnologies } from '@/components/tools-technologies/ToolsTechnologies';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';

  return {
    title: isEs
      ? 'Guada Tonti — Product Designer & Creative Technologist'
      : 'Guada Tonti — Product Designer & Creative Technologist',
    description: isEs
      ? '12 años diseñando por profesión. Y toda una vida creando. Productos digitales, diseño visual, experiencias interactivas, música, juegos y lo que se nos ocurra.'
      : '12 years designing professionally. And a lifetime of creating. Digital products, visual design, and interactive experiences.',
    openGraph: {
      title: 'Guada Tonti — Product Designer & Creative Technologist',
      description: isEs
        ? '12 años diseñando por profesión. Y toda una vida creando.'
        : '12 years designing professionally. And a lifetime of creating.',
      locale: isEs ? 'es_AR' : 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        es: '/es',
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  if (locale !== 'en' && locale !== 'es') {
    notFound();
  }

  const currentLocale = locale as Locale;

  return (
    <div className="w-full">
      <Hero currentLocale={currentLocale} />
      <SelectedWork currentLocale={currentLocale} />
      <WhatIDo currentLocale={currentLocale} />
      <Testimonials currentLocale={currentLocale} />
      <ToolsTechnologies currentLocale={currentLocale} />
    </div>
  );
}
