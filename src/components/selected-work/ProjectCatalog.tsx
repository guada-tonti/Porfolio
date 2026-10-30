'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Locale } from '@/data/types';
import { allCatalogProjects } from '@/data/catalog';
import { catalogCategories, catalogOrigins, tagById, type CategoryId, type OriginId } from '@/data/tags';
import { matchesProject, countCategory, countOrigin } from '@/data/catalogFilters';
import { CatalogThumb } from './CatalogThumb';
import { CoverProjectCard } from './CoverProjectCard';

interface ProjectCatalogProps {
  currentLocale: Locale;
}

function ProjectCatalogContent({ currentLocale }: ProjectCatalogProps) {
  const searchParams = useSearchParams();
  const reducedMotion = useReducedMotion();
  const pillTransition = { duration: reducedMotion ? 0 : 0.2, ease: 'easeInOut' as const };
  const [categoriesCollapsed, setCategoriesCollapsed] = useState(true);
  const [typesCollapsed, setTypesCollapsed] = useState(true);
  const [coverView, setCoverView] = useState(false);
  const selectedCategories = (searchParams.get('categories') ?? '').split(',').filter(
    (id): id is CategoryId => catalogCategories.some(tag => tag.id === id)
  ).slice(0, 1);
  const originParam = searchParams.get('origin');
  const selectedType: OriginId | 'all' = catalogOrigins.find(tag => tag.id === originParam)?.id ?? 'all';
  const searchQuery = searchParams.get('q') ?? '';
  const filters = { categories: selectedCategories, origin: selectedType, query: searchQuery };
  const isEs = currentLocale === 'es';
  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => value ? params.set(key, value) : params.delete(key));
    const query = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`);
  };
  const toggleCategory = (id: CategoryId | 'all') => updateFilters({
    categories: id === 'all' || selectedCategories.includes(id) ? '' : id,
  });
  const priorityProjectIds = ['poap-design-system', 'poap-moments-redesign', 'remera-chenziqiang-argentina', 'goal-scream-challenge'];
  const orderedProjects = [
    ...priorityProjectIds.flatMap(id => allCatalogProjects.filter(project => project.id === id)),
    ...allCatalogProjects.filter(project => !priorityProjectIds.includes(project.id)),
  ];
  const filteredProjects = orderedProjects.filter(project => matchesProject(project, filters));
  const sortedCategories = catalogCategories
    .map(tag => ({ ...tag, count: countCategory(allCatalogProjects, filters, tag.id) }))
    .sort((a, b) => b.count - a.count || a.order - b.order);
  const sortedOrigins = catalogOrigins
    .map(tag => ({ ...tag, count: countOrigin(allCatalogProjects, filters, tag.id) }))
    .sort((a, b) => b.count - a.count || a.order - b.order);
  const allCategory = { id: 'all' as const, label: { en: 'All categories', es: 'Todas las categorías' }, background: '#FFFFFF', color: '#20202B', count: countCategory(allCatalogProjects, filters) };
  const allOrigin = { id: 'all' as const, label: { en: 'All types', es: 'Todos los tipos' }, background: '#FFFFFF', color: '#20202B', count: countOrigin(allCatalogProjects, filters, 'all') };

  return (
    <section className="w-full bg-white pt-8 md:pt-10 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between gap-4 mb-4 md:mb-6">
        <h2 className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
          {isEs ? 'Ver todos los proyectos' : 'Explore all'}
        </h2>
          <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 text-xs text-zinc-600">
            <button
              type="button"
              role="switch"
              aria-checked={coverView}
              aria-label={isEs ? 'Vista de solo portadas' : 'Cover-only view'}
              onClick={() => setCoverView(!coverView)}
              className={`relative h-5 w-9 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${coverView ? 'bg-zinc-900' : 'bg-zinc-200'}`}
            >
              <span className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-white transition-transform motion-reduce:transition-none ${coverView ? 'translate-x-4' : ''}`} />
            </button>
            {isEs ? 'Solo portadas' : 'Covers only'}
          </label>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-10">
          <div className="flex min-w-0 flex-1 flex-wrap items-start gap-x-6 gap-y-3">
        {/* Category Filter Pills */}
        <motion.div layout transition={pillTransition} className="relative flex max-w-full flex-wrap items-center gap-2">
          <AnimatePresence initial={false} mode="popLayout">
          {[allCategory, ...sortedCategories].filter(cat => !categoriesCollapsed || (cat.id === 'all' ? selectedCategories.length === 0 : selectedCategories.includes(cat.id))).map((cat) => {
            const count = cat.count;
            const isSelected = cat.id === 'all' ? selectedCategories.length === 0 : selectedCategories.includes(cat.id);
            return (
              <motion.button
                key={cat.id}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={pillTransition}
                onClick={() => categoriesCollapsed ? setCategoriesCollapsed(false) : isSelected ? setCategoriesCollapsed(true) : toggleCategory(cat.id)}
                aria-pressed={isSelected}
                style={{ backgroundColor: cat.background, color: cat.color }}
                className={`whitespace-nowrap inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 ${isSelected ? 'ring-1 ring-inset ring-[#20202B]' : cat.id === 'all' ? 'ring-1 ring-inset ring-zinc-200' : ''}` }
              >
                <span>{cat.label[currentLocale]}</span>
                <span
                  className={`text-[10px] ${
                    'opacity-60'
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
          </AnimatePresence>
            <motion.button layout="position" transition={pillTransition}
              type="button"
              onClick={() => setCategoriesCollapsed(!categoriesCollapsed)}
              aria-expanded={!categoriesCollapsed}
              aria-label={isEs ? (categoriesCollapsed ? 'Mostrar categorías' : 'Contraer categorías') : (categoriesCollapsed ? 'Show categories' : 'Collapse categories')}
              title={isEs ? (categoriesCollapsed ? 'Mostrar categorías' : 'Contraer categorías') : (categoriesCollapsed ? 'Show categories' : 'Collapse categories')}
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-[#20202B] hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {categoriesCollapsed ? <ChevronRight className="h-3 w-3" aria-hidden="true" /> : <ChevronLeft className="h-3 w-3" aria-hidden="true" />}
            </motion.button>
        </motion.div>


          {/* Type filters */}
          <motion.div layout transition={pillTransition} className="relative flex max-w-full flex-wrap items-center gap-2">
            <AnimatePresence initial={false} mode="popLayout">
            {[allOrigin, ...sortedOrigins].filter(t => !typesCollapsed || selectedType === t.id).map((t) => {
              const count = t.count;
              const isSelected = selectedType === t.id;
              return (
                <motion.button
                  key={t.id}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={pillTransition}
                  onClick={() => typesCollapsed ? setTypesCollapsed(false) : isSelected ? setTypesCollapsed(true) : updateFilters({ origin: t.id === 'all' ? '' : t.id })}
                  aria-pressed={isSelected}
                  style={{ backgroundColor: t.background, color: t.color }}
                  className={`whitespace-nowrap inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    isSelected
                      ? 'border-[#20202B]'
                      : t.id === 'all' ? 'border-zinc-200 hover:opacity-85' : 'border-transparent hover:opacity-85'
                  }`}
                >
                  <span>{t.label[currentLocale]}</span>
                  <span
                    className={`text-[10px] ${
                      'opacity-60'
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
            </AnimatePresence>
            <motion.button layout="position" transition={pillTransition}
              type="button"
              onClick={() => setTypesCollapsed(!typesCollapsed)}
              aria-expanded={!typesCollapsed}
              aria-label={isEs ? (typesCollapsed ? 'Mostrar tipos' : 'Contraer tipos') : (typesCollapsed ? 'Show types' : 'Collapse types')}
              title={isEs ? (typesCollapsed ? 'Mostrar tipos' : 'Contraer tipos') : (typesCollapsed ? 'Show types' : 'Collapse types')}
              className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-[#20202B] hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {typesCollapsed ? <ChevronRight className="h-3 w-3" aria-hidden="true" /> : <ChevronLeft className="h-3 w-3" aria-hidden="true" />}
            </motion.button>
          </motion.div>

          </div>

        </div>

        {/* Project Cards Grid (3 Columns) */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-200 rounded-lg">
            <p className="text-sm text-zinc-500">
              {isEs
                ? 'No se encontraron proyectos con los filtros seleccionados.'
                : 'No projects match your current filters.'}
            </p>
            <button
              onClick={() => {
                updateFilters({ categories: '', origin: '', q: '' });
              }}
              className="mt-3 text-xs font-medium text-zinc-900 underline underline-offset-4"
            >
              {isEs ? 'Restablecer filtros' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const cardContent = coverView ? (
                <CoverProjectCard project={project} currentLocale={currentLocale} />
              ) : (
                <div className="group flex flex-col h-full bg-white transition-all">
                  {/* Thumbnail */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 relative shadow-xs border border-zinc-100 group-hover:-translate-y-1 transition-transform duration-300">
                    <CatalogThumb id={project.id} title={project.localizedTitle?.[currentLocale] ?? project.title} />
                  </div>

                  {/* Title & Year */}
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <h3 className="text-base font-bold text-zinc-950 tracking-tight group-hover:underline underline-offset-2">
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
                  <div className="flex flex-wrap gap-1.5">
                    {[...project.disciplines, ...project.types, project.origin].map((id) => (
                      <span
                        key={id}
                        className="text-[10px] font-medium px-2.5 py-0.5 rounded-full"
                        style={{ backgroundColor: tagById[id].background, color: tagById[id].color }}
                      >
                        {tagById[id].label[currentLocale]}
                      </span>
                    ))}
                  </div>
                </div>
              );

              return project.slug ? (
                <Link
                  key={project.id}
                  href={`/${currentLocale}/work/${project.slug}`}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-xl"
                >
                  {cardContent}
                </Link>
              ) : (
                <div key={project.id}>{cardContent}</div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export function ProjectCatalog(props: ProjectCatalogProps) {
  return <Suspense fallback={<section className="min-h-screen bg-white" />}><ProjectCatalogContent {...props} /></Suspense>;
}
