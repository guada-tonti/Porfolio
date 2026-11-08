import { ProjectHero, ProjectHeroVisual } from '@/components/selected-work/ProjectHero';
import { ProjectNavigation } from '@/components/selected-work/ProjectNavigation';
import { ProjectCaseContent } from '@/components/selected-work/ProjectCaseContent';
import { projects } from '@/data/content';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { allCatalogProjects } from '@/data/catalog';
import { tagById } from '@/data/tags';

interface Props {
  params: Promise<{ locale: string }>;
}
const project = allCatalogProjects.find(project => project.id === 'health-clarity')!;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `${project.title} - Guada Tonti`,
    description: project.description[locale === 'es' ? 'es' : 'en'],
  };
}

export default async function HealthClarityPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'es') notFound();
  const isEs = locale === 'es';

  return (
    <article className="relative w-full max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-16">
      <Link href={`/${locale}/work`}
        className="md:fixed md:top-[calc(var(--site-header-bottom,96px)_+_32px)] md:left-[max(48px,calc((100vw_-_1280px)/2_+_48px))] md:z-40 inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur-xl px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-zinc-600 hover:text-black hover:bg-white/95 mb-10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500">
        <ArrowLeft className="w-3.5 h-3.5" />
        BACK
      </Link>
      <ProjectHero backgroundSrc="/images/projects/health-clarity-title-background.png">
        <h1 className="text-2xl sm:text-3xl md:text-[40px] font-black text-zinc-950 tracking-tight mb-4">{project.title}</h1>
        <p className="text-lg md:text-xl text-zinc-600 md:max-w-[720px] md:mx-auto leading-relaxed">{project.description[locale]}</p>
        <div className="flex flex-wrap justify-center items-center gap-1.5 mt-4">
          {project.year && <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white border border-zinc-200 text-[#20202B]">{project.year}</span>}
          {[...project.disciplines, ...project.types, project.origin].map(id => (
            <span key={id} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white border border-zinc-200"
              style={{ color: tagById[id].color }}>
              {tagById[id].label[locale]}
            </span>
          ))}
        </div>
      </ProjectHero>
      <ProjectHeroVisual>
      <figure className="mb-14">
        <Image src="/images/projects/health-clarity-portada.png"
          alt={isEs ? 'Health Clarity: evolución del colesterol HDL y rango de referencia' : 'Health Clarity: HDL cholesterol history and reference range'}
          width={3016} height={1640} sizes="(min-width: 1024px) 928px, 100vw"
          className="w-full h-auto rounded-xl" preload />
        <figcaption className="text-xs text-zinc-500 mt-3">
          {isEs ? 'Detalle de un biomarcador y su evolución en el tiempo.' : 'Biomarker detail and changes over time.'}
        </figcaption>
      </figure>
      </ProjectHeroVisual>
      <ProjectCaseContent tools={project.tools} locale={locale} about={projects.find(item => item.slug === project.slug)?.overview[locale] ?? project.description[locale]}
        role={projects.find(item => item.slug === project.slug)?.role[locale]} overview={project.description[locale]}
        challenge={projects.find(item => item.slug === project.slug)?.challenge[locale]}
        process={projects.find(item => item.slug === project.slug)?.process[locale]}
        results={projects.find(item => item.slug === project.slug)?.results[locale]} />
      <figure className="mb-14">
        <Image src="/images/projects/health-clarity-dashboard.png"
          alt={isEs ? 'Health Clarity: panel de biomarcadores con valores y rangos de referencia' : 'Health Clarity: biomarker dashboard with values and reference ranges'}
          width={2966} height={1632} sizes="(min-width: 1024px) 928px, 100vw"
          className="w-full h-auto rounded-sm" />
        <figcaption className="text-xs text-zinc-500 mt-3">
          {isEs ? 'Vista general de los biomarcadores.' : 'Biomarker overview.'}
        </figcaption>
      </figure>
      <ProjectNavigation slug={project.slug!} locale={locale} />
    </article>
  );
}
