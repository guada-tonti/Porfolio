import { MetadataRoute } from 'next';
import { allCatalogProjects, draftProjectSlugs } from '@/data/catalog';
import { projects } from '@/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://guadatonti.com';
  const locales = ['en', 'es'];
  const routes = ['', '/about', '/resume', '/contact', '/work'];
  const projectSlugs = new Set([...projects.filter(project => !draftProjectSlugs.has(project.slug)).map(project => project.slug), ...allCatalogProjects.flatMap(project => project.slug ? [project.slug] : [])]);

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

    projectSlugs.forEach((slug) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/work/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}
