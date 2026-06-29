/* ============================================================
   DR. DINH DUC NHA NGUYEN — PORTFOLIO  ·  INTERACTIONS
   Vanilla JS only. All original logic preserved:
   language switching, language modal, mobile menu,
   back-to-top, scroll reveal. Plus refined micro-interactions.
   ============================================================ */

/* ------------------------------------------------------------
   MOBILE MENU
   ------------------------------------------------------------ */
function toggleMenu() {
    const nav = document.querySelector('.topbar nav');
    if (nav) nav.classList.toggle('open');
}

/* ------------------------------------------------------------
   LANGUAGE SWITCHING  (data-en / data-vi)
   ------------------------------------------------------------ */
// Highlight the active language button
function setActiveButton(lang) {
    const allButtons = document.querySelectorAll('.language-selector .lang-btn');
    allButtons.forEach(function (btn) {
        btn.classList.remove('active');
        const t = btn.textContent.trim();
        if ((t === 'English' && lang === 'en') || (t === 'Tiếng Việt' && lang === 'vi')) {
            btn.classList.add('active');
        }
    });
}

// Swap all translatable text nodes
function changeLanguage(lang) {
    localStorage.setItem('preferredLang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-en], [data-vi]').forEach(function (el) {
        if (lang === 'vi' && el.getAttribute('data-vi')) {
            el.textContent = el.getAttribute('data-vi');
        } else if (lang === 'en' && el.getAttribute('data-en')) {
            el.textContent = el.getAttribute('data-en');
        }
    });

    setTimeout(function () { setActiveButton(lang); }, 100);
    restartTyper(lang); // refresh rotating specialty line in the right language
}

