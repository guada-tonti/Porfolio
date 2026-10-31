"""Validate generated downloads; requires pypdf and pdfplumber (QA only).
Usage: python validate-resume-pdf.py <pdf-directory> <data-snapshot.json>
The snapshot is exported from src/data/content.ts, not maintained manually.
"""
import json, sys, re
from pathlib import Path
from pypdf import PdfReader
import pdfplumber

root, snapshot = Path(sys.argv[1]), json.loads(Path(sys.argv[2]).read_text())
def norm(s):
    return re.sub(r'\s+', ' ', s.replace('–', '-').replace('—', '-').replace('’', "'")).strip()
for locale, filename in [('en','Guada_Tonti_Resume_EN.pdf'), ('es','Guada_Tonti_CV_ES.pdf')]:
    data = snapshot['dictionaries'][locale]['resumePage']
    file = root / filename
    reader = PdfReader(file)
    assert 1 <= len(reader.pages) <= 2
    texts = [page.extract_text() for page in reader.pages]
    text = norm(' '.join(texts))
    assert 'Guada Tonti' in text and snapshot['contactEmail'] in text
    assert '\ufffd' not in text and '\x00' not in text
    headings = [data[k].upper() for k in ['summaryTitle','experienceTitle','mainEducationTitle','toolsTitle','languagesTitle']]
    assert [text.index(h) for h in headings] == sorted(text.index(h) for h in headings)
    assert norm(data['summary']) in text
    for exp in data['experiences']:
        assert norm(exp['role']) in text
        assert norm(exp['company']) in text and norm(exp['period']) in text
        assert any(norm(exp['role']) in norm(page) and norm(exp['company']) in norm(page) and norm(exp['period']) in norm(page) for page in texts)
    assert text.count('POAP - The Proof of Attendance Protocol') == 1
    assert norm('Generalist Designer → UX/UI Designer → Senior UX/UI Designer') in text
    for course in data['educationCourses']:
        assert norm(course['title']) in text and norm(course['institution']) in text and norm(course['period']) in text
    assert data['mainEducationDegree'] in text and data['mainEducationPeriod'] in text
    for tool in data['tools']:
        assert norm(tool['label']+':') in text and norm(tool['details']) in text
    assert 'EF SET 75/100' in text and data['nativeLevel'] in text
    assert 'Interface Design Patterns UX Training' not in text
    uris = []
    for page in reader.pages:
        assert abs(float(page.mediabox.width)-595.2756)<.01 and abs(float(page.mediabox.height)-841.8898)<.01
        for ref in page.get('/Annots',[]):
            annotation = ref.get_object()
            if annotation.get('/A',{}).get('/URI'): uris.append(str(annotation['/A']['/URI']))
        for fontref in page['/Resources']['/Font'].values():
            font = fontref.get_object()
            for descendant in font.get('/DescendantFonts',[]):
                desc = descendant.get_object()['/FontDescriptor']
                assert any(key in desc for key in ['/FontFile','/FontFile2','/FontFile3']), 'Font not embedded'
    assert f"mailto:{snapshot['contactEmail']}" in uris
    assert snapshot['efSetCertificateUrl'] in uris
    assert any('linkedin.com/in/guadatonti/' in u for u in uris)
    assert len(uris) == 5
    assert not any('/work/' in u for u in uris)
    assert data['englishLevelContext'] not in text
    assert ('View certification' if locale == 'en' else 'Ver certificado') in text
    assert all('localhost' not in u and '127.0.0.1' not in u for u in uris)
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            assert len(page.chars) > 300, 'Empty or image-only page'
            for char in page.chars:
                assert 43 <= char['x0'] <= char['x1'] <= page.width-43, f'Horizontal overflow: {char}'
                assert 35 <= char['top'] <= char['bottom'] <= page.height-20, f'Vertical overflow: {char}'
            words = page.extract_words(extra_attrs=['fontname'])
            for i, a in enumerate(words):
                for b in words[i+1:]:
                    overlap_x = min(a['x1'],b['x1'])-max(a['x0'],b['x0'])
                    overlap_y = min(a['bottom'],b['bottom'])-max(a['top'],b['top'])
                    assert overlap_x < .8 or overlap_y < .8, 'Overlapping words'
        fonts = {c['fontname'] for page in pdf.pages for c in page.chars}
        assert all(any(name in font for font in fonts) for name in ['Arimo-Regular','Arimo-Bold','GeistMono-Regular'])
        mono_lines = []
        for page in pdf.pages:
            mono_rows = {}
            for c in page.chars:
                if 'GeistMono' in c['fontname']:
                    mono_rows.setdefault(round(c['top'],1),[]).append(c)
                else:
                    assert 'Arimo' in c['fontname'], 'Unexpected body font'
            mono_lines.extend(norm(''.join(c['text'] for c in sorted(row,key=lambda c:c['x0']))) for row in mono_rows.values())
        dates = [x['period'] for x in data['experiences']] + [x['period'] for x in data['educationCourses']] + [data['mainEducationPeriod']]
        assert all(norm(date) in mono_lines for date in dates), 'A date is not in Geist Mono'
        assert all(heading in mono_lines for heading in headings), 'A heading is not in Geist Mono'
        assert ('SELECTED WORK' if locale == 'en' else 'PROYECTOS SELECCIONADOS') not in text
    print(f'{locale}: PASS — {len(reader.pages)} A4 pages, {len(uris)} links, embedded fonts, complete content, logical extraction, no overflow/overlap.')
