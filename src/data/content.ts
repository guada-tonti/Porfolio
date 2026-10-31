import { Project, ServiceItem, Testimonial, Dictionary, Locale } from './types';

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    availability: {
      eyebrow: 'Availability',
      week: 'Week',
      showMore: 'Show more',
      showLess: 'Show less',
      "title": "Upcoming collaborations",
      "description": "I take on a limited number of projects at a time to give each one the attention it deserves.",
      "example": "Preview with sample availability · to be confirmed",
      "legend": "Availability legend",
      "nextOpening": "Next opening",
      "loading": "Loading availability…",
      "cta": "Propose a project",
      "furtherAhead": "Planning something further ahead? We can still talk about it.",
      "status": {
            "available": "Full-time availability",
            "fulltime": "Full-time availability",
            "limited": "Part-time availability",
            "unavailable": "Unavailable",
            "unconfirmed": "To be confirmed",
            "closed": "Schedule not yet open"
      }
},
    toolsTechnologiesTitle: 'Tools & Technologies',
    nav: {
      work: 'WORK & PROJECTS',
      resume: 'RESUME',
      about: 'ABOUT',
      contact: 'CONTACT',
    },
    hero: {
      tagline: 'SENIOR PRODUCT DESIGNER / VISUAL DESIGNER / CREATIVE TECHNOLOGIST',
      titleLine1: '12 years',
      titleLine2: 'designing',
      titleLine3: 'professionally.',
      subtitleItalic: 'And a lifetime of creating.',
      description: 'Digital products, graphic design, interactive experiences, music, games, objects, and whatever else comes to mind.',
      exploreWork: 'View work',
      viewResume: 'View resume',
      locationCity: 'Buenos Aires, Argentina (UTC-3)',
      locationStatus: 'Working worldwide',
    },
    selectedWork: {
      sectionTitle: 'SELECTED WORK',
      viewAllProjects: 'View all projects',
    },
    whatIDo: {
      sectionTitle: 'WHAT I DO',
    },
    testimonials: {
      sectionTitle: 'TESTIMONIALS',
      onLabel: 'on',
    },
    footer: {
      copyright: 'Guada Tonti. All rights reserved.',
      rightsReserved: 'All rights reserved.',
      locationCity: 'Buenos Aires, Argentina',
      locationStatus: 'Working worldwide',
    },
    projectDetail: {
      overview: 'Overview',
      role: 'My Role',
      challenge: 'The Challenge',
      process: 'Process & Design Decisions',
      results: 'Results & Learnings',
      visitLive: 'Visit live project',
      backToWork: 'Back to Selected Work',
      nextProject: 'Next Project',
      prevProject: 'Previous Project',
    },
    aboutPage: {
      title: 'About Guada',
      subtitle: 'Designing thoughtful digital systems with 15 years of craft and curiosity.',
      openToLabel: 'Open to:',
      openToOptions: 'Freelance projects · Fixed-term contracts · Long-term contracts',
      bioParagraph1: 'I am a multidisciplinary Product Designer, Visual Designer, and Creative Technologist based in Buenos Aires, Argentina, collaborating with companies and founders globally.',
      bioParagraph2: 'Over 15 years of professional practice, I have shaped complex enterprise platforms, high-velocity consumer apps, and expressive brand touchpoints. I bridge design fidelity and frontend execution with an engineer’s mindset.',
      bioParagraph3: 'Outside of client and product engagements, I explore music, generative code, modular synthesis, and interactive curiosities.',
      experienceHeadline: '15 years of professional design. A lifetime of exploring.',
    },
    resumePage: {
      title: 'Resume',
      eyebrow: 'THE JOURNEY SO FAR',
      subtitle: 'Product Designer / Visual Designer / Creative Technologist',
      downloadPdf: 'Download PDF',
      summaryTitle: 'Professional Summary',
      experienceTitle: 'Work Experience',
      earlierExperienceExpand: '+ View earlier experience',
      earlierExperienceCollapse: '− Show less',
      experiences: [
  {
    "role": "Independent Design & Creative Exploration",
    "company": "Independent",
    "period": "Jul 2026 — Present",
    "description": "Working independently while exploring creative development, AI and interactive experiences through continued learning and personal projects."
  },
  {
    "role": "Senior UX/UI Designer",
    "company": "POAP — The Proof of Attendance Protocol",
    "period": "Jan 2021 – Jun 2026",
    "progression": "Generalist Designer → UX/UI Designer → Senior UX/UI Designer",
    "description": "Joined POAP as its first full-time designer, supporting its growth from a five-person startup into an international team of 70+. My role evolved alongside the company, from a multidisciplinary generalist handling a wide range of design needs to a Senior UX/UI Designer focused on product design and design system."
  },
  {
    "role": "Mid-level UX/UI Designer",
    "company": "Xivis",
    "period": "Dec 2019 — Jan 2021",
    "description": "Digital product design at an agency specializing in Web3."
  },
  {
    "role": "Mid-level UX/UI Designer",
    "company": "Mobillers",
    "period": "Oct 2018 — Dec 2019",
    "description": "UX/UI for gaming and augmented reality apps, from user flows and prototypes to testing, design systems and developer collaboration."
  },
  {
    "role": "Co-Founder & Designer",
    "company": "Agencia Bondiola",
    "period": "Jun 2016 — Nov 2018",
    "description": "Co-founded a digital agency for social impact initiatives, combining branding, web and graphic design, photography, video and social campaigns."
  },
  {
    "role": "Jr. UX/UI Designer",
    "company": "Aerolab Digital",
    "period": "Jun 2017 — Mar 2018",
    "description": "UX/UI internship contributing to Banco Galicia and Ualá, alongside redesigns of Aerolab’s homepage and blog."
  },
  {
    "role": "Jr. UX/UI Designer",
    "company": "Tril Corporation",
    "period": "Nov 2016 — Apr 2017",
    "description": "UX/UI internship on a civic participation platform, Mercado Libre app prototypes and iOS stickers."
  },
  {
    "role": "Teaching Assistant",
    "company": "FADU — Universidad de Buenos Aires",
    "period": "Mar 2016 — Feb 2017",
    "description": "Teaching assistant for Medios Expresivos 2, Cátedra La Ferla."
  },
  {
    "role": "Jr. Designer",
    "company": "Banco Hipotecario",
    "period": "Apr 2014 — Jan 2015",
    "description": "Marketing and advertising internship supporting the bank’s rebranding through digital and print communications, web styling and promotional materials."
  }
],
      skillsTitle: 'Core Capabilities',
      toolsTitle: 'Tools & Knowledge',
      languagesTitle: 'Languages',
      spanishLanguage: 'Spanish',
      englishLanguage: 'English',
      nativeLevel: 'Native',
      englishLevel: 'C2 Proficient',
      englishLevelContext: 'Overall EF SET result; does not certify all language skills.',
      tools: [
  {
    "label": "Design & prototyping",
    "details": "Figma (advanced), components, variables, design tokens, auto layout, interactive prototyping."
  },
  {
    "label": "AI-assisted workflows",
    "details": "Claude Code, Codex, Cursor, Lovable, Figma MCP."
  },
  {
    "label": "AI image & video generation",
    "details": "Generative visual content, image editing, video creation, and creative experimentation."
  },
  {
    "label": "Frontend & development workflows",
    "details": "HTML, CSS, JavaScript, Git/GitHub. Technical knowledge for collaborating with developers and AI coding agents."
  },
  {
    "label": "Product analytics",
    "details": "PostHog, Google Analytics."
  },
  {
    "label": "Accessibility",
    "details": "WCAG guidelines."
  }
],
      educationTitle: 'Education & Training',
      mainEducationTitle: 'Education',
      mainEducationDegree: 'Graphic Design Degree',
      mainEducationInstitution: 'University of Buenos Aires (FADU - UBA)',
      mainEducationDescription: "Built a strong foundation in typography, color theory, visual composition, and design thinking at one of Latin America's most prestigious public universities.",
      additionalEducation: {
  "expand": "+ View additional education & courses",
  "collapse": "− Show less",
  "groups": [
    {
      "title": "Creative & Product Design",
      "courses": [
        {
          "title": "Product Design Summer Camp",
          "institution": "Acámica",
          "year": "2018"
        },
        {
          "title": "Introduction to UX",
          "institution": "Estudio Panda",
          "year": "2017"
        },
        {
          "title": "UX Design",
          "institution": "Puerta 18",
          "year": "2016"
        },
        {
          "title": "Graphic Design for Web",
          "institution": "Puerta 18",
          "year": "2015"
        },
        {
          "title": "Illustration & Animation",
          "institution": "Puerta 18",
          "year": "2011"
        },
        {
          "title": "Graphic Communication",
          "institution": "Puerta 18",
          "year": "2013"
        },
        {
          "title": "Photography",
          "institution": "Puerta 18",
          "year": "2013"
        },
        {
          "title": "Design & Drawing with CorelDRAW",
          "institution": "Centro Rojas / UBA",
          "year": "2010"
        }
      ]
    },
    {
      "title": "Technology & Interactive",
      "courses": [
        {
          "title": "Build Your First Video Game (Unity)",
          "institution": "Etermax",
          "year": "2019"
        },
        {
          "title": "HTML: Web Page Fundamentals",
          "institution": "EducaciónIT",
          "year": "2013"
        },
        {
          "title": "CSS Layout",
          "institution": "EducaciónIT",
          "year": "2013"
        },
        {
          "title": "Dreamweaver CS4/CS5: Professional Website Development",
          "institution": "EducaciónIT",
          "year": "2013"
        },
        {
          "title": "Web Design",
          "institution": "Puerta 18",
          "year": "2010"
        },
        {
          "title": "Flash CS5/CS6: Animation Development",
          "institution": "EducaciónIT",
          "year": "2013"
        },
        {
          "title": "Thick Data for Innovation",
          "institution": "LATIO",
          "year": "2018"
        }
      ]
    },
    {
      "title": "Business & Marketing",
      "courses": [
        {
          "title": "Google Analytics",
          "institution": "EducaciónIT",
          "year": "2018"
        },
        {
          "title": "Digital Marketing & Social Media",
          "institution": "EducaciónIT",
          "year": "2015"
        },
        {
          "title": "SEO",
          "institution": "EducaciónIT",
          "year": "2015"
        },
        {
          "title": "Content Marketing & Virality",
          "institution": "EducaciónIT",
          "year": "2015"
        },
        {
          "title": "Google AdWords",
          "institution": "EducaciónIT",
          "year": "2016"
        },
        {
          "title": "Email Marketing",
          "institution": "EducaciónIT",
          "year": "2016"
        },
        {
          "title": "Entrepreneurship",
          "institution": "Puerta 18",
          "year": "2016"
        },
        {
          "title": "Online Marketing Plan Development",
          "institution": "EducaciónIT",
          "year": "2017"
        },
        {
          "title": "Entrepreneurship Seedbed",
          "institution": "Inst Bakail",
          "year": "2018"
        }
      ]
    }
  ],
  "languages": {
    "title": "Languages",
    "courses": [
      {
        "title": "English Studies",
        "institution": "Liceo Cultural Británico",
        "year": "2007–2011"
      }
    ]
  }
},
      educationCourses: [
        { title: 'AI for Multimedia Production', institution: 'Image Campus', period: 'Aug 2026 — Nov 2026', description: 'Specialization in AI-assisted development and advanced generative AI workflows for images, video, and interactive and immersive experiences.' },
        { title: 'User Experience & Research Course', institution: 'Digital House', period: 'Jan 2019 — Jul 2019', description: '140 hours of in-person training in research and UX methodologies: Design Thinking, personas, user interviews, journey mapping, card sorting, surveys, heuristic evaluation, user testing and analytics.' },
      ],
    },
    otherThingsPage: {
      title: 'Other Things',
      subtitle: 'Creative explorations, music, experiments, illustrations, and physical prototypes.',
      categoryAll: 'All',
      categoryMusic: 'Music',
      categoryArt: 'Visual Art',
      categoryExperiments: 'Creative Tech',
    },
    contactPage: {
      title: "Let's connect",
      subtitle: 'Open for select product design leadership, creative consulting, and interactive projects worldwide.',
      emailLabel: 'Your Email',
      messageLabel: 'Your Message',
      sendButton: 'Send message',
    },
  },
  es: {
    availability: {
      eyebrow: 'Disponibilidad',
      week: 'Semana',
      showMore: 'Ver más',
      showLess: 'Ver menos',
      "title": "Próximas colaboraciones",
      "description": "Trabajo en un número limitado de proyectos a la vez para dedicarles el tiempo y la atención que merecen.",
      "example": "Vista previa con disponibilidad de ejemplo · a confirmar",
      "legend": "Leyenda de disponibilidad",
      "nextOpening": "Próxima apertura",
      "loading": "Cargando disponibilidad…",
      "cta": "Proponer un proyecto",
      "furtherAhead": "¿Estás planificando algo para más adelante? Podemos conversarlo igualmente.",
      "status": {
            "available": "Disponibilidad Full-time",
            "fulltime": "Disponibilidad Full-time",
            "limited": "Disponibilidad Part-time",
            "unavailable": "No disponible",
            "unconfirmed": "Por confirmar",
            "closed": "Agenda aún no abierta"
      }
},
    toolsTechnologiesTitle: 'Herramientas y tecnologías',
    nav: {
      work: 'TRABAJOS Y PROYECTOS',
      resume: 'CURRICULUM',
      about: 'SOBRE MÍ',
      contact: 'CONTACTO',
    },
    hero: {
      tagline: 'SENIOR PRODUCT DESIGNER / VISUAL DESIGNER / CREATIVE TECHNOLOGIST',
      titleLine1: '12 años',
      titleLine2: 'diseñando por',
      titleLine3: 'profesión.',
      subtitleItalic: 'Y toda una vida creando.',
      description: 'Productos digitales, diseño gráfico, experiencias interactivas, música, juegos, objetos y lo que se nos ocurra.',
      exploreWork: 'Ver trabajos',
      viewResume: 'Ver currículum',
      locationCity: 'Buenos Aires, Argentina (UTC-3)',
      locationStatus: 'Working worldwide',
    },
    selectedWork: {
      sectionTitle: 'TRABAJOS SELECCIONADOS',
      viewAllProjects: 'Ver todos los proyectos',
    },
    whatIDo: {
      sectionTitle: 'QUÉ HAGO',
    },
    testimonials: {
      sectionTitle: 'TESTIMONIOS',
      onLabel: 'en',
    },
    footer: {
      copyright: 'Guada Tonti. Todos los derechos reservados.',
      rightsReserved: 'Todos los derechos reservados.',
      locationCity: 'Buenos Aires, Argentina',
      locationStatus: 'Working worldwide',
    },
    projectDetail: {
      overview: 'Resumen',
      role: 'Mi Rol',
      challenge: 'El Desafío',
      process: 'Proceso y Decisiones de Diseño',
      results: 'Resultados y Aprendizajes',
      visitLive: 'Visitar proyecto en vivo',
      backToWork: 'Volver a Trabajos Seleccionados',
      nextProject: 'Siguiente Proyecto',
      prevProject: 'Proyecto Anterior',
    },
    aboutPage: {
      title: 'Sobre Guada',
      subtitle: 'Diseñando sistemas digitales con 15 años de oficio y curiosidad constante.',
      openToLabel: 'Disponible para:',
      openToOptions: 'Proyectos freelance · Contratos a plazo fijo · Contratos a largo plazo',
      bioParagraph1: 'Soy Product Designer, Visual Designer y Creative Technologist de Buenos Aires, Argentina, colaborando con equipos y empresas de todo el mundo.',
      bioParagraph2: 'A lo largo de 15 años de práctica profesional he diseñado plataformas complejas, aplicaciones de consumo masivo y lenguajes de marca integrales. Uno el diseño y la tecnología con una mentalidad ágil y técnica.',
      bioParagraph3: 'Fuera de proyectos profesionales, exploro música, código generativo, síntesis modular y experimentos interactivos.',
      experienceHeadline: '15 años diseñando por profesión. Toda una vida creando.',
    },
    resumePage: {
      title: 'Curriculum',
      eyebrow: 'RECORRIDO PROFESIONAL',
      subtitle: 'Product Designer / Visual Designer / Creative Technologist',
      downloadPdf: 'Descargar PDF',
      summaryTitle: 'Resumen Profesional',
      experienceTitle: 'Experiencia Laboral',
      earlierExperienceExpand: '+ Ver experiencia anterior',
      earlierExperienceCollapse: '− Mostrar menos',
      experiences: [
  {
    "role": "Diseño independiente y exploración creativa",
    "company": "Independiente",
    "period": "Jul 2026 — Actualidad",
    "description": "Trabajo de forma independiente mientras exploro desarrollo creativo, IA y experiencias interactivas a través de formación continua y proyectos propios."
  },
  {
    "role": "Senior UX/UI Designer",
    "company": "POAP — The Proof of Attendance Protocol",
    "period": "Ene 2021 – Jun 2026",
    "progression": "Generalist Designer → UX/UI Designer → Senior UX/UI Designer",
    "description": "Me incorporé a POAP como su primera diseñadora a tiempo completo, acompañando su crecimiento desde una startup de cinco personas hasta un equipo internacional de más de 70. Mi rol evolucionó junto con la empresa: comencé como diseñadora generalista, cubriendo diversas necesidades de diseño, y progresivamente me especialicé en diseño de producto y sistema de diseño."
  },
  {
    "role": "Mid-level UX/UI Designer",
    "company": "Xivis",
    "period": "Dic 2019 — Ene 2021",
    "description": "Diseño de productos digitales en una agencia especializada en Web3."
  },
  {
    "role": "Mid-level UX/UI Designer",
    "company": "Mobillers",
    "period": "Oct 2018 — Dic 2019",
    "description": "Diseño UX/UI para apps de gaming y realidad aumentada: flujos, prototipos, pruebas con usuarios, sistemas de diseño y colaboración con desarrollo."
  },
  {
    "role": "Cofundadora y diseñadora",
    "company": "Agencia Bondiola",
    "period": "Jun 2016 — Nov 2018",
    "description": "Cofundé una agencia digital para iniciativas de impacto social, combinando branding, diseño gráfico y web, fotografía, video y campañas en redes."
  },
  {
    "role": "Jr. UX/UI Designer",
    "company": "Aerolab Digital",
    "period": "Jun 2017 — Mar 2018",
    "description": "Pasantía UX/UI con participación en proyectos para Banco Galicia y Ualá, y en el rediseño de la home y el blog de Aerolab."
  },
  {
    "role": "Jr. UX/UI Designer",
    "company": "Tril Corporation",
    "period": "Nov 2016 — Abr 2017",
    "description": "Pasantía UX/UI en una plataforma de participación ciudadana, prototipos para la app de Mercado Libre y stickers para iOS."
  },
  {
    "role": "Ayudante de cátedra",
    "company": "FADU — Universidad de Buenos Aires",
    "period": "Mar 2016 — Feb 2017",
    "description": "Ayudante de cátedra en Medios Expresivos 2, Cátedra La Ferla."
  },
  {
    "role": "Jr. Designer",
    "company": "Banco Hipotecario",
    "period": "Abr 2014 — Ene 2015",
    "description": "Pasantía en Marketing y Publicidad, acompañando el cambio de imagen del banco con comunicación digital e impresa, estilos web y piezas promocionales."
  }
],
      skillsTitle: 'Capacidades Principales',
      toolsTitle: 'Herramientas y conocimientos',
      languagesTitle: 'Idiomas',
      spanishLanguage: 'Español',
      englishLanguage: 'Inglés',
      nativeLevel: 'Nativo',
      englishLevel: 'C2 Proficient',
      englishLevelContext: 'Resultado global de EF SET; no certifica todas las habilidades lingüísticas.',
      tools: [
  {
    "label": "Diseño y prototipado",
    "details": "Figma (avanzado), componentes, variables, tokens de diseño, auto layout, prototipado interactivo."
  },
  {
    "label": "Flujos de trabajo asistidos por IA",
    "details": "Claude Code, Codex, Cursor, Lovable, Figma MCP."
  },
  {
    "label": "Generación de imágenes y videos con IA",
    "details": "Contenido visual generativo, edición de imágenes, creación de videos y experimentación creativa."
  },
  {
    "label": "Frontend y flujos de desarrollo",
    "details": "HTML, CSS, JavaScript, Git/GitHub. Conocimientos técnicos para colaborar con desarrolladores y agentes de programación con IA."
  },
  {
    "label": "Analítica de producto",
    "details": "PostHog, Google Analytics."
  },
  {
    "label": "Accesibilidad",
    "details": "Pautas WCAG."
  }
],
      educationTitle: 'Educación y Formación',
      mainEducationTitle: 'Formación',
      mainEducationDegree: 'Diseño Gráfico',
      mainEducationInstitution: 'Universidad de Buenos Aires (FADU - UBA)',
      mainEducationDescription: "Desarrollé una sólida base en tipografía, teoría del color, composición visual y pensamiento de diseño en una de las universidades públicas más prestigiosas de América Latina.",
      additionalEducation: {
  "expand": "+ Ver formación y cursos complementarios",
  "collapse": "− Ver menos",
  "groups": [
    {
      "title": "Diseño creativo y de producto",
      "courses": [
        {
          "title": "Product Design Summer Camp",
          "institution": "Acámica",
          "year": "2018"
        },
        {
          "title": "Introducción a UX",
          "institution": "Estudio Panda",
          "year": "2017"
        },
        {
          "title": "Diseño UX",
          "institution": "Puerta 18",
          "year": "2016"
        },
        {
          "title": "Diseño gráfico para web",
          "institution": "Puerta 18",
          "year": "2015"
        },
        {
          "title": "Ilustración y animación",
          "institution": "Puerta 18",
          "year": "2011"
        },
        {
          "title": "Comunicación gráfica",
          "institution": "Puerta 18",
          "year": "2013"
        },
        {
          "title": "Fotografía",
          "institution": "Puerta 18",
          "year": "2013"
        },
        {
          "title": "Diseño y dibujo con CorelDRAW",
          "institution": "Centro Rojas / UBA",
          "year": "2010"
        }
      ]
    },
    {
      "title": "Tecnología e interactividad",
      "courses": [
        {
          "title": "Armá tu primer videojuego (Unity)",
          "institution": "Etermax",
          "year": "2019"
        },
        {
          "title": "HTML: Fundamentos de una página web",
          "institution": "EducaciónIT",
          "year": "2013"
        },
        {
          "title": "Maquetado CSS y DIVs",
          "institution": "EducaciónIT",
          "year": "2013"
        },
        {
          "title": "Dreamweaver CS4/CS5: Construcción de sitios web profesionales",
          "institution": "EducaciónIT",
          "year": "2013"
        },
        {
          "title": "Diseño de páginas web",
          "institution": "Puerta 18",
          "year": "2010"
        },
        {
          "title": "Flash CS5/CS6: Desarrollo de animaciones",
          "institution": "EducaciónIT",
          "year": "2013"
        },
        {
          "title": "Thick Data for Innovation",
          "institution": "LATIO",
          "year": "2018"
        }
      ]
    },
    {
      "title": "Negocios y marketing",
      "courses": [
        {
          "title": "Google Analytics",
          "institution": "EducaciónIT",
          "year": "2018"
        },
        {
          "title": "Marketing digital y redes sociales",
          "institution": "EducaciónIT",
          "year": "2015"
        },
        {
          "title": "Posicionamiento web, SEO",
          "institution": "EducaciónIT",
          "year": "2015"
        },
        {
          "title": "Marketing de contenidos y viralización",
          "institution": "EducaciónIT",
          "year": "2015"
        },
        {
          "title": "Google AdWords",
          "institution": "EducaciónIT",
          "year": "2016"
        },
        {
          "title": "Email marketing",
          "institution": "EducaciónIT",
          "year": "2016"
        },
        {
          "title": "Emprendimientos",
          "institution": "Puerta 18",
          "year": "2016"
        },
        {
          "title": "Desarrollo de plan de marketing online",
          "institution": "EducaciónIT",
          "year": "2017"
        },
        {
          "title": "Semillero de emprendedores",
          "institution": "Inst Bakail",
          "year": "2018"
        }
      ]
    }
  ],
  "languages": {
    "title": "Idiomas",
    "courses": [
      {
        "title": "Estudios de inglés",
        "institution": "Liceo Cultural Británico",
        "year": "2007–2011"
      }
    ]
  }
},
      educationCourses: [
        { title: 'IA para producción multimedia', institution: 'Image Campus', period: 'Ago 2026 — Nov 2026', description: 'Especialización en Desarrollo asistido por IA y workflows avanzados de IA generativa para imágenes, video y experiencias interactivas e inmersivas.' },
        { title: 'Curso de Experiencia de Usuario e Investigación', institution: 'Digital House', period: 'Ene 2019 — Jul 2019', description: '140 horas de formación presencial en metodologías de research y UX: Design Thinking, personas, entrevistas a usuarios, mapas de recorrido, card sorting, encuestas, evaluación heurística, pruebas de usabilidad y analítica.' },
      ],
    },
    otherThingsPage: {
      title: 'Otras Cosas',
      subtitle: 'Exploraciones creativas, música, experimentos, ilustraciones y prototipos.',
      categoryAll: 'Todo',
      categoryMusic: 'Música',
      categoryArt: 'Arte Visual',
      categoryExperiments: 'Tecnología Creativa',
    },
    contactPage: {
      title: 'Hablemos',
      subtitle: 'Disponible para proyectos de diseño de producto, consultoría creativa y experiencias interactivas en todo el mundo.',
      emailLabel: 'Tu Email',
      messageLabel: 'Tu Mensaje',
      sendButton: 'Enviar mensaje',
    },
  },
};

