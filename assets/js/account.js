/* My account — cloud dashboard when the SiteMix server is present, browser-only list otherwise. */
document.addEventListener('sm:ready', function () {
  var t = SM.t, A = SMAuth, $ = function (s) { return document.getElementById(s); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function fmtDate(d) { try { return new Date(d).toLocaleDateString(SM.getLang(), { year: 'numeric', month: 'short', day: 'numeric' }); } catch (e) { return d; } }
  var SRV = null, sites = [], limit = 0, sub = null, openPanels = {};

  /* ---------- browser-only (static) mode — unchanged behaviour ---------- */
  function localSites() { try { return JSON.parse(localStorage.getItem('sm_sites') || '[]'); } catch (e) { return []; } }
  function renderLocalSites() {
    var list = localSites(), box = $('acc-sites');
    box.innerHTML = list.length ? list.map(function (s) {
      return '<div class="site-row" data-id="' + esc(s.id) + '"><div class="site-ico" style="background:' + esc(s.primary || '#5b4bff') + '22">' + esc(s.emoji || '🌐') + '</div><div><b>' + esc(s.name) + '</b><small>' + esc(s.desktop) + ' + ' + esc(s.mobile) + ' · ' + s.products + ' ' + esc(t('acc_products')) + ' · ' + esc(t('acc_updated')) + ' ' + new Date(s.updated).toLocaleString(SM.getLang()) + '</small></div>' +
        '<div class="site-acts"><a class="btn sm" href="builder.html?site=' + encodeURIComponent(s.id) + '">' + esc(t('acc_open')) + '</a><button class="btn ghost sm" type="button" data-del-local="' + esc(s.id) + '">' + esc(t('acc_delete')) + '</button></div></div>';
    }).join('') : '<p class="muted">' + esc(t('acc_none')) + '</p>';
  }

  /* ---------- plan card ---------- */
  function renderPlan(u) {
    var plan = A.plan(), P = SITE_CONFIG.pricing.plans.filter(function (p) { return p.id === plan; })[0];
    $('acc-plan').textContent = P ? P.name + ' · ' + SITE_CONFIG.pricing.currency + P.monthly + ' ' + t('pr_mo') : t('acc_no_plan');
    var d = $('acc-plan-d'), extra = $('acc-billing');
    if (!SRV) { d.textContent = P ? t('pr_trial_line') : t('acc_no_plan_d'); extra.innerHTML = ''; return; }
    var lines = [];
    if (P) {
      var st = u.planStatus;
      lines.push(st === 'canceled' ? t('acc_status_canceled', { date: fmtDate(u.planPeriodEnd) }) : st === 'past_due' ? t('acc_status_past_due') : t('acc_status_active') + (u.planPeriodEnd ? ' · ' + t('acc_renews', { date: fmtDate(u.planPeriodEnd) }) : ''));
      if (u.planProvider) lines.push(t('acc_via_pay', { p: u.planProvider === 'paypal' ? 'PayPal' : 'Stripe' }));
    } else lines.push(t('acc_no_plan_d'));
    d.innerHTML = lines.map(esc).join('<br>');
    var btns = '';
    if (sub && sub.portal) btns += '<button class="btn ghost sm block" type="button" id="acc-portal">' + esc(t('acc_manage_billing')) + '</button>';
    if (P && u.planStatus !== 'canceled') btns += '<button class="btn ghost sm block" type="button" id="acc-cancel" style="margin-top:8px">' + esc(t('acc_cancel')) + '</button>';
    extra.innerHTML = btns;
    $('acc-upgrade').style.display = P && plan === 'biz' && u.planStatus !== 'canceled' ? 'none' : '';
    if ($('acc-portal')) $('acc-portal').onclick = function () { SMAPI.post('/api/billing/portal', {}).then(function (r) { location.href = r.url; }, function (er) { SM.toast(er.code); }); };
    if ($('acc-cancel')) $('acc-cancel').onclick = function () {
      if (!confirm(t('acc_cancel_confirm'))) return;
      SMAPI.post('/api/billing/cancel', {}).then(function () { SM.toast(t('acc_cancel_ok')); return reload(); }, function (er) { SM.toast(er.code); });
    };
  }

  /* ---------- cloud sites ---------- */
  function siteRow(s) {
    var live = !!s.publishedAt, u = s.urls || {};
    var meta = esc(s.desktop) + ' + ' + esc(s.mobile) + ' · ' + s.products + ' ' + esc(t('acc_products')) + ' · ' + esc(t('acc_updated')) + ' ' + new Date(s.updated).toLocaleString(SM.getLang());
    var pill = '<span class="pill" style="font-size:11px;padding:2px 8px;margin-inline-start:6px;' + (live ? 'background:#dcfce7;color:#166534' : '') + '">' + esc(live ? t('acc_live') : t('acc_draft')) + '</span>';
    var links = live ? '<small>' + [u.custom, u.subdomain, u.preview].filter(Boolean).map(function (l) { return '<a href="' + esc(l) + '" target="_blank" rel="noopener">' + esc(l.replace(/^https?:\/\//, '')) + '</a>'; }).join(' · ') + '</small>' : '';
    return '<div class="site-card" id="site-' + esc(s.id) + '" data-id="' + esc(s.id) + '" style="border:1px solid var(--line);border-radius:14px;padding:12px;display:grid;gap:10px">' +
      '<div class="site-row" style="border:0;padding:0"><div class="site-ico" style="background:' + esc(s.primary) + '22">' + esc(s.emoji) + '</div><div><b>' + esc(s.name) + '</b>' + pill + '<small>' + meta + '</small>' + links + '</div>' +
      '<div class="site-acts" style="flex-wrap:wrap"><a class="btn ghost sm" href="builder.html?site=' + encodeURIComponent(s.id) + '">' + esc(t('acc_open')) + '</a>' +
      '<button class="btn sm" type="button" data-act="publish">' + esc(live ? t('acc_republish') : t('acc_publish')) + '</button>' +
      (live ? '<button class="btn ghost sm" type="button" data-act="unpublish">' + esc(t('acc_unpublish')) + '</button>' : '') +
      '<button class="btn ghost sm" type="button" data-act="delete">' + esc(t('acc_delete')) + '</button></div></div>' +
      '<div class="site-msg hint pay" hidden></div>' +
      '<details data-panel="domain"' + (openPanels[s.id + 'domain'] ? ' open' : '') + '><summary>🔗 ' + esc(t('acc_domain')) + (s.customDomain ? ': <b>' + esc(s.customDomain) + '</b> ' + (s.domainVerified ? '✓' : '⏳') : '') + '</summary><div class="dom-body" style="display:grid;gap:8px;margin-top:8px">' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap"><input class="dom-in" style="flex:1;min-width:200px;border:1px solid var(--line);border-radius:10px;padding:9px" value="' + esc(s.customDomain || '') + '" placeholder="' + esc(t('acc_domain_ph')) + '">' +
        '<button class="btn sm" type="button" data-act="domain-save">' + esc(t('acc_domain_save')) + '</button>' + (s.customDomain ? '<button class="btn ghost sm" type="button" data-act="domain-verify">' + esc(t('acc_domain_verify')) + '</button>' : '') + '</div><div class="dom-info"></div></div></details>' +
      '<details data-panel="orders"' + (openPanels[s.id + 'orders'] ? ' open' : '') + '><summary>🧾 ' + esc(t('acc_orders')) + '</summary><div class="orders-box" style="margin-top:8px;overflow:auto"></div></details></div>';
  }
  function renderCloudSites() {
    var box = $('acc-sites');
    $('acc-count').textContent = t('acc_site_limit', { n: sites.length, max: limit });
    box.innerHTML = sites.length ? sites.map(siteRow).join('') : '<p class="muted">' + esc(t('acc_cloud_none')) + '</p>';
    box.style.display = 'grid'; box.style.gap = '12px';
    sites.forEach(function (s) {
      if (openPanels[s.id + 'domain']) loadDomain(s.id);
      if (openPanels[s.id + 'orders']) loadOrders(s.id);
    });
    if (location.hash && document.querySelector(location.hash)) document.querySelector(location.hash).scrollIntoView({ block: 'center' });
  }
  function card(id) { return document.querySelector('.site-card[data-id="' + id + '"]'); }
  function msg(id, html) { var m = card(id).querySelector('.site-msg'); m.hidden = !html; m.innerHTML = html || ''; }
  function errHtml(er) {
    var d = er.data || {}, k = er.code;
    var text = k === 'plan_required' ? t('api_need_plan') : k === 'site_limit' ? t('api_site_limit', { n: d.limit }) : k === 'plan_upgrade_required' ? t('api_need_biz', { list: (d.blocked || []).map(function (x) { return x === 'autotr:cloud' ? 'Google Cloud Translation' : t('p_' + x); }).join('、') }) : t('api_save_fail', { msg: k || er.message });
    return esc(text) + (/^plan_|site_limit/.test(k || '') ? ' <a href="pricing.html">' + esc(t('api_go_pricing')) + '</a>' : '');
  }
  function dnsTable(dns) {
    return '<p class="muted" style="font-size:13px;margin:0">' + esc(t('acc_dns_intro')) + '</p><table class="dns" style="font-size:13px"><thead><tr><th>' + esc(t('d_type')) + '</th><th>' + esc(t('d_name')) + '</th><th>' + esc(t('d_value')) + '</th></tr></thead><tbody>' +
      dns.records.map(function (r) { return '<tr><td><code>' + esc(r.type) + '</code></td><td><code>' + esc(r.name) + '</code></td><td><code>' + esc(r.value) + '</code></td></tr>'; }).join('') + '</tbody></table>';
  }
  function loadDomain(id) {
    SMAPI.get('/api/sites/' + id + '/domain').then(function (r) {
      var el = card(id) && card(id).querySelector('.dom-info'); if (!el || !r.domain) return;
      el.innerHTML = (r.verified ? '<div class="hint">' + esc(t('acc_domain_ok')) + '</div>' : '') + dnsTable(r.dns);
    }, function () {});
  }
  function loadOrders(id) {
    SMAPI.get('/api/sites/' + id + '/orders').then(function (r) {
      var el = card(id) && card(id).querySelector('.orders-box'); if (!el) return;
      if (!r.orders.length) { el.innerHTML = '<p class="muted" style="font-size:13px">' + esc(t('acc_no_orders')) + '</p>'; return; }
      var ST = ['new', 'paid', 'shipped', 'completed', 'cancelled'];
      el.innerHTML = '<table class="dns" style="font-size:13px"><tbody>' + r.orders.map(function (o) {
        return '<tr><td>' + esc(new Date(o.created_at).toLocaleString(SM.getLang())) + '<br><small class="muted">#' + esc(o.id) + '</small></td><td><b>' + esc(o.customer_name) + '</b><br>' + esc(o.phone) + (o.address ? '<br><small>' + esc(o.address) + '</small>' : '') + '</td>' +
          '<td>' + o.items.map(function (i) { return esc(i.name) + (i.opt ? ' (' + esc(i.opt) + ')' : '') + ' × ' + i.qty; }).join('<br>') + '</td><td><b>' + esc(o.currency) + ' ' + o.total + '</b>' + (o.code ? '<br><small>' + esc(o.code) + '</small>' : '') + '</td>' +
          '<td><select data-order="' + esc(o.id) + '" class="lang-select">' + ST.map(function (s) { return '<option' + (s === o.status ? ' selected' : '') + '>' + s + '</option>'; }).join('') + '</select></td></tr>';
      }).join('') + '</tbody></table>';
    }, function () {});
  }

  $('acc-sites').addEventListener('click', function (e) {
    var dl = e.target.closest('[data-del-local]');
    if (dl) { if (!confirm(t('acc_delete_confirm'))) return; localStorage.setItem('sm_sites', JSON.stringify(localSites().filter(function (s) { return s.id !== dl.dataset.delLocal; }))); renderLocalSites(); return; }
    var b = e.target.closest('[data-act]'); if (!b || !SRV) return;
    var c = b.closest('.site-card'), id = c.dataset.id, act = b.dataset.act;
    b.disabled = true;
    var done = function () { b.disabled = false; };
    if (act === 'publish') SMAPI.post('/api/sites/' + id + '/publish', {}).then(function () { return reload(); }, function (er) { msg(id, errHtml(er)); }).then(done);
    else if (act === 'unpublish') SMAPI.post('/api/sites/' + id + '/unpublish', {}).then(reload).then(done);
    else if (act === 'delete') { if (!confirm(t('acc_delete_cloud_confirm'))) return done(); SMAPI.del('/api/sites/' + id).then(reload).then(done); }
    else if (act === 'domain-save') {
      openPanels[id + 'domain'] = true;
      SMAPI.put('/api/sites/' + id + '/domain', { domain: c.querySelector('.dom-in').value.trim() }).then(function () { return reload(); }, function (er) { msg(id, er.code === 'invalid_domain' ? '⚠ ' + esc(er.code) : er.code === 'domain_taken' ? '⚠ ' + esc(er.code) : errHtml(er)); }).then(done);
    } else if (act === 'domain-verify') {
      SMAPI.post('/api/sites/' + id + '/domain/verify', {}).then(function (r) {
        openPanels[id + 'domain'] = true;
        return reload().then(function () { if (!r.verified) msg(id, esc(t('acc_domain_wait'))); });
      }).then(done, done);
    } else done();
  });
  $('acc-sites').addEventListener('toggle', function (e) {
    var d = e.target; if (!d.dataset || !d.dataset.panel) return;
    var id = d.closest('.site-card').dataset.id; openPanels[id + d.dataset.panel] = d.open;
    if (d.open && d.dataset.panel === 'orders') loadOrders(id);
    if (d.open && d.dataset.panel === 'domain') loadDomain(id);
  }, true);
  $('acc-sites').addEventListener('change', function (e) {
    var s = e.target.closest('[data-order]'); if (!s) return;
    var id = s.closest('.site-card').dataset.id;
    SMAPI.patch('/api/sites/' + id + '/orders/' + s.dataset.order, { status: s.value }).then(function () { SM.toast('✓'); });
  });

  function reload() {
    return Promise.all([A.refresh(), SMAPI.get('/api/sites'), SMAPI.get('/api/billing/subscription')]).then(function (r) {
      sites = r[1].sites; limit = r[1].limit; sub = r[2]; render();
    }, function () { render(); });
  }
  function render() {
    var u = A.user();
    $('acc-need').hidden = !!u; $('acc-dash').hidden = !u;
    $('acc-hello').textContent = u ? t('acc_hello', { name: u.name }) : t('acc_title');
    $('acc-sub').textContent = u ? (u.email + (u.demo ? ' · ' + t('acc_demo_badge') : '')) : '';
    if (!u) return;
    renderPlan(u);
    $('acc-via').textContent = t('acc_signed_via', { p: A.providerLabel(u.provider) });
    var q = new URLSearchParams(location.search).get('checkout'), bn = $('acc-banner');
    if (SRV && (q === 'success' || q === 'pending')) { bn.hidden = false; bn.textContent = t(q === 'success' && A.plan() !== 'none' ? 'acc_checkout_ok' : 'acc_checkout_pending'); } else bn.hidden = true;
    if (SRV) renderCloudSites(); else renderLocalSites();
  }
  $('acc-out').onclick = function () { A.signOut().then(function () { location.href = 'index.html'; }); };
  (window.SMAPI ? SMAPI.available : Promise.resolve(null)).then(function (cfg) {
    SRV = cfg;
    if (SRV) { var sd = document.querySelector('[data-i18n="acc_sites_d"]'); if (sd) { sd.setAttribute('data-i18n', 'acc_sites_d_cloud'); sd.textContent = t('acc_sites_d_cloud'); } }
    return A.ready.then(function (u) { if (SRV && u) return reload(); render(); });
  });
  A.onChange(function () { if (!SRV) render(); });
  document.addEventListener('sm:lang', render);
});
