import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import type { CatalogProject } from '@/data/catalog';
import type { Locale } from '@/data/types';
import { tagById } from '@/data/tags';
import { CatalogThumb } from './CatalogThumb';
import { BehanceProjectContent } from './BehanceProjectContent';

export function CatalogProjectDetail({ project, currentLocale }: { project: CatalogProject; currentLocale: Locale }) {
  const isEs = currentLocale === 'es';
  return (
    <article className="w-full max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-16">
      <Link href={`/${currentLocale}/work`} className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-black mb-10 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        {isEs ? 'Volver a trabajos y proyectos' : 'Back to work & projects'}
      </Link>
      <header className="mb-8">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {[...project.disciplines, ...project.types, project.origin].map(id => (
            <span key={id} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full" style={{ backgroundColor: tagById[id].background, color: tagById[id].color }}>
              {tagById[id].label[currentLocale]}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight mb-4">{project.title}</h1>
        {project.tagline && (
          <p className="text-xl sm:text-2xl md:text-3xl italic font-serif text-zinc-800 tracking-tight mb-6">
            {project.tagline[currentLocale]}
          </p>
        )}
        <p className="text-lg md:text-xl text-zinc-600 max-w-2xl leading-relaxed">{project.heroDescription?.[currentLocale] ?? project.description[currentLocale]}</p>
      </header>
      {project.behanceGallery ? <BehanceProjectContent project={project} currentLocale={currentLocale} /> : <>
      {project.id === 'philatelist' && (
        <figure className="mb-10">
          <Image
            src="/images/projects/philatelist-portada.png"
            alt={isEs ? 'Philatelist: estampa de Bangkok y generación en lote con referencias de estilo compartidas' : 'Philatelist: Bangkok stamp and batch generation with shared style references'}
            width={2996}
            height={1638}
            sizes="(min-width: 1024px) 928px, 100vw"
            className="w-full h-auto rounded-sm"
          />
          <figcaption className="text-xs text-zinc-500 mt-3">
            {isEs ? 'Generación de estampas en lote con parámetros de diseño compartidos y referencias de estilo.' : 'Batch stamp generation with shared design parameters and style references.'}
          </figcaption>
        </figure>
      )}
      {project.video ? (
        <figure className="mb-14">
          <video
            controls
            playsInline
            preload="metadata"
            poster={project.video.poster}
            aria-label={isEs ? `Demostración de ${project.title}` : `${project.title} demo`}
            className="w-full h-auto rounded-sm bg-zinc-100"
          >
            <source src={project.video.src} type="video/mp4" />
            <a href={project.video.src}>{isEs ? 'Descargar video' : 'Download video'}</a>
          </video>
          <figcaption className="text-xs text-zinc-500 mt-3">
            {isEs ? 'Demostración de la app. El tramo de generación de estampas se reproduce al doble de velocidad.' : 'App demo. The stamp generation segment is shown at 2× speed.'}
          </figcaption>
        </figure>
      ) : (
        <div className="w-full aspect-[16/9] rounded-sm overflow-hidden bg-zinc-100 mb-14 relative">
          <CatalogThumb id={project.id} title={project.title} />
        </div>
      )}
      <section className="border-t border-zinc-200 pt-12">
        <h2 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">{isEs ? 'Sobre el proyecto' : 'About the project'}</h2>
        {project.id === 'philatelist' ? (
          <div className="space-y-6 max-w-2xl">
            {project.overview?.[currentLocale].split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-base text-zinc-700 leading-relaxed">
                {paragraph.split(/(\*\*.*?\*\*)/g).map((part, partIndex) =>
                  part.startsWith('**') && part.endsWith('**')
                    ? <strong key={partIndex}>{part.slice(2, -2)}</strong>
                    : part
                )}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-base text-zinc-700 leading-relaxed max-w-2xl">{project.overview?.[currentLocale]}</p>
        )}
        {project.sourceUrl && (
          <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-sm font-medium underline underline-offset-4">
            {isEs ? 'Ver el caso en Behance' : 'View the case study on Behance'}
          </a>
        )}
      </section>
      </>}
    </article>
  );
}
