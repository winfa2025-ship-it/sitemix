/* SiteMix auth.
 * 1) SiteMix server present (server/)  → cloud accounts: Google / Facebook / X OAuth + email/password, plan from the server.
 * 2) Static files + Firebase config     → Firebase Authentication (Google, Facebook, X, email/password).
 * Firebase SDK is loaded from the official gstatic CDN ONLY when SITE_CONFIG.firebase is filled.
 * When empty: buttons show a "not configured yet" notice and a local DEMO MODE can be used
 * (demo user stored in this browser only; passwords are never stored). */
(function () {
  var C = window.SITE_CONFIG, FB = C.firebase || {};
  var configured = !!(FB.apiKey && FB.authDomain && FB.projectId && FB.appId);
  var DEMO_KEY = 'sm_demo_user', PLAN_KEY = 'sm_plan';
  var listeners = [], current = null, fb = null, readyResolve;
  var ready = new Promise(function (r) { readyResolve = r; });

  function emit() { listeners.forEach(function (cb) { try { cb(current); } catch (e) { console.error(e); } }); renderMenu(); }
  function norm(u, demo) {
    if (!u) return null;
    var pid = demo ? u.provider : ((u.providerData && u.providerData[0] && u.providerData[0].providerId) || 'password');
    return { uid: u.uid, name: u.displayName || u.name || (u.email ? u.email.split('@')[0] : 'User'), email: u.email || '', photo: u.photoURL || '', provider: pid, demo: !!demo };
  }

  function loadFirebase() {
    var v = C.firebaseSdkVersion || '10.12.2', base = 'https://www.gstatic.com/firebasejs/' + v + '/';
    return Promise.all([import(base + 'firebase-app.js'), import(base + 'firebase-auth.js')]).then(function (m) {
      var app = m[0].initializeApp(FB), A = m[1], auth = A.getAuth(app);
      fb = { A: A, auth: auth };
      A.getRedirectResult(auth).catch(function () {});
      A.onAuthStateChanged(auth, function (u) { current = norm(u, false); emit(); readyResolve(current); });
      return fb;
    });
  }

  var backend = null;   // server config when the SiteMix server is present
  function normB(u) { return u ? { uid: u.id, name: u.name, email: u.email || '', photo: u.photo || '', provider: u.provider, demo: false, plan: u.plan, planStatus: u.planStatus, planProvider: u.planProvider, planPeriodEnd: u.planPeriodEnd, limits: u.limits, server: true } : null; }
  function loadMe() { return SMAPI.get('/api/auth/me').then(function (r) { current = normB(r && r.user); }, function () { current = null; }); }
  var ERR = { invalid_credentials: 'auth/invalid-credential', email_in_use: 'auth/email-already-in-use', weak_password: 'auth/weak-password', invalid_email: 'auth/invalid-email' };
  function srvErr(e) { var x = new Error(e.code || e.message); x.code = ERR[e.code] || e.code || 'error'; x.data = e.data; throw x; }
  function nextParam() { var n = new URLSearchParams(location.search).get('next'); return /^[a-z-]+\.html(\?[\w=&%.-]*)?$/.test(n || '') ? n : 'account.html'; }

  (window.SMAPI ? SMAPI.available : Promise.resolve(null)).then(function (cfg) {
    if (cfg) {
      backend = cfg; API.configured = true; API.backend = cfg;
      return loadMe().then(function () { emit(); readyResolve(current); });
    }
    if (configured) {
      loadFirebase().catch(function (e) { console.warn('Firebase failed to load', e); readyResolve(null); });
    } else {
      try { current = JSON.parse(localStorage.getItem(DEMO_KEY) || 'null'); } catch (e) { current = null; }
      readyResolve(current); emit();
    }
  });

  function providerObj(name) {
    var A = fb.A;
    if (name === 'google') return new A.GoogleAuthProvider();
    if (name === 'facebook') { var f = new A.FacebookAuthProvider(); f.addScope('email'); return f; }
    if (name === 'x') return new A.TwitterAuthProvider();
    throw new Error('unknown provider');
  }
  function notConfigured() { var e = new Error('not-configured'); e.code = 'sm/not-configured'; return Promise.reject(e); }

  var API = {
    configured: configured,
    ready: ready,
    user: function () { return current; },
    onChange: function (cb) { listeners.push(cb); },
    backend: null,
    refresh: function () { return backend ? loadMe().then(function () { emit(); return current; }) : Promise.resolve(current); },
    signInWith: function (name) {
      if (backend) { location.href = SMAPI.base + '/api/auth/' + encodeURIComponent(name) + '/start?next=' + encodeURIComponent(nextParam()); return new Promise(function () {}); }
      if (!configured) return notConfigured();
      return ready.then(function () {
        var p = providerObj(name);
        return fb.A.signInWithPopup(fb.auth, p).catch(function (e) {
          if (e && (e.code === 'auth/popup-blocked' || e.code === 'auth/operation-not-supported-in-this-environment')) return fb.A.signInWithRedirect(fb.auth, p);
          throw e;
        });
      });
    },
    signInEmail: function (email, pw) {
      if (backend) return SMAPI.post('/api/auth/login', { email: email, password: pw }).then(function (r) { current = normB(r.user); emit(); return r; }, srvErr);
      if (!configured) return notConfigured();
      return ready.then(function () { return fb.A.signInWithEmailAndPassword(fb.auth, email, pw); });
    },
    signUpEmail: function (name, email, pw) {
      if (backend) return SMAPI.post('/api/auth/signup', { name: name, email: email, password: pw }).then(function (r) { current = normB(r.user); emit(); return r; }, srvErr);
      if (!configured) return notConfigured();
      return ready.then(function () {
        return fb.A.createUserWithEmailAndPassword(fb.auth, email, pw).then(function (cred) {
          return name ? fb.A.updateProfile(cred.user, { displayName: name }).then(function () { current = norm(cred.user); emit(); return cred; }) : cred;
        });
      });
    },
    resetPassword: function (email) {
      if (backend) return SMAPI.post('/api/auth/forgot', { email: email }).catch(srvErr);
      if (!configured) return notConfigured();
      return ready.then(function () { return fb.A.sendPasswordResetEmail(fb.auth, email); });
    },
    /* Demo mode: local only, no network, no password stored */
    demoSignIn: function (provider, name, email) {
      if (configured || backend) return Promise.reject(new Error('demo disabled when Firebase is configured'));
      current = { uid: 'demo-' + Date.now().toString(36), name: name || 'Demo User', email: email || 'demo@example.com', photo: '', provider: provider || 'demo', demo: true };
      try { localStorage.setItem(DEMO_KEY, JSON.stringify(current)); } catch (e) {}
      emit(); return Promise.resolve(current);
    },
    signOut: function () {
      if (backend) return SMAPI.post('/api/auth/logout', {}).then(function () { current = null; emit(); });
      if (configured && fb) return fb.A.signOut(fb.auth);
      current = null; try { localStorage.removeItem(DEMO_KEY); } catch (e) {}
      emit(); return Promise.resolve();
    },
    plan: function () { if (backend) return (current && current.plan) || 'none'; try { return localStorage.getItem(PLAN_KEY) || 'none'; } catch (e) { return 'none'; } },
    providerLabel: function (p) { return { 'google.com': 'Google', google: 'Google', 'facebook.com': 'Facebook', facebook: 'Facebook', 'twitter.com': 'X', x: 'X', password: 'Email', email: 'Email', demo: 'Demo' }[p] || p; }
  };
  window.SMAuth = API;

  /* ---------- header account menu ---------- */
  function esc(s) { return String(s || '').replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function renderMenu() {
    var slot = document.getElementById('acct-slot'); if (!slot || !window.SM) return;
    var t = SM.t;
    if (!current) { slot.innerHTML = '<a class="btn ghost sm acct-login" href="login.html">' + esc(t('nav_login')) + '</a>'; return; }
    var ini = Array.from(current.name || '?')[0].toUpperCase();
    slot.innerHTML = '<div class="acct"><button type="button" class="acct-btn" aria-haspopup="true">' +
      (current.photo ? '<img src="' + esc(current.photo) + '" alt="" referrerpolicy="no-referrer">' : '<span class="av">' + esc(ini) + '</span>') +
      '<span class="acct-name">' + esc(current.name) + '</span></button>' +
      '<div class="acct-menu"><div class="acct-head"><b>' + esc(current.name) + '</b><small>' + esc(current.email) + '</small>' + (current.demo ? '<small class="demo-tag">' + esc(t('acc_demo_badge')) + '</small>' : '') + '</div>' +
      '<a href="account.html">' + esc(t('nav_account')) + '</a><a href="builder.html">' + esc(t('nav_builder')) + '</a><a href="pricing.html">' + esc(t('nav_pricing')) + '</a>' +
      '<button type="button" class="acct-out">' + esc(t('nav_logout')) + '</button></div></div>';
    slot.querySelector('.acct-btn').onclick = function (e) { e.stopPropagation(); slot.querySelector('.acct').classList.toggle('open'); };
    slot.querySelector('.acct-out').onclick = function () { API.signOut().then(function () { if (/account\.html/.test(location.pathname)) location.href = 'index.html'; }); };
  }
  document.addEventListener('click', function () { var a = document.querySelector('.acct.open'); if (a) a.classList.remove('open'); });
  document.addEventListener('sm:ready', renderMenu);
  document.addEventListener('sm:lang', renderMenu);
})();
