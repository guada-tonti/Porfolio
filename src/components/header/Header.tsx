'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
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

  const panel = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = panel.current;
    if (!dialog) return;
    if (!menuOpen) { dialog.close(); return; }
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpenPath(null); };
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [menuOpen]);

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
    <>
    <div className="h-[72px] md:hidden" aria-hidden="true" />
    <header onKeyDown={(event) => {
      if (event.key === 'Escape' && menuOpen) {
        setOpenPath(null);
        menuButton.current?.focus();
      }
    }} className="w-full bg-white fixed top-0 left-0 right-0 md:relative z-50 pt-4 md:pt-8 pb-4 px-6 md:px-12 max-w-7xl mx-auto">
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

      <dialog ref={panel} id={menuId} aria-label={currentLocale === 'es' ? 'Menú de navegación' : 'Navigation menu'}
        onCancel={() => setOpenPath(null)}
        onClick={event => { if (event.target === event.currentTarget) setOpenPath(null); }}
        className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-[calc(100%-24px)] max-w-none border-0 bg-white p-0 text-zinc-950 backdrop:bg-black/35 md:hidden">
        <div className="min-h-full flex flex-col px-7 py-6 sm:px-10" onClick={event => event.stopPropagation()}>
          <div className="flex items-center justify-between gap-6">
            <Link href={`/${currentLocale}`} onClick={() => setOpenPath(null)} aria-label="Guada Tonti Homepage" className="rounded focus-visible:outline-2 focus-visible:outline-offset-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Guada Tonti" className="h-12 w-auto" />
            </Link>
            <button type="button" onClick={() => setOpenPath(null)} aria-label={currentLocale === 'es' ? 'Cerrar menú' : 'Close menu'}
              className="h-11 w-11 flex items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2">
              <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile Navigation" className="flex flex-1 flex-col justify-center gap-6 py-12 sm:gap-9">
            {navItems.map((item, index) => {
              const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              const labels = currentLocale === 'es' ? ['Trabajos', 'Curriculum', 'Sobre mí', 'Contacto'] : ['Work & Projects', 'Resume', 'About', 'Contact'];
              return <Link key={item.href} href={item.href} onClick={() => setOpenPath(null)} aria-current={active ? 'page' : undefined}
                className={`flex items-baseline gap-5 py-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 ${active ? 'text-zinc-950' : 'text-zinc-500 hover:text-zinc-950'}`}>
                <span className="text-sm font-mono text-zinc-300" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className={`text-[clamp(24px,6.5vw,36px)] leading-tight tracking-tight ${active ? 'underline underline-offset-8 decoration-1' : ''}`}>{labels[index]}</span>
              </Link>;
            })}
          </nav>
          <div className="flex items-center gap-4 text-xs font-medium pb-6" aria-label={currentLocale === 'es' ? 'Idioma' : 'Language'}>
            {(['en', 'es'] as const).map(lang => <Link key={lang} href={getLocalizedPath(lang)} onClick={event => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault(); setOpenPath(null);
              router.push(getLocalizedPath(lang) + window.location.search + window.location.hash);
            }} className={`py-2 focus-visible:outline-2 focus-visible:outline-offset-4 ${lang === currentLocale ? 'text-black underline underline-offset-8' : 'text-zinc-400'}`}>{lang.toUpperCase()}</Link>)}
          </div>
        </div>
      </dialog>
    </header>
    </>
  );
}