// First-visit language modal
function showLangModalIfNeeded() {
    const modal = document.getElementById('langModal');
    if (modal && !localStorage.getItem('preferredLang')) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function chooseLangFromModal(lang) {
    localStorage.setItem('preferredLang', lang);
    const modal = document.getElementById('langModal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
    changeLanguage(lang);
}

/* ------------------------------------------------------------
   SMOOTH SCROLL TO TOP
   ------------------------------------------------------------ */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ------------------------------------------------------------
   HERO ROTATING SPECIALTY (typing effect)
   ------------------------------------------------------------ */
const SPECIALTIES = {
    en: [
        'Cybersecurity & Network Security',
        'AI-Driven Security & Machine Learning',
        'Post-Quantum Cryptography',
        'Cryptography & Secure Systems',
        'IoT & Robotic Security'
    ],
    vi: [
        'An ninh mạng & Bảo mật mạng',
        'Bảo mật ứng dụng AI & Học máy',
        'Mật mã hậu lượng tử',
        'Mật mã học & Hệ thống an toàn',
        'Bảo mật IoT & Robot'
    ]
};

let typerTimer = null;
function restartTyper(lang) {
    const el = document.querySelector('.hero-typer .typed');
    if (!el) return;
    if (typerTimer) clearTimeout(typerTimer);

    const items = SPECIALTIES[lang === 'vi' ? 'vi' : 'en'];
    let idx = 0, char = 0, deleting = false;

    function tick() {
        const word = items[idx];
        el.textContent = word.substring(0, char);

        if (!deleting && char < word.length) {
            char++;
            typerTimer = setTimeout(tick, 55);
        } else if (!deleting && char === word.length) {
            deleting = true;
            typerTimer = setTimeout(tick, 1700);
        } else if (deleting && char > 0) {
            char--;
            typerTimer = setTimeout(tick, 28);
        } else {
            deleting = false;
            idx = (idx + 1) % items.length;
            typerTimer = setTimeout(tick, 280);
        }
    }
    tick();
}

/* ------------------------------------------------------------
   SECTION DATA-VIZ ENHANCEMENTS (progressive, content preserved)
   - Teaching: circular satisfaction % ring / "NEW · 2025" tag
   - Publications: Q1 venue badge
   These only ADD visual elements; original text is untouched.
   ------------------------------------------------------------ */
function enhanceSections() {
    // Teaching course cards
    document.querySelectorAll('#teaching > ul > li').forEach(function (li) {
        const m = (li.innerText || '').match(/Satisfaction:\s*([\d.]+)\s*%/i);
        if (m) {
            const val = parseFloat(m[1]);
            const ring = document.createElement('div');
            ring.className = 'sat-ring';
            ring.dataset.sat = val;            // animated to this on reveal
            ring.style.setProperty('--sat', 0);
            ring.innerHTML = '<span>0%</span>';
            ring.setAttribute('aria-hidden', 'true');
            li.classList.add('has-meta');
            li.appendChild(ring);
        } else if (/\b2025\b/.test(li.innerText || '')) {
            const tag = document.createElement('div');
            tag.className = 'course-tag';
            tag.textContent = 'NEW · 2025';
            li.classList.add('has-meta');
            li.appendChild(tag);
        }
    });

    // Publications: flag Q1 articles
    document.querySelectorAll('.pub-list li').forEach(function (li) {
        if (/\(Q1/i.test(li.textContent || '')) {
            const b = document.createElement('span');
            b.className = 'q1-badge';
            b.textContent = 'Q1';
            li.appendChild(b);
        }
    });
}

/* ------------------------------------------------------------
   LUXURY EFFECTS — glass sheen sweep + animated satisfaction rings
   ------------------------------------------------------------ */
function fmtPct(v) { return (v % 1 === 0) ? String(Math.round(v)) : v.toFixed(1); }

function animateRing(ring) {
    const target = parseFloat(ring.dataset.sat) || 0;
    const span = ring.querySelector('span');
    ring.style.setProperty('--sat', target);   // CSS @property transitions the arc
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (span) span.textContent = fmtPct(target) + '%';
        return;
    }
    const dur = 1100;
    let t0 = null;
    function step(ts) {
        if (t0 === null) t0 = ts;
        const p = Math.min(1, (ts - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);   // ease-out cubic
        if (span) span.textContent = fmtPct(target * eased) + '%';
        if (p < 1) requestAnimationFrame(step);
        else if (span) span.textContent = fmtPct(target) + '%';
    }
    requestAnimationFrame(step);
}

function initLuxury() {
    // Inject a glass light-sweep into each card
    const cardSel = [
        '.cert-grid > li', '.interest-grid > li',
        '#education > ul:not(.cert-grid) > li',
        '#awards > ul > li', '#teaching > ul > li',
        '#biography > ul > li', '#leadership > ul > li',
        '#references > ul > li', '.pub-list > li'
    ].join(',');
    document.querySelectorAll(cardSel).forEach(function (el) {
        el.classList.add('lux-card');
        const shine = document.createElement('span');
        shine.className = 'lux-shine';
        shine.setAttribute('aria-hidden', 'true');
        el.appendChild(shine);
    });

    // Animate satisfaction rings when they scroll into view
    const rings = document.querySelectorAll('.sat-ring');
    if (rings.length && 'IntersectionObserver' in window) {
        const ro = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                animateRing(e.target);
                ro.unobserve(e.target);
            });
        }, { threshold: 0.6 });
        rings.forEach(function (r) { ro.observe(r); });
    } else {
        rings.forEach(animateRing);
    }
}

/* ------------------------------------------------------------
   BESPOKE SECTION WORLDS (each section its own concept)
   All builders only RESTRUCTURE/ADD presentation; text + links
   stay in the original <li>/<p> nodes (content preserved).
   ------------------------------------------------------------ */
function currentLang() { return localStorage.getItem('preferredLang') || 'en'; }

