'use client';

import { LockKeyhole } from 'lucide-react';
import { useState, useSyncExternalStore } from 'react';
import { dictionaries } from '@/data/content';
import type { Locale } from '@/data/types';
import { currentAvailabilityMonth, getAvailabilityCalendar } from '@/data/availability';

function subscribeToMonthChange(update: () => void) {
  const interval = window.setInterval(update, 60_000);
  window.addEventListener('focus', update);
  document.addEventListener('visibilitychange', update);
  return () => {
    window.clearInterval(interval);
    window.removeEventListener('focus', update);
    document.removeEventListener('visibilitychange', update);
  };
}
const serverMonth = () => '';
const colors = {
  available: '#E4EFE9', fulltime: '#E4EFE9', limited: '#F5ECDC', unavailable: '#F4F4F5',
  unconfirmed: '#F4F4F5', closed: '#F4F4F5',
};

export function ProjectAvailability({ currentLocale, variant = 'compact' }: { currentLocale: Locale; variant?: 'compact' | 'rows' }) {
  const [expanded, setExpanded] = useState(false);
  const isRows = variant === 'rows';
  const headingId = `availability-title-${variant}`;
  const copy = dictionaries[currentLocale].availability;
  const month = useSyncExternalStore(subscribeToMonthChange, currentAvailabilityMonth, serverMonth);
  const calendar = month ? getAvailabilityCalendar(month, expanded ? [0, 1, 2, 3, 4, 5] : [0, 1, 2]) : null;
  const locale = currentLocale === 'es' ? 'es-AR' : 'en-US';
  const format = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(locale, { ...options, timeZone: 'UTC' });
  const monthLabel = (date: Date) => {
    const name = format({ month: 'long' }).format(date);
    return `${name.charAt(0).toLocaleUpperCase(locale)}${name.slice(1)}`;
  };
  const dateLabel = (date: Date) => format({ weekday: 'short', day: 'numeric', month: 'short' }).format(date);
  const weekdayLabel = (date: Date) => {
    const day = format({ weekday: 'short' }).format(date).replace(/\./g, '');
    return `${day.toLocaleUpperCase(locale)} ${date.getUTCDate()}`;
  };
  const weekRange = (start: Date, end: Date) => start.getTime() === end.getTime()
    ? `(${weekdayLabel(start)})`
    : `(${weekdayLabel(start)} - ${weekdayLabel(end)})`;

  return (
    <section className="mt-14 pt-10 border-t border-zinc-200" aria-labelledby={headingId}>
      <h2 id={headingId} className="text-[11px] font-mono font-normal uppercase tracking-widest text-zinc-400 mb-4">{copy.eyebrow}</h2>
      <p className={`text-[14px] font-normal not-italic text-zinc-600 leading-relaxed ${isRows ? 'mb-8' : 'max-w-xl mb-6'}`} style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>{copy.description}</p>

      <div id={`availability-months-${variant}`} className="min-h-[240px]" aria-busy={!calendar}>
        {calendar ? (
          <>
            {isRows ? (
              <div className="space-y-6">
                {calendar.months.map(item => (
                  <div key={item.id} className="grid grid-cols-1 sm:grid-cols-[80px_minmax(0,1fr)] gap-3 sm:gap-3">
                    <h3 className="sm:pt-4">
                      <span className="flex items-center gap-2 text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-700">
                        {monthLabel(item.date)}
                        {item.closed && <LockKeyhole aria-hidden="true" className="w-3 h-3 text-zinc-400" />}
                      </span>
                      <span className="block font-mono text-[11px] font-normal text-zinc-400 mt-1">{item.date.getUTCFullYear()}</span>
                    </h3>
                    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-1 gap-y-2">
                      {item.weeks.map((week, index) => (
                        <li key={week.id} className="rounded px-2 py-4 text-[#20202B]"
                          style={{ backgroundColor: colors[week.status] }}
                          aria-label={`${dateLabel(week.start)} – ${dateLabel(week.end)}: ${copy.status[week.status]}`}>
                          <p className="text-[10px] font-mono font-semibold uppercase mb-1.5">{copy.week} {index + 1}</p>
                          <p className="text-[10px] font-mono font-normal text-zinc-500 mb-2">
                            {weekRange(week.start, week.end)}
                          </p>
                          <p className="text-[11px] leading-snug">{copy.status[week.status]}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {calendar.months.map(item => (
                <div key={item.id}>
                  <h3 className="text-xs font-mono text-zinc-700 mb-3 flex items-center gap-2">
                    {monthLabel(item.date)} {item.date.getUTCFullYear()}
                    {item.closed && <LockKeyhole aria-hidden="true" className="w-3 h-3 text-zinc-400" />}
                  </h3>
                  <ul className="space-y-1.5">
                    {item.weeks.map((week, index) => (
                      <li key={week.id} className="flex flex-col items-start gap-1.5 px-2 py-2 rounded-sm text-[10px] text-[#20202B]"
                        style={{ backgroundColor: colors[week.status] }}
                        aria-label={`${dateLabel(week.start)} – ${dateLabel(week.end)}: ${copy.status[week.status]}`}>
                        <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                          <span className="text-[10px] font-mono font-semibold uppercase">{copy.week} {index + 1}</span>
                          <span className="whitespace-nowrap">{weekRange(week.start, week.end)}</span>
                        </span>
                        <span className="leading-snug">{copy.status[week.status]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            )}
              <div className="flex justify-center mt-6">
                <button type="button" onClick={() => setExpanded(value => !value)}
                  aria-controls={`availability-months-${variant}`} aria-expanded={expanded}
                  className="text-xs text-zinc-500 underline underline-offset-4 hover:text-zinc-950 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4">
                  {expanded ? copy.showLess : copy.showMore}
                </button>
              </div>
          </>
        ) : <p className="text-xs text-zinc-500">{copy.loading}</p>}
      </div>

    </section>
  );
}
