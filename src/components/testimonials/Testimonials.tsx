'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Locale } from '@/data/types';
import { testimonials, dictionaries } from '@/data/content';

interface TestimonialsProps {
  currentLocale: Locale;
}

export function Testimonials({ currentLocale }: TestimonialsProps) {
  const dict = dictionaries[currentLocale];
  const [currentIndex, setCurrentIndex] = useState(0); // Show the real recommendation first.

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const visibleIndices = [
    (currentIndex - 1 + testimonials.length) % testimonials.length,
    currentIndex,
    (currentIndex + 1) % testimonials.length,
  ];

  // Render Platform badge icon
  const renderPlatformBadge = (platform: 'linkedin' | 'slack' | 'twitter') => {
    if (platform === 'linkedin') {
      return (
        <span
          className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-[2px] bg-[#0077b5] text-white font-bold text-[8px] leading-none"
          title="LinkedIn"
        >
          in
        </span>
      );
    }
    if (platform === 'slack') {
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" role="img" aria-label="Slack">
          <title>Slack</title>
          <g fill="#36C5F0">
            <rect x="2" y="7" width="10" height="4" rx="2" />
            <path d="M10 1a2 2 0 0 0 0 4h2V3a2 2 0 0 0-2-2Z" />
          </g>
          <g fill="#2EB67D">
            <rect x="13" y="1" width="4" height="10" rx="2" />
            <path d="M23 9a2 2 0 0 0-4 0v2h2a2 2 0 0 0 2-2Z" />
          </g>
          <g fill="#ECB22E">
            <rect x="13" y="13" width="10" height="4" rx="2" />
            <path d="M15 23a2 2 0 0 0 0-4h-2v2a2 2 0 0 0 2 2Z" />
          </g>
          <g fill="#E01E5A">
            <rect x="7" y="13" width="4" height="10" rx="2" />
            <path d="M1 15a2 2 0 0 0 4 0v-2H3a2 2 0 0 0-2 2Z" />
          </g>
        </svg>
      );
    }
    return null;
  };

  return (
    <section className="w-full border-t border-zinc-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-20 md:pb-28">
        {/* Section Header: Section label on left, Carousel controls on top-right */}
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <h2 className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase">
            {dict.testimonials.sectionTitle}
          </h2>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-8 h-8 rounded-full border border-zinc-200 hover:border-zinc-900 flex items-center justify-center text-zinc-700 hover:text-black transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-8 h-8 rounded-full border border-zinc-200 hover:border-zinc-900 flex items-center justify-center text-zinc-700 hover:text-black transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-black"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 
          3-Slide Carousel View:
          - No card borders, pure clean white background
          - Left & Right slides visible with lower opacity and slightly scaled down
          - Center slide 100% opacity, comfortable reading width
        */}
        <div className="relative overflow-hidden w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            {visibleIndices.map((idx) => {
              const item = testimonials[idx];
              const isActive = idx === currentIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex flex-col items-center text-center cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'opacity-100 scale-100'
                      : 'opacity-40 hover:opacity-75 scale-95 hidden md:flex'
                  }`}
                >
                  {/* Quote */}
                  <p className="text-[13px] md:text-[15px] font-normal text-zinc-700 leading-relaxed max-w-sm mb-6 min-h-[90px] flex items-center justify-center">
                    {item.quote[currentLocale]}
                  </p>

                  {/* Profile & Metadata */}
                  <div className="flex items-center gap-3">
                    {/* Small circular profile picture avatar */}
                    <div className="w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center overflow-hidden shrink-0">
                      <span className="text-xs font-semibold text-zinc-600">
                        {item.author.charAt(0)}
                      </span>
                    </div>

                    {/* Author, metadata and platform */}
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 text-xs">
                        {item.sourceUrl ? (
                          <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer"
                            className="font-bold text-zinc-950 hover:underline underline-offset-2"
                            onClick={(event) => event.stopPropagation()}>
                            {item.author}
                          </a>
                        ) : (
                          <span className="font-bold text-zinc-950">{item.author}</span>
                        )}
                        <span className="text-zinc-400 font-normal">{dict.testimonials.onLabel}</span>
                        {renderPlatformBadge(item.platform)}
                      </div>
                      <p className="text-[11px] text-zinc-500">
                        {item.relationship[currentLocale]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile indicators dots */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'w-4 bg-zinc-900' : 'bg-zinc-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
