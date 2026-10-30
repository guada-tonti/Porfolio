'use client';

import React from 'react';
import { Locale } from '@/data/types';
import { services, dictionaries } from '@/data/content';
import {
  ProductDesignIllustration,
  DesignEngineerIllustration,
  GraphicDesignIllustration,
  AICreativeIllustration,
  InteractiveExperiencesIllustration,
  SideProjectsIllustration,
} from './ServiceIllustrations';

interface WhatIDoProps {
  currentLocale: Locale;
}

export function WhatIDo({ currentLocale }: WhatIDoProps) {
  const dict = dictionaries[currentLocale];

  const renderIllustration = (type: string) => {
    switch (type) {
      case 'product-design':
        return <ProductDesignIllustration />;
      case 'design-engineer':
        return <DesignEngineerIllustration />;
      case 'graphic-design':
        return <GraphicDesignIllustration />;
      case 'ai-creative':
        return <AICreativeIllustration />;
      case 'interactive':
        return <InteractiveExperiencesIllustration />;
      case 'side-projects':
        return <SideProjectsIllustration />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full border-t border-zinc-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-16 md:pb-24">
        {/* Section Header: Left label, no unnecessary large headlines */}
        <div className="mb-10 md:mb-14">
          <h2 className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            {dict.whatIDo.sectionTitle}
          </h2>
        </div>

        {/* 
          3-column, 2-row grid on desktop.
          Divided with subtle light-gray borders between columns/rows like an editorial magazine spread.
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 lg:gap-y-16 gap-x-8 lg:gap-x-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col items-start ${
                // Add right border divider for editorial elegance on lg screens
                index % 3 !== 2 ? 'lg:border-r lg:border-zinc-200/60 lg:pr-10' : ''
              }`}
            >
              {/* Illustration Area */}
              <div className="w-full mb-4 flex items-center justify-center">
                {renderIllustration(service.illustrationType)}
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-bold text-zinc-950 tracking-tight mb-1.5">
                {service.title[currentLocale]}
              </h3>

              {/* Short Description */}
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed max-w-sm">
                {service.description[currentLocale]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