// Network/constellation builder — turns a <ul> of <li> into a node graph
function buildNetwork(sectionSel, opts) {
    const section = document.querySelector(sectionSel);
    if (!section) return;
    const ul = section.querySelector(opts.list);
    if (!ul) return;
    const nodes = Array.prototype.slice.call(ul.children).filter(function (el) { return el.tagName === 'LI'; });
    if (!nodes.length) return;

    ul.classList.add('net-stage');
    const SVGNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'net-svg');
    ul.insertBefore(svg, ul.firstChild);

    const hub = document.createElement('div');
    hub.className = 'net-hub';
    const hl = document.createElement('span');
    hl.setAttribute('data-en', opts.hubEn);
    hl.setAttribute('data-vi', opts.hubVi);
    hl.textContent = (currentLang() === 'vi') ? opts.hubVi : opts.hubEn;
    hub.appendChild(hl);
    ul.appendChild(hub);

    nodes.forEach(function (n) { n.classList.add('net-node'); });

    function pos(i, cx, cy, rx, ry) {
        const ang = (-90 + i * (360 / nodes.length)) * Math.PI / 180;
        return { x: cx + rx * Math.cos(ang), y: cy + ry * Math.sin(ang) };
    }
    function layout() {
        const W = ul.clientWidth || 640, H = ul.clientHeight || 460;
        const cx = W / 2, cy = H / 2;
        const rx = Math.min(W * 0.38, 360), ry = Math.min(H * 0.36, 190);
        svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        hub.style.left = cx + 'px'; hub.style.top = cy + 'px';
        while (svg.firstChild) svg.removeChild(svg.firstChild);
        nodes.forEach(function (node, i) {
            const p = pos(i, cx, cy, rx, ry);
            node.style.left = p.x + 'px';
            node.style.top = p.y + 'px';
            const ln = document.createElementNS(SVGNS, 'line');
            ln.setAttribute('x1', cx); ln.setAttribute('y1', cy);
            ln.setAttribute('x2', p.x); ln.setAttribute('y2', p.y);
            ln.setAttribute('class', 'net-line');
            svg.appendChild(ln);
        });
        if (opts.ring !== false) {
            nodes.forEach(function (node, i) {
                const a = pos(i, cx, cy, rx, ry), b = pos((i + 1) % nodes.length, cx, cy, rx, ry);
                const ln = document.createElementNS(SVGNS, 'line');
                ln.setAttribute('x1', a.x); ln.setAttribute('y1', a.y);
                ln.setAttribute('x2', b.x); ln.setAttribute('y2', b.y);
                ln.setAttribute('class', 'net-line ring');
                svg.appendChild(ln);
            });
        }
    }
    layout();
    let rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layout, 160); });
}

// Professional Certifications → clean datasheet (domain · certificates · count)
function buildCertSpectrum() {
    document.querySelectorAll('#education .cert-grid > li').forEach(function (li) {
        const n = li.querySelectorAll('a').length;
        if (!n) return;
        const b = document.createElement('span');
        b.className = 'cert-count';
        b.textContent = n + (n > 1 ? ' certs' : ' cert');
        li.insertBefore(b, li.firstChild);
    });
}

// Teaching → split the "Technical skills" line into chips (original kept, hidden)
function buildTeachingSkills() {
    document.querySelectorAll('#teaching > ul > li').forEach(function (li) {
        li.querySelectorAll('u').forEach(function (u) {
            if (!/skill/i.test(u.textContent || '')) return;
            const sp = u.nextElementSibling;
            if (!sp || sp.tagName !== 'SPAN') return;
            const parts = (sp.textContent || '').split(/[·,|]/).map(function (s) { return s.trim(); }).filter(Boolean);
            if (parts.length < 2) return;
            const wrap = document.createElement('div');
            wrap.className = 'skill-chips';
            parts.forEach(function (p) {
                const c = document.createElement('span');
                c.className = 'skill-chip';
                c.textContent = p;
                wrap.appendChild(c);
            });
            sp.style.display = 'none';      // keep original (bilingual) in DOM, show chips
            sp.parentNode.insertBefore(wrap, sp.nextSibling);
        });
    });
}

