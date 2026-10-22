/* SiteMix API client. When the pages are served by the SiteMix server (server/), /api/config answers and
 * the platform uses cloud login, cloud save, one-click publish and real subscriptions.
 * When the pages are opened as plain static files, SMAPI.available resolves to null and the old
 * browser-only / demo behaviour is kept. */
(function () {
  var C = window.SITE_CONFIG || {}, base = String(C.apiBase || '').replace(/\/+$/, '');
  function req(method, path, body) {
    var o = { method: method, credentials: 'include', headers: { Accept: 'application/json' } };
    if (body !== undefined) { o.headers['Content-Type'] = 'application/json'; o.body = JSON.stringify(body); }
    return fetch(base + path, o).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok) { var e = new Error(j.error || ('http_' + r.status)); e.status = r.status; e.code = j.error || ''; e.data = j; throw e; }
        return j;
      });
    });
  }
  var hasServer = !!base || /(?:^|;\s*)sm_backend=1/.test(document.cookie || '');
  var available = !hasServer ? Promise.resolve(null)
    : fetch(base + '/api/config', { credentials: 'include' }).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) { return j && j.backend ? j : null; }).catch(function () { return null; });
  window.SMAPI = {
    base: base, available: available,
    get: function (p) { return req('GET', p); },
    post: function (p, b) { return req('POST', p, b || {}); },
    put: function (p, b) { return req('PUT', p, b || {}); },
    patch: function (p, b) { return req('PATCH', p, b || {}); },
    del: function (p) { return req('DELETE', p, {}); }
  };
  /* Small "test mode" ribbon so nobody mistakes mock payments for real ones. */
  available.then(function (cfg) {
    if (!cfg || !cfg.mock) return;
    var show = function () {
      if (document.getElementById('sm-mock-ribbon') || !window.SM) return;
      var d = document.createElement('div'); d.id = 'sm-mock-ribbon';
      d.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:9999;background:#fff7e6;border:1px dashed #f59e0b;color:#92400e;font:12px/1.4 system-ui,sans-serif;padding:7px 10px;border-radius:10px;max-width:300px;box-shadow:0 4px 14px #0001';
      d.textContent = SM.t('api_mock_banner'); document.body.appendChild(d);
      document.addEventListener('sm:lang', function () { d.textContent = SM.t('api_mock_banner'); });
    };
    if (document.readyState === 'loading') document.addEventListener('sm:ready', show); else show();
  });
})();
