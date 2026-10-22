/* =========================================================
 * SiteMix — 全站設定（改品牌名只需改呢度）
 * Global config: rename the brand in ONE place here.
 * ========================================================= */
window.SITE_CONFIG = {
  brand: 'SiteMix',                 // 品牌名 Brand name
  logoMark: 'S',                    // Logo 圖示字母 Logo mark letter
  platformDomain: 'sitemix.example',// 平台網域（佔位）Platform domain (placeholder)
  contactEmail: 'hello@example.com',// 聯絡電郵（佔位）Contact email (placeholder)
  defaultLang: 'zh-Hant',           // 預設語言 Default UI language
  apiBase: '',                      // SiteMix 後台網址；同一個網域就留空 '' API base URL (leave '' when served by the SiteMix server)
  year: new Date().getFullYear(),
  /* 建議價（可隨時改）Suggested monthly prices — 2 paid plans, monthly billing only, first month = paid-upfront trial month — edit freely */
  pricing: {
    currency: 'HK$',
    plans: [
      { id: 'pro',  name: 'Pro',      monthly: 68,
        features: ['pf_trial', 'pf_sites3', 'pf_own_domain', 'pf_basic_plugins', 'pf_autotr_free', 'pf_templates', 'pf_export'] },
      { id: 'biz',  name: 'Business', monthly: 198, popular: true,
        features: ['pf_trial', 'pf_sites10', 'pr_everything_pro', 'pf_shop', 'pf_booking', 'pf_multilang', 'pf_cloud_tr'] }
    ]
    },
  /* =========================================================
   * 收月費設定（Stripe 信用卡 + PayPal）— 填好就會生效
   * Subscription payments — paste your own values here.
   * 留空 = 按鈕會顯示「未設定」提示。Empty = button shows "not configured yet".
   * ========================================================= */
  payments: {
    stripe: {
      // Stripe Payment Link（每月自動續費）網址，例如 'https://buy.stripe.com/xxxxxxxx'
      paymentLinks: {
        pro: '',   // ← 貼上 Pro HK$68/月 Payment Link
        biz: ''    // ← 貼上 Business HK$198/月 Payment Link
      }
    },
    paypal: {
      clientId: '',      // ← 貼上 PayPal REST App 嘅 Client ID（Live）
      currency: 'HKD',
      planIds: {
        pro: '',   // ← 貼上 PayPal 訂閱計劃 Plan ID，例如 'P-XXXXXXXXXXXXXXXXXXXXXXXX'
        biz: ''
      }
    }
    },
  /* =========================================================
   * 登入設定（Firebase Authentication）— Google / Facebook / X / 電郵
   * Sign-in config. Paste your Firebase web app config here.
   * 全部留空 = 未設定：登入按鈕會顯示提示，並可用「示範模式」試玩。
   * Empty = not configured: buttons show a notice + local demo mode.
   * ========================================================= */
  firebase: {
    apiKey: '',            // ← Firebase 專案設定 > 一般 > 你的應用程式 > SDK 設定
    authDomain: '',        // 例如 'your-project.firebaseapp.com'
    projectId: '',
    appId: ''
  },
  firebaseSdkVersion: '10.12.2', // Firebase JS SDK 版本（由 gstatic CDN 載入）
  authProviders: { google: true, facebook: true, x: true, email: true }, // 想隱藏某個登入方式就改做 false
  /* =========================================================
   * 客人網站自動翻譯（只用 Google）Auto-translate for customers' exported sites (Google only)
   * mode 'api'    = A：Google Cloud Translation API 喺建站時預先翻譯（需要 API Key）
   * mode 'widget' = B：免設定，喺網站嵌入免費 Google 網站翻譯小工具（瀏覽器即時翻譯）
   * googleApiKey 留空時，A 模式會停用，自動用 B。
   * ========================================================= */
  autoTranslate: {
    mode: 'widget',       // 預設 'widget'（免費 Google 翻譯小工具）；'api' = Google Cloud Translation（Business 方案）
    googleApiKey: '',     // ← 貼上 Google Cloud Translation API Key（記得限制 HTTP referrer + 只限 Cloud Translation API）
    mock: false           // 測試用：true = 唔連網，用假翻譯 "[xx] 文字" 試流程
  }
};
