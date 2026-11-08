import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Locale } from '@/data/types';
import { dictionaries } from '@/data/content';

export function ProjectCaseContent({ locale, about, role, overview, challenge, process, results, links, afterResults, tools = [] }: {
  locale: Locale; about: string; role?: string; overview?: string; challenge?: string;
  process?: string; results?: string; links?: ReactNode; afterResults?: ReactNode; tools?: { id: string; name: string }[];
}) {
  const labels = dictionaries[locale].projectDetail;
  const pending = locale === 'es' ? 'Contenido por completar.' : 'Content to be added.';
  const heading = 'text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3';
  const paragraphs = (text: string) => text.split('\n\n').map((paragraph, index) => (
    <p key={index} className="text-base text-zinc-700 leading-relaxed">
      {paragraph.split(/(\*\*.*?\*\*)/g).map((part, i) => part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part)}
    </p>
  ));
  return <div className="mb-14">
    <section className="pt-8 mb-10">
      <h2 className={heading}>{locale === 'es' ? 'Sobre el proyecto' : 'About the project'}</h2>
      <div className="space-y-6">{paragraphs(about)}</div>
    </section>
    <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
      <aside className="md:col-span-4">
        <h2 className={heading}>{labels.role}</h2>
        <p className="text-sm font-medium text-zinc-900 leading-relaxed">{role || pending}</p>
        <section className="mt-8">
          <h2 className={heading}>{dictionaries[locale].toolsTechnologiesTitle}</h2>
          {tools.length > 0 ? (
            <ul className="flex flex-wrap gap-x-6 gap-y-4">
              {tools.map(tool => (
                <li key={tool.id} tabIndex={0} aria-label={tool.name} className="group/tool relative flex items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-4">
                  <Image src={`/images/tools/${tool.id}.svg`} alt="" width={24} height={24} className={`w-6 h-6 object-contain ${tool.id === 'google-flow' ? 'invert' : ''}`} />
                  <span aria-hidden="true" className="pointer-events-none invisible absolute top-[calc(100%+8px)] left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded px-2 py-1 text-[11px] font-normal leading-[1.4] text-white bg-[#20202b] group-hover/tool:visible group-focus/tool:visible" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>{tool.name}</span>
                </li>
              ))}
            </ul>
          ) : <p className="text-sm text-zinc-400">{pending}</p>}
        </section>
        {links}
      </aside>
      <div className="md:col-span-8 space-y-10">
        {[[labels.overview, overview], [labels.challenge, challenge], [labels.process, process], [labels.results, results]].map(([title, text]) => (
          <section key={title}><h2 className={heading}>{title}</h2>
            <div className="space-y-6">{text ? paragraphs(text) : <p className="text-sm text-zinc-400">{pending}</p>}</div>
          </section>
        ))}
        {afterResults}
      </div>
    </div>
  </div>;
}