// Teaching: KPI header computed from course content
function buildTeachingDashboard() {
    const section = document.querySelector('#teaching');
    if (!section) return;
    const lis = section.querySelectorAll('#teaching > ul > li');
    if (!lis.length) return;
    let sats = [], unis = {};
    lis.forEach(function (li) {
        const t = li.innerText || '';
        const m = t.match(/Satisfaction:\s*([\d.]+)\s*%/i);
        if (m) sats.push(parseFloat(m[1]));
        const u = t.match(/(VinUniversity|Deakin University)/);
        if (u) unis[u[1]] = 1;
    });
    const avg = sats.length ? (sats.reduce(function (a, b) { return a + b; }, 0) / sats.length) : 0;
    const bar = document.createElement('div');
    bar.className = 'teach-kpis';
    // KPI: courses
    const k1 = document.createElement('div');
    k1.className = 'teach-kpi';
    k1.innerHTML = '<span class="k-num">' + lis.length + '</span><span class="k-lbl" data-en="Courses taught" data-vi="Môn đã dạy">' +
        (currentLang() === 'vi' ? 'Môn đã dạy' : 'Courses taught') + '</span>';
    // KPI: avg satisfaction as a GAUGE
    const k2 = document.createElement('div');
    k2.className = 'teach-kpi teach-gauge';
    k2.innerHTML = '<div class="gauge sat-ring" data-sat="' + avg + '" style="--sat:0"><span>0%</span></div>' +
        '<span class="k-lbl" data-en="Avg. Satisfaction" data-vi="Hài lòng trung bình">' +
        (currentLang() === 'vi' ? 'Hài lòng trung bình' : 'Avg. Satisfaction') + '</span>';
    // KPI: universities
    const k3 = document.createElement('div');
    k3.className = 'teach-kpi';
    k3.innerHTML = '<span class="k-num">' + Object.keys(unis).length + '</span><span class="k-lbl" data-en="Universities" data-vi="Trường đại học">' +
        (currentLang() === 'vi' ? 'Trường đại học' : 'Universities') + '</span>';
    bar.appendChild(k1); bar.appendChild(k2); bar.appendChild(k3);
    const ul = section.querySelector('#teaching > ul');
    ul.parentNode.insertBefore(bar, ul);
}

