'use client';

import { useState } from 'react';
import { Globe, CalendarDays, Mail, Copy, Check } from 'lucide-react';
import type { Locale } from '@/data/types';
import { dictionaries, professionalInfoLabels, contactEmail } from '@/data/content';

export function ProfessionalInfo({ currentLocale, compact = false, showContact = false }: { currentLocale: Locale; compact?: boolean; showContact?: boolean }) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      setCopyStatus('error');
    }
  };
  const { hero } = dictionaries[currentLocale];
  const labels = professionalInfoLabels[currentLocale];
  const itemClass = `flex min-w-0 items-start ${compact ? 'gap-2 text-[11px]' : 'gap-2.5 text-xs'} text-zinc-700`;
  const iconClass = `${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} text-zinc-600 mt-0.5 shrink-0`;
  return (
    <div className={compact ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.25fr_1fr] items-center gap-y-5 gap-x-6' : 'flex flex-col sm:flex-row items-start gap-y-3 gap-x-6 sm:gap-10'}>
      <div className={`${itemClass} shrink-0`}>
        <Globe className={iconClass} strokeWidth={1.5} aria-hidden="true" />
        <div>
          <p className="text-zinc-600 leading-tight">{hero.locationCity}</p>
          <p className="font-bold text-zinc-950 leading-tight">{hero.locationStatus}</p>
        </div>
      </div>
      <div className={itemClass}>
        <CalendarDays className={iconClass} strokeWidth={1.5} aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-zinc-600 leading-tight">{labels.availability}</p>
          <p className="font-bold text-zinc-950 leading-tight">{labels.opportunities}</p>
        </div>
      </div>
      {showContact && <div className={itemClass}>
        <Mail className={iconClass} strokeWidth={1.5} aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-zinc-600 leading-tight">{labels.contact}</p>
          <div className="flex items-center gap-1.5 min-w-0">
          <a href={`mailto:${contactEmail}`} className="font-bold text-zinc-950 leading-tight break-words hover:underline underline-offset-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-600">
            {contactEmail} <span aria-hidden="true">↗</span>
          </a>
          <button type="button" onClick={copyEmail}
            aria-label={currentLocale === 'es' ? 'Copiar email' : 'Copy email'}
            title={currentLocale === 'es' ? 'Copiar email' : 'Copy email'}
            className="shrink-0 p-0.5 text-zinc-500 hover:text-zinc-950 cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600">
            {copyStatus === 'copied' ? <Check className="w-3 h-3" aria-hidden="true" /> : <Copy className="w-3 h-3" aria-hidden="true" />}
          </button>
          <span role="status" className="sr-only">{copyStatus === 'copied' ? (currentLocale === 'es' ? 'Email copiado' : 'Email copied') : copyStatus === 'error' ? (currentLocale === 'es' ? 'No se pudo copiar el email' : 'Could not copy email') : ''}</span>
          </div>
        </div>
      </div>}
    </div>
  );
}
