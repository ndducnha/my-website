/* Nguyễn Đình Đức Nhã — personal site.
   Ported verbatim from the "Quantum Deep Space" Design-Component (class Component)
   to a plain-JS SiteApp that boots after DOMContentLoaded. No DC runtime, no framework.
   three.js (r0.152.2 UMD) is the only external dependency; every behaviour degrades
   gracefully — content always renders its final state even if JS/WebGL fail. */
(function () {
  'use strict';

  var SiteApp = {
    // DC props (data-props defaults from the source component)
    props: { defaultLang: 'en', particleDensity: 1400, motion: 'full' },
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
      this.initThree();
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
        be.style.background = l === 'en' ? 'rgba(139,92,246,.9)' : 'transparent';
        be.style.color = l === 'en' ? '#fff' : '#8F89A8';
        bv.style.background = l === 'vi' ? 'rgba(139,92,246,.9)' : 'transparent';
        bv.style.color = l === 'vi' ? '#fff' : '#8F89A8';
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
      this._accent = ['#8B5CF6', '#A78BFA', '#38BDF8', '#E8B45A', '#9F6BFF', '#34D399', '#E8875A', '#2DD4BF', '#6E7BFF', '#F472A0', '#38BDF8', '#8B5CF6', '#94A3B8'];
      this._active = 0;
      var onScroll = function () {
        var sy = scrollY, dh = document.documentElement.scrollHeight - innerHeight;
        var pb = document.getElementById('progressBar');
        if (pb) pb.style.width = (dh > 0 ? (sy / dh) * 100 : 0) + '%';
        var tb = document.getElementById('topbar');
        if (tb) tb.style.background = sy > 30 ? 'rgba(8,6,18,.82)' : 'rgba(8,6,18,.55)';
        var bt = document.getElementById('backToTop');
        if (bt) bt.style.display = sy > 700 ? 'block' : 'none';
        var act = 0;
        self._sections.forEach(function (id, i) {
          var s = document.getElementById(id);
          if (s && s.getBoundingClientRect().top < innerHeight * 0.45) act = i;
        });
        if (act !== self._active) {
          self._active = act;
          var g = document.getElementById('accentGlow');
          if (g) g.style.background = 'radial-gradient(640px 520px at 76% 42%,' + self._accent[act] + '24,transparent 70%)';
          document.querySelectorAll('[data-nav]').forEach(function (a) {
            var on = a.getAttribute('data-nav') === self._sections[act];
            a.style.color = on ? '#EDEAF7' : '#8F89A8';
            a.style.background = on ? 'rgba(139,92,246,.18)' : 'transparent';
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
    },

    initThree: function () {
      var self = this;
      if (!window.THREE) {
        this._t3 = (this._t3 || 0) + 1;
        if (this._t3 < 120) this._timers.push(setTimeout(function () { self.initThree(); }, 120));
        return;
      }
      var T = window.THREE, canvas = document.getElementById('bg3d');
      if (!canvas || this._threeDone) return;
      this._threeDone = true;
      var renderer;
      try { renderer = new T.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true }); } catch (e) { return; }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      var scene = new T.Scene();
      var cam = new T.PerspectiveCamera(58, innerWidth / innerHeight, .1, 100);
      cam.position.z = 7;
      var resize = function () {
        renderer.setSize(innerWidth, innerHeight);
        cam.aspect = innerWidth / innerHeight;
        cam.updateProjectionMatrix();
        self._objX = innerWidth > 940 ? 2.4 : 0;
      };
      this._onResize = resize;
      addEventListener('resize', resize);
      resize();
      var density = Math.max(200, Math.min(3000, +(this.props.particleDensity != null ? this.props.particleDensity : 1400)));
      var pos = new Float32Array(density * 3);
      for (var i = 0; i < density; i++) {
        pos[i * 3] = (Math.random() - .5) * 30;
        pos[i * 3 + 1] = (Math.random() - .5) * 20;
        pos[i * 3 + 2] = -2 - Math.random() * 18;
      }
      var sg = new T.BufferGeometry();
      sg.setAttribute('position', new T.BufferAttribute(pos, 3));
      var stars = new T.Points(sg, new T.PointsMaterial({ color: 0x8b7ff0, size: .045, transparent: true, opacity: .75 }));
      scene.add(stars);
      var wf = function (geo, c, op) { return new T.Mesh(geo, new T.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: op == null ? .5 : op })); };
      var mkGlobe = function (c) {
        var g = new T.Group(), N = 150, pts = [];
        for (var i = 0; i < N; i++) {
          var th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
          pts.push(new T.Vector3(1.9 * Math.sin(ph) * Math.cos(th), 1.9 * Math.cos(ph), 1.9 * Math.sin(ph) * Math.sin(th)));
        }
        var pg = new T.BufferGeometry().setFromPoints(pts);
        g.add(new T.Points(pg, new T.PointsMaterial({ color: c, size: .07, transparent: true, opacity: .95 })));
        var lp = [];
        for (var a = 0; a < N; a++) for (var b = a + 1; b < N; b++) if (pts[a].distanceTo(pts[b]) < .85) { lp.push(pts[a], pts[b]); }
        var lg = new T.BufferGeometry().setFromPoints(lp);
        g.add(new T.LineSegments(lg, new T.LineBasicMaterial({ color: c, transparent: true, opacity: .3 })));
        g.add(wf(new T.IcosahedronGeometry(1.1, 1), c, .35));
        return g;
      };
      var mkStack = function (c) { var g = new T.Group(); for (var i = 0; i < 4; i++) { var m = wf(new T.BoxGeometry(2.4 - i * .3, .3, 1.7 - i * .2), c); m.position.y = -.8 + i * .55; m.rotation.y = i * .35; g.add(m); } return g; };
      var mkLattice = function (c) { var g = new T.Group(); for (var x = -1; x <= 1; x++) for (var y = -1; y <= 1; y++) for (var z = -1; z <= 1; z++) { var m = wf(new T.BoxGeometry(.42, .42, .42), c, .55); m.position.set(x * .85, y * .85, z * .85); g.add(m); } return g; };
      var mkRings = function (c) { var g = new T.Group(); var r1 = wf(new T.TorusGeometry(1.4, .07, 10, 60), c, .6); var r2 = r1.clone(); r2.rotation.x = Math.PI / 2; var r3 = r1.clone(); r3.rotation.y = Math.PI / 2; g.add(r1, r2, r3); g.add(wf(new T.SphereGeometry(.55, 12, 10), c, .6)); return g; };
      var mkOrbit = function (c) { var g = new T.Group(); g.add(wf(new T.TorusGeometry(1.5, .03, 8, 70), c, .5)); for (var i = 0; i < 8; i++) { var m = wf(new T.SphereGeometry(.24, 10, 8), c, .8); m.position.set(Math.cos(i / 8 * Math.PI * 2) * 1.5, 0, Math.sin(i / 8 * Math.PI * 2) * 1.5); g.add(m); } g.add(wf(new T.OctahedronGeometry(.6), c, .7)); return g; };
      var mkTetraCluster = function (c) { var g = new T.Group(); var P = [[0, 1, 0], [1, -.6, .6], [-1, -.6, .6], [0, -.6, -1.1]]; P.forEach(function (p) { var m = wf(new T.TetrahedronGeometry(.72), c, .65); m.position.set(p[0], p[1], p[2]); g.add(m); }); g.add(wf(new T.TetrahedronGeometry(1.7), c, .25)); return g; };
      var A = this._accent || [];
      var builders = [
        function () { return mkGlobe(A[0]); }, function () { return wf(new T.IcosahedronGeometry(1.7, 1), A[1]); }, function () { return mkStack(A[2]); },
        function () { return wf(new T.OctahedronGeometry(1.7), A[3]); }, function () { return wf(new T.TorusKnotGeometry(1.15, .34, 130, 16), A[4]); },
        function () { return wf(new T.TorusGeometry(1.3, .45, 14, 48), A[5]); }, function () { return wf(new T.DodecahedronGeometry(1.7), A[6]); },
        function () { return mkLattice(A[7]); }, function () { return wf(new T.SphereGeometry(1.7, 20, 14), A[8]); }, function () { return mkTetraCluster(A[9]); },
        function () { return mkRings(A[10]); }, function () { return wf(new T.IcosahedronGeometry(1.7, 2), A[11], .35); }, function () { return mkOrbit(A[12]); }
      ];
      var objs = builders.map(function (b) { var o = b(); o.userData.s = 0; o.visible = false; scene.add(o); return o; });
      this._mx = 0; this._my = 0;
      this._onMove = function (e) { self._mx = (e.clientX / innerWidth - .5) * 2; self._my = (e.clientY / innerHeight - .5) * 2; };
      addEventListener('mousemove', this._onMove);
      var reduced = (this.props.motion || 'full') === 'reduced' ||
        (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      var slow = reduced ? .25 : 1;
      var anim = function () {
        self._raf = requestAnimationFrame(anim);
        var t = performance.now() * .001;
        stars.rotation.y = t * .012 * slow;
        stars.rotation.x = Math.sin(t * .05) * .04 * slow;
        objs.forEach(function (o, i) {
          var target = i === self._active ? 1 : 0;
          o.userData.s += (target - o.userData.s) * .06;
          var s = Math.max(o.userData.s, .0001);
          o.scale.setScalar(s);
          o.visible = o.userData.s > .02;
          o.rotation.y = t * .3 * slow + i * 1.3;
          o.rotation.x = Math.sin(t * .22 + i) * .35 * slow;
          o.rotation.z = Math.sin(t * .13 + i * 2) * .15 * slow;
          o.position.set(self._objX || 0, Math.sin(t * .5 + i) * .15, 0);
        });
        cam.position.x += (self._mx * .55 - cam.position.x) * .04;
        cam.position.y += (-self._my * .45 - cam.position.y) * .04;
        cam.lookAt(0, 0, 0);
        renderer.render(scene, cam);
      };
      anim();
    }
  };

  // Inline-onclick globals wired to the app (the only DC template calls in markup).
  window.setEn = function () { SiteApp.setLang('en'); };
  window.setVi = function () { SiteApp.setLang('vi'); };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { SiteApp.init(); });
  } else {
    SiteApp.init();
  }
})();
