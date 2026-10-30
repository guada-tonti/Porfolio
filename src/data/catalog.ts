import type { DisciplineId, ProjectTypeId, OriginId } from './tags';

export interface CatalogProject {
  id: string;
  title: string;
  localizedTitle?: { en: string; es: string };
  tagline?: { en: string; es: string };
  year: string;
  description: {
    en: string;
    es: string;
  };
  disciplines: DisciplineId[];
  types: ProjectTypeId[];
  origin: OriginId;
  // Original metadata retained for search and classification review.
  legacyMetadata: { categories: string[]; type: string; tags: string[] };
  thumbnailBg: string;
  slug?: string;
  icon?: string;
  badge?: string;
  behanceGallery?: string;
  overview?: { en: string; es: string };
  heroDescription?: { en: string; es: string };
  sourceUrl?: string;
  video?: { src: string; poster: string };
}

export const allCatalogProjects: CatalogProject[] = [
  {
    id: 'aerolab-home', slug: 'aerolab-home', behanceGallery: 'aerolab-home',
    title: 'UX/UI — Aerolab’s home', year: '2018',
    description: { en: 'Aerolab website redesign.', es: 'Rediseño del sitio web de Aerolab.' },
    overview: { en: 'Aerolab website redesign.', es: 'Rediseño de sitio web de Aerolab.' },
    disciplines: ['product-design', 'web-design'], types: ['website'], origin: 'work',
    sourceUrl: 'https://www.behance.net/gallery/65718383/UXUI-Aerolabs-home-(2018)',
    legacyMetadata: { categories: [], type: 'Work', tags: ['Aerolab', 'UX', 'UI', 'Behance integration test'] },
    thumbnailBg: 'bg-zinc-100',
  },
  {
    id: 'poaps-design-web3-communities', slug: 'poaps-design-web3-communities', behanceGallery: 'poaps-design-web3-communities',
    title: 'POAPs Design for Web3 Communities', year: '2020–2021',
    description: { en: 'Design of digital collectible badges for POAP and Web3 communities.', es: 'Diseño de insignias digitales coleccionables para POAP y comunidades Web3.' },
    overview: {
      en: "Design of badges for POAP inc. during 2020 and 2021.\n\nWhat is a POAP?\nPOAPs are digital mementos, minted in celebration of life's remarkable moments. These badges are Non Fungible Tokens ( NFT ).\nEach POAP is a gift from an issuer to collectors, in celebration of a special shared memory. By minting these memories to the blockchain, collectors build a rich tapestry of tokenized experiences which unlock a world of possibilities.",
      es: 'Diseño de insignias para POAP inc. durante 2020 y 2021.\n\n¿Qué es un POAP?\nLos POAPs son recuerdos digitales acuñados para celebrar momentos memorables de la vida. Estas insignias son tokens no fungibles (NFT).\nCada POAP es un regalo de un emisor a los coleccionistas para celebrar un recuerdo especial compartido. Al acuñar estos recuerdos en la blockchain, los coleccionistas construyen un rico entramado de experiencias tokenizadas que abren un mundo de posibilidades.',
    },
    disciplines: ['graphic-design', 'illustration'], types: [], origin: 'work',
    sourceUrl: 'https://www.behance.net/gallery/124445957/POAPs-Design-for-Web3-Communities',
    legacyMetadata: { categories: [], type: 'Work', tags: ['POAP', 'Web3', 'Collectibles', 'Behance integration test'] },
    thumbnailBg: 'bg-zinc-100',
  },

  {
    id: 'philatelist',
    tagline: { en: 'Collectibles Studio', es: 'Collectibles Studio' },
    video: { src: '/videos/philatelist-demo.mp4', poster: '/images/projects/philatelist-video-poster.jpg' },
    slug: 'philatelist',
    title: 'Philatelist',
    year: '',
    description: {
      en: 'A platform for designing digital collectibles at scale',
      es: 'Plataforma para diseño en masa de coleccionables digitales',
    },
    heroDescription: {
      en: "An AI-powered internal tool that helped a team of only three designers create 500 location-based digital collectibles and meet a very tight deadline.",
      es: "Una herramienta interna con IA que permitió a un equipo de solo tres diseñadores crear 500 coleccionables digitales basados en lugares reales y cumplir con un plazo de entrega muy ajustado.",
    },
    overview: {
      en: "At POAP, our design team was challenged to produce **hundreds of digital collectible stamps** for an experimental product, all under a tight deadline (two weeks!). Each stamp had to represent a real-world location, look visually appealing, follow a consistent visual system, and be delivered as a properly named, production-ready PNG.\n\nOur initial experiments with ComfyUI weren't getting us there fast enough, so **I took a different approach and built Philatelist using AI-assisted development.** The app allowed designers to import location lists, generate illustrations in bulk using shared visual templates, review and regenerate individual results, and export everything with transparent stamp-shaped borders and standardized filenames.\n\n**The result:** Our team of three designers produced **500 collectibles and met the deadline**. By embedding creative and technical decisions into reusable templates, we simplified production enough for a non-designer to help during the final week. Some illustrations still needed manual corrections, but the tool turned a challenging production task into a manageable, collaborative workflow.",
      es: "En POAP, nuestro equipo de diseño recibió el desafío de producir **cientos de estampas digitales coleccionables** para un producto experimental, con muy poco tiempo disponible (¡dos semanas!). Cada estampa debía representar un lugar real, resultar visualmente atractiva, mantener un sistema visual consistente y entregarse como un PNG correctamente nombrado y listo para implementar.\n\nLos primeros experimentos con ComfyUI no estaban dando resultados suficientemente buenos en los tiempos disponibles, así que **decidí cambiar de enfoque y construir Philatelist mediante desarrollo asistido por IA.** La herramienta permitía importar listas de ubicaciones, generar ilustraciones en lote usando templates visuales compartidos, revisar y regenerar resultados individuales, y exportar archivos con bordes de estampa transparentes y nombres estandarizados.\n\n**El resultado:** Nuestro equipo de tres diseñadores produjo **500 coleccionables y cumplió con la fecha de entrega**. Al incorporar las decisiones creativas y técnicas dentro de templates reutilizables, simplificamos el proceso hasta el punto de que una persona sin experiencia en diseño pudo colaborar durante la última semana. Algunas ilustraciones todavía requirieron correcciones manuales, pero logramos convertir un desafío de producción complejo en un flujo de trabajo manejable y colaborativo.",
    },
    disciplines: ['creative-coding', 'ai-creative'],
    types: ['web-app'],
    origin: 'work',
    legacyMetadata: { categories: [], type: 'Work', tags: ['POAP', 'AI', 'IA', 'ComfyUI', 'Stamps', 'Estampas', 'Batch generation'] },
    thumbnailBg: 'bg-zinc-100',
  },
  {
    id: 'poap-design-system',
    slug: 'poap-design-system',
    behanceGallery: 'poap-design-system',
    title: 'POAP Design System',
    year: '',
    description: {
      en: 'A unified design system for POAP, with typography, spacing, color, design tokens and consistent components.',
      es: 'Un sistema de diseño unificado para POAP: tipografía, espaciado, color, design tokens y componentes consistentes.',
    },
    overview: {
      en: 'At POAP, I reviewed and systematized the existing styles, organized the typography, spacing and color systems, created design tokens and unified components to establish a shared foundation for the product interfaces.\n\nDesigned scalable, reusable UI component libraries for web applications, including variants, states, responsive behaviors, and design tokens.',
      es: 'En POAP me encargué de revisar y sistematizar los estilos existentes, ordenar los sistemas tipográficos, de espaciado y de color, crear los design tokens y unificar los componentes para establecer una base compartida entre las interfaces del producto.\n\nDiseñé bibliotecas de componentes de interfaz escalables y reutilizables para aplicaciones web, incluyendo variantes, estados, comportamientos responsive y design tokens.',
    },
    disciplines: ['product-design', 'design-system'],
    types: [],
    origin: 'work',
    sourceUrl: 'https://www.behance.net/gallery/214960327/Design-System-Web3-Platform',
    legacyMetadata: { categories: [], type: 'Work', tags: ['POAP', 'Design System', 'Sistema de diseño', 'Design tokens', 'UI', 'Typography', 'Components'] },
    thumbnailBg: 'bg-zinc-100',
  },
  {
    id: 'poap-moments-redesign',
    slug: 'poap-moments-redesign',
    title: 'POAP Moments Redesign',
    year: '2024',
    description: {
      en: 'A redesign of POAP Moments, a product for sharing photos, videos and phrases linked to a POAP.',
      es: 'Rediseño de POAP Moments, un producto para subir fotos, videos y frases vinculados a un POAP.',
    },
    overview: {
      en: 'POAP Moments was a POAP product where people could upload moments, including photos, videos and phrases, linked to a POAP. This project focuses on the redesign of that experience.',
      es: 'POAP Moments era un producto de POAP que permitía subir momentos —fotos, videos y frases— vinculados a un POAP. Este proyecto reúne el rediseño de esa experiencia.',
    },
    disciplines: ['product-design'],
    types: ['web-app'],
    origin: 'work',
    legacyMetadata: { categories: [], type: 'Work', tags: ['POAP', 'Moments', 'Redesign', 'Rediseño', 'Photos', 'Videos', 'Momentos'] },
    thumbnailBg: 'bg-zinc-100',
  },
  {
    id: 'remera-chenziqiang-argentina',
    slug: 'remera-chenziqiang-argentina',
    title: 'Remera ChenZiqiang Argentina',
    localizedTitle: { en: 'T-shirt ChenZiqiang Argentina', es: 'Remera ChenZiqiang Argentina' },
    year: '2026',
    description: {
      en: 'Freelance T-shirt design for a tai chi school to mark a visit from its master.',
      es: 'Diseño freelance de una remera para una escuela de taichi con motivo de la visita de su maestro.',
    },
    disciplines: ['graphic-design', 'illustration'],
    types: [],
    origin: 'work',
    legacyMetadata: {
      categories: [],
      type: 'Work',
      tags: ['ChenZiqiang', 'Chen Ziqiang', 'Argentina', 'Taichi', 'Tai chi', 'Taijiquan', 'Remera', 'T-shirt', 'Freelance'],
    },
    thumbnailBg: 'bg-[#eef4f4]',
  },
  {
    id: 'guitarravisual',
    slug: 'guitarravisual',
    title: 'GuitarraVisual',
    year: '2026',
    description: {
      en: 'Your daily guitar practice, visual and timed',
      es: 'Tu práctica diaria de guitarra, visual y temporizada',
    },
    disciplines: ['product-design', 'creative-coding', 'product-research-growth'],
    types: ['web-app'],
    origin: 'side-project',
    legacyMetadata: {
    categories: ['Product Design', 'Interactive', 'Tools'],
    type: 'Side Project',
    tags: ['Product Design', 'Web App', 'Interactive', 'Side Project', 'Music'],
    },
    thumbnailBg: 'bg-[#121316]',
    icon: '🎸',
  },
  {
    id: 'bigotes',
    slug: 'bigotes',
    title: 'Bigotes',
    year: '2026',
    description: {
      en: 'A simple and friendly health tracker for your pets.',
      es: 'Un registro de salud simple y amigable para tus mascotas.',
    },
    disciplines: ['product-design', 'creative-coding'],
    types: ['web-app'],
    origin: 'side-project',
    legacyMetadata: {
    categories: ['Product Design', 'Tools'],
    type: 'Side Project',
    tags: ['Product Design', 'Web App', 'Tools', 'Side Project', 'Pets'],
    },
    thumbnailBg: 'bg-[#f4eefb]',
    icon: '🐾',
  },
  {
    id: 'health-clarity',
    slug: 'health-clarity',
    title: 'Health Clarity',
    year: '2026',
    description: {
      en: 'A personal health tracker to make sense of your data and feel in control.',
      es: 'Seguimiento de salud personal para entender tus métricas y sentir el control.',
    },
    disciplines: ['product-design', 'creative-coding'],
    types: ['web-app', 'tool'],
    origin: 'side-project',
    legacyMetadata: {
    categories: ['Product Design', 'Tools'],
    type: 'Side Project',
    tags: ['Product Design', 'Web App', 'Tools', 'Side Project', 'Health'],
    },
    thumbnailBg: 'bg-[#e9f4fb]',
    icon: '📊',
  },
  {
    id: 'family-photos',
    slug: 'family-photos',
    title: 'Family Photos',
    year: '2025',
    description: {
      en: 'Organize, explore and share family photos and stories.',
      es: 'Organiza, explora y comparte fotografías e historias familiares.',
    },
    disciplines: ['product-design', 'creative-coding'],
    types: ['web-app', 'tool'],
    origin: 'side-project',
    legacyMetadata: {
    categories: ['Product Design', 'Tools'],
    type: 'Side Project',
    tags: ['Product Design', 'Web App', 'Tools', 'Side Project', 'Personal'],
    },
    thumbnailBg: 'bg-[#f8f6f0]',
    icon: '🌿',
  },
  {
    id: 'saturno-v',
    slug: 'saturno-v',
    title: 'Saturno V',
    year: '2026',
    description: {
      en: 'An interactive 3D experience about the Apollo 11 mission.',
      es: 'Una experiencia 3D interactiva sobre la histórica misión Apolo 11.',
    },
    disciplines: ['web-design', 'creative-coding', 'data-visualization'],
    types: ['interactive-experience'],
    origin: 'experimental',
    legacyMetadata: {
    categories: ['Web Design', 'Interactive'],
    type: 'Experimental',
    tags: ['Web Design', '3D', 'Interactive', 'Side Project', 'Experimental'],
    },
    thumbnailBg: 'bg-[#0b1329]',
    icon: '🚀',
  },
  {
    id: 'arcadeta',
    title: 'Arcadeta',
    year: '2025',
    description: {
      en: 'A portable arcade for events and special occasions.',
      es: 'Un arcade portátil diseñado especialmente para eventos y ocasiones especiales.',
    },
    disciplines: ['product-design', 'creative-coding'],
    types: ['game', 'irl-experience'],
    origin: 'side-project',
    legacyMetadata: {
    categories: ['Product Design', 'Games'],
    type: 'Side Project',
    tags: ['Product Design', 'Games', 'Hardware', 'Side Project', 'Events'],
    },
    thumbnailBg: 'bg-[#ffd3e2]',
    icon: '👾',
  },
  {
    id: 'goal-scream-challenge',
    title: 'Goal Scream Challenge',
    localizedTitle: { en: 'Goal Scream Challenge', es: 'Grito de Gol' },
    year: '2025',
    description: {
      en: 'An interactive game for real events to measure your scream.',
      es: 'Un juego interactivo para eventos en vivo que mide la potencia de tu grito de gol.',
    },
    disciplines: ['product-design', 'creative-coding'],
    types: ['game', 'irl-experience'],
    origin: 'work',
    legacyMetadata: {
    categories: ['Product Design', 'Games', 'Interactive'],
    type: 'Work',
    tags: ['Product Design', 'Games', 'Interactive', 'Work', 'Events'],
    },
    thumbnailBg: 'bg-[#181818]',
    icon: '🗣️',
  },
  {
    id: 'ecosistema-colaborativo',
    title: 'Ecosistema colaborativo',
    year: '2025',
    description: {
      en: 'A multiplayer game where each player is a natural element, creating a living ecosystem.',
      es: 'Un juego multijugador donde cada participante es un elemento natural y crean un ecosistema vivo.',
    },
    disciplines: ['creative-coding'],
    types: ['game'],
    origin: 'experimental',
    legacyMetadata: {
    categories: ['Games', 'Interactive', 'Illustration'],
    type: 'Experimental',
    tags: ['Games', 'Interactive', 'Web App', 'Side Project', 'Experimental'],
    },
    thumbnailBg: 'bg-[#d8effb]',
    icon: '🌍',
  },
  {
    id: 'flete-express',
    title: 'Flete Express',
    year: '2025',
    description: {
      en: 'A Tetris-style game to load furniture in 60 seconds.',
      es: 'Un juego estilo Tetris para cargar muebles en un camión en 60 segundos.',
    },
    disciplines: ['creative-coding'],
    types: ['game'],
    origin: 'side-project',
    legacyMetadata: {
    categories: ['Games', 'Interactive', 'Illustration'],
    type: 'Side Project',
    tags: ['Games', 'Interactive', 'Illustration', 'Side Project', 'Experimental'],
    },
    thumbnailBg: 'bg-[#e7f5fd]',
    icon: '🚚',
  },
];
