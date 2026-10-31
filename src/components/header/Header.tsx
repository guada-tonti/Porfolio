'use client';

import React, { useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
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
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuOpen = openPath === pathname;
  const menuId = useId();
  const menuButton = useRef<HTMLButtonElement>(null);

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
    <header onKeyDown={(event) => {
      if (event.key === 'Escape' && menuOpen) {
        setOpenPath(null);
        menuButton.current?.focus();
      }
    }} className="w-full bg-white relative z-50 pt-4 md:pt-8 pb-4 px-6 md:px-12 max-w-7xl mx-auto">
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
              className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105"
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
              setOpenPath(null);
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
              setOpenPath(null);
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
          <button ref={menuButton} type="button" aria-expanded={menuOpen} aria-controls={menuId}
            aria-label={currentLocale === 'es' ? (menuOpen ? 'Cerrar menú' : 'Abrir menú') : (menuOpen ? 'Close menu' : 'Open menu')}
            onClick={() => setOpenPath(menuOpen ? null : pathname)}
            className="md:hidden ml-3 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-zinc-800 hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
            {menuOpen ? <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" /> : <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div className={`grid md:hidden transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none ${menuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        id={menuId} inert={!menuOpen} aria-hidden={!menuOpen}>
      <div className="overflow-hidden">
      {/* Mobile Navigation menu */}
      <nav
        aria-label="Mobile Navigation"
        className="flex flex-col items-stretch gap-1 text-[11px] font-medium tracking-wider text-zinc-700 mt-4 pt-3 border-t border-zinc-100"
      >
        {navItems.map((item) => {
          const isActive = pathname ? pathname === item.href || pathname.startsWith(`${item.href}/`) : false;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpenPath(null)}
              aria-current={isActive ? 'page' : undefined}
              className={`py-3 px-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${
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
