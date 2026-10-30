import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Download, ExternalLink } from 'lucide-react';
import { Locale } from '@/data/types';
import { dictionaries } from '@/data/content';

interface ResumePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ResumePageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'es' ? 'Currículum Vitae — Guada Tonti' : 'Resume & Experience — Guada Tonti',
    description: '15 years designing professionally. Product Design, Visual Systems & Creative Technology.',
  };
}

export default async function ResumePage({ params }: ResumePageProps) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'es') {
    notFound();
  }

  const currentLocale = locale as Locale;
  const dict = dictionaries[currentLocale];
  const isEs = currentLocale === 'es';

  const experiences = [
    {
      role: isEs ? 'Lead Product Designer' : 'Lead Product Designer',
      company: 'Digital Product Studio & Global Clients',
      period: '2021 — Present',
      description: isEs
        ? 'Liderazgo en diseño de producto, sistemas de diseño multi-marca y prototipado interactivo para plataformas SaaS e iniciativas de alto impacto.'
        : 'Leading end-to-end product design, multi-brand design systems, and rapid interactive prototyping for enterprise SaaS and venture-backed startups.',
    },
    {
      role: isEs ? 'Senior Visual & Interaction Designer' : 'Senior Visual & Interaction Designer',
      company: 'Creative Technology Lab',
      period: '2016 — 2021',
      description: isEs
        ? 'Conceptualización de experiencias web interactivas, interfaces experimentales, dirección de arte digital y colaboración estrecha con ingeniería frontend.'
        : 'Conceptualized immersive interactive web applications, digital art direction, design system tokens, and direct hands-on pairing with frontend engineers.',
    },
    {
      role: isEs ? 'Product & Graphic Designer' : 'Product & Graphic Designer',
      company: 'Brand & Digital Agency',
      period: '2010 — 2016',
      description: isEs
        ? 'Diseño de identidades visuales, packaging, arquitectura de información y primeras aplicaciones web responsivas.'
        : 'Shaped brand identities, responsive web interfaces, user flows, and editorial print systems across multiple international accounts.',
    },
  ];

  return (
    <article className="w-full max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
      {/* Header and Download Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-200 pb-8 mb-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight mb-2">
            {dict.resumePage.title}
          </h1>
          <p className="text-base md:text-lg text-zinc-600 font-sans">
            {dict.resumePage.subtitle}
          </p>
        </div>

        <div>
          <a
            href="/resume-guada-tonti.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{dict.resumePage.downloadPdf}</span>
          </a>
        </div>
      </div>

      <div className="space-y-14">
        {/* Summary */}
        <section>
          <h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4">
            {dict.resumePage.summaryTitle}
          </h2>
          <p className="text-base text-zinc-700 leading-relaxed max-w-3xl">
            {isEs
              ? '15 años diseñando profesionalmente para clientes globales y productos digitales. Experiencia integral combinando diseño centrado en el usuario, solidez tipográfica y ejecución técnica en código moderno.'
              : '15 years designing professionally across international products, startups, and creative ventures. Deep focus on user-centered systems, editorial typography, and bridging design with engineering.'}
          </p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-6">
            {dict.resumePage.experienceTitle}
          </h2>
          <div className="space-y-8">
            {experiences.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-zinc-200 pl-4 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                  <h3 className="font-bold text-zinc-950">{exp.role}</h3>
                  <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
                </div>
                <p className="text-xs font-medium text-zinc-600">{exp.company}</p>
                <p className="text-sm text-zinc-600 pt-1 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main education uses the same editorial timeline as work experience. */}
        <section>
          <h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-6">
            {dict.resumePage.mainEducationTitle}
          </h2>
          <div className="space-y-8">
            <div className="border-l-2 border-zinc-200 pl-4 space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <h3 className="font-bold text-zinc-950">{dict.resumePage.mainEducationDegree}</h3>
                <span className="text-xs font-mono text-zinc-500">2011 - 2017</span>
              </div>
              <p className="text-xs font-medium text-zinc-600">{dict.resumePage.mainEducationInstitution}</p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-zinc-200">
          <div>
            <h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4">
              {dict.resumePage.skillsTitle}
            </h2>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              {[
                'Product Design',
                'Design Systems',
                'Prototyping',
                'UI Architecture',
                'Figma',
                'HTML/CSS/JS',
                'React / Next.js',
                'WebGL / Three.js',
                'AI Workflows',
                'Design Tokens',
              ].map((skill) => (
                <span key={skill} className="bg-zinc-100 text-zinc-800 px-2.5 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
            <section className="mt-8" aria-labelledby="tools-knowledge-title">
              <h2 id="tools-knowledge-title" className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4">
                {dict.resumePage.toolsTitle}
              </h2>
              <ul className="space-y-3 text-sm text-zinc-700 leading-relaxed break-words">
                {dict.resumePage.tools.map((tool) => (
                  <li key={tool.label}>
                    <span className="font-semibold">{tool.label}:</span>{' '}
                    {tool.details}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div>
            <h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4">
              {dict.resumePage.educationTitle}
            </h2>
            <div className="space-y-3 text-xs text-zinc-700">
              <div>
                <p className="font-bold text-zinc-900">Graphic &amp; Visual Design Degree</p>
                <p className="text-zinc-500">University of Buenos Aires (FADU - UBA)</p>
              </div>
              <div>
                <p className="font-bold text-zinc-900">Creative Coding &amp; Interaction Studies</p>
                <p className="text-zinc-500">Continuous Independent Specialization &amp; Labs</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