// Publications: research-database header (counts) computed from content
function buildPubDatabase() {
    const section = document.querySelector('#publications');
    if (!section) return;
    const ol = section.querySelector('.pub-list');
    if (!ol) return;
    const lis = ol.querySelectorAll(':scope > li');
    let q1 = 0, ieee = 0;
    lis.forEach(function (li) {
        const t = li.textContent || '';
        if (/\(Q1/i.test(t)) q1++;
        if (/IEEE/i.test(t)) ieee++;
    });
    const stats = [
        [String(lis.length), 'Records', 'Bài báo'],
        [q1 + '+', 'Q1 Journals', 'Tạp chí Q1'],
        [ieee + '', 'IEEE Venues', 'Hội nghị/Tạp chí IEEE']
    ];
    const head = document.createElement('div');
    head.className = 'pub-db-head';
    let html = '<span class="db-dot"></span><span class="db-title" data-en="Research Database" data-vi="Cơ sở dữ liệu nghiên cứu">' +
        (currentLang() === 'vi' ? 'Cơ sở dữ liệu nghiên cứu' : 'Research Database') + '</span>';
    html += '<div class="db-stats">';
    stats.forEach(function (s) {
        html += '<span class="db-stat"><b>' + s[0] + '</b> <span data-en="' + s[1] + '" data-vi="' + s[2] + '">' +
            (currentLang() === 'vi' ? s[2] : s[1]) + '</span></span>';
    });
    html += '</div>';
    head.innerHTML = html;
    ol.parentNode.insertBefore(head, ol);
}

function shortOrg(t) {
    if (/IDT|Digital Transformation Research/i.test(t)) return 'IDT';
    if (/\bNCA\b|National Cybersecurity/i.test(t)) return 'NCA';
    if (/Data Digitization|\bDDC\b|Số Ho/i.test(t)) return 'DDC';
    if (/Vcyber/i.test(t)) return 'Vcyber';
    if (/Samanta/i.test(t)) return 'Samanta';
    if (/Viriya/i.test(t)) return 'Viriya';
    return (t.trim().split(/\s+/).slice(0, 2).join(' ') || 'Org');
}
function shortRole(t) {
    if (/President/i.test(t)) return 'President';
    if (/Member/i.test(t)) return 'Member';
    if (/CEO/i.test(t)) return 'CEO';
    if (/CTO/i.test(t)) return 'CTO';
    return '';
}

// Leadership → Sphere of Influence (radial map built from short org nodes)
function buildLeadershipInfluence() {
    const sec = document.querySelector('#leadership');
    if (!sec) return;
    const src = sec.querySelector('ul');
    if (!src) return;
    const lis = Array.prototype.slice.call(src.children).filter(function (e) { return e.tagName === 'LI'; });
    if (!lis.length) return;
    const map = document.createElement('ul');
    map.className = 'lead-map-list';
    lis.forEach(function (li) {
        const t = li.textContent || '';
        const a = li.querySelector('a[href]');
        const node = document.createElement('li');
        const inner = document.createElement(a ? 'a' : 'span');
        if (a) { inner.href = a.href; inner.target = '_blank'; }
        const role = shortRole(t);
        inner.innerHTML = '<b>' + shortOrg(t) + '</b>' + (role ? '<i>' + role + '</i>' : '');
        node.appendChild(inner);
        map.appendChild(node);
    });
    src.parentNode.insertBefore(map, src);
    buildNetwork('#leadership', { list: '.lead-map-list', hubEn: 'Dr. Nha', hubVi: 'TS. Nhã', ring: false });
}

// Collaboration → Research Web (clone partner links into a network, prose stays)
function buildCollabWeb() {
    const sec = document.querySelector('#collaboration');
    if (!sec) return;
    const links = sec.querySelectorAll('p a[href]');
    if (links.length < 2) return;
    const seen = {}, web = document.createElement('ul');
    web.className = 'collab-web';
    links.forEach(function (a) {
        const label = (a.textContent || '').trim();
        if (!label || seen[label]) return;
        seen[label] = 1;
        const li = document.createElement('li');
        const inner = document.createElement('a');
        inner.href = a.href; inner.target = '_blank';
        inner.textContent = label;
        li.appendChild(inner);
        web.appendChild(li);
    });
    if (web.children.length < 2) return;
    sec.appendChild(web);
    buildNetwork('#collaboration', { list: '.collab-web', hubEn: 'Global Research', hubVi: 'Mạng nghiên cứu', ring: true });
}

// Give each section a distinct kicker/eyebrow — instant identity signal
function injectKickers() {
    const K = {
        'biography': ['The Journey', 'Hành trình'],
        'education': ['Blueprint — Knowledge Structure', 'Bản thiết kế — Cấu trúc tri thức'],
        'awards': ['Permanent Collection', 'Bộ sưu tập'],
        'areas-of-interest': ['Neural Map — Research Ecosystem', 'Bản đồ tri thức — Hệ sinh thái'],
        'teaching': ['Learning Studio — Live', 'Phòng học — Trực tiếp'],
        'professional-experience': ['Mission Control — Career Log', 'Trung tâm điều hành — Nhật ký'],
        'publications': ['Scientific Archive', 'Kho lưu trữ khoa học'],
        'leadership': ['Influence Network', 'Mạng lưới ảnh hưởng'],
        'mentorship': ['Talent Pipeline — Growth', 'Ươm mầm tài năng — Phát triển'],
        'collaboration': ['Global Research Network', 'Mạng nghiên cứu toàn cầu'],
        'work': ['Partnership Gateway', 'Cổng hợp tác'],
        'references': ['Verification Center', 'Trung tâm xác thực']
    };
    Object.keys(K).forEach(function (id) {
        const s = document.getElementById(id);
        if (!s) return;
        const h2 = s.querySelector('h2');
        if (!h2) return;
        const k = document.createElement('div');
        k.className = 'kicker';
        k.setAttribute('data-en', K[id][0]);
        k.setAttribute('data-vi', K[id][1]);
        k.textContent = K[id][0];
        s.insertBefore(k, h2);
    });
}

// Big-idea lead line — gives each section a landing-page opening thesis
function injectSceneLeads() {
    const L = {
        'biography': ['From network engineer to cybersecurity professor — a journey across AI, cryptography and the post-quantum frontier.', 'Từ kỹ sư mạng đến giáo sư an ninh mạng — hành trình qua AI, mật mã và biên giới hậu lượng tử.'],
        'education': ['Knowledge built layer by layer — from electronics to a PhD in cybersecurity.', 'Tri thức xây nên từng lớp — từ điện tử đến Tiến sĩ an ninh mạng.'],
        'awards': ['Recognition earned on the world stage.', 'Vinh danh trên đấu trường quốc tế.'],
        'areas-of-interest': ['Eight research frontiers, one connected mission: securing the intelligent future.', 'Tám hướng nghiên cứu, một sứ mệnh kết nối: bảo vệ tương lai thông minh.'],
        'teaching': ['Knowledge, engineered to be mastered — and measured.', 'Tri thức được thiết kế để chinh phục — và đo lường.'],
        'professional-experience': ['A record of missions accomplished across research, industry and the network backbone.', 'Hồ sơ những nhiệm vụ đã hoàn thành: nghiên cứu, doanh nghiệp và hạ tầng mạng.'],
        'publications': ['A growing library of peer-reviewed research in the world’s top venues.', 'Thư viện nghiên cứu bình duyệt không ngừng mở rộng trên các tạp chí hàng đầu.'],
        'leadership': ['Influence that bridges academia, industry and government.', 'Tầm ảnh hưởng kết nối học thuật, doanh nghiệp và chính phủ.'],
        'mentorship': ['Growing the next generation of researchers, one breakthrough at a time.', 'Ươm mầm thế hệ nhà nghiên cứu kế tiếp, từng bước đột phá.'],
        'collaboration': ['A research network without borders.', 'Một mạng lưới nghiên cứu không biên giới.'],
        'work': ['Let’s build the secure, intelligent future — together.', 'Cùng kiến tạo tương lai an toàn và thông minh.'],
        'references': ['Trusted by senior academics — verified, on the record.', 'Được các học giả cấp cao bảo chứng — xác thực, chính thức.']
    };
    Object.keys(L).forEach(function (id) {
        const s = document.getElementById(id);
        if (!s) return;
        const h2 = s.querySelector('h2');
        if (!h2) return;
        const p = document.createElement('p');
        p.className = 'scene-lead';
        p.setAttribute('data-en', L[id][0]);
        p.setAttribute('data-vi', L[id][1]);
        p.textContent = L[id][0];
        h2.insertAdjacentElement('afterend', p);
    });
}

// Biography → a scientific "Subject Profile" readout (instrument-style spec strip)
function buildBiographyReadout() {
    const sec = document.getElementById('biography');
    if (!sec || sec.querySelector('.bio-readout')) return;
    const anchor = sec.querySelector('.scene-lead') || sec.querySelector('h2');
    if (!anchor) return;
    const coords = [
        ['Discipline', 'Lĩnh vực', 'Cybersecurity · AI · PQC', 'An ninh mạng · AI · PQC'],
        ['Doctorate', 'Tiến sĩ', 'PhD · Deakin University', 'TS · ĐH Deakin'],
        ['Master', 'Thạc sĩ', 'QUT · Australia', 'QUT · Úc'],
        ['Position', 'Vị trí', 'Assistant Prof · VinUniversity', 'Giáo sư cơ hữu · VinUniversity'],
        ['Founder', 'Sáng lập', 'VCyber Lab', 'VCyber Lab'],
        ['Recognition', 'Ghi nhận', 'MIT C2C — 3rd · 2022', 'MIT C2C — Giải Ba · 2022']
    ];
    const strip = document.createElement('div');
    strip.className = 'bio-readout';
    coords.forEach(function (c, i) {
        const cell = document.createElement('div');
        cell.className = 'coord';
        cell.innerHTML =
            '<span class="coord-idx">' + (i < 9 ? '0' + (i + 1) : (i + 1)) + '</span>' +
            '<span class="coord-k" data-en="' + c[0] + '" data-vi="' + c[1] + '">' + c[0] + '</span>' +
            '<span class="coord-v" data-en="' + c[2] + '" data-vi="' + c[3] + '">' + c[2] + '</span>';
        strip.appendChild(cell);
    });
    anchor.insertAdjacentElement('afterend', strip);
}

// Mentorship → talent-growth cohort metrics (derived from content)
function buildMentorshipCohort() {
    const sec = document.getElementById('mentorship');
    if (!sec || sec.querySelector('.cohort')) return;
    const anchor = sec.querySelector('.scene-lead') || sec.querySelector('h2');
    if (!anchor) return;
    const stats = [
        ['4', 'Bachelor’s mentored', 'Sinh viên đại học'],
        ['2', 'Master’s · current', 'Cao học · hiện tại'],
        ['2', 'Master’s graduates', 'Thạc sĩ tốt nghiệp'],
        ['2', 'Joint research outputs', 'Công bố / chương sách chung']
    ];
    const row = document.createElement('div');
    row.className = 'cohort';
    stats.forEach(function (s) {
        const c = document.createElement('div');
        c.className = 'cohort-cell';
        c.innerHTML = '<span class="cohort-n">' + s[0] + '</span>' +
            '<span class="cohort-l" data-en="' + s[1] + '" data-vi="' + s[2] + '">' + s[1] + '</span>';
        row.appendChild(c);
    });
    anchor.insertAdjacentElement('afterend', row);
}

// Collaboration → research-thread legend for the network
function buildCollabThreads() {
    const sec = document.getElementById('collaboration');
    if (!sec || sec.querySelector('.threads')) return;
    const anchor = sec.querySelector('.scene-lead') || sec.querySelector('h2');
    if (!anchor) return;
    const threads = [
        ['Cybersecurity & AI', 'An ninh mạng & AI'],
        ['IoT', 'IoT'],
        ['Robotics', 'Robot'],
        ['Post-Quantum Cryptography', 'Mật mã hậu lượng tử'],
        ['External Grant · Dept. of Defence', 'Tài trợ ngoài · Bộ Quốc phòng']
    ];
    const row = document.createElement('div');
    row.className = 'threads';
    threads.forEach(function (t) {
        const c = document.createElement('span');
        c.className = 'thread';
        c.setAttribute('data-en', t[0]);
        c.setAttribute('data-vi', t[1]);
        c.textContent = t[0];
        row.appendChild(c);
    });
    anchor.insertAdjacentElement('afterend', row);
}

function initSectionWorlds() {
    injectKickers();
    injectSceneLeads();
    buildBiographyReadout();
    buildMentorshipCohort();
    buildCollabThreads();
    buildNetwork('#areas-of-interest', {
        list: '.interest-grid', hubEn: 'Research Core', hubVi: 'Lõi Nghiên cứu', ring: true
    });
    buildLeadershipInfluence();
    buildCollabWeb();
    buildCertSpectrum();
    buildTeachingDashboard();
    buildTeachingSkills();
    buildPubDatabase();

    // References → verified badge + initials avatar + 5★
    document.querySelectorAll('#references > ul > li').forEach(function (li) {
        const v = document.createElement('span');
        v.className = 'verified';
        v.innerHTML = '&#10003; <span data-en="Verified" data-vi="Đã xác minh">' +
            (currentLang() === 'vi' ? 'Đã xác minh' : 'Verified') + '</span>';
        li.insertBefore(v, li.firstChild);

        // initials from the referee name (skip titles)
        const nameEl = li.querySelector('strong');
        let initials = '★';
        if (nameEl) {
            const words = nameEl.textContent.replace(/\b(Dr|Prof|Professor|Associate|Mr|Ms|Mrs)\b\.?/gi, '')
                .trim().split(/\s+/).filter(Boolean);
            initials = (words.slice(0, 2).map(function (w) { return w[0]; }).join('') || '★').toUpperCase();
        }
        const av = document.createElement('div');
        av.className = 'ref-avatar';
        av.textContent = initials;
        li.insertBefore(av, li.firstChild);

        const stars = document.createElement('div');
        stars.className = 'ref-stars';
        stars.setAttribute('aria-hidden', 'true');
        stars.textContent = '★★★★★';
        li.appendChild(stars);
    });

    // Education → pull the year(s) out of each degree as a big marker
    document.querySelectorAll('#education > ul:not(.cert-grid) > li').forEach(function (li) {
        const m = (li.textContent || '').match(/\((\d{4})\s*[–-]\s*(\d{4})\)|\((\d{4})\)/);
        if (!m) return;
        const yr = m[1] ? (m[1] + '–' + m[2]) : m[3];
        const tag = document.createElement('span');
        tag.className = 'edu-year';
        tag.textContent = yr;
        li.appendChild(tag);
    });
}

/* ------------------------------------------------------------
   SCROLL REVEAL (IntersectionObserver)
   ------------------------------------------------------------ */
function initScrollReveal() {
    // Only top-level content sections animate (skip any nested section).
    const sections = document.querySelectorAll('main > section');
    // Content is visible by default. If IO is unavailable, leave it visible.
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -8% 0px' });

    sections.forEach(section => {
        section.classList.add('reveal');   // opt-in to the hidden→shown animation
        observer.observe(section);
    });

    // Safety net: if anything goes wrong, reveal all sections after 2.5s
    // so text is never left hidden.
    setTimeout(function () {
        sections.forEach(s => s.classList.add('visible'));
    }, 2500);
}

/* ------------------------------------------------------------
   ACTIVE NAV LINK ON SCROLL
   ------------------------------------------------------------ */
function initNavSpy() {
    const links = document.querySelectorAll('.topbar nav ul li a');
    const map = {};
    links.forEach(l => {
        const id = l.getAttribute('href');
        if (id && id.startsWith('#')) map[id.slice(1)] = l;
    });
    const targets = Object.keys(map).map(id => document.getElementById(id)).filter(Boolean);
    if (!targets.length || !('IntersectionObserver' in window)) return;

    const spy = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(l => l.classList.remove('active-link'));
                const link = map[entry.target.id];
                if (link) link.classList.add('active-link');
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    targets.forEach(t => spy.observe(t));

    // close mobile menu after navigation
    links.forEach(l => l.addEventListener('click', () => {
        const nav = document.querySelector('.topbar nav');
        if (nav) nav.classList.remove('open');
    }));
}

/* ------------------------------------------------------------
   CURSOR GLOW (desktop, pointer-fine only)
   ------------------------------------------------------------ */
function initCursorGlow() {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    (function loop() {
        gx += (mx - gx) * 0.12;
        gy += (my - gy) * 0.12;
        glow.style.left = gx + 'px';
        glow.style.top = gy + 'px';
        requestAnimationFrame(loop);
    })();
}

/* ------------------------------------------------------------
   COUNT-UP HERO STATS
   ------------------------------------------------------------ */
function initCountUp() {
    const nums = document.querySelectorAll('.hero-stats .num[data-count]');
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            const suffix = el.getAttribute('data-suffix') || '';
            let cur = 0;
            const step = Math.max(1, Math.ceil(target / 36));
            (function run() {
                cur = Math.min(target, cur + step);
                el.textContent = cur + suffix;
                if (cur < target) requestAnimationFrame(run);
            })();
            obs.unobserve(el);
        });
    }, { threshold: 0.5 });
    nums.forEach(n => obs.observe(n));
}

