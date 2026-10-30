import Image from 'next/image';
import Link from 'next/link';
import mediaData from '@/data/behanceMedia.json';
import type { CatalogProject } from '@/data/catalog';
import type { Locale } from '@/data/types';

type Asset = { src: string; width: number; height: number; kind: string; frames?: number; originalOrder: string };
type Element = {
  order: number; type: string; assetIndices: (number | null)[]; caption: string;
  text?: { en: string; es: string }; translated?: boolean; translationLink?: string | null;
  segments?: { text: string; href?: string }[];
  layout?: { flexWidth: number; flexHeight: number }[];
};
type Gallery = { assets: Asset[]; elements: Element[]; sourceTitle: string };
const galleries = mediaData as Record<string, Gallery>;
const projectOrder = ['aerolab-home', 'poap-design-system', 'poaps-design-web3-communities'];
const titles = ['UX/UI — Aerolab’s home', 'POAP Design System', 'POAPs Design for Web3 Communities'];

export function BehanceProjectContent({ project, currentLocale }: { project: CatalogProject; currentLocale: Locale }) {
  const gallery = galleries[project.behanceGallery!];
  const isEs = currentLocale === 'es';
  const index = projectOrder.indexOf(project.id);
  const adjacent = [(index + projectOrder.length - 1) % projectOrder.length, (index + 1) % projectOrder.length];
  const renderAsset = (asset: Asset) => asset.kind === 'video' ? (
    <video controls playsInline preload="none" width={asset.width} height={asset.height} className="block w-full h-auto rounded-sm bg-zinc-100" aria-label={isEs ? `${project.title}: video original` : `${project.title}: original video`}>
      <source src={asset.src} type="video/mp4" />
      <a href={asset.src}>{isEs ? 'Descargar video' : 'Download video'}</a>
    </video>
  ) : (
    <Image src={asset.src} width={asset.width} height={asset.height}
      alt={`${gallery.sourceTitle} — ${isEs ? 'recurso' : 'asset'} ${asset.originalOrder}`}
      unoptimized={(asset.frames ?? 1) > 1} loading="lazy"
      sizes="(min-width: 1024px) 928px, (min-width: 768px) 85vw, 100vw"
      className="block w-full h-auto" />
  );
  return (
    <>
      <p className="text-xs text-zinc-500 mb-8">
        {isEs ? 'Prueba de integración · Traducciones y resúmenes editoriales generados, pendientes de revisión.' : 'Integration preview · Generated translations and editorial summaries pending review.'}
      </p>
      <section className="border-t border-zinc-200 pt-8 mb-10">
        <h2 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">{isEs ? 'Sobre el proyecto' : 'About the project'}</h2>
        <p className="text-base text-zinc-700 leading-relaxed whitespace-pre-line max-w-2xl">{project.overview?.[currentLocale]}</p>
        <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-5 text-sm font-medium underline underline-offset-4">{isEs ? 'Ver el proyecto original en Behance' : 'View the original project on Behance'}</a>
      </section>
      <div className="space-y-6" aria-label={isEs ? 'Contenido original en orden' : 'Original content in order'}>
        {gallery.elements.map(element => (
          <section key={element.order} data-behance-order={element.order}>
            {element.text ? (
              <div className="text-sm md:text-base leading-relaxed text-zinc-700 whitespace-pre-line max-w-3xl mx-auto py-3">
                {isEs && element.translated ? (
                  element.translationLink ? <a href={element.translationLink} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{element.text.es}</a> : element.text.es
                ) : element.segments?.map((segment, i) => segment.href ? <a key={i} href={segment.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">{segment.text}</a> : <span key={i}>{segment.text}</span>)}
              </div>
            ) : (
              <div className={element.type === 'MediaCollectionModule' ? 'flex flex-wrap justify-center items-start gap-3' : ''}>
                {element.assetIndices.map((assetIndex, componentIndex) => {
                  if (assetIndex === null) return null;
                  const asset = gallery.assets[assetIndex];
                  const basis = element.layout?.[componentIndex]?.flexWidth;
                  return <figure key={asset.src} className="mx-auto" style={{ width: '100%', maxWidth: basis ? Math.min(asset.width, basis) : asset.width, ...(basis ? { flex: `1 1 ${basis}px` } : {}) }}>{renderAsset(asset)}</figure>;
                })}
              </div>
            )}
            {element.caption && <p className="text-xs text-zinc-500 mt-3 whitespace-pre-line">{element.caption}</p>}
          </section>
        ))}
      </div>
      <nav aria-label={isEs ? 'Proyectos de la prueba de integración' : 'Integration preview projects'} className="border-t border-zinc-200 pt-8 mt-14 flex flex-col sm:flex-row justify-between gap-6">
        {adjacent.map((i, direction) => <Link key={i} href={`/${currentLocale}/work/${projectOrder[i]}`} className={`text-xs text-zinc-600 hover:text-black ${direction ? 'sm:text-right' : ''}`}>
          <span className="block text-[10px] text-zinc-400 uppercase font-mono mb-1">{direction ? (isEs ? 'Proyecto siguiente' : 'Next project') : (isEs ? 'Proyecto anterior' : 'Previous project')}</span>
          <span className="font-bold text-zinc-900">{titles[i]}</span>
        </Link>)}
      </nav>
    </>
  );
}
