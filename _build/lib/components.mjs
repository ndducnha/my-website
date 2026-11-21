// Layout and shared pieces. Each returns an HTML string.

import { SITE, PROFILES, SOCIAL } from '../content/site.mjs';
import { HOME, L, t } from './i18n.mjs';
import { ASSET_VERSION } from './version.mjs';

export const esc = (s) => String(s ?? '')
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const abs = (path) => SITE.url + path;

const CSP = [
  "default-src 'self'",
  "img-src 'self' data:",
  "style-src 'self' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "script-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const FONTS = 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap';

export function personJsonLd(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE.name.vi,
    alternateName: SITE.nameAscii,
    url: SITE.url + '/',
    image: abs('/assets/img/portrait-828.jpg'),
    jobTitle: L(SITE.jobTitle, lang),
    worksFor: { '@type': 'CollegeOrUniversity', name: 'VinUniversity', url: 'https://vinuni.edu.vn' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Deakin University' },
      { '@type': 'CollegeOrUniversity', name: 'Queensland University of Technology' },
      { '@type': 'CollegeOrUniversity', name: 'Posts and Telecommunications Institute of Technology' },
    ],
    knowsAbout: ['Cybersecurity', 'Artificial intelligence', 'Post-quantum cryptography', 'IoT security', 'Network security'],
    sameAs: PROFILES.map((p) => p.url),
  };
}

// nav: [{ id, label }] in-page anchors; empty for the 404 page.
function header({ lang, nav = [] }) {
  const items = nav.map((n) => `<li><a href="#${n.id}" data-spy="${n.id}">${n.label}</a></li>`).join('');
  const langLink = (code, label, name) => {
    const cur = code === lang;
    return `<a href="${HOME[code]}" hreflang="${code}" lang="${code}" aria-label="${name}" data-lang-link${cur ? ' aria-current="true"' : ''}>${label}</a>`;
  };
  return `<header class="site-header" data-header>
  <div class="container container--wide header-inner">
    <a class="seal" href="${HOME[lang]}"><picture><source type="image/avif" srcset="/assets/img/seal-112.avif"><img src="/assets/img/seal-112.jpg" width="56" height="56" alt="${SITE.name[lang]}"></picture></a>
    ${nav.length ? `<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-nav-toggle data-label-open="${t(lang, 'menu')}" data-label-close="${t(lang, 'close')}">
      <span class="nav-toggle-label">${t(lang, 'menu')}</span><span class="nav-toggle-icon" aria-hidden="true"></span>
    </button>` : ''}
    <nav id="site-nav" class="site-nav" aria-label="${t(lang, 'navLabel')}" data-nav>
      ${items ? `<ul class="nav-list">${items}</ul>` : ''}
      <div class="lang-switch" role="group" aria-label="${t(lang, 'langLabel')}">${langLink('en', 'EN', 'English')}<span aria-hidden="true">/</span>${langLink('vi', 'VI', 'Tiếng Việt')}</div>
    </nav>
  </div>
</header>`;
}

function footer(lang) {
  const year = new Date().getFullYear();
  const links = [...SOCIAL.map((s) => `<li><a href="${esc(s.url)}">${s.label}</a></li>`), `<li><a href="${SITE.url}/">ducnha.work</a></li>`].join('');
  return `<footer class="site-footer">
  <div class="container footer-inner">
    <p class="footer-name">${SITE.name[lang]}</p>
    <div class="footer-social"><span class="footer-label">${t(lang, 'social')}</span><ul class="footer-links">${links}</ul></div>
    <p class="footer-legal">© <span data-year>${year}</span> · ${L(SITE.location, lang)}</p>
  </div>
</footer>
<a class="back-to-top" href="#top" data-back-to-top>${t(lang, 'top')}</a>`;
}

// page: { lang, path, title, description, body, nav?, jsonld?: object[], noindex? }
export function layout(page) {
  const { lang, title, description } = page;
  const canonical = abs(page.path);
  const jsonld = (page.jsonld ?? [])
    .map((j) => `<script type="application/ld+json">${JSON.stringify(j).replaceAll('<', '\\u003c')}</script>`)
    .join('\n');
  const hreflang = page.noindex ? '' : [
    `<link rel="alternate" hreflang="en" href="${abs(HOME.en)}">`,
    `<link rel="alternate" hreflang="vi" href="${abs(HOME.vi)}">`,
    `<link rel="alternate" hreflang="x-default" href="${abs(HOME.en)}">`,
  ].join('\n');
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${CSP}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
${hreflang}
<meta property="og:type" content="profile">
<meta property="og:site_name" content="${SITE.name[lang]}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${abs(SITE.ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(L(SITE.portrait.alt, lang))}">
<meta property="og:locale" content="${lang === 'vi' ? 'vi_VN' : 'en_US'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#F8F7F4">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<link rel="stylesheet" href="/assets/css/site.css?v=${ASSET_VERSION}">
<noscript><link rel="stylesheet" href="/assets/css/noscript.css"></noscript>
${jsonld}
<script src="/assets/js/site.js?v=${ASSET_VERSION}" defer></script>
</head>
<body id="top">
<a class="skip-link" href="#main">${t(lang, 'skip')}</a>
${header(page)}
<main id="main" tabindex="-1">
${page.body}
</main>
${footer(lang)}
</body>
</html>
`;
}

// One section: label column (title, lede) + content column.
export function section({ id, title, lede, body, tone = 'white' }) {
  return `<section class="block block--${tone}" id="${id}" aria-labelledby="${id}-h">
  <div class="container split">
    <header class="block-head">
      <h2 class="block-title" id="${id}-h">${title}</h2>
      ${lede ? `<p class="block-lede">${lede}</p>` : ''}
    </header>
    <div class="block-body">${body}</div>
  </div>
</section>`;
}

export function portrait(lang, { sizes = '(min-width: 960px) 34vw, 90vw' } = {}) {
  const { width, height } = SITE.portrait;
  return `<picture>
  <source type="image/avif" srcset="/assets/img/portrait-480.avif 480w, /assets/img/portrait-828.avif 828w" sizes="${sizes}">
  <img src="/assets/img/portrait-828.jpg" srcset="/assets/img/portrait-480.jpg 480w, /assets/img/portrait-828.jpg 828w" sizes="${sizes}" width="${width}" height="${height}" alt="${esc(L(SITE.portrait.alt, lang))}" fetchpriority="high" decoding="async">
</picture>`;
}