/* ------------------------------------------------------------
   STICKY NAV BACKGROUND + BACK-TO-TOP VISIBILITY
   ------------------------------------------------------------ */
let ticking = false;
window.addEventListener('scroll', function () {
    if (ticking) return;
    window.requestAnimationFrame(function () {
        const y = window.scrollY;
        const bar = document.querySelector('.topbar');
        if (bar) bar.classList.toggle('scrolled', y > 40);

        const btn = document.getElementById('backToMenu');
        if (btn) {
            if (y > 350) { btn.style.display = 'block'; }
            else { btn.style.display = 'none'; }
        }
        ticking = false;
    });
    ticking = true;
});

/* ------------------------------------------------------------
   INIT
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', function () {
    // NOTE: no content is injected — the page shows only the original
    // content, restyled. (enhanceSections / initSectionWorlds / initLuxury
    // are intentionally NOT called.)

    // Language setup
    const lang = localStorage.getItem('preferredLang');
    if (lang) {
        changeLanguage(lang);
        setTimeout(function () { setActiveButton(lang); }, 200);
    } else {
        showLangModalIfNeeded();
    }

    // Back-to-top
    const backBtn = document.getElementById('backToMenu');
    if (backBtn) backBtn.addEventListener('click', scrollToTop);

    initScrollReveal();
    initNavSpy();
    initCursorGlow();
    initShimmer();
});

/* ------------------------------------------------------------
   MAX SHIMMER — ambient glass light-sweeps (decorative only, no text)
   Injects empty .lux-shine spans into panels/cards so they catch a
   periodic light sweep. Excludes #areas-of-interest (kept calm).
   ------------------------------------------------------------ */
function initShimmer() {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sel = [
        '#awards', '#professional-experience', '#leadership', '#collaboration', '#work',
        '.hero-portrait', '.contact-info',
        '#education .cert-grid > li', '#teaching > ul > li',
        '.pub-list > li', '#references > ul > li', '#awards > ul > li'
    ].join(',');
    let i = 0;
    document.querySelectorAll(sel).forEach(function (el) {
        if (el.querySelector(':scope > .lux-shine')) return;
        if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
        if (getComputedStyle(el).overflow === 'visible') el.style.overflow = 'hidden';
        const s = document.createElement('span');
        s.className = 'lux-shine';
        s.setAttribute('aria-hidden', 'true');
        s.style.animationDelay = (i % 7) * 0.9 + 's';   // stagger so it shimmers gently, not all at once
        el.appendChild(s);
        i++;
    });
}
