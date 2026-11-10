// Canonical portfolio domain: downloaded resumes must never link to a preview deployment.
export const productionSiteUrl = 'https://guadatonti.com';

export function getPublicSiteUrl(): URL {
  return new URL(productionSiteUrl);
}
