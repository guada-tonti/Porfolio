// Change NEXT_PUBLIC_SITE_URL when the custom domain becomes available.
// Keep a verified production fallback for local downloads and preview deployments.
export const productionSiteUrl = 'https://porfolio-ashy-nine.vercel.app';

export function getPublicSiteUrl(): URL {
  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || productionSiteUrl);
  if (url.protocol !== 'https:' || url.username || url.password || /^(localhost|127\.|0\.|192\.168\.|10\.|\[?::1)/i.test(url.hostname)) {
    throw new Error('NEXT_PUBLIC_SITE_URL must be a public HTTPS origin.');
  }
  url.pathname = '/'; url.search = ''; url.hash = '';
  return url;
}
