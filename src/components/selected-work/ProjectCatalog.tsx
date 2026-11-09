'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Locale } from '@/data/types';
import { orderedCatalogProjects } from '@/data/catalog';
import { catalogCategories, catalogOrigins, type CategoryId, type OriginId } from '@/data/tags';
import { matchesProject, countCategory, countOrigin } from '@/data/catalogFilters';
import { ProjectCard } from './ProjectCard';
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
  // Cover-only preview is temporarily hidden.
  const coverView = false;
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
  const orderedProjects = orderedCatalogProjects;
  const featuredProjects = orderedProjects.slice(0, 3);
  const featuredIds = new Set(featuredProjects.map(project => project.id));
  const filterableProjects = [...orderedProjects.filter(project => !featuredIds.has(project.id)), ...featuredProjects];
  const catalogPositions = [
    ['poap-moments-redesign', 3],
    ['poaps-design-web3-communities', 4],
    ['aerolab-home', 5],
    ['guitarravisual', 7],
    ['poap-design-system', 8],
  ] as const;
  for (const [slug, position] of catalogPositions) {
    const index = filterableProjects.findIndex(project => project.slug === slug);
    if (index !== -1) {
      const [project] = filterableProjects.splice(index, 1);
      filterableProjects.splice(position, 0, project);
    }
  }
  const filteredProjects = filterableProjects.filter(project => matchesProject(project, filters));
  const sortedCategories = catalogCategories
    .map(tag => ({ ...tag, count: countCategory(filterableProjects, filters, tag.id) }))
    .sort((a, b) => a.order - b.order);
  const sortedOrigins = catalogOrigins
    .map(tag => ({ ...tag, count: countOrigin(filterableProjects, filters, tag.id) }))
    .sort((a, b) => a.order - b.order);
  const allCategory = { id: 'all' as const, label: { en: 'All categories', es: 'Todas las categorías' }, background: '#FFFFFF', color: '#20202B', count: countCategory(filterableProjects, filters) };
  const allOrigin = { id: 'all' as const, label: { en: 'All types', es: 'Todos los tipos' }, background: '#FFFFFF', color: '#20202B', count: countOrigin(filterableProjects, filters, 'all') };

  return (
    <section className="project-catalog w-full bg-white pb-20 md:pb-28">
        <section aria-labelledby="featured-projects-heading" className="mb-4">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10">
            <h2 id="featured-projects-heading" className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-4">
              {isEs ? 'Destacados' : 'Featured'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map(project => (
                <Link key={project.id} href={`/${currentLocale}/work/${project.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-xl">
                  <ProjectCard project={project} currentLocale={currentLocale} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      <div>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-3">{isEs ? 'Ver todos' : 'View all'}</h2>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-4">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-3">
        {/* Category Filter Pills */}
        <div className="contents">
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
                onClick={() => {
                  if (categoriesCollapsed) { setCategoriesCollapsed(false); return; }
                  if (isSelected) { setCategoriesCollapsed(true); return; }
                  toggleCategory(cat.id);
                  if (window.matchMedia('(max-width: 767px)').matches) setCategoriesCollapsed(true);
                }}
                aria-pressed={isSelected}
                style={{ backgroundColor: !categoriesCollapsed ? '#FFFFFF' : cat.background, color: cat.color }}
                className={`whitespace-nowrap inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 ${isSelected ? (categoriesCollapsed ? 'ring-1 ring-inset ring-zinc-200' : 'ring-1 ring-inset ring-[#20202B]') : !categoriesCollapsed || cat.id === 'all' ? 'ring-1 ring-inset ring-zinc-200' : ''}` }
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
        </div>


          {/* Type filters */}
          <motion.div layout transition={pillTransition} className="relative ml-4 flex max-w-full shrink-0 flex-wrap items-center gap-2">
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
                  onClick={() => {
                    if (typesCollapsed) { setTypesCollapsed(false); return; }
                    if (isSelected) { setTypesCollapsed(true); return; }
                    updateFilters({ origin: t.id === 'all' ? '' : t.id });
                    if (window.matchMedia('(max-width: 767px)').matches) setTypesCollapsed(true);
                  }}
                  aria-pressed={isSelected}
                  style={{ backgroundColor: !typesCollapsed ? '#FFFFFF' : t.background, color: t.color }}
                  className={`whitespace-nowrap inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    isSelected
                      ? (typesCollapsed ? 'border-zinc-200' : 'border-[#20202B]')
                      : !typesCollapsed || t.id === 'all' ? 'border-zinc-200 hover:opacity-85' : 'border-transparent hover:opacity-85'
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
                <ProjectCard project={project} currentLocale={currentLocale} />
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
      </div>
    </section>
  );
}

export function ProjectCatalog(props: ProjectCatalogProps) {
  return <Suspense fallback={<section className="min-h-screen bg-white" />}><ProjectCatalogContent {...props} /></Suspense>;
}
