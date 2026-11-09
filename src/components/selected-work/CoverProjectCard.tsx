'use client';

import { useRef, useState } from 'react';
import type { CatalogProject } from '@/data/catalog';
import type { Locale } from '@/data/types';
import { getProjectTagLabel } from '@/data/tags';
import { CatalogThumb } from './CatalogThumb';
import './CoverProjectCard.css';

export function CoverProjectCard({ project, currentLocale }: { project: CatalogProject; currentLocale: Locale }) {
  const [revealed, setRevealed] = useState(false);
  const pointerType = useRef('mouse');
  return (
    <div
      className="catalog-cover-card"
      data-revealed={revealed || undefined}
      tabIndex={project.slug ? undefined : 0}
      onPointerDown={event => { pointerType.current = event.pointerType; }}
      onClickCapture={event => {
        // On touch, the first tap reveals details; the next follows the project link.
        if (pointerType.current === 'touch' && !revealed) {
          event.preventDefault();
          setRevealed(true);
        }
      }}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setRevealed(false); }}
    >
      <div className="catalog-cover-image">
        <CatalogThumb id={project.id} title={project.localizedTitle?.[currentLocale] ?? project.title} />
      </div>
      <div className="catalog-cover-details">
        <div className="flex items-baseline gap-2 mb-1.5">
          <h3 className="text-base font-bold tracking-tight">{project.localizedTitle?.[currentLocale] ?? project.title}</h3>
          {project.year && <span className="text-[10px] font-mono text-white/65">{project.year}</span>}
        </div>
        <p className="text-xs leading-relaxed text-white/85 mb-3">{project.description[currentLocale]}</p>
        <div className="flex flex-wrap gap-x-1 gap-y-1.5">
          {[...project.disciplines, ...project.types, project.origin].map(id => (
            <span key={id} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white border border-zinc-200" style={{ color: 'var(--color-zinc-400, #a1a1aa)', fontFamily: 'var(--font-geist-mono), monospace' }}>{getProjectTagLabel(id, currentLocale)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
