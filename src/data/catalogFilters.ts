import type { CatalogProject } from './catalog';
import { tagById, type CategoryId, type OriginId } from './tags';

export interface CatalogFilters {
  categories: CategoryId[];
  origin: OriginId | 'all';
  query: string;
}
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
export function matchesProject(project: CatalogProject, filters: CatalogFilters) {
  const ids = [...project.disciplines, ...project.types, project.origin];
  const searchable = [project.title, ...Object.values(project.localizedTitle ?? {}), ...Object.values(project.description), ...project.legacyMetadata.tags,
    ...ids.flatMap(id => Object.values(tagById[id].label))].join(' ');
  return (!filters.categories.length || filters.categories.some(id => ids.includes(id)))
    && (filters.origin === 'all' || project.origin === filters.origin)
    && normalize(searchable).includes(normalize(filters.query));
}
// Faceted counts: each row respects search and the other row's selections.
export function countCategory(projects: CatalogProject[], filters: CatalogFilters, id?: CategoryId) {
  return projects.filter(project => matchesProject(project, { ...filters, categories: id ? [id] : [] })).length;
}
export function countOrigin(projects: CatalogProject[], filters: CatalogFilters, origin: OriginId | 'all') {
  return projects.filter(project => matchesProject(project, { ...filters, origin })).length;
}
