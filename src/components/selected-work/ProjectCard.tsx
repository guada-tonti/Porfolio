import type { CatalogProject } from '@/data/catalog';
import type { Locale } from '@/data/types';
import { getProjectTagLabel } from '@/data/tags';
import { CatalogThumb } from './CatalogThumb';

export function ProjectCard({ project, currentLocale }: { project: CatalogProject; currentLocale: Locale }) {
  return (
                <div className="group flex flex-col h-full transition-all">
                  {/* Thumbnail */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 relative shadow-xs border border-zinc-100">
                    <div className="relative h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none">
                      <CatalogThumb id={project.id} title={project.localizedTitle?.[currentLocale] ?? project.title} />
                    </div>
                  </div>

                  {/* Title & Year */}
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <h3 className="text-base font-bold text-zinc-950 tracking-tight">
                      {project.localizedTitle?.[currentLocale] ?? project.title}
                    </h3>
                    <span className="text-xs font-mono text-zinc-400">
                      {project.year}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                    {project.description[currentLocale]}
                  </p>

                  {/* Tags Pill Badges (2 rows like reference) */}
                  <div className="flex flex-wrap gap-x-1 gap-y-1.5">
                    {[...project.disciplines, ...project.types, project.origin].map((id) => (
                      <span
                        key={id}
                        className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white border border-zinc-200"
                        style={{ color: 'var(--color-zinc-400, #a1a1aa)', fontFamily: 'var(--font-geist-mono), monospace' }}
                      >
                        {getProjectTagLabel(id, currentLocale)}
                      </span>
                    ))}
                  </div>
                </div>
  );
}
