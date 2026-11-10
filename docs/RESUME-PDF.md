# Resume PDF

## Implementation

`GET /en/resume/pdf` and `GET /es/resume/pdf` generate an A4 PDF on demand using pdf-lib and @pdf-lib/fontkit, in Next.js's default Node runtime. Pure JavaScript; no Chromium, system fonts, Python or external rendering service in production. GET is dynamic; response is `no-store` and `Content-Disposition: attachment`. Next cacheComponents forbids an explicit runtime segment setting, so none is used.

A dedicated single-column PDF template is used rather than printing the website. The two small JS dependencies avoid a headless browser's runtime and deployment overhead. Fonts are bundled and explicitly traced in next.config.ts for Vercel. Arimo Regular/Bold and static Geist Mono Regular (SIL OFL, included licenses) are embedded as subsets. Arimo was explicitly approved by the user as the Arial alternative because no Arial server license was available. No Arial font files are distributed. Font data is cached in memory, document data is read on every generation.

Source of truth is src/data/content.ts and its existing translations. Summary and UBA period were moved from inline web text to the dictionary without changing visible content. Experience can optionally override `pdfDescription`; POAP has a concise PDF version. Changing the main description alone does not overwrite an explicit PDF override; update/remove the override when changing its meaning. Older four jobs retain roles, companies, dates but omit description in the PDF. The first five retain descriptions. All nine jobs are included regardless of web expansion state. Education includes only the three main studies, never the additional-course dropdown. Certificate URL is shared between web/PDF.

Downloads:
- Guada_Tonti_Resume_EN.pdf
- Guada_Tonti_CV_ES.pdf

## Domain configuration

src/data/site.ts defines the canonical public domain `https://guadatonti.com`. PDF labels and links always use that domain, including local/preview downloads; stale environment variables cannot replace it with a Vercel address. Locale prefixes are preserved. No request Host header is trusted. Sitemap configuration remains independent.

## QA

Production build passed; the function's .nft.json contains both font files.
Both PDFs: 2 pages, exact 595.2756 x 841.8898 pt A4 portrait; 44 pt horizontal margins; 10.2 pt main body (13.8 pt leading); 5 link annotations. Page 1 summary + complete experience. Page 2 main education + tools + languages. Name is 20 pt, centered with the professional subtitle. Compact contact metadata is between two rules. Main content stays single-column; two tiny embedded decorative JPEGs are the only raster content. No hidden keywords.

Saved test files are in the calling task's output/pdf directory, outside the application source. They are review artifacts, not the source of future downloads.

Automated QA with pypdf + pdfplumber (development QA only):
```
node scripts/export-resume-data.cjs /tmp/resume-data.json
python3 scripts/validate-resume-pdf.py /path/to/downloads /tmp/resume-data.json
```
Checks: 1–2 A4 pages; both locales; summary equality; all experience roles/companies/dates on the same page; POAP only once and complete progression; three studies; six tools; languages; no secondary courses; five embedded links; fonts embedded; logical extraction order; no replacement/null characters; text bounds and row-overlap checks. Four rendered pages were visually inspected with Poppler. Both endpoints returned HTTP 200 with correct attachment filenames and content type. EN desktop and ES 390px buttons target their correct localized endpoints, no target=_blank. Browser console had no errors. Integrated browser download-event tracking timed out, so a completed native browser save was not confirmed; actual files were fetched from those exact endpoints via HTTP and validated. Physical mobile download UI and deployment itself remain untested.

Public links: EN/ES homepage, work listing, Moments and Design System all returned HTTP 200 during validation. Email uses mailto, LinkedIn reuses socialLinks, certificate uses the shared EF SET URL. No claim of compatibility with every ATS; tests establish selectable text, order and extraction only. This first version is not PDF/UA tagged or certified accessible.

## Content observations (preserved, not silently corrected)

- Bondiola (Jun 2016–Nov 2018), Aerolab (Jun 2017–Mar 2018), Tril (Nov 2016–Apr 2017) and UBA teaching (Mar 2016–Feb 2017) overlap. This may reflect concurrent roles; confirmation needed before changing anything.
- Bondiola and Mobillers overlap in Oct–Nov 2018. Dates are unchanged.
- Image Campus ends in Nov 2026, after the current review date (Oct 31, 2026); it is listed with its existing period, without inventing completion status.
- Per earlier user edits, POAP ends in Jun 2026 and independent work starts Jul 2026. No assumptions or new metrics were added.

