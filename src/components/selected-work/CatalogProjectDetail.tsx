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
import { tagById, getProjectTagLabel } from '@/data/tags';
import { CatalogThumb } from './CatalogThumb';
import { BehanceProjectContent } from './BehanceProjectContent';

export function CatalogProjectDetail({ project, currentLocale }: { project: CatalogProject; currentLocale: Locale }) {
  const isEs = currentLocale === 'es';
  return (
    <article className="relative w-full max-w-5xl mx-auto px-6 md:px-12 pt-12 pb-10 md:py-16">
      <Link href={`/${currentLocale}/work`} className="fixed z-40 top-[calc(var(--site-header-bottom,72px)_+_4px)] left-3 md:top-[calc(var(--site-header-bottom,96px)_+_32px)] md:left-[max(48px,calc((100vw_-_1280px)/2_+_48px))] md:z-40 inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur-xl px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-zinc-600 hover:text-black hover:bg-white/95 mb-0 md:mb-10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500">
        <ArrowLeft className="w-3.5 h-3.5" />
        BACK
      </Link>
      <ProjectHero projectId={project.id} backgroundSrc={(project.id === 'poap-moments-redesign' || project.id === 'poaps-design-web3-communities') ? '/images/projects/poap-moments-title-background-26.webp' : project.id === 'philatelist' ? '/images/projects/philatelist-title-background-lines.webp' : project.id === 'poap-design-system' ? '/images/projects/poap-design-system-title-background.webp' : project.id === 'aerolab-home' ? '/images/projects/aerolab-title-background.webp' : project.id === 'gig-flyers' ? '/images/projects/gig-flyers/title-background-retro.webp' : generatedProjectBackgrounds[project.id]}>
        <h1 className="text-2xl sm:text-3xl md:text-[40px] font-black text-zinc-950 tracking-tight mb-2 md:mb-4">{project.localizedTitle?.[currentLocale] ?? project.title}</h1>
        {project.tagline && (
          <p className="text-xl sm:text-2xl md:text-3xl italic font-serif text-zinc-800 tracking-tight mb-6">
            {project.tagline[currentLocale]}
          </p>
        )}
        <p className="text-base md:text-xl text-zinc-600 md:max-w-[720px] md:mx-auto leading-relaxed">
          {project.id === 'poap-moments-redesign' && currentLocale === 'en' && project.heroDescription ? (
            <>{project.heroDescription.en.split('through ')[0]}through<span className="md:hidden"> </span><br className="hidden md:block" />{project.heroDescription.en.split('through ')[1]}</>
          ) : project.heroDescription?.[currentLocale] ?? project.description[currentLocale]}
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
          {project.year && <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white border border-zinc-200 text-[#20202B]">{project.year}</span>}
          {[...project.disciplines, ...project.types, project.origin].map(id => (
            <span key={id} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white border border-zinc-200" style={{ color: tagById[id].color }}>
              {getProjectTagLabel(id, currentLocale)}
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
          <>
            <figure>
              <Image src="/images/projects/moments-team-feedback-v2.png" width={3802} height={1446}
                alt={isEs ? 'Reconocimiento del equipo al trabajo de Guada en POAP Moments, destacando la calidad visual y la coherencia estructural del producto.' : 'Team recognition of Guada’s work on POAP Moments, highlighting the product’s visual quality and structural coherence.'}
                sizes="100vw" className="mx-auto block w-full h-auto" />
            </figure>
            <details className="group/case mt-8">
              <summary className="inline-flex cursor-pointer list-none items-center gap-3 rounded-full border border-zinc-300 px-5 py-2.5 text-xs font-medium text-zinc-900 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden">
                Read full case study (in progress)
                <span aria-hidden="true" className="transition-transform group-open/case:rotate-180 motion-reduce:transition-none">⌄</span>
              </summary>
              <section className="mt-10 text-left">
                <h2 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">Initial audit</h2>
                <p className="text-base leading-relaxed text-zinc-700">Reviewed the existing product experience to identify key friction points and opportunities for improvement.</p>
                <div className="mt-6 grid items-start gap-8 md:grid-cols-2 md:gap-10">
                  <Image src="/images/projects/moments-initial-audit.png" width={2235} height={1326}
                    alt={isEs ? 'Pantallas de exploración, publicación y audio de POAP Moments antes del rediseño.' : 'Explore, Publish and Audio screens from POAP Moments before the redesign.'}
                    sizes="(min-width: 768px) 50vw, 100vw" className="block h-auto w-full" />
                  <div>
                    <h3 className="mb-5 text-xs font-mono uppercase tracking-wider text-zinc-400">Key findings</h3>
                    <dl className="max-w-2xl space-y-5 text-[14px] leading-relaxed text-zinc-700">
                      {[
                        ['Navigation lacked clear hierarchy', 'Sections, actions, and content categories competed at the same level.'],
                        ["Content wasn't the hero", 'The feed displayed very few Moments, reducing content density and discoverability.'],
                        ['Fragmented browsing experience', 'Audio and other media types were isolated instead of forming a unified content experience.'],
                        ['High friction when contributing', 'Publishing Moments required unnecessary steps and provided weak feedback.'],
                        ['Limited discovery', 'Users had few ways to explore related events, creators, or content.'],
                      ].map(([title, description]) => (
                        <div key={title}>
                          <dt className="font-semibold text-zinc-900">{title}</dt>
                          <dd>{description}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </section>
              <section className="mt-10 text-left">
                <h2 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">Putting content first</h2>
                <p className="text-base leading-relaxed text-zinc-700">From one card for every Moment to layouts tailored to each type of content. Previously, photos, text, and audio all shared the same structure. The redesign gives each format its own variant: photos take center stage, text gets room to breathe, and audio has a player built into the card.</p>
                <Image src="/images/projects/moments-content-variants.png" width={1289} height={1059}
                  alt={isEs ? 'Tarjetas de POAP Moments para fotos, audio, texto y video.' : 'POAP Moments cards for photos, audio, text, and video.'}
                  sizes="100vw" className="mt-6 block h-auto w-full" />
              </section>
              <section className="mt-10 text-left">
                <h2 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">Redefining the Moments feed</h2>
                <p className="text-base leading-relaxed text-zinc-700">From a static single-column feed to a dynamic masonry layout built around the content.</p>
                <Image src="/images/projects/moments-feed-redesign.png" width={2918} height={1324}
                  alt={isEs ? 'Comparación entre el feed original y el rediseño en mosaico de POAP Moments.' : 'Comparison of the original POAP Moments feed and the redesigned masonry layout.'}
                  sizes="100vw" className="mt-6 block h-auto w-full" />
                <div className="mt-8 grid gap-6 md:grid-cols-[44%_45%] md:justify-between">
                  <div>
                    <h3 className="mb-2 text-[14px] font-semibold text-zinc-900">From single-column feed</h3>
                    <p className="text-[14px] leading-relaxed text-zinc-700">The previous feed gave every Moment the same width, regardless of its content, resulting in low content density. Different image proportions required extra padding or could take up most of the viewport.</p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-[14px] font-semibold text-zinc-900">To a multi-column masonry feed</h3>
                    <p className="text-[14px] leading-relaxed text-zinc-700">The masonry grid allows Moments to adapt naturally to different content types and proportions, creating a more dynamic and visually engaging feed. More content at a glance gives users a quick sense of the event and encourages further exploration.</p>
                  </div>
                </div>
              </section>
              <section className="mt-10 text-left">
                <h2 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">Creating visual rhythm with color</h2>
                <p className="text-base leading-relaxed text-zinc-700">Photos brought natural variety to the feed, but text and audio cards initially shared the same purple background. When several appeared together, the masonry layout started to feel repetitive. A system of background color variants brought back visual rhythm while maintaining enough contrast to keep text and controls easy to read.</p>
                <Image src="/images/projects/moments-color-variants.png" width={2354} height={1283}
                  alt={isEs ? 'Variantes de color para las tarjetas de audio, texto y enlaces de POAP Moments.' : 'Color variants for audio, text, and link cards in POAP Moments.'}
                  sizes="100vw" className="mt-6 block h-auto w-full" />
                <div className="mt-8">
                  <h3 className="mb-4 text-[14px] font-semibold text-zinc-900">Color variants on the detail page</h3>
                  <Image src="/images/projects/moments-detail-color-variants.png" width={3101} height={1322}
                    alt={isEs ? 'Variantes de color de los componentes de audio y texto adaptadas a la página de detalle.' : 'Audio and text color variants adapted to the Moment detail page.'}
                    sizes="100vw" className="block h-auto w-full" />
                </div>
              </section>
              <section className="mt-10 text-left">
                <h2 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">Detail page</h2>
                <div className="mt-6 space-y-6">
                  <Image src="/images/projects/moments-detail-audio.png" width={1773} height={996}
                    alt={isEs ? 'Detalle de un Moment con reproductor de audio.' : 'Moment detail with an audio player.'}
                    sizes="100vw" className="block h-auto w-full" />
                  <Image src="/images/projects/moments-detail-viewer.png" width={1512} height={849}
                    alt={isEs ? 'Detalle de un Moment con una foto y la lista de participantes.' : 'Moment detail with a photo and the participant list.'}
                    sizes="100vw" className="block h-auto w-full" />
                </div>
              </section>
              <section className="mt-10 text-left">
                <h2 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">Defining media resizing rules</h2>
                <div className="mt-6 space-y-6">
                  <Image src="/images/projects/moments-resizing-horizontal.png" width={1520} height={849}
                    alt={isEs ? 'Reglas de tamaño para contenido horizontal en la vista de detalle.' : 'Sizing rules for horizontal media in the Moment detail view.'}
                    sizes="100vw" className="block h-auto w-full" />
                  <Image src="/images/projects/moments-resizing-vertical.png" width={1520} height={849}
                    alt={isEs ? 'Reglas de tamaño para contenido vertical en la vista de detalle.' : 'Sizing rules for vertical media in the Moment detail view.'}
                    sizes="100vw" className="block h-auto w-full" />
                </div>
              </section>
              <section className="mt-10 text-left">
                <h2 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">Metadata component documentation</h2>
                <Image src="/images/projects/moments-metadata-documentation.png" width={2345} height={2904}
                  alt={isEs ? 'Documentación de las variantes del componente de metadatos en el detalle de un Moment.' : 'Documentation of metadata component variants in the Moment detail view.'}
                  sizes="100vw" className="mt-6 block h-auto w-full" />
              </section>
              <section className="mt-10 text-left">
                <h2 className="mb-3 text-xs font-mono uppercase tracking-wider text-zinc-400">Creating a Moment</h2>
                <Image src="/images/projects/moments-creating-a-moment.png" width={3024} height={1712}
                  alt={isEs ? 'Pantalla para crear un Moment con opciones para agregar contenido multimedia, un enlace o una nota.' : 'Moment creation screen with options to add media, a link, or a note.'}
                  sizes="100vw" className="mt-6 block h-auto w-full" />
                <Image src="/images/projects/moments-create-hover-states.png" width={1367} height={843}
                  alt={isEs ? 'Estados predeterminados y al pasar el cursor de las opciones para crear un Moment.' : 'Default and hover states for the Moment creation options.'}
                  sizes="100vw" className="mt-6 block h-auto w-full" />
              </section>
            </details>
          </>
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