export const projects: Project[] = [
  {
    slug: 'saturno-v',
    title: 'Saturno V',
    subtitle: {
      en: 'Interactive experience · 3D · Web',
      es: 'Experiencia interactiva · 3D · Web',
    },
    category: {
      en: 'Interactive / 3D',
      es: 'Interactivo / 3D',
    },
    year: '2025',
    thumbnail: '/images/projects/saturno-v.jpg',
    role: {
      en: 'Lead Interaction & Visual Designer, 3D Web Creative',
      es: 'Diseño de Interacción, Visual y Creatividad Web 3D',
    },
    overview: {
      en: 'An immersive educational web experience tracing the stages and mechanics of the historic Saturn V rocket through real-time 3D models and responsive telemetry graphics.',
      es: 'Una experiencia web educativa e inmersiva que recorre las fases y mecánicas del histórico cohete Saturno V mediante modelos 3D en tiempo real y telemetría interactiva.',
    },
    challenge: {
      en: 'Making complex aerospace engineering principles approachable, tactile, and performant on everyday mobile and desktop browsers without sacrificing visual fidelity.',
      es: 'Hacer comprensibles y atractivos los principios de ingeniería aeroespacial en navegadores comunes sin resignar rendimiento ni calidad gráfica.',
    },
    process: {
      en: 'Modeled lightweight 3D assets, choreographed camera splines synchronized to user scroll, and engineered custom shader effects for ignition and staging transitions.',
      es: 'Modelado de componentes 3D optimizados, coreografía de cámaras sincronizadas con el scroll y desarrollo de shaders para ignición y separación de etapas.',
    },
    results: {
      en: 'High user dwell time (over 4.5 minutes average), recognized in international web design showcases, and zero lag on mobile devices.',
      es: 'Permanencia promedio de más de 4.5 minutos, menciones en exhibiciones internacionales de diseño web y rendimiento fluido en móviles.',
    },
    liveUrl: 'https://example.com/saturno-v',
  },
  {
    slug: 'guitarravisual',
    title: 'GuitarraVisual',
    subtitle: {
      en: 'Your daily guitar practice, visual and timed',
      es: 'Tu práctica diaria de guitarra, visual y temporizada',
    },
    category: {
      en: 'Music & Education',
      es: 'Música y Educación',
    },
    year: '2024',
    thumbnail: '/images/projects/guitarravisual.jpg',
    role: {
      en: 'Product Designer & Front-End Creative Technologist',
      es: 'Diseño de Producto y Creatividad Tecnológica Frontend',
    },
    overview: {
      en: 'A visual fretboard mapper that decodes music theory, modal scales, and chord inversions through an interactive, color-coded fretboard interface.',
      es: 'Un mapa interactivo para mástil de guitarra que decodifica teoría musical, modos y acordes a través de una interfaz cromática dinámica.',
    },
    challenge: {
      en: 'Guitar notation is often cluttered and intimidating for intermediate players looking to understand fretboard geometry quickly.',
      es: 'Los sistemas de notación tradicionales suelen ser confusos para guitarristas que buscan asimilar rápidamente la geometría del mástil.',
    },
    process: {
      en: 'Designed an intuitive matrix UI, integrated Web Audio synthesis for pitch feedback, and built instant chord degree toggles for live practice sessions.',
      es: 'Diseño de interfaz matricial limpia, síntesis con Web Audio API para audición inmediata y selector de grados para práctica en tiempo real.',
    },
    results: {
      en: 'Adopted by music teachers and independent guitarists for daily practice and scale visualization.',
      es: 'Adoptada por profesores de música y músicos independientes para práctica diaria y visualización modal.',
    },
    liveUrl: 'https://guitarravisual.com',
  },
  {
    slug: 'bigotes',
    title: 'Bigotes',
    subtitle: {
      en: 'Web app · Pet health · Personal tool',
      es: 'Web app · Salud de mascotas · Herramienta personal',
    },
    category: {
      en: 'Product & Health',
      es: 'Producto y Salud',
    },
    year: '2024',
    thumbnail: '/images/projects/bigotes.jpg',
    role: {
      en: 'End-to-end Product Designer',
      es: 'Diseño de Producto End-to-End',
    },
    overview: {
      en: 'A thoughtful pet wellness companion designed to log weight curves, medication reminders, feeding schedules, and veterinary records with warmth and clarity.',
      es: 'Una aplicación para el bienestar y seguimiento veterinario de mascotas: curvas de peso, vacunas, alimentación y recordatorios médicos con calidez y claridad.',
    },
    challenge: {
      en: 'Most veterinary tracking tools feel clinical or spreadsheet-heavy, causing users to drop off after a few days.',
      es: 'La mayoría de aplicaciones veterinarias son frías o complejas como planillas, lo que genera abandono tras pocos días.',
    },
    process: {
      en: 'Crafted friendly avatar identifiers (Muza & Oli), quick-entry cards, and gentle notification digests that celebrate pet milestones.',
      es: 'Creación de avatares amigables, tarjetas de carga ultrarrápida y resúmenes visuales para celebrar los hitos de salud de cada mascota.',
    },
    results: {
      en: 'Daily recurring usage by active pet owners and consistently positive feedback on ease of logging.',
      es: 'Uso diario recurrente de familias con mascotas y comentarios positivos sobre la facilidad y calidez de la interfaz.',
    },
    liveUrl: 'https://example.com/bigotes',
  },
  {
    slug: 'family-photos',
    title: 'Family Photos',
    subtitle: {
      en: 'Web app · Family tree · Archive',
      es: 'Web app · Árbol genealógico · Archivo',
    },
    category: {
      en: 'Archive & Genealogy',
      es: 'Archivo y Genealogía',
    },
    year: '2023',
    thumbnail: '/images/projects/family-photos.jpg',
    role: {
      en: 'UX Architect & Interface Designer',
      es: 'Arquitectura UX y Diseño de Interfaz',
    },
    overview: {
      en: 'A digital historical archive connecting generations of family photos, spoken memories, and biographical timelines into an exploratory relational tree.',
      es: 'Un archivo histórico digital que conecta generaciones de fotografías familiares, testimonios orales y líneas de tiempo en un árbol exploratorio.',
    },
    challenge: {
      en: 'Preserving fragile physical photograph context while structuring non-linear relationships across five decades of family history.',
      es: 'Preservar el contexto de fotografías físicas frágiles y estructurar vínculos no lineales a lo largo de 50 años de historia familiar.',
    },
    process: {
      en: 'Created an archival metadata hierarchy, custom node-link relational maps, and gentle zoom controls for high-resolution scanned prints.',
      es: 'Jerarquía archivística clara, grafos interactivos de parentesco y controles fluidos de zoom para escaneos de alta resolución.',
    },
    results: {
      en: 'A preserved generational legacy, enabling older relatives to navigate and recount memories intuitively.',
      es: 'Un legado familiar preservado y accesible para personas de todas las edades con navegación intuitiva.',
    },
    liveUrl: 'https://example.com/family-photos',
  },
];

