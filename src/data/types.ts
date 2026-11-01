export type Locale = 'en' | 'es';

export interface Project {
  slug: string;
  title: string;
  subtitle: {
    en: string;
    es: string;
  };
  category: {
    en: string;
    es: string;
  };
  year: string;
  thumbnail: string;
  role: {
    en: string;
    es: string;
  };
  overview: {
    en: string;
    es: string;
  };
  challenge: {
    en: string;
    es: string;
  };
  process: {
    en: string;
    es: string;
  };
  results: {
    en: string;
    es: string;
  };
  liveUrl?: string;
  githubUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  illustrationType: 'product-design' | 'design-engineer' | 'graphic-design' | 'ai-creative' | 'interactive' | 'side-projects';
}

export interface Testimonial {
  id: string;
  quote: {
    en: string;
    es: string;
  };
  author: string;
  avatar: string;
  relationship: {
    en: string;
    es: string;
  };
  platform: 'linkedin' | 'slack' | 'twitter';
  platformLabel: string;
  sourceUrl?: string;
  isPlaceholder: boolean;
}

export interface Dictionary {
  availability: {
    eyebrow: string;
    week: string;
    showMore: string;
    showLess: string;
    title: string;
    description: string;
    example: string;
    legend: string;
    nextOpening: string;
    loading: string;
    cta: string;
    furtherAhead: string;
    status: { fulltime: string; available: string; limited: string; unavailable: string; unconfirmed: string; closed: string };
  };
  toolsTechnologiesTitle: string;
  nav: {
    work: string;
    about: string;
    otherThings?: string;
    resume: string;
    contact: string;
  };
  hero: {
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitleItalic: string;
    description: string;
    exploreWork: string;
    viewResume: string;
    locationCity: string;
    locationStatus: string;
  };
  selectedWork: {
    sectionTitle: string;
    viewAllProjects: string;
  };
  whatIDo: {
    sectionTitle: string;
  };
  testimonials: {
    sectionTitle: string;
    onLabel: string;
  };
  footer: {
    copyright: string;
    rightsReserved: string;
    locationCity: string;
    locationStatus: string;
  };
  projectDetail: {
    overview: string;
    role: string;
    challenge: string;
    process: string;
    results: string;
    visitLive: string;
    backToWork: string;
    nextProject: string;
    prevProject: string;
  };
  aboutPage: {
    moreSections: { title: string; paragraphs: string[] }[];
    closingQuote: string;
    workingStyleTitle: string;
    workingStyle: { title: string; description: string }[];
    title: string;
    subtitle: string;
    openToLabel: string;
    openToOptions: string;
    bioParagraph1: string;
    bioParagraph2: string;
    bioParagraph3: string;
    experienceHeadline: string;
  };
  resumePage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    downloadPdf: string;
    summaryTitle: string;
    summary: string;
    mainEducationPeriod: string;
    experienceTitle: string;
    earlierExperienceExpand: string;
    earlierExperienceCollapse: string;
    experiences: { role: string; company: string; period: string; progression?: string; pdfDescription?: string; description: string }[];
    skillsTitle: string;
    toolsTitle: string;
    languagesTitle: string;
    spanishLanguage: string;
    englishLanguage: string;
    nativeLevel: string;
    englishLevel: string;
    englishLevelContext: string;
    tools: { label: string; details: string }[];
    educationTitle: string;
    mainEducationTitle: string;
    mainEducationDegree: string;
    mainEducationInstitution: string;
    mainEducationDescription: string;
    additionalEducation: { expand: string; collapse: string; languages: { title: string; courses: { title: string; institution: string; year: string }[] }; groups: { title: string; courses: { title: string; institution: string; year: string }[] }[] };
    educationCourses: { title: string; institution: string; period: string; description: string }[];
  };
  otherThingsPage: {
    title: string;
    subtitle: string;
    categoryAll: string;
    categoryMusic: string;
    categoryArt: string;
    categoryExperiments: string;
  };
  contactPage: {
    title: string;
    subtitle: string;
    emailLabel: string;
    messageLabel: string;
    sendButton: string;
  };
}
