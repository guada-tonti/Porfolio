'use client';

import './Header.css';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/data/types';
import { dictionaries } from '@/data/content';

interface HeaderProps {
  currentLocale: Locale;
}

export function Header({ currentLocale }: HeaderProps) {
  const dict = dictionaries[currentLocale];
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(previous => previous ? window.scrollY > 16 : window.scrollY > 48);
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  useEffect(() => {
    const surface = document.querySelector<HTMLElement>('.site-header-surface');
    if (!surface) return;
    let frame: number | null = null;
    const measure = () => {
      frame = null;
      document.documentElement.style.setProperty('--site-header-bottom', `${surface.getBoundingClientRect().bottom}px`);
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(measure);
    };
    // Observe the animated surface rather than the unchanged sticky shell.
    const observer = new ResizeObserver(measure);
    observer.observe(surface);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    measure();
    return () => {
      observer.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.documentElement.style.removeProperty('--site-header-bottom');
    };
  }, []);

  // Helper to switch locale in the current path
  const getLocalizedPath = (targetLocale: Locale) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    if (segments[0] === 'en' || segments[0] === 'es') {
      segments[0] = targetLocale;
      return `/${segments.join('/')}`;
    }
    return `/${targetLocale}${pathname}`;
  };

  const navItems = [
    { label: dict.nav.work, href: `/${currentLocale}/work` },
    { label: dict.nav.resume, href: `/${currentLocale}/resume` },
    { label: dict.nav.about, href: `/${currentLocale}/about` },
    { label: dict.nav.contact, href: `/${currentLocale}/contact` },
  ];

  return (
    <header className="site-header-shell" data-scrolled={isScrolled} data-variant={currentLocale === 'en' ? 'traditional' : 'floating'}>
      <div className="site-header-surface">
      <div className="site-header-inner">
      {/* 
        3-Column Layout with mathematically centered Nav Group:
        Col 1: Logo (flex-1)
        Col 2: Centered Nav (shrink-0)
        Col 3: Language Selector (flex-1, text-right)
      */}
      <div className="flex items-center justify-between">
        {/* Left: Handwritten brand logo */}
        <div className="flex-1 flex items-center justify-start">
          <Link
            href={`/${currentLocale}`}
            className="group inline-flex items-center select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded"
            aria-label="Guada Tonti Homepage"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Guada Tonti"
              className="site-header-logo w-auto object-contain group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Center: Mathematically Centered Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-[11px] font-medium tracking-wider text-zinc-800"
        >
          {navItems.map((item) => {
            const isActive = pathname ? pathname === item.href || pathname.startsWith(`${item.href}/`) : false;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-1 py-0.5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-black ${
                  isActive
                    ? 'text-black font-semibold border-b-[1.5px] border-black'
                    : 'text-zinc-500 hover:text-black'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Language selector EN / ES */}
        <div className="flex-1 flex items-center justify-end gap-1.5 text-[11px] font-medium tracking-wider text-zinc-700">
          <Link
            href={getLocalizedPath('en')}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              router.push(getLocalizedPath('en') + window.location.search + window.location.hash);
            }}
            className={`px-1 py-0.5 transition-colors ${
              currentLocale === 'en'
                ? 'text-black font-semibold border-b-[1.5px] border-black'
                : 'text-zinc-400 hover:text-zinc-700'
            }`}
            aria-label="Switch to English"
          >
            EN
          </Link>
          <span className="text-zinc-300">/</span>
          <Link
            href={getLocalizedPath('es')}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              router.push(getLocalizedPath('es') + window.location.search + window.location.hash);
            }}
            className={`px-1 py-0.5 transition-colors ${
              currentLocale === 'es'
                ? 'text-black font-semibold border-b-[1.5px] border-black'
                : 'text-zinc-400 hover:text-zinc-700'
            }`}
            aria-label="Cambiar a Español"
          >
            ES
          </Link>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <nav
        aria-label="Mobile Navigation"
        className="flex md:hidden items-center justify-center gap-3 sm:gap-4 text-[10px] font-medium tracking-wider text-zinc-700 mt-4 pt-3 -mx-6 px-6 border-t border-zinc-100 overflow-x-auto"
      >
        {navItems.map((item) => {
          const isActive = pathname ? pathname === item.href || pathname.startsWith(`${item.href}/`) : false;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`whitespace-nowrap py-1 px-1.5 transition-colors ${
                isActive
                  ? 'text-black font-semibold border-b-[1.5px] border-black'
                  : 'text-zinc-500 hover:text-black'
              }`}
            >
              {currentLocale === 'es' && item.href === `/${currentLocale}/work` ? 'TRABAJOS' : item.label}
            </Link>
          );
        })}
      </nav>
      </div>
      </div>
    </header>
  );
}
