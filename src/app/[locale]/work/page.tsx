import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from '@/data/types';
import { ProjectCatalog } from '@/components/selected-work/ProjectCatalog';

interface WorkPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Trabajos y Proyectos - Guada Tonti' : 'Work & Projects - Guada Tonti',
    description: isEs
      ? 'Proyectos de diseño de producto, diseño gráfico, tecnología creativa, música y experimentos.'
      : 'Selected product design case studies, visual design systems, creative tech, music, and experiments.',
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'es') {
    notFound();
  }

  const currentLocale = locale as Locale;
  return (
    <div className="w-full">
      {/* Featured projects and the filterable catalog. */}

      {/* 2. Interactive Projects Catalog with categories, types and search */}
      <ProjectCatalog currentLocale={currentLocale} />


    </div>
  );
}
