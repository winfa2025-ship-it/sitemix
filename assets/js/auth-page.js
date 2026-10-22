/* Login / sign-up page logic */
document.addEventListener('sm:ready', function () {
  var A = window.SMAuth, t = SM.t, mode = document.body.getAttribute('data-mode');
  var msg = document.getElementById('auth-msg'), form = document.getElementById('auth-form');
  var qp = new URLSearchParams(location.search), next = qp.get('next'), explicitNext = /^[a-z-]+\.html(\?[\w=&%.-]*)?$/.test(next || '');
  next = explicitNext ? next : 'account.html';
  var pendingProvider = 'email';

  function show(kind, key, vars) { msg.className = 'auth-msg on ' + kind; msg.textContent = t(key, vars); }
  function notConfigured(provider) {
    pendingProvider = provider;
    show('warn', 'au_not_configured');
    document.getElementById('demo-box').hidden = false;
  }
  function errText(e) {
    var c = (e && e.code) || '';
    if (c === 'sm/not-configured') return null;
    if (/wrong-password|invalid-credential|user-not-found/.test(c)) return 'au_err_cred';
    if (/email-already-in-use/.test(c)) return 'au_err_exists';
    if (/weak-password/.test(c)) return 'au_err_pw';
    if (/popup-closed/.test(c)) return 'au_err_closed';
    if (/account-exists-with-different-credential/.test(c)) return 'au_err_other_provider';
    return 'au_err_generic';
  }
  /* New sign-ups go to the pricing page: the first month is paid upfront and is the trial month. */
  function done(r) { show('ok', 'au_success'); var to = (!explicitNext && r && r.next) ? r.next : next; setTimeout(function () { location.href = to; }, 500); }
  var qerr = qp.get('error');
  if (qerr) show('err', qerr === 'provider_not_configured' ? 'au_err_provider' : 'au_err_oauth');
  if (window.SMAPI) SMAPI.available.then(function (cfg) {
    if (cfg && cfg.mock && !qerr) show('warn', 'au_mock_note');
    if (cfg) document.querySelectorAll('[data-provider]').forEach(function (b) { if (cfg.auth && cfg.auth[b.dataset.provider] === false) b.style.display = 'none'; });
  });
  function fail(provider) { return function (e) { var k = errText(e); if (!k) notConfigured(provider); else show('err', k, { msg: (e && e.code) || '' }); }; }

  document.querySelectorAll('[data-provider]').forEach(function (b) {
    var p = b.dataset.provider;
    if (C_disabled(p)) { b.style.display = 'none'; return; }
    b.onclick = function () { A.signInWith(p).then(done, fail(p)); };
  });
  function C_disabled(p) { var ap = SITE_CONFIG.authProviders || {}; return ap[p] === false; }
  if (C_disabled('email')) { form.style.display = 'none'; document.querySelector('.or').style.display = 'none'; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = form.email.value.trim(), pw = form.password.value, name = form.name ? form.name.value.trim() : '';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { show('err', 'au_err_email'); return; }
    if (pw.length < 8) { show('err', 'au_err_pw'); return; }
    var p = mode === 'signup' ? A.signUpEmail(name, email, pw) : A.signInEmail(email, pw);
    p.then(done, fail('email'));
  });
  var fg = document.getElementById('forgot');
  if (fg) fg.onclick = function (e) {
    e.preventDefault();
    var email = form.email.value.trim();
    if (!email) { show('err', 'au_err_email'); return; }
    A.resetPassword(email).then(function () { show('ok', 'au_reset_sent'); }, fail('email'));
  };
  document.getElementById('demo-btn').onclick = function () {
    var email = form.email.value.trim(), name = (form.name && form.name.value.trim()) || '';
    if (!name) name = email ? email.split('@')[0] : t('au_demo_name');
    form.password.value = '';
    A.demoSignIn(pendingProvider, name, email || 'demo@example.com').then(done);
  };
  A.ready.then(function (u) { if (u) show('ok', 'au_already', { name: u.name }); });
});
