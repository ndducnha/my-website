/* ============================================================
   Nguyễn Đình Đức Nhã — personal academic site
   "Atlas of a career" logic: language swap, nav spy, reveal,
   count-ups, typing, journey rail, and the SVG figure builders.
   Ported from the design handoff (class Component) to plain JS.
   All content renders in its final state even if animation never
   runs — nothing is gated behind an observer.
   ============================================================ */

class SiteApp {
  constructor() {
    this.NS = 'http://www.w3.org/2000/svg';
  }

  init() {
    this.lang = localStorage.getItem('preferredLang') || 'en';
    this.typerTimer = null;
    this.SPECIALTIES = {
      en: ['Cybersecurity & Network Security', 'AI-Driven Security & Machine Learning', 'Post-Quantum Cryptography', 'Cryptography & Secure Systems', 'IoT & Robotic Security'],
      vi: ['An ninh mạng & Bảo mật mạng', 'Bảo mật ứng dụng AI & Học máy', 'Mật mã hậu lượng tử', 'Mật mã học & Hệ thống an toàn', 'Bảo mật IoT & Robot']
    };
    this.chapters = [
      { id: 'biography', num: '01', le: 'From a network engineer in Ho Chi Minh City to a cybersecurity professor — a journey across AI, cryptography and the post-quantum frontier.', lv: 'Từ một kỹ sư mạng ở TP.HCM đến giáo sư an ninh mạng — hành trình xuyên qua AI, mật mã và biên giới hậu lượng tử.' },
      { id: 'education', num: '02', le: 'Knowledge built layer by layer — from electronics to a doctorate in cybersecurity.', lv: 'Tri thức được dựng nên từng lớp — từ điện tử đến bằng Tiến sĩ an ninh mạng.' },
      { id: 'awards', num: '03', le: 'Recognition earned on the world stage.', lv: 'Sự ghi nhận giành được trên đấu trường quốc tế.' },
      { id: 'areas-of-interest', num: '04', le: 'Seven research frontiers, one mission: securing the intelligent future.', lv: 'Bảy hướng nghiên cứu, một sứ mệnh: bảo vệ tương lai thông minh.' },
      { id: 'teaching', num: '05', le: 'Knowledge engineered to be mastered — and measured.', lv: 'Tri thức được thiết kế để chinh phục — và đo lường.' },
      { id: 'professional-experience', num: '06', le: 'Extensive experience spanning research, industry and national digital infrastructure.', lv: 'Nhiều năm kinh nghiệm trải khắp nghiên cứu, doanh nghiệp và hạ tầng mạng lõi.' },
      { id: 'publications', num: '07', le: 'A growing library of peer-reviewed research in the world’s top venues.', lv: 'Một thư viện nghiên cứu bình duyệt không ngừng mở rộng trên các diễn đàn hàng đầu thế giới.' },
      { id: 'leadership', num: '08', le: 'Influence that bridges academia, industry and government.', lv: 'Tầm ảnh hưởng bắc cầu giữa học thuật, doanh nghiệp và chính phủ.' },
      { id: 'mentorship', num: '09', le: 'Growing the next generation of researchers, one breakthrough at a time.', lv: 'Ươm mầm thế hệ nhà nghiên cứu kế tiếp, từng bước đột phá.' },
      { id: 'collaboration', num: '10', le: 'A research network without borders.', lv: 'Một mạng lưới nghiên cứu không biên giới.' },
      { id: 'work', num: '11', le: 'Let’s build the secure, intelligent future — together.', lv: 'Cùng nhau kiến tạo tương lai an toàn và thông minh.' },
      { id: 'references', num: '12', le: 'Trusted by senior academics — verified, on the record.', lv: 'Được các học giả kỳ cựu bảo chứng — xác thực, chính thức.' }
    ];
    this.navLabels = { biography: ['Biography', 'Tiểu sử'], education: ['Education', 'Học vấn'], awards: ['Awards', 'Giải thưởng'], 'areas-of-interest': ['Interests', 'Lĩnh vực'], teaching: ['Teaching', 'Giảng dạy'], 'professional-experience': ['Experience', 'Kinh nghiệm'], publications: ['Publications', 'Công bố'], leadership: ['Leadership', 'Lãnh đạo'], mentorship: ['Mentorship', 'Hướng dẫn'], collaboration: ['Collaboration', 'Hợp tác'], work: ['Work with me', 'Hợp tác cùng'], references: ['References', 'Tham chiếu'] };
    this.worlds = {
      biography: { acc: '#6D5FAE', deep: '#4b3f86', light: '#8a7ec9', rgb: [109, 95, 174], wash: '#f1eff8' },
      education: { acc: '#2F6DB0', deep: '#245488', light: '#5b93cf', rgb: [47, 109, 176], wash: '#eaf1f9' },
      awards: { acc: '#C79A3A', deep: '#a97f28', light: '#e0b85a', rgb: [199, 154, 58], dark: true },
      'areas-of-interest': { acc: '#7C3AED', deep: '#5B21B6', light: '#8b5cf6', rgb: [124, 58, 237], wash: '#f3effb' },
      teaching: { acc: '#1F8A5B', deep: '#166844', light: '#39a877', rgb: [31, 138, 91], wash: '#e9f5ef' },
      'professional-experience': { acc: '#B4702A', deep: '#8f571f', light: '#cf9350', rgb: [180, 112, 42], wash: '#f7efe6' },
      publications: { acc: '#0E8C8C', deep: '#0a6a6a', light: '#33abab', rgb: [14, 140, 140], wash: '#e6f4f4' },
      leadership: { acc: '#4C4DB8', deep: '#3a3b93', light: '#7273d0', rgb: [76, 77, 184], wash: '#ecedf9' },
      mentorship: { acc: '#C2557A', deep: '#9c3f61', light: '#d67d9b', rgb: [194, 85, 122], wash: '#fbeef3' },
      collaboration: { acc: '#2593AE', deep: '#1c7189', light: '#4fb4cd', rgb: [37, 147, 174], wash: '#e6f3f7' },
      work: { acc: '#7C3AED', deep: '#5B21B6', light: '#8b5cf6', rgb: [124, 58, 237], wash: '#f3effb' },
      references: { acc: '#566173', deep: '#3f4756', light: '#7a8494', rgb: [86, 97, 115], wash: '#eef0f3' }
    };
    this.injectChapters();
    this.initFigures();
    this.applyWorlds();
    this.buildJourney();
    this.applyLang(this.lang);
    if (!localStorage.getItem('preferredLang')) {
      const m = document.getElementById('langModal');
      if (m) m.style.display = 'flex';
    }
    this.initScroll();
    this.initReveal();
    this.initNavSpy();
    this.initCountUp();
  }

