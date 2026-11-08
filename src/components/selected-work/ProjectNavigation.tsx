import { FixedProjectNavigation } from './FixedProjectNavigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { orderedCatalogProjects } from '@/data/catalog';
import { dictionaries } from '@/data/content';
import type { Locale } from '@/data/types';

export function ProjectNavigation({ slug, locale }: { slug: string; locale: Locale }) {
  // Cards without a detail page must never become navigation destinations.
  const projects = orderedCatalogProjects.filter(project => project.slug);
  const index = projects.findIndex(project => project.slug === slug);
  if (index < 0 || projects.length < 2) return null;
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const labels = dictionaries[locale].projectDetail;
  return (
    <FixedProjectNavigation previousHref={`/${locale}/work/${previous.slug}`} nextHref={`/${locale}/work/${next.slug}`} label={locale === 'es' ? 'Navegación fija entre proyectos' : 'Fixed project navigation'}
      className="fixed inset-x-0 bottom-0 z-40 mx-auto hidden xl:flex w-full max-w-7xl justify-between items-end gap-4 px-6 md:px-12 pb-[max(12px,env(safe-area-inset-bottom))] pointer-events-none">
      {[previous, next].map((project, direction) => (
        <Link key={direction} aria-keyshortcuts={direction ? 'ArrowRight' : 'ArrowLeft'} href={`/${locale}/work/${project.slug}`}
          className={`pointer-events-auto group inline-flex items-center gap-2 min-w-0 max-w-[min(144px,calc((100vw_-_1024px)/2_-_24px))] rounded-sm px-3.5 py-2.5 text-xs text-zinc-600 hover:text-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500 ${direction ? 'text-right' : ''}`}>
          <span className="min-w-0 w-full">
            <span className={`flex w-full items-center gap-0.5 text-[9px] text-zinc-400 uppercase font-mono ${direction ? 'justify-end text-right' : 'justify-start text-left'}`}>
              {!direction && <ChevronLeft aria-hidden="true" className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-900 group-focus-visible:text-zinc-900 -ml-[5px] transition-[color,transform] motion-reduce:transition-none motion-reduce:transform-none" />}
              <span>{direction ? labels.nextProject : labels.prevProject}</span>
              {!!direction && <ChevronRight aria-hidden="true" className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-zinc-900 group-focus-visible:text-zinc-900 -mr-[5px] transition-[color,transform] motion-reduce:transition-none motion-reduce:transform-none" />}
            </span>
            <span className={`block w-full max-w-[88px] text-[11px] font-normal text-zinc-700 whitespace-normal break-words leading-snug ${direction ? 'ml-auto' : ''}`}>{project.localizedTitle?.[locale] ?? project.title}</span>
          </span>
        </Link>
      ))}
    </FixedProjectNavigation>
  );
}
