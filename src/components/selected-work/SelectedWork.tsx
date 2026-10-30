'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Locale } from '@/data/types';
import { projects, dictionaries } from '@/data/content';
import { allCatalogProjects } from '@/data/catalog';
import { tagById } from '@/data/tags';
import { CatalogThumb } from './CatalogThumb';

const featuredProjectIds = ['poap-moments-redesign', 'poap-design-system', 'remera-chenziqiang-argentina'];
const featuredProjects = featuredProjectIds.flatMap(id => allCatalogProjects.filter(project => project.id === id));

interface SelectedWorkProps {
  currentLocale: Locale;
  showViewAll?: boolean;
}

export function SelectedWork({ currentLocale, showViewAll = true }: SelectedWorkProps) {
  const dict = dictionaries[currentLocale];

  return (
    <section id="selected-work" className={`w-full bg-white ${showViewAll ? 'border-t border-zinc-200/80' : ''}`}>
      <div className={`max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-16 ${showViewAll ? 'pb-16 md:pb-24' : 'pb-8 md:pb-10'}`}>
        {/* Section Header: Label on left, 'View all projects ↗' on right */}
        <div className={`flex items-center justify-between ${showViewAll ? 'mb-8 md:mb-12' : 'mb-4 md:mb-6'}`}>
          <h2 className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            {dict.selectedWork.sectionTitle}
          </h2>

          {showViewAll && (
            <Link
              href={`/${currentLocale}/work`}
              className="group inline-flex items-center gap-1 text-xs md:text-sm font-medium text-zinc-900 hover:text-black transition-colors"
            >
              <span>{dict.selectedWork.viewAllProjects}</span>
              <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {/* Featured grid: 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {featuredProjects.map((project) => {
            const subtitle = projects.find(item => item.slug === project.slug)?.subtitle ?? project.description;
            const tags = [...project.disciplines, ...project.types, project.origin];
            return (
            <Link
              key={project.slug}
              href={`/${currentLocale}/work/${project.slug}`}
              className="group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded"
            >
              {/* Large Image-first Thumbnail container without unnecessary borders/shadows */}
              <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-100 mb-3.5 relative transition-transform duration-300 group-hover:-translate-y-1">
                <CatalogThumb id={project.id} title={project.localizedTitle?.[currentLocale] ?? project.title} />
              </div>

              {/* Project title */}
              <h3 className="text-sm md:text-base font-bold text-zinc-950 tracking-tight group-hover:underline underline-offset-2">
                {project.localizedTitle?.[currentLocale] ?? project.title}
              </h3>

              {/* Small descriptive metadata */}
              <p className="text-xs text-zinc-500 mt-0.5">
                {subtitle[currentLocale]}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.map(id => (
                  <span
                    key={id}
                    className="text-[10px] font-medium px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: tagById[id].background, color: tagById[id].color }}
                  >
                    {tagById[id].label[currentLocale]}
                  </span>
                ))}
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
