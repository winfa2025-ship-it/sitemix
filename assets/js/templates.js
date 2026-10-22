/* SiteMix templates + site generator.
 * Generated site = shared semantic markup + base CSS
 *   + ONE desktop template (layout traits + style, inside @media (min-width:769px))
 *   + ONE mobile template  (layout traits + style, inside @media (max-width:768px)).
 * Any desktop template combines with any mobile template. */
(function () {
  var CATS = ['cafe', 'restaurant', 'bakery', 'fashion', 'electronics', 'beauty', 'fitness', 'clinic', 'home', 'realestate', 'travel', 'hotel',
    'education', 'photo', 'designer', 'corporate', 'saas', 'blog', 'wedding', 'ngo', 'music', 'law', 'car', 'pet'];
  var STYLES = ['minimal', 'bold', 'luxury', 'playful', 'dark', 'retro', 'classic', 'modern'];

  var FONTS = {
    sans: 'system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans","Noto Sans TC",sans-serif',
    serif: 'Georgia,"Noto Serif","Noto Serif TC","Times New Roman",serif',
    display: '"Playfair Display","Noto Serif Display",Didot,"Bodoni 72","Noto Serif TC",Georgia,serif',
    round: '"Nunito","Varela Round","M PLUS Rounded 1c",ui-rounded,"Noto Sans TC",system-ui,sans-serif',
    cond: '"Oswald","Bebas Neue","Arial Narrow",Impact,"Noto Sans TC",sans-serif',
    mono: '"JetBrains Mono","IBM Plex Mono",ui-monospace,Menlo,Consolas,"Noto Sans TC",monospace'
  };

  /* Desktop layout traits */
  var DT = {
    'H-split': '.nav{justify-content:center}',
    'H-center': '.hd-in{flex-wrap:wrap;justify-content:center;padding-top:16px}.logo{width:100%;justify-content:center;font-size:26px}.nav{flex:none;width:100%;justify-content:center;order:3;padding:6px 0 10px}.hd-tools{position:absolute;inset-inline-end:0;top:14px}',
    'H-trans': '.hd{position:fixed;left:0;right:0;background:transparent;border-color:transparent;color:#fff;transition:background .3s,color .3s}body.scrolled .hd{background:var(--bg);color:var(--fg);border-color:var(--line);box-shadow:0 4px 20px rgba(0,0,0,.08)}.hd .lang-sel,.hd .cart-btn,.hd .dm-btn{background:rgba(255,255,255,.15);color:inherit;border-color:rgba(255,255,255,.35)}.hd .lang-sel option{color:#111}.hero{padding-top:150px!important}.ann+.hd{top:auto}',
    'H-side': 'body{padding-inline-start:260px}.hd{position:fixed;top:0;bottom:0;inset-inline-start:0;width:260px;border:0;border-inline-end:1px solid var(--line)}.hd .hd-in{flex-direction:column;align-items:flex-start;height:100%;padding:34px 26px;width:auto;margin:0;gap:22px}.nav{flex-direction:column;flex:none;justify-content:flex-start}.nav a{padding:6px 0}.hd-tools{margin-top:auto;flex-wrap:wrap}.logo{font-size:22px}',
    'H-pill': '.hd{background:transparent;border:0;padding-top:14px}.hd-in{background:var(--card);border:1px solid var(--line);border-radius:999px;padding:0 10px 0 18px;box-shadow:0 12px 30px -14px rgba(0,0,0,.25);min-height:60px}',
    'H-bar': '.hd{background:var(--p);color:#fff;border:0}.logo-mark{background:#fff;color:var(--p)}.hd .lang-sel,.hd .cart-btn,.hd .dm-btn{background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.35)}.hd .lang-sel option{color:#111}',
    'R-split': '',
    'R-rev': '.hero-in{grid-template-columns:.85fr 1.15fr}.hero-art{order:-1}',
    'R-center': '.hero{text-align:center}.hero-in{grid-template-columns:1fr}.hero-art{display:none}.lead{margin-inline:auto;max-width:720px}.hero-btns{justify-content:center}',
    'R-full': '.hero{position:relative;min-height:640px;display:flex;align-items:center;color:#fff;overflow:hidden}.hero-in{grid-template-columns:1fr;position:static}.hero-art{position:absolute;inset:0;border-radius:0;aspect-ratio:auto;font-size:340px;box-shadow:none;background:linear-gradient(135deg,color-mix(in srgb,var(--p) 85%,#000),color-mix(in srgb,var(--a) 65%,#000))}.hero-art span{opacity:.22;transform:rotate(-12deg)}.hero-text{position:relative;z-index:1;max-width:760px}.eyebrow{color:#fff;opacity:.85}.hero .btn.ghost{color:#fff}',
    'R-type': '.hero-in{grid-template-columns:1fr}.hero h1{font-size:clamp(64px,9vw,128px);letter-spacing:-.045em;line-height:.92;margin-bottom:28px}.hero-art{display:none}.lead{max-width:640px}',
    'R-card': '.hero{background:linear-gradient(135deg,var(--p),var(--a));padding:90px 0 110px}.hero-text{background:var(--card);color:var(--fg);padding:46px;border-radius:var(--r);box-shadow:0 30px 60px -20px rgba(0,0,0,.35)}.hero-art{background:rgba(255,255,255,.16);box-shadow:none}',
    'R-banner': '.hero-in{grid-template-columns:1fr;gap:34px}.hero-art{aspect-ratio:21/7;border-radius:var(--r);font-size:130px}',
    'C-4': '.cards{grid-template-columns:repeat(4,1fr)}',
    'C-list': '.cards{grid-template-columns:1fr;gap:0;counter-reset:c}.card{display:grid;grid-template-columns:90px 1fr;column-gap:20px;align-items:baseline;border:0;border-bottom:1px solid var(--line);border-radius:0;background:transparent;padding:26px 0}.card::before{counter-increment:c;content:"0" counter(c);font-size:36px;font-weight:800;color:var(--a);grid-row:span 2}',
    'C-zig': '.cards{grid-template-columns:1fr;gap:0}.card{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;padding:40px 0;border:0;border-radius:0;background:transparent;border-bottom:1px solid var(--line)}.card h3{font-size:30px}.card:nth-child(even) h3{order:2}',
    'C-retro': '.card,.prod,.tst,.price-card{border:3px solid var(--fg)!important;box-shadow:7px 7px 0 var(--fg);border-radius:0!important}',
    'C-glass': '.card{background:rgba(255,255,255,.05);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.12)}',
    'C-icon': '.card::before{content:"✦";display:grid;place-items:center;width:46px;height:46px;border-radius:14px;background:color-mix(in srgb,var(--p) 14%,transparent);color:var(--p);margin-bottom:14px;font-size:20px}',
    'C-shadow': '.card{box-shadow:0 14px 34px -16px rgba(15,23,42,.25);border:0}.card h3{color:var(--p)}',
    'S-center': '.sec h2,.sec .sub{text-align:center}.chips{justify-content:center}.about{margin-inline:auto;text-align:center}',
    'S-side': '.sec>.wrap{display:grid;grid-template-columns:240px 1fr;column-gap:48px}.sec>.wrap>h2{grid-row:1/span 9;position:sticky;top:100px;align-self:start;font-size:28px}.sec>.wrap>*:not(h2){grid-column:2}',
    'S-num': 'body{counter-reset:s}.sec h2::before{counter-increment:s;content:counter(s,decimal-leading-zero) " — ";color:var(--a);font-size:.55em;vertical-align:middle;letter-spacing:.1em}',
    'S-divider': '.sec+.sec{border-top:1px solid var(--line)}.sec.alt{background:transparent}',
    'S-upper': '.sec h2{text-transform:uppercase;letter-spacing:.14em;font-size:22px}.eyebrow{letter-spacing:.3em}',
    'P-2': ':root{--pcols:2}', 'P-3': ':root{--pcols:3}', 'P-4': ':root{--pcols:4}',
    'P-list': ':root{--pcols:2}.prod{flex-direction:row}.pimg{width:42%;aspect-ratio:auto;min-height:190px}',
    'P-tall': '.pimg{aspect-ratio:3/4}',
    'P-round': '.prod{border:0;background:transparent;text-align:center}.pimg{border-radius:50%;width:78%;margin:12px auto 0;aspect-ratio:1}.prow{justify-content:center}',
    'W-narrow': '.wrap{width:min(880px,100% - 40px)}'
  };

  /* Mobile layout traits */
  var MT = {
    'MH-burger': '',
    'MH-chips': '.hd-in{flex-wrap:wrap;min-height:auto;padding-top:10px}.hd-tools{margin-inline-start:auto}.burger{display:none!important}.nav{display:flex;position:static;flex-direction:row;overflow-x:auto;padding:8px 0 10px;border:0;background:transparent;order:5;width:100%;justify-content:flex-start;box-shadow:none}.nav a{background:var(--card);border:1px solid var(--line);border-radius:99px;white-space:nowrap;font-size:14px;padding:6px 12px}',
    'MH-tabs': '.burger{display:none!important}.nav{display:flex;position:fixed;top:auto;bottom:0;left:0;right:0;flex-direction:row;overflow-x:auto;padding:6px 4px calc(6px + env(safe-area-inset-bottom));background:var(--card);color:var(--fg);border-top:1px solid var(--line);z-index:35;box-shadow:0 -6px 20px rgba(0,0,0,.07)}.nav a{font-size:12px;padding:8px 10px;white-space:nowrap;flex:1;text-align:center}body{padding-bottom:62px}.wa-float,.msgr,.to-top{bottom:76px!important}.callbar{bottom:56px}',
    'MH-full': '.nav.open{position:fixed;inset:0;background:var(--p);color:#fff;justify-content:center;align-items:center;font-size:24px;gap:10px;z-index:45;border:0}.burger{position:relative;z-index:46}.nav.open~.hd-tools .burger,.hd-tools .burger{z-index:46}',
    'MH-center': '.hd-in{justify-content:space-between}.logo{order:2;flex:1;justify-content:center}.hd-tools{order:3}.lang-sel{display:none}',
    'MH-bar': '.hd{background:var(--p);color:#fff;border:0}.logo-mark{background:#fff;color:var(--p)}.burger{color:#fff;border-color:rgba(255,255,255,.4);background:transparent}.hd .lang-sel,.hd .cart-btn,.hd .dm-btn{background:rgba(255,255,255,.14);color:#fff;border-color:rgba(255,255,255,.35)}.hd .lang-sel option{color:#111}',
    'MR-stack': '',
    'MR-round': '.hero{text-align:center}.hero-art{border-radius:50%;width:62%;margin:0 auto;order:-1}.hero-btns{justify-content:center}',
    'MR-compact': '.hero{padding:22px 0}.hero-in{grid-template-columns:1fr 90px;gap:14px}.hero h1{font-size:26px;margin-bottom:6px}.lead{font-size:15px;margin-bottom:12px}.hero-art{border-radius:16px;font-size:44px;box-shadow:none}.hero .btn{padding:9px 14px;font-size:14px}',
    'MR-full': '.hero{position:relative;min-height:78vh;display:flex;align-items:flex-end;color:#fff;overflow:hidden;padding-bottom:40px}.hero-in{position:static}.hero-art{position:absolute;inset:0;border-radius:0;aspect-ratio:auto;font-size:200px;box-shadow:none;background:linear-gradient(160deg,color-mix(in srgb,var(--p) 80%,#000),color-mix(in srgb,var(--a) 60%,#000))}.hero-art span{opacity:.25}.hero-text{position:relative;z-index:1}.eyebrow{color:#fff}.hero .btn.ghost{color:#fff}',
    'MR-type': '.hero-art{display:none}.hero h1{font-size:52px;line-height:.95;letter-spacing:-.03em}',
    'MR-card': '.hero{background:linear-gradient(160deg,var(--p),var(--a));padding:26px 0 30px}.hero-text{background:var(--card);color:var(--fg);padding:24px;border-radius:var(--r);box-shadow:0 20px 40px -20px rgba(0,0,0,.4)}.hero-art{display:none}',
    'MR-center': '.hero{text-align:center}.hero-art{display:none}.hero-btns{justify-content:center}',
    'MP-1': ':root{--mpcols:1}', 'MP-2': ':root{--mpcols:2}.pdesc{display:none}.pbody{padding:10px}.pname{font-size:14px}.price{font-size:15px}.add{width:100%;justify-content:center}',
    'MP-scroll': '.products{display:flex!important;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px}.prod{flex:0 0 74%;scroll-snap-align:start}',
    'MP-list': ':root{--mpcols:1}.prod{flex-direction:row}.pimg{width:112px;aspect-ratio:1;flex:none;font-size:36px}.pbody{padding:10px 12px}.pdesc{font-size:13px}',
    'MC-scroll': '.cards{display:flex!important;overflow-x:auto;scroll-snap-type:x mandatory}.card{flex:0 0 78%;scroll-snap-align:start}',
    'MC-2': '.cards{grid-template-columns:1fr 1fr!important}.card{padding:14px}.card p{font-size:13px}',
    'MC-list': '.card{border:0;border-bottom:1px solid var(--line);border-radius:0;padding:16px 0;background:transparent}',
    'MC-retro': '.card,.prod,.tst,.price-card{border:3px solid var(--fg)!important;box-shadow:5px 5px 0 var(--fg);border-radius:0!important}',
    'M-callbar': 'body{padding-bottom:72px}.callbar{display:flex}.wa-float,.msgr,.to-top{bottom:84px!important}',
    'MS-center': '.sec h2,.sec .sub{text-align:center}.about{text-align:center}',
    'MS-upper': '.sec h2{text-transform:uppercase;letter-spacing:.12em;font-size:20px}'
  };
  /* theme presets: bg, fg, mu, card, line, alt */
  var TH = {
    cream: ['#fff8f0', '#3b2412', '#8a6a50', '#ffffff', '#f1e4d3', '#fdeedd'],
    white: ['#ffffff', '#0f172a', '#64748b', '#ffffff', '#e5e7eb', '#f6f8fb'],
    paper: ['#fbfaf7', '#26221c', '#7a7265', '#ffffff', '#e8e4da', '#f3efe6'],
    stone: ['#f6f5f2', '#161616', '#6b6b6b', '#ffffff', '#e5e3de', '#eeece7'],
    ink: ['#0e0e10', '#f4f4f5', '#a1a1aa', '#18181b', '#27272a', '#131316'],
    navy: ['#0b1020', '#e6e9f5', '#94a0bf', '#121a33', '#1f2a4a', '#0e1530'],
    noir: ['#14110f', '#f5efe6', '#b5a99a', '#1d1916', '#2e2823', '#1a1613'],
    blush: ['#fff6f6', '#3a1f25', '#9a7680', '#ffffff', '#f5dfe2', '#fdeef0'],
    mint: ['#f4fbf9', '#0f2a26', '#5f7d77', '#ffffff', '#d9efe9', '#e8f6f2'],
    sky: ['#f5f9ff', '#0c1b33', '#5b6b85', '#ffffff', '#dde7f5', '#eaf2fd'],
    sun: ['#fffbea', '#2a2205', '#7d6f3b', '#ffffff', '#f2e7b6', '#fff3c4'],
    black: ['#000000', '#ffffff', '#a3a3a3', '#0d0d0d', '#262626', '#0a0a0a']
  };
  function T(id, cat, name, style, sw, traits, theme, font, hfont, r, extra) { return { id: id, cat: cat, name: name, style: style, sw: sw, traits: traits, theme: theme, font: font, hfont: hfont || font, r: r, css: extra || '' }; }

  var DESKTOP = [
    T('d-cafe', 'cafe', 'Latte', 'playful', '#c2410c', ['H-pill', 'R-split', 'C-icon', 'S-center', 'P-3'], 'cream', 'round', 'round', 24, '.hero-art{border-radius:50%}'),
    T('d-restaurant', 'restaurant', 'Bistro', 'luxury', '#b8860b', ['H-trans', 'R-full', 'C-list', 'S-center', 'P-list'], 'noir', 'serif', 'display', 2, '.sec h2{font-style:italic;font-weight:400;font-size:44px}.btn{border-radius:0;letter-spacing:.12em;text-transform:uppercase;font-size:13px}'),
    T('d-bakery', 'bakery', 'Crumb', 'retro', '#d97706', ['H-center', 'R-rev', 'C-retro', 'S-num', 'P-3'], 'sun', 'serif', 'cond', 0, '.hero-art{border:3px solid var(--fg);box-shadow:10px 10px 0 var(--fg)}.btn{border:2px solid var(--fg);box-shadow:4px 4px 0 var(--fg)}'),
    T('d-fashion', 'fashion', 'Vogue', 'minimal', '#111111', ['H-split', 'R-type', 'C-zig', 'S-upper', 'P-4', 'P-tall'], 'white', 'sans', 'display', 0, '.hero h1{font-weight:400}.logo{letter-spacing:.35em;text-transform:uppercase}.btn{border-radius:0}.prod{border:0}.pbody{padding:12px 0}'),
    T('d-electronics', 'electronics', 'Volt', 'dark', '#22d3ee', ['H-bar', 'R-split', 'C-4', 'C-glass', 'S-divider', 'P-4'], 'navy', 'sans', 'mono', 12, '.hero-art{box-shadow:0 0 90px -10px var(--a)}.price{color:var(--a)}'),
    T('d-beauty', 'beauty', 'Blush', 'luxury', '#db2777', ['H-center', 'R-card', 'S-center', 'P-round', 'P-3'], 'blush', 'sans', 'display', 28, '.hero h1{font-style:italic;font-weight:500}'),
    T('d-fitness', 'fitness', 'Pulse', 'bold', '#a3e635', ['H-trans', 'R-full', 'C-4', 'S-upper', 'P-3'], 'black', 'sans', 'cond', 4, '.hero h1{text-transform:uppercase;font-size:96px;line-height:.9}.btn{text-transform:uppercase;letter-spacing:.08em;color:#000}.hero-art{background:linear-gradient(120deg,#111,#000)}.hero-art span{opacity:.15}'),
    T('d-clinic', 'clinic', 'Care', 'minimal', '#0d9488', ['H-split', 'R-split', 'C-icon', 'S-side', 'P-list'], 'mint', 'sans', 'sans', 16, ''),
    T('d-home', 'home', 'Fixit', 'bold', '#0f766e', ['H-bar', 'R-center', 'C-list', 'S-divider', 'P-3'], 'white', 'sans', 'sans', 8, '.hero{background:linear-gradient(120deg,var(--p),color-mix(in srgb,var(--p) 55%,#000));color:#fff;padding:110px 0}.hero .btn{background:var(--a)}.hero .btn.ghost{background:transparent}.eyebrow{color:#fff}'),
    T('d-realestate', 'realestate', 'Estate', 'luxury', '#1e3a5f', ['H-pill', 'R-banner', 'C-zig', 'S-side', 'P-3', 'P-tall'], 'stone', 'sans', 'serif', 6, '.hero h1{font-weight:400}'),
    T('d-travel', 'travel', 'Wander', 'playful', '#0284c7', ['H-trans', 'R-full', 'C-shadow', 'S-center', 'P-3', 'P-tall'], 'sky', 'round', 'round', 26, '.hero-art{background:linear-gradient(180deg,#0ea5e9,#22c55e 140%)}'),
    T('d-hotel', 'hotel', 'Haven', 'luxury', '#8b5e34', ['H-center', 'R-full', 'C-zig', 'S-num', 'P-list'], 'paper', 'serif', 'display', 0, '.btn{border-radius:0}'),
    T('d-education', 'education', 'Campus', 'playful', '#4f46e5', ['H-split', 'R-card', 'C-4', 'C-icon', 'S-center', 'P-3'], 'white', 'round', 'round', 18, ''),
    T('d-photo', 'photo', 'Lens', 'dark', '#a78bfa', ['H-side', 'R-type', 'C-list', 'S-divider', 'P-2', 'P-tall'], 'ink', 'sans', 'serif', 2, '.hero h1{font-style:italic;font-weight:400}'),
    T('d-designer', 'designer', 'Studio', 'minimal', '#ff4d00', ['H-split', 'R-type', 'C-zig', 'S-num', 'P-2'], 'stone', 'mono', 'sans', 0, '.hero h1{font-weight:900}.btn{border-radius:0}'),
    T('d-corporate', 'corporate', 'Summit', 'classic', '#1d4ed8', ['H-split', 'R-split', 'C-shadow', 'P-3'], 'white', 'sans', 'sans', 10, '.hero{background:linear-gradient(135deg,color-mix(in srgb,var(--p) 10%,#fff),color-mix(in srgb,var(--a) 16%,#fff))}.hero-art{border-radius:20px;aspect-ratio:4/3}'),
    T('d-saas', 'saas', 'Launch', 'modern', '#7c3aed', ['H-pill', 'R-center', 'C-4', 'C-icon', 'S-center', 'P-3'], 'white', 'sans', 'sans', 14, '.hero{background:radial-gradient(900px 400px at 50% 0%,color-mix(in srgb,var(--p) 22%,transparent),transparent 70%)}.hero h1{font-size:68px;letter-spacing:-.04em}.hero-art{display:grid!important;aspect-ratio:21/8;width:100%;margin-top:40px;border-radius:20px;font-size:110px}.hero-in{grid-template-columns:1fr}'),
    T('d-blog', 'blog', 'Journal', 'classic', '#9a3412', ['H-center', 'R-center', 'C-list', 'S-divider', 'P-2', 'W-narrow'], 'paper', 'serif', 'serif', 6, ''),
    T('d-wedding', 'wedding', 'Vows', 'luxury', '#b48a78', ['H-center', 'R-full', 'S-center', 'P-round', 'P-3'], 'blush', 'serif', 'display', 30, '.hero-art{background:linear-gradient(135deg,#d6b4a7,#8d6e63)}.hero h1{font-style:italic;font-weight:400;font-size:84px}'),
    T('d-ngo', 'ngo', 'Hope', 'bold', '#16a34a', ['H-bar', 'R-rev', 'C-4', 'S-upper', 'P-3'], 'white', 'sans', 'cond', 10, '.card h3{font-size:30px;color:var(--p)}'),
    T('d-music', 'music', 'Amp', 'retro', '#f43f5e', ['H-trans', 'R-full', 'C-list', 'S-num', 'P-list'], 'black', 'mono', 'cond', 0, '.hero h1{text-transform:uppercase;font-size:110px;line-height:.85}.hero-art{background:repeating-linear-gradient(45deg,#111 0 20px,#1a1a1a 20px 40px)}.hero-art span{opacity:.4}'),
    T('d-law', 'law', 'Counsel', 'classic', '#1e293b', ['H-split', 'R-split', 'C-list', 'S-side', 'P-list'], 'paper', 'serif', 'serif', 2, '.hd{border-top:6px solid var(--a)}.hero-art{aspect-ratio:4/5;border-radius:2px}'),
    T('d-car', 'car', 'Torque', 'bold', '#dc2626', ['H-bar', 'R-full', 'C-retro', 'S-upper', 'P-4'], 'stone', 'sans', 'cond', 0, '.hero-art{background:linear-gradient(115deg,#111 55%,var(--p) 55%)}.hero h1{text-transform:uppercase;font-size:90px;font-style:italic}'),
    T('d-pet', 'pet', 'Paws', 'playful', '#f97316', ['H-pill', 'R-rev', 'C-icon', 'S-center', 'P-3'], 'sun', 'round', 'round', 30, '.hero-art{border-radius:42% 58% 63% 37% / 41% 44% 56% 59%}.card{border-radius:28px}')
  ];

  var MOBILE = [
    T('m-cafe', 'cafe', 'Bubble', 'playful', '#fb923c', ['MH-chips', 'MR-round', 'MP-2', 'MS-center'], 'cream', 'round', 'round', 20),
    T('m-restaurant', 'restaurant', 'Supper', 'luxury', '#b8860b', ['MH-full', 'MR-full', 'MP-list', 'MC-list', 'M-callbar'], 'noir', 'serif', 'display', 2, '.sec h2{font-style:italic;font-weight:400}'),
    T('m-bakery', 'bakery', 'Dough', 'retro', '#d97706', ['MH-center', 'MR-stack', 'MC-retro', 'MP-2'], 'sun', 'serif', 'cond', 0),
    T('m-fashion', 'fashion', 'Runway', 'minimal', '#111111', ['MH-tabs', 'MR-type', 'MP-scroll', 'MS-upper'], 'white', 'sans', 'display', 0, '.pimg{aspect-ratio:3/4}.logo{letter-spacing:.3em;text-transform:uppercase}'),
    T('m-electronics', 'electronics', 'Circuit', 'dark', '#22d3ee', ['MH-bar', 'MR-compact', 'MP-2', 'MC-2'], 'navy', 'sans', 'mono', 12),
    T('m-beauty', 'beauty', 'Glow', 'luxury', '#db2777', ['MH-center', 'MR-card', 'MP-scroll', 'MS-center', 'M-callbar'], 'blush', 'sans', 'display', 24),
    T('m-fitness', 'fitness', 'Rep', 'bold', '#a3e635', ['MH-tabs', 'MR-full', 'MC-scroll', 'MS-upper'], 'black', 'sans', 'cond', 4, '.hero h1{text-transform:uppercase}.btn{color:#000}'),
    T('m-clinic', 'clinic', 'Vital', 'minimal', '#0d9488', ['MH-burger', 'MR-center', 'MC-list', 'MP-list', 'M-callbar'], 'mint', 'sans', 'sans', 14),
    T('m-home', 'home', 'Handy', 'bold', '#0f766e', ['MH-bar', 'MR-center', 'MP-1', 'M-callbar'], 'white', 'sans', 'sans', 10, '.hero{background:var(--p);color:#fff}.hero .btn{background:var(--a)}.hero .btn.ghost{background:transparent}.eyebrow{color:#fff}.card{border-inline-start:4px solid var(--a)}'),
    T('m-realestate', 'realestate', 'Key', 'luxury', '#1e3a5f', ['MH-full', 'MR-stack', 'MP-scroll', 'MC-list'], 'stone', 'sans', 'serif', 6, '.hero-art{aspect-ratio:16/10;border-radius:6px}'),
    T('m-travel', 'travel', 'Trip', 'playful', '#0284c7', ['MH-chips', 'MR-full', 'MC-scroll', 'MP-scroll'], 'sky', 'round', 'round', 22),
    T('m-hotel', 'hotel', 'Stay', 'luxury', '#8b5e34', ['MH-center', 'MR-full', 'MP-list', 'M-callbar'], 'paper', 'serif', 'display', 0),
    T('m-education', 'education', 'Class', 'playful', '#4f46e5', ['MH-tabs', 'MR-card', 'MC-2', 'MP-1'], 'white', 'round', 'round', 16),
    T('m-photo', 'photo', 'Frame', 'dark', '#a78bfa', ['MH-full', 'MR-type', 'MP-2', 'MC-list'], 'ink', 'sans', 'serif', 2, '.hero h1{font-style:italic;font-weight:400}'),
    T('m-designer', 'designer', 'Grid', 'minimal', '#ff4d00', ['MH-burger', 'MR-type', 'MC-list', 'MP-1'], 'stone', 'mono', 'sans', 0, '.hero h1{font-weight:900}'),
    T('m-corporate', 'corporate', 'Pro', 'classic', '#1d4ed8', ['MH-burger', 'MR-stack', 'MP-1'], 'white', 'sans', 'sans', 10, '.hero{background:linear-gradient(160deg,color-mix(in srgb,var(--p) 12%,#fff),#fff)}.hero-art{aspect-ratio:16/9;border-radius:16px}.card{box-shadow:0 8px 24px -12px rgba(15,23,42,.2);border:0}'),
    T('m-saas', 'saas', 'Orbit', 'modern', '#7c3aed', ['MH-center', 'MR-center', 'MC-scroll', 'MP-1'], 'white', 'sans', 'sans', 14, '.hero{background:radial-gradient(500px 300px at 50% 0%,color-mix(in srgb,var(--p) 22%,transparent),transparent 70%)}'),
    T('m-blog', 'blog', 'Story', 'classic', '#ea580c', ['MH-burger', 'MR-round', 'MC-list', 'MP-list'], 'paper', 'serif', 'serif', 6, '.hero-art{width:84px;height:84px;font-size:42px;aspect-ratio:auto}'),
    T('m-wedding', 'wedding', 'Bloom', 'luxury', '#b48a78', ['MH-center', 'MR-full', 'MS-center', 'MP-2'], 'blush', 'serif', 'display', 26, '.hero-art{background:linear-gradient(160deg,#d6b4a7,#8d6e63)}.hero h1{font-style:italic;font-weight:400}'),
    T('m-ngo', 'ngo', 'Unite', 'bold', '#16a34a', ['MH-bar', 'MR-stack', 'MC-2', 'MS-upper', 'M-callbar'], 'white', 'sans', 'cond', 10),
    T('m-music', 'music', 'Riff', 'retro', '#f43f5e', ['MH-tabs', 'MR-full', 'MC-list', 'MP-list'], 'black', 'mono', 'cond', 0, '.hero h1{text-transform:uppercase;font-size:60px;line-height:.9}'),
    T('m-law', 'law', 'Brief', 'classic', '#1e293b', ['MH-burger', 'MR-center', 'MC-list', 'M-callbar'], 'paper', 'serif', 'serif', 2, '.hd{border-top:5px solid var(--a)}'),
    T('m-car', 'car', 'Garage', 'bold', '#dc2626', ['MH-bar', 'MR-full', 'MC-retro', 'MP-2', 'M-callbar'], 'stone', 'sans', 'cond', 0, '.hero h1{text-transform:uppercase;font-style:italic}'),
    T('m-pet', 'pet', 'Wag', 'playful', '#f97316', ['MH-chips', 'MR-round', 'MP-2', 'MC-scroll'], 'sun', 'round', 'round', 26, '.hero-art{border-radius:42% 58% 63% 37% / 41% 44% 56% 59%}')
  ];

  function tplCss(t, traitMap) {
    var th = TH[t.theme] || TH.white;
    var css = ':root{--bg:' + th[0] + ';--fg:' + th[1] + ';--mu:' + th[2] + ';--card:' + th[3] + ';--line:' + th[4] + ';--alt:' + th[5] + ';--r:' + t.r + 'px;--font:' + FONTS[t.font] + ';--hfont:' + FONTS[t.hfont] + '}';
    t.traits.forEach(function (k) { css += traitMap[k] || ''; });
    return css + (t.css || '');
  }
  /* ===================================================================
   * Generated variations — 24 hand-tuned desktop + 24 hand-tuned mobile
   * templates above; the rest are deterministic, curated combinations of the
   * layout building blocks (header × hero × cards × sections × products …)
   * with theme, font pairing, corner radius and accent colour, each with a
   * UNIQUE layout signature. Seeded, so ids are stable between releases.
   * =================================================================== */
  TH.sand = ['#faf6ef', '#2b2419', '#857a68', '#ffffff', '#ebe3d4', '#f3ecdf'];
  TH.forest = ['#0f1a14', '#e8f1ea', '#9db3a4', '#16241c', '#243a2d', '#132019'];
  TH.plum = ['#1a1020', '#f3e8f7', '#b9a3c4', '#24172c', '#3a2745', '#20132a'];
  TH.slate = ['#111827', '#f3f4f6', '#9ca3af', '#1f2937', '#374151', '#151e2e'];
  TH.peach = ['#fff5ef', '#3a2218', '#93705f', '#ffffff', '#f6dccd', '#ffece1'];
  TH.lilac = ['#f8f5ff', '#24193d', '#7c6f99', '#ffffff', '#e6defa', '#f0eafe'];
  TH.ocean = ['#f2f9fb', '#0b2a36', '#5a7c88', '#ffffff', '#d4e9ef', '#e4f3f7'];
  TH.olive = ['#f7f7ef', '#23260f', '#7a7d5c', '#ffffff', '#e3e4cc', '#eeefdd'];

  var VAR = {
    minimal: { th: ['white', 'stone', 'paper', 'sand', 'ocean'], f: [['sans', 'sans'], ['sans', 'display'], ['mono', 'sans'], ['sans', 'serif']], r: [0, 2, 4, 6, 8], c: ['#111111', '#0f766e', '#2563eb', '#ff4d00', '#334155', '#be123c'] },
    bold: { th: ['white', 'black', 'stone', 'sun', 'slate'], f: [['sans', 'cond'], ['round', 'cond'], ['sans', 'sans']], r: [0, 4, 8, 10], c: ['#dc2626', '#a3e635', '#f59e0b', '#2563eb', '#16a34a', '#e11d48', '#7c3aed'] },
    luxury: { th: ['noir', 'paper', 'blush', 'stone', 'plum', 'sand'], f: [['serif', 'display'], ['sans', 'display'], ['sans', 'serif']], r: [0, 2, 4], c: ['#b8860b', '#8b5e34', '#b48a78', '#1e3a5f', '#7c2d12', '#4c1d95'] },
    playful: { th: ['cream', 'sun', 'sky', 'mint', 'blush', 'peach', 'lilac'], f: [['round', 'round'], ['sans', 'round']], r: [18, 22, 26, 30], c: ['#f97316', '#0284c7', '#db2777', '#4f46e5', '#16a34a', '#e11d48', '#0d9488'] },
    dark: { th: ['ink', 'navy', 'black', 'noir', 'forest', 'plum', 'slate'], f: [['sans', 'mono'], ['sans', 'sans'], ['sans', 'serif'], ['mono', 'cond']], r: [8, 12, 16], c: ['#22d3ee', '#a78bfa', '#f43f5e', '#a3e635', '#fbbf24', '#34d399'] },
    retro: { th: ['sun', 'cream', 'paper', 'peach', 'olive'], f: [['serif', 'cond'], ['mono', 'cond'], ['mono', 'mono']], r: [0, 0, 4], c: ['#d97706', '#f43f5e', '#0f766e', '#b45309', '#1d4ed8'] },
    classic: { th: ['paper', 'white', 'stone', 'sand', 'olive'], f: [['serif', 'serif'], ['sans', 'serif']], r: [2, 4, 6, 8], c: ['#1e293b', '#9a3412', '#1d4ed8', '#14532d', '#7f1d1d'] },
    modern: { th: ['white', 'sky', 'mint', 'ink', 'lilac', 'ocean', 'slate'], f: [['sans', 'sans'], ['sans', 'mono'], ['round', 'sans']], r: [12, 14, 16, 20], c: ['#7c3aed', '#2563eb', '#0891b2', '#db2777', '#059669', '#ea580c'] }
  };
  var DARKS = ['ink', 'navy', 'black', 'noir', 'forest', 'plum', 'slate'];
  var W1 = ['Nova', 'Aria', 'Cobalt', 'Maple', 'Ember', 'Lumen', 'Harbor', 'Sora', 'Juniper', 'Atlas', 'Velvet', 'Pixel', 'Sage', 'Coral', 'Onyx', 'Willow', 'Quartz', 'Breeze', 'Saffron', 'Indigo',
    'Cedar', 'Echo', 'Fable', 'Orchid', 'Granite', 'Mango', 'Ripple', 'Slate', 'Tide', 'Zest', 'Amber', 'Basil', 'Clover', 'Dune', 'Fjord', 'Ginger', 'Hazel', 'Iris', 'Jade', 'Kite'];
  var W2 = ['Line', 'Studio', 'Grid', 'Wave', 'Bloom', 'Frame', 'Loft', 'Arc', 'Edge', 'Field', 'Glow', 'House', 'Lane', 'Mode', 'Note', 'Peak', 'Press', 'Shift', 'Square', 'Yard'];
  function rng(seed) { var s = seed >>> 0; return function () { s = (s + 0x6D2B79F5) >>> 0; var t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function pick(r, a) { return a[Math.floor(r() * a.length)]; }
  var usedNames = {};
  DESKTOP.concat(MOBILE).forEach(function (t) { usedNames[t.name] = 1; });
  function vname(r) { for (var i = 0; i < 200; i++) { var n = pick(r, W1) + ' ' + pick(r, W2); if (!usedNames[n]) { usedNames[n] = 1; return n; } } return 'Mix ' + Math.floor(r() * 1e6); }

  function genDesktop(total) {
    var r = rng(20261022), seen = {}, n = 0, guard = 0;
    DESKTOP.forEach(function (t) { seen[t.traits.slice().sort().join('+')] = 1; });
    while (DESKTOP.length < total && guard++ < 200000) {
      var style = STYLES[(n % CATS.length + Math.floor(n / CATS.length)) % STYLES.length], v = VAR[style];
      var hero = pick(r, ['R-split', 'R-rev', 'R-center', 'R-full', 'R-type', 'R-card', 'R-banner']);
      var head = pick(r, hero === 'R-full' ? ['H-trans', 'H-split', 'H-center', 'H-pill', 'H-bar', 'H-side'] : ['H-split', 'H-center', 'H-pill', 'H-bar', 'H-side']);
      var theme = pick(r, v.th), dark = DARKS.indexOf(theme) >= 0;
      var cards = pick(r, ['', 'C-4', 'C-list', 'C-zig', 'C-icon', 'C-shadow', style === 'retro' ? 'C-retro' : 'C-icon', dark ? 'C-glass' : 'C-shadow']);
      var secs = pick(r, ['', 'S-center', 'S-side', 'S-num', 'S-divider', 'S-upper']);
      if (head === 'H-side' && secs === 'S-side') secs = 'S-divider';
      var prods = pick(r, ['P-2', 'P-3', 'P-3', 'P-4', 'P-list']);
      var mod = pick(r, ['', '', 'P-tall', prods === 'P-list' ? '' : 'P-round']);
      var traits = [head, hero].concat(cards ? [cards] : [], secs ? [secs] : [], [prods], mod ? [mod] : [], (style === 'classic' || style === 'minimal') && r() < .25 ? ['W-narrow'] : []);
      var sig = traits.slice().sort().join('+');
      if (seen[sig]) continue; seen[sig] = 1;
      var f = pick(r, v.f), cat = CATS[n % CATS.length]; n++;
      var extra = '';
      if (style === 'bold' || style === 'retro') extra += '.hero h1{text-transform:uppercase}';
      if (style === 'luxury') extra += '.hero h1{font-weight:400}.btn{border-radius:0;letter-spacing:.1em;text-transform:uppercase;font-size:13px}';
      if (style === 'retro') extra += '.btn{border:2px solid var(--fg);box-shadow:4px 4px 0 var(--fg)}';
      if (style === 'playful') extra += '.hero-art{border-radius:' + pick(r, ['50%', '42% 58% 63% 37% / 41% 44% 56% 59%', '32px']) + '}';
      if (style === 'modern') extra += '.hero{background:radial-gradient(900px 420px at ' + pick(r, ['50% 0%', '0% 0%', '100% 0%']) + ',color-mix(in srgb,var(--p) 20%,transparent),transparent 70%)}';
      if (style === 'dark') extra += '.hero-art{box-shadow:0 0 90px -12px var(--a)}';
      var t = T('d-v' + ('00' + DESKTOP.length).slice(-3), cat, vname(r), style, pick(r, v.c), traits, theme, f[0], f[1], pick(r, v.r), extra);
      t.gen = true; DESKTOP.push(t);
    }
  }
  function genMobile(total) {
    var r = rng(8030), seen = {}, n = 0, guard = 0;
    MOBILE.forEach(function (t) { seen[t.traits.slice().sort().join('+')] = 1; });
    while (MOBILE.length < total && guard++ < 200000) {
      var style = STYLES[(n % CATS.length + Math.floor(n / CATS.length)) % STYLES.length], v = VAR[style];
      var head = pick(r, ['MH-burger', 'MH-chips', 'MH-tabs', 'MH-full', 'MH-center', 'MH-bar']);
      var hero = pick(r, ['MR-stack', 'MR-round', 'MR-compact', 'MR-full', 'MR-type', 'MR-card', 'MR-center']);
      var prods = pick(r, ['MP-1', 'MP-2', 'MP-scroll', 'MP-list']);
      var theme = pick(r, v.th);
      var cards = pick(r, ['', 'MC-scroll', 'MC-2', 'MC-list', style === 'retro' ? 'MC-retro' : 'MC-list']);
      var secs = pick(r, ['', 'MS-center', 'MS-upper']);
      var traits = [head, hero, prods].concat(cards ? [cards] : [], secs ? [secs] : [], r() < .3 ? ['M-callbar'] : []);
      if (head === 'MH-tabs' && traits.indexOf('M-callbar') >= 0) traits.pop();
      var sig = traits.slice().sort().join('+');
      if (seen[sig]) continue; seen[sig] = 1;
      var f = pick(r, v.f), cat = CATS[n % CATS.length]; n++;
      var extra = (style === 'bold' || style === 'retro') ? '.hero h1{text-transform:uppercase}' : style === 'luxury' ? '.hero h1{font-weight:400;font-style:italic}' : '';
      var t = T('m-v' + ('00' + MOBILE.length).slice(-3), cat, vname(r), style, pick(r, v.c), traits, theme, f[0], f[1], Math.min(pick(r, v.r), 24), extra);
      t.gen = true; MOBILE.push(t);
    }
  }
  DESKTOP.forEach(function (t) { t.gen = false; }); MOBILE.forEach(function (t) { t.gen = false; });
  genDesktop(500); genMobile(300);
  /* Sample content per category: [emoji, primary, accent, plugins-on, zh, en]
   * zh/en: [name, logo, tagline, about, services("Title|desc" lines), products [name, price, category, desc, emoji, options, stock]] */
  var BASE_ON = ['shop', 'contact', 'whatsapp', 'seo', 'lang', 'testimonials', 'totop'];
  var SM_S = {
    cafe: ['🧋', '#c2410c', '#f59e0b', ['menu', 'hours', 'map', 'variants', 'discount', 'gallery', 'announce'],
      ['港式奶茶小館', '奶茶館', '每日新鮮手沖，絲滑港式奶茶同水果奶茶', '我哋用斯里蘭卡茶葉每日新鮮拉茶，堅持少糖、真材實料。歡迎網上落單，自取或外送。', '招牌手沖|每杯即叫即沖\n新鮮水果|士多啤梨、青蘋果、麝香提子\n外送服務|港九新界指定地區',
        [['港式絲滑奶茶', 32, '奶茶', '招牌之選，茶香奶滑', '🧋', '少甜,正常甜,走冰', 50], ['士多啤梨奶茶', 38, '水果奶茶', '新鮮士多啤梨打底', '🍓', '中杯,大杯', 3], ['抹茶奶茶', 36, '奶茶', '日本宇治抹茶', '🍵', '', 20], ['菠蘿油', 18, '小食', '即叫即焗', '🥐', '', 'x']]],
      ['Harbour Milk Tea', 'Harbour', 'Silky Hong Kong milk tea and fresh fruit teas, brewed to order', 'We pull our Ceylon tea fresh every day, with less sugar and real ingredients. Order online for pickup or delivery.', 'Brewed to order|Every cup made fresh\nReal fruit|Strawberry, green apple, shine muscat\nDelivery|Fast local delivery',
        [['Silky HK Milk Tea', 32, 'Milk tea', 'Our signature, smooth and strong', '🧋', 'Less sweet,Regular,No ice', 50], ['Strawberry Milk Tea', 38, 'Fruit tea', 'Fresh strawberry base', '🍓', 'Medium,Large', 3], ['Matcha Milk Tea', 36, 'Milk tea', 'Uji matcha from Japan', '🍵', '', 20], ['Pineapple Bun', 18, 'Snacks', 'Baked to order', '🥐', '', 'x']]]],
    restaurant: ['🍝', '#b8860b', '#e11d48', ['menu', 'booking', 'hours', 'map', 'gallery'],
      ['銅鑼灣小館', '小館', '當造食材，慢煮心機菜', '由主廚親自設計嘅季節菜單，適合約會、聚會同私人宴會。', '季節菜單|每月更新\n私人包廂|最多 16 位\n外賣自取|網上落單',
        [['慢煮牛面頰', 268, '主菜', '紅酒汁、薯蓉', '🥩', '', 10], ['龍蝦意粉', 238, '主菜', '番茄忌廉汁', '🍝', '', 8], ['提拉米蘇', 78, '甜品', '自家製', '🍰', '', 15]]],
      ['Causeway Kitchen', 'Kitchen', 'Seasonal ingredients, slow-cooked with care', 'A seasonal menu designed by our head chef — perfect for dates, gatherings and private dining.', 'Seasonal menu|Updated monthly\nPrivate room|Up to 16 guests\nTakeaway|Order online',
        [['Braised beef cheek', 268, 'Mains', 'Red wine jus, mash', '🥩', '', 10], ['Lobster linguine', 238, 'Mains', 'Tomato cream sauce', '🍝', '', 8], ['Tiramisu', 78, 'Desserts', 'House-made', '🍰', '', 15]]]],
    bakery: ['🥐', '#d97706', '#92400e', ['menu', 'hours', 'map', 'stock', 'announce'],
      ['麥田烘焙坊', '麥田', '每朝新鮮出爐，天然酵母麵包', '我哋堅持用天然酵母同本地雞蛋，每朝六點開爐。蛋糕可提前預訂。', '天然酵母|長時間發酵\n訂製蛋糕|生日、婚禮\n早餐套餐|配咖啡',
        [['酸種麵包', 58, '麵包', '天然酵母 48 小時', '🍞', '', 6], ['牛油可頌', 22, '酥皮', '法國牛油', '🥐', '', 30], ['芝士蛋糕 6 吋', 288, '蛋糕', '需提前兩日預訂', '🍰', '6 吋,8 吋', 5]]],
      ['Wheatfield Bakery', 'Wheatfield', 'Fresh from the oven every morning — natural sourdough', 'Natural levain and local eggs, ovens on at 6am. Cakes can be ordered ahead.', 'Sourdough|Long fermentation\nCustom cakes|Birthdays and weddings\nBreakfast sets|With coffee',
        [['Sourdough loaf', 58, 'Bread', '48-hour natural levain', '🍞', '', 6], ['Butter croissant', 22, 'Pastry', 'French butter', '🥐', '', 30], ['Cheesecake 6"', 288, 'Cakes', 'Order 2 days ahead', '🍰', '6",8"', 5]]]],
    fashion: ['👗', '#111111', '#e11d48', ['variants', 'stock', 'discount', 'slideshow', 'social', 'announce'],
      ['MONO 服飾', 'MONO', '簡約剪裁，每日都想著嘅衣服', '本地設計、小批量生產。滿 HK$800 免運費，七日內可退換。', '本地設計|香港設計師\n小批量|減少浪費\n免費退換|七日內',
        [['純棉恤衫', 390, '上衣', '日本棉，寬鬆版', '👕', 'S,M,L,XL', 12], ['高腰闊腳褲', 520, '褲裝', '垂墜感', '👖', 'S,M,L', 4], ['針織外套', 680, '外套', '羊毛混紡', '🧥', 'M,L', 'x'], ['帆布袋', 180, '配件', '加厚帆布', '👜', '', 25]]],
      ['MONO Studio', 'MONO', 'Simple cuts you will want to wear every day', 'Designed locally, made in small batches. Free delivery over HK$800, 7-day returns.', 'Local design|Hong Kong designers\nSmall batches|Less waste\nFree returns|Within 7 days',
        [['Cotton shirt', 390, 'Tops', 'Japanese cotton, relaxed fit', '👕', 'S,M,L,XL', 12], ['High-waist trousers', 520, 'Bottoms', 'Fluid drape', '👖', 'S,M,L', 4], ['Knit cardigan', 680, 'Outerwear', 'Wool blend', '🧥', 'M,L', 'x'], ['Canvas tote', 180, 'Accessories', 'Heavy canvas', '👜', '', 25]]]],
    electronics: ['🎧', '#22d3ee', '#6366f1', ['variants', 'stock', 'discount', 'paybuttons', 'faq', 'video'],
      ['電子實驗室', 'E-LAB', '正貨行貨，一年保養，即日發貨', '精選耳機、充電配件同智能家居產品。全部行貨，提供一年保養。', '行貨保證|一年保養\n即日發貨|下午三點前落單\n技術支援|WhatsApp 即問即答',
        [['無線降噪耳機', 1290, '音響', '40 小時續航', '🎧', '黑色,白色', 7], ['65W 快充', 299, '充電', 'GaN 氮化鎵', '🔌', '', 40], ['智能燈泡', 149, '智能家居', 'App 控制', '💡', '', 2], ['機械鍵盤', 780, '電腦', '熱插拔軸', '⌨️', '紅軸,茶軸', 9]]],
      ['E-Lab Gadgets', 'E-LAB', 'Genuine products, 1-year warranty, same-day dispatch', 'Hand-picked headphones, chargers and smart-home gear — all genuine with a 1-year warranty.', 'Genuine|1-year warranty\nSame-day dispatch|Order before 3pm\nTech support|Ask on WhatsApp',
        [['Wireless ANC headphones', 1290, 'Audio', '40-hour battery', '🎧', 'Black,White', 7], ['65W fast charger', 299, 'Charging', 'GaN', '🔌', '', 40], ['Smart bulb', 149, 'Smart home', 'App control', '💡', '', 2], ['Mechanical keyboard', 780, 'Computers', 'Hot-swap switches', '⌨️', 'Red,Brown', 9]]]],
    beauty: ['💅', '#db2777', '#f59e0b', ['booking', 'pricing', 'gallery', 'hours', 'map', 'messengers'],
      ['花漾美容室', '花漾', '面部護理、美甲、美睫，一站式預約', '持證美容師，使用天然護膚品牌。首次預約享九折。', '面部護理|深層清潔、補濕\n美甲|凝膠甲、手繪\n美睫|自然款、濃密款',
        [['補濕面部護理', 580, '護理', '60 分鐘', '🧖', '', 0], ['凝膠美甲', 320, '美甲', '單色', '💅', '', 0], ['禮物卡', 500, '禮物', '電子禮物卡', '🎁', '', 0]]],
      ['Bloom Beauty Room', 'Bloom', 'Facials, nails and lashes — book in one place', 'Certified therapists using natural skincare brands. 10% off your first booking.', 'Facials|Deep cleanse, hydration\nNails|Gel and hand-painted\nLashes|Natural or volume',
        [['Hydrating facial', 580, 'Treatments', '60 minutes', '🧖', '', 0], ['Gel manicure', 320, 'Nails', 'Single colour', '💅', '', 0], ['Gift card', 500, 'Gifts', 'E-gift card', '🎁', '', 0]]]],
    fitness: ['🏋️', '#a3e635', '#22d3ee', ['pricing', 'team', 'booking', 'countdown', 'video'],
      ['POWER 健身館', 'POWER', '練得更強，由今日開始', '24 小時開放，專業教練一對一指導，小組班每日都有。', '私人教練|度身訂造計劃\n小組課程|HIIT、拳擊、瑜伽\n24 小時|全年無休',
        [['月票', 680, '會籍', '無限次入場', '🎟️', '', 0], ['私人教練 10 堂', 4800, '教練', '一對一', '💪', '', 0], ['運動水樽', 120, '用品', '750ml', '🥤', '', 30]]],
      ['POWER Gym', 'POWER', 'Get stronger, starting today', 'Open 24/7 with certified personal trainers and group classes every day.', 'Personal training|Tailored plans\nGroup classes|HIIT, boxing, yoga\n24/7|Open all year',
        [['Monthly pass', 680, 'Membership', 'Unlimited entry', '🎟️', '', 0], ['10 PT sessions', 4800, 'Coaching', 'One-to-one', '💪', '', 0], ['Sports bottle', 120, 'Gear', '750ml', '🥤', '', 30]]]],
    clinic: ['🦷', '#0d9488', '#38bdf8', ['booking', 'team', 'faq', 'hours', 'map'],
      ['康健牙科診所', '康健牙科', '溫柔、專業、透明收費嘅牙科護理', '註冊牙醫，提供洗牙、補牙、矯齒及兒童牙科服務。歡迎網上預約。', '洗牙檢查|每半年一次\n隱形矯齒|免費諮詢\n兒童牙科|溫柔耐心',
        [['洗牙及檢查', 650, '預防', '包 X 光', '🦷', '', 0], ['美白療程', 2800, '美容', '一次療程', '✨', '', 0]]],
      ['Bright Dental Clinic', 'Bright Dental', 'Gentle, professional dental care with clear prices', 'Registered dentists offering cleaning, fillings, aligners and children\'s dentistry. Book online.', 'Check-up & clean|Every six months\nClear aligners|Free consultation\nKids dentistry|Gentle and patient',
        [['Check-up & clean', 650, 'Preventive', 'X-ray included', '🦷', '', 0], ['Whitening', 2800, 'Cosmetic', 'One session', '✨', '', 0]]]],
    home: ['🛠️', '#0f766e', '#f59e0b', ['booking', 'pricing', 'faq', 'hours', 'messengers'],
      ['安心家居維修', '安心維修', '水電、冷氣、清潔，一個電話上門搞掂', '持牌技工，報價透明，維修後保養 90 日。網上預約，最快即日上門。', '水喉渠務|漏水、塞渠、換龍頭\n電力工程|換燈、拉線、跳掣檢查\n冷氣清洗|分體、窗口機深層清洗',
        [['冷氣深層清洗', 480, '清洗', '分體機一部', '❄️', '', 0], ['上門檢查', 300, '維修', '包交通及檢查', '🔧', '', 0], ['全屋清潔 4 小時', 880, '清潔', '兩位清潔員', '🧽', '', 0]]],
      ['Handy Home Repairs', 'Handy', 'Plumbing, electrical, aircon and cleaning — one call, at your door', 'Licensed technicians, transparent quotes and a 90-day warranty. Book online, same-day visits available.', 'Plumbing|Leaks, drains, taps\nElectrical|Lights, wiring, breakers\nAircon cleaning|Split and window units',
        [['Aircon deep clean', 480, 'Cleaning', 'One split unit', '❄️', '', 0], ['Home visit check', 300, 'Repair', 'Travel and inspection', '🔧', '', 0], ['4-hour home cleaning', 880, 'Cleaning', 'Two cleaners', '🧽', '', 0]]]],
    realestate: ['🏙️', '#1e3a5f', '#c8a24a', ['gallery', 'team', 'map', 'booking', 'downloads'],
      ['港景地產', '港景', '搵樓、睇樓、放盤，一手包辦', '資深代理團隊，專注港島及九龍住宅。預約睇樓只需一分鐘。', '買樓|一手及二手盤\n租樓|短租及長租\n放盤|免費估價',
        [['睇樓預約', 0, '服務', '免費', '🔑', '', 0]]],
      ['Harbour View Realty', 'Harbour View', 'Buy, rent or sell — all in one place', 'Experienced agents focused on Hong Kong Island and Kowloon homes. Book a viewing in one minute.', 'Buy|New and resale homes\nRent|Short and long lets\nSell|Free valuation',
        [['Viewing appointment', 0, 'Services', 'Free', '🔑', '', 0]]]],
    travel: ['✈️', '#0284c7', '#22c55e', ['slideshow', 'events', 'faq', 'countdown', 'newsletter'],
      ['悠遊旅行社', '悠遊', '小團深度遊，行程由你話事', '持牌旅行社，專做日本、台灣、東南亞小團及自由行套票。', '小團深度遊|8–12 人\n自由行套票|機票+酒店\n度身訂造|蜜月、家庭',
        [['京都賞楓 5 天', 8980, '日本', '小團 10 人', '🍁', '', 6], ['台南美食 4 天', 4580, '台灣', '包酒店', '🍜', '', 12], ['峇里島蜜月 6 天', 12800, '東南亞', '私人導遊', '🏝️', '', 3]]],
      ['Wander Travel', 'Wander', 'Small-group trips, your way', 'Licensed agency specialising in small-group tours and packages to Japan, Taiwan and Southeast Asia.', 'Small groups|8–12 people\nPackages|Flights + hotel\nTailor-made|Honeymoon, family',
        [['Kyoto autumn, 5 days', 8980, 'Japan', 'Group of 10', '🍁', '', 6], ['Tainan food, 4 days', 4580, 'Taiwan', 'Hotel included', '🍜', '', 12], ['Bali honeymoon, 6 days', 12800, 'SE Asia', 'Private guide', '🏝️', '', 3]]]],
    hotel: ['🏨', '#8b5e34', '#c8a24a', ['booking', 'gallery', 'map', 'faq', 'testimonials'],
      ['山海民宿', '山海', '海景房間，慢活假期', '位於西貢海邊嘅精品民宿，只有六間房，每間都望到海。', '海景房間|六間精品房\n早餐|本地農場食材\n接送|西貢市中心',
        [['海景雙人房 / 晚', 1280, '房間', '含早餐', '🛏️', '平日,週末', 4], ['家庭套房 / 晚', 1880, '房間', '最多 4 人', '🏠', '平日,週末', 1]]],
      ['Sea & Hill Guesthouse', 'Sea & Hill', 'Sea-view rooms for a slow getaway', 'A boutique guesthouse on the Sai Kung waterfront — just six rooms, each with a sea view.', 'Sea-view rooms|Six boutique rooms\nBreakfast|Local farm produce\nTransfers|From Sai Kung town',
        [['Sea-view double / night', 1280, 'Rooms', 'Breakfast included', '🛏️', 'Weekday,Weekend', 4], ['Family suite / night', 1880, 'Rooms', 'Up to 4 guests', '🏠', 'Weekday,Weekend', 1]]]],
    education: ['🎓', '#4f46e5', '#f59e0b', ['pricing', 'team', 'events', 'booking', 'faq'],
      ['啟思補習中心', '啟思', '小班教學，DSE 英文數學拔尖補底', '資深導師，每班最多 6 人，提供免費試堂。', '小班教學|每班 6 人\nDSE 衝刺|模擬試卷\n免費試堂|先試後報',
        [['DSE 英文 月費', 1280, '課程', '每星期一堂', '📘', '', 0], ['數學 月費', 1180, '課程', '每星期一堂', '📐', '', 0]]],
      ['Bright Minds Tutoring', 'Bright Minds', 'Small classes for DSE English and Maths', 'Experienced tutors, max 6 students per class, free trial lesson.', 'Small classes|6 students\nExam prep|Mock papers\nFree trial|Try before you join',
        [['DSE English monthly', 1280, 'Courses', 'One lesson a week', '📘', '', 0], ['Maths monthly', 1180, 'Courses', 'One lesson a week', '📐', '', 0]]]],
    photo: ['📷', '#a78bfa', '#f472b6', ['gallery', 'booking', 'testimonials', 'social'],
      ['陳小雅 攝影', 'ADA CHAN', '人像、婚禮與城市影像', '十年攝影經驗，作品刊登於多本雜誌。歡迎查詢檔期，亦可購買限量相片。', '人像拍攝|室內或戶外\n婚禮紀錄|全日跟拍\n商業攝影|產品與品牌',
        [['限量相片 A3', 680, '相片', '簽名限量 30 張', '🖼️', 'A3,A2', 5], ['明信片套裝', 120, '明信片', '12 張', '✉️', '', 40]]],
      ['Ada Chan Photography', 'ADA CHAN', 'Portraits, weddings and city stories', 'Ten years behind the lens, published in magazines. Ask about dates or buy limited prints.', 'Portraits|Studio or outdoor\nWeddings|Full-day coverage\nCommercial|Products and brands',
        [['Limited print A3', 680, 'Prints', 'Signed, edition of 30', '🖼️', 'A3,A2', 5], ['Postcard set', 120, 'Postcards', '12 cards', '✉️', '', 40]]]],
    designer: ['🎨', '#ff4d00', '#111111', ['gallery', 'testimonials', 'pricing', 'social', 'downloads'],
      ['形研設計', 'FORM LAB', '品牌、網頁同包裝設計', '獨立設計工作室，同初創同小店合作建立品牌形象。', '品牌設計|Logo 與識別\n網頁設計|UI 與排版\n包裝設計|由概念到印刷',
        [['Logo 設計套餐', 6800, '套餐', '三個方案', '✏️', '', 0], ['品牌指引', 12800, '套餐', '完整識別系統', '📐', '', 0]]],
      ['Form Lab Studio', 'FORM LAB', 'Brand, web and packaging design', 'An independent studio helping start-ups and small shops build their brand.', 'Branding|Logo and identity\nWeb design|UI and layout\nPackaging|Concept to print',
        [['Logo package', 6800, 'Packages', 'Three concepts', '✏️', '', 0], ['Brand guidelines', 12800, 'Packages', 'Full identity system', '📐', '', 0]]]],
    corporate: ['📈', '#1d4ed8', '#0ea5e9', ['team', 'testimonials', 'blog', 'downloads', 'map'],
      ['北辰商業顧問', '北辰', '幫中小企用數據做更好嘅決定', '提供策略、財務同數碼轉型顧問服務，服務超過 200 間企業。', '策略規劃|市場分析與增長計劃\n財務顧問|預算、現金流、融資\n數碼轉型|系統導入與培訓',
        [['一小時顧問', 1200, '顧問', '視像會議', '💼', '', 0], ['業務健康檢查', 4800, '套餐', '報告及建議', '📊', '', 0]]],
      ['Northstar Advisory', 'Northstar', 'Helping SMEs make better decisions with data', 'Strategy, finance and digital transformation advisory for more than 200 companies.', 'Strategy|Market analysis and growth\nFinance|Budgets, cash flow, funding\nDigital|Systems and training',
        [['1-hour consultation', 1200, 'Advisory', 'Video call', '💼', '', 0], ['Business health check', 4800, 'Packages', 'Report and recommendations', '📊', '', 0]]]],
    saas: ['🚀', '#7c3aed', '#06b6d4', ['pricing', 'faq', 'testimonials', 'video', 'newsletter', 'livechat'],
      ['Flowly 排程', 'Flowly', '團隊排班同預約，一個 App 搞掂', '雲端排程工具，支援自動提醒、網上預約同報表。免費試用 14 日。', '自動提醒|SMS 及電郵\n網上預約|嵌入你的網站\n報表|即時數據',
        [['Starter 年費', 1200, '方案', '最多 3 人', '🚀', '', 0], ['Team 年費', 3600, '方案', '最多 20 人', '👥', '', 0]]],
      ['Flowly Scheduling', 'Flowly', 'Team rosters and bookings in one app', 'Cloud scheduling with automatic reminders, online booking and reports. 14-day free trial.', 'Reminders|SMS and email\nOnline booking|Embed on your site\nReports|Live data',
        [['Starter yearly', 1200, 'Plans', 'Up to 3 users', '🚀', '', 0], ['Team yearly', 3600, 'Plans', 'Up to 20 users', '👥', '', 0]]]],
    blog: ['✍️', '#9a3412', '#ea580c', ['blog', 'newsletter', 'social'],
      ['慢活日記', '慢活日記', '關於旅行、咖啡同生活嘅文字', '每星期更新一篇文章，分享慢活旅行同咖啡筆記。', '京都的早晨|在鴨川邊喝一杯咖啡\n手沖入門|三樣工具就開始\n一個人旅行|如何計劃慢活行程',
        [['電子書：慢活旅行', 88, '電子書', 'PDF，120 頁', '📘', '', 0], ['咖啡筆記本', 128, '文具', 'A5 點格', '📓', '', 15]]],
      ['Slow Days Journal', 'Slow Days', 'Words on travel, coffee and living slowly', 'A new essay every week on slow travel and coffee notes.', 'Mornings in Kyoto|Coffee by the river\nPour-over basics|Start with three tools\nTravelling solo|Planning a slow trip',
        [['E-book: Slow Travel', 88, 'E-books', 'PDF, 120 pages', '📘', '', 0], ['Coffee notebook', 128, 'Stationery', 'A5 dot grid', '📓', '', 15]]]],
    wedding: ['💍', '#b48a78', '#d4af37', ['countdown', 'events', 'gallery', 'map', 'faq'],
      ['Ken & Mandy 婚禮', 'K & M', '我哋結婚啦！誠意邀請你一齊見證', '多謝你一直以嚟嘅支持，期待同你喺婚禮見面。請喺網上回覆出席。', '證婚|下午三點\n晚宴|晚上七點\n交通|設有旅遊巴接送',
        [['禮金（網上）', 1000, '祝福', '多謝你嘅祝福', '💝', '', 0]]],
      ['Ken & Mandy', 'K & M', 'We are getting married — join us!', 'Thank you for your love and support. We cannot wait to celebrate with you. Please RSVP online.', 'Ceremony|3:00 pm\nDinner|7:00 pm\nTransport|Coach shuttle provided',
        [['Wedding gift (online)', 1000, 'Gifts', 'Thank you for your blessing', '💝', '', 0]]]],
    ngo: ['🤝', '#16a34a', '#f59e0b', ['events', 'blog', 'team', 'newsletter', 'paybuttons'],
      ['綠芽社區協會', '綠芽', '一齊為社區種下希望', '我哋為基層家庭提供食物援助、功課輔導同長者探訪。', '食物援助|每月 500 個家庭\n功課輔導|200 位學童\n長者探訪|每週義工探訪',
        [['捐款 HK$100', 100, '捐款', '一個家庭一星期糧食', '🥫', '', 0], ['捐款 HK$500', 500, '捐款', '一個學童一個月輔導', '📚', '', 0]]],
      ['Green Sprout Community', 'Green Sprout', 'Planting hope in our community together', 'We provide food support, homework help and elderly visits for families in need.', 'Food support|500 families a month\nHomework help|200 children\nElderly visits|Weekly volunteers',
        [['Donate HK$100', 100, 'Donations', 'A week of food for a family', '🥫', '', 0], ['Donate HK$500', 500, 'Donations', 'A month of tutoring for a child', '📚', '', 0]]]],
    music: ['🎸', '#f43f5e', '#facc15', ['events', 'video', 'gallery', 'social', 'stock'],
      ['夜行樂隊', 'NIGHT RUN', '香港獨立搖滾樂隊', '2018 年成軍，已推出兩張專輯，經常喺 Live House 演出。', '新專輯|《霓虹》現已推出\n巡迴演出|亞洲 8 個城市\n商演邀請|歡迎查詢',
        [['專輯《霓虹》CD', 150, '音樂', '簽名版', '💿', '', 20], ['巡迴 T 恤', 220, '周邊', '黑色', '👕', 'S,M,L', 8], ['演唱會門票', 380, '門票', '企位', '🎫', '', 0]]],
      ['Night Run', 'NIGHT RUN', 'Indie rock from Hong Kong', 'Formed in 2018, two albums out, regulars on the live-house circuit.', 'New album|“Neon” out now\nTour|8 cities across Asia\nBookings|Get in touch',
        [['“Neon” CD', 150, 'Music', 'Signed edition', '💿', '', 20], ['Tour T-shirt', 220, 'Merch', 'Black', '👕', 'S,M,L', 8], ['Concert ticket', 380, 'Tickets', 'Standing', '🎫', '', 0]]]],
    law: ['⚖️', '#1e293b', '#b8860b', ['team', 'faq', 'booking', 'map', 'downloads'],
      ['梁陳律師行', '梁陳律師行', '專業、可靠、以客為本嘅法律服務', '處理物業轉讓、家事、商業及僱傭法律事務，首次諮詢 30 分鐘免費。', '物業轉讓|買賣及按揭\n家事法|離婚、撫養權\n商業法|合約、公司事務',
        [['首次諮詢 30 分鐘', 0, '諮詢', '免費', '📄', '', 0], ['遺囑草擬', 3800, '服務', '標準遺囑', '🖋️', '', 0]]],
      ['Leung & Chan Solicitors', 'Leung & Chan', 'Professional, reliable, client-first legal services', 'Conveyancing, family, commercial and employment law. First 30-minute consultation free.', 'Conveyancing|Sales and mortgages\nFamily law|Divorce, custody\nCommercial|Contracts, company matters',
        [['First consultation 30 min', 0, 'Consultation', 'Free', '📄', '', 0], ['Will drafting', 3800, 'Services', 'Standard will', '🖋️', '', 0]]]],
    car: ['🚗', '#dc2626', '#facc15', ['booking', 'pricing', 'hours', 'map', 'messengers'],
      ['極速車房', '極速車房', '保養、維修、驗車，一站式服務', '二十年經驗技師，所有品牌車款，透明報價。', '定期保養|機油、剎車\n維修|引擎、波箱、電路\n驗車|年檢準備',
        [['基本保養套餐', 880, '保養', '機油+檢查', '🛢️', '', 0], ['冷氣檢查', 380, '維修', '含雪種', '❄️', '', 0], ['輪胎更換 (每條)', 650, '輪胎', '包安裝', '🛞', '', 16]]],
      ['Torque Auto Garage', 'Torque', 'Service, repairs and inspections in one stop', 'Twenty years of experience, all makes and models, transparent quotes.', 'Servicing|Oil and brakes\nRepairs|Engine, gearbox, electrics\nInspection|Annual check prep',
        [['Basic service', 880, 'Servicing', 'Oil + inspection', '🛢️', '', 0], ['Aircon check', 380, 'Repairs', 'Refrigerant included', '❄️', '', 0], ['Tyre (each)', 650, 'Tyres', 'Fitting included', '🛞', '', 16]]]],
    pet: ['🐶', '#f97316', '#10b981', ['booking', 'stock', 'variants', 'gallery', 'testimonials'],
      ['毛孩樂園', '毛孩樂園', '寵物美容、用品同酒店', '用天然洗毛液，美容師溫柔對待每隻毛孩。用品網上落單送到府上。', '寵物美容|洗澡、剪毛\n寵物酒店|24 小時看顧\n用品|糧食、玩具',
        [['小型犬美容', 380, '美容', '洗澡+剪毛', '🐩', '', 0], ['天然狗糧 2kg', 268, '糧食', '無穀物', '🦴', '雞肉,三文魚', 9], ['貓抓板', 98, '玩具', '瓦通紙', '🐱', '', 0]]],
      ['Paws Paradise', 'Paws', 'Pet grooming, supplies and boarding', 'Natural shampoos and gentle groomers. Order supplies online for home delivery.', 'Grooming|Bath and trim\nPet hotel|24-hour care\nSupplies|Food and toys',
        [['Small dog grooming', 380, 'Grooming', 'Bath + trim', '🐩', '', 0], ['Natural dog food 2kg', 268, 'Food', 'Grain-free', '🦴', 'Chicken,Salmon', 9], ['Cat scratcher', 98, 'Toys', 'Cardboard', '🐱', '', 0]]]]
  };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function safeUrl(u) { u = String(u || '').trim(); return /^(https?:\/\/|data:image\/)/i.test(u) ? u : ''; }
  function linkUrl(u) { u = String(u || '').trim(); return /^(https?:\/\/|mailto:|tel:|#)/i.test(u) ? u : ''; }
  function hex(c, d) { return /^#[0-9a-f]{3,8}$/i.test(c || '') ? c : d; }
  function lines(txt, n) { return String(txt || '').split('\n').map(function (l) { var a = l.split('|').map(function (x) { return x.trim(); }); while (a.length < n) a.push(''); return a; }).filter(function (a) { return a.join('').length; }); }

  /* YouTube link -> 11-char video id (watch?v=, youtu.be/, /shorts/, /embed/, /live/) */
  function ytId(u) {
    u = String(u || '').trim();
    if (!u) return null;
    if (/^[\w-]{11}$/.test(u)) return u;
    var m = u.match(/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/|v\/)|youtu\.be\/)([\w-]{11})(?:[?&#\/].*)?$/i);
    return m ? m[1] : null;
  }
  function ytEmbed(id, title) {
    return '<div class="yt"><iframe src="https://www.youtube-nocookie.com/embed/' + id + '" title="' + esc(title || 'YouTube video') + '" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>';
  }
  /* Placeholder image (SVG data URI) so samples look real offline */
  function phImg(emoji, c1, c2, w, h) {
    w = w || 800; h = h || 600;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><text x="50%" y="54%" font-size="' + Math.round(h * 0.34) + '" text-anchor="middle" dominant-baseline="middle">' + emoji + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }
  var HUES = [['#fde68a', '#f97316'], ['#bfdbfe', '#6366f1'], ['#bbf7d0', '#0d9488'], ['#fecdd3', '#db2777'], ['#ddd6fe', '#7c3aed'], ['#fed7aa', '#b45309']];

  function catEmojis(cat) {
    var s = SM_S[cat]; var list = [s[0]]; s[4][5].forEach(function (p) { list.push(p[4]); }); return list;
  }

  function sampleState(cat, uiLang) {
    if (!SM_S[cat]) cat = 'cafe';
    var s = SM_S[cat], zh = /^zh/.test(uiLang || ''), L = zh ? s[4] : s[5];
    var PC = (window.SM_PLUGINS && SM_PLUGINS.SAMPLE_PC[zh ? 'zh' : 'en']) || {};
    var on = {}; (window.SM_PLUGINS ? SM_PLUGINS.LIST : []).forEach(function (p) { on[p.id] = false; });
    BASE_ON.concat(s[3]).forEach(function (k) { on[k] = true; });
    var pc = JSON.parse(JSON.stringify(PC));
    var em = catEmojis(cat);
    pc.gallery = { items: em.concat(em).slice(0, 6).map(function (e, i) { return ' | ' + (L[4].split('\n')[i % 3] || '').split('|')[0]; }).join('\n') };
    pc.slideshow = { items: L[4].split('\n').map(function (l) { var x = l.split('|'); return x[0] + ' | ' + (x[1] || '') + ' | '; }).join('\n') };
    pc.menu = { items: L[5].map(function (p) { return p[2] + ' | ' + p[0] + ' | ' + p[1] + ' | ' + p[3]; }).join('\n') };
    var d = new Date(Date.now() + 1000 * 60 * 60 * 24 * 21); d.setMinutes(0, 0, 0);
    pc.countdown.date = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    pc.video = { urls: '' };
    pc.messengers = { telegram: '', line: '', wechat: '' };
    pc.social = { facebook: 'https://facebook.com/', instagram: 'https://instagram.com/', x: '', youtube: '', tiktok: '' };
    pc.newsletter = { action: '', fieldname: 'EMAIL' };
    pc.livechat = { snippet: '' };
    return {
      v: 2, cat: cat, desktop: 'd-' + cat, mobile: 'm-' + cat,
      name: L[0], logo: L[1], tagline: L[2], about: L[3], services: L[4],
      emoji: s[0], primary: s[1], accent: s[2],
      plugins: on, pc: pc,
      currency: 'HK$',
      products: L[5].map(function (p, i) { return { id: 'p' + (i + 1), name: p[0], price: p[1], cat: p[2], desc: p[3], e: p[4], opts: p[5] || '', stock: p[6] === 'x' ? 0 : (p[6] || ''), img: '', yt: '', stripe: '' }; }),
      wa: '', email: '', paypalMe: '',
      seo: { title: L[0], desc: L[2], kw: '', og: '', url: '' },
      analytics: '',
      langs: zh ? ['zh-Hant', 'en'] : ['en', 'zh-Hant'],
      lang: zh ? 'zh-Hant' : 'en',
      trMode: '', trLangs: ['en', 'zh-Hans', 'ja', 'ko', 'es', 'fr'], tr: {}
    };
  }
  var BASE_CSS = [
    ':root{--p:#5b4bff;--a:#00b8d9;--bg:#fff;--fg:#111827;--mu:#6b7280;--card:#fff;--line:#e5e7eb;--r:14px;--pcols:3;--mpcols:1;--font:system-ui,-apple-system,"Segoe UI",Roboto,"Noto Sans","Noto Sans TC",sans-serif;--hfont:var(--font)}',
    'html.dark{--bg:#0f1115!important;--fg:#e8eaed!important;--mu:#9aa0a6!important;--card:#181b20!important;--line:#2a2f37!important;--alt:#13161a!important}',
    '*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;font-family:var(--font);background:var(--bg);color:var(--fg);line-height:1.6;transition:background .2s,color .2s}img{max-width:100%}a{color:inherit}',
    '.wrap{width:min(1140px,100% - 40px);margin-inline:auto}.sub{color:var(--mu);margin:-12px 0 24px}',
    '.ann{background:var(--fg);color:var(--bg);text-align:center;font-size:14px;padding:9px 44px;position:relative;z-index:25}.ann a{color:inherit}.ann .x{position:absolute;inset-inline-end:10px;top:50%;transform:translateY(-50%);font-size:20px;color:inherit}',
    '.hd{position:sticky;top:0;z-index:20;background:var(--hdbg,var(--bg));color:var(--hdfg,var(--fg));border-bottom:1px solid var(--line)}',
    '.hd-in{display:flex;align-items:center;gap:18px;min-height:64px;position:relative}',
    '.logo{display:flex;gap:10px;align-items:center;text-decoration:none;font-weight:800;font-size:19px;color:inherit;font-family:var(--hfont)}',
    '.logo-mark{width:34px;height:34px;border-radius:10px;background:var(--p);color:#fff;display:grid;place-items:center;font-size:16px;flex:none}',
    '.nav{display:flex;gap:2px;flex:1;justify-content:flex-end;flex-wrap:wrap}.nav a{text-decoration:none;color:inherit;padding:8px 11px;border-radius:8px;opacity:.88;font-size:15px}.nav a:hover{opacity:1}',
    '.hd-tools{display:flex;gap:8px;align-items:center}',
    '.lang-sel{border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:10px;height:38px;padding:0 8px;font:inherit;font-size:14px;cursor:pointer;max-width:160px}',
    '.cart-btn,.dm-btn{border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:10px;height:38px;padding:0 12px;cursor:pointer;font:inherit;display:flex;align-items:center;gap:6px}.dm-btn{padding:0 10px}',
    '.cart-count{background:var(--a);color:#fff;border-radius:99px;font-size:12px;min-width:20px;height:20px;display:grid;place-items:center;padding:0 5px;font-weight:700}',
    '.cart-btn.bump{animation:bump .4s}@keyframes bump{50%{transform:scale(1.15)}}',
    '.burger{display:none;border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:10px;width:40px;height:38px;font-size:18px;cursor:pointer;place-items:center}',
    '.hero{padding:80px 0}.hero-in{display:grid;grid-template-columns:1.2fr .8fr;gap:44px;align-items:center}',
    '.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:13px;color:var(--a);font-weight:700;margin:0 0 8px}',
    '.hero h1{font-family:var(--hfont);font-size:clamp(32px,5vw,56px);line-height:1.1;margin:0 0 16px}.lead{font-size:19px;opacity:.85;margin:0 0 26px}',
    '.btn{display:inline-flex;align-items:center;gap:8px;background:var(--p);color:#fff;border:0;border-radius:var(--r);padding:12px 22px;font:600 15px var(--font);text-decoration:none;cursor:pointer;transition:.15s}.btn:hover{filter:brightness(1.08)}.btn[disabled]{opacity:.45;cursor:not-allowed}',
    '.btn.ghost{background:transparent;color:inherit;border:1.5px solid currentColor}.hero-btns{display:flex;gap:10px;flex-wrap:wrap}',
    '.hero-art{aspect-ratio:1;border-radius:30px;background:linear-gradient(135deg,var(--p),var(--a));display:grid;place-items:center;font-size:clamp(60px,10vw,130px);box-shadow:0 30px 60px -24px var(--p)}',
    '.sec{padding:72px 0}.sec.alt{background:var(--alt,rgba(0,0,0,.03))}.sec h2{font-family:var(--hfont);font-size:clamp(24px,3vw,36px);margin:0 0 22px}',
    '.about{font-size:18px;max-width:760px;opacity:.9;white-space:pre-line;margin:0}',
    '.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:22px}.card h3{margin:0 0 6px;font-family:var(--hfont)}.card p{margin:0;color:var(--mu)}',
    '.chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px}.chip{border:1px solid var(--line);background:var(--card);color:var(--fg);padding:7px 14px;border-radius:99px;cursor:pointer;font:inherit;font-size:14px}.chip.on{background:var(--p);border-color:var(--p);color:#fff}',
    '.products{display:grid;grid-template-columns:repeat(var(--pcols),1fr);gap:18px}',
    '.prod{background:var(--card);border:1px solid var(--line);border-radius:var(--r);overflow:hidden;display:flex;flex-direction:column;position:relative}.prod.hide{display:none}',
    '.pimg{aspect-ratio:4/3;background:linear-gradient(135deg,color-mix(in srgb,var(--p) 22%,#fff),color-mix(in srgb,var(--a) 30%,#fff));display:grid;place-items:center;font-size:54px;overflow:hidden}.pimg img{width:100%;height:100%;object-fit:cover;display:block}',
    '.pbody{padding:14px 16px 16px;display:flex;flex-direction:column;gap:5px;flex:1}.pcat{font-size:12px;color:var(--a);font-weight:700;text-transform:uppercase;letter-spacing:.06em}',
    '.pname{font-weight:700;font-size:17px;margin:0}.pdesc{color:var(--mu);font-size:14px;margin:0;flex:1}',
    '.prow{display:flex;justify-content:space-between;align-items:center;gap:8px;margin-top:6px;flex-wrap:wrap}.price{font-weight:800;font-size:18px}.add{padding:8px 14px;font-size:14px}',
    '.pextra{display:flex;gap:6px;flex-wrap:wrap}.mini{font:600 12px var(--font);border:1px solid var(--line);background:transparent;border-radius:8px;padding:5px 9px;cursor:pointer;color:var(--fg);text-decoration:none}',
    '.popt{border:1px solid var(--line);border-radius:8px;padding:6px 8px;font:inherit;font-size:13px;background:var(--card);color:var(--fg)}',
    '.stock{position:absolute;top:10px;inset-inline-start:10px;font-size:11.5px;font-weight:700;padding:4px 9px;border-radius:99px;background:#dcfce7;color:#166534}.stock.low{background:#fef3c7;color:#92400e}.stock.out{background:#fee2e2;color:#991b1b}',
    '.videos{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.videos.one{grid-template-columns:1fr;max-width:860px}',
    '.yt{position:relative;aspect-ratio:16/9;border-radius:var(--r);overflow:hidden;background:#000}.yt iframe{position:absolute;inset:0;width:100%;height:100%;border:0}',
    '.slides{position:relative;overflow:hidden}.sl-track{display:flex;transition:transform .5s ease}.slide{flex:0 0 100%;min-height:360px;display:grid;place-items:center;text-align:center;color:#fff;padding:40px;background-size:cover;background-position:center;position:relative}.slide::before{content:"";position:absolute;inset:0;background:rgba(0,0,0,.35)}.slide>div{position:relative;max-width:720px}.slide h3{font-family:var(--hfont);font-size:clamp(26px,4vw,44px);margin:0 0 8px}',
    '.sl-btn{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;border:0;background:rgba(255,255,255,.85);color:#111;font-size:22px;cursor:pointer;z-index:2}.sl-prev{left:16px}.sl-next{right:16px}.sl-dots{position:absolute;bottom:14px;left:0;right:0;display:flex;gap:8px;justify-content:center;z-index:2}.sl-dots button{width:9px;height:9px;border-radius:50%;border:0;background:rgba(255,255,255,.5);cursor:pointer;padding:0}.sl-dots button.on{background:#fff}',
    '.gal{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.gal button{border:0;padding:0;background:none;cursor:zoom-in;border-radius:var(--r);overflow:hidden;aspect-ratio:4/3;position:relative}.gal img{width:100%;height:100%;object-fit:cover;display:block;transition:.3s}.gal button:hover img{transform:scale(1.05)}.gal span{position:absolute;left:0;right:0;bottom:0;padding:8px 12px;color:#fff;font-size:13px;background:linear-gradient(transparent,rgba(0,0,0,.6));text-align:start}',
    '.lb{position:fixed;inset:0;background:rgba(0,0,0,.9);display:none;place-items:center;z-index:65;padding:30px}.lb.on{display:grid}.lb img{max-width:92vw;max-height:80vh;border-radius:8px}.lb p{color:#fff;text-align:center;margin:12px 0 0}.lb .x{position:absolute;top:14px;right:20px;color:#fff;font-size:34px}.lb .nv{position:absolute;top:50%;border:0;background:rgba(255,255,255,.15);color:#fff;width:48px;height:48px;border-radius:50%;font-size:24px;cursor:pointer}.lb .pv{left:16px}.lb .nx{right:16px}',
    '.tsts{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.tst{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:22px;margin:0}.tst .stars{color:#f59e0b;letter-spacing:2px}.tst blockquote{margin:8px 0 12px;font-size:16px}.tst figcaption{font-weight:700;color:var(--mu);font-size:14px}',
    '.faqs{display:grid;gap:10px;max-width:820px}.faqs details{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:2px 18px}.faqs summary{cursor:pointer;font-weight:700;padding:14px 0}.faqs p{margin:0 0 16px;color:var(--mu)}',
    '.team{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.member{text-align:center}.member .av{width:120px;height:120px;border-radius:50%;margin:0 auto 12px;display:grid;place-items:center;font-size:40px;font-weight:800;color:#fff;background:linear-gradient(135deg,var(--p),var(--a));overflow:hidden}.member .av img{width:100%;height:100%;object-fit:cover}.member b{display:block}.member small{color:var(--mu)}',
    '.cd{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}.cd div{background:var(--card);border:1px solid var(--line);border-radius:var(--r);min-width:96px;padding:16px;text-align:center}.cd b{display:block;font-size:40px;font-family:var(--hfont);line-height:1.1;color:var(--p)}.cd small{color:var(--mu)}.cd-sec{text-align:center}.cd-sec h2{text-align:center}',
    '.evs{display:grid;gap:12px}.ev{display:grid;grid-template-columns:84px 1fr auto;gap:18px;align-items:center;background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:14px}.ev-d{background:var(--p);color:#fff;border-radius:12px;text-align:center;padding:8px 4px;line-height:1.2}.ev-d b{display:block;font-size:24px}.ev h3{margin:0;font-size:18px}.ev small{color:var(--mu)}',
    '.posts{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.post{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:22px}.post time{color:var(--a);font-size:13px;font-weight:700}.post h3{margin:6px 0;font-family:var(--hfont)}.post p{color:var(--mu);margin:0 0 10px}',
    '.menu{display:grid;grid-template-columns:1fr 1fr;gap:10px 48px}.menu h3{grid-column:1/-1;font-family:var(--hfont);margin:18px 0 4px;color:var(--p)}.mi{display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:baseline}.mi .dots{border-bottom:2px dotted var(--line)}.mi small{grid-column:1/-1;color:var(--mu);margin-top:-6px}',
    '.prices{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;align-items:stretch}.price-card{background:var(--card);border:1px solid var(--line);border-radius:var(--r);padding:26px;display:flex;flex-direction:column}.price-card h3{margin:0}.price-card .amt{font-size:34px;font-weight:800;margin:8px 0}.price-card ul{padding:0;list-style:none;margin:0 0 20px;flex:1;display:grid;gap:6px}.price-card li::before{content:"✓ ";color:var(--p);font-weight:800}.price-card.hot{border:2px solid var(--p)}',
    '.dls{display:grid;gap:10px;max-width:640px}.dls a{display:flex;gap:10px;align-items:center;padding:14px 16px;border:1px solid var(--line);border-radius:var(--r);text-decoration:none;background:var(--card)}',
    '.visit{display:grid;grid-template-columns:1fr 1.4fr;gap:28px;align-items:start}.hours{width:100%;border-collapse:collapse}.hours td{padding:10px 0;border-bottom:1px solid var(--line)}.hours td+td{text-align:end;font-weight:600}.map{border:0;width:100%;aspect-ratio:16/10;border-radius:var(--r)}.visit.solo{grid-template-columns:1fr}',
    '.nl{display:flex;gap:10px;max-width:520px;flex-wrap:wrap}.nl input{flex:1;min-width:200px}',
    '.f{display:grid;gap:12px;max-width:680px}.f .r2{display:grid;grid-template-columns:1fr 1fr;gap:12px}',
    '.f input,.f textarea,.f select,.nl input,.checkout input,.checkout textarea,.disc input{width:100%;padding:11px 13px;border:1px solid var(--line);border-radius:10px;font:inherit;font-size:15px;background:var(--card);color:var(--fg)}.f textarea{min-height:110px}',
    '.ft{padding:30px 0;border-top:1px solid var(--line);font-size:14px;color:var(--mu)}.ft .wrap{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}',
    '.soc{display:flex;gap:8px}.soc a{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--line);color:var(--fg)}.soc svg{width:18px;height:18px;fill:currentColor}',
    '.dr-bg{position:fixed;inset:0;background:rgba(0,0,0,.45);opacity:0;pointer-events:none;transition:.25s;z-index:40}.dr-bg.on{opacity:1;pointer-events:auto}',
    '.drawer{position:fixed;top:0;bottom:0;right:0;width:min(420px,100%);background:#fff;color:#111827;z-index:41;transform:translateX(105%);transition:transform .3s;display:flex;flex-direction:column;box-shadow:-20px 0 50px rgba(0,0,0,.2)}',
    '[dir=rtl] .drawer{right:auto;left:0;transform:translateX(-105%)}.drawer.on{transform:none!important}',
    '.dr-hd{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid #e5e7eb}.dr-hd h3{margin:0}.x{border:0;background:none;font-size:26px;cursor:pointer;color:inherit;line-height:1}',
    '.dr-items{flex:1;overflow:auto;padding:6px 20px;min-height:90px}.empty{color:#6b7280;text-align:center;padding:30px 0}',
    '.ci{display:flex;justify-content:space-between;gap:10px;padding:12px 0;border-bottom:1px solid #e5e7eb;align-items:center}.ci .mu{color:#6b7280;font-size:13px}',
    '.qty{display:flex;align-items:center;gap:6px}.qty button{width:30px;height:30px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;font-size:15px;color:#111}.qty span{min-width:20px;text-align:center;font-weight:700}',
    '.dr-ft{padding:14px 20px 18px;border-top:1px solid #e5e7eb;display:grid;gap:10px;overflow:auto;max-height:66%}',
    '.dr-sum{display:grid;gap:4px;font-size:14px}.dr-sum div{display:flex;justify-content:space-between}.dr-total{font-size:18px;font-weight:800}.disc{display:flex;gap:8px}.disc input{background:#fff;color:#111;border-color:#e5e7eb;padding:9px 11px}.disc .btn{padding:9px 14px;background:#111827}.disc-msg{font-size:13px}',
    '.checkout{display:grid;gap:8px}.checkout input,.checkout textarea{background:#fff;color:#111827;border-color:#e5e7eb}',
    '.co-btns{display:grid;gap:8px}.co-btns .btn{justify-content:center}.btn.wa{background:#25d366}.btn.em{background:#111827}.btn.pp{background:#ffc439;color:#111}',
    '.paybox{border:1px dashed #cbd5e1;border-radius:10px;padding:10px;font-size:12.5px;color:#6b7280}.clear{border:0;background:none;color:#dc2626;cursor:pointer;font:600 13px var(--font);justify-self:start;padding:0}',
    '.fl{position:fixed;bottom:20px;right:20px;display:grid;gap:10px;z-index:30}[dir=rtl] .fl{right:auto;left:20px}',
    '.fl a,.fl button{width:54px;height:54px;border-radius:50%;display:grid;place-items:center;box-shadow:0 10px 25px rgba(0,0,0,.25);border:0;cursor:pointer;color:#fff;text-decoration:none;font-weight:800}.fl svg{width:28px;height:28px;fill:#fff}',
    '.wa-float{background:#25d366}.tg{background:#229ed9}.ln{background:#06c755}.wc{background:#07c160}',
    '.to-top{position:fixed;bottom:20px;left:20px;width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--fg);cursor:pointer;z-index:30;opacity:0;pointer-events:none;transition:.25s;font-size:18px}.to-top.on{opacity:1;pointer-events:auto}[dir=rtl] .to-top{left:auto;right:20px}',
    '.ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:70;background:#111827;color:#fff;border-radius:14px;padding:14px 18px;display:none;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap;box-shadow:0 20px 40px rgba(0,0,0,.3);max-width:760px;margin:0 auto}.ck.on{display:flex}.ck .btn{padding:9px 16px}',
    '.callbar{display:none;position:fixed;left:0;right:0;bottom:0;z-index:29;background:var(--card);border-top:1px solid var(--line);padding:10px 14px;gap:10px}.callbar .btn{flex:1;justify-content:center}',
    '.toast{position:fixed;bottom:90px;left:50%;transform:translate(-50%,20px);background:#111827;color:#fff;padding:10px 18px;border-radius:12px;font-weight:600;opacity:0;transition:.25s;z-index:80;pointer-events:none}.toast.on{opacity:1;transform:translate(-50%,0)}',
    '.modal{position:fixed;inset:0;background:rgba(0,0,0,.75);display:none;place-items:center;z-index:60;padding:20px}.modal.on{display:grid}.modal .box{width:min(960px,100%);position:relative}.modal .x{position:absolute;top:-40px;right:0;color:#fff}.modal .card{text-align:center;color:var(--fg)}',
    '.sent{color:#059669;font-weight:600;font-size:14px}',
    '#gt-el{display:none}.goog-te-banner-frame,.skiptranslate>iframe{display:none!important}body{top:0!important}.goog-tooltip,.goog-text-highlight{background:none!important;box-shadow:none!important}',
    '@media (max-width:768px){.hd-in{min-height:58px;gap:10px}.nav{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;background:var(--hdbg,var(--bg));color:var(--hdfg,var(--fg));padding:10px 20px 16px;border-bottom:1px solid var(--line);box-shadow:0 10px 20px rgba(0,0,0,.08)}',
    '.nav.open{display:flex}.burger{display:grid}.logo{font-size:17px}.logo-text{max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
    '.hero{padding:44px 0}.hero-in{grid-template-columns:1fr;gap:24px}.lead{font-size:17px}.cards,.tsts,.posts,.prices,.menu{grid-template-columns:1fr}.team,.gal{grid-template-columns:1fr 1fr}.visit{grid-template-columns:1fr}',
    '.products{grid-template-columns:repeat(var(--mpcols),1fr);gap:12px}.ev{grid-template-columns:64px 1fr}.ev .btn{grid-column:1/-1}',
    '.videos{grid-template-columns:1fr}.f .r2{grid-template-columns:1fr}.sec{padding:46px 0}.lang-sel{max-width:96px}.cart-btn .ct-l{display:none}.slide{min-height:260px}.cd div{min-width:70px;padding:10px}.cd b{font-size:28px}}'
  ].join('\n');
  /* ---------------- runtime embedded into every generated site ---------------- */
  function smRuntime(C) {
    var $ = function (s, r) { return (r || document).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
    var store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }, del: function (k) { try { localStorage.removeItem(k); } catch (e) {} } };
    var CK = 'smcart_' + C.slug, LK = 'smlang_' + C.slug, D = C.dict || {}, TR = C.tr || {}, langs = C.langs || [C.lang];
    var RTL = ['ar', 'he', 'fa', 'ur', 'ps', 'sd', 'ug', 'yi', 'dv', 'ckb'];
    function base(l) { return String(l || '').split('-')[0]; }
    function pickLang(list) {
      var q = new URLSearchParams(location.search).get('lang'); if (q && list.indexOf(q) >= 0) return q;
      var s = store.get(LK); if (s && list.indexOf(s) >= 0) return s;
      var nl = navigator.languages || [navigator.language || ''];
      for (var i = 0; i < nl.length; i++) {
        var l = String(nl[i] || '').toLowerCase(), c = l.indexOf('zh') === 0 ? (/hant|tw|hk|mo/.test(l) ? 'zh-Hant' : 'zh-Hans') : l;
        for (var j = 0; j < list.length; j++) if (list[j].toLowerCase() === c) return list[j];
        for (j = 0; j < list.length; j++) if (base(list[j]).toLowerCase() === base(c)) return list[j];
      }
      return C.lang;
    }
    var lang = C.mode === 'widget' ? C.lang : pickLang(langs);
    function tx(k) { return (TR[lang] && TR[lang][k]) || (D[lang] && D[lang][k]) || (D[C.lang] && D[C.lang][k]) || (D.en && D.en[k]) || k; }
    function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
    function money(n) { n = Math.round(n * 100) / 100; return C.currency + (n % 1 ? n.toFixed(2) : String(n)); }
    var P = {}; (C.products || []).forEach(function (p) { P[p.id] = p; });
    function pname(id) { return (TR[lang] && TR[lang]['p.' + id + '.name']) || P[id].name; }
    var cart = {};
    try { cart = JSON.parse(store.get(CK) || '{}') || {}; } catch (e) { cart = {}; }
    function pid(key) { return key.split('::')[0]; }
    function popt(key) { return key.split('::')[1] || ''; }
    Object.keys(cart).forEach(function (k) { if (!P[pid(k)] || !(cart[k] > 0)) delete cart[k]; });
    var code = store.get(CK + '_code') || '';
    function save() { store.set(CK, JSON.stringify(cart)); }
    function count() { return Object.keys(cart).reduce(function (s, k) { return s + cart[k]; }, 0); }
    function subtotal() { return Object.keys(cart).reduce(function (s, k) { return s + cart[k] * P[pid(k)].price; }, 0); }
    function findCode(c) { c = String(c || '').trim().toUpperCase(); return (C.codes || []).filter(function (x) { return x.c.toUpperCase() === c; })[0]; }
    function discount() { var d = findCode(code); if (!d) return 0; var s = subtotal(); return Math.min(s, d.pct ? s * d.pct / 100 : d.amt); }
    function total() { return Math.max(0, subtotal() - discount()); }
    var tt;
    function toast(m) { var t = $('.toast'); if (!t) return; t.textContent = m; t.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { t.classList.remove('on'); }, 1800); }

    function renderCart() {
      $$('.cart-count').forEach(function (e) { e.textContent = count(); });
      var box = $('.dr-items'); if (!box) return;
      var ids = Object.keys(cart);
      box.innerHTML = ids.length ? ids.map(function (k) {
        var p = P[pid(k)], q = cart[k], o = popt(k);
        return '<div class="ci" data-id="' + esc(k) + '"><div><b>' + esc(pname(p.id)) + (o ? ' <small>(' + esc(o) + ')</small>' : '') + '</b><div class="mu">' + money(p.price) + ' × ' + q + ' = ' + money(p.price * q) + '</div></div>' +
          '<div class="qty"><button type="button" data-q="-1" aria-label="-">−</button><span>' + q + '</span><button type="button" data-q="1" aria-label="+">+</button><button type="button" data-q="rm" aria-label="' + esc(tx('x_remove')) + '">✕</button></div></div>';
      }).join('') : '<p class="empty">' + esc(tx('x_empty')) + '</p>';
      var d = discount();
      var sv = $('.sub-val'); if (sv) sv.textContent = money(subtotal());
      var dr = $('.disc-row'); if (dr) { dr.style.display = d ? '' : 'none'; $('.disc-val').textContent = '−' + money(d); }
      var tv = $('.total-val'); if (tv) tv.textContent = money(total());
      var co = $('.dr-ft'); if (co) co.style.display = ids.length ? '' : 'none';
    }
    function applyLang() {
      var h = document.documentElement; h.lang = lang; h.dir = RTL.indexOf(base(lang)) >= 0 ? 'rtl' : 'ltr';
      $$('[data-x]').forEach(function (el) { el.textContent = tx(el.getAttribute('data-x')); });
      $$('[data-xph]').forEach(function (el) { el.setAttribute('placeholder', tx(el.getAttribute('data-xph'))); });
      $$('[data-xal]').forEach(function (el) { el.setAttribute('aria-label', tx(el.getAttribute('data-xal'))); });
      $$('[data-c]').forEach(function (el) {
        if (el._o == null) el._o = el.textContent;
        var k = el.getAttribute('data-c'), v = TR[lang] && TR[lang][k];
        el.textContent = v || el._o;
      });
      if (TR[lang] && TR[lang]['seo.title']) document.title = TR[lang]['seo.title'];
      var s = $('.lang-sel'); if (s) s.value = lang;
      renderCart(); tick && tick();
    }
    function openCart(on) { var d = $('.drawer'); if (!d) return; d.classList.toggle('on', on); $('.dr-bg').classList.toggle('on', on); }

    /* lightbox */
    var gal = $$('.gal button'), gi = 0;
    function lb(i) { var b = gal[(i + gal.length) % gal.length]; gi = (i + gal.length) % gal.length; $('.lb img').src = b.getAttribute('data-src'); $('.lb p').textContent = b.textContent; $('.lb').classList.add('on'); }
    /* slideshow */
    var sl = $('.sl-track'), si = 0, sn = sl ? sl.children.length : 0, stimer;
    function go(i) { if (!sl) return; si = (i + sn) % sn; sl.style.transform = 'translateX(' + (document.documentElement.dir === 'rtl' ? si * 100 : -si * 100) + '%)'; $$('.sl-dots button').forEach(function (b, j) { b.classList.toggle('on', j === si); }); }
    function auto() { clearInterval(stimer); if (sn > 1) stimer = setInterval(function () { go(si + 1); }, 5000); }

    document.addEventListener('click', function (e) {
      var t = e.target.nodeType === 1 ? e.target : e.target.parentNode;
      var a = t.closest('[data-add]');
      if (a) {
        var id = a.getAttribute('data-add'), card = a.closest('.prod'), sel = card && card.querySelector('.popt'), key = id + (sel && sel.value ? '::' + sel.value : '');
        var p = P[id];
        if (p.stock != null && (cart[key] || 0) >= p.stock) { toast(tx('x_sold_out')); return; }
        cart[key] = (cart[key] || 0) + 1; save(); renderCart(); toast(tx('x_added'));
        var cb = $('.cart-btn'); if (cb) { cb.classList.remove('bump'); void cb.offsetWidth; cb.classList.add('bump'); } return;
      }
      var q = t.closest('[data-q]');
      if (q) { var row = q.closest('.ci'), k = row.getAttribute('data-id'), v = q.getAttribute('data-q'); if (v === 'rm') delete cart[k]; else { var pp = P[pid(k)]; if (+v > 0 && pp.stock != null && cart[k] >= pp.stock) { toast(tx('x_sold_out')); return; } cart[k] += +v; if (cart[k] <= 0) delete cart[k]; } save(); renderCart(); return; }
      if (t.closest('.cart-btn')) { openCart(true); return; }
      if (t.closest('.dr-close') || t.classList.contains('dr-bg')) { openCart(false); return; }
      if (t.closest('.clear')) { cart = {}; save(); renderCart(); return; }
      if (t.closest('.burger')) { var n = $('.nav'); n && n.classList.toggle('open'); return; }
      if (t.closest('.nav a')) { var n2 = $('.nav'); n2 && n2.classList.remove('open'); }
      var chip = t.closest('.chip');
      if (chip) { var cat = chip.getAttribute('data-cat'); $$('.chip').forEach(function (c) { c.classList.toggle('on', c === chip); }); $$('.prod').forEach(function (p) { p.classList.toggle('hide', !!cat && p.getAttribute('data-cat') !== cat); }); return; }
      var yv = t.closest('[data-yt]');
      if (yv) { $('.modal .yt').style.display = ''; $('.modal .wcbox').style.display = 'none'; $('.modal .yt iframe').src = 'https://www.youtube-nocookie.com/embed/' + yv.getAttribute('data-yt') + '?autoplay=1'; $('.modal').classList.add('on'); return; }
      if (t.closest('.wc')) { $('.modal .yt').style.display = 'none'; $('.modal .wcbox').style.display = ''; $('.modal').classList.add('on'); return; }
      if (t.closest('.wc-copy')) { var idt = $('.wc-id').textContent; (navigator.clipboard ? navigator.clipboard.writeText(idt) : Promise.reject()).then(function () { toast(tx('x_copied')); }, function () { toast(idt); }); return; }
      if (t.closest('.modal .x') || t.classList.contains('modal')) { $('.modal .yt iframe').src = 'about:blank'; $('.modal').classList.remove('on'); return; }
      var gb = t.closest('.gal button'); if (gb) { lb(gal.indexOf(gb)); return; }
      if (t.closest('.lb .pv')) { lb(gi - 1); return; } if (t.closest('.lb .nx')) { lb(gi + 1); return; }
      if (t.closest('.lb .x') || t.classList.contains('lb')) { $('.lb').classList.remove('on'); return; }
      if (t.closest('.sl-prev')) { go(si - 1); auto(); return; } if (t.closest('.sl-next')) { go(si + 1); auto(); return; }
      var dot = t.closest('.sl-dots button'); if (dot) { go(+dot.getAttribute('data-i')); auto(); return; }
      if (t.closest('.to-top')) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      if (t.closest('.dm-btn')) { var dk = !document.documentElement.classList.contains('dark'); document.documentElement.classList.toggle('dark', dk); store.set('smdark_' + C.slug, dk ? '1' : '0'); $('.dm-btn').textContent = dk ? '☀️' : '🌙'; return; }
      if (t.closest('.ann .x')) { $('.ann').remove(); store.set('smann_' + C.slug, C.annId); return; }
      if (t.closest('.ck .btn')) { $('.ck').classList.remove('on'); store.set('smck_' + C.slug, '1'); return; }
      if (t.closest('.disc .btn')) { var inp = $('.disc input'), m = $('.disc-msg'); if (findCode(inp.value)) { code = inp.value.trim(); store.set(CK + '_code', code); m.textContent = tx('x_code_ok'); m.style.color = '#059669'; } else { code = ''; store.del(CK + '_code'); m.textContent = tx('x_code_bad'); m.style.color = '#dc2626'; } renderCart(); return; }
      var co = t.closest('[data-send]');
      if (co) { e.preventDefault(); checkout(co.getAttribute('data-send')); }
    });

    /* language switcher */
    var ls = $('.lang-sel');
    if (ls) ls.addEventListener('change', function () {
      if (C.mode === 'widget') { widgetTo(ls.value); return; }
      lang = ls.value; store.set(LK, lang); applyLang();
    });
    /* Mode B: free Google Website Translator widget (zero setup, translated in the browser) */
    var gtReady = false, gtWant = null;
    function gcode(c) { return c === 'zh-Hans' ? 'zh-CN' : c === 'zh-Hant' ? 'zh-TW' : c; }
    function widgetTo(c) {
      store.set(LK, c);
      var h = document.documentElement; h.lang = c; h.dir = RTL.indexOf(base(c)) >= 0 ? 'rtl' : 'ltr';
      if (c === C.lang) { var cb0 = $('.goog-te-combo'); if (cb0) { cb0.value = gcode(C.lang); cb0.dispatchEvent(new Event('change')); } document.cookie = 'googtrans=; path=/; max-age=0'; if (gtReady) location.reload(); return; }
      var gv = '/' + gcode(C.lang) + '/' + gcode(c); document.cookie = 'googtrans=' + gv + '; path=/'; try { if (location.hostname && location.hostname.indexOf('.') > 0) document.cookie = 'googtrans=' + gv + '; path=/; domain=.' + location.hostname.replace(/^www\./, ''); } catch (e) {}
      gtWant = c; loadGT(); if (gtReady) applyGT();
    }
    function applyGT() { var cb = $('.goog-te-combo'); if (!cb || !gtWant) return setTimeout(applyGT, 300); cb.value = gcode(gtWant); cb.dispatchEvent(new Event('change', { bubbles: true })); }
    function loadGT() {
      if (window.__smgt) return; window.__smgt = 1;
      window.smGTInit = function () { new google.translate.TranslateElement({ pageLanguage: gcode(C.lang), autoDisplay: false }, 'gt-el'); gtReady = true; applyGT(); };
      var s = document.createElement('script'); s.src = 'https://translate.google.com/translate_a/element.js?cb=smGTInit'; s.async = true; document.body.appendChild(s);
    }
    if (C.mode === 'widget') {
      var want = pickLang(C.world || []);
      if (ls) ls.value = want;
      if (want !== C.lang) widgetTo(want);
    }

    function field(form, n) { var el = form.querySelector('[name=' + n + ']'); return el ? el.value.trim() : ''; }
    function orderText(f) {
      var lines = [tx('x_order') + ' — ' + C.name, ''];
      Object.keys(cart).forEach(function (k) { var p = P[pid(k)]; lines.push('• ' + p.name + (popt(k) ? ' (' + popt(k) + ')' : '') + ' × ' + cart[k] + ' = ' + money(p.price * cart[k])); });
      lines.push('');
      if (discount()) lines.push(tx('x_subtotal') + ': ' + money(subtotal()), tx('x_discount') + ' (' + code.toUpperCase() + '): −' + money(discount()));
      lines.push(tx('x_total') + ': ' + money(total()), '', tx('x_name') + ': ' + field(f, 'name'), tx('x_phone') + ': ' + field(f, 'phone'));
      if (field(f, 'address')) lines.push(tx('x_address') + ': ' + field(f, 'address'));
      if (field(f, 'note')) lines.push(tx('x_note') + ': ' + field(f, 'note'));
      return lines.join('\n');
    }
    function sendWa(text) { window.open('https://wa.me/' + C.wa + '?text=' + encodeURIComponent(text), '_blank'); }
    function sendMail(subject, text) { window.location.href = 'mailto:' + C.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text); }

    /* ===================================================================
     * PAYMENT GATEWAY PLACEHOLDER (Stripe / PayPal)
     * Today: orders go by WhatsApp / email; optional PayPal.me link for the cart total
     *   and optional per-product Stripe Payment Links (set in the builder).
     * Later: replace startOnlinePayment() with a call to YOUR backend that creates a
     *   Stripe Checkout Session or a PayPal order for the cart total.
     * =================================================================== */
    function startOnlinePayment(order) {
      if (C.paypalMe) { window.open('https://www.paypal.me/' + encodeURIComponent(C.paypalMe) + '/' + (Math.round(order.total * 100) / 100) + (C.ppCurrency || 'HKD'), '_blank'); return true; }
      return false;
    }
    function checkout(method) {
      var f = $('.checkout');
      if (!f.reportValidity() || !count()) return;
      var text = orderText(f);
      if (method === 'wa') sendWa(text);
      else if (method === 'email') sendMail(tx('x_order') + ' — ' + C.name, text);
      else if (method === 'pp') startOnlinePayment({ total: total(), text: text });
      window.__lastOrder = { method: method, text: text, total: total() };
      /* Published on the SiteMix server: also record the order in the owner's dashboard (prices are re-checked server-side). */
      if (C.orderApi && window.fetch) {
        try {
          var items = Object.keys(cart).map(function (k) { return { id: pid(k), opt: popt(k) || '', qty: cart[k] }; });
          fetch(C.orderApi, { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: items, code: code || '', method: method, name: field(f, 'name'), phone: field(f, 'phone'), address: field(f, 'address'), note: field(f, 'note') }) }).catch(function () {});
        } catch (er) {}
      }
      var s = $('.co-sent'); if (s) s.textContent = method === 'pp' ? tx('x_pp_hint') : tx('x_sent');
    }
    $$('form.f').forEach(function (f) {
      f.addEventListener('submit', function (e) {
        e.preventDefault();
        var kind = f.getAttribute('data-form'), parts = [], subject = (kind === 'booking' ? tx('x_book_req') : tx('x_contact_req')) + ' — ' + C.name;
        $$('[name]', f).forEach(function (el) { if (el.value.trim()) parts.push(tx(el.getAttribute('data-l')) + ': ' + el.value.trim()); });
        var text = subject + '\n\n' + parts.join('\n');
        window.__lastForm = { kind: kind, text: text };
        if (kind === 'booking' && C.wa) sendWa(text); else if (C.email) sendMail(subject, text); else if (C.wa) sendWa(text);
        var s = $('.sent', f); if (s) s.textContent = tx('x_sent');
      });
    });
    var nl = $('form.nl');
    if (nl) nl.addEventListener('submit', function (e) {
      var em = nl.querySelector('input[type=email]').value.trim();
      if (!nl.getAttribute('action')) { e.preventDefault(); if (C.email) sendMail(tx('x_newsletter') + ' — ' + C.name, em); }
      window.__lastNl = em; var s = $('.nl-msg'); if (s) s.textContent = tx('x_subscribed');
    });

    /* countdown */
    var cdEnd = C.countdown ? new Date(C.countdown).getTime() : 0, cdTimer;
    function tick() {
      var box = $('.cd'); if (!box || !cdEnd) return;
      var ms = Math.max(0, cdEnd - Date.now()), d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
      box.innerHTML = ms ? [[d, 'x_days'], [h, 'x_hours'], [m, 'x_mins'], [s, 'x_secs']].map(function (x) { return '<div><b>' + (x[0] < 10 ? '0' : '') + x[0] + '</b><small>' + esc(tx(x[1])) + '</small></div>'; }).join('') : '<div><b>🎉</b><small>' + esc(tx('x_ended')) + '</small></div>';
    }
    if (cdEnd) { tick(); cdTimer = setInterval(tick, 1000); }

    /* misc */
    window.addEventListener('scroll', function () { var y = window.scrollY > 40; document.body.classList.toggle('scrolled', y); var tp = $('.to-top'); if (tp) tp.classList.toggle('on', window.scrollY > 500); }, { passive: true });
    var dkS = store.get('smdark_' + C.slug);
    if ($('.dm-btn')) { var dk = dkS ? dkS === '1' : (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches && !!C.autoDark); document.documentElement.classList.toggle('dark', dk); $('.dm-btn').textContent = dk ? '☀️' : '🌙'; }
    if ($('.ann') && store.get('smann_' + C.slug) === C.annId) $('.ann').remove();
    if ($('.ck') && !store.get('smck_' + C.slug)) $('.ck').classList.add('on');
    if (sl) { var dots = $('.sl-dots'); if (dots) dots.innerHTML = Array.prototype.map.call(sl.children, function (_, i) { return '<button type="button" data-i="' + i + '" aria-label="' + (i + 1) + '"></button>'; }).join(''); go(0); auto(); }
    if (code && $('.disc input')) $('.disc input').value = code;
    applyLang();
    window.SMSITE = { cart: function () { return JSON.parse(JSON.stringify(cart)); }, total: total, subtotal: subtotal, discount: discount, lang: function () { return lang; } };
  }
  var ICONS = {
    facebook: 'M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z',
    instagram: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4zM12 2.2c3.2 0 3.6 0 4.8.1 3.2.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2z',
    x: 'M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9L.9 2.3h7l4.8 6.4 5.5-6.4zm-1.2 17.9h1.9L7.1 4.2H5.1L17 20.2z',
    youtube: 'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z',
    tiktok: 'M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.6a2.9 2.9 0 1 1-2-2.7V9.4a6.3 6.3 0 1 0 5.4 6.2V8.7a8.2 8.2 0 0 0 3.8 1V6.7z',
    wa: 'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.7-1.1-4.4-3.9-4.6-4.1-.1-.2-1.1-1.5-1.1-2.9 0-1.4.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.8-.1 1.5Z',
    tg: 'M9.8 15.3 9.4 20c.6 0 .8-.3 1.1-.6l2.7-2.6 5.6 4.1c1 .6 1.8.3 2-.9L24 3.9c.3-1.5-.6-2.1-1.6-1.7L1 10.4c-1.5.6-1.4 1.4-.3 1.8l5.5 1.7L19 5.9c.6-.4 1.1-.2.7.2z'
  };
  function svg(k) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICONS[k] + '"/></svg>'; }

  function dictFor(langs) {
    var out = {}, all = window.I18N || {};
    langs.concat(['en']).forEach(function (l) {
      if (!all[l] || out[l]) return;
      var d = {}; Object.keys(all[l]).forEach(function (k) { if (k.indexOf('x_') === 0) d[k] = all[l][k]; });
      out[l] = d;
    });
    return out;
  }
  function findTpl(list, id) { return list.filter(function (t) { return t.id === id; })[0] || list[0]; }
  function hash(s) { s = String(s); var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h; }
  function slugify(s) { var x = String(s || 'site').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); return x || 'site-' + Math.abs(hash(s)).toString(36); }
  var RTL = ['ar', 'he', 'fa', 'ur', 'ps', 'sd', 'ug', 'yi', 'dv', 'ckb'];

  /* Build the site. opts.preview -> no analytics/livechat. opts.collect -> returns {key:text} of translatable content instead of HTML. */
  function generateSite(S, opts) {
    opts = opts || {};
    var CFG = window.SITE_CONFIG || { brand: 'SiteMix' };
    var pl = S.plugins || {}, pc = S.pc || {};
    var on = function (k) { return !!pl[k]; };
    var cfgOf = function (k) { return pc[k] || {}; };
    var texts = {};
    function c(key, text) { if (text != null && String(text).trim()) texts[key] = String(text); return ' data-c="' + esc(key) + '"'; }
    function tag(t, key, text, cls) { return '<' + t + (cls ? ' class="' + cls + '"' : '') + c(key, text) + '>' + esc(text) + '</' + t + '>'; }

    var d = findTpl(DESKTOP, S.desktop), m = findTpl(MOBILE, S.mobile);
    var trOn = on('autotr');
    var AT = CFG.autoTranslate || {};
    var mode = trOn ? ((S.trMode || AT.mode) === 'api' && Object.keys(S.tr || {}).length ? 'api' : 'widget') : 'dict';
    var langs;
    if (mode === 'api') langs = [S.lang].concat((S.trLangs || []).filter(function (l) { return l !== S.lang && S.tr[l]; }));
    else langs = (on('lang') && S.langs && S.langs.length) ? S.langs.slice() : [S.lang || 'en'];
    if (langs.indexOf(S.lang) < 0) langs.unshift(S.lang);
    var WORLD = window.SM_WORLD_LANGS || [], LANGS = window.SM_LANGS || [];
    function lname(code) { var L = LANGS.filter(function (x) { return x.code === code; })[0] || WORLD.filter(function (x) { return x.code === code; })[0]; return L ? L.name : code; }

    var prods = (S.products || []).filter(function (p) { return p && p.name; });
    var cats = []; prods.forEach(function (p) { if (p.cat && cats.indexOf(p.cat) < 0) cats.push(p.cat); });
    var services = lines(S.services, 2).map(function (x) { return { t: x[0], d: x[1] }; }).filter(function (x) { return x.t; });
    var vids = String(cfgOf('video').urls || '').split(/\s+/).map(ytId).filter(Boolean);
    var wa = String(S.wa || '').replace(/\D/g, ''), email = String(S.email || '').trim();
    var shopOn = on('shop') && prods.length;
    var title = (on('seo') && S.seo && S.seo.title) || S.name, desc = (on('seo') && S.seo && S.seo.desc) || S.tagline || '';
    var lg = (S.logo || S.name || '?').trim();
    var emo = [S.emoji || '✨'].concat(prods.map(function (p) { return p.e || '✨'; }));
    function ph(i, w, h) { var hu = HUES[i % HUES.length]; return phImg(emo[i % emo.length], hu[0], hu[1], w, h); }
    function sec(id, key, inner, alt, cls) { return '<section class="sec' + (alt ? ' alt' : '') + (cls ? ' ' + cls : '') + '" id="' + id + '"><div class="wrap"><h2 data-x="' + key + '"></h2>' + inner + '</div></section>'; }

    var body = [], nav = [['#about', 'x_about']], altN = 0;
    function alt() { return (altN++ % 2) === 1; }

    /* hero */
    var heroBtns = (shopOn ? '<a class="btn" href="#shop" data-x="x_shop_now"></a>' : on('booking') ? '<a class="btn" href="#booking" data-x="x_booking"></a>' : on('menu') ? '<a class="btn" href="#menu" data-x="x_menu"></a>' : '') + (on('contact') ? '<a class="btn ghost" href="#contact" data-x="x_contact"></a>' : '');
    body.push('<section class="hero" id="top"><div class="wrap hero-in"><div class="hero-text">' + tag('p', 'logo', lg, 'eyebrow') + tag('h1', 'name', S.name) + tag('p', 'tagline', S.tagline, 'lead') + '<div class="hero-btns">' + heroBtns + '</div></div><div class="hero-art" aria-hidden="true"><span>' + esc(S.emoji || '✨') + '</span></div></div></section>');

    if (on('slideshow')) {
      var sls = lines(cfgOf('slideshow').items, 3);
      if (sls.length) body.push('<section class="slides" id="slides" aria-roledescription="carousel"><div class="sl-track">' + sls.map(function (x, i) {
        var img = safeUrl(x[2]) || ph(i + 1, 1200, 500);
        return '<div class="slide" style="background-image:url(&quot;' + esc(img) + '&quot;)"><div>' + tag('h3', 'sl.' + i + '.t', x[0]) + tag('p', 'sl.' + i + '.d', x[1]) + '</div></div>';
      }).join('') + '</div>' + (sls.length > 1 ? '<button class="sl-btn sl-prev" type="button" aria-label="prev">‹</button><button class="sl-btn sl-next" type="button" aria-label="next">›</button><div class="sl-dots"></div>' : '') + '</section>');
    }
    body.push('<section class="sec" id="about"><div class="wrap"><h2 data-x="x_about"></h2>' + tag('p', 'about', S.about, 'about') + '</div></section>'); altN = 1;
    if (services.length) { nav.push(['#services', 'x_services']); body.push(sec('services', 'x_services', '<div class="cards">' + services.map(function (s, i) { return '<div class="card">' + tag('h3', 'svc.' + i + '.t', s.t) + tag('p', 'svc.' + i + '.d', s.d) + '</div>'; }).join('') + '</div>', alt())); }

    if (on('countdown') && cfgOf('countdown').date) body.push('<section class="sec cd-sec' + (alt() ? ' alt' : '') + '" id="countdown"><div class="wrap">' + (cfgOf('countdown').title ? tag('h2', 'cd.t', cfgOf('countdown').title) : '') + '<div class="cd"></div></div></section>');

    if (on('menu')) {
      var mi = lines(cfgOf('menu').items, 4), grp = null, mh = '';
      mi.forEach(function (x, i) { if (x[0] !== grp) { grp = x[0]; mh += tag('h3', 'mn.' + i + '.s', x[0] || '—'); } mh += '<div class="mi">' + tag('span', 'mn.' + i + '.i', x[1]) + '<span class="dots"></span><b>' + esc(x[2] && !isNaN(+x[2]) ? S.currency + x[2] : x[2]) + '</b>' + (x[3] ? tag('small', 'mn.' + i + '.d', x[3]) : '') + '</div>'; });
      if (mi.length) { nav.push(['#menu', 'x_menu']); body.push(sec('menu', 'x_menu', '<div class="menu">' + mh + '</div>', alt())); }
    }

    if (shopOn) {
      nav.push(['#shop', 'x_shop']);
      var sh = '';
      if (cats.length > 1) sh += '<div class="chips"><button class="chip on" type="button" data-cat="" data-x="x_all"></button>' + cats.map(function (ct, i) { return '<button class="chip" type="button" data-cat="' + esc(ct) + '"' + c('cat.' + i, ct) + '>' + esc(ct) + '</button>'; }).join('') + '</div>';
      sh += '<div class="products">' + prods.map(function (p) {
        var img = safeUrl(p.img), y = ytId(p.yt), st = on('paybuttons') && /^https:\/\//i.test(p.stripe || '') ? p.stripe : '';
        var tracked = on('stock') && p.stock !== '' && p.stock != null && !isNaN(+p.stock), n = +p.stock;
        var opts = on('variants') ? String(p.opts || '').split(',').map(function (o) { return o.trim(); }).filter(Boolean) : [];
        var badge = tracked ? (n <= 0 ? '<span class="stock out" data-x="x_sold_out"></span>' : n <= 5 ? '<span class="stock low">' + '<span data-x="x_low_stock"></span> ' + n + '</span>' : '<span class="stock" data-x="x_in_stock"></span>') : '';
        return '<article class="prod" data-cat="' + esc(p.cat || '') + '">' + badge + '<div class="pimg">' + (img ? '<img src="' + esc(img) + '" alt="' + esc(p.name) + '" loading="lazy">' : '<span aria-hidden="true">' + esc(p.e || Array.from(p.name)[0]) + '</span>') + '</div>' +
          '<div class="pbody">' + (p.cat ? '<span class="pcat"' + c('p.' + p.id + '.cat', p.cat) + '>' + esc(p.cat) + '</span>' : '') + tag('h3', 'p.' + p.id + '.name', p.name, 'pname') + (p.desc ? tag('p', 'p.' + p.id + '.desc', p.desc, 'pdesc') : '<p class="pdesc"></p>') +
          (opts.length ? '<select class="popt" data-xal="x_option">' + opts.map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select>' : '') +
          ((y || st) ? '<div class="pextra">' + (y ? '<button class="mini" type="button" data-yt="' + y + '">▶ <span data-x="x_watch"></span></button>' : '') + (st ? '<a class="mini" href="' + esc(st) + '" target="_blank" rel="noopener">💳 <span data-x="x_pay_card"></span></a>' : '') + '</div>' : '') +
          '<div class="prow"><span class="price">' + esc(S.currency || '') + esc(+p.price || 0) + '</span><button class="btn add" type="button" data-add="' + esc(p.id) + '" data-x="x_add"' + (tracked && n <= 0 ? ' disabled' : '') + '></button></div></div></article>';
      }).join('') + '</div>';
      body.push(sec('shop', 'x_shop', sh, alt()));
    }
    if (on('pricing')) {
      var pr = lines(cfgOf('pricing').items, 4);
      if (pr.length) body.push(sec('pricing', 'x_pricing', '<div class="prices">' + pr.map(function (x, i) {
        return '<div class="price-card' + (i === 1 ? ' hot' : '') + '">' + tag('h3', 'pr.' + i + '.n', x[0]) + '<div class="amt">' + esc(x[1] && !isNaN(+x[1]) ? S.currency + x[1] : x[1]) + '</div><ul>' + x[2].split(';').filter(Boolean).map(function (f, j) { return tag('li', 'pr.' + i + '.f' + j, f.trim()); }).join('') + '</ul><a class="btn" href="' + esc(linkUrl(x[3]) || '#contact') + '" data-x="x_select_plan"></a></div>';
      }).join('') + '</div>', alt()));
    }
    if (on('gallery')) {
      var gl = lines(cfgOf('gallery').items, 2);
      if (gl.length) { nav.push(['#gallery', 'x_gallery']); body.push(sec('gallery', 'x_gallery', '<div class="gal">' + gl.map(function (x, i) { var src = safeUrl(x[0]) || ph(i, 800, 600); return '<button type="button" data-src="' + esc(src) + '"><img src="' + esc(src) + '" alt="' + esc(x[1]) + '" loading="lazy">' + (x[1] ? tag('span', 'gl.' + i, x[1]) : '') + '</button>'; }).join('') + '</div>', alt())); }
    }
    if (on('video') && vids.length) body.push(sec('videos', 'x_videos', '<div class="videos' + (vids.length === 1 ? ' one' : '') + '">' + vids.map(function (id) { return ytEmbed(id, S.name); }).join('') + '</div>', alt()));
    if (on('testimonials')) {
      var ts = lines(cfgOf('testimonials').items, 3);
      if (ts.length) body.push(sec('testimonials', 'x_testimonials', '<div class="tsts">' + ts.map(function (x, i) { var r = Math.max(0, Math.min(5, parseInt(x[2], 10) || 5)); return '<figure class="tst"><div class="stars" aria-label="' + r + '/5">' + '★★★★★'.slice(0, r) + '☆☆☆☆☆'.slice(0, 5 - r) + '</div><blockquote' + c('ts.' + i, x[1]) + '>' + esc(x[1]) + '</blockquote><figcaption>— ' + esc(x[0]) + '</figcaption></figure>'; }).join('') + '</div>', alt()));
    }
    if (on('team')) {
      var tm = lines(cfgOf('team').items, 3);
      if (tm.length) body.push(sec('team', 'x_team', '<div class="team">' + tm.map(function (x, i) { var im = safeUrl(x[2]); return '<div class="member"><div class="av">' + (im ? '<img src="' + esc(im) + '" alt="' + esc(x[0]) + '" loading="lazy">' : esc(Array.from(x[0] || '?')[0])) + '</div><b>' + esc(x[0]) + '</b>' + tag('small', 'tm.' + i, x[1]) + '</div>'; }).join('') + '</div>', alt()));
    }
    if (on('events')) {
      var evs = lines(cfgOf('events').items, 4);
      if (evs.length) { nav.push(['#events', 'x_events']); body.push(sec('events', 'x_events', '<div class="evs">' + evs.map(function (x, i) { var dt = new Date(x[0]); var ok = !isNaN(dt); return '<div class="ev"><div class="ev-d">' + (ok ? '<b>' + dt.getDate() + '</b>' + (dt.getMonth() + 1) + '/' + String(dt.getFullYear()).slice(2) : esc(x[0])) + '</div><div>' + tag('h3', 'ev.' + i + '.t', x[1]) + (x[2] ? '<small>📍 <span' + c('ev.' + i + '.p', x[2]) + '>' + esc(x[2]) + '</span></small>' : '') + '</div>' + (linkUrl(x[3]) ? '<a class="btn ghost" href="' + esc(linkUrl(x[3])) + '" target="_blank" rel="noopener" data-x="x_details"></a>' : '') + '</div>'; }).join('') + '</div>', alt())); }
    }
    if (on('blog')) {
      var bp = lines(cfgOf('blog').items, 4);
      if (bp.length) { nav.push(['#blog', 'x_blog']); body.push(sec('blog', 'x_blog', '<div class="posts">' + bp.map(function (x, i) { return '<article class="post"><time>' + esc(x[1]) + '</time>' + tag('h3', 'bp.' + i + '.t', x[0]) + tag('p', 'bp.' + i + '.s', x[2]) + (linkUrl(x[3]) ? '<a href="' + esc(linkUrl(x[3])) + '" data-x="x_read_more"></a>' : '') + '</article>'; }).join('') + '</div>', alt())); }
    }
    if (on('faq')) {
      var fq = lines(cfgOf('faq').items, 2);
      if (fq.length) body.push(sec('faq', 'x_faq', '<div class="faqs">' + fq.map(function (x, i) { return '<details' + (i ? '' : ' open') + '>' + tag('summary', 'fq.' + i + '.q', x[0]) + tag('p', 'fq.' + i + '.a', x[1]) + '</details>'; }).join('') + '</div>', alt()));
    }
    if (on('downloads')) {
      var dl = lines(cfgOf('downloads').items, 2).filter(function (x) { return safeUrl(x[1]); });
      if (dl.length) body.push(sec('downloads', 'x_downloads', '<div class="dls">' + dl.map(function (x, i) { return '<a href="' + esc(safeUrl(x[1])) + '" target="_blank" rel="noopener" download>📎 <span' + c('dl.' + i, x[0]) + '>' + esc(x[0]) + '</span></a>'; }).join('') + '</div>', alt()));
    }
    var hrs = on('hours') ? lines(cfgOf('hours').items, 2) : [], addr = on('map') ? String(cfgOf('map').address || '').trim() : '';
    if (hrs.length || addr) {
      body.push(sec('visit', hrs.length ? 'x_open_hours' : 'x_location', '<div class="visit' + (hrs.length && addr ? '' : ' solo') + '">' + (hrs.length ? '<table class="hours">' + hrs.map(function (x, i) { return '<tr><td' + c('hr.' + i, x[0]) + '>' + esc(x[0]) + '</td><td>' + esc(x[1]) + '</td></tr>'; }).join('') + '</table>' : '') +
        (addr ? '<div><iframe class="map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="map" src="https://www.google.com/maps?q=' + encodeURIComponent(addr) + '&amp;output=embed"></iframe><p>📍 ' + esc(addr) + ' · <a href="https://www.google.com/maps/search/?api=1&amp;query=' + encodeURIComponent(addr) + '" target="_blank" rel="noopener" data-x="x_open_map"></a></p></div>' : '') + '</div>', alt()));
    }
    if (on('booking')) {
      nav.push(['#booking', 'x_booking']);
      var opt = services.map(function (s) { return '<option>' + esc(s.t) + '</option>'; }).join('');
      body.push(sec('booking', 'x_booking', '<form class="f" data-form="booking"><div class="r2"><input name="name" required data-l="x_name" data-xph="x_name"><input name="phone" type="tel" required data-l="x_phone" data-xph="x_phone"></div>' +
        '<div class="r2"><input name="date" type="date" required data-l="x_date" aria-label="date"><input name="time" type="time" data-l="x_time" aria-label="time"></div>' + (opt ? '<select name="service" data-l="x_service" aria-label="service">' + opt + '</select>' : '') +
        '<textarea name="note" data-l="x_note" data-xph="x_note"></textarea><div><button class="btn" type="submit" data-x="x_book_btn"></button> <span class="sent"></span></div></form>', alt()));
    }
    if (on('contact')) {
      nav.push(['#contact', 'x_contact']);
      body.push(sec('contact', 'x_contact', '<form class="f" data-form="contact"><div class="r2"><input name="name" required data-l="x_name" data-xph="x_name"><input name="email" type="email" required data-l="x_email" data-xph="x_email"></div>' +
        '<textarea name="message" required data-l="x_msg" data-xph="x_msg"></textarea><div><button class="btn" type="submit" data-x="x_send"></button> <span class="sent"></span></div>' + (email ? '<p style="margin:0;color:var(--mu)">✉️ <a href="mailto:' + esc(email) + '">' + esc(email) + '</a></p>' : '') + '</form>', alt()));
    }
    if (on('newsletter')) {
      var nlc = cfgOf('newsletter'), act = /^https:\/\//i.test(nlc.action || '') ? nlc.action : '';
      body.push(sec('newsletter', 'x_newsletter', '<p class="sub" data-x="x_nl_sub"></p><form class="nl"' + (act ? ' action="' + esc(act) + '" method="post" target="_blank"' : '') + '><input type="email" name="' + esc((nlc.fieldname || 'EMAIL').replace(/[^\w-]/g, '')) + '" required data-xph="x_email"><button class="btn" type="submit" data-x="x_subscribe"></button></form><p class="sent nl-msg"></p>', alt()));
    }

    /* social footer */
    var soc = on('social') ? ['facebook', 'instagram', 'x', 'youtube', 'tiktok'].filter(function (k) { return /^https:\/\//i.test(cfgOf('social')[k] || ''); }) : [];
    body.push('<footer class="ft"><div class="wrap"><span>© ' + new Date().getFullYear() + ' ' + esc(S.name) + '</span>' + (soc.length ? '<div class="soc">' + soc.map(function (k) { return '<a href="' + esc(cfgOf('social')[k]) + '" target="_blank" rel="noopener" aria-label="' + k + '">' + svg(k) + '</a>'; }).join('') + '</div>' : '') + '</div></footer>');

    /* collect mode for translation */
    if (opts.collect) {
      if (on('seo') && S.seo) { if (S.seo.title) texts['seo.title'] = S.seo.title; if (S.seo.desc) texts['seo.desc'] = S.seo.desc; }
      if (on('announce') && cfgOf('announce').text) texts['ann'] = cfgOf('announce').text;
      if (on('cookie') && cfgOf('cookie').text) texts['ck'] = cfgOf('cookie').text;
      return texts;
    }

    /* ---------- assemble ---------- */
    var h = [];
    h.push('<!doctype html>\n<html lang="' + esc(S.lang) + '" dir="' + (RTL.indexOf(String(S.lang).split('-')[0]) >= 0 ? 'rtl' : 'ltr') + '">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">');
    h.push('<title>' + esc(title) + '</title>\n<meta name="description" content="' + esc(desc) + '">');
    if (on('seo') && S.seo) {
      if (S.seo.kw) h.push('<meta name="keywords" content="' + esc(S.seo.kw) + '">');
      h.push('<meta property="og:type" content="website">\n<meta property="og:title" content="' + esc(title) + '">\n<meta property="og:description" content="' + esc(desc) + '">');
      if (safeUrl(S.seo.og)) h.push('<meta property="og:image" content="' + esc(safeUrl(S.seo.og)) + '">');
      h.push('<meta name="twitter:card" content="summary_large_image">');
      var su = /^https?:\/\//i.test(S.seo.url || '') ? S.seo.url.replace(/[?#].*$/, '') : '';
      if (su) {
        h.push('<link rel="canonical" href="' + esc(su) + '">');
        if (mode !== 'widget' && langs.length > 1) { langs.forEach(function (l) { h.push('<link rel="alternate" hreflang="' + esc(l) + '" href="' + esc(su + '?lang=' + l) + '">'); }); h.push('<link rel="alternate" hreflang="x-default" href="' + esc(su) + '">'); }
      }
    }
    h.push('<style>\n' + BASE_CSS + '\n:root{--p:' + hex(S.primary, '#5b4bff') + ';--a:' + hex(S.accent, '#00b8d9') + '}\n' +
      '/* Desktop template: ' + d.name + ' */\n@media (min-width:769px){' + tplCss(d, DT) + '}\n/* Mobile template: ' + m.name + ' */\n@media (max-width:768px){' + tplCss(m, MT) + '}\n</style>');
    if (on('analytics') && S.analytics && !opts.preview) h.push('<!-- Analytics snippet (added in builder) -->\n' + S.analytics);
    h.push('</head>\n<body class="tpl-' + d.id + ' tpl-' + m.id + '">');
    if (on('announce') && cfgOf('announce').text) { var al = linkUrl(cfgOf('announce').link); h.push('<div class="ann" role="note">' + (al ? '<a href="' + esc(al) + '"' + c('ann', cfgOf('announce').text) + '>' + esc(cfgOf('announce').text) + '</a>' : '<span' + c('ann', cfgOf('announce').text) + '>' + esc(cfgOf('announce').text) + '</span>') + '<button class="x" type="button" aria-label="close">×</button></div>'); }
    var swList = mode === 'widget' ? WORLD.map(function (x) { return x.code; }) : langs;
    h.push('<header class="hd"><div class="wrap hd-in"><a class="logo" href="#top"><span class="logo-mark">' + esc(Array.from(lg)[0] || '?') + '</span><span class="logo-text"' + c('logo', lg) + '>' + esc(lg) + '</span></a>');
    h.push('<nav class="nav">' + nav.slice(0, 7).map(function (n) { return '<a href="' + n[0] + '" data-x="' + n[1] + '"></a>'; }).join('') + '</nav><div class="hd-tools">');
    if ((on('lang') || trOn) && swList.length > 1) h.push('<select class="lang-sel notranslate" translate="no" aria-label="Language">' + swList.map(function (cd) { return '<option value="' + esc(cd) + '">' + esc(lname(cd)) + '</option>'; }).join('') + '</select>');
    if (on('darkmode')) h.push('<button class="dm-btn" type="button" aria-label="dark mode" data-xal="x_dark">🌙</button>');
    if (shopOn) h.push('<button class="cart-btn" type="button" data-xal="x_cart">🛒 <span class="ct-l" data-x="x_cart"></span><span class="cart-count">0</span></button>');
    h.push('<button class="burger" type="button" aria-label="Menu">☰</button></div></div></header>');
    h.push('<main>' + body.slice(0, -1).join('\n') + '</main>' + body[body.length - 1]);

    if (shopOn) {
      h.push('<div class="dr-bg"></div><aside class="drawer" aria-label="cart"><div class="dr-hd"><h3 data-x="x_cart"></h3><button class="x dr-close" type="button" aria-label="close">×</button></div><div class="dr-items"></div>' +
        '<div class="dr-ft"><div class="dr-sum"><div><span data-x="x_subtotal"></span><span class="sub-val"></span></div><div class="disc-row" style="display:none"><span data-x="x_discount"></span><span class="disc-val"></span></div><div class="dr-total"><span data-x="x_total"></span><span class="total-val"></span></div></div>' +
        (on('discount') ? '<div class="disc"><input data-xph="x_discount_code" aria-label="code"><button class="btn" type="button" data-x="x_apply"></button></div><span class="disc-msg"></span>' : '') +
        '<button class="clear" type="button" data-x="x_clear"></button>' +
        '<form class="checkout" onsubmit="return false"><input name="name" required data-xph="x_name"><input name="phone" type="tel" required data-xph="x_phone"><input name="address" data-xph="x_address"><textarea name="note" rows="2" data-xph="x_note"></textarea>' +
        '<div class="co-btns">' + (wa ? '<button class="btn wa" type="button" data-send="wa" data-x="x_send_wa"></button>' : '') + (email ? '<button class="btn em" type="button" data-send="email" data-x="x_send_email"></button>' : '') +
        (on('paybuttons') && S.paypalMe ? '<button class="btn pp" type="button" data-send="pp" data-x="x_pay_paypal"></button>' : '') + '</div>' +
        (!wa && !email && !(on('paybuttons') && S.paypalMe) ? '<p class="paybox" data-x="x_no_method"></p>' : '') +
        '<!-- PAYMENT GATEWAY PLACEHOLDER: Stripe Checkout / PayPal Smart Buttons for the whole cart go here (needs a backend). See startOnlinePayment() -->' +
        '<div class="paybox">💳 <span data-x="x_pay_soon"></span></div><span class="sent co-sent"></span></form></div></aside>');
    }
    var mc = cfgOf('messengers'), wcid = on('messengers') ? String(mc.wechat || '').trim() : '';
    h.push('<div class="modal" role="dialog"><div class="box"><button class="x" type="button" aria-label="close">×</button><div class="yt"><iframe src="about:blank" title="video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>' +
      (wcid ? '<div class="card wcbox" style="display:none;max-width:360px;margin:0 auto"><h3>WeChat</h3><p><span data-x="x_wechat_id"></span>: <b class="wc-id">' + esc(wcid) + '</b></p><button class="btn wc-copy" type="button" data-x="x_copy"></button></div>' : '<div class="wcbox" style="display:none"></div>') + '</div></div>');
    if (on('gallery')) h.push('<div class="lb" role="dialog"><button class="x" type="button" aria-label="close">×</button><button class="nv pv" type="button" aria-label="prev">‹</button><div><img alt=""><p></p></div><button class="nv nx" type="button" aria-label="next">›</button></div>');
    var fl = [];
    if (on('whatsapp') && wa) fl.push('<a class="wa-float" href="https://wa.me/' + wa + '" target="_blank" rel="noopener" data-xal="x_chat">' + svg('wa') + '</a>');
    if (on('messengers')) {
      var tgu = String(mc.telegram || '').replace(/^@|https?:\/\/t\.me\//g, '').replace(/[^\w]/g, '');
      if (tgu) fl.push('<a class="tg" href="https://t.me/' + esc(tgu) + '" target="_blank" rel="noopener" aria-label="Telegram">' + svg('tg') + '</a>');
      var lnu = String(mc.line || '').trim(); if (lnu) fl.push('<a class="ln" href="' + esc(/^https:\/\//.test(lnu) ? lnu : 'https://line.me/R/ti/p/' + encodeURIComponent(lnu)) + '" target="_blank" rel="noopener" aria-label="LINE">LINE</a>');
      if (wcid) fl.push('<button class="wc" type="button" aria-label="WeChat">微信</button>');
    }
    if (fl.length) h.push('<div class="fl">' + fl.join('') + '</div>');
    if (on('totop')) h.push('<button class="to-top" type="button" data-xal="x_top">↑</button>');
    if (on('cookie')) h.push('<div class="ck" role="dialog"><span' + c('ck', cfgOf('cookie').text || ' ') + '>' + esc(cfgOf('cookie').text || '') + '</span><button class="btn" type="button" data-x="x_accept"></button></div>');
    if (on('booking') || on('contact')) h.push('<div class="callbar">' + (on('booking') ? '<a class="btn" href="#booking" data-x="x_booking"></a>' : '') + (on('contact') ? '<a class="btn ghost" href="#contact" data-x="x_contact"></a>' : '') + '</div>');
    if (mode === 'widget') h.push('<div id="gt-el"></div>');
    h.push('<div class="toast" role="status"></div>');

    var codes = on('discount') ? lines(cfgOf('discount').codes, 2).map(function (x) { var v = x[1].replace(/\s/g, ''); return /%$/.test(v) ? { c: x[0], pct: parseFloat(v) || 0 } : { c: x[0], amt: parseFloat(v) || 0 }; }).filter(function (x) { return x.c; }) : [];
    var cdate = on('countdown') && cfgOf('countdown').date ? new Date(cfgOf('countdown').date).toISOString() : '';
    var dictLangs = mode === 'widget' ? [S.lang] : langs;
    var cfg = { slug: slugify(S.name), name: S.name, currency: S.currency || '',
      products: prods.map(function (p) { var tr = on('stock') && p.stock !== '' && p.stock != null && !isNaN(+p.stock); return { id: p.id, name: p.name, price: +p.price || 0, stock: tr ? Math.max(0, +p.stock) : null }; }),
      wa: wa, email: email, paypalMe: on('paybuttons') ? String(S.paypalMe || '').replace(/^https?:\/\/(www\.)?paypal\.me\//i, '').replace(/[^\w.-]/g, '') : '', ppCurrency: (S.currency || '').indexOf('HK') >= 0 ? 'HKD' : 'USD',
      lang: S.lang, langs: langs, mode: mode, world: mode === 'widget' ? swList : null, dict: dictFor(dictLangs), tr: mode === 'api' ? cleanTr(S.tr, langs) : {},
      codes: codes, countdown: cdate, orderApi: opts.preview ? '' : (opts.orderApi || ''), annId: String(hash(cfgOf('announce').text || '')) };
    var json = JSON.stringify(cfg).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
    h.push('<script>\n/* Site runtime generated by ' + esc(CFG.brand) + ' — cart, checkout, plugins, languages */\n(' + smRuntime.toString() + ')(' + json + ');\n</script>');
    if (on('livechat') && cfgOf('livechat').snippet && !opts.preview) h.push('<!-- Live chat embed (added in builder) -->\n' + cfgOf('livechat').snippet);
    h.push('</body>\n</html>');
    return h.join('\n');
  }
  function cleanTr(tr, langs) { var o = {}; langs.forEach(function (l) { if (!tr[l]) return; o[l] = {}; Object.keys(tr[l]).forEach(function (k) { if (k.indexOf('__') !== 0 && typeof tr[l][k] === 'string' && tr[l][k]) o[l][k] = tr[l][k]; }); }); return o; }
  function collectTexts(S) { return generateSite(S, { collect: true }); }

  window.SM_TPL = { CATS: CATS, STYLES: STYLES, DESKTOP: DESKTOP, MOBILE: MOBILE, sampleState: sampleState, generateSite: generateSite, collectTexts: collectTexts, ytId: ytId, slugify: slugify, esc: esc, RTL: RTL };
})();
