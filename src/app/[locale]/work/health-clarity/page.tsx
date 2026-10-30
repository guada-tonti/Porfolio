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
    title: `${project.title} — Guada Tonti`,
    description: project.description[locale === 'es' ? 'es' : 'en'],
  };
}

export default async function HealthClarityPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'es') notFound();
  const isEs = locale === 'es';

  return (
    <article className="w-full max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-16">
      <Link href={`/${locale}/work`}
        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-black mb-10 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        {isEs ? 'Volver a trabajos y proyectos' : 'Back to work & projects'}
      </Link>
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {[...project.disciplines, ...project.types, project.origin].map(id => (
            <span key={id} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: tagById[id].background, color: tagById[id].color }}>
              {tagById[id].label[locale]}
            </span>
          ))}
          <span className="text-xs font-mono text-zinc-400 ml-2">{project.year}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight mb-4">{project.title}</h1>
        <p className="text-lg md:text-xl text-zinc-600 max-w-2xl leading-relaxed">{project.description[locale]}</p>
      </header>
      <figure className="mb-14">
        <Image src="/images/projects/health-clarity-portada.png"
          alt={isEs ? 'Health Clarity: evolución del colesterol HDL y rango de referencia' : 'Health Clarity: HDL cholesterol history and reference range'}
          width={3016} height={1640} sizes="(min-width: 1024px) 928px, 100vw"
          className="w-full h-auto rounded-sm" preload />
        <figcaption className="text-xs text-zinc-500 mt-3">
          {isEs ? 'Detalle de un biomarcador y su evolución en el tiempo.' : 'Biomarker detail and changes over time.'}
        </figcaption>
      </figure>
      <figure className="mb-14">
        <Image src="/images/projects/health-clarity-dashboard.png"
          alt={isEs ? 'Health Clarity: panel de biomarcadores con valores y rangos de referencia' : 'Health Clarity: biomarker dashboard with values and reference ranges'}
          width={2966} height={1632} sizes="(min-width: 1024px) 928px, 100vw"
          className="w-full h-auto rounded-sm" />
        <figcaption className="text-xs text-zinc-500 mt-3">
          {isEs ? 'Vista general de los biomarcadores.' : 'Biomarker overview.'}
        </figcaption>
      </figure>
    </article>
  );
}
