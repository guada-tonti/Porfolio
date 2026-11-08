import Image from 'next/image';
import { Fragment } from 'react';
import mediaData from '@/data/behanceMedia.json';
import importedMedia from '@/data/behanceImportedMedia.json';
import type { CatalogProject } from '@/data/catalog';
import type { Locale } from '@/data/types';

type Asset = { src: string; width: number; height: number; kind: string; frames?: number; originalOrder: string };
type Element = {
  order: number; type: string; assetIndices: (number | null)[]; caption: string; heading?: string; groupHeading?: string | { en: string; es: string };
  text?: { en: string; es: string }; translated?: boolean; translationLink?: string | null;
  segments?: { text: string; href?: string }[];
  layout?: { flexWidth: number; flexHeight: number }[];
};
type Gallery = { assets: Asset[]; elements: Element[]; sourceTitle: string };
const galleries = { ...mediaData, ...importedMedia } as Record<string, Gallery>;

export function BehanceProjectContent({ project, currentLocale }: { project: CatalogProject; currentLocale: Locale }) {
  const gallery = galleries[project.behanceGallery!];
  const isEs = currentLocale === 'es';
  const isTypography = project.id === 'typography-composition';
  const firstAsset = (element: Element) => {
    const index = element.assetIndices.find(index => index !== null);
    return index === undefined || index === null ? undefined : gallery.assets[index];
  };
  const verticalIndex = isTypography ? gallery.elements.findIndex(element => {
    const asset = firstAsset(element);
    return asset && asset.height > asset.width;
  }) : -1;
  const verticalElement = gallery.elements[verticalIndex];
  const elements = gallery.elements;

  const renderAsset = (asset: Asset) => asset.kind === 'video' ? (
    <video controls playsInline preload="none" width={asset.width} height={asset.height} className="block w-full h-auto rounded-sm bg-zinc-100" aria-label={isEs ? `${project.title}: video original` : `${project.title}: original video`}>
      <source src={asset.src} type="video/mp4" />
      <a href={asset.src}>{isEs ? 'Descargar video' : 'Download video'}</a>
    </video>
  ) : (
    <Image src={asset.src} width={asset.width} height={asset.height}
      alt={`${gallery.sourceTitle} - ${isEs ? 'recurso' : 'asset'} ${asset.originalOrder}`}
      unoptimized={(asset.frames ?? 1) > 1} loading="lazy"
      sizes={isTypography && asset.width <= asset.height ? "(min-width: 1024px) 452px, 50vw" : "(min-width: 1024px) 928px, (min-width: 768px) 85vw, 100vw"}
      className={`block w-full h-auto ${project.id === 'typography-composition' ? 'border border-zinc-200/80' : ''}`} />
  );
  return (
    <>
      <div className={isTypography ? "grid grid-cols-2 items-start gap-6" : "space-y-6"} aria-label={isEs ? 'Contenido original en orden' : 'Original content in order'}>
        {elements.map(element => (
          <Fragment key={element.order}>
          {element.groupHeading && <h2 className={`col-span-2 -mb-3 text-xs font-mono tracking-wider text-zinc-400 uppercase ${isTypography ? 'mt-6' : ''}`}>{typeof element.groupHeading === 'string' ? element.groupHeading : element.groupHeading[currentLocale]}</h2>}
          <section data-behance-order={element.order}
            className={isTypography ? (element === verticalElement || element.text || element.assetIndices.some(index => index !== null && gallery.assets[index].width > gallery.assets[index].height) ? `col-span-2 ${element.heading ? 'mt-6' : ''}` : 'col-span-1') : undefined}>
            {element.heading && <h2 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">{element.heading}</h2>}
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
                  return <figure key={asset.src} className="mx-auto" style={{ width: isTypography && element === verticalElement ? 'calc((100% - 24px) / 2)' : '100%', maxWidth: isTypography || (project.id === 'bioy-casares' && (asset.frames ?? 1) > 1) ? undefined : basis ? Math.min(asset.width, basis) : asset.width, ...(basis ? { flex: `1 1 ${basis}px` } : {}) }}>{renderAsset(asset)}</figure>;
                })}
              </div>
            )}
            {element.caption && <p className="text-xs text-zinc-500 mt-3 whitespace-pre-line">{element.caption}</p>}
          </section>
          </Fragment>
        ))}
      </div>

    </>
  );
}
