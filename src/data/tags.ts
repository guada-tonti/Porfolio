// Stable IDs, translations and exact palette shared by filters and cards.
export const catalogTags = [
  { id: 'product-design', dimension: 'discipline', label: { en: 'Product Design', es: 'Product Design' }, background: '#ECECF0', color: '#20202B', order: 0 },
  { id: 'graphic-design', dimension: 'discipline', label: { en: 'Graphic Design', es: 'Diseño Gráfico' }, background: '#ECECF0', color: '#20202B', order: 1 },
  { id: 'web-design', dimension: 'discipline', label: { en: 'Web Design', es: 'Web Design' }, background: '#ECECF0', color: '#20202B', order: 2 },
  { id: 'illustration', dimension: 'discipline', label: { en: 'Illustration', es: 'Ilustración' }, background: '#ECECF0', color: '#20202B', order: 3 },
  { id: 'creative-coding', dimension: 'discipline', label: { en: 'AI-Assisted Development', es: 'Desarrollo con IA' }, background: '#ECECF0', color: '#20202B', order: 4 },
  { id: 'ai-creative', dimension: 'discipline', label: { en: 'AI Creative', es: 'AI Creative' }, background: '#ECECF0', color: '#20202B', order: 5 },
  { id: 'motion', dimension: 'discipline', label: { en: 'Motion', es: 'Motion' }, background: '#ECECF0', color: '#20202B', order: 5.1 },
  { id: 'data-visualization', dimension: 'discipline', label: { en: 'Data Visualization', es: 'Visualización de Datos' }, background: '#ECECF0', color: '#20202B', order: 5.2 },
  { id: 'design-system', dimension: 'discipline', label: { en: 'Design System', es: 'Design System' }, background: '#ECECF0', color: '#20202B', order: 5.3 },
  { id: 'furniture-objects', dimension: 'discipline', label: { en: 'Furniture & Objects', es: 'Muebles y Objetos' }, background: '#ECECF0', color: '#20202B', order: 5.4 },
  { id: 'product-research-growth', dimension: 'discipline', label: { en: 'Product Research & Growth', es: 'Product Research & Growth' }, background: '#ECECF0', color: '#20202B', order: 5.5 },
  { id: 'web-app', dimension: 'type', label: { en: 'Web App', es: 'Aplicación Web' }, background: '#ECECF0', color: '#20202B', order: 6 },
  { id: 'website', dimension: 'type', label: { en: 'Website', es: 'Sitio Web' }, background: '#ECECF0', color: '#20202B', order: 7 },
  { id: 'game', dimension: 'type', label: { en: 'Game', es: 'Juego' }, background: '#ECECF0', color: '#20202B', order: 8 },
  { id: 'interactive-experience', dimension: 'type', label: { en: 'Interactive Experience', es: 'Experiencia Interactiva' }, background: '#ECECF0', color: '#20202B', order: 9 },
  { id: 'tool', dimension: 'type', label: { en: 'Tool', es: 'Herramienta' }, background: '#ECECF0', color: '#20202B', order: 10 },
  { id: 'irl-experience', dimension: 'type', label: { en: 'IRL Experience', es: 'Experiencia IRL' }, background: '#ECECF0', color: '#20202B', order: 11 },
  { id: 'work', dimension: 'origin', label: { en: 'Work', es: 'Trabajo' }, background: '#ECECF0', color: '#20202B', order: 12 },
  { id: 'side-project', dimension: 'origin', label: { en: 'Side Project', es: 'Proyecto Personal' }, background: '#ECECF0', color: '#20202B', order: 13 },
  { id: 'experimental', dimension: 'origin', label: { en: 'Experimental', es: 'Experimental' }, background: '#ECECF0', color: '#20202B', order: 14 },
 ] as const;
export type CatalogTag = typeof catalogTags[number];
export type DisciplineId = Extract<CatalogTag, { dimension: 'discipline' }>['id'];
export type ProjectTypeId = Extract<CatalogTag, { dimension: 'type' }>['id'];
export type OriginId = Extract<CatalogTag, { dimension: 'origin' }>['id'];
export type CategoryId = DisciplineId | ProjectTypeId;
export const catalogCategories = catalogTags.filter(tag => tag.dimension !== 'origin');
export const catalogOrigins = catalogTags.filter(tag => tag.dimension === 'origin');
export const tagById = Object.fromEntries(catalogTags.map(tag => [tag.id, tag])) as Record<CatalogTag['id'], CatalogTag>;
