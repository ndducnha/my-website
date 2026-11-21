// Interface strings and the bilingual text marker.

export const LANGS = ['en', 'vi'];
export const HOME = { en: '/', vi: '/vi/' };

const UI = {
  en: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    navLabel: 'Sections',
    langLabel: 'Language',
    social: 'Social',
    top: 'Top ↑',
    'notFound.title': 'Page not found',
    'notFound.text': 'The page you are looking for has moved or does not exist.',
    'notFound.home': 'Go to the home page',
  },
  vi: {
    skip: 'Bỏ qua, đến nội dung',
    menu: 'Menu',
    close: 'Đóng',
    navLabel: 'Các mục',
    langLabel: 'Ngôn ngữ',
    social: 'Mạng xã hội',
    top: 'Lên ↑',
    'notFound.title': 'Không tìm thấy trang',
    'notFound.text': 'Trang bạn tìm đã được chuyển hoặc không tồn tại.',
    'notFound.home': 'Về trang chủ',
  },
};

export function t(lang, key) {
  const value = UI[lang][key];
  if (value === undefined) throw new Error(`Missing UI string "${key}" for ${lang}`);
  return value;
}

export const L = (value, lang) => (value && typeof value === 'object' ? value[lang] : value);

// Content is written once with inline pairs: [[English||Tiếng Việt]].
// pick() keeps the side for `lang` and fails loudly on a malformed pair.
const PAIR = /\[\[([\s\S]*?)\|\|([\s\S]*?)\]\]/g;
export function pick(html, lang) {
  const out = html.replace(PAIR, (_, en, vi) => (lang === 'vi' ? vi : en));
  if (out.includes('[[') || out.includes('||') || out.includes(']]')) {
    throw new Error(`Unmatched [[…||…]] pair in ${lang} output near: ${out.slice(out.search(/\[\[|\|\||\]\]/) - 60, out.search(/\[\[|\|\||\]\]/) + 60)}`);
  }
  return out;
}
