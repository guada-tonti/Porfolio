import React from 'react';
import { ProfessionalInfo } from '@/components/professional-info/ProfessionalInfo';
import { WorkExperience } from '@/components/resume/WorkExperience';
import { AdditionalEducation } from '@/components/resume/AdditionalEducation';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Download } from 'lucide-react';
import { Locale } from '@/data/types';
import { dictionaries, efSetCertificateUrl } from '@/data/content';

interface ResumePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ResumePageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'es' ? 'Curriculum - Guada Tonti' : 'Resume - Guada Tonti',
    description: 'Product Designer with 12+ years of professional design experience. Product Design, Visual Systems & Creative Technology.',
  };
}

export default async function ResumePage({ params }: ResumePageProps) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'es') {
    notFound();
  }

  const currentLocale = locale as Locale;
  const dict = dictionaries[currentLocale];

  const experiences = dict.resumePage.experiences;

  return (
    <article className="w-full max-w-4xl mx-auto px-6 md:px-12 pt-6 pb-12 md:py-20">
      {/* Header and Download Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-200 pb-8">
        <div>
          <p className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-3">
            {dict.resumePage.eyebrow}
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight mb-2">
            {dict.resumePage.title}
          </h1>
          <p className="text-base md:text-lg text-zinc-600 font-sans">
            {dict.resumePage.subtitle}
          </p>
        </div>

        <div>
          <a
            href={`/${currentLocale}/resume/pdf`}
            download={currentLocale === 'es' ? 'Guada_Tonti_CV_ES.pdf' : 'Guada_Tonti_Resume_EN.pdf'}
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{dict.resumePage.downloadPdf}</span>
          </a>
        </div>
      </div>

      <div className="py-8 mb-14 border-b border-zinc-200">
        <ProfessionalInfo currentLocale={currentLocale} compact showContact />
      </div>

      <div className="space-y-14">
        {/* Summary */}
        <section>
          <h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4">
            {dict.resumePage.summaryTitle}
          </h2>
          <p className="text-base text-zinc-700 leading-relaxed max-w-3xl">
            {dict.resumePage.summary}
          </p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-6">
            {dict.resumePage.experienceTitle}
          </h2>
          <WorkExperience experiences={experiences} expand={dict.resumePage.earlierExperienceExpand} collapse={dict.resumePage.earlierExperienceCollapse} />
        </section>

        {/* Main education uses the same editorial timeline as work experience. */}
        <section>
          <h2 className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-6">
            {dict.resumePage.mainEducationTitle}
          </h2>
          <div className="space-y-8">
            {dict.resumePage.educationCourses.map(course => (
              <div key={course.institution} className="border-l-2 border-zinc-200 pl-4 space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm gap-x-4">
                  <h3 className="font-bold text-zinc-950">{course.title}</h3>
                  <span className="text-xs font-mono text-zinc-500 shrink-0">{course.period}</span>
                </div>
                <p className="text-xs font-medium text-zinc-600">{course.institution}</p>
                <p className="text-sm text-zinc-600 pt-1 leading-relaxed">{course.description}</p>
              </div>
            ))}
            <div className="border-l-2 border-zinc-200 pl-4 space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                <h3 className="font-bold text-zinc-950">{dict.resumePage.mainEducationDegree}</h3>
                <span className="text-xs font-mono text-zinc-500">{dict.resumePage.mainEducationPeriod}</span>
              </div>
              <p className="text-xs font-medium text-zinc-600">{dict.resumePage.mainEducationInstitution}</p>
              <p className="text-sm text-zinc-600 pt-1 leading-relaxed">{dict.resumePage.mainEducationDescription}</p>
            </div>
          </div>
          <AdditionalEducation content={dict.resumePage.additionalEducation} />
        </section>

        <section aria-labelledby="languages-title">
              <h2 id="languages-title" className="text-xs font-mono tracking-widest text-zinc-400 uppercase mb-4">
                {dict.resumePage.languagesTitle}
              </h2>
              <ul className="space-y-2 text-sm text-zinc-700 leading-relaxed">
                <li><span className="font-semibold">{dict.resumePage.spanishLanguage}</span> - {dict.resumePage.nativeLevel}</li>
                <li>
                  <span className="font-semibold">{dict.resumePage.englishLanguage}</span> - <span title={dict.resumePage.englishLevelContext}>{dict.resumePage.englishLevel}</span> ·{' '}
                  <a href={efSetCertificateUrl} target="_blank" rel="noopener noreferrer"
                    aria-describedby="english-level-context"
                    className="inline-flex items-center gap-1 whitespace-nowrap underline underline-offset-4 decoration-zinc-300 hover:text-zinc-950 hover:decoration-zinc-600 transition-colors motion-reduce:transition-none rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-600">
                    EF SET 75/100 <span aria-hidden="true">↗</span>
                  </a>
                  <span id="english-level-context" className="sr-only">{dict.resumePage.englishLevelContext}</span>
                </li>
              </ul>
        </section>

            <section aria-labelledby="tools-knowledge-title">
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
    </article>
  );
}
