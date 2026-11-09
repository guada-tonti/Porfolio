import React from 'react';
import { PageBackground } from '@/components/page-background/PageBackground';
import { PageEntrance } from '@/components/motion/PageEntrance';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { Locale } from '@/data/types';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (locale !== 'en' && locale !== 'es') {
    notFound();
  }

  const currentLocale = locale as Locale;

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 selection:bg-zinc-200">
      <Header currentLocale={currentLocale} />
      <main className="flex-1 w-full"><PageBackground><PageEntrance>{children}</PageEntrance></PageBackground></main>
      <Footer currentLocale={currentLocale} />
    </div>
  );
}
