/* Nguyễn Đình Đức Nhã — personal site.
   Ported verbatim from the "Quantum Deep Space" Design-Component (class Component)
   to a plain-JS SiteApp that boots after DOMContentLoaded. No DC runtime, no framework.
   No external dependencies; every behaviour degrades gracefully — content always
   renders its final state even if JS fails. */
(function () {
  'use strict';

  var SiteApp = {
    // DC props (data-props defaults from the source component)
    props: { defaultLang: 'en', motion: 'full' },
    lang: 'en',
    _timers: [],
    _raf: 0,

    init: function () {
      try {
        var stored = (typeof localStorage !== 'undefined' && localStorage.getItem('preferredLang'));
        this.lang = stored || this.props.defaultLang || 'en';
      } catch (e) { this.lang = this.props.defaultLang || 'en'; }

      this._timers = [];
      this._raf = 0;
      this.initStyleHover();
      this.applyLang();
      try {
        if (!localStorage.getItem('preferredLang')) {
          var m = document.getElementById('langModal');
          if (m) m.style.display = 'flex';
        }
      } catch (e) {}
      this.initTyping();
      this.initReveal();
      this.initCounters();
      this.initScrollUI();
      this.initTilt();
      // Close the mobile ☰ dropdown after a section link is tapped.
      document.querySelectorAll('#topbar [data-nav]').forEach(function (a) {
        a.addEventListener('click', function () { window.closeMenu(); });
      });
    },

    setLang: function (l) {
      try { localStorage.setItem('preferredLang', l); } catch (e) {}
      var m = document.getElementById('langModal');
      if (m) m.style.display = 'none';
      this.lang = l;
      this.applyLang();
    },

    applyLang: function () {
      var l = this.lang;
      document.querySelectorAll('[data-lang]').forEach(function (el) {
        el.style.display = el.getAttribute('data-lang') === l ? '' : 'none';
      });
      var be = document.getElementById('btnEn'), bv = document.getElementById('btnVi');
      if (be && bv) {
        be.style.background = l === 'en' ? 'rgba(30,64,175,.9)' : 'transparent';
        be.style.color = l === 'en' ? '#fff' : '#6e6450';
        bv.style.background = l === 'vi' ? 'rgba(30,64,175,.9)' : 'transparent';
        bv.style.color = l === 'vi' ? '#fff' : '#6e6450';
      }
    },

    /* Replicates the DC `style-hover="..."` attribute: for each unique declaration
       string, generate a class and inject a `.cls:hover{ ... !important }` rule
       (matching DC's pseudo sheet, which importantifies every declaration). */
    initStyleHover: function () {
      var nodes = document.querySelectorAll('[style-hover]');
      if (!nodes.length) return;
      var sheet = document.createElement('style');
      sheet.setAttribute('data-style-hover', '');
      document.head.appendChild(sheet);
      var cache = {}, n = 0, rules = '';
      var importantify = function (css) {
        return css.split(';').map(function (d) {
          d = d.trim();
          if (!d) return '';
          return /!important/i.test(d) ? d : d + ' !important';
        }).filter(Boolean).join(';');
      };
      nodes.forEach(function (el) {
        var css = el.getAttribute('style-hover');
        if (!css) return;
        var cls = cache[css];
        if (!cls) {
          cls = 'dc-hv-' + (n++);
          cache[css] = cls;
          rules += '.' + cls + ':hover{' + importantify(css) + '}\n';
        }
        el.classList.add(cls);
      });
      sheet.textContent = rules;
    },

    initTyping: function () {
      var self = this;
      var SP = {
        en: ['Cybersecurity & Network Security', 'AI-Driven Security & Machine Learning', 'Post-Quantum Cryptography', 'Cryptography & Secure Systems', 'IoT & Robotic Security'],
        vi: ['An ninh mạng & Bảo mật mạng', 'Bảo mật ứng dụng AI & Học máy', 'Mật mã hậu lượng tử', 'Mật mã học & Hệ thống an toàn', 'Bảo mật IoT & Robot']
      };
      var t = document.getElementById('heroTyped');
      if (!t) return;
      var si = 0, ci = 0, del = false;
      var step = function () {
        var arr = SP[self.lang] || SP.en, s = arr[si % arr.length];
        if (!del) {
          ci++;
          if (ci >= s.length) { del = true; t.textContent = s; self._timers.push(setTimeout(step, 2100)); return; }
        } else {
          ci--;
          if (ci <= 0) { del = false; si++; }
        }
        t.textContent = s.slice(0, Math.max(ci, 0));
        self._timers.push(setTimeout(step, del ? 26 : 52));
      };
      step();
    },

    initReveal: function () {
      var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.style.opacity = '1';
            en.target.style.transform = 'none';
            io.unobserve(en.target);
          }
        });
      }, { threshold: 0.1 });
      els.forEach(function (el, i) {
        var r = el.getBoundingClientRect();
        if (r.top > innerHeight * 0.92) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          el.style.transition = 'opacity .9s cubic-bezier(.22,1,.36,1) ' + ((i % 6) * 0.07) + 's, transform .9s cubic-bezier(.22,1,.36,1) ' + ((i % 6) * 0.07) + 's';
        }
        io.observe(el);
      });
    },

    initCounters: function () {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          var el = en.target, target = +el.getAttribute('data-count') || 0, t0 = performance.now();
          var tick = function (now) {
            var p = Math.min((now - t0) / 1300, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      }, { threshold: 0.4 });
      document.querySelectorAll('[data-count]').forEach(function (el) { io.observe(el); });
    },

    initScrollUI: function () {
      var self = this;
      this._sections = ['hero', 'biography', 'education', 'awards', 'areas-of-interest', 'teaching', 'professional-experience', 'publications', 'leadership', 'mentorship', 'collaboration', 'work', 'references'];
      this._accent = ['#1e40af', '#3a56ac', '#0369a1', '#b45309', '#4338ca', '#15803d', '#c2410c', '#0f766e', '#3730a3', '#be185d', '#0369a1', '#1e40af', '#5b6675'];
      this._active = 0;
      var onScroll = function () {
        var sy = scrollY, dh = document.documentElement.scrollHeight - innerHeight;
        var pb = document.getElementById('progressBar');
        if (pb) pb.style.width = (dh > 0 ? (sy / dh) * 100 : 0) + '%';
        var tb = document.getElementById('topbar');
        if (tb) tb.style.background = sy > 30 ? 'rgba(243,235,219,.88)' : 'rgba(243,235,219,.72)';
        var bt = document.getElementById('backToTop');
        if (bt) bt.style.display = sy > 700 ? 'block' : 'none';
        var act = 0;
        self._sections.forEach(function (id, i) {
          var s = document.getElementById(id);
          if (s && s.getBoundingClientRect().top < innerHeight * 0.45) act = i;
        });
        if (act !== self._active) {
          self._active = act;
          document.querySelectorAll('[data-nav]').forEach(function (a) {
            var on = a.getAttribute('data-nav') === self._sections[act];
            a.style.color = on ? '#2d2a24' : '#6e6450';
            a.style.background = on ? 'rgba(30,64,175,.18)' : 'transparent';
          });
        }
      };
      this._onScroll = onScroll;
      addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    },

    initTilt: function () {
      var card = document.getElementById('tiltCard'), wrap = document.getElementById('tiltWrap');
      if (!card || !wrap) return;
      wrap.addEventListener('mousemove', function (e) {
        var r = wrap.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'rotateY(' + (x * 16) + 'deg) rotateX(' + (-y * 16) + 'deg) translateZ(12px)';
      });
      wrap.addEventListener('mouseleave', function () { card.style.transform = 'none'; });
    }
  };

  // Inline-onclick globals wired to the app (the only DC template calls in markup).
  window.setEn = function () { SiteApp.setLang('en'); };
  window.setVi = function () { SiteApp.setLang('vi'); };

  // Mobile ☰ menu: toggle the dropdown nav panel; swap the glyph.
  function setMenu(open) {
    var tb = document.getElementById('topbar');
    if (tb) tb.classList[open ? 'add' : 'remove']('menu-open');
    var b = document.getElementById('menuBtn');
    if (b) b.textContent = open ? '✕' : '☰';
  }
  window.toggleMenu = function () {
    var tb = document.getElementById('topbar');
    setMenu(!(tb && tb.classList.contains('menu-open')));
  };
  window.closeMenu = function () { setMenu(false); };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { SiteApp.init(); });
  } else {
    SiteApp.init();
  }
})();
