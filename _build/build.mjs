#!/usr/bin/env node
// Static site build. No dependencies: `node _build/build.mjs` from the repo root.
// Writes generated HTML into the repository root (served by GitHub Pages):
//   index.html (English), vi/index.html, en/index.html (redirect), 404.html, sitemap.xml, robots.txt

import { mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE } from './content/site.mjs';
import { NAV, body } from './content/onepage.mjs';
import { LANGS, HOME, pick, t } from './lib/i18n.mjs';
import { layout, personJsonLd } from './lib/components.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// Generated directories are rebuilt from scratch so removed pages disappear.
for (const dir of ['en', 'vi']) {
  const full = join(ROOT, dir);
  if (existsSync(full)) rmSync(full, { recursive: true });
}

function write(path, html) {
  const file = join(ROOT, path.endsWith('/') ? path + 'index.html' : path);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

for (const lang of LANGS) {
  const page = {
    lang,
    path: HOME[lang],
    title: SITE.title[lang],
    description: SITE.description[lang],
    nav: NAV,
    body: body(lang),
    jsonld: [personJsonLd(lang)],
  };
  write(page.path, pick(layout(page), lang));
}

write('/404.html', pick(layout({
  lang: 'en', path: '/404.html', noindex: true,
  title: `${t('en', 'notFound.title')} · ${SITE.name.en}`,
  description: t('en', 'notFound.text'),
  body: `
<section class="section not-found">
  <div class="container">
    <h1 class="page-title">${t('en', 'notFound.title')}</h1>
    <p class="page-lede">${t('en', 'notFound.text')}</p>
    <p lang="vi" class="page-lede page-lede--secondary">${t('vi', 'notFound.text')}</p>
    <div class="actions">
      <a class="btn" href="/">${t('en', 'notFound.home')}</a>
      <a class="btn btn--ghost" href="/vi/" lang="vi">${t('vi', 'notFound.home')}</a>
    </div>
  </div>
</section>`,
}), 'en'));

// /en/ forwards to the root, where the English page lives.
write('/en/', `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>${SITE.name.en}</title>
<link rel="canonical" href="${SITE.url}/">
<meta http-equiv="refresh" content="0; url=/">
<meta name="robots" content="noindex">
</head><body><p><a href="/">${SITE.name.en}</a></p></body></html>
`);

const today = new Date().toISOString().slice(0, 10);
const urls = LANGS.map((lang) => `  <url>
    <loc>${SITE.url}${HOME[lang]}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="en" href="${SITE.url}${HOME.en}"/>
    <xhtml:link rel="alternate" hreflang="vi" href="${SITE.url}${HOME.vi}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE.url}${HOME.en}"/>
  </url>`).join('\n');
write('/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`);

write('/robots.txt', `User-agent: *
Allow: /

Sitemap: ${SITE.url}/sitemap.xml
`);

console.log('Built /, /vi/, /en/ (redirect) and /404.html.');
