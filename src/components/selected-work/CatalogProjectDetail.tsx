import { generatedProjectBackgrounds } from '@/data/generatedProjectBackgrounds';
import { ProjectHero, ProjectHeroVisual } from '@/components/selected-work/ProjectHero';
import { ProjectNavigation } from '@/components/selected-work/ProjectNavigation';
import Link from 'next/link';
import { BeforeAfterComparison } from './BeforeAfterComparison';
import { ProjectCaseContent } from './ProjectCaseContent';
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
    <article className="relative w-full max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-16">
      <Link href={`/${currentLocale}/work`} className="md:fixed md:top-[calc(var(--site-header-bottom,96px)_+_32px)] md:left-[max(48px,calc((100vw_-_1280px)/2_+_48px))] md:z-40 inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur-xl px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-zinc-600 hover:text-black hover:bg-white/95 mb-10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500">
        <ArrowLeft className="w-3.5 h-3.5" />
        BACK
      </Link>
      <ProjectHero backgroundSrc={(project.id === 'poap-moments-redesign' || project.id === 'poaps-design-web3-communities') ? '/images/projects/poap-moments-title-background-26.png' : project.id === 'philatelist' ? '/images/projects/philatelist-title-background-lines.png' : project.id === 'poap-design-system' ? '/images/projects/poap-design-system-title-background.png' : project.id === 'aerolab-home' ? '/images/projects/aerolab-title-background.png' : project.id === 'gig-flyers' ? '/images/projects/gig-flyers/title-background-retro.png' : generatedProjectBackgrounds[project.id]}>
        <h1 className="text-2xl sm:text-3xl md:text-[40px] font-black text-zinc-950 tracking-tight mb-4">{project.localizedTitle?.[currentLocale] ?? project.title}</h1>
        {project.tagline && (
          <p className="text-xl sm:text-2xl md:text-3xl italic font-serif text-zinc-800 tracking-tight mb-6">
            {project.tagline[currentLocale]}
          </p>
        )}
        <p className="text-lg md:text-xl text-zinc-600 md:max-w-[720px] md:mx-auto leading-relaxed">
          {project.id === 'poap-moments-redesign' && currentLocale === 'en' && project.heroDescription ? (
            <>{project.heroDescription.en.split('through ')[0]}through<span className="md:hidden"> </span><br className="hidden md:block" />{project.heroDescription.en.split('through ')[1]}</>
          ) : project.heroDescription?.[currentLocale] ?? project.description[currentLocale]}
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
          {project.year && <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white border border-zinc-200 text-[#20202B]">{project.year}</span>}
          {[...project.disciplines, ...project.types, project.origin].map(id => (
            <span key={id} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white border border-zinc-200" style={{ color: tagById[id].color }}>
              {tagById[id].label[currentLocale]}
            </span>
          ))}
        </div>
      </ProjectHero>
      <ProjectHeroVisual>
        {project.id === 'poap-moments-redesign' ? (
          <BeforeAfterComparison locale={currentLocale}
            beforeSrc="/images/projects/moments-comparison/before-clean.png"
            afterSrc="/images/projects/moments-comparison/after-home.png" />
        ) : project.id === 'aerolab-home' ? (
          <figure className="w-full overflow-hidden rounded-xl border border-zinc-200/80 mb-14">
            <Image src="/images/projects/behance-test/aerolab-home/hero-iphone-xs.png"
              alt={isEs ? 'Homepage de Aerolab en tres dispositivos, con el logo del barrilete' : 'Aerolab homepage on three devices with the kite logo'}
              width={1521} height={1034} sizes="(min-width: 1024px) 928px, 100vw" className="w-full h-auto" unoptimized preload />
          </figure>
        ) : project.images?.[0] ? (
          <figure className="mb-14">
            <Image src={project.images[0].src} alt={project.images[0].alt[currentLocale]}
              width={project.images[0].width} height={project.images[0].height} unoptimized={project.id === 'aerolab-home'}
              sizes="(min-width: 1024px) 928px, 100vw" className={`w-full h-auto rounded-xl ${project.id === 'typography-composition' ? 'border border-zinc-200/80' : ''}`} preload />
          </figure>
        ) : project.id === 'philatelist' ? (
          <figure className="mb-14">
            <Image src="/images/projects/philatelist-portada.png"
              alt={isEs ? 'Philatelist: generación de estampas' : 'Philatelist: stamp generation'}
              width={2996} height={1638} sizes="(min-width: 1024px) 928px, 100vw" className="w-full h-auto rounded-xl" preload />
          </figure>
        ) : (
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-100 mb-14">
            <CatalogThumb id={project.id} title={project.localizedTitle?.[currentLocale] ?? project.title} />
          </div>
        )}
      </ProjectHeroVisual>
      <ProjectCaseContent tools={project.tools} locale={currentLocale} about={project.overview?.[currentLocale] ?? project.description[currentLocale]}
        role={project.caseStudy?.role?.[currentLocale]} overview={project.caseStudy?.summary?.[currentLocale] ?? project.description[currentLocale]}
        challenge={project.caseStudy?.challenge?.[currentLocale]} process={project.caseStudy?.process?.[currentLocale]} results={project.caseStudy?.results?.[currentLocale]}
        afterResults={project.id === 'poap-moments-redesign' && (
          <figure>
            <Image src="/images/projects/moments-team-feedback-v2.png" width={3802} height={1446}
              alt={isEs ? 'Reconocimiento del equipo al trabajo de Guada en POAP Moments, destacando la calidad visual y la coherencia estructural del producto.' : 'Team recognition of Guada’s work on POAP Moments, highlighting the product’s visual quality and structural coherence.'}
              sizes="(min-width: 1024px) 580px, (min-width: 768px) 60vw, 100vw" className="w-full h-auto" />
          </figure>
        )}
        links={project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-sm font-medium underline underline-offset-4">{isEs ? 'Ver el proyecto en Behance' : 'View the project on Behance'}</a>} />
      {project.behanceGallery ? <BehanceProjectContent project={project} currentLocale={currentLocale} /> : <>
      {project.images && project.images.length > 1 ? (
        <div className="space-y-10 mb-14">
          {project.images.slice(1).map(image => (
            <figure key={image.src}>
              <Image src={image.src} alt={image.alt[currentLocale]} width={image.width} height={image.height}
                sizes="(min-width: 1024px) 768px, 100vw" className="w-full max-w-3xl h-auto mx-auto rounded-sm" />
            </figure>
          ))}
        </div>
      ) : project.video ? (
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
      ) : null}

      </>}
      <ProjectNavigation slug={project.slug!} locale={currentLocale} />
    </article>
  );
}
