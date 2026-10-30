import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Music, Sparkles, Box, Palette } from 'lucide-react';
import { Locale } from '@/data/types';
import { dictionaries } from '@/data/content';
import { ProjectCatalog } from '@/components/selected-work/ProjectCatalog';

interface WorkPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Trabajos y Proyectos — Guada Tonti' : 'Work & Projects — Guada Tonti',
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
  const dict = dictionaries[currentLocale];
  const isEs = currentLocale === 'es';

  const creativeItems = [
    {
      title: isEs ? 'Composiciones & Síntesis Modular' : 'Modular Synthesis & Soundscapes',
      category: 'Music',
      icon: Music,
      description: isEs
        ? 'Exploraciones sonoras ambientales utilizando sintetizadores analógicos, pedales de efectos y guitarras eléctricas.'
        : 'Ambient sonic studies exploring voltage-controlled analog synthesizers, tape echo pedals, and electric guitars.',
      tag: 'Audio / Hardware',
    },
    {
      title: isEs ? 'Ilustraciones Editoriales & Serigrafía' : 'Editorial Illustrations & Screenprints',
      category: 'Visual Art',
      icon: Palette,
      description: isEs
        ? 'Impresiones manuales en serigrafía de edición limitada, grabados botánicos y pósteres de conciertos.'
        : 'Limited-edition screen prints, botanical linocuts, and typographic music gig posters.',
      tag: 'Print & Craft',
    },
    {
      title: isEs ? 'Pedal de Efectos Custom para Guitarra' : 'Custom DIY Guitar Fuzz Box',
      category: 'Physical Experiments',
      icon: Box,
      description: isEs
        ? 'Diseño de PCB, soldadura de transistores de germanio y caja de aluminio grabada con ácido.'
        : 'Point-to-point soldering vintage germanium transistors into a hand-etched aluminum stompbox enclosure.',
      tag: 'Electronics',
    },
    {
      title: isEs ? 'Shaders Generativos GLSL' : 'Generative GLSL Shader Experiments',
      category: 'Creative Tech',
      icon: Sparkles,
      description: isEs
        ? 'Estudios matemáticos de distorsión cromática, fluidos en tiempo real y reacciones de difusión.'
        : 'Mathematical studies of chromatic dispersion, real-time wave functions, and reaction-diffusion algorithms.',
      tag: 'Code & Math',
    },
  ];

  return (
    <div className="w-full">
      {/* Featured projects are temporarily hidden here; the home keeps them. */}

      {/* 2. Interactive Projects Catalog with categories, types and search */}
      <ProjectCatalog currentLocale={currentLocale} />

      {/* 3. Other Things Section (Creative Explorations, Music, Objects, Experiments) */}
      <section className="w-full border-t border-zinc-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-14 pb-20 md:pb-28">
          <div className="border-b border-zinc-200 pb-8 mb-12">
            <p className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-3">
              {isEs ? 'EXPLORACIONES CREATIVAS & OTRAS COSAS' : 'CREATIVE EXPLORATIONS & OTHER THINGS'}
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-zinc-950 tracking-tight mb-3">
              {dict.otherThingsPage.title}
            </h2>
            <p className="text-lg md:text-xl text-zinc-600 font-serif italic max-w-2xl">
              {dict.otherThingsPage.subtitle}
            </p>
          </div>

          {/* Grid of Creative Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {creativeItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-sm bg-zinc-50 border border-zinc-200/80 flex flex-col justify-between hover:border-zinc-400 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 rounded bg-white border border-zinc-200 flex items-center justify-center text-zinc-800 shadow-xs">
                        <Icon className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase px-2 py-0.5 bg-zinc-200/60 rounded">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-zinc-950 mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-zinc-200/60 flex items-center text-xs font-mono text-zinc-400">
                    <span>Guada Tonti Archive · {item.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
