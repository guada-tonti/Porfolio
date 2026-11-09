import { ProjectHero, ProjectHeroVisual } from '@/components/selected-work/ProjectHero';
import { ProjectNavigation } from '@/components/selected-work/ProjectNavigation';
import { ProjectCaseContent } from '@/components/selected-work/ProjectCaseContent';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { allCatalogProjects } from '@/data/catalog';
import { tagById, getProjectTagLabel } from '@/data/tags';

interface Props {
  params: Promise<{ locale: string }>;
}
const project = allCatalogProjects.find(project => project.id === 'remera-chenziqiang-argentina')!;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `${project.localizedTitle?.[locale === 'es' ? 'es' : 'en'] ?? project.title} - Guada Tonti`,
    description: project.description[locale === 'es' ? 'es' : 'en'],
  };
}

export default async function RemeraPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'es') notFound();
  const isEs = locale === 'es';

  return (
    <article className="relative w-full max-w-5xl mx-auto px-6 md:px-12 pt-12 pb-10 md:py-16">
      <Link
        href={`/${locale}/work`}
        className="fixed z-40 top-[calc(var(--site-header-bottom,72px)_+_4px)] left-3 md:top-[calc(var(--site-header-bottom,96px)_+_32px)] md:left-[max(48px,calc((100vw_-_1280px)/2_+_48px))] md:z-40 inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur-xl px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-zinc-600 hover:text-black hover:bg-white/95 mb-0 md:mb-10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-500"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        BACK
      </Link>

      <ProjectHero projectId={project.slug} backgroundSrc="/images/projects/remera-chenziqiang-title-background.png">
        <h1 className="text-2xl sm:text-3xl md:text-[40px] font-black text-zinc-950 tracking-tight mb-2 md:mb-4">
          {project.localizedTitle?.[locale] ?? project.title}
        </h1>
        <p className="text-base md:text-xl text-zinc-600 md:max-w-[720px] md:mx-auto leading-relaxed">
          {project.description[locale]}
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
          {project.year && <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white border border-zinc-200 text-[#20202B]">{project.year}</span>}
          {[...project.disciplines, ...project.types, project.origin].map(id => (
            <span key={id} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full bg-white border border-zinc-200"
              style={{ color: tagById[id].color }}>
              {getProjectTagLabel(id, locale)}
            </span>
          ))}
        </div>
      </ProjectHero>

      <ProjectHeroVisual>
      <Image
        src="/images/projects/remera-chenziqiang-argentina-portada.png"
        alt={isEs ? 'Vista del frente y dorso de la remera ChenZiqiang Argentina en un estudio' : 'Studio view of the front and back of the ChenZiqiang Argentina T-shirt'}
        width={1312} height={1199} sizes="(min-width: 1024px) 928px, 100vw"
        className="w-full h-auto rounded-xl mb-14" preload
      />
      </ProjectHeroVisual>
      <ProjectCaseContent tools={project.tools} locale={locale} role={isEs ? 'Diseño gráfico freelance' : 'Freelance graphic design'}
        overview={project.description[locale]} about={isEs
              ? 'Una remera para la escuela de taichi Chenjiagou en Argentina, diseñada con motivo de la visita de su maestro Chen Ziqiang. La propuesta combina la identificación de la escuela en el frente con una composición gráfica de taichi en el dorso.'
              : 'A T-shirt for the Chenjiagou tai chi school in Argentina, designed to mark a visit from its master Chen Ziqiang. The design combines the school identity on the front with a tai chi graphic composition on the back.'} />


      <section className="border-t border-zinc-200 pt-12">
        <h2 className="text-2xl font-bold text-zinc-950 tracking-tight mb-8">{isEs ? 'El diseño' : 'The design'}</h2>
        <figure className="mb-10">
          <Image src="/images/projects/remera-chenziqiang-argentina-dorso.jpg"
            alt={isEs ? 'Diseño del dorso con símbolo yin yang, puños, nubes y caligrafía' : 'Back artwork with a yin yang symbol, fists, clouds and calligraphy'}
            width={4724} height={5644} sizes="(min-width: 1024px) 928px, 100vw" className="w-full h-auto rounded-sm" />
          <figcaption className="text-xs text-zinc-500 mt-3">{isEs ? 'Gráfica del dorso.' : 'Back artwork.'}</figcaption>
        </figure>
        <figure>
          <Image src="/images/projects/remera-chenziqiang-argentina.jpg"
            alt={isEs ? 'Mockup original con el frente y dorso de la remera' : 'Original mockup showing the front and back of the T-shirt'}
            width={10276} height={6319} sizes="(min-width: 1024px) 928px, 100vw" className="w-full h-auto rounded-sm" />
          <figcaption className="text-xs text-zinc-500 mt-3">{isEs ? 'Mockup del frente y dorso.' : 'Front and back mockup.'}</figcaption>
        </figure>
      </section>
      <ProjectNavigation slug={project.slug!} locale={locale} />
    </article>
  );
}
