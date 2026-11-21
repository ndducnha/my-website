/* ducnha.work: progressive enhancements only. The page works without this file. */
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

  // Switching language keeps the reader on the same section.
  document.querySelectorAll('[data-lang-link]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (location.hash) a.setAttribute('href', a.getAttribute('href').split('#')[0] + location.hash);
    });
  });

  // Keep the footer year current between rebuilds.
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
