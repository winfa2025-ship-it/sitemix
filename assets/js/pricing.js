/* SiteMix pricing page — monthly billing only.
 * Payment buttons are driven by SITE_CONFIG.payments (assets/js/config.js). */
document.addEventListener('sm:ready', function () {
  var C = window.SITE_CONFIG, P = C.pricing, PAY = C.payments || {}, t = SM.t;
  var stripe = (PAY.stripe && PAY.stripe.paymentLinks) || {}, pp = PAY.paypal || {};
  var ppReady = !!(pp.clientId && pp.planIds && Object.keys(pp.planIds).some(function (k) { return pp.planIds[k]; }));
  var sdkPromise = null;

  function money(n) { return P.currency + n.toLocaleString('en-US'); }
  function loadPayPal() {
    if (sdkPromise) return sdkPromise;
    sdkPromise = new Promise(function (res, rej) {
      var s = document.createElement('script');
      s.src = 'https://www.paypal.com/sdk/js?client-id=' + encodeURIComponent(pp.clientId) + '&vault=true&intent=subscription&currency=' + encodeURIComponent(pp.currency || 'HKD');
      s.setAttribute('data-sdk-integration-source', 'button-factory');
      s.onload = function () { res(window.paypal); }; s.onerror = rej;
      document.head.appendChild(s);
    });
    return sdkPromise;
  }
  function notice(card, key) { var m = card.querySelector('.pay-msg'); m.textContent = t(key); m.classList.add('on'); }
  /* No backend + no payment keys (e.g. static GitHub Pages preview): never pretend to take payment. */
  function soon(card) {
    var m = card.querySelector('.pay-msg'); m.textContent = t('pay_soon') + ' ';
    var a = document.createElement('a'); a.href = 'signup.html?next=' + encodeURIComponent('pricing.html'); a.textContent = t('pay_soon_signup');
    a.style.cssText = 'font-weight:600;color:inherit;text-decoration:underline'; m.appendChild(a); m.classList.add('on');
  }

  function render() {
    var box = document.getElementById('plans');
    box.innerHTML = P.plans.map(function (p) {
      var paid = p.monthly > 0;
      return '<div class="plan' + (p.popular ? ' popular' : '') + '" data-plan="' + p.id + '">' + (p.popular ? '<span class="tag">' + t('pr_popular') + '</span>' : '') +
        '<h3>' + p.name + '</h3><p class="desc">' + t('plan_' + p.id + '_d') + '</p>' +
        '<div class="price">' + money(p.monthly) + ' <small>' + t('pr_mo') + '</small></div>' +
        '<div class="price-sub">' + t('pr_trial_line') + '</div>' +
        '<ul>' + p.features.map(function (f) { return '<li>' + t(f, { domain: C.platformDomain }) + '</li>'; }).join('') + '</ul>' +
        (paid
          ? '<div class="pay-btns"><button type="button" class="btn stripe block" data-pay="stripe">💳 ' + t('pr_pay_card') + '</button>' +
            '<button type="button" class="btn paypal block" data-pay="paypal">PayPal</button><div class="pp-box" id="pp-' + p.id + '"></div>' +
            '<div class="pay-msg" role="status"></div><div class="secure">🔒 ' + t('pr_secure') + '</div></div>'
          : '') +
        '</div>';
    }).join('');
  }
  /* ---- SiteMix server present: real subscriptions via Stripe Checkout / PayPal Subscriptions (or mock pages in test mode) ---- */
  var srv = null;
  function noticeText(card, txt) { var m = card.querySelector('.pay-msg'); m.textContent = txt; m.classList.add('on'); }
  function backendPay(card, id, provider, btn) {
    SMAuth.ready.then(function (u) {
      if (!u) { location.href = 'signup.html?next=' + encodeURIComponent('pricing.html'); return; }
      btn.disabled = true; noticeText(card, t('pay_redirecting'));
      SMAPI.post('/api/billing/checkout', { plan: id, provider: provider }).then(function (r) { location.href = r.url; }, function (er) {
        btn.disabled = false;
        if (er.code === 'already_subscribed') notice(card, 'pay_already');
        else if (er.code === 'payments_not_configured') notice(card, 'pay_not_configured');
        else noticeText(card, t('pay_error', { msg: er.code || er.message }));
      });
    });
  }
  function markCurrent() {
    var u = window.SMAuth && SMAuth.user(), cur = u && u.server ? u.plan : null;
    document.querySelectorAll('.plan').forEach(function (c) {
      var old = c.querySelector('.cur-tag'); if (old) old.remove();
      if (cur && c.dataset.plan === cur) { var s = document.createElement('div'); s.className = 'cur-tag pill'; s.style.cssText = 'margin:8px 0;display:inline-block'; s.textContent = t('pr_current'); c.querySelector('h3').after(s); }
    });
  }
  function banner() {
    var q = new URLSearchParams(location.search), key = q.get('welcome') ? 'pr_welcome' : q.get('checkout') === 'cancelled' ? 'pay_cancelled' : '';
    var el = document.getElementById('pr-banner');
    if (!key) { if (el) el.remove(); return; }
    if (!el) { el = document.createElement('div'); el.id = 'pr-banner'; el.className = 'hint pay'; el.style.cssText = 'max-width:760px;margin:0 auto 22px;font-size:15px;text-align:center'; var plans = document.getElementById('plans'); plans.parentNode.insertBefore(el, plans); }
    el.textContent = t(key);
  }
  if (window.SMAPI) SMAPI.available.then(function (cfg) {
    srv = cfg; if (!cfg) return;
    banner(); SMAuth.ready.then(markCurrent); SMAuth.onChange(markCurrent);
    document.addEventListener('sm:lang', function () { banner(); markCurrent(); });
  });

  document.getElementById('plans').addEventListener('click', function (e) {
    var b = e.target.closest('[data-pay]'); if (!b) return;
    var card = b.closest('.plan'), id = card.dataset.plan;
    if (srv) { backendPay(card, id, b.dataset.pay, b); return; }
    if (b.dataset.pay === 'stripe') {
      var url = stripe[id];
      if (url && /^https:\/\//.test(url)) window.open(url, '_blank', 'noopener');
      else soon(card);
      return;
    }
    // PayPal subscription via JS SDK (vault=true&intent=subscription)
    var plan = pp.planIds && pp.planIds[id];
    if (!pp.clientId || !plan) { soon(card); return; }
    b.style.display = 'none';
    loadPayPal().then(function (paypal) {
      paypal.Buttons({
        style: { shape: 'pill', color: 'gold', layout: 'vertical', label: 'subscribe' },
        createSubscription: function (data, actions) { return actions.subscription.create({ plan_id: plan }); },
        onApprove: function (data) { notice(card, 'pay_thanks'); console.log('PayPal subscription ID:', data.subscriptionID); }
      }).render('#pp-' + id);
    }).catch(function () { b.style.display = ''; notice(card, 'pay_load_error'); });
  });
  render();
  document.addEventListener('sm:lang', render);
  window.SM_PRICING = { ppReady: ppReady };
});
