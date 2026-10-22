/* SiteMix platform core: i18n, header, footer */
(function () {
  var C = window.SITE_CONFIG;
  var LANGS = window.SM_LANGS;
  var D = window.I18N;
  var LS_KEY = 'sm_lang';

  function detect() {
    var saved = null;
    try { saved = localStorage.getItem(LS_KEY); } catch (e) {}
    if (saved && D[saved]) return saved;
    var list = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || '']);
    for (var i = 0; i < list.length; i++) {
      var l = String(list[i] || '').toLowerCase();
      if (!l) continue;
      if (l.indexOf('zh') === 0) {
        if (/hant|tw|hk|mo/.test(l)) return 'zh-Hant';
        return 'zh-Hans';
      }
      var p = l.split('-')[0];
      if (p === 'in') p = 'id';
      if (D[p]) return p;
    }
    return C.defaultLang;
  }

  var lang = detect();

  function t(key, vars) {
    var s = (D[lang] && D[lang][key]) || (D.en && D.en[key]) || (D['zh-Hant'] && D['zh-Hant'][key]) || key;
    s = s.replace(/\{brand\}/g, C.brand).replace(/\{domain\}/g, C.platformDomain);
    if (vars) for (var k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  }

  function apply(root) {
    root = root || document;
    var html = document.documentElement;
    html.lang = lang;
    html.dir = (LANGS.find(function (x) { return x.code === lang; }) || {}).rtl ? 'rtl' : 'ltr';
    root.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    root.querySelectorAll('[data-i18n-ph]').forEach(function (el) { el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph'))); });
    root.querySelectorAll('[data-i18n-title]').forEach(function (el) { el.setAttribute('title', t(el.getAttribute('data-i18n-title'))); });
    root.querySelectorAll('[data-brand]').forEach(function (el) { el.textContent = C.brand; });
    var tk = document.body.getAttribute('data-title');
    if (tk) document.title = t(tk) + ' · ' + C.brand;
    var md = document.querySelector('meta[name=description]');
    if (md) md.setAttribute('content', t('hero_sub'));
    document.querySelectorAll('.lang-select').forEach(function (s) { s.value = lang; });
  }

  function setLang(code) {
    if (!D[code]) return;
    lang = code;
    try { localStorage.setItem(LS_KEY, code); } catch (e) {}
    apply();
    document.dispatchEvent(new CustomEvent('sm:lang', { detail: code }));
  }

  function langOptions() {
    return LANGS.map(function (l) { return '<option value="' + l.code + '">' + l.name + '</option>'; }).join('');
  }

  function header() {
    var page = document.body.getAttribute('data-page');
    var links = [['index.html', 'nav_home', 'home'], ['templates.html', 'nav_templates', 'templates'], ['builder.html', 'nav_builder', 'builder'], ['domain.html', 'nav_domain', 'domain'], ['pricing.html', 'nav_pricing', 'pricing']];
    var el = document.getElementById('site-header');
    if (!el) return;
    el.className = 'site-header';
    el.innerHTML = '<div class="container">' +
      '<a class="brand" href="index.html"><span class="brand-mark">' + C.logoMark + '</span><span class="bt">' + C.brand + '</span></a>' +
      '<nav class="main-nav" id="main-nav">' + links.map(function (l) {
        return '<a href="' + l[0] + '"' + (page === l[2] ? ' class="active"' : '') + ' data-i18n="' + l[1] + '"></a>';
      }).join('') + '</nav>' +
      '<div class="hdr-tools"><select class="lang-select" aria-label="Language" data-i18n-title="lang_label">' + langOptions() + '</select>' +
      '<span id="acct-slot"></span><a class="btn sm" href="builder.html" data-i18n="nav_start"></a>' +
      '<button class="burger" aria-label="Menu">☰</button></div></div>';
    el.querySelector('.burger').onclick = function () { document.getElementById('main-nav').classList.toggle('open'); };
  }

  function footer() {
    var el = document.getElementById('site-footer');
    if (!el) return;
    el.className = 'site-footer';
    el.innerHTML = '<div class="container"><div class="foot-grid">' +
      '<div><a class="brand" href="index.html"><span class="brand-mark">' + C.logoMark + '</span><span>' + C.brand + '</span></a><p class="muted" data-i18n="footer_tag"></p>' +
      '<select class="lang-select" aria-label="Language">' + langOptions() + '</select></div>' +
      '<div><h4 data-i18n="footer_product"></h4><a href="templates.html" data-i18n="nav_templates"></a><a href="builder.html" data-i18n="nav_builder"></a><a href="pricing.html" data-i18n="nav_pricing"></a></div>' +
      '<div><h4 data-i18n="footer_help"></h4><a href="domain.html" data-i18n="nav_domain"></a><a href="index.html#faq" data-i18n="faq_title"></a><a href="mailto:' + C.contactEmail + '">' + C.contactEmail + '</a></div>' +
      '</div><div class="foot-bottom"><span>© ' + C.year + ' ' + C.brand + '. <span data-i18n="footer_rights"></span></span><span data-i18n="footer_demo"></span></div></div>';
  }

  function toast(msg) {
    var el = document.querySelector('.toast-p');
    if (!el) { el = document.createElement('div'); el.className = 'toast-p'; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show');
    clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }

  window.SM = { t: t, apply: apply, setLang: setLang, getLang: function () { return lang; }, toast: toast };

  document.addEventListener('DOMContentLoaded', function () {
    header(); footer(); apply();
    document.addEventListener('change', function (e) {
      if (e.target.classList && e.target.classList.contains('lang-select')) setLang(e.target.value);
    });
    document.dispatchEvent(new CustomEvent('sm:ready'));
  });
})();
