'use client';

import './Header.css';
import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
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
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => {
    mobileMenu.current?.removeAttribute('open');
    if (window.location.hash === '#mobile-navigation') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };
  useEffect(() => {
    if (window.location.hash === '#mobile-navigation' || sessionStorage.getItem('portfolio-mobile-menu-language') === pathname) {
      mobileMenu.current?.setAttribute('open', '');
      sessionStorage.removeItem('portfolio-mobile-menu-language');
    } else {
      closeMenu();
    }
  }, [pathname]);

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
      const logo = surface.querySelector<HTMLElement>('.site-header-logo');
      if (logo) {
        const bounds = logo.getBoundingClientRect();
        document.documentElement.style.setProperty('--site-header-logo-left', `${bounds.left}px`);
        document.documentElement.style.setProperty('--site-header-logo-top', `${bounds.top}px`);
        document.documentElement.style.setProperty('--site-header-logo-height', `${bounds.height}px`);
      }
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
      ['left', 'top', 'height'].forEach(part => document.documentElement.style.removeProperty(`--site-header-logo-${part}`));
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
    <>
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
              closeMenu();
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
              closeMenu();
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
          <span className="md:hidden ml-3 h-10 w-10 shrink-0" aria-hidden="true" />
        </div>
      </div>


      </div>
      </div>
    </header>
    <details ref={mobileMenu} className="site-mobile-menu group/mobile md:hidden" onKeyDown={event => { if (event.key === 'Escape') closeMenu(); }}>
      <summary aria-label={currentLocale === 'es' ? 'Abrir o cerrar menú' : 'Open or close menu'} className="site-mobile-menu-toggle list-none flex h-10 w-10 items-center justify-center rounded-sm text-zinc-800 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2">
        <Menu className="h-5 w-5 group-open/mobile:hidden" strokeWidth={1.5} aria-hidden="true" />
        <X className="hidden h-5 w-5 group-open/mobile:block" strokeWidth={1.5} aria-hidden="true" />
      </summary>
    </details>
      <div id="mobile-navigation" className="site-mobile-menu-overlay fixed inset-0 z-[100] flex justify-end bg-black/35 text-zinc-950 pointer-events-auto" onClick={event => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="h-full w-full overflow-y-auto bg-white flex flex-col px-7 py-6 sm:px-10" onClick={event => event.stopPropagation()}>
          <div className="flex items-center justify-between gap-6">
            <Link href={`/${currentLocale}`} onClick={() => { if (pathname === `/${currentLocale}`) closeMenu(); }} aria-label="Guada Tonti Homepage" className="site-mobile-menu-brand rounded focus-visible:outline-2 focus-visible:outline-offset-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="Guada Tonti" className="site-mobile-menu-logo w-auto object-contain" />
            </Link>
            <a href="#" aria-label={currentLocale === 'es' ? 'Cerrar menú' : 'Close menu'} onClick={event => { event.preventDefault(); closeMenu(); }} className="site-mobile-menu-close flex h-10 w-10 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2">
              <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
          <nav aria-label="Mobile Navigation" className="flex flex-1 flex-col items-center justify-center gap-6 py-12 sm:gap-9">
            {[{ label: 'Home', href: `/${currentLocale}` }, ...navItems].map((item, index) => {
              const active = pathname === item.href || (index > 0 && pathname?.startsWith(`${item.href}/`));
              const labels = currentLocale === 'es' ? ['Home', 'Trabajos', 'Curriculum', 'Sobre mí', 'Contacto'] : ['Home', 'Work & Projects', 'Resume', 'About', 'Contact'];
              return <Link key={item.href} href={item.href} prefetch={true} onClick={() => { if (pathname === item.href) closeMenu(); }} aria-current={active ? 'page' : undefined}
                className={`relative flex items-baseline justify-center py-2 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 ${active ? 'text-zinc-950' : 'text-zinc-500 hover:text-zinc-950'}`}>
                <span className="absolute right-full mr-5 text-sm font-mono text-zinc-300" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className={`text-[clamp(24px,6.5vw,36px)] leading-tight tracking-tight ${active ? 'underline underline-offset-8 decoration-1' : ''}`}>{labels[index]}</span>
              </Link>;
            })}
          </nav>
          <div className="pb-6 text-center">
            <p className="text-[10px] font-mono tracking-wider text-zinc-400 uppercase mb-2">{currentLocale === 'es' ? 'Idioma' : 'Language'}</p>
          <div className="flex items-center justify-center gap-4 text-xs font-medium" aria-label={currentLocale === 'es' ? 'Idioma' : 'Language'}>
            {(['en', 'es'] as const).map((lang, index) => <React.Fragment key={lang}>
              {index > 0 && <span className="text-zinc-300" aria-hidden="true">/</span>}
              <Link href={`${getLocalizedPath(lang)}#mobile-navigation`} scroll={false} onClick={event => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              event.preventDefault();
              if (lang === currentLocale) return;
              sessionStorage.setItem('portfolio-mobile-menu-language', getLocalizedPath(lang));
              router.push(getLocalizedPath(lang) + window.location.search + '#mobile-navigation', { scroll: false });
            }} className={`py-2 focus-visible:outline-2 focus-visible:outline-offset-4 ${lang === currentLocale ? 'text-black underline underline-offset-8' : 'text-zinc-400'}`}>{lang === 'en' ? 'ENGLISH' : 'ESPAÑOL'}</Link></React.Fragment>)}
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
