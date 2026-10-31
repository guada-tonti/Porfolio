import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Mail, Globe, ArrowUpRight } from 'lucide-react';
import { Locale } from '@/data/types';
import { dictionaries, socialLinks, contactEmail } from '@/data/content';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'es' ? 'Contacto — Guada Tonti' : 'Contact — Guada Tonti',
    description: 'Get in touch for design leadership, creative technology consulting, or worldwide freelance projects.',
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'es') {
    notFound();
  }

  const currentLocale = locale as Locale;
  const dict = dictionaries[currentLocale];
  const isEs = currentLocale === 'es';

  return (
    <article className="w-full max-w-4xl mx-auto px-6 md:px-12 pt-6 pb-12 md:py-20">
      <div className="border-b border-zinc-200 pb-8 mb-12">
        <p className="text-[11px] font-mono tracking-widest text-zinc-400 uppercase mb-3">
          {isEs ? 'HABLEMOS' : 'GET IN TOUCH'}
        </p>
        <h1 className="text-3xl md:text-5xl font-black text-zinc-950 tracking-tight mb-4">
          {dict.contactPage.title}
        </h1>
        <p className="text-xl md:text-2xl text-zinc-600 font-serif italic max-w-2xl">
          {dict.contactPage.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Contact Form */}
        <div className="md:col-span-7">
          <form
            onSubmit={undefined}
            className="space-y-6"
            action={`mailto:${contactEmail}`}
            method="GET"
          >
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                {dict.contactPage.emailLabel}
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="you@domain.com"
                className="w-full px-4 py-3 rounded-none border border-zinc-300 focus:border-zinc-950 focus:outline-none text-sm transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">
                {dict.contactPage.messageLabel}
              </label>
              <textarea
                id="message"
                name="body"
                rows={5}
                required
                placeholder={isEs ? 'Contame sobre tu proyecto o consulta...' : 'Tell me about your project or inquiry...'}
                className="w-full px-4 py-3 rounded-none border border-zinc-300 focus:border-zinc-950 focus:outline-none text-sm transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium px-6 py-3 rounded-full transition-colors"
            >
              <span>{dict.contactPage.sendButton}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Direct Coordinates */}
        <div className="md:col-span-5 space-y-8 border-t md:border-t-0 md:border-l border-zinc-200 md:pl-10">
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">Direct Email</h3>
            <a
              href={`mailto:${contactEmail}`}
              className="text-sm font-bold text-zinc-950 hover:underline"
            >
              {contactEmail}
            </a>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">Location</h3>
            <p className="text-sm font-medium text-zinc-900">Buenos Aires, Argentina</p>
            <p className="text-xs text-zinc-500">Working worldwide (Remote / UTC-3)</p>
          </div>

          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">Channels</h3>
            <div className="space-y-3 text-xs">
              {socialLinks.map((s) => (
                <div key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-zinc-700 hover:text-black font-medium transition-colors"
                  >
                    <span className="text-zinc-600 flex items-center justify-center">
                      {s.platform === 'linkedin' && (
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      )}
                      {s.platform === 'github' && (
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      )}
                      {s.platform === 'behance' && (
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.976 3-3.401 0-5.75-2.457-5.75-5.882 0-3.568 2.39-5.992 5.69-5.992 3.473 0 5.309 2.458 5.309 5.882 0 .428-.051.879-.088 1.162h-8.082c.119 1.688 1.488 2.67 3.018 2.67 1.341 0 2.29-.623 2.879-1.84zm-7.915-3.468h5.275c-.156-1.529-1.282-2.368-2.674-2.368-1.547 0-2.482.936-2.601 2.368zm-9.811 6.468h-6v-14h6.398c2.477 0 4.602 1.053 4.602 3.51 0 1.458-.804 2.593-2.049 3.149 1.657.488 2.549 1.875 2.549 3.551 0 2.39-1.921 3.79-5.5 3.79zm-3.5-8.406h3.111c1.464 0 2.389-.586 2.389-1.748 0-1.127-.896-1.636-2.389-1.636h-3.111v3.384zm0 6.006h3.332c1.693 0 2.768-.691 2.768-2.004 0-1.272-1.075-1.996-2.768-1.996h-3.332v4z" />
                        </svg>
                      )}
                      {s.platform === 'whatsapp' && (
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                        </svg>
                      )}
                    </span>
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
