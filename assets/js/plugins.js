/* SiteMix plugin catalogue (shared by builder + generator).
 * type: 'lines' = one item per line, columns separated by " | " ; 'text' | 'url' | 'textarea' | 'datetime' | 'code' */
(function () {
  var G = ['commerce', 'content', 'contact', 'site'];
  var L = function (k, cols) { return { k: k, type: 'lines', cols: cols }; };
  var F = function (k, type, ph) { return { k: k, type: type || 'text', ph: ph || '' }; };
  var PLUGINS = [
    { id: 'shop', g: 'commerce', icon: '🛍️', hl: true },
    { id: 'variants', g: 'commerce', icon: '🎽', needs: 'shop' },
    { id: 'discount', g: 'commerce', icon: '🏷️', needs: 'shop', fields: [L('codes', ['col_code', 'col_value'])] },
    { id: 'stock', g: 'commerce', icon: '📦', needs: 'shop' },
    { id: 'paybuttons', g: 'commerce', icon: '💳', needs: 'shop' },
    { id: 'pricing', g: 'commerce', icon: '💲', fields: [L('items', ['col_plan', 'col_price', 'col_features', 'col_link'])] },
    { id: 'menu', g: 'content', icon: '🍽️', fields: [L('items', ['col_section', 'col_item', 'col_price', 'col_desc'])] },
    { id: 'video', g: 'content', icon: '▶️', fields: [{ k: 'urls', type: 'yt' }] },
    { id: 'gallery', g: 'content', icon: '🖼️', fields: [L('items', ['col_image', 'col_caption'])] },
    { id: 'slideshow', g: 'content', icon: '🎞️', fields: [L('items', ['col_title', 'col_text', 'col_image'])] },
    { id: 'testimonials', g: 'content', icon: '💬', fields: [L('items', ['col_name', 'col_quote', 'col_rating'])] },
    { id: 'faq', g: 'content', icon: '❓', fields: [L('items', ['col_question', 'col_answer'])] },
    { id: 'team', g: 'content', icon: '👥', fields: [L('items', ['col_name', 'col_role', 'col_photo'])] },
    { id: 'countdown', g: 'content', icon: '⏳', fields: [F('title'), F('date', 'datetime')] },
    { id: 'blog', g: 'content', icon: '📰', fields: [L('items', ['col_title', 'col_date', 'col_summary', 'col_link'])] },
    { id: 'events', g: 'content', icon: '📅', fields: [L('items', ['col_date', 'col_title', 'col_place', 'col_link'])] },
    { id: 'downloads', g: 'content', icon: '📎', fields: [L('items', ['col_label', 'col_url'])] },
    { id: 'contact', g: 'contact', icon: '✉️' },
    { id: 'booking', g: 'contact', icon: '🗓️' },
    { id: 'map', g: 'contact', icon: '📍', fields: [F('address')] },
    { id: 'hours', g: 'contact', icon: '🕘', fields: [L('items', ['col_day', 'col_hours'])] },
    { id: 'whatsapp', g: 'contact', icon: '🟢' },
    { id: 'messengers', g: 'contact', icon: '📲', fields: [F('telegram', 'text', 'username'), F('line', 'text', 'https://line.me/R/ti/p/@id'), F('wechat', 'text', 'WeChat ID')] },
    { id: 'social', g: 'contact', icon: '🌐', fields: [F('facebook', 'url', 'https://facebook.com/…'), F('instagram', 'url', 'https://instagram.com/…'), F('x', 'url', 'https://x.com/…'), F('youtube', 'url', 'https://youtube.com/@…'), F('tiktok', 'url', 'https://tiktok.com/@…')] },
    { id: 'newsletter', g: 'contact', icon: '📧', fields: [F('action', 'url', 'https://xxxx.us1.list-manage.com/subscribe/post?u=…&id=…'), F('fieldname', 'text', 'EMAIL')] },
    { id: 'livechat', g: 'contact', icon: '💭', fields: [F('snippet', 'code', '<script>…</script>')] },
    { id: 'announce', g: 'site', icon: '📣', fields: [F('text'), F('link', 'url')] },
    { id: 'cookie', g: 'site', icon: '🍪', fields: [F('text')] },
    { id: 'totop', g: 'site', icon: '⬆️' },
    { id: 'darkmode', g: 'site', icon: '🌙' },
    { id: 'lang', g: 'site', icon: '🌏' },
    { id: 'autotr', g: 'site', icon: '🈯' },
    { id: 'seo', g: 'site', icon: '🔎' },
    { id: 'analytics', g: 'site', icon: '📈' }
  ];

  /* Generic sample content for content plugins (zh = Traditional Chinese, en = English) */
  var SAMPLE_PC = {
    zh: {
      discount: { codes: 'WELCOME10 | 10%\nVIP50 | 50' },
      pricing: { items: '基本 | 199 | 一次服務;電話支援 | #contact\n標準 | 399 | 三次服務;優先預約;電話支援 | #contact\n尊尚 | 799 | 無限次服務;專人跟進 | #contact' },
      testimonials: { items: '陳小姐 | 服務好專業，下次再嚟！ | 5\nMr Lee | 價錢合理，準時又細心。 | 5\n黃太 | 朋友推介，果然冇介紹錯。 | 4' },
      faq: { items: '幾耐可以完成？ | 一般 1–3 個工作天。\n可以點樣付款？ | 可用 WhatsApp 落單後轉數快、PayPal 或信用卡。\n可唔可以改期？ | 可以，請提前 24 小時通知。' },
      team: { items: '陳大文 | 創辦人 | \n李嘉欣 | 營運經理 | \n黃志明 | 客戶服務 | ' },
      countdown: { title: '週年優惠倒數', date: '' },
      blog: { items: '開業一週年 | 2026-10-01 | 多謝大家支持，全店九折一星期。 | \n新品登場 | 2026-09-15 | 秋季限定新品正式推出。 | ' },
      events: { items: '2026-11-08 | 開放日 | 本店 | \n2026-12-20 | 聖誕市集 | 中環海濱 | ' },
      downloads: { items: '價目表 PDF | https://example.com/price-list.pdf' },
      hours: { items: '星期一至五 | 09:00–19:00\n星期六 | 10:00–18:00\n星期日及公眾假期 | 休息' },
      map: { address: '香港中環皇后大道中 1 號' },
      announce: { text: '🎉 開幕優惠：全單九折，輸入 WELCOME10', link: '' },
      cookie: { text: '本網站使用 Cookie 改善瀏覽體驗。' }
    },
    en: {
      discount: { codes: 'WELCOME10 | 10%\nVIP50 | 50' },
      pricing: { items: 'Basic | 199 | One visit;Phone support | #contact\nStandard | 399 | Three visits;Priority booking;Phone support | #contact\nPremium | 799 | Unlimited visits;Dedicated manager | #contact' },
      testimonials: { items: 'Sarah C. | Super professional, will come back! | 5\nMr Lee | Fair prices, on time and careful. | 5\nMrs Wong | A friend recommended them — spot on. | 4' },
      faq: { items: 'How long does it take? | Usually 1–3 working days.\nHow can I pay? | Order by WhatsApp, then pay by bank transfer, PayPal or card.\nCan I reschedule? | Yes, please tell us 24 hours ahead.' },
      team: { items: 'David Chan | Founder | \nKaren Lee | Operations | \nMichael Wong | Customer care | ' },
      countdown: { title: 'Anniversary sale ends in', date: '' },
      blog: { items: 'We turned one! | 2026-10-01 | Thanks for your support — 10% off all week. | \nNew arrivals | 2026-09-15 | Our autumn collection is here. | ' },
      events: { items: '2026-11-08 | Open day | Our store | \n2026-12-20 | Christmas market | Central Harbourfront | ' },
      downloads: { items: 'Price list (PDF) | https://example.com/price-list.pdf' },
      hours: { items: 'Mon–Fri | 09:00–19:00\nSaturday | 10:00–18:00\nSunday & holidays | Closed' },
      map: { address: '1 Queen\'s Road Central, Hong Kong' },
      announce: { text: '🎉 Opening offer: 10% off with code WELCOME10', link: '' },
      cookie: { text: 'This website uses cookies to improve your experience.' }
    }
  };
  window.SM_PLUGINS = { GROUPS: G, LIST: PLUGINS, SAMPLE_PC: SAMPLE_PC, byId: function (id) { return PLUGINS.filter(function (p) { return p.id === id; })[0]; } };
})();