export const services: ServiceItem[] = [
  {
    id: 'product-design',
    title: {
      en: 'Product Design',
      es: 'Product Design',
    },
    description: {
      en: 'User-centered products from concept to polished interfaces.',
      es: 'Productos centrados en el usuario, desde el concepto hasta interfaces refinadas.',
    },
    illustrationType: 'product-design',
  },
  {
    id: 'design-engineer',
    title: {
      en: 'Design Engineer',
      es: 'Design Engineer',
    },
    description: {
      en: 'Design and build interactive products using modern web technologies and AI tools.',
      es: 'Diseño y desarrollo de productos interactivos con tecnologías web modernas y herramientas de IA.',
    },
    illustrationType: 'design-engineer',
  },
  {
    id: 'graphic-design',
    title: {
      en: 'Graphic Design',
      es: 'Diseño gráfico',
    },
    description: {
      en: 'Posters, flyers, stickers, t-shirts, logos, editorial design, illustrations, identity systems and more.',
      es: 'Posters, flyers, stickers, remeras, logos, diseño editorial, ilustraciones, sistemas de identidad y más.',
    },
    illustrationType: 'graphic-design',
  },
  {
    id: 'ai-creative',
    title: {
      en: 'AI Creative',
      es: 'AI Creative',
    },
    description: {
      en: 'Advanced generative AI creative workflows for image and video production.',
      es: 'Worflows avanzados de IA generativa creativa para desarrollo de imágenes y videos.',
    },
    illustrationType: 'ai-creative',
  },
  {
    id: 'interactive-experiences',
    title: {
      en: 'Interactive experiences for events and launches',
      es: 'Experiencias interactivas para eventos y lanzamientos',
    },
    description: {
      en: 'Web experiences, games and playful interfaces.',
      es: 'Experiencias web, juegos e interfaces lúdicas memorables.',
    },
    illustrationType: 'interactive',
  },
  {
    id: 'side-projects',
    title: {
      en: 'Side Projects',
      es: 'Proyectos Propios',
    },
    description: {
      en: 'Personal projects to learn, explore and keep creating.',
      es: 'Proyectos personales para aprender, experimentar y no parar de crear jamás.',
    },
    illustrationType: 'side-projects',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't-isabel-gonzalez',
    quote: {
      en: '“Thanks particularly to @Guada for running the rescue operation of the Moments product: your speed and skill in turning this into something not just externally pretty but structurally beautiful, while ensuring the output and input match perfectly, make the team wake up thrilled to work with you every morning. Thank you for being how you are.”',
      es: '“Gracias especialmente a @Guada por llevar adelante la operación de rescate del producto Moments: tu rapidez y habilidad para transformarlo en algo no solo bonito por fuera, sino también hermoso en su estructura, asegurando que las entradas y salidas coincidan perfectamente, hacen que el equipo se despierte con entusiasmo por trabajar con vos cada mañana. Gracias por ser como sos.”',
    },
    author: 'Isabel Gonzalez',
    avatar: '',
    relationship: {
      en: 'COO at POAP',
      es: 'COO at POAP',
    },
    platform: 'slack',
    platformLabel: 'Slack',
    isPlaceholder: false,
  },
  {
    id: 't-tory-moore',
    quote: {
      en: '“She has an unusually strong combination of design judgment, precision, and attention to detail […] Guada is also deeply curious and technically savvy […] she is constantly thinking about how an experience can be clearer, more intuitive, and more useful. […] Guada will be one of the very first people I call.”',
      es: '“Tiene una combinación inusual de criterio de diseño, precisión y atención al detalle […] Guada también es profundamente curiosa y tiene un gran dominio técnico […] piensa constantemente en cómo lograr que una experiencia sea más clara, intuitiva y útil. […] Guada será una de las primeras personas a las que llamaré.”',
    },
    author: 'Tory Moore',
    avatar: '',
    relationship: {
      en: 'Design Manager at POAP',
      es: 'Design Manager at POAP',
    },
    platform: 'linkedin',
    platformLabel: 'LinkedIn',
    sourceUrl: 'https://www.linkedin.com/in/tory-moore-electrodiva/',
    isPlaceholder: false,
  },
  {
    id: 't-tory-moore-design-system',
    quote: {
      en: '“Guada has an unusually strong combination of design judgment, precision, and attention to detail, which made her our go-to person for design audits and ultimately led us to give her ownership of our design system. […] She is also deeply curious and technically savvy, with a strong understanding of modern design practices and emerging technologies.”',
      es: '“Tiene una combinación inusual de criterio de diseño, precisión y atención al detalle, que la convirtió en nuestra referente para las auditorías de diseño y finalmente nos llevó a darle la responsabilidad de nuestro sistema de diseño. […] Guada también es profundamente curiosa y tiene un gran dominio técnico, con una sólida comprensión de las prácticas modernas de diseño y las tecnologías emergentes.”',
    },
    author: 'Tory Moore',
    avatar: '',
    relationship: {
      en: 'Design Manager at POAP',
      es: 'Design Manager at POAP',
    },
    platform: 'linkedin',
    platformLabel: 'LinkedIn',
    sourceUrl: 'https://www.linkedin.com/in/tory-moore-electrodiva/',
    isPlaceholder: false,
  },
  {
    id: 't-alex',
    quote: {
      en: '“Guada brings a rare combination of strong visual taste, product thinking and technical curiosity. She’s proactive, thoughtful and a joy to work with.”',
      es: '“Guada aporta una combinación inusual de excelente gusto visual, pensamiento de producto y curiosidad técnica. Es proactiva, reflexiva y un placer de equipo.”',
    },
    author: 'Alex R.',
    avatar: '/images/testimonials/alex.jpg',
    relationship: {
      en: 'Former Manager · 2022',
      es: 'Manager anterior · 2022',
    },
    platform: 'linkedin',
    platformLabel: 'LinkedIn',
    isPlaceholder: true,
  },
  {
    id: 't-mariana',
    quote: {
      en: '“She has an incredible ability to turn complex ideas into simple, beautiful and intuitive experiences. Always curious, always pushing things forward.”',
      es: '“Tiene una habilidad increíble para convertir ideas complejas en experiencias simples, bellas e intuitivas. Siempre curiosa y empujando las cosas hacia adelante.”',
    },
    author: 'Mariana S.',
    avatar: '/images/testimonials/mariana.jpg',
    relationship: {
      en: 'Freelance project · 2024',
      es: 'Proyecto freelance · 2024',
    },
    platform: 'slack',
    platformLabel: 'Slack',
    isPlaceholder: true,
  },
  {
    id: 't-tomas',
    quote: {
      en: '“Guada is a super versatile designer who can jump from strategy to pixels to code. She brings creativity, ownership and great energy to any project.”',
      es: '“Guada es una diseñadora súper versátil que puede pasar de la estrategia a los píxeles y al código. Aporta creatividad, compromiso y gran energía a cada desafío.”',
    },
    author: 'Tomás L.',
    avatar: '/images/testimonials/tomas.jpg',
    relationship: {
      en: 'Collaborated on a project · 2023',
      es: 'Colaboración en proyecto · 2023',
    },
    platform: 'linkedin',
    platformLabel: 'LinkedIn',
    isPlaceholder: true,
  },
];

export const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/guadatonti/', platform: 'linkedin' },
  { name: 'GitHub', url: 'https://github.com/guada-tonti', platform: 'github' },
  { name: 'Behance', url: 'https://www.behance.net/GuadaTonti', platform: 'behance' },
  { name: 'WhatsApp', url: 'https://wa.me/5491136417243', platform: 'whatsapp' },
];

export const contactEmail = 'guada.tonti@gmail.com';

export const professionalInfoLabels = {
  en: { availability: 'Open to', opportunities: 'Freelance projects & Contractor roles', contact: 'Contact' },
  es: { availability: 'Disponible para', opportunities: 'Proyectos freelance y contratos', contact: 'Contacto' },
};
