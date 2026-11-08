import { generatedProjectBackgrounds } from '@/data/generatedProjectBackgrounds';
import { ProjectHero, ProjectHeroVisual } from '@/components/selected-work/ProjectHero';
import { ProjectNavigation } from '@/components/selected-work/ProjectNavigation';
import React from 'react';
import { ProjectCaseContent } from '@/components/selected-work/ProjectCaseContent';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Locale } from '@/data/types';
import { projects, dictionaries } from '@/data/content';
import { allCatalogProjects, draftProjectSlugs } from '@/data/catalog';
import { CatalogProjectDetail } from '@/components/selected-work/CatalogProjectDetail';
import {
  SaturnOVThumbnail,
  GuitarraVisualThumbnail,
  FamilyPhotosThumbnail,
} from '@/components/selected-work/ProjectThumbnails';

interface ProjectPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  ['en', 'es'].forEach((locale) => {
    const detailSlugs = new Set([...projects.filter(project => !draftProjectSlugs.has(project.slug)).map(project => project.slug), ...allCatalogProjects.filter(project => project.overview).map(project => project.slug!)]);
    detailSlugs.forEach((slug) => {
      params.push({ locale, slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (draftProjectSlugs.has(slug)) return { title: 'Project Not Found', robots: { index: false, follow: false } };
  const project = projects.find((p) => p.slug === slug) ?? allCatalogProjects.find(project => project.slug === slug && project.overview);
  if (!project) return { title: 'Project Not Found' };

  const currentLocale = locale === 'es' ? 'es' : 'en';

  return {
    title: `${project.title} - Guada Tonti`,
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

  if (draftProjectSlugs.has(slug)) notFound();

  const currentLocale = locale as Locale;
  const dict = dictionaries[currentLocale];

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) {
    const catalogProject = allCatalogProjects.find(project => project.slug === slug && project.overview);
    if (!catalogProject) notFound();
    return <CatalogProjectDetail project={catalogProject} currentLocale={currentLocale} />;
  }

  const project = projects[projectIndex];
  const renderHeroVisual = (slugName: string) => {
    switch (slugName) {
      case 'saturno-v':
        return <SaturnOVThumbnail />;
      case 'guitarravisual':
        return <GuitarraVisualThumbnail />;
      case 'bigotes':
        return <Image src="/images/projects/bigotes-cover-mockup-v3.jpg" alt="Bigotes" width={1556} height={992} sizes="(min-width: 1024px) 928px, 100vw" className="w-full h-auto" preload />;
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
    <article className="relative w-full max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-16">
      {/* Back link */}
      <Link
        href={`/${currentLocale}/work`}
        className="md:fixed md:top-[calc(var(--site-header-bottom,96px)_+_32px)] md:left-[max(48px,calc((100vw_-_1280px)/2_+_48px))] md:z-40 inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur-xl px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-zinc-600 hover:text-black hover:bg-white/95 mb-10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK</span>
      </Link>

      {/* Header Info */}
      <ProjectHero backgroundSrc={project.slug === 'guitarravisual' ? '/images/projects/guitarravisual-title-background.png' : project.slug === 'saturno-v' ? '/images/projects/saturno-v-title-background.png' : generatedProjectBackgrounds[project.slug]}>
        <h1 className="text-2xl sm:text-3xl md:text-[40px] font-black text-zinc-950 tracking-tight mb-4">
          {project.title}
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 md:max-w-[720px] md:mx-auto font-normal leading-relaxed">
          {project.subtitle[currentLocale]}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-1.5 text-[10px] font-medium text-[#20202B] mt-4">
          {project.year && <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white border border-zinc-200 text-[#20202B]">{project.year}</span>}
          <span className="rounded-full bg-white border border-zinc-200 px-2.5 py-0.5">{project.category[currentLocale]}</span>
        </div>
      </ProjectHero>

      <ProjectHeroVisual>
      {/* Hero Visual Container */}
      <div className={`w-full ${project.slug === 'bigotes' ? '' : 'aspect-[16/9]'} rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/80 mb-14 shadow-sm`}>
        {renderHeroVisual(project.slug)}
      </div>

      </ProjectHeroVisual>
      <ProjectCaseContent tools={allCatalogProjects.find(item => item.slug === project.slug)?.tools} locale={currentLocale} about={project.overview[currentLocale]}
        role={project.role[currentLocale]} overview={project.subtitle[currentLocale]}
        challenge={project.challenge[currentLocale]} process={project.process[currentLocale]} results={project.results[currentLocale]}
        links={project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-6 text-xs font-bold underline underline-offset-4">{dict.projectDetail.visitLive}<ArrowUpRight className="w-3.5 h-3.5" /></a>} />

      {project.slug === 'bigotes' && (
        <section className="my-14" aria-labelledby="bigotes-avatars-title">
          <h2 id="bigotes-avatars-title" className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">{currentLocale === 'es' ? 'Diseño de Avatars' : 'Avatars design'}</h2>
          <div className="grid grid-cols-5 gap-3 md:gap-8">
          {[
            ['black', 'Negro', 'Black'], ['blue', 'Azul', 'Blue'],
            ['calico', 'Calicó', 'Calico'], ['ginger', 'Naranja', 'Ginger'],
            ['siames', 'Siamés', 'Siamese'], ['silver', 'Plateado', 'Silver'],
            ['tabby', 'Atigrado', 'Tabby'], ['tuxedo', 'Esmoquin', 'Tuxedo'],
            ['white', 'Blanco', 'White'], ['nncat', 'Sin identificar', 'Unidentified'],
          ].map(([id, es, en]) => (
            <figure key={id} className="text-center">
              <Image src={`/images/projects/bigotes/avatars/${id}.${id === 'nncat' ? 'png' : 'svg'}`}
                alt={currentLocale === 'es' ? `Avatar de gato: ${es}` : `Cat avatar: ${en}`}
                width={160} height={160} className="w-full max-w-40 aspect-square object-contain mx-auto" />
              <figcaption className="mt-2 text-[10px] md:text-xs text-zinc-500">{id.charAt(0).toUpperCase() + id.slice(1).toLowerCase()}</figcaption>
            </figure>
          ))}
          </div>
        </section>
      )}

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

      <ProjectNavigation slug={project.slug} locale={currentLocale} />
    </article>
  );
}
