# Behance integration preview

Only three projects, no production deployment. Branch: codex/behance-integration-test.

- aerolab-home: new catalog record; year 2018 from source title; Product Design, Web Design, Website, Work. Classification proposed for review. ES source description retained, EN translation generated.
- poap-design-system: existing record reused. Its title, descriptions, overview and categories remain unchanged. Only the downloaded media and the generated ES translation of its original in-progress note are added.
- poaps-design-web3-communities: new record; 2020–2021 from the original description. Graphic Design, Illustration, Work proposed for review. Original EN description retained as overview. ES translations and bilingual short card summaries generated for review.

All embedded text inside images remains in its original language. No OCR or claims of translating image content. Original editable HTML/text and links are preserved in behance-audit.json; displayed editable text uses the site's typography with its original links and sequence.

97 local assets are copied byte for byte, SHA-256 checked: 85 static internal images, 8 animated GIFs, 3 covers, 1 MP4. No destructive optimization. Next Image may generate web delivery variants of static images while source files remain intact. GIFs use unoptimized delivery.

Limitations: 36 POAP collection images are 548×548; one GIF is 476×340; Design System cover is 808×632. Images are constrained to intrinsic width, preserving ratios. MediaCollection modules remain explicit flex galleries using original flexWidth weights. Sequential image modules remain sequential. Video rendition 1280×694, 13.8 seconds. Original authoring masters are not implied by downloaded CDN files.

New reusable content renderer consumes ordered modules. Only two catalog records were added. behanceCovers.json is a small client-safe cover map; behanceMedia.json is server-rendered and not imported by cards. Lazy images, native lazy GIF loading, video preload=none. Existing hero, navigation, server configuration and dependencies unchanged by this integration.

## Validation

- Build passed (50 generated routes), TypeScript and targeted ESLint passed.
- Six EN/ES detail routes returned 200. All 97 local files returned 200 and matched the downloaded SHA-256.
- Catalog contains 15 unique projects: only two added; Design System reused. Category, origin and search checks passed.
- Browser checked desktop and 390px mobile: expected module counts 4, 20 and 54, no horizontal overflow or broken loaded images. Console error log empty during checked pages.
- Local MP4 played via native controls: readyState 4, paused=false, advancing time, 1280×694, 13.8 seconds. All 8 GIF files preserve multiple distinct frames and are delivered unoptimized with lazy loading.
- POAPs contains a source inconsistency: original description says 2020–2021, first image says 2020–2024. Neither source was altered. Review the displayed year before publication.
- Existing working tree had uncommitted changes before this task. A separate branch was created without discarding or committing those changes. No deploy, dependency, server configuration or navigation changes.