## Changed files

- src/app/[locale]/resume/page.tsx — shared summary/period, shared certificate URL, localized download target; no visual redesign.
- src/app/[locale]/resume/pdf/route.ts — new download endpoint.
- src/lib/resume-pdf/render.ts — new PDF template.
- src/lib/resume-pdf/fonts/Arimo-Regular.ttf, Arimo-Bold.ttf, GeistMono-Regular.ttf, OFL-Arimo.txt, OFL-Geist.txt — bundled licensed fonts.
- src/data/site.ts — public URL configuration.
- src/data/content.ts — shared summary/UBA period, optional POAP PDF description and certificate URL.
- src/data/types.ts — matching fields.
- next.config.ts — trace PDF font files; other settings preserved.
- package.json, package-lock.json — pdf-lib and @pdf-lib/fontkit.
- scripts/export-resume-data.cjs, scripts/validate-resume-pdf.py — repeatable QA.
- docs/RESUME-PDF.md — implementation and review notes.

Earlier uncommitted edits to Home/About/Contact/project catalog predate this PDF task and were preserved. No Git commit, push or deployment performed as part of this request.

## Typography update — October 31, 2026

Arimo: https://github.com/googlefonts/Arimo (fonts/ttf/Arimo-Regular.ttf and Arimo-Bold.ttf; OFL.txt). Geist Mono: https://github.com/vercel/geist-font (fonts/GeistMono/ttf/GeistMono-Regular.ttf; OFL.txt). Both official licenses are SIL Open Font License 1.1, retained next to the files. Font metadata is verified: Arimo-Regular, Arimo-Bold, GeistMono-Regular. These are static TTFs, not substituted system fonts.

The preexisting Next Geist Mono WOFF2 was variable with default weight 400. Subsetting it with @pdf-lib/fontkit failed with RangeError. The official static Regular TTF passed. Font files are loaded locally; no runtime font downloads.

Section labels (8.5pt, regular, gray, tracking 1.2pt), all nine employment periods and three education periods (8.8pt, gray, right aligned), and page footers use Geist Mono. All other PDF text uses Arimo, bold for the name and entry titles, regular for body, companies, institutions, contact, tools and languages. Date/title blocks remain together. Dates are drawn after the role and before the company in the content stream, keeping logical association in extraction.

Validation: both final PDFs have 2 A4 pages; all three font subsets are embedded; 12 date strings and 5 labels per locale are confirmed in Geist Mono from pdfplumber character font metadata; all non-Mono text is Arimo. At the typography review stage, text tokens and links matched the prior PDF. Subsequent explicitly requested edits removed Selected Work and the EF SET disclaimer, and added a separate certificate action. Word geometry and margins passed, no overlaps or overflow. Poppler render inspected on all four pages. Web rendering, data, dates, translations, and links are untouched by this typography change.

- Arimo-Regular.ttf: SHA256 `41b22bc8f0b51f932825d37bc55b5eb6ba67dfe599a626e4aff2b43b624f9f8c`
- Arimo-Bold.ttf: SHA256 `d7a8b187cf8444d4cfee102e8eae9e3043682fd5106d5d33ed677fe268a0e2ba`
- GeistMono-Regular.ttf: SHA256 `5a0de4b3d54ab272f76a1d8c84b7fb24c67bbec6591d5300e61c7bc10094b6c8`
## Final design state before GitHub publication

- Arimo name 20 pt, name and subtitle centered.
- Four contact metadata items (location/contact/LinkedIn/portfolio) show labels above values, with full visible public URLs and two horizontal rules.
- Experience descriptions 9.5 pt, matching company names.
- Shared inter-section gap is 28 pt plus baseline metrics (approximately double the former gap); consistent on both pages.
- POAP progression is the entry title; its former secondary progression line is removed.
- No Selected Work or EF SET disclaimer in the PDF. EF SET score and small View certification / Ver certificado both link to the certificate.
- PDF URI links use standard annotations; opening in a new browser tab is controlled by the viewer, not guaranteed by the document.
- Top-right first-page accent (640x94 JPEG, 5,832 bytes) and bottom-left second-page accent (640x187 JPEG, 8,496 bytes) are embedded at 50% opacity. Bytes cached locally, no external image fetch. Final downloads approximately 45 KB.
- Footer is right-aligned Geist Mono: 1/2 and 2/2, no name or divider.
- Validation script matches this final state. Production build passes with fonts and both image assets traced for Vercel.
