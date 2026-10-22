/* SiteMix builder v2 */
document.addEventListener('sm:ready', function () {
  var T = SM_TPL, PL = SM_PLUGINS, t = SM.t, KEY = 'sm_builder_state', CFG = SITE_CONFIG, AT = CFG.autoTranslate || {};
  var $ = function (s) { return document.querySelector(s); };
  var qs = new URLSearchParams(location.search);
  var S = null;
  try { S = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { S = null; }
  var qcat = T.CATS.indexOf(qs.get('cat')) >= 0 ? qs.get('cat') : null;
  if (!S || S.v !== 2) S = T.sampleState(qcat || 'cafe', SM.getLang());
  else if (qcat && !qs.get('d') && !qs.get('m')) { S.desktop = 'd-' + qcat; S.mobile = 'm-' + qcat; }
  if (qs.get('d') && T.DESKTOP.some(function (x) { return x.id === qs.get('d'); })) S.desktop = qs.get('d');
  if (qs.get('m') && T.MOBILE.some(function (x) { return x.id === qs.get('m'); })) S.mobile = qs.get('m');
  if (qs.get('fresh') && qcat) { var f = T.sampleState(qcat, SM.getLang()); f.desktop = S.desktop; f.mobile = S.mobile; S = f; }
  S.pc = S.pc || {}; S.tr = S.tr || {}; S.trLangs = S.trLangs || [];
  var view = 'd', timer = null, uid = Date.now(), pgTab = '';
  var apiReady = !!(AT.googleApiKey || AT.mock);
  var SRV = null;   // SiteMix server config (cloud save, publish, server-side Google translation) — null in static mode

  function get(path) { return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, S); }
  function set(path, v) { var ks = path.split('.'), o = S; for (var i = 0; i < ks.length - 1; i++) { o[ks[i]] = o[ks[i]] || {}; o = o[ks[i]]; } o[ks[ks.length - 1]] = v; }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
    var sv = $('#saved'); sv.style.opacity = 1; clearTimeout(sv._t); sv._t = setTimeout(function () { sv.style.opacity = .5; }, 900);
  }
  function changed() { save(); clearTimeout(timer); timer = setTimeout(preview, 250); }
  function tplName(list, id) { return (list.filter(function (x) { return x.id === id; })[0] || list[0]).name; }

  /* ----- template pickers ----- */
  var pickQ = { desktop: '', mobile: '' };
  function pickList(list, key) {
    var q = pickQ[key].toLowerCase().split(/\s+/).filter(Boolean), cur = S[key];
    var hay = function (x) { return (x.name + ' ' + x.id + ' ' + x.cat + ' ' + x.style + ' ' + t('cat_' + x.cat) + ' ' + t('st_' + x.style)).toLowerCase(); };
    var all = list.filter(function (x) { return q.length ? q.every(function (w) { return hay(x).indexOf(w) >= 0; }) : x.cat === S.cat; });
    var curT = list.filter(function (x) { return x.id === cur; })[0];
    var cap = q.length ? 60 : 40, out = all.slice(0, cap);
    if (curT && out.indexOf(curT) < 0) out.unshift(curT);
    return { items: out, total: q.length ? all.length : list.length, n: out.length };
  }
  function pickers() {
    [['#pick-d', T.DESKTOP, 'desktop'], ['#pick-m', T.MOBILE, 'mobile']].forEach(function (p) {
      var box = $(p[0]), r = pickList(p[1], p[2]);
      if (!box.previousElementSibling || !box.previousElementSibling.classList.contains('tpl-pick-tools')) {
        var tools = document.createElement('div'); tools.className = 'tpl-pick-tools';
        tools.innerHTML = '<input type="search" data-i18n-ph="b_tpl_search" aria-label="search">';
        box.parentNode.insertBefore(tools, box);
        var note = document.createElement('p'); note.className = 'tpl-pick-note muted'; box.parentNode.insertBefore(note, box.nextSibling);
        var inp = tools.querySelector('input'), tm;
        inp.addEventListener('input', function () { clearTimeout(tm); tm = setTimeout(function () { pickQ[p[2]] = inp.value.trim(); pickers(); }, 150); });
        SM.apply(tools);
      }
      box.innerHTML = r.items.map(function (x) { return '<button type="button" data-id="' + x.id + '" class="' + (S[p[2]] === x.id ? 'on' : '') + '" title="' + T.esc(x.name + ' · ' + t('st_' + x.style)) + '"><span class="sw" style="background:linear-gradient(135deg,' + x.sw + ',#fff 160%)"></span>' + T.esc(x.name) + (x.gen ? '' : ' ★') + '<small class="muted">' + T.esc(t('cat_' + x.cat)) + ' · ' + T.esc(t('st_' + x.style)) + '</small></button>'; }).join('');
      box.nextSibling.textContent = t('b_tpl_showing', { n: r.n, total: r.total });
      box.onclick = function (e) { var b = e.target.closest('button'); if (!b) return; S[p[2]] = b.dataset.id; pickers(); changed(); };
    });
    $('#combo').textContent = tplName(T.DESKTOP, S.desktop) + ' + ' + tplName(T.MOBILE, S.mobile);
  }
  function sampleSelect() {
    var sc = $('#sample-cat');
    sc.innerHTML = T.CATS.map(function (c) { return '<option value="' + c + '"' + (c === S.cat ? ' selected' : '') + ' data-i18n="cat_' + c + '"></option>'; }).join('');
    SM.apply(sc);
  }
  $('#load-sample').onclick = function () {
    if (!confirm(t('b_load_confirm'))) return;
    var keep = { desktop: S.desktop, mobile: S.mobile, wa: S.wa, email: S.email, paypalMe: S.paypalMe, siteId: S.siteId, sid: S.sid };
    S = T.sampleState($('#sample-cat').value, SM.getLang());
    Object.keys(keep).forEach(function (k) { S[k] = keep[k]; });
    fill(); changed();
  };

  /* ----- simple fields ----- */
  function fill() {
    document.querySelectorAll('[data-k]').forEach(function (el) {
      var v = get(el.dataset.k);
      if (el.type === 'checkbox') el.checked = !!v; else el.value = v == null ? '' : v;
    });
    plugins(); products(); siteLangs(); pickers(); sampleSelect(); groups(); trUI();
  }
  var panel = document.getElementById('panel');
  panel.addEventListener('input', function (e) {
    var el = e.target, k = el.dataset && el.dataset.k; if (!k) return;
    set(k, el.type === 'checkbox' ? el.checked : el.value);
    if (k === 'primary' || k === 'accent') document.querySelectorAll('[data-k="' + k + '"]').forEach(function (o) { if (o !== el && (o.type !== 'color' || /^#[0-9a-f]{6}$/i.test(el.value))) o.value = el.value; });
    if (k === 'lang') { siteLangs(); trUI(); }
    changed();
  });

  /* ----- plugin catalogue (grouped + search) ----- */
  function fieldHtml(p, f) {
    var v = (S.pc[p.id] || {})[f.k];
    if (p.id === 'video' && f.k === 'urls') return '<label><span data-i18n="f_yt_urls"></span><textarea data-pf="video.urls" rows="3" placeholder="https://www.youtube.com/watch?v=…">' + T.esc(v || '') + '</textarea><small class="yt-status" data-i18n="b_videos_hint"></small></label>';
    if (f.type === 'lines') return '<label><span><span data-i18n="f_items"></span> <small>(' + f.cols.map(function (c) { return t(c); }).join(' | ') + ')</small></span><textarea data-pf="' + p.id + '.' + f.k + '" rows="4">' + T.esc(v || '') + '</textarea></label>';
    var type = f.type === 'datetime' ? 'datetime-local' : f.type === 'url' ? 'url' : 'text';
    if (f.type === 'code') return '<label><span data-i18n="f_' + f.k + '"></span><textarea data-pf="' + p.id + '.' + f.k + '" rows="3" placeholder="' + T.esc(f.ph) + '">' + T.esc(v || '') + '</textarea><small data-i18n="b_analytics_hint"></small></label>';
    return '<label><span data-i18n="f_' + f.k + '"></span><input type="' + type + '" data-pf="' + p.id + '.' + f.k + '" value="' + T.esc(v || '') + '" placeholder="' + T.esc(f.ph) + '"></label>';
  }
  function plugins() {
    var q = ($('#plugin-search').value || '').trim().toLowerCase();
    $('#pg-tabs').innerHTML = ['', ].concat(PL.GROUPS).map(function (g) { return '<button type="button" data-g="' + g + '" class="' + (pgTab === g ? 'on' : '') + '" data-i18n="' + (g ? 'pg_' + g : 'gal_all') + '"></button>'; }).join('');
    var html = '';
    PL.GROUPS.forEach(function (g) {
      if (pgTab && pgTab !== g) return;
      var items = PL.LIST.filter(function (p) {
        if (p.g !== g) return false;
        if (!q) return true;
        return (t('p_' + p.id) + ' ' + t('p_' + p.id + '_d') + ' ' + p.id).toLowerCase().indexOf(q) >= 0;
      });
      if (!items.length) return;
      html += '<div class="pg-h" data-i18n="pg_' + g + '"></div>';
      items.forEach(function (p) {
        var onp = !!S.plugins[p.id], special = { shop: 'b_g_shop', seo: 'b_g_seo', analytics: 'b_g_analytics', lang: 'b_g_langs', autotr: 'b_g_autotr' }[p.id];
        html += '<div class="pitem' + (p.hl ? ' hl' : '') + (onp ? ' on' : '') + '" data-pid="' + p.id + '"><label class="toggle"><div><b>' + p.icon + ' <span data-i18n="p_' + p.id + '"></span>' + (p.hl ? '<span class="ptag" data-i18n="b_headline"></span>' : '') + '</b><small data-i18n="p_' + p.id + '_d"></small></div><span class="sw-input"><input type="checkbox" data-plugin="' + p.id + '"' + (onp ? ' checked' : '') + '><i></i></span></label>' +
          '<div class="pfields">' + (p.fields || []).map(function (f) { return fieldHtml(p, f); }).join('') + (special ? '<small class="muted">↓ <span data-i18n="b_see_section"></span>: <b data-i18n="' + special + '"></b></small>' : '') + (p.needs && !S.plugins[p.needs] ? '<small style="color:#b45309">⚠ <span data-i18n="b_needs_shop"></span></small>' : '') + '</div></div>';
      });
    });
    $('#plugins').innerHTML = html || '<p class="muted" data-i18n="b_no_plugin"></p>';
    SM.apply($('#plugins')); SM.apply($('#pg-tabs'));
    ytStatus();
  }
  $('#plugin-search').addEventListener('input', plugins);
  $('#pg-tabs').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; pgTab = b.dataset.g; plugins(); });
  $('#plugins').addEventListener('change', function (e) {
    var k = e.target.dataset.plugin; if (!k) return;
    S.plugins[k] = e.target.checked; e.target.closest('.pitem').classList.toggle('on', e.target.checked);
    if (k === 'shop') plugins();
    groups(); trUI(); changed();
  });
  $('#plugins').addEventListener('input', function (e) {
    var k = e.target.dataset.pf; if (!k) return;
    var a = k.split('.'); S.pc[a[0]] = S.pc[a[0]] || {}; S.pc[a[0]][a[1]] = e.target.value;
    if (k === 'video.urls') ytStatus();
    changed();
  });
  function ytStatus() {
    var box = document.querySelector('.yt-status'); if (!box) return;
    var ls = String((S.pc.video || {}).urls || '').split(/\s+/).filter(Boolean);
    if (!ls.length) { box.textContent = t('b_videos_hint'); box.style.color = ''; return; }
    var bad = ls.filter(function (l) { return !T.ytId(l); });
    box.innerHTML = '<span style="color:var(--ok)">✓ ' + t('b_videos_ok').replace('{n}', ls.length - bad.length) + '</span>' + (bad.length ? '<br><span style="color:#dc2626">⚠ ' + t('b_yt_bad') + '</span><br><code>' + bad.map(T.esc).join('</code><br><code>') + '</code>' : '');
  }
  function groups() {
    var map = { shop: '#grp-shop', seo: '#grp-seo', analytics: '#grp-analytics', lang: '#grp-lang', autotr: '#grp-autotr' };
    Object.keys(map).forEach(function (k) { $(map[k]).style.display = S.plugins[k] ? '' : 'none'; });
  }

  /* ----- products ----- */
  function ytMsg(v) {
    if (!String(v || '').trim()) return '';
    return T.ytId(v) ? '<span style="color:var(--ok)">✓ ' + t('b_yt_ok') + '</span>' : '<span style="color:#dc2626">⚠ ' + t('b_yt_bad') + '</span>';
  }
  function products() {
    var box = $('#products'), e = T.esc;
    box.innerHTML = S.products.map(function (p, i) {
      return '<div class="prod" data-i="' + i + '">' +
        '<div class="prod-top"><input data-p="name" value="' + e(p.name) + '" data-i18n-ph="b_pname"><input data-p="price" type="number" min="0" step="0.5" value="' + e(p.price) + '" data-i18n-ph="b_pprice"></div>' +
        '<div class="prod-top" style="grid-template-columns:1fr 1fr"><input data-p="cat" value="' + e(p.cat || '') + '" data-i18n-ph="b_pcat"><input data-p="img" type="url" value="' + e(p.img || '') + '" data-i18n-ph="b_pimg"></div>' +
        '<textarea data-p="desc" data-i18n-ph="b_pdesc">' + e(p.desc || '') + '</textarea>' +
        '<div class="prod-top" style="grid-template-columns:1fr 90px"><input data-p="opts" value="' + e(p.opts || '') + '" data-i18n-ph="b_popts"><input data-p="stock" type="number" min="0" value="' + e(p.stock == null ? '' : p.stock) + '" data-i18n-ph="b_pstock"></div>' +
        '<input data-p="yt" type="url" value="' + e(p.yt || '') + '" data-i18n-ph="b_pyt"><small class="yt-msg">' + ytMsg(p.yt) + '</small>' +
        '<input data-p="stripe" type="url" value="' + e(p.stripe || '') + '" data-i18n-ph="b_pstripe">' +
        '<div class="prod-actions"><span>#' + (i + 1) + '</span><button type="button" class="link-btn" data-rm="' + i + '" data-i18n="b_remove"></button></div></div>';
    }).join('');
    SM.apply(box);
  }
  $('#products').addEventListener('input', function (e) {
    var el = e.target, k = el.dataset.p; if (!k) return;
    var i = +el.closest('.prod').dataset.i;
    S.products[i][k] = k === 'price' ? (parseFloat(el.value) || 0) : k === 'stock' ? (el.value === '' ? '' : Math.max(0, parseInt(el.value, 10) || 0)) : el.value;
    if (k === 'yt') el.parentNode.querySelector('.yt-msg').innerHTML = ytMsg(el.value);
    changed();
  });
  $('#products').addEventListener('click', function (e) { var b = e.target.closest('[data-rm]'); if (!b) return; S.products.splice(+b.dataset.rm, 1); products(); changed(); });
  $('#add-prod').onclick = function () {
    S.products.push({ id: 'p' + (uid++), name: t('b_new_product'), price: 100, cat: '', desc: '', img: '', e: '🛒', yt: '', stripe: '', opts: '', stock: '' });
    products(); changed();
    var last = $('#products').lastElementChild; last && last.querySelector('input').focus();
  };

  /* ----- site languages (14-language UI dictionary) ----- */
  function siteLangs() {
    var sel = $('#site-lang');
    sel.innerHTML = SM_LANGS.map(function (l) { return '<option value="' + l.code + '">' + l.name + '</option>'; }).join('');
    sel.value = S.lang;
    if (S.langs.indexOf(S.lang) < 0) S.langs.unshift(S.lang);
    $('#site-langs').innerHTML = SM_LANGS.map(function (l) { return '<label><input type="checkbox" value="' + l.code + '"' + (S.langs.indexOf(l.code) >= 0 ? ' checked' : '') + (l.code === S.lang ? ' disabled' : '') + '> ' + l.name + '</label>'; }).join('');
  }
  $('#site-langs').addEventListener('change', function (e) {
    var c = e.target.value; if (!c) return;
    if (e.target.checked) { if (S.langs.indexOf(c) < 0) S.langs.push(c); } else S.langs = S.langs.filter(function (x) { return x !== c; });
    changed();
  });

  /* ----- auto-translate (Google only) ----- */
  function trMode() { var m = S.trMode || AT.mode || 'widget'; return m === 'api' && apiReady ? 'api' : 'widget'; }
  function trUI() {
    var m = trMode();
    document.querySelectorAll('input[name=trmode]').forEach(function (r) { r.checked = r.value === m; r.disabled = r.value === 'api' && !apiReady; });
    $('#tr-api-state').innerHTML = SRV ? (apiReady ? (SRV.translate.mock ? t('b_tr_server_mock') : t('b_tr_server_ok')) : '⚠ ' + T.esc(t('b_tr_need_biz')))
      : apiReady ? (AT.mock ? '🧪 ' + t('b_tr_mock') : '✓ ' + t('b_tr_key_ok')) : '⚠ ' + t('b_tr_no_key');
    $('#tr-api-box').style.display = m === 'api' ? 'grid' : 'none';
    $('#tr-widget-box').style.display = m === 'widget' ? '' : 'none';
    trLangList(); trEditor();
  }
  document.querySelectorAll('input[name=trmode]').forEach(function (r) { r.addEventListener('change', function () { S.trMode = r.value; trUI(); changed(); }); });
  var dnCache = {};
  function dispName(code, ui) {
    try { var k = ui + '|' + code; if (!(k in dnCache)) dnCache[k] = new Intl.DisplayNames([ui], { type: 'language' }).of(code) || ''; return dnCache[k]; } catch (e) { return ''; }
  }
  function trLangList() {
    var q = ($('#tr-lang-search').value || '').toLowerCase();
    var ui = SM.getLang ? SM.getLang() : 'en';
    $('#tr-langs').innerHTML = SM_WORLD_LANGS.filter(function (l) { return l.code !== S.lang && (!q || (l.name + ' ' + l.code + ' ' + dispName(l.code, 'en') + ' ' + dispName(l.code, ui)).toLowerCase().indexOf(q) >= 0); }).map(function (l) {
      var loc = dispName(l.code, ui);
      return '<label title="' + T.esc(dispName(l.code, 'en')) + '"><input type="checkbox" value="' + l.code + '"' + (S.trLangs.indexOf(l.code) >= 0 ? ' checked' : '') + '> ' + T.esc(l.name) + (loc && loc !== l.name ? ' <small>' + T.esc(loc) + '</small>' : '') + (S.tr[l.code] ? ' ✓' : '') + '</label>';
    }).join('');
  }
  $('#tr-lang-search').addEventListener('input', trLangList);
  $('#tr-langs').addEventListener('change', function (e) {
    var c = e.target.value; if (!c) return;
    if (e.target.checked) { if (S.trLangs.indexOf(c) < 0) S.trLangs.push(c); } else S.trLangs = S.trLangs.filter(function (x) { return x !== c; });
    changed(); trEditor();
  });
  $('#tr-all').onclick = function () { S.trLangs = SM_WORLD_LANGS.map(function (l) { return l.code; }).filter(function (c) { return c !== S.lang; }); trLangList(); trEditor(); changed(); };
  $('#tr-none').onclick = function () { S.trLangs = []; trLangList(); trEditor(); changed(); };
  function gcode(c) { return c === 'zh-Hans' ? 'zh-CN' : c === 'zh-Hant' ? 'zh-TW' : c; }
  /* Google Cloud Translation API v2 (REST, API key). Mock mode for testing without network. */
  function translateBatch(texts, target, names) {
    if (SRV) {   // server keeps the Google key secret, applies the customer's saved edits (Business plan)
      return saveSite(true).then(function () {
        var obj = {}; names.forEach(function (k, i) { obj[k] = texts[i]; });
        return SMAPI.post('/api/sites/' + S.sid + '/translate', { source: S.lang, target: target, texts: obj });
      }).then(function (r) { return names.map(function (k, i) { return r.translations[k] != null ? r.translations[k] : texts[i]; }); },
        function (er) { throw new Error(er.code === 'plan_upgrade_required' ? t('b_tr_need_biz') : (er.code || er.message)); });
    }
    if (AT.mock) return Promise.resolve(texts.map(function (x) { return '[' + target + '] ' + x; }));
    var chunks = [], out = [];
    for (var i = 0; i < texts.length; i += 100) chunks.push(texts.slice(i, i + 100));
    return chunks.reduce(function (p, chunk) {
      return p.then(function () {
        return fetch('https://translation.googleapis.com/language/translate/v2?key=' + encodeURIComponent(AT.googleApiKey), {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ q: chunk, source: gcode(S.lang), target: gcode(target), format: 'text' })
        }).then(function (r) { return r.json().then(function (j) { if (!r.ok) throw new Error((j.error && j.error.message) || r.status); return j; }); })
          .then(function (j) { j.data.translations.forEach(function (x) { out.push(x.translatedText); }); });
      });
    }, Promise.resolve()).then(function () { return out; });
  }
  $('#tr-run').onclick = function () {
    var targets = S.trLangs.filter(function (c) { return c !== S.lang; });
    if (!targets.length) { $('#tr-status').textContent = t('b_tr_pick'); return; }
    var src = T.collectTexts(S), keys = Object.keys(src);
    var srcUi = (I18N[S.lang] || I18N.en), uiKeys = Object.keys(srcUi).filter(function (k) { return k.indexOf('x_') === 0; });
    var btn = $('#tr-run'); btn.disabled = true;
    var done = 0, st = $('#tr-status');
    var run = targets.reduce(function (p, lang) {
      return p.then(function () {
        st.textContent = t('b_tr_progress').replace('{n}', done).replace('{total}', targets.length) + ' · ' + lang;
        var needUi = !I18N[lang];
        var list = keys.map(function (k) { return src[k]; }).concat(needUi ? uiKeys.map(function (k) { return srcUi[k]; }) : []);
        var names = keys.concat(needUi ? uiKeys : []);
        return translateBatch(list, lang, names).then(function (res) {
          var prev = S.tr[lang] || {}, o = {}, man = prev.__manual || {};
          keys.forEach(function (k, i) { o[k] = man[k] ? prev[k] : res[i]; });
          if (needUi) uiKeys.forEach(function (k, i) { o[k] = man[k] ? prev[k] : res[keys.length + i]; });
          o.__manual = man; o.__src = src;
          S.tr[lang] = o; done++;
        });
      });
    }, Promise.resolve());
    run.then(function () { st.textContent = '✓ ' + t('b_tr_done').replace('{n}', done); }, function (err) { st.textContent = '⚠ ' + t('b_tr_error') + ' ' + (err && err.message || ''); })
      .then(function () { btn.disabled = false; changed(); trLangList(); trEditor(); });
  };
  function trEditor() {
    var sel = $('#tr-edit-lang'), done = Object.keys(S.tr).filter(function (l) { return S.tr[l] && l !== S.lang; });
    var cur = sel.value;
    sel.innerHTML = done.length ? done.map(function (l) { var L = SM_WORLD_LANGS.filter(function (x) { return x.code === l; })[0]; return '<option value="' + l + '">' + T.esc(L ? L.name : l) + '</option>'; }).join('') : '<option value="" data-i18n="b_tr_none_yet"></option>';
    SM.apply(sel);
    if (done.indexOf(cur) >= 0) sel.value = cur;
    var lang = sel.value, box = $('#tr-edit');
    if (!lang) { box.innerHTML = ''; return; }
    var src = T.collectTexts(S), o = S.tr[lang];
    box.innerHTML = Object.keys(src).map(function (k) { return '<div class="tr-row"><small>' + T.esc(src[k]) + '</small><textarea data-trk="' + T.esc(k) + '">' + T.esc(o[k] || '') + '</textarea></div>'; }).join('');
  }
  $('#tr-edit-lang').addEventListener('change', trEditor);
  $('#tr-edit').addEventListener('input', function (e) {
    var k = e.target.dataset.trk, lang = $('#tr-edit-lang').value; if (!k || !lang) return;
    var o = S.tr[lang]; o[k] = e.target.value; o.__manual = o.__manual || {}; o.__manual[k] = true; changed();
    if (SRV && S.sid) { var ov = {}; ov[k] = e.target.value; clearTimeout(e.target._t); e.target._t = setTimeout(function () { SMAPI.put('/api/sites/' + S.sid + '/translations/' + encodeURIComponent(lang), { overrides: ov }).catch(function () {}); }, 600); }
  });

  /* ----- preview ----- */
  var frame = $('#preview'), fw = $('#fw'), stage = $('#stage');
  function layout() {
    var W = view === 'd' ? 1280 : 390, availW = stage.clientWidth - 40, availH = stage.clientHeight - 40;
    if (view === 'd') {
      var s = Math.min(1, availW / W), H = Math.max(500, availH / s);
      frame.style.width = W + 'px'; frame.style.height = H + 'px'; frame.style.transform = 'scale(' + s + ')';
      fw.style.width = (W * s) + 'px'; fw.style.height = (H * s) + 'px'; fw.classList.remove('mobile');
    } else {
      var Hm = Math.min(844, Math.max(560, availH - 20)), sm = Math.min(1, (availH - 20) / Hm);
      frame.style.width = W + 'px'; frame.style.height = Hm + 'px'; frame.style.transform = 'scale(' + sm + ')';
      fw.style.width = (W * sm + 20) + 'px'; fw.style.height = (Hm * sm + 20) + 'px'; fw.classList.add('mobile');
    }
  }
  function previewState() { var P = JSON.parse(JSON.stringify(S)); if (P.plugins.autotr && trMode() === 'widget') P.plugins.autotr = false; return P; }
  function preview() {
    var y = 0; try { y = frame.contentWindow.scrollY; } catch (e) {}
    frame.onload = function () { try { frame.contentWindow.scrollTo(0, y); } catch (e) {} };
    frame.srcdoc = T.generateSite(previewState(), { preview: true });
    $('#combo').textContent = tplName(T.DESKTOP, S.desktop) + ' + ' + tplName(T.MOBILE, S.mobile);
  }
  $('#view-tabs').onclick = function (e) {
    var b = e.target.closest('button'); if (!b) return; view = b.dataset.v;
    document.querySelectorAll('#view-tabs button').forEach(function (x) { x.classList.toggle('on', x === b); });
    layout();
  };
  window.addEventListener('resize', layout);

  /* ----- export / publish ----- */
  function download(name, text, type) {
    var blob = new Blob([text], { type: type }), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  /* Publishing a live site needs a paid plan (Pro / Business). In demo/local mode export still works for testing. */
  function paid() { var p = window.SMAuth ? SMAuth.plan() : 'none'; return p === 'pro' || p === 'biz'; }
  function publishNote() { var n = $('#publish-note'); if (n) n.style.display = paid() ? 'none' : ''; }

  /* ----- cloud save + one-click publish (SiteMix server) ----- */
  var saving = null;
  function errMsg(er) {
    var d = er.data || {};
    if (er.code === 'login_required') return t('api_need_login');
    if (er.code === 'site_limit') return t('api_site_limit', { n: d.limit });
    if (er.code === 'plan_required') return t('api_need_plan');
    if (er.code === 'plan_upgrade_required') return t('api_need_biz', { list: (d.blocked || []).map(function (k) { return k === 'autotr:cloud' ? 'Google Cloud Translation' : t('p_' + k); }).join('、') });
    return t('api_save_fail', { msg: er.code || er.message });
  }
  function result(html, kind) { var r = $('#publish-result'); r.hidden = false; r.className = 'hint' + (kind === 'warn' ? ' pay' : ''); r.innerHTML = html; }
  function needLoginBox() { result(T.esc(t('api_need_login')) + ' <a href="login.html?next=builder.html">' + T.esc(t('nav_login')) + '</a>', 'warn'); }
  function cloudSave(quiet) {
    if (!SMAuth.user()) { if (!quiet) needLoginBox(); return Promise.reject(Object.assign(new Error('login_required'), { code: 'login_required' })); }
    if (saving) return saving;
    var body = { state: JSON.parse(JSON.stringify(S)) };
    var p = S.sid ? SMAPI.put('/api/sites/' + S.sid, body) : SMAPI.post('/api/sites', body);
    saving = p.then(function (r) { S.sid = r.site.id; save(); return r; }).then(function (r) { saving = null; return r; }, function (er) {
      saving = null;
      if (er.status === 404 && S.sid) { delete S.sid; return cloudSave(quiet); }   // deleted elsewhere → create again
      if (!quiet) result(T.esc(errMsg(er)) + (er.code === 'site_limit' || er.code === 'plan_required' ? ' <a href="pricing.html">' + T.esc(t('api_go_pricing')) + '</a>' : ''), 'warn');
      throw er;
    });
    return saving;
  }
  function publishNow() {
    var btn = $('#publish'); btn.disabled = true; result(T.esc(t('api_publishing')));
    cloudSave(false).then(function () { return SMAPI.post('/api/sites/' + S.sid + '/publish', {}); }).then(function (r) {
      var u = r.urls || {}, links = [u.custom, u.subdomain, u.preview].filter(Boolean);
      result('<b>' + T.esc(t('api_published')) + '</b><br>' + links.map(function (l) { return '<a href="' + T.esc(l) + '" target="_blank" rel="noopener">' + T.esc(l) + '</a>'; }).join('<br>') +
        '<br><a href="account.html#site-' + T.esc(S.sid) + '">' + T.esc(t('api_domain_link')) + '</a>');
    }, function (er) {
      if (er.code === 'login_required') return needLoginBox();
      result(T.esc(errMsg(er)) + (/^plan_|site_limit/.test(er.code || '') ? ' <a href="pricing.html">' + T.esc(t('api_go_pricing')) + '</a>' : ''), 'warn');
    }).then(function () { btn.disabled = false; });
  }
  function saveSite(quiet) {
    if (SRV) return cloudSave(quiet);
    var list = []; try { list = JSON.parse(localStorage.getItem('sm_sites') || '[]'); } catch (e) {}
    S.siteId = S.siteId || 's' + Date.now().toString(36);
    list = list.filter(function (x) { return x.id !== S.siteId; });
    list.unshift({ id: S.siteId, name: S.name, emoji: S.emoji, primary: S.primary, desktop: S.desktop, mobile: S.mobile, products: S.products.length, updated: Date.now(), state: JSON.parse(JSON.stringify(S)) });
    try { localStorage.setItem('sm_sites', JSON.stringify(list.slice(0, 20))); } catch (e) {}
    save();
    return Promise.resolve();
  }
  function exportSite() {
    var bad = S.products.filter(function (p) { return p.yt && !T.ytId(p.yt); }).length + String((S.pc.video || {}).urls || '').split(/\s+/).filter(function (l) { return l && !T.ytId(l); }).length;
    if (bad && !confirm(t('b_yt_bad_export'))) return;
    var X = JSON.parse(JSON.stringify(S)); if (X.plugins.autotr) X.trMode = trMode();
    download(T.slugify(S.name) + '.html', T.generateSite(X, { preview: false }), 'text/html;charset=utf-8');
    saveSite(true).catch(function () {});
    SM.toast(paid() ? t('b_export_done') : t('b_export_test'));
  }
  $('#save-site').onclick = function () { saveSite().then(function () { SM.toast(SRV ? t('api_saved_cloud') : t('b_site_saved')); }, function () {}); };
  $('#publish').onclick = publishNow;
  $('#export').onclick = exportSite; $('#export2').onclick = exportSite;
  $('#export-json').onclick = function () { download(T.slugify(S.name) + '.sitemix.json', JSON.stringify(S, null, 2), 'application/json'); };
  $('#import-json').onchange = function (e) {
    var f = e.target.files[0]; if (!f) return;
    f.text().then(function (txt) { try { var o = JSON.parse(txt); if (!o || o.v !== 2 || !o.products) throw 0; S = o; fill(); changed(); SM.toast('✓'); } catch (er) { alert(t('b_import_bad')); } });
  };
  $('#reset').onclick = function () { if (!confirm(t('b_reset_confirm'))) return; var sid = S.sid; S = T.sampleState(S.cat || 'cafe', SM.getLang()); if (sid) S.sid = sid; fill(); changed(); };
  var open = qs.get('site');
  if (open) { try { var it = JSON.parse(localStorage.getItem('sm_sites') || '[]').filter(function (x) { return x.id === open; })[0]; if (it && it.state && it.state.v === 2) S = it.state; } catch (e) {} }

  document.addEventListener('sm:lang', function () { fill(); });
  publishNote(); fill(); layout(); preview(); save();

  /* switch to server mode when the SiteMix server answers */
  if (window.SMAPI) SMAPI.available.then(function (cfg) {
    if (!cfg) return;
    SRV = cfg;
    $('#publish').hidden = false;
    var sb = $('#save-site'); if (sb) sb.classList.remove('ghost');
    return SMAuth.ready.then(function (u) {
      var lim = (u && u.limits) || {};
      apiReady = !!(cfg.translate.cloud && lim.cloudTranslate);
      publishNote(); trUI();
      if (open && u) return SMAPI.get('/api/sites/' + encodeURIComponent(open)).then(function (r) {
        if (r.state && r.state.v === 2) { S = r.state; S.sid = r.site.id; S.pc = S.pc || {}; S.tr = S.tr || {}; S.trLangs = S.trLangs || []; fill(); preview(); save(); }
      }, function () {});
    });
  });
  window.SMB = { state: function () { return S; }, exportSite: exportSite, saveSite: saveSite, refresh: function () { fill(); preview(); } };
});
