'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Globe } from 'lucide-react';
import { Locale } from '@/data/types';
import { dictionaries, socialLinks } from '@/data/content';

interface FooterProps {
  currentLocale: Locale;
}

export function Footer({ currentLocale }: FooterProps) {
  const dict = dictionaries[currentLocale];
  const [currentYear, setCurrentYear] = React.useState('2026');

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const navLinks = [
    { label: dict.nav.work, href: `/${currentLocale}/work` },
    { label: dict.nav.resume, href: `/${currentLocale}/resume` },
    { label: dict.nav.about, href: `/${currentLocale}/about` },
    { label: dict.nav.contact, href: `/${currentLocale}/contact` },
  ];

  // Specific 4 social icons requested: LinkedIn, GitHub, Behance, WhatsApp
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        );
      case 'behance':
        return (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.976 3-3.401 0-5.75-2.457-5.75-5.882 0-3.568 2.39-5.992 5.69-5.992 3.473 0 5.309 2.458 5.309 5.882 0 .428-.051.879-.088 1.162h-8.082c.119 1.688 1.488 2.67 3.018 2.67 1.341 0 2.29-.623 2.879-1.84zm-7.915-3.468h5.275c-.156-1.529-1.282-2.368-2.674-2.368-1.547 0-2.482.936-2.601 2.368zm-9.811 6.468h-6v-14h6.398c2.477 0 4.602 1.053 4.602 3.51 0 1.458-.804 2.593-2.049 3.149 1.657.488 2.549 1.875 2.549 3.551 0 2.39-1.921 3.79-5.5 3.79zm-3.5-8.406h3.111c1.464 0 2.389-.586 2.389-1.748 0-1.127-.896-1.636-2.389-1.636h-3.111v3.384zm0 6.006h3.332c1.693 0 2.768-.691 2.768-2.004 0-1.272-1.075-1.996-2.768-1.996h-3.332v4z" />
          </svg>
        );
      case 'whatsapp':
        return (
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="relative z-10 w-full bg-white border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Wordmark and Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
            <Link
              href={`/${currentLocale}`}
              className="inline-flex items-center select-none"
              aria-label="Guada Tonti"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="Guada Tonti"
                className="h-8 md:h-9 w-auto object-contain"
              />
            </Link>

            <span className="text-[10px] md:text-[11px] text-zinc-400 font-sans">
              © {currentYear} {dict.footer.copyright}
            </span>
          </div>

          {/* Navigation Links in Center */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap justify-center items-center gap-6 text-[10px] font-medium tracking-wider text-zinc-600"
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-black transition-colors"
              >
                {currentLocale === 'es' && item.href === `/${currentLocale}/work` ? (
                  <><span className="md:hidden">TRABAJOS</span><span className="hidden md:inline">{item.label}</span></>
                ) : item.label}
              </Link>
            ))}
          </nav>

          {/* Social Icons & Location */}
          <div className="flex items-center gap-6">
            {/* Social Icons: LinkedIn, GitHub, Behance, WhatsApp */}
            <div className="flex items-center gap-3 text-zinc-700">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="p-1 hover:text-black transition-colors"
                >
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>

            {/* Location in Footer */}
            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-zinc-200 text-xs text-zinc-700">
              <Globe className="w-3.5 h-3.5 text-zinc-500" strokeWidth={1.5} />
              <div className="text-[10px] leading-tight">
                <p className="text-zinc-500">{dict.footer.locationCity}</p>
                <p className="font-bold text-zinc-900">{dict.footer.locationStatus}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
