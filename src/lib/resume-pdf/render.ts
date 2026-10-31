import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { PDFDocument, PDFPage, PDFFont, PDFName, PDFString, rgb, setCharacterSpacing } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { dictionaries, contactEmail, efSetCertificateUrl, socialLinks } from '@/data/content';
import type { Locale } from '@/data/types';
import { getPublicSiteUrl } from '@/data/site';

const WIDTH = 595.2756, HEIGHT = 841.8898, MARGIN = 44;
const CONTENT_WIDTH = WIDTH - MARGIN * 2;
const ink = rgb(0.08, 0.08, 0.09), gray = rgb(0.35, 0.35, 0.39), muted = rgb(0.48, 0.48, 0.51);
let fontBytes: Promise<Buffer[]> | undefined;
let accentBytes: Promise<Buffer> | undefined;
let bottomAccentBytes: Promise<Buffer> | undefined;

export async function renderResumePdf(locale: Locale): Promise<Uint8Array> {
  const dict = dictionaries[locale], data = dict.resumePage, es = locale === 'es';
  const site = getPublicSiteUrl();
  const publicPath = (route: string) => new URL(`/${locale}${route}`, site).href;
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  fontBytes ??= Promise.all(['Arimo-Regular.ttf', 'Arimo-Bold.ttf', 'GeistMono-Regular.ttf'].map(file => readFile(path.join(process.cwd(), 'src/lib/resume-pdf/fonts', file))));
  const bytes = await fontBytes;
  const regular = await doc.embedFont(bytes[0], { subset: true });
  const bold = await doc.embedFont(bytes[1], { subset: true });
  const mono = await doc.embedFont(bytes[2], { subset: true });
  doc.setTitle(es ? 'Guada Tonti - Curriculum' : 'Guada Tonti - Resume');
  doc.setAuthor('Guada Tonti'); doc.setSubject(data.subtitle);
  doc.catalog.set(PDFName.of('Lang'), PDFString.of(es ? 'es-AR' : 'en'));
  let page: PDFPage = doc.addPage([WIDTH, HEIGHT]);
  accentBytes ??= readFile(path.join(process.cwd(), 'src/lib/resume-pdf/assets/paint-accent.jpg'));
  const accent = await doc.embedJpg(await accentBytes);
  const accentWidth = 220;
  const accentHeight = accentWidth * accent.height / accent.width;
  page.drawImage(accent, { x: WIDTH - accentWidth, y: HEIGHT - accentHeight, width: accentWidth, height: accentHeight, opacity: 0.5 });
  let y = HEIGHT - MARGIN;
  // Plain one-column text, written in reading order. Blocks never split across pages.
  function normalize(text: string) { return text.replace(/[–—]/g, '-').replace(/’/g, "'"); }
  function lines(text: string, font: PDFFont, size: number, width = CONTENT_WIDTH): string[] {
    const result: string[] = [];
    for (const paragraph of normalize(text).split('\n')) {
      let line = '';
      for (const word of paragraph.split(/\s+/).filter(Boolean)) {
        const next = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(next, size) > width && line) { result.push(line); line = word; }
        else line = next;
      }
      result.push(line);
    }
    return result;
  }
  function ensure(height: number) {
    if (y - height < MARGIN + 12) {
      page = doc.addPage([WIDTH, HEIGHT]); y = HEIGHT - MARGIN;
    }
  }
  function paragraph(text: string, opts: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; leading?: number } = {}) {
    const { font = regular, size = 10.2, color = gray, leading = 13.8 } = opts;
    for (const line of lines(text, font, size)) {
      page.drawText(line, { x: MARGIN, y: y - size, font, size, color }); y -= leading;
    }
  }
  function link(label: string, url: string, x = MARGIN, size = 9.3, font = regular, color = gray) {
    const text = normalize(label), width = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x, y: y - size, font, size, color });
    const annotation = doc.context.obj({ Type: 'Annot', Subtype: 'Link', Rect: [x, y - size - 2, x + width, y + 2], Border: [0, 0, 0], A: { Type: 'Action', S: 'URI', URI: PDFString.of(url) } });
    page.node.addAnnot(doc.context.register(annotation));
    return width;
  }
  function entryHeading(title: string, period: string) {
    const date = normalize(period), dateSize = 8.8;
    const dateWidth = mono.widthOfTextAtSize(date, dateSize);
    const titleLines = lines(title, bold, 10.6, CONTENT_WIDTH - dateWidth - 16);
    page.drawText(titleLines[0], { x: MARGIN, y: y - 10.6, font: bold, size: 10.6, color: ink });
    page.drawText(date, { x: WIDTH - MARGIN - dateWidth, y: y - 10.6, font: mono, size: dateSize, color: muted });
    y -= 15;
    for (const line of titleLines.slice(1)) paragraph(line, { font: bold, size: 10.6, color: ink, leading: 15 });
  }
  function rule() {
    page.drawLine({ start: { x: MARGIN, y }, end: { x: WIDTH - MARGIN, y }, thickness: 0.5, color: rgb(0.85, 0.85, 0.87) });
  }
  function section(title: string, needed = 70, firstOnPage = false) {
    const sectionGap = firstOnPage ? 10 : 28;
    ensure(needed + sectionGap); y -= sectionGap;
    page.pushOperators(setCharacterSpacing(1.2));
    page.drawText(title.toLocaleUpperCase(locale), { x: MARGIN, y: y - 8.5, size: 8.5, font: mono, color: muted });
    page.pushOperators(setCharacterSpacing(0));
    y -= 23;
  }
  const name = 'Guada Tonti', nameSize = 20;
  page.drawText(name, { x: (WIDTH - bold.widthOfTextAtSize(name, nameSize)) / 2, y: y - nameSize, font: bold, size: nameSize, color: ink });
  y -= 30;
  page.drawText(data.subtitle, { x: (WIDTH - regular.widthOfTextAtSize(data.subtitle, 11.1)) / 2, y: y - 11.1, font: regular, size: 11.1, color: ink });
  y -= 30;
  rule();
  y -= 16;
  const linkedin = socialLinks.find(item => item.name === 'LinkedIn')!.url;
  const info = [
    { label: es ? 'Ubicación' : 'Location', value: dict.hero.locationCity, url: '' },
    { label: es ? 'Contacto' : 'Contact', value: contactEmail, url: `mailto:${contactEmail}` },
    { label: 'LinkedIn', value: new URL(linkedin).hostname.replace(/^www\./, '') + new URL(linkedin).pathname.replace(/\/$/, ''), url: linkedin },
    { label: 'Portfolio', value: site.hostname, url: publicPath('') },
  ];
  const valueSize = 8.5;
  const widths = info.map(item => bold.widthOfTextAtSize(normalize(item.value), valueSize));
  const gap = (CONTENT_WIDTH - widths.reduce((sum, width) => sum + width, 0)) / (info.length - 1);
  // Full URLs stay visible; fall back to two rows if a future domain needs more room.
  const columns = gap >= 12 ? 4 : 2;
  const bandTop = y;
  let infoX = MARGIN;
  info.forEach((item, index) => {
    if (columns === 2) { infoX = MARGIN + (index % 2) * (CONTENT_WIDTH / 2 + 6); y = bandTop - Math.floor(index / 2) * 36; }
    page.drawText(item.label, { x: infoX, y: y - 8, font: regular, size: 8, color: muted });
    y -= 12;
    if (item.url) link(item.value, item.url, infoX, valueSize, bold, ink);
    else page.drawText(normalize(item.value), { x: infoX, y: y - valueSize, font: bold, size: valueSize, color: ink });
    y += 12;
    if (columns === 4) infoX += widths[index] + gap;
  });
  y = bandTop - (columns === 4 ? 37 : 73);
  rule(); y -= 8;
  section(data.summaryTitle, 95, true);
  paragraph(data.summary);
  section(data.experienceTitle, 90);
  data.experiences.forEach((exp, index) => {
    const description = index < 5 ? exp.pdfDescription || exp.description : '';
    const blockHeight = 17 + lines(`${exp.company} · ${exp.period}`, regular, 9.5).length * 13 + (description ? lines(description, regular, 9.5).length * 13 + 3 : 0) + 10;
    ensure(blockHeight);
    entryHeading(exp.progression || exp.role, exp.period);
    paragraph(exp.company, { size: 9.5, leading: 13 });
    if (description) { y -= 3; paragraph(description, { size: 9.5, leading: 13 }); }
    y -= 10;
  });
  // Keep education, tools and languages together on a second, well-filled page.
  if (doc.getPageCount() === 1) { page = doc.addPage([WIDTH, HEIGHT]); y = HEIGHT - MARGIN; }
  section(data.mainEducationTitle, 120, y === HEIGHT - MARGIN);
  const education = [...data.educationCourses, { title: data.mainEducationDegree, institution: data.mainEducationInstitution, period: data.mainEducationPeriod }];
  education.forEach((course, index) => {
    ensure(45);
    entryHeading(course.title, course.period);
    paragraph(course.institution, { size: 9.5, leading: 13 });
    if (index < education.length - 1) y -= 10;
  });
  section(data.toolsTitle, 100);
  for (const [index, tool] of data.tools.entries()) {
    const text = `${tool.label}: ${tool.details}`;
    ensure(lines(text, regular, 10.2).length * 13.8 + 9);
    paragraph(text);
    if (index < data.tools.length - 1) y -= 9;
  }
  section(data.languagesTitle, 80);
  paragraph(`${data.spanishLanguage} - ${data.nativeLevel}`, { size: 10.2, leading: 17 });
  const english = `${data.englishLanguage} - ${data.englishLevel} · `;
  page.drawText(english, { x: MARGIN, y: y - 10.2, font: regular, size: 10.2, color: gray });
  const resultX = MARGIN + regular.widthOfTextAtSize(english, 10.2);
  const resultWidth = link('EF SET 75/100', efSetCertificateUrl, resultX, 10.2);
  link(es ? 'Ver certificado' : 'View certification', efSetCertificateUrl, resultX + resultWidth + 12, 8.5);
  y -= 19;
  if (doc.getPageCount() > 2) throw new Error('Resume PDF exceeds two pages. Review content and layout before publishing.');
  if (doc.getPageCount() >= 2) {
    bottomAccentBytes ??= readFile(path.join(process.cwd(), 'src/lib/resume-pdf/assets/paint-bottom.jpg'));
    const bottomAccent = await doc.embedJpg(await bottomAccentBytes);
    const width = 220;
    doc.getPages()[1].drawImage(bottomAccent, { x: 0, y: 0, width, height: width * bottomAccent.height / bottomAccent.width, opacity: 0.5 });
  }
  doc.getPages().forEach((p, index) => {
    const footer = `${index + 1}/${doc.getPageCount()}`;
    p.drawText(footer, { x: WIDTH - MARGIN - mono.widthOfTextAtSize(footer, 8), y: MARGIN - 16, font: mono, size: 8, color: muted });
  });
  return doc.save();
}
