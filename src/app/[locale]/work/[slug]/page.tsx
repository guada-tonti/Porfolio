import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Locale } from '@/data/types';
import { projects, dictionaries } from '@/data/content';
import { allCatalogProjects } from '@/data/catalog';
import { CatalogProjectDetail } from '@/components/selected-work/CatalogProjectDetail';
import {
  SaturnOVThumbnail,
  GuitarraVisualThumbnail,
  BigotesThumbnail,
  FamilyPhotosThumbnail,
} from '@/components/selected-work/ProjectThumbnails';

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  ['en', 'es'].forEach((locale) => {
    const detailSlugs = new Set([...projects.map(project => project.slug), ...allCatalogProjects.filter(project => project.overview).map(project => project.slug!)]);
    detailSlugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug) ?? allCatalogProjects.find(project => project.slug === slug && project.overview);
  if (!project) return { title: 'Project Not Found' };

  const currentLocale = locale === 'es' ? 'es' : 'en';

  return {
    title: `${project.title} — Guada Tonti`,
    description: 'heroDescription' in project && project.heroDescription
      ? project.heroDescription[currentLocale]
      : project.overview?.[currentLocale],
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;

  if (locale !== 'en' && locale !== 'es') {
    notFound();
  }

  const currentLocale = locale as Locale;
  const dict = dictionaries[currentLocale];

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) {
    const catalogProject = allCatalogProjects.find(project => project.slug === slug && project.overview);
    if (!catalogProject) notFound();
    return <CatalogProjectDetail project={catalogProject} currentLocale={currentLocale} />;
  }

  const project = projects[projectIndex];
  const prevProject =
    projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];

  const renderHeroVisual = (slugName: string) => {
    switch (slugName) {
      case 'saturno-v':
        return <SaturnOVThumbnail />;
      case 'guitarravisual':
        return <GuitarraVisualThumbnail />;
      case 'bigotes':
        return <BigotesThumbnail />;
      case 'family-photos':
        return <FamilyPhotosThumbnail />;
      default:
        return (
          <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-400 font-mono text-sm">
            {slugName} Hero Visual
          </div>
        );
    }
  };

  return (
    <article className="w-full max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-16">
      {/* Back link */}
      <Link
        href={`/${currentLocale}#selected-work`}
        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-black mb-10 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>{dict.projectDetail.backToWork}</span>
      </Link>

      {/* Header Info */}
      <div className="mb-8">
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">
          <span>{project.category[currentLocale]}</span>
          <span>·</span>
          <span>{project.year}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight mb-4">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 max-w-2xl font-normal leading-relaxed">
          {project.subtitle[currentLocale]}
        </p>
      </div>

      {/* Hero Visual Container */}
      <div className="w-full aspect-[16/9] rounded-sm overflow-hidden bg-zinc-100 border border-zinc-200/80 mb-14 shadow-sm">
        {renderHeroVisual(project.slug)}
      </div>

      {project.slug === 'guitarravisual' && (
        <figure className="mb-14">
          <Image
            src="/images/projects/guitarravisual-rutinas.png"
            alt={currentLocale === 'es' ? 'GuitarraVisual: rutinas de práctica y biblioteca de ejercicios' : 'GuitarraVisual: practice routines and exercise library'}
            width={3024}
            height={1638}
            sizes="(min-width: 1024px) 928px, 100vw"
            className="w-full h-auto rounded-sm"
          />
          <figcaption className="text-xs text-zinc-500 mt-3">
            {currentLocale === 'es' ? 'Rutinas de práctica y biblioteca de ejercicios.' : 'Practice routines and exercise library.'}
          </figcaption>
        </figure>
      )}

      {/* Project Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 border-t border-zinc-200 pt-12 pb-16">
        {/* Left Column: Metadata & Role */}
        <div className="md:col-span-4 space-y-8">
          <div>
            <h3 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-2">
              {dict.projectDetail.role}
            </h3>
            <p className="text-sm font-medium text-zinc-900 leading-snug">
              {project.role[currentLocale]}
            </p>
          </div>

          {project.liveUrl && (
            <div>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-950 underline underline-offset-4 hover:text-zinc-700 transition-colors"
              >
                <span>{dict.projectDetail.visitLive}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Case Details */}
        <div className="md:col-span-8 space-y-10 text-zinc-800">
          <div>
            <h3 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">
              {dict.projectDetail.overview}
            </h3>
            <p className="text-base text-zinc-700 leading-relaxed font-normal">
              {project.overview[currentLocale]}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">
              {dict.projectDetail.challenge}
            </h3>
            <p className="text-base text-zinc-700 leading-relaxed font-normal">
              {project.challenge[currentLocale]}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">
              {dict.projectDetail.process}
            </h3>
            <p className="text-base text-zinc-700 leading-relaxed font-normal">
              {project.process[currentLocale]}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">
              {dict.projectDetail.results}
            </h3>
            <p className="text-base text-zinc-700 leading-relaxed font-normal">
              {project.results[currentLocale]}
            </p>
          </div>
        </div>
      </div>

      {/* Prev / Next Navigation Footer */}
      <div className="border-t border-zinc-200 pt-8 flex items-center justify-between">
        <Link
          href={`/${currentLocale}/work/${prevProject.slug}`}
          className="group flex items-center gap-2 text-xs font-medium text-zinc-600 hover:text-black"
        >
          <ChevronLeft className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" />
          <div>
            <p className="text-[10px] text-zinc-400 uppercase font-mono">
              {dict.projectDetail.prevProject}
            </p>
            <p className="font-bold text-zinc-900">{prevProject.title}</p>
          </div>
        </Link>

        <Link
          href={`/${currentLocale}/work/${nextProject.slug}`}
          className="group flex items-center gap-2 text-right text-xs font-medium text-zinc-600 hover:text-black"
        >
          <div>
            <p className="text-[10px] text-zinc-400 uppercase font-mono">
              {dict.projectDetail.nextProject}
            </p>
            <p className="font-bold text-zinc-900">{nextProject.title}</p>
          </div>
          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
