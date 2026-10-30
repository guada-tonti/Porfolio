import { MetadataRoute } from 'next';
import { projects } from '@/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://guadatonti.com';
  const locales = ['en', 'es'];
  const routes = ['', '/about', '/resume', '/contact', '/work', '/work/remera-chenziqiang-argentina', '/work/health-clarity', '/work/philatelist', '/work/poap-design-system', '/work/poap-moments-redesign'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    });

    projects.forEach((proj) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/work/${proj.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}
