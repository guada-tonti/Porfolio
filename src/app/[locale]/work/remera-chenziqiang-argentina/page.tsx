import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { allCatalogProjects } from '@/data/catalog';
import { tagById } from '@/data/tags';

interface Props {
  params: Promise<{ locale: string }>;
}
const project = allCatalogProjects.find(project => project.id === 'remera-chenziqiang-argentina')!;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `${project.localizedTitle?.[locale === 'es' ? 'es' : 'en'] ?? project.title} — Guada Tonti`,
    description: project.description[locale === 'es' ? 'es' : 'en'],
  };
}

export default async function RemeraPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'es') notFound();
  const isEs = locale === 'es';

  return (
    <article className="w-full max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-16">
      <Link
        href={`/${locale}/work`}
        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-500 hover:text-black mb-10 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {isEs ? 'Volver a trabajos y proyectos' : 'Back to work & projects'}
      </Link>

      <header className="mb-8">
        <div className="flex flex-wrap gap-1.5 mb-4">
          {[...project.disciplines, ...project.types, project.origin].map(id => (
            <span key={id} className="text-[10px] font-medium px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: tagById[id].background, color: tagById[id].color }}>
              {tagById[id].label[locale]}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight mb-4">
          {project.localizedTitle?.[locale] ?? project.title}
        </h1>
        <p className="text-lg md:text-xl text-zinc-600 max-w-2xl leading-relaxed">
          {project.description[locale]}
        </p>
      </header>

      <Image
        src="/images/projects/remera-chenziqiang-argentina-portada.png"
        alt={isEs ? 'Vista del frente y dorso de la remera ChenZiqiang Argentina en un estudio' : 'Studio view of the front and back of the ChenZiqiang Argentina T-shirt'}
        width={1312} height={1199} sizes="(min-width: 1024px) 928px, 100vw"
        className="w-full h-auto rounded-sm mb-14" preload
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 border-t border-zinc-200 pt-12 pb-16">
        <aside className="md:col-span-4">
          <h2 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-2">{isEs ? 'Mi rol' : 'My role'}</h2>
          <p className="text-sm font-medium text-zinc-900">{isEs ? 'Diseño gráfico freelance' : 'Freelance graphic design'}</p>
        </aside>
        <section className="md:col-span-8">
          <h2 className="text-xs font-mono tracking-wider text-zinc-400 uppercase mb-3">{isEs ? 'Sobre el proyecto' : 'About the project'}</h2>
          <p className="text-base text-zinc-700 leading-relaxed">
            {isEs
              ? 'Una remera para la escuela de taichi Chenjiagou en Argentina, diseñada con motivo de la visita de su maestro Chen Ziqiang. La propuesta combina la identificación de la escuela en el frente con una composición gráfica de taichi en el dorso.'
              : 'A T-shirt for the Chenjiagou tai chi school in Argentina, designed to mark a visit from its master Chen Ziqiang. The design combines the school identity on the front with a tai chi graphic composition on the back.'}
          </p>
        </section>
      </div>

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
    </article>
  );
}
