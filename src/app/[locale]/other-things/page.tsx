import { redirect } from 'next/navigation';

interface OtherThingsRedirectProps {
  params: Promise<{ locale: string }>;
}

export default async function OtherThingsRedirect({ params }: OtherThingsRedirectProps) {
  const { locale } = await params;
  redirect(`/${locale}/work`);
}
