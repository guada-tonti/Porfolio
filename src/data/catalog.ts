import { importedBehanceProjects } from './behanceProjects';
import type { DisciplineId, ProjectTypeId, OriginId } from './tags';

export interface CatalogProject {
  id: string;
  draft?: boolean;
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
  tools?: { id: string; name: string }[];
  caseStudy?: { role?: { en: string; es: string }; summary?: { en: string; es: string }; challenge?: { en: string; es: string }; process?: { en: string; es: string }; results?: { en: string; es: string } };
  heroDescription?: { en: string; es: string };
  sourceUrl?: string;
  video?: { src: string; poster: string };
  images?: { src: string; width: number; height: number; alt: { en: string; es: string } }[];
}

const catalogProjects: CatalogProject[] = [
  {
    id: 'aerolab-home', slug: 'aerolab-home', behanceGallery: 'aerolab-home',
    images: [{ src: '/images/projects/behance-test/aerolab-home/hero-iphone-xs.png', width: 1521, height: 1034, alt: { en: 'Aerolab homepage design shown on desktop and mobile', es: 'Diseño de la homepage de Aerolab en desktop y mobile' } }],
    tools: [{ id: 'sketch', name: 'Sketch' }],
    title: 'UX/UI - Aerolab’s home', year: '2018',
    description: { en: 'Aerolab website redesign.', es: 'Rediseño del sitio web de Aerolab.' },
    overview: { en: 'Aerolab is a digital agency that designs and develops products for web and mobile. This project focused on redesigning its homepage in 2018, working alongside the marketing team to clarify the agency’s story and give its key projects a more prominent place.', es: 'Aerolab es una agencia digital que diseña y desarrolla productos para web y mobile. Este proyecto abordó el rediseño de su homepage en 2018, en colaboración con el equipo de marketing, para contar mejor la propuesta de la agencia y dar más protagonismo a sus proyectos principales.' },
    caseStudy: {
      role: { en: "UX/UI Design · Wireframing · Responsive Web Design", es: "Diseño UX/UI · Wireframing · Diseño web responsive" },
      summary: { en: "I worked alongside the marketing team to rethink the homepage’s content hierarchy and visual presentation. The redesign replaced a compact project grid with a more linear story, giving selected case studies dedicated sections and adapting the experience for desktop and mobile.", es: "Trabajé junto con el equipo de marketing para repensar la jerarquía del contenido y la presentación visual de la homepage. El rediseño reemplazó una grilla compacta de proyectos por un relato más lineal, con secciones dedicadas a casos seleccionados y una experiencia adaptada a desktop y mobile." },
      challenge: { en: "The homepage needed to communicate Aerolab’s value more clearly and give greater visual prominence to key projects. The goal was to support the attraction of the clients the agency wanted to work with: large corporations, fintech companies and startups.\n\nThe challenge was to connect those priorities in one coherent narrative, showing the agency’s capabilities through its work rather than presenting every project with the same visual weight.", es: "La homepage necesitaba comunicar con más claridad el valor de Aerolab y dar mayor protagonismo visual a sus proyectos clave. El objetivo era acompañar la atracción de los clientes con los que la agencia buscaba trabajar: grandes empresas, fintech y startups.\n\nEl desafío fue conectar esas prioridades en un relato coherente y mostrar las capacidades de la agencia a través de su trabajo, en lugar de presentar todos los proyectos con el mismo peso visual." },
      process: { en: "I explored the page structure through sketches and wireframes. The proposed sequence started with a hero combining a reel and the agency’s core message, followed by three featured projects representing corporate, fintech and startup work. Each project included a title, description, imagery and a call to action.\n\nThe rest of the page brought together client logos, links to services and the blog, and a contact section. This created a path from the agency’s proposition to examples of its work and an invitation to get in touch.\n\nFor the UI, I expanded the homepage palette with pastel tones derived from each featured project’s identity. Alternating text and product imagery gave the desktop layout rhythm, while the mobile version stacked the content into a single column. The orange brand color remained an accent and anchored the final contact section.", es: "Exploré la estructura mediante bocetos y wireframes. La secuencia propuesta comenzaba con un hero que combinaba un reel y el mensaje central de la agencia, seguido por tres proyectos destacados que representaban trabajo para empresas, fintech y startups. Cada caso incluía título, descripción, imágenes y una llamada a la acción.\n\nEl resto de la página reunía logos de clientes, accesos a servicios y al blog, y una sección de contacto. Así se construyó un recorrido desde la propuesta de la agencia hasta ejemplos concretos de su trabajo y una invitación a conversar.\n\nPara la UI, amplié la paleta de la homepage con tonos pastel derivados de la identidad de cada proyecto destacado. La alternancia entre texto e imágenes de producto aportó ritmo en desktop, mientras que la versión mobile organizó el contenido en una sola columna. El naranja de la marca se mantuvo como acento y dio protagonismo a la sección final de contacto." },
      results: { en: "The final design presented a consistent desktop and mobile experience, with a clearer content sequence and dedicated space for Banco Galicia, Ualá and Raised Real. Project-specific color palettes and larger product imagery helped distinguish each case while keeping the page connected to Aerolab’s identity.\n\nThe main takeaway was how content hierarchy and visual emphasis can work together to communicate an agency’s positioning: the choice and order of projects are as important as the way they look.", es: "El diseño final presentó una experiencia consistente en desktop y mobile, con una secuencia de contenido más clara y espacios dedicados a Banco Galicia, Ualá y Raised Real. Las paletas propias de cada caso y las imágenes de producto de mayor tamaño ayudaron a diferenciar los proyectos sin perder la identidad de Aerolab.\n\nEl principal aprendizaje fue cómo la jerarquía del contenido y el énfasis visual pueden trabajar juntos para comunicar el posicionamiento de una agencia: la selección y el orden de los proyectos importan tanto como su presentación." },
    },
    disciplines: ['product-design', 'web-design'], types: ['website'], origin: 'work',
    sourceUrl: 'https://www.behance.net/gallery/65718383/UXUI-Aerolabs-home-(2018)',
    legacyMetadata: { categories: [], type: 'Work', tags: ['Aerolab', 'UX', 'UI', 'Behance integration test'] },
    thumbnailBg: 'bg-zinc-100',
  },
  {
    id: 'poaps-design-web3-communities', slug: 'poaps-design-web3-communities', behanceGallery: 'poaps-design-web3-communities',
    tools: [{ id: 'illustrator', name: 'Illustrator' }],
    title: 'POAPs Design for Web3 Communities', year: '2020-2021',
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
    video: { src: '/videos/philatelist-demo.mp4', poster: '/images/projects/philatelist-video-poster.jpg' },
    slug: 'philatelist',
    title: 'Philatelist, Collectibles Studio',
    year: '',
    description: {
      en: 'A platform for designing digital collectibles at scale',
      es: 'Plataforma para diseño en masa de coleccionables digitales',
    },
    heroDescription: {
      en: "An AI-powered internal tool that helped a team of only three designers create 500 location-based digital collectibles and meet a very tight deadline.",
      es: "Una herramienta interna que permitió a un equipo de tres diseñadores crear 500 coleccionables digitales de locaciones reales en solo dos semanas.",
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
    tools: [{ id: 'figma', name: 'Figma' }],
    slug: 'poap-design-system',
    behanceGallery: 'poap-design-system',
    title: 'POAP Design System',
    year: '2022-2023',
    description: {
      en: 'A unified design system for POAP, with typography, spacing, color, design tokens and consistent components.',
      es: 'Un sistema de diseño unificado para POAP: tipografía, espaciado, color, design tokens y componentes consistentes.',
    },
    overview: {
      en: 'At POAP, I reviewed and systematized the existing styles, organized the typography, spacing and color systems, created design tokens and unified components to establish a shared foundation for the product interfaces.\n\nDesigned scalable, reusable UI component libraries for web applications, including variants, states, responsive behaviors, and design tokens.',
      es: 'En POAP me encargué de revisar y sistematizar los estilos existentes, ordenar los sistemas tipográficos, de espaciado y de color, crear los design tokens y unificar los componentes para establecer una base compartida entre las interfaces del producto.\n\nDiseñé bibliotecas de componentes de interfaz escalables y reutilizables para aplicaciones web, incluyendo variantes, estados, comportamientos responsive y design tokens.',
    },
    caseStudy: {
      role: { en: "Design System · UI Audit · Design Tokens · Component Libraries · Documentation", es: "Design System · Auditoría UI · Design Tokens · Bibliotecas de componentes · Documentación" },
      summary: { en: "I turned scattered styles and components into a shared design foundation for POAP’s web products. Working with frontend engineering, I organized the visual foundations, defined primitive and semantic tokens, rebuilt reusable components and documented how to use and maintain the system.", es: "Transformé estilos y componentes dispersos en una base de diseño compartida para los productos web de POAP. En colaboración con frontend, organicé los fundamentos visuales, definí tokens primitivos y semánticos, reconstruí componentes reutilizables y documenté cómo usar y mantener el sistema." },
      challenge: { en: "POAP needed to move quickly and adapt as its blockchain products evolved, but the team had no single source of truth for interface decisions. Ad hoc choices slowed down everyday work and created inconsistencies across products.\n\nFiles and components depended heavily on the designers who originally created them, making collaboration and onboarding harder. Experimental products also lacked shared UI guidelines, leading to legibility issues, inconsistent error handling and patterns used out of context. The challenge was to introduce consistency without limiting the flexibility the team needed.", es: "POAP necesitaba avanzar rápido y adaptarse a medida que evolucionaban sus productos en blockchain, pero el equipo no tenía una fuente única de referencia para las decisiones de interfaz. Las decisiones aisladas demoraban el trabajo cotidiano y generaban inconsistencias entre productos.\n\nLos archivos y componentes dependían demasiado de quienes los habían creado, lo que dificultaba la colaboración y la incorporación de otras personas. Los productos experimentales también carecían de criterios compartidos de UI, con problemas de legibilidad, manejo de errores y uso de patrones fuera de contexto. El desafío era aportar consistencia sin limitar la flexibilidad que necesitaba el equipo." },
      process: { en: "I started with a UI audit of the Figma files and live products, identified recurring problems and organized a plan around the team’s main needs.\n\nI reviewed color and typography for consistency and accessibility, working with frontend to establish cohesive scales. I defined spacing and responsive layout guidelines, organized the icon library and introduced primitive and semantic tokens. Scoped variables narrowed the available choices to the relevant values, while semantic naming made their intended use clearer and prepared the system for future themes and modes.\n\nI consolidated duplicate components and rebuilt key elements with variants, states and responsive behaviors. Usage guidelines, do’s and don’ts, reusable sections and page templates helped the team apply the system consistently.\n\nTo support ongoing maintenance, I reorganized the Figma files, standardized file templates and introduced a changelog and feedback mechanism. Additional guidelines, including error handling, extended the system beyond its visual foundations.", es: "Empecé con una auditoría de los archivos de Figma y los productos publicados para identificar problemas recurrentes y organizar un plan según las principales necesidades del equipo.\n\nRevisé color y tipografía con foco en consistencia y accesibilidad, y trabajé con frontend para establecer escalas coherentes. Definí criterios de espaciado y layouts responsive, organicé la biblioteca de íconos e incorporé tokens primitivos y semánticos. El alcance de las variables limitó las opciones a los valores pertinentes, mientras que los nombres semánticos aclararon su uso y prepararon el sistema para futuros temas y modos.\n\nUnifiqué componentes duplicados y reconstruí los elementos principales con variantes, estados y comportamientos responsive. Las pautas de uso, los ejemplos de qué hacer y qué evitar, las secciones reutilizables y los templates de página ayudaron a aplicar el sistema de forma consistente.\n\nPara facilitar el mantenimiento, reorganicé los archivos de Figma, estandaricé templates de archivo e incorporé un registro de cambios y un mecanismo de feedback. Otras pautas, como el manejo de errores, ampliaron el alcance del sistema más allá de sus fundamentos visuales." },
      results: { en: "The system brought together **100+ components and 80+ design tokens**, giving the team a shared foundation for building and evolving POAP’s interfaces. Reusable patterns and clearer documentation reduced repeated decisions and reliance on individual designers.\n\nThe case study reports **2× faster design workflows, 60% fewer inconsistencies across platforms and 40% fewer design decisions**.\n\nA key takeaway was that a design system needs more than a component library: clear naming, guidance, file organization and a way to collect feedback are essential to making it useful in everyday work and sustainable as products evolve.", es: "El sistema reunió **más de 100 componentes y más de 80 design tokens**, y le dio al equipo una base compartida para construir y hacer evolucionar las interfaces de POAP. Los patrones reutilizables y una documentación más clara redujeron las decisiones repetidas y la dependencia de diseñadores específicos.\n\nEl caso de estudio reporta **flujos de diseño dos veces más rápidos, un 60% menos de inconsistencias entre plataformas y un 40% menos de decisiones de diseño**.\n\nUn aprendizaje clave fue que un sistema de diseño necesita más que una biblioteca de componentes: una nomenclatura clara, pautas de uso, archivos organizados y una forma de recibir feedback son fundamentales para que resulte útil en el trabajo cotidiano y pueda acompañar la evolución de los productos." },
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
    heroDescription: {
      en: 'Redesigning how people discover, share, and preserve memories through POAP Moments, a blockchain-based platform for shared experiences.',
      es: 'Rediseñando cómo las personas descubren, comparten y guardan momentos en POAP Moments, la plataforma blockchain para preservar experiencias.',
    },
    tools: [{ id: 'figma', name: 'Figma' }, { id: 'rive', name: 'Rive' }, { id: 'notion', name: 'Notion' }],
    caseStudy: {
      role: { en: 'Product Redesign · Motion · Design Handoff · Design QA', es: 'Product Redesign · Motion · Design Handoff · Design QA' },
      summary: { en: "I worked alongside product and engineering to rethink how people browse, discover and publish Moments. The redesign covered the site structure, key user flows, the feed and Moment detail views, with design handoff and QA to support implementation.", es: "Trabajé junto con producto e ingeniería para repensar cómo las personas exploran, descubren y publican Moments. El rediseño abarcó la estructura del sitio, los flujos principales, el feed y las vistas de detalle, con handoff y QA de diseño para acompañar la implementación." },
      challenge: { en: "The initial audit revealed unclear navigation hierarchy, a single-column feed that showed little content, and a fragmented experience that separated audio from other media. Publishing involved unnecessary steps and offered limited feedback, while there were few paths to discover related events, creators or content.\n\nThe challenge was to put content first, simplify navigation and contribution, and bring different media into one coherent experience without losing the playful character of the product.", es: "La auditoría inicial mostró una navegación sin jerarquía clara, un feed de una sola columna que mostraba poco contenido y una experiencia fragmentada que separaba el audio de los demás formatos. Publicar requería pasos innecesarios y ofrecía poco feedback; también había pocas formas de descubrir eventos, creadores o contenido relacionado.\n\nEl desafío fue poner el contenido en primer plano, simplificar la navegación y la publicación, e integrar los distintos formatos en una experiencia coherente sin perder el carácter lúdico del producto." },
      process: { en: "I started by reviewing the existing experience and redefining the site structure, navigation and main user flows before moving into visual design.\n\nI replaced the uniform single-column feed with a multi-column masonry layout that adapts to different media proportions. This lets more Moments appear together and gives a quicker sense of an event. Audio, text, images and links share a visual system, with color variations designed to add rhythm while maintaining contrast and legibility.\n\nI developed the Moment detail views to bring the content, its creator, linked POAP and media information together. The publishing flow lets people add files, captions, a POAP and people tags in one experience. Design handoff and QA supported the transition from the designs to implementation.", es: "Empecé por revisar la experiencia existente y redefinir la estructura del sitio, la navegación y los flujos principales antes de avanzar con el diseño visual.\n\nReemplacé el feed uniforme de una sola columna por una grilla masonry que se adapta a las proporciones de cada formato. Esto permite mostrar más Moments juntos y dar una idea más inmediata de un evento. Audio, texto, imágenes y enlaces comparten un sistema visual, con variaciones de color pensadas para aportar ritmo sin perder contraste ni legibilidad.\n\nDesarrollé las vistas de detalle para reunir el contenido, su creador, el POAP vinculado y la información del archivo. El flujo de publicación permite agregar archivos, descripciones, un POAP y etiquetas de personas en una misma experiencia. El handoff y el QA de diseño acompañaron el paso del diseño a la implementación." },
      results: { en: "The redesign brought the different Moment formats into a shared feed, established a clearer navigation hierarchy and connected browsing, detail views and publishing through a consistent visual language. The team highlighted both the visual quality and the structural coherence of the work, including the alignment between what people enter and what the product displays.\n\nA central takeaway was that visual richness depends on a clear underlying structure: flexible layouts and color variations are most useful when they help people understand and explore the content.", es: "El rediseño reunió los distintos formatos de Moments en un feed compartido, estableció una jerarquía de navegación más clara y conectó exploración, detalle y publicación mediante un lenguaje visual consistente. El equipo destacó tanto la calidad visual como la coherencia estructural del trabajo, incluida la correspondencia entre lo que las personas ingresan y lo que el producto muestra.\n\nUn aprendizaje central fue que la riqueza visual necesita una estructura clara: los layouts flexibles y las variaciones de color aportan valor cuando ayudan a entender y explorar el contenido." },
    },
    overview: { en: "POAP Moments is a platform for sharing photos, videos, audio and messages linked to a POAP, bringing memories of shared experiences together. This project focused on a complete redesign of the product to make those memories easier to explore and contribute to.", es: "POAP Moments es una plataforma para compartir fotos, videos, audios y mensajes vinculados a un POAP y reunir recuerdos de experiencias compartidas. Este proyecto abordó un rediseño integral del producto para facilitar la exploración de esos recuerdos y la participación de las personas." },
    disciplines: ['product-design', 'motion'],
    types: ['web-app'],
    origin: 'work',
    legacyMetadata: { categories: [], type: 'Work', tags: ['POAP', 'Moments', 'Redesign', 'Rediseño', 'Photos', 'Videos', 'Momentos'] },
    thumbnailBg: 'bg-zinc-100',
  },
  {
    id: 'remera-chenziqiang-argentina',
    tools: [{ id: 'illustrator', name: 'Illustrator' }, { id: 'google-flow', name: 'Flow' }, { id: 'chatgpt', name: 'ChatGPT' }],
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
    tools: [{ id: 'lovable', name: 'Lovable' }, { id: 'posthog', name: 'PostHog' }],
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
    tools: [{ id: 'lovable', name: 'Lovable' }, { id: 'gemini-image', name: 'Gemini Image' }, { id: 'gpt-image', name: 'GPT Image' }, { id: 'figma', name: 'Figma' }],
    slug: 'bigotes',
    title: 'Bigotes',
    year: '2026',
    description: {
      en: 'A simple and friendly health tracker for your cats.',
      es: 'Un registro de salud simple y amigable para tus gatos.',
    },
    disciplines: ['product-design', 'creative-coding'],
    types: ['web-app'],
    origin: 'side-project',
    legacyMetadata: {
    categories: ['Product Design', 'Tools'],
    type: 'Side Project',
    tags: ['Product Design', 'Web App', 'Tools', 'Side Project', 'Cats'],
    },
    thumbnailBg: 'bg-[#f4eefb]',
    icon: '🐾',
  },
  {
    id: 'health-clarity',
    tools: [{ id: 'lovable', name: 'Lovable' }],
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
    draft: true,
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
    tools: [{ id: 'antigravity', name: 'Antigravity' }],
    slug: 'saturno-v',
    title: 'Saturno V',
    year: '2026',
    description: {
      en: 'An interactive 3D experience about the Apollo 11 mission.',
      es: 'Una experiencia 3D interactiva sobre la histórica misión Apolo 11.',
    },
    disciplines: ['web-design', 'creative-coding', 'data-visualization'],
    types: ['interactive-experience'],
    origin: 'side-project',
    legacyMetadata: {
    categories: ['Web Design', 'Interactive'],
    type: 'Side Project',
    tags: ['Web Design', '3D', 'Interactive', 'Side Project'],
    },
    thumbnailBg: 'bg-[#0b1329]',
    icon: '🚀',
  },
  {
    id: 'arcadeta',
    draft: true,
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
    tools: [{ id: 'lovable', name: 'Lovable' }],
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
    draft: true,
    tools: [{ id: 'antigravity', name: 'Antigravity' }],
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
    draft: true,
    tools: [{ id: 'p5js', name: 'p5.js' }],
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
  {
    id: 'gig-flyers',
    tools: [{ id: 'illustrator', name: 'Illustrator' }, { id: 'google-flow', name: 'Flow' }, { id: 'chatgpt', name: 'ChatGPT' }],
    slug: 'gig-flyers',
    title: 'Gig flyers',
    localizedTitle: { en: 'Gig flyers', es: 'Flyers de conciertos' },
    year: '2026',
    description: {
      en: 'Concert flyers for my band, B.B. Queen.',
      es: 'Flyers de conciertos para mi banda, B.B. Queen.',
    },
    overview: {
      en: 'An ongoing collection of flyers I design for B.B. Queen shows.',
      es: 'Una colección en crecimiento de los flyers que diseño para los shows de B.B. Queen.',
    },
    images: [{
      src: '/images/projects/gig-flyers/quinto-sueno.png', width: 1651, height: 2184,
      alt: {
        en: 'B.B. Queen concert flyer for El Quinto Sueño, with illustrated tarot cards featuring the band members.',
        es: 'Flyer de B.B. Queen en El Quinto Sueño, con cartas de tarot ilustradas con los integrantes de la banda.',
      },
    }],
    disciplines: ['graphic-design', 'illustration'],
    types: [],
    origin: 'side-project',
    legacyMetadata: { categories: [], type: 'Side Project', tags: ['B.B. Queen', 'Music', 'Concerts', 'Flyers'] },
    thumbnailBg: 'bg-[#26112e]',
  },
  ...importedBehanceProjects,
];

// Drafts retain their content and assets; remove draft: true to publish again.
export const draftCatalogProjects = catalogProjects.filter(project => project.draft);
export const draftProjectSlugs = new Set(draftCatalogProjects.flatMap(project => project.slug ? [project.slug] : []));
export const allCatalogProjects = catalogProjects.filter(project => !project.draft);

const priorityProjectIds = ['poap-moments-redesign', 'poap-design-system', 'guitarravisual', 'remera-chenziqiang-argentina', 'bioy-casares', 'typography-composition', 'aerolab-home', 'poaps-design-web3-communities', 'philatelist', 'goal-scream-challenge'];
export const orderedCatalogProjects = [
  ...priorityProjectIds.flatMap(id => allCatalogProjects.filter(project => project.id === id)),
  ...allCatalogProjects.filter(project => !priorityProjectIds.includes(project.id) && project.id !== 'gig-flyers'),
  ...allCatalogProjects.filter(project => project.id === 'gig-flyers'),
];
