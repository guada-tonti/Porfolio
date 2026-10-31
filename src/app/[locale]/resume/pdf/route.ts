import { renderResumePdf } from '@/lib/resume-pdf/render';

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'es') return new Response('Not found', { status: 404 });
  const bytes = await renderResumePdf(locale);
  const filename = locale === 'es' ? 'Guada_Tonti_CV_ES.pdf' : 'Guada_Tonti_Resume_EN.pdf';
  return new Response(new Uint8Array(bytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