  injectChapters() {
    this.chapters.forEach((c) => {
      const s = document.getElementById(c.id);
      if (!s || s.querySelector('[data-wm]')) return;
      s.style.position = 'relative';
      s.style.overflow = 'clip';
      const wm = document.createElement('div');
      wm.textContent = c.num;
      wm.setAttribute('data-wm', c.id);
      wm.style.cssText = 'position:absolute;top:30px;right:-6px;font-family:var(--serif);font-weight:600;font-size:clamp(104px,15vw,214px);line-height:.78;color:' + (c.id === 'awards' ? 'rgba(255,255,255,.07)' : 'rgba(124,58,237,.06)') + ';z-index:-1;pointer-events:none;user-select:none;letter-spacing:-.03em';
      s.insertBefore(wm, s.firstChild);
      const h2 = s.querySelector('h2');
      if (!h2) return;
      const lead = document.createElement('p');
      lead.setAttribute('data-en', c.le);
      lead.setAttribute('data-vi', c.lv);
      lead.setAttribute('data-lead', '1');
      lead.textContent = c.le;
      lead.style.cssText = 'font-family:var(--serif);font-style:italic;font-weight:400;font-size:clamp(1.08rem,2.1vw,1.42rem);color:' + (c.id === 'awards' ? 'rgba(255,255,255,.74)' : 'var(--purpledeep)') + ';max-width:720px;margin:-12px 0 32px;line-height:1.46';
      h2.insertAdjacentElement('afterend', lead);
    });
  }

