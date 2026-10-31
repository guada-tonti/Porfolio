'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Locale } from '@/data/types';
import { dictionaries } from '@/data/content';
import { allCatalogProjects } from '@/data/catalog';
import { ProjectCard } from './ProjectCard';

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map(project => (
            <Link
              key={project.id}
              href={`/${currentLocale}/work/${project.slug}`}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-xl"
            >
              <ProjectCard project={project} currentLocale={currentLocale} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
