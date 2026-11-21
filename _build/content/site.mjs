// Site-wide facts used by the layout (metadata, schema, footer).
// The page text itself lives in onepage.mjs.

export const SITE = {
  url: 'https://ducnha.vn',
  name: { en: 'Nguyễn Đình Đức Nhã', vi: 'Nguyễn Đình Đức Nhã' },
  nameAscii: 'Nguyen Dinh Duc Nha',
  title: { en: 'Nguyễn Đình Đức Nhã, Ph.D. | VinUniversity', vi: 'TS. Nguyễn Đình Đức Nhã | VinUniversity' },
  description: {
    en: 'Nguyễn Đình Đức Nhã, Ph.D., Assistant Professor at VinUniversity. Cybersecurity, AI-Driven Security, Post-Quantum Cryptography.',
    vi: 'TS. Nguyễn Đình Đức Nhã, Giảng viên tại VinUniversity. An ninh mạng, Bảo mật ứng dụng AI, Mật mã hậu lượng tử.',
  },
  jobTitle: { en: 'Assistant Professor, Computer Science (Cybersecurity, AI)', vi: 'Giảng viên ngành Khoa học Máy tính (An ninh mạng, AI)' },
  location: { en: 'Hanoi, Vietnam', vi: 'Hà Nội, Việt Nam' },
  portrait: {
    alt: { en: 'Dr. Nguyễn Đình Đức Nhã', vi: 'TS. Nguyễn Đình Đức Nhã' },
    width: 828,
    height: 1242,
  },
  ogImage: '/assets/img/og-default.jpg',
};

export const PHONE = { display: '0909 39 9988', tel: '0909399988', apps: 'Zalo, Viber, Telegram, WhatsApp, WeChat' };

export const EMAIL = {
  academic: 'nha.ndd@vinuni.edu.vn',
  publicSector: 'nhandd@nbc.gov.vn',
  business: 'nha.ndd@vcyber.vn',
  personal: 'ndducnha@gmail.com',
};

export const PROFILES = [
  { id: 'scholar', label: 'Google Scholar', url: 'https://scholar.google.com.au/citations?user=SIWu-ZcAAAAJ&hl=en&oi=sra' },
  { id: 'orcid', label: 'ORCID', url: 'https://orcid.org/0000-0002-8106-7703' },
  { id: 'scopus', label: 'Scopus', url: 'https://www.scopus.com/authid/detail.uri?authorId=57214528477' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/dinh-duc-nha-nguyen-677428158' },
];

export const SOCIAL = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/dinh-duc-nha-nguyen-677428158' },
  { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=1513403651' },
];
