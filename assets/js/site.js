/* ducnha.vn: progressive enhancements only. The page works without this file. */
(function () {
  'use strict';

  // Header hairline and back-to-top button once the page scrolls.
  var header = document.querySelector('[data-header]');
  var top = document.querySelector('[data-back-to-top]');
  var onScroll = function () {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
    if (top) top.classList.toggle('is-visible', window.scrollY > 800);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu panel (narrow screens).
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    var label = toggle.querySelector('.nav-toggle-label');
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
      if (label) label.textContent = toggle.getAttribute(open ? 'data-label-close' : 'data-label-open');
    };
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') !== 'true';
      setOpen(open);
      if (open) { var first = nav.querySelector('a'); if (first) first.focus(); }
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('.nav-list a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 1360px)').addEventListener('change', function (mq) { if (mq.matches) setOpen(false); });
  }

  // Highlight the section currently in view.
  var links = Array.prototype.slice.call(document.querySelectorAll('[data-spy]'));
  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('data-spy')] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = byId[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-30% 0px -65% 0px' });
    Object.keys(byId).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  // Switching language keeps the reader on the same section and remembers the choice.
  var LANG_KEY = 'ducnha-lang';
  var remember = function (lang) { try { localStorage.setItem(LANG_KEY, lang); } catch (e) {} };
  var remembered = function () { try { return localStorage.getItem(LANG_KEY); } catch (e) { return null; } };
  document.querySelectorAll('[data-lang-link]').forEach(function (a) {
    a.addEventListener('click', function () {
      remember(a.getAttribute('hreflang'));
      if (location.hash) a.setAttribute('href', a.getAttribute('href').split('#')[0] + location.hash);
    });
  });

  // First visit: ask which language to read in. Shown once, then the choice is remembered.
  var current = document.documentElement.lang === 'vi' ? 'vi' : 'en';
  var homes = { en: '/', vi: '/vi/' };
  var onHome = location.pathname === '/' || location.pathname === '/index.html' || /^\/vi\/(index\.html)?$/.test(location.pathname);
  var isBot = /bot|crawl|spider|slurp|lighthouse|headless/i.test(navigator.userAgent);
  if (onHome && !isBot && !remembered() && typeof HTMLDialogElement === 'function') {
    var dlg = document.createElement('dialog');
    dlg.className = 'lang-gate';
    dlg.setAttribute('aria-labelledby', 'lang-gate-title');
    dlg.innerHTML =
      '<p class="lang-gate-kicker">ducnha.vn</p>' +
      '<h2 class="lang-gate-title" id="lang-gate-title"><span lang="en">Choose your language</span><span lang="vi">Chọn ngôn ngữ</span></h2>' +
      '<div class="lang-gate-actions">' +
        '<button type="button" class="btn" data-pick="en" lang="en">English</button>' +
        '<button type="button" class="btn" data-pick="vi" lang="vi">Tiếng Việt</button>' +
      '</div>' +
      '<p class="lang-gate-note"><span lang="en">You can switch any time with EN / VI at the top of the page.</span> <span lang="vi">Bạn có thể đổi bất cứ lúc nào bằng nút EN / VI ở đầu trang.</span></p>';
    // The page's own language is the filled button; the other one is outlined.
    dlg.querySelector('[data-pick="' + (current === 'vi' ? 'en' : 'vi') + '"]').classList.add('btn--ghost');
    var choose = function (lang) {
      remember(lang);
      if (lang === current) { dlg.close(); return; }
      location.href = homes[lang] + location.hash;
    };
    dlg.addEventListener('click', function (e) {
      var b = e.target.closest('[data-pick]');
      if (b) choose(b.getAttribute('data-pick'));
    });
    // Escape keeps the language of the page the reader landed on.
    dlg.addEventListener('cancel', function () { remember(current); });
    dlg.addEventListener('close', function () { document.documentElement.classList.remove('has-lang-gate'); });
    document.body.appendChild(dlg);
    document.documentElement.classList.add('has-lang-gate');
    dlg.showModal();
    dlg.querySelector('[data-pick="' + current + '"]').focus();
  }

  // Gentle reveal of section content as it scrolls into view.
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    var revealEls = document.querySelectorAll('.block-head, .block-body > *');
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        ro.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { el.classList.add('reveal'); ro.observe(el); });
    // Printing shows everything regardless of scroll position.
    window.addEventListener('beforeprint', function () { revealEls.forEach(function (el) { el.classList.add('is-in'); }); });
  }

  // Keep the footer year current between rebuilds.
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