  buildJourney() {
    if (window.innerWidth < 1240 || document.getElementById('journeyRail')) return;
    const rail = document.createElement('div');
    rail.id = 'journeyRail';
    rail.style.cssText = 'position:fixed;left:24px;top:50%;transform:translateY(-50%);z-index:900;padding:4px 0';
    const track = document.createElement('div');
    track.style.cssText = 'position:relative';
    const line = document.createElement('div');
    line.style.cssText = 'position:absolute;left:6px;top:8px;bottom:8px;width:2px;background:var(--line);border-radius:2px';
    const fill = document.createElement('div');
    fill.id = 'journeyFill';
    fill.style.cssText = 'position:absolute;left:6px;top:8px;width:2px;height:0;background:linear-gradient(180deg,var(--purple),var(--purple2));border-radius:2px;transition:height .2s linear';
    track.appendChild(line);
    track.appendChild(fill);
    this.jNodes = [];
    this.chapters.forEach((c) => {
      const node = document.createElement('button');
      node.type = 'button';
      node.setAttribute('data-jid', c.id);
      node.style.cssText = 'display:flex;align-items:center;gap:12px;background:none;border:none;cursor:pointer;padding:5px 0;margin:0;position:relative';
      const dot = document.createElement('span');
      dot.style.cssText = 'width:13px;height:13px;border-radius:50%;background:var(--paper);border:2px solid var(--line);flex-shrink:0;transition:.3s;box-sizing:border-box';
      const num = document.createElement('span');
      num.textContent = c.num;
      num.style.cssText = 'font-family:var(--mono);font-size:9px;font-weight:600;color:var(--ink3);width:14px;text-align:left;transition:.3s';
      const label = document.createElement('span');
      label.setAttribute('data-jlabel', c.id);
      label.textContent = this.navLabels[c.id] ? this.navLabels[c.id][0] : c.id;
      label.style.cssText = 'font-family:var(--mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--purpledeep);white-space:nowrap;opacity:0;transform:translateX(-6px);transition:.3s;pointer-events:none';
      node.appendChild(dot);
      node.appendChild(num);
      node.appendChild(label);
      node.addEventListener('click', () => {
        const t = document.getElementById(c.id);
        if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 84, behavior: 'smooth' });
      });
      node.addEventListener('mouseenter', () => { if (!node._active) label.style.opacity = '.55'; label.style.transform = 'translateX(0)'; });
      node.addEventListener('mouseleave', () => { if (!node._active) { label.style.opacity = '0'; label.style.transform = 'translateX(-6px)'; } });
      track.appendChild(node);
      this.jNodes.push({ id: c.id, node, dot, num, label });
    });
    rail.appendChild(track);
    const root = document.getElementById('root');
    (root || document.body).appendChild(rail);
    window.addEventListener('resize', () => { rail.style.display = window.innerWidth < 1240 ? 'none' : 'block'; });
  }

  setJourneyActive(id) {
    if (!this.jNodes) return;
    this.jNodes.forEach((n) => {
      const on = n.id === id;
      n.node._active = on;
      n.dot.style.background = on ? 'var(--purple)' : 'var(--paper)';
      n.dot.style.borderColor = on ? 'var(--purple)' : 'var(--line)';
      n.dot.style.transform = on ? 'scale(1.25)' : 'scale(1)';
      n.num.style.color = on ? 'var(--purpledeep)' : 'var(--ink3)';
      n.label.style.opacity = on ? '1' : '0';
      n.label.style.transform = on ? 'translateX(0)' : 'translateX(-6px)';
    });
    // sync journey labels to current language
    if (this.navLabels) this.jNodes.forEach((n) => { const L = this.navLabels[n.id]; if (L) n.label.textContent = this.lang === 'vi' ? L[1] : L[0]; });
  }

  updateJourneyFill() {
    const fill = document.getElementById('journeyFill');
    if (!fill || !this.jNodes) return;
    const total = document.body.scrollHeight - window.innerHeight;
    const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
    const first = this.jNodes[0].node, last = this.jNodes[this.jNodes.length - 1].node;
    const span = (last.offsetTop + 6) - (first.offsetTop + 6);
    fill.style.height = (span * p) + 'px';
  }

  applyLang(lang) {
    this.lang = lang;
    localStorage.setItem('preferredLang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-en]').forEach((el) => {
      const t = lang === 'vi' ? el.getAttribute('data-vi') : el.getAttribute('data-en');
      if (t != null) el.innerHTML = t;
    });
    document.querySelectorAll('[data-lang]').forEach((el) => {
      el.style.display = (el.getAttribute('data-lang') === lang) ? '' : 'none';
    });
    const en = document.getElementById('btnEn'), vi = document.getElementById('btnVi');
    if (en && vi) {
      const on = 'background:var(--purple);color:#fff;';
      const off = 'background:transparent;color:var(--ink3);';
      en.style.cssText = 'border:none;padding:7px 12px;border-radius:8px;cursor:pointer;font-family:var(--mono);font-size:10.5px;font-weight:600;letter-spacing:.05em;transition:.2s;' + (lang === 'en' ? on : off);
      vi.style.cssText = 'border:none;padding:7px 12px;border-radius:8px;cursor:pointer;font-family:var(--mono);font-size:10.5px;font-weight:600;letter-spacing:.05em;transition:.2s;' + (lang === 'vi' ? on : off);
    }
    if (this.jNodes && this.navLabels) this.jNodes.forEach((n) => { const L = this.navLabels[n.id]; if (L) n.label.textContent = lang === 'vi' ? L[1] : L[0]; });
    this.restartTyper(lang);
  }

  hideModal() {
    const m = document.getElementById('langModal');
    if (m) m.style.display = 'none';
  }

  restartTyper(lang) {
    const el = document.getElementById('heroTyped');
    if (!el) return;
    if (this.typerTimer) clearTimeout(this.typerTimer);
    const items = this.SPECIALTIES[lang === 'vi' ? 'vi' : 'en'];
    let idx = 0, ch = 0, del = false;
    const tick = () => {
      const w = items[idx];
      el.textContent = w.substring(0, ch);
      if (!del && ch < w.length) { ch++; this.typerTimer = setTimeout(tick, 55); }
      else if (!del && ch === w.length) { del = true; this.typerTimer = setTimeout(tick, 1700); }
      else if (del && ch > 0) { ch--; this.typerTimer = setTimeout(tick, 26); }
      else { del = false; idx = (idx + 1) % items.length; this.typerTimer = setTimeout(tick, 280); }
    };
    tick();
  }

  initScroll() {
    const bar = document.getElementById('topbar');
    const btn = document.getElementById('backToTop');
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (bar) {
          if (y > 40) { bar.style.background = 'rgba(251,250,252,.92)'; bar.style.borderBottomColor = 'var(--line)'; bar.style.boxShadow = '0 1px 3px rgba(28,24,38,.05)'; }
          else { bar.style.background = 'rgba(251,250,252,.78)'; bar.style.borderBottomColor = 'transparent'; bar.style.boxShadow = 'none'; }
        }
        if (btn) btn.style.display = y > 400 ? 'block' : 'none';
        this.updateJourneyFill();
        ticking = false;
      });
    });
    this.updateJourneyFill();
  }

  initReveal() {
    // Content is ALWAYS visible by default. The reveal is a pure entrance
    // animation via WAAPI (element ends at its natural visible state), so a
    // re-render can never leave anything hidden.
    if (!('IntersectionObserver' in window) || !('animate' in Element.prototype)) return;
    const secs = document.querySelectorAll('#main > section');
    const ease = 'cubic-bezier(.22,.61,.36,1)';
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        if (!e.target._revealed) {
          e.target._revealed = true;
          e.target.animate([{ opacity: 0, transform: 'translateY(26px)' }, { opacity: 1, transform: 'none' }], { duration: 700, easing: ease });
          const wm = e.target.querySelector('[data-wm]');
          if (wm) wm.animate([{ opacity: 0, transform: 'translateY(34px)' }, { opacity: 1, transform: 'none' }], { duration: 950, easing: ease });
        }
        io.unobserve(e.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    secs.forEach((s) => io.observe(s));
  }

  initNavSpy() {
    const links = document.querySelectorAll('#navList a');
    const map = {};
    links.forEach((l) => { const h = l.getAttribute('href'); if (h && h.startsWith('#')) map[h.slice(1)] = l; });
    const targets = Object.keys(map).map((id) => document.getElementById(id)).filter(Boolean);
    if (!targets.length || !('IntersectionObserver' in window)) return;
    const spy = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((l) => { l.style.color = 'var(--ink3)'; l.style.background = 'transparent'; });
          const l = map[e.target.id];
          if (l) { l.style.color = 'var(--purpledeep)'; l.style.background = 'var(--wash)'; }
          this.setJourneyActive(e.target.id);
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach((t) => spy.observe(t));
  }

  initCountUp() {
    const nums = document.querySelectorAll('.stat-num[data-count]');
    // Baseline: show the real target immediately so a value is NEVER stuck at 0.
    nums.forEach((n) => { n.textContent = n.getAttribute('data-count'); });
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target, target = parseInt(el.getAttribute('data-count'), 10);
        let cur = 0; const step = Math.max(1, Math.ceil(target / 32));
        const run = () => { cur = Math.min(target, cur + step); el.textContent = cur; if (cur < target) requestAnimationFrame(run); };
        run(); obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach((n) => obs.observe(n));
  }

  toggleMenu() {
    const nav = document.getElementById('mainMenu');
    if (!nav) return;
    nav.setAttribute('data-open', nav.getAttribute('data-open') === '1' ? '0' : '1');
  }

  // ---- Signature figure engine (an atlas of one career) ----
  mk(tag, a) { const e = document.createElementNS(this.NS, tag); for (const k in a) e.setAttribute(k, a[k]); return e; }
  svg(w, h) { const s = this.mk('svg', { viewBox: '0 0 ' + w + ' ' + h, width: '100%', preserveAspectRatio: 'xMidYMid meet' }); s.style.height = 'auto'; s.style.display = 'block'; s.style.overflow = 'visible'; return s; }
  t(x, y, str, size, fill, anchor, weight, family) {
    const fam = family === 'serif' ? "'Newsreader',Georgia,serif" : "'JetBrains Mono',monospace";
    const e = this.mk('text', { x: x, y: y, 'font-family': fam, 'font-size': size, fill: fill, 'text-anchor': anchor || 'middle' });
    if (weight) e.setAttribute('font-weight', weight);
    e.textContent = str; return e;
  }
  draw(el) { const len = el.getTotalLength ? el.getTotalLength() : 300; el.setAttribute('stroke-dasharray', len); el.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: 1100, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'backwards' }); }
  onView(el, fn) { if (!el) return; el._anim = fn; if (this._figIO) this._figIO.observe(el); else { try { fn(); } catch (x) {} } }
  figFrame(id, capEn, capVi) {
    const s = document.getElementById(id);
    if (!s || s.querySelector('[data-fig]')) return null;
    const dark = id === 'awards';
    const anchor = s.querySelector('[data-lead]') || s.querySelector('h2');
    if (!anchor) return null;
    const wrap = document.createElement('div');
    wrap.setAttribute('data-fig', id);
    wrap.style.cssText = 'margin:2px 0 30px;padding-top:16px;border-top:1px dashed ' + (dark ? 'rgba(255,255,255,.18)' : 'var(--line)');
    const num = (this.chapters.find((c) => c.id === id) || {}).num || '';
    const cap = document.createElement('div');
    cap.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:16px;font-family:var(--mono);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:' + (dark ? 'rgba(255,255,255,.5)' : 'var(--ink3)');
    cap.innerHTML = '<span style="color:' + (dark ? 'var(--purple2)' : 'var(--purple)') + ';font-weight:600">Fig. ' + num + '</span><span data-en="' + capEn + '" data-vi="' + capVi + '">' + capEn + '</span>';
    wrap.appendChild(cap);
    const body = document.createElement('div');
    wrap.appendChild(body);
    anchor.insertAdjacentElement('afterend', wrap);
    return body;
  }
  initFigures() {
    this.NS = 'http://www.w3.org/2000/svg';
    if ('IntersectionObserver' in window) {
      this._figIO = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting && e.target._anim) { try { e.target._anim(); } catch (x) {} e.target._anim = null; this._figIO.unobserve(e.target); } }); }, { threshold: 0.2 });
    }
    this.figBiography(); this.figEducation(); this.figAwards(); this.figInterests(); this.figTeaching();
    this.figExperience(); this.figPublications(); this.figLeadership(); this.figMentorship();
    this.figCollaboration(); this.figWork();
  }
  figBiography() {
    const b = this.figFrame('biography', 'Many hats, one mission', 'Nhiều vai trò, một sứ mệnh'); if (!b) return;
    b.style.cssText = 'display:grid;grid-template-columns:minmax(0,1fr) auto;gap:36px;align-items:center';
    const left = document.createElement('div');
    left.innerHTML = '<div style="font-family:var(--mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--purpledeep);margin-bottom:12px">Currently</div>'
      + '<div id="bioType" style="font-family:var(--serif);font-size:clamp(1.5rem,3.2vw,2.3rem);color:var(--ink);min-height:2.5em;line-height:1.24"></div>'
      + '<div style="font-family:var(--mono);font-size:11.5px;color:var(--ink3);margin-top:6px">academia × industry × government</div>';
    const S = 250;
    const orbit = document.createElement('div');
    orbit.style.cssText = 'position:relative;width:' + S + 'px;height:' + S + 'px;flex-shrink:0';
    const conic = document.createElement('div');
    conic.style.cssText = 'position:absolute;inset:0;border-radius:50%;background:conic-gradient(from 0deg,transparent,var(--purple2),transparent 42%,var(--purpledeep),transparent);-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 3px));mask:radial-gradient(farthest-side,transparent calc(100% - 3px),#000 calc(100% - 3px));opacity:.55;animation:orbSpin 14s linear infinite';
    const guide = document.createElement('div');
    guide.style.cssText = 'position:absolute;inset:30px;border:1px dashed var(--line);border-radius:50%';
    const ring = document.createElement('div');
    ring.style.cssText = 'position:absolute;inset:0;animation:orbSpin 46s linear infinite';
    const roles = ['Professor', 'Founder', 'CEO', 'CTO', 'President', 'Researcher'];
    roles.forEach((r, i) => {
      const a = (i / roles.length) * 2 * Math.PI - Math.PI / 2; const R = S / 2;
      const chip = document.createElement('div'); chip.textContent = r;
      chip.style.cssText = 'position:absolute;left:' + (R + (R - 14) * Math.cos(a)) + 'px;top:' + (R + (R - 14) * Math.sin(a)) + 'px;transform:translate(-50%,-50%);animation:orbCounter 46s linear infinite;font-family:var(--mono);font-size:10px;font-weight:600;color:var(--purpledeep);background:#fff;border:1px solid var(--line);border-radius:999px;padding:5px 11px;white-space:nowrap;box-shadow:0 4px 12px rgba(28,24,38,.07)';
      ring.appendChild(chip);
    });
    const center = document.createElement('div');
    center.style.cssText = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:104px;height:104px;border-radius:50%;background:#fff;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;text-align:center;box-shadow:0 8px 24px rgba(28,24,38,.08)';
    center.innerHTML = '<div style="font-family:var(--serif);font-size:1.2rem;color:var(--purpledeep);line-height:1.05">Dr.<br>Nhã</div>';
    orbit.appendChild(conic); orbit.appendChild(guide); orbit.appendChild(ring); orbit.appendChild(center);
    b.appendChild(left); b.appendChild(orbit);
    this.bioTyper(document.getElementById('bioType'), ['Assistant Professor', 'Founder — VCyber Lab', 'CEO — Data Digitization', 'CTO — Vcyber · Samanta · Viriya', 'President — IDT Scientific Council']);
  }
  bioTyper(el, items) { if (!el) return; let i = 0, ch = 0, del = false; const tick = () => { const w = items[i]; el.textContent = w.substring(0, ch); if (!del && ch < w.length) { ch++; setTimeout(tick, 46); } else if (!del && ch === w.length) { del = true; setTimeout(tick, 1700); } else if (del && ch > 0) { ch--; setTimeout(tick, 22); } else { del = false; i = (i + 1) % items.length; setTimeout(tick, 260); } }; tick(); }
  figEducation() {
    const b = this.figFrame('education', 'Academic ascent · 2011 → 2024', 'Đường học vấn · 2011 → 2024'); if (!b) return;
    const W = 640, H = 210, s = this.svg(W, H);
    const pts = [[70, 158, '2011', 'Bachelor', 'PTIT'], [320, 104, '2020', 'Master', 'QUT'], [578, 52, '2024', 'PhD', 'Deakin']];
    for (let i = 0; i < 4; i++) { const y = 42 + i * 40; s.appendChild(this.mk('line', { x1: 40, y1: y, x2: W - 20, y2: y, stroke: 'rgba(124,58,237,.07)', 'stroke-width': 1 })); }
    const area = this.mk('path', { d: 'M70,158 L320,104 L578,52 L578,180 L70,180 Z', fill: 'rgba(124,58,237,.07)' }); s.appendChild(area);
    const poly = this.mk('polyline', { points: pts.map((p) => p[0] + ',' + p[1]).join(' '), fill: 'none', stroke: '#7c3aed', 'stroke-width': 2.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }); s.appendChild(poly);
    pts.forEach((p) => {
      s.insertBefore(this.mk('line', { x1: p[0], y1: p[1], x2: p[0], y2: 182, stroke: 'rgba(124,58,237,.28)', 'stroke-width': 1, 'stroke-dasharray': '2 3' }), s.firstChild);
      s.appendChild(this.mk('circle', { cx: p[0], cy: p[1], r: 6, fill: '#fff', stroke: '#7c3aed', 'stroke-width': 2.5 }));
      s.appendChild(this.t(p[0], p[1] - 15, p[2], '12', '#5B21B6', 'middle', '600'));
      s.appendChild(this.t(p[0], p[1] + 26, p[3], '11', '#4E495B', 'middle', '600'));
      s.appendChild(this.t(p[0], p[1] + 40, p[4], '9', '#847E92', 'middle'));
    });
    const P = 'M70,158 L320,104 L578,52';
    const trail = this.mk('circle', { r: 12, fill: 'rgba(124,58,237,.16)' }); const tm = this.mk('animateMotion', { path: P, dur: '5s', repeatCount: 'indefinite', calcMode: 'linear' }); trail.appendChild(tm); s.appendChild(trail);
    const dot = this.mk('circle', { r: 5.5, fill: '#7c3aed' }); const dm = this.mk('animateMotion', { path: P, dur: '5s', repeatCount: 'indefinite', calcMode: 'linear' }); dot.appendChild(dm); s.appendChild(dot);
    b.appendChild(s);
    this.onView(s, () => { this.draw(poly); area.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 900, fill: 'backwards' }); });
  }
  figAwards() {
    const b = this.figFrame('awards', 'Honours', 'Vinh danh'); if (!b) return;
    b.style.position = 'relative'; b.style.overflow = 'hidden'; b.style.borderRadius = '16px';
    const glow = document.createElement('div');
    glow.style.cssText = 'position:absolute;top:-50px;bottom:-50px;left:0;width:34%;background:radial-gradient(circle at 50% 50%,rgba(224,184,90,.24),transparent 70%);animation:sweepX 8s ease-in-out infinite;pointer-events:none';
    b.appendChild(glow);
    const W = 640, H = 180, s = this.svg(W, H); s.style.position = 'relative';
    s.appendChild(this.mk('line', { x1: 90, y1: 82, x2: 550, y2: 82, stroke: 'rgba(255,255,255,.14)', 'stroke-width': 1 }));
    const md = [[160, 'I', 'C2C CTF', 'MIT · 2022'], [320, 'II', 'Excellence', 'Deakin · 2022'], [480, 'III', "Dean's List", 'QUT · 19/20']];
    md.forEach((m) => {
      const c = this.mk('circle', { cx: m[0], cy: 82, r: 40, fill: 'rgba(139,92,246,.10)', stroke: '#8b5cf6', 'stroke-width': 1.5 });
      c.style.transformBox = 'fill-box'; c.style.transformOrigin = 'center'; s.appendChild(c);
      const glint = this.mk('circle', { cx: m[0], cy: 82, r: 40, fill: 'none', stroke: 'rgba(255,255,255,.65)', 'stroke-width': 1.5, 'stroke-dasharray': '18 234' }); glint.style.transformBox = 'fill-box'; glint.style.transformOrigin = 'center'; glint.style.animation = 'textSpin ' + (5 + m[0] % 3) + 's linear infinite'; s.appendChild(glint);
      s.appendChild(this.t(m[0], 93, m[1], '30', '#fff', 'middle', '500', 'serif'));
      s.appendChild(this.t(m[0], 150, m[2], '12', 'rgba(255,255,255,.92)', 'middle', '600'));
      s.appendChild(this.t(m[0], 166, m[3], '9', 'rgba(255,255,255,.5)', 'middle'));
      this.onView(c, () => { c.animate([{ opacity: 0, transform: 'scale(.6)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 700, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' }); });
    });
    b.appendChild(s);
  }
  figInterests() {
    const b = this.figFrame('areas-of-interest', 'Research constellation', 'Chòm sao nghiên cứu'); if (!b) return;
    const W = 680, H = 350, s = this.svg(W, H);
    const cx = 340, cy = 172, rx = 235, ry = 118;
    const items = ['ML & AI Security', 'AI Applications', 'IoT IDS', 'Cryptography', 'Next-Gen NetSec', 'PQC', 'VPN'];
    const pos = items.map((_, i) => { const a = (-90 + i * (360 / items.length)) * Math.PI / 180; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
    const spokes = [];
    pos.forEach((p) => { const ln = this.mk('line', { x1: cx, y1: cy, x2: p[0], y2: p[1], stroke: 'rgba(124,58,237,.2)', 'stroke-width': 1 }); s.appendChild(ln); spokes.push(ln); });
    s.appendChild(this.mk('polygon', { points: pos.map((p) => p[0] + ',' + p[1]).join(' '), fill: 'none', stroke: 'rgba(124,58,237,.14)', 'stroke-width': 1 }));
    s.appendChild(this.mk('circle', { cx: cx, cy: cy, r: 34, fill: 'rgba(124,58,237,.10)', stroke: '#7c3aed', 'stroke-width': 1.5 }));
    s.appendChild(this.t(cx, cy - 2, 'Research', '9', '#5B21B6', 'middle', '600'));
    s.appendChild(this.t(cx, cy + 10, 'Core', '9', '#5B21B6', 'middle', '600'));
    pos.forEach((p, i) => {
      s.appendChild(this.mk('circle', { cx: p[0], cy: p[1], r: 6, fill: '#fff', stroke: '#7c3aed', 'stroke-width': 2 }));
      const right = p[0] >= cx - 2;
      s.appendChild(this.t(p[0] + (right ? 12 : -12), p[1] + 4, items[i], '10', '#4E495B', right ? 'start' : 'end', '600'));
    });
    s.querySelectorAll('line').forEach((ln, i) => { ln.style.strokeDasharray = '3 7'; ln.style.animation = 'dashFlow ' + (3 + i * 0.25) + 's linear infinite'; });
    s.querySelectorAll('circle').forEach((c, i) => { if (c.getAttribute('r') === '6') { c.style.animation = 'twinkle ' + (2.4 + (i % 3) * 0.6) + 's ease-in-out infinite'; } });
    b.appendChild(s);
    this.onView(s, () => { spokes.forEach((ln, i) => ln.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: i * 70, fill: 'backwards' })); });
  }
  figTeaching() {
    const b = this.figFrame('teaching', 'Student satisfaction', 'Mức độ hài lòng'); if (!b) return;
    const W = 640, H = 190, s = this.svg(W, H);
    const g = [[130, 100, 'Cyber Sec Mgmt'], [320, 100, 'Sec Analytics'], [510, 92.9, 'Adv. Network Sec']];
    const R = 46, C = 2 * Math.PI * R;
    g.forEach((d) => {
      const cx = d[0], cy = 76, val = d[1];
      s.appendChild(this.mk('circle', { cx: cx, cy: cy, r: R, fill: 'none', stroke: 'rgba(124,58,237,.14)', 'stroke-width': 8 }));
      const arc = this.mk('circle', { cx: cx, cy: cy, r: R, fill: 'none', stroke: '#7c3aed', 'stroke-width': 8, 'stroke-linecap': 'round', transform: 'rotate(-90 ' + cx + ' ' + cy + ')' });
      const off = C * (1 - val / 100); arc.style.strokeDasharray = C; arc.style.strokeDashoffset = off; s.appendChild(arc);
      const pct = this.t(cx, cy + 6, (val % 1 ? val.toFixed(1) : val) + '%', '16', '#5B21B6', 'middle', '600', 'serif'); s.appendChild(pct);
      s.appendChild(this.t(cx, cy + R + 26, d[2], '10', '#4E495B', 'middle', '600'));
      this.onView(arc, () => {
        arc.animate([{ strokeDashoffset: C }, { strokeDashoffset: off }], { duration: 1300, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'backwards' });
        const t0 = performance.now();
        const run = (ts) => { const p = Math.min(1, (ts - t0) / 1300); const cur = val * (1 - Math.pow(1 - p, 3)); pct.textContent = (val % 1 ? cur.toFixed(1) : Math.round(cur)) + '%'; if (p < 1) requestAnimationFrame(run); else pct.textContent = (val % 1 ? val.toFixed(1) : val) + '%'; };
        requestAnimationFrame(run);
      });
    });
    b.appendChild(s);
  }
  figExperience() {
    const b = this.figFrame('professional-experience', 'Career log', 'Nhật ký sự nghiệp'); if (!b) return;
    b.style.cssText = 'background:#17131f;border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:20px 22px;box-shadow:0 20px 50px rgba(28,24,38,.16)';
    b.innerHTML = '<div style="display:flex;align-items:center;gap:7px;margin-bottom:16px"><span style="width:11px;height:11px;border-radius:50%;background:#ff5f56"></span><span style="width:11px;height:11px;border-radius:50%;background:#ffbd2e"></span><span style="width:11px;height:11px;border-radius:50%;background:#27c93f"></span><span style="margin-left:10px;font-family:var(--mono);font-size:10.5px;color:rgba(255,255,255,.4)">career.log — nha@vinuni</span></div><div id="termBody" style="font-family:var(--mono);font-size:12.5px;line-height:2;color:rgba(255,255,255,.85);min-height:184px"></div>';
    const lines = [['2026', 'National Barcode Center', 'Director of Innovation & Tech Transfer'], ['2024', 'VinUniversity', 'Assistant Professor'], ['2023', 'Deakin University', 'Associate Research Fellow'], ['2022', 'Deakin University', 'Research Assistant & Teaching'], ['2017', 'Tech JDI', 'Senior Test Engineer'], ['2013', 'TMA Solution', 'Test Analyst & Networking'], ['2011', 'VNPT', 'Networking Specialist']];
    this.termLog(document.getElementById('termBody'), lines);
  }
  termLog(el, lines) {
    if (!el || el._ran) return; el._ran = true; let i = 0;
    const put = () => {
      if (i >= lines.length) { const c = document.createElement('div'); c.style.marginTop = '4px'; c.innerHTML = '<span style="color:#cf9350">nha@vinuni</span><span style="color:rgba(255,255,255,.45)">:~$</span> <span style="display:inline-block;width:8px;height:14px;background:#cf9350;vertical-align:-2px;animation:blink2 1s steps(1) infinite"></span>'; el.appendChild(c); return; }
      const L = lines[i]; const row = document.createElement('div');
      row.innerHTML = '<span style="color:#cf9350">❯</span> <span style="color:#e0b877">' + L[0] + '</span>&nbsp;&nbsp;<span style="color:#fff">' + L[2] + '</span> <span style="color:rgba(255,255,255,.4)">@ ' + L[1] + '</span>';
      el.appendChild(row); row.animate([{ opacity: 0, transform: 'translateX(-8px)' }, { opacity: 1, transform: 'none' }], { duration: 320, fill: 'backwards' });
      i++; setTimeout(put, 560);
    };
    put();
  }
  figPublications() {
    const b = this.figFrame('publications', 'Output by year', 'Công bố theo năm'); if (!b) return;
    const W = 560, H = 210, s = this.svg(W, H);
    const data = [['2021', 1], ['2022', 2], ['2023', 4], ['2024', 2], ['2025', 2]];
    const max = 4, bw = 52, x0 = 56, baseY = 165, gap = (W - 80 - data.length * bw) / (data.length - 1);
    s.appendChild(this.mk('line', { x1: 40, y1: baseY, x2: W - 20, y2: baseY, stroke: 'rgba(124,58,237,.2)' }));
    data.forEach((d, i) => {
      const bx = x0 + i * (bw + gap); const h = d[1] / max * 118; const by = baseY - h;
      const rect = this.mk('rect', { x: bx, y: by, width: bw, height: h, rx: 5, fill: '#7c3aed' });
      rect.style.transformBox = 'fill-box'; rect.style.transformOrigin = 'bottom'; s.appendChild(rect);
      s.appendChild(this.t(bx + bw / 2, by - 8, String(d[1]), '12', '#5B21B6', 'middle', '600'));
      s.appendChild(this.t(bx + bw / 2, baseY + 18, d[0], '10', '#847E92', 'middle'));
      this.onView(rect, () => { rect.animate([{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 900, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'backwards' }); });
    });
    b.appendChild(s);
  }
  figLeadership() {
    const b = this.figFrame('leadership', 'Sphere of influence', 'Phạm vi ảnh hưởng'); if (!b) return;
    const W = 680, H = 340, s = this.svg(W, H);
    const cx = 340, cy = 170;
    [70, 110, 150].forEach((r) => s.appendChild(this.mk('circle', { cx: cx, cy: cy, r: r, fill: 'none', stroke: 'rgba(124,58,237,.1)', 'stroke-width': 1 })));
    [0, 1.6].forEach((delay) => { const rp = this.mk('circle', { cx: cx, cy: cy, r: 34, fill: 'none', stroke: 'rgba(124,58,237,.5)', 'stroke-width': 1.5 }); rp.style.transformBox = 'fill-box'; rp.style.transformOrigin = 'center'; rp.style.animation = 'ripple 3.4s ease-out infinite'; rp.style.animationDelay = delay + 's'; s.appendChild(rp); });
    const orgs = [['IDT', 'President'], ['NCA', 'Member'], ['DDC', 'CEO'], ['Vcyber', 'CTO'], ['Samanta', 'CTO'], ['Viriya', 'CTO']];
    const pos = orgs.map((_, i) => { const a = (-90 + i * 60) * Math.PI / 180; return [cx + 150 * Math.cos(a), cy + 150 * Math.sin(a)]; });
    pos.forEach((p) => s.appendChild(this.mk('line', { x1: cx, y1: cy, x2: p[0], y2: p[1], stroke: 'rgba(124,58,237,.2)' })));
    pos.forEach((p, i) => {
      s.appendChild(this.mk('circle', { cx: p[0], cy: p[1], r: 27, fill: '#fff', stroke: '#7c3aed', 'stroke-width': 1.5 }));
      s.appendChild(this.t(p[0], p[1] - 1, orgs[i][0], '10', '#181321', 'middle', '600'));
      s.appendChild(this.t(p[0], p[1] + 11, orgs[i][1], '8', '#847E92', 'middle'));
    });
    s.appendChild(this.mk('circle', { cx: cx, cy: cy, r: 34, fill: '#7c3aed' }));
    s.appendChild(this.t(cx, cy - 2, 'Dr.', '10', '#fff', 'middle', '600'));
    s.appendChild(this.t(cx, cy + 11, 'Nhã', '10', '#fff', 'middle', '600'));
    b.appendChild(s);
    this.onView(s, () => { s.querySelectorAll('circle').forEach((c, i) => c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: i * 60, fill: 'backwards' })); });
  }
  figMentorship() {
    const b = this.figFrame('mentorship', 'Talent pipeline', 'Đường ươm mầm'); if (!b) return;
    const W = 600, H = 210, s = this.svg(W, H);
    const tiers = [['Bachelor', 4], ['Master · current', 2], ['Master · graduated', 2], ['Joint outputs', 2]];
    const rowH = 46, x0 = 200, dotR = 9, gap = 28;
    tiers.forEach((tr, i) => {
      const y = 28 + i * rowH;
      s.appendChild(this.t(184, y + 5, tr[0], '11', '#4E495B', 'end', '600'));
      for (let k = 0; k < tr[1]; k++) {
        const dx = x0 + k * (dotR * 2 + gap);
        const c = this.mk('circle', { cx: dx, cy: y, r: dotR, fill: i === 3 ? 'rgba(124,58,237,.15)' : '#7c3aed', stroke: i === 3 ? '#7c3aed' : 'none', 'stroke-width': 1.5 });
        c.style.transformBox = 'fill-box'; c.style.transformOrigin = 'center'; s.appendChild(c);
        this.onView(c, () => { c.animate([{ opacity: 0, transform: 'scale(0)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 500, delay: (i * 3 + k) * 90, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' }); });
      }
    });
    const arrow = this.mk('line', { x1: x0 - 6, y1: 28 + 3 * rowH + 8, x2: x0 + 150, y2: 16, stroke: '#7c3aed', 'stroke-width': 2, 'stroke-dasharray': '3 5' });
    s.appendChild(arrow); this.onView(arrow, () => this.draw(arrow));
    s.appendChild(this.t(x0 + 150, 10, 'the next generation →', '9.5', '#5B21B6', 'end', '600'));
    b.appendChild(s);
  }
  figCollaboration() {
    const b = this.figFrame('collaboration', 'Research network', 'Mạng lưới nghiên cứu'); if (!b) return;
    const W = 680, H = 300, s = this.svg(W, H);
    const cx = 340, cy = 150;
    const left = ['Andrew', 'Dinh', 'Long', 'Thanh', 'Truong'], right = ['Syed', 'Sood'];
    const lp = left.map((_, i) => [140, 44 + i * 54]), rp = right.map((_, i) => [540, 110 + i * 80]);
    lp.concat(rp).forEach((p, i) => {
      s.appendChild(this.mk('line', { x1: cx, y1: cy, x2: p[0], y2: p[1], stroke: 'rgba(124,58,237,.18)' }));
      const pk = this.mk('circle', { r: 3, fill: '#7c3aed' }); const pm = this.mk('animateMotion', { path: 'M' + p[0] + ',' + p[1] + ' L' + cx + ',' + cy, dur: (2.4 + i * 0.35) + 's', repeatCount: 'indefinite', calcMode: 'linear' }); pk.appendChild(pm); s.appendChild(pk);
    });
    s.appendChild(this.t(140, 22, 'VinUniversity', '10', '#847E92', 'middle', '600'));
    s.appendChild(this.t(540, 88, 'Deakin', '10', '#847E92', 'middle', '600'));
    lp.forEach((p, i) => { s.appendChild(this.mk('circle', { cx: p[0], cy: p[1], r: 7, fill: '#fff', stroke: '#7c3aed', 'stroke-width': 2 })); s.appendChild(this.t(p[0] - 14, p[1] + 4, left[i], '10', '#4E495B', 'end', '600')); });
    rp.forEach((p, i) => { s.appendChild(this.mk('circle', { cx: p[0], cy: p[1], r: 7, fill: '#fff', stroke: '#7c3aed', 'stroke-width': 2 })); s.appendChild(this.t(p[0] + 14, p[1] + 4, right[i], '10', '#4E495B', 'start', '600')); });
    s.appendChild(this.mk('circle', { cx: cx, cy: cy, r: 38, fill: 'rgba(124,58,237,.10)', stroke: '#7c3aed', 'stroke-width': 1.5 }));
    s.appendChild(this.t(cx, cy - 2, 'Cyber · AI', '9', '#5B21B6', 'middle', '600'));
    s.appendChild(this.t(cx, cy + 11, 'PQC · IoT', '9', '#5B21B6', 'middle', '600'));
    b.appendChild(s);
    this.onView(s, () => { s.querySelectorAll('line').forEach((l, i) => l.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: i * 80, fill: 'backwards' })); });
  }
  figWork() {
    const b = this.figFrame('work', 'Open positions', 'Vị trí tuyển dụng'); if (!b) return;
    const W = 680, H = 300, s = this.svg(W, H);
    const cx = 560, cy = 150;
    const dirs = ['Air-Quality IoT', 'PQC', 'Applied AI Sec', 'Anomaly Detect', 'IoT Security', 'Robotics Sec'];
    const yp = dirs.map((_, i) => 40 + i * 44);
    yp.forEach((y, i) => {
      s.appendChild(this.mk('line', { x1: 210, y1: y, x2: cx, y2: cy, stroke: 'rgba(124,58,237,.18)' }));
      s.appendChild(this.mk('circle', { cx: 210, cy: y, r: 5, fill: '#fff', stroke: '#7c3aed', 'stroke-width': 2 }));
      s.appendChild(this.t(200, y + 4, dirs[i], '10', '#4E495B', 'end', '600'));
    });
    s.appendChild(this.mk('circle', { cx: cx, cy: cy, r: 44, fill: 'rgba(124,58,237,.10)', stroke: '#7c3aed', 'stroke-width': 1.5 }));
    [0, 1.5].forEach((d) => { const rp = this.mk('circle', { cx: cx, cy: cy, r: 44, fill: 'none', stroke: 'rgba(124,58,237,.5)', 'stroke-width': 1.5 }); rp.style.transformBox = 'fill-box'; rp.style.transformOrigin = 'center'; rp.style.animation = 'ripple 3s ease-out infinite'; rp.style.animationDelay = d + 's'; s.appendChild(rp); });
    const rr = this.mk('circle', { cx: cx, cy: cy, r: 54, fill: 'none', stroke: '#7c3aed', 'stroke-width': 1, 'stroke-dasharray': '2 8' }); rr.style.transformBox = 'fill-box'; rr.style.transformOrigin = 'center'; rr.style.animation = 'textSpin 18s linear infinite'; s.appendChild(rr);
    s.appendChild(this.mk('circle', { cx: cx, cy: cy, r: 30, fill: '#7c3aed' }));
    s.appendChild(this.t(cx, cy + 5, 'Join', '13', '#fff', 'middle', '600', 'serif'));
    b.appendChild(s);
    this.onView(s, () => { s.querySelectorAll('line').forEach((l, i) => l.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, delay: i * 90, fill: 'backwards' })); });
  }
  figReferences() {
    const b = this.figFrame('references', 'Verified endorsements', 'Bảo chứng đã xác thực'); if (!b) return;
    const W = 640, H = 170, s = this.svg(W, H);
    s.appendChild(this.mk('line', { x1: 130, y1: 70, x2: 510, y2: 70, stroke: 'rgba(124,58,237,.16)' }));
    const refs = [[130, 'KS', 'Dr. Keshav Sood', 'Deakin'], [320, 'YX', 'Prof. Yong Xiang', 'Deakin'], [510, 'LP', 'A/Prof. Lei Pan', 'Deakin']];
    refs.forEach((r) => {
      s.appendChild(this.mk('circle', { cx: r[0], cy: 70, r: 34, fill: '#fff', stroke: '#7c3aed', 'stroke-width': 1.5 }));
      s.appendChild(this.t(r[0], 76, r[1], '15', '#5B21B6', 'middle', '600', 'serif'));
      s.appendChild(this.mk('circle', { cx: r[0] + 25, cy: 48, r: 10, fill: '#7c3aed' }));
      s.appendChild(this.t(r[0] + 25, 52, '✓', '10', '#fff', 'middle', '700'));
      s.appendChild(this.t(r[0], 122, r[2], '11', '#4E495B', 'middle', '600'));
      s.appendChild(this.t(r[0], 137, r[3], '9', '#847E92', 'middle'));
      const sig = this.mk('path', { d: 'M' + (r[0] - 28) + ',152 q9,-9 18,-1 t17,1 t14,-3', fill: 'none', stroke: '#7c3aed', 'stroke-width': 1.5, 'stroke-linecap': 'round', opacity: 0.85 });
      s.appendChild(sig); this.onView(sig, () => this.draw(sig));
    });
    b.appendChild(s);
    this.onView(s, () => { s.querySelectorAll('circle').forEach((c, i) => c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 500, delay: i * 90, fill: 'backwards' })); });
  }

  applyWorlds() {
    Object.keys(this.worlds).forEach((id) => {
      const s = document.getElementById(id); if (!s) return;
      const w = this.worlds[id];
      if (!w.dark) {
        s.style.setProperty('--purple', w.acc);
        s.style.setProperty('--purpledeep', w.deep);
        s.style.setProperty('--purple2', w.light);
        if (w.wash) s.style.setProperty('--wash', w.wash);
      } else {
        s.style.setProperty('--purple', w.light);
        s.style.setProperty('--purpledeep', w.acc);
        s.style.setProperty('--purple2', w.light);
      }
      if (w.wash && ['leadership', 'mentorship', 'collaboration', 'areas-of-interest'].indexOf(id) >= 0) s.style.background = w.wash;
      if (id === 'education') s.style.backgroundImage = 'radial-gradient(rgba(' + w.rgb.join(',') + ',.07) 1px,transparent 1.4px)';
      const wm = s.querySelector('[data-wm]');
      if (wm) wm.style.color = w.dark ? 'rgba(255,255,255,.07)' : 'rgba(' + w.rgb.join(',') + ',.07)';
      this.themeFigure(s, w);
    });
  }
  themeFigure(s, w) {
    const fig = s.querySelector('[data-fig]'); if (!fig) return;
    const rgb = w.rgb.join(',');
    const remap = (v) => {
      if (!v) return v;
      if (v === '#7c3aed' || v === '#8b5cf6') return w.acc;
      if (v === '#5B21B6') return w.deep;
      if (v.indexOf('rgba(124,58,237') === 0 || v.indexOf('rgba(139,92,246') === 0) return v.replace(/rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,/, 'rgba(' + rgb + ',');
      return v;
    };
    fig.querySelectorAll('*').forEach((el) => {
      ['stroke', 'fill'].forEach((a) => { const v = el.getAttribute(a); const nv = remap(v); if (nv && nv !== v) el.setAttribute(a, nv); });
      if (el.style) { if (el.style.stroke) el.style.stroke = remap(el.style.stroke); if (el.style.fill) el.style.fill = remap(el.style.fill); }
    });
  }
}

