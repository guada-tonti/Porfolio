'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/data/types';
import { dictionaries, contactEmail } from '@/data/content';

export function ContactForm({ locale }: { locale: Locale }) {
  const labels = dictionaries[locale].contactPage;
  const isEs = locale === 'es';
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const sending = useRef(false);
  const attempt = useRef({ payload: '', id: '' });
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = { email: String(data.get('email') ?? ''), message: String(data.get('body') ?? ''), website: String(data.get('website') ?? '') };
    const signature = JSON.stringify(payload);
    if (attempt.current.payload !== signature) attempt.current = { payload: signature, id: crypto.randomUUID() };
    sending.current = true;
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, requestId: attempt.current.id }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error('Send failed');
      setStatus('success');
      form.reset();
      attempt.current = { payload: '', id: '' };
    } catch {
      setStatus('error');
    } finally { sending.current = false; }
  }
  return (
    <form onSubmit={submit} className="space-y-6" aria-busy={status === 'sending'}>
      <div>
        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">{labels.emailLabel}</label>
        <input id="email" type="email" name="email" required maxLength={254} autoComplete="email" placeholder="you@domain.com"
          className="w-full px-4 py-3 rounded-none border border-zinc-300 focus:border-zinc-950 focus:outline-none text-sm transition-colors" />
      </div>
      <div>
        <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-zinc-700 mb-2">{labels.messageLabel}</label>
        <textarea id="message" name="body" rows={5} required maxLength={10000}
          placeholder={isEs ? 'Contame sobre tu proyecto o consulta...' : 'Tell me about your project or inquiry...'}
          className="w-full px-4 py-3 rounded-none border border-zinc-300 focus:border-zinc-950 focus:outline-none text-sm transition-colors resize-none" />
      </div>
      <div hidden aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <button type="submit" disabled={status === 'sending'}
        className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium px-6 py-3 rounded-full transition-colors disabled:opacity-60 disabled:cursor-wait">
        <span>{status === 'sending' ? (isEs ? 'Enviando...' : 'Sending...') : labels.sendButton}</span><ArrowUpRight className="w-3.5 h-3.5" />
      </button>
      <div aria-live="polite" aria-atomic="true">
        {status === 'success' && <p className="text-sm text-emerald-700" role="status">{isEs ? '¡Gracias! Tu mensaje fue enviado. Te responderé por mail.' : 'Thank you! Your message was sent. I’ll reply by email.'}</p>}
        {status === 'error' && <p className="text-sm text-red-700" role="alert">{isEs ? 'No se pudo enviar. Intentá nuevamente o escribime a ' : 'Your message could not be sent. Please try again or email '}<a href={`mailto:${contactEmail}`} className="underline">{contactEmail}</a>.</p>}
      </div>
    </form>
  );
}