/* ---- style-hover: replicate the design runtime's hover behavior ----
   Any element with a `style-hover` attribute gets those declarations
   layered on top of its current inline style while hovered, then
   restored on leave (preserving nav-spy / language state changes). */
function initStyleHover() {
  document.querySelectorAll('[style-hover]').forEach((el) => {
    const hover = el.getAttribute('style-hover');
    if (!hover) return;
    el.addEventListener('mouseenter', () => { el._snap = el.style.cssText; el.style.cssText = el._snap + ';' + hover; });
    el.addEventListener('mouseleave', () => { if (el._snap != null) el.style.cssText = el._snap; });
  });
}

/* ---- bootstrap ---- */
const app = new SiteApp();

function boot() {
  app.init();
  const vals = {
    setEn: () => { app.applyLang('en'); app.hideModal(); },
    setVi: () => { app.applyLang('vi'); app.hideModal(); },
    toggleMenu: () => app.toggleMenu(),
    goTop: () => window.scrollTo({ top: 0, behavior: 'smooth' })
  };
  // Expose handlers referenced by inline onclick attributes.
  window.setEn = vals.setEn;
  window.setVi = vals.setVi;
  window.toggleMenu = vals.toggleMenu;
  window.goTop = vals.goTop;
  initStyleHover();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
