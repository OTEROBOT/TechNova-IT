/**
 * ============================================================================
 * TechNova — Minimal Luxury Digital Showroom (app.js)
 * "Technology, refined." — Production-Ready SPA Engine v3.0
 * Light & Dark Mode | i18n Bilingual | 60FPS Performance | Zero-Bug Policy
 * ============================================================================
 */

// ============================================================================
// 1. I18N BILINGUAL DICTIONARY (TH / EN)
// ============================================================================
const i18n = {
  th: {
    brandTagline: 'ที่สุดแห่งนวัตกรรมเทคโนโลยีระดับพรีเมียม',
    navStore: 'ร้านค้า',
    navGaming: 'เกมมิ่ง',
    navPC: 'ชิ้นส่วนคอมพิวเตอร์',
    navLaptops: 'แล็ปท็อป',
    navDisplays: 'จอมอนิเตอร์',
    navPeripherals: 'อุปกรณ์เกมมิ่งเกียร์',
    navStorage: 'หน่วยความจำ SSD',
    navNetworking: 'อุปกรณ์เน็ตเวิร์ก',
    navAccessories: 'อุปกรณ์เสริม',
    navAllStore: 'สินค้าทั้งหมด',
    searchPlaceholder: 'ค้นหาสินค้า, ซิลิคอน, สเปก, หมวดหมู่...',
    cancel: 'ยกเลิก',
    popularShowcase: 'ฮาร์ดแวร์ยอดนิยม',
    shoppingBag: 'ถุงสินค้าของคุณ',
    bagEmptyTitle: 'ยังไม่มีสินค้าในถุง',
    bagEmptyDesc: 'เลือกชมนวัตกรรมฮาร์ดแวร์ระดับเรือธงของเราในโชว์รูม',
    exploreStore: 'เข้าสู่ร้านค้า',
    subtotal: 'ยอดรวมสินค้า',
    freeShipping: 'จัดส่งฟรีแบบ White-Glove 24H Courier ทุกออเดอร์',
    proceedCheckout: 'ดำเนินการสั่งซื้อและชำระเงิน',
    addToBag: 'เพิ่มลงตะกร้า',
    shareFacebook: 'แชร์ไป Facebook',
    buyNow: 'ซื้อทันที',
    inStock: 'มีสินค้าพร้อมส่ง',
    lowStock: 'เหลือเพียง {n} ชิ้นสุดท้าย',
    specialOrder: 'สั่งผลิตพิเศษ',
    verifiedReviews: 'รีวิวจากลูกค้าที่ยืนยันแล้ว',
    warranty2y: 'รับประกันศูนย์ 2 ปีเต็ม (เปลี่ยนตัวใหม่)',
    courier24h: 'จัดส่งด่วนพิเศษ 24 ชม. พร้อมประกันภัย',
    vipConcierge: 'ผู้เชี่ยวชาญดูแลระบบตลอด 24 ชม.',
    specsMatrix: 'ข้อมูลสเปกทางเทคนิค (Technical Specifications)',
    featuredHeading: 'สินค้าแนะนำ & สินค้าขายดี',
    featuredSub: 'คัดสรรสุดยอดฮาร์ดแวร์ระดับเรือธงที่ได้รับความนิยมสูงสุด',
    exploreDomain: 'สำรวจหมวดหมู่นี้',
    allCollections: 'สินค้าทั้งหมด',
    showroom: 'โชว์รูมสินค้า',
    experience: 'บริการและประสบการณ์',
    curatedWishlist: 'รายการที่อยากได้ (Wishlist)',
    orderTracking: 'ประวัติคำสั่งซื้อ',
    personalAccount: 'ข้อมูลบัญชีผู้ใช้',
    clientSignIn: 'เข้าสู่ระบบลูกค้า',
    register: 'สมัครสมาชิก',
    concierge: 'แผนกบริการลูกค้า VIP',
    conciergeText: 'สำหรับคำปรึกษาจัดสเปกคอมพิวเตอร์ระดับสูง ระบบ Liquid Cooling และบริการช่วยเหลือพิเศษ ติดต่อผู้เชี่ยวชาญได้ตลอด 24 ชม.',
    footerBio: 'โชว์รูมและศูนย์รวมนวัตกรรมเทคโนโลยีคอมพิวเตอร์ระดับไฮเอนด์ มุ่งมั่นคัดสรรฮาร์ดแวร์ที่ดีที่สุดเพื่อคุณ',
    cookieTitle: '🔒 ความเป็นส่วนตัวและคุกกี้ (PDPA & Cookies):',
    cookieDesc: 'เราใช้คุกกี้เพื่อมอบประสบการณ์การเลือกซื้อเทคโนโลยีที่ดีที่สุด วิเคราะห์ข้อมูล และนำเสนอโปรโมชันที่ตรงใจคุณ',
    accept: 'ยอมรับ / Accept',
    helloUser: 'สวัสดีคุณ {name}',
    signInPrompt: 'เข้าสู่ระบบ',
    promoTag: '⚡ MID-YEAR TECHNOVA GALA — ลดสูงสุด 30% พร้อมโค้ด "TECHNOVA"',
    heroTitle: 'Technology, refined.',
    heroSub: 'สัมผัสประสบการณ์เทคโนโลยีระดับโลก ออกแบบมาเพื่อประสิทธิภาพ ความแม่นยำ และความเป็นไปได้ที่ไร้ขีดจำกัด',
    shopNowBtn: 'เลือกซื้อสินค้าเลย',
    exploreGamingBtn: 'ดูเกมมิ่งริกส์',
    orderSuccessTitle: '🎉 สั่งซื้อและชำระเงินสำเร็จแล้ว!',
    orderSuccessDesc: 'ขอบคุณที่ไว้วางใจ TechNova คำสั่งซื้อของคุณได้รับการยืนยันและกำลังเตรียมจัดส่งด่วน',
    viewMyOrders: 'ดูประวัติคำสั่งซื้อ',
    continueShopping: 'เลือกซื้อสินค้าต่อ',
    wizardBadge: 'ระบบช่วยเลือกสินค้าอัจฉริยะ (RECOMMENDATION WIZARD)',
    wizardTitle: 'ไม่รู้จะเลือกอะไรดี? ให้เราช่วยแนะนำสินค้าที่เหมาะกับคุณ',
    wizardSub: 'ตอบคำถามสั้นๆ 3 ข้อ แล้วระบบจะค้นหาฮาร์ดแวร์และสเปกที่ตอบโจทย์ความต้องการและงบประมาณของคุณมากที่สุด',
    wizardStep1: '1. วัตถุประสงค์การใช้งาน',
    wizardStep2: '2. งบประมาณที่ตั้งไว้',
    wizardStep3: '3. ขนาด & รูปแบบการใช้งาน',
    wizardOptGaming: 'เล่นเกมหนักๆ / VR / สตรีมมิ่ง 4K',
    wizardOptCreative: 'ทำงานกราฟิก 3D / ตัดต่อวิดีโอ 8K',
    wizardOptPortable: 'พกพาเรียน / ทำงาน / ธุรกิจ',
    wizardOptCustom: 'จัดโต๊ะคอม / คีย์บอร์ด Custom',
    wizardOptBudgetLow: 'ไม่เกิน 30,000 บาท',
    wizardOptBudgetMid: '30,000 - 60,000 บาท',
    wizardOptBudgetHigh: 'ไม่จำกัดงบ / ระดับเรือธง (> ฿60,000)',
    wizardOptBudgetAny: 'ทุกช่วงงบประมาณ',
    wizardOptPortMob: 'น้ำหนักเบา เน้นพกพาสะดวก',
    wizardOptDesktop: 'ขุมพลังตั้งโต๊ะ / จอใหญ่สะใจ',
    wizardOptModular: 'ชิ้นส่วนอัปเกรด & อุปกรณ์เสริม',
    wizardBtn: 'ค้นหาสินค้าที่ใช่สำหรับคุณ ⚡',
    wizardReset: 'รีเซ็ตการค้นหา',
    wizardResultsTitle: '🎯 สินค้าแนะนำที่คัดสรรเฉพาะคุณ',
    wizardClosestTitle: '🔍 ไม่พบสินค้าที่ตรงเป๊ะ 100% แต่เราคัดเลือกสินค้าที่ใกล้เคียงที่สุดมาให้คุณ',
    wizardMatchScore: 'ความเข้ากันได้ {n}%',
    navBuilder: 'จัดสเปก & ปรับแต่ง 🛠️',
    studioBadge: 'CUSTOM HARDWARE STUDIO · TECHNOVA LAB',
    studioTitle: 'ระบบจัดสเปกคอม & ปรับแต่งโน้ตบุ๊ก',
    studioSub: 'เลือกประกอบคอมพิวเตอร์ระดับไฮเอนด์ หรือปรับแต่งสเปกโน้ตบุ๊กตามใจคุณ พร้อมคำนวณราคาและวัตต์แบบเรียลไทม์',
    tabPC: '🖥️ ประกอบคอมพิวเตอร์ (Custom Desktop PC)',
    tabLaptop: '💻 ปรับแต่งสเปกโน้ตบุ๊ก (Custom Laptop)',
    summaryTitle: 'สรุปรายการสเปกที่คุณเลือก',
    estWattage: 'ประมาณการใช้พลังงาน (Estimated Wattage)',
    recPsu: 'แนะนำพาวเวอร์ซัพพลายขั้นต่ำ',
    totalCustomPrice: 'ราคารวมทั้งชุด',
    addCustomToCart: 'ย้ายสเปกนี้ลงตะกร้าสินค้า (Add Custom Set to Cart) 🛍️',
    customPcBuildTitle: 'ชุดประกอบคอมพิวเตอร์ TechNova Custom Build',
    customLaptopTitle: 'โน้ตบุ๊ก TechNova Custom Configured',
    resetStudio: 'ล้างสเปกเริ่มต้น',
    newsletterBadge: '⚡ TECHNOVA PRIVATE DISPATCH · ข่าวสารและสิทธิพิเศษ',
    newsletterTitle: 'รับสิทธิพิเศษและข่าวสารเทคโนโลยีระดับไฮเอนด์ก่อนใคร',
    newsletterSub: 'รับข่าวสารการเปิดตัวฮาร์ดแวร์เรือธง โค้ดส่วนลดพิเศษ และบทวิเคราะห์สเปกส่งตรงถึงกล่องจดหมายของคุณ',
    newsletterPlaceholder: 'กรอกที่อยู่อีเมลของคุณ (เช่น user@example.com)...',
    newsletterBtn: 'ติดตามข่าวสาร (Subscribe)',
    newsletterPrivacy: '🔒 เราเคารพความเป็นส่วนตัวของคุณ (PDPA) ไม่มีสแปม และสามารถยกเลิกการรับข่าวสารได้ตลอดเวลา',
    newsletterSuccess: '🎉 ขอบคุณสำหรับการติดตาม! เราได้บันทึกอีเมลของคุณเรียบร้อยแล้ว',
    newsletterAlready: 'คุณได้ลงทะเบียนรับข่าวสารเรียบร้อยแล้ว ขอบคุณครับ',
    newsletterInvalid: 'กรุณากรอกอีเมลในรูปแบบที่ถูกต้อง เช่น user@example.com',
  },
  en: {
    brandTagline: 'The Pinnacle of Technology & Digital Showroom',
    navStore: 'Store',
    navGaming: 'Gaming',
    navPC: 'PC Components',
    navLaptops: 'Laptops',
    navDisplays: 'Displays',
    navPeripherals: 'Peripherals',
    navStorage: 'Storage & SSD',
    navNetworking: 'Networking',
    navAccessories: 'Accessories',
    navAllStore: 'All Store',
    navBuilder: 'Custom Studio 🛠️',
    searchPlaceholder: 'Search products, silicon, specs, categories...',
    cancel: 'Cancel',
    popularShowcase: 'POPULAR SHOWCASE',
    shoppingBag: 'Shopping Bag',
    bagEmptyTitle: 'Your Bag is Empty',
    bagEmptyDesc: 'Explore our flagship hardware and bespoke technology in the showroom.',
    exploreStore: 'Explore Store',
    subtotal: 'Subtotal',
    freeShipping: 'Complimentary White-Glove 24H Courier on all orders.',
    proceedCheckout: 'Proceed to Checkout',
    addToBag: 'Add to Bag',
    shareFacebook: 'Share to Facebook',
    buyNow: 'Buy Now',
    inStock: 'In Stock',
    lowStock: 'Only {n} Units Left',
    specialOrder: 'Special Order',
    verifiedReviews: 'Verified Client Reviews',
    warranty2y: '2-Year Global Care (Direct Replacement)',
    courier24h: 'White-Glove 24H Courier with GPS Tracking',
    vipConcierge: 'VIP Concierge 24/7 Specialist Support',
    specsMatrix: 'Technical Specifications',
    featuredHeading: 'Featured & Best Sellers',
    featuredSub: 'Curated flagship hardware engineered for peak performance and aesthetics.',
    exploreDomain: 'Explore Domain',
    allCollections: 'All Collections',
    showroom: 'Showroom',
    experience: 'Experience',
    curatedWishlist: 'Curated Wishlist',
    orderTracking: 'Order Tracking',
    personalAccount: 'Personal Account',
    clientSignIn: 'Client Sign In',
    register: 'Register Account',
    concierge: 'VIP Concierge',
    conciergeText: 'For bespoke workstations, high-density server silicon, and VIP support, our specialists are available 24/7.',
    footerBio: 'A digital showroom dedicated to the uncompromising pursuit of performance, material craftsmanship, and engineering precision.',
    cookieTitle: '🔒 Privacy & Cookies (PDPA):',
    cookieDesc: 'We use cookies to deliver the ultimate luxury shopping experience, analyze traffic, and personalize offers.',
    accept: 'Accept All',
    helloUser: 'Welcome, {name}',
    signInPrompt: 'Sign In',
    promoTag: '⚡ MID-YEAR TECHNOVA GALA — UP TO 30% OFF WITH CODE "TECHNOVA"',
    heroTitle: 'Technology, refined.',
    heroSub: 'Experience technology designed for performance, precision, and possibility.',
    shopNowBtn: 'Shop Now',
    exploreGamingBtn: 'Explore Gaming Rigs',
    orderSuccessTitle: '🎉 Order & Payment Successful!',
    orderSuccessDesc: 'Thank you for choosing TechNova. Your order is confirmed and scheduled for white-glove dispatch.',
    viewMyOrders: 'Track My Order',
    continueShopping: 'Continue Shopping',
    wizardBadge: 'INTELLIGENT RECOMMENDATION WIZARD',
    wizardTitle: 'Unsure What to Choose? Let Us Recommend the Perfect Hardware',
    wizardSub: 'Answer 3 simple questions and our wizard will match the ideal hardware architecture for your workflow and budget.',
    wizardStep1: '1. Primary Purpose',
    wizardStep2: '2. Target Budget',
    wizardStep3: '3. Form Factor & Mobility',
    wizardOptGaming: 'Hardcore Gaming / VR / 4K Streaming',
    wizardOptCreative: '3D Graphics / 8K Video Studio',
    wizardOptPortable: 'Ultra-portable / Study / Business',
    wizardOptCustom: 'Desk Setup / Custom Mechanical Gear',
    wizardOptBudgetLow: 'Under ฿30,000',
    wizardOptBudgetMid: '฿30,000 - ฿60,000',
    wizardOptBudgetHigh: 'Ultra Flagship (> ฿60,000)',
    wizardOptBudgetAny: 'All Budget Ranges',
    wizardOptPortMob: 'Ultra-Light & Portable',
    wizardOptDesktop: 'Desktop Rig / Large Pro Display',
    wizardOptModular: 'Modular Silicon & Upgrades',
    wizardBtn: 'Recommend Now ⚡',
    wizardReset: 'Reset Filter',
    wizardResultsTitle: '🎯 Curated Matches Engineered For You',
    wizardClosestTitle: '🔍 Closest Alternative Matches For Your Criteria',
    wizardMatchScore: '{n}% Match',
    studioBadge: 'CUSTOM HARDWARE STUDIO · TECHNOVA LAB',
    studioTitle: 'Custom Hardware Studio & Configurator',
    studioSub: 'Configure your dream high-end desktop workstation or personalize bespoke laptop hardware with realtime wattage calculation.',
    tabPC: '🖥️ Custom Desktop PC Builder',
    tabLaptop: '💻 Custom Laptop Configurator',
    summaryTitle: 'Configuration Summary',
    estWattage: 'Estimated Power Consumption',
    recPsu: 'Recommended PSU Minimum',
    totalCustomPrice: 'Total Build Price',
    addCustomToCart: 'Add Custom Set to Cart 🛍️',
    customPcBuildTitle: 'TechNova Bespoke Custom PC Build',
    customLaptopTitle: 'TechNova Custom Configured Laptop',
    resetStudio: 'Reset Configuration',
    newsletterBadge: '⚡ TECHNOVA PRIVATE DISPATCH · NEWSLETTER',
    newsletterTitle: 'Stay Ahead of the Technological Frontier',
    newsletterSub: 'Receive curated flagship hardware releases, exclusive gala vouchers, and architectural silicon insights directly to your inbox.',
    newsletterPlaceholder: 'Enter your professional email (e.g. user@example.com)...',
    newsletterBtn: 'Subscribe',
    newsletterPrivacy: '🔒 We honor your privacy (PDPA). Zero spam. Unsubscribe at any time with one click.',
    newsletterSuccess: '🎉 Thank you for subscribing! Your email has been registered.',
    newsletterAlready: 'You are already subscribed. Thank you!',
    newsletterInvalid: 'Please enter a valid email address (e.g. user@example.com).',
  }
};

function t(key, params = {}) {
  let text = (i18n[state.lang] && i18n[state.lang][key]) || (i18n.en && i18n.en[key]) || key;
  for (const [k, v] of Object.entries(params)) {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return text;
}

// ============================================================================
// 2. GLOBAL STATE & PERSISTENCE
// ============================================================================
const state = {
  lang: localStorage.getItem('technova_lang') || 'th',
  theme: localStorage.getItem('technova_theme') || 'light',
  user: null,
  cart: (() => {
    try { return JSON.parse(localStorage.getItem('technova_cart') || '[]'); }
    catch { return []; }
  })(),
  wishlist: (() => {
    try { return JSON.parse(localStorage.getItem('technova_wishlist') || '[]'); }
    catch { return []; }
  })(),
  categories: [],
  products: [],
  adminTab: 'overview',
  profileTab: 'info',
  _searchDebounceTimer: null,
  wizard: {
    purpose: 'gaming',
    budget: 'budget_mid',
    formFactor: 'desktop',
    results: null,
    isClosest: false,
  },
  studio: {
    activeTab: 'pc',
    pc: {
      cpu: 'intel_i9',
      mb: 'asus_z790',
      gpu: 'rtx4090',
      ram: 'gskill_64',
      storage: 'samsung_2tb',
      psu: 'corsair_1600',
      case: 'lianli_o11',
    },
    laptop: {
      baseModel: 'aerobook_16',
      ram: 'ram_32',
      storage: 'ssd_1tb',
      care: 'care_onsite_3y',
    }
  },
};

// Apply theme to document
document.documentElement.setAttribute('data-theme', state.theme);

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('technova_theme', state.theme);
  document.documentElement.setAttribute('data-theme', state.theme);
  renderNav();
  showToast(state.theme === 'dark' ? '🌙 Dark Mode Activated' : '☀️ Light Mode Activated', 'info');
}

function toggleLanguage() {
  state.lang = state.lang === 'th' ? 'en' : 'th';
  localStorage.setItem('technova_lang', state.lang);
  document.documentElement.setAttribute('lang', state.lang);
  renderNav();
  updateStaticTexts();
  renderApp();
  showToast(state.lang === 'th' ? '🇹🇭 เปลี่ยนภาษาเป็นไทยแล้ว' : '🌐 Switched to English', 'info');
}

function updateStaticTexts() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });
  const searchInput = document.getElementById('globalSearchInput');
  if (searchInput) searchInput.placeholder = t('searchPlaceholder');
}

const saveCart = () => {
  try { localStorage.setItem('technova_cart', JSON.stringify(state.cart)); }
  catch { /* quota exceeded */ }
  updateBagUI();
};

const saveWishlist = () => {
  try { localStorage.setItem('technova_wishlist', JSON.stringify(state.wishlist)); }
  catch { /* quota exceeded */ }
  updateWishlistUI();
};

const formatPrice = (num) =>
  '฿' + Number(num || 0).toLocaleString('th-TH', { minimumFractionDigits: 0 });

// ============================================================================
// 3. SVG ICON SUITE
// ============================================================================
const Icons = {
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  bag: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  heart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  heartFilled: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  user: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  arrowRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
  trash: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  minus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  moon: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`,
  sun: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
  globe: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  facebook: `<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
  warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`,
  checkCircle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  x: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  map: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
};

// ============================================================================
// 4. TOAST NOTIFICATIONS
// ============================================================================
let _toastTimer = null;
function showToast(msg, type = 'default') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const icons = {
    success: Icons.checkCircle,
    error: Icons.warning,
    info: Icons.info,
    default: Icons.info,
  };
  const colors = {
    success: '#059669',
    error: '#DC2626',
    info: '#0071E3',
    default: '#1D1D1F',
  };

  toast.style.background = colors[type] || colors.default;
  toast.innerHTML = `
    <span style="display:flex;align-items:center;gap:8px;">
      ${icons[type] || ''}
      <span>${msg}</span>
    </span>
  `;
  toast.classList.add('show');
  if (_toastTimer) clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ============================================================================
// 5. API CLIENT (Fetch with timeout & error handling)
// ============================================================================
async function api(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(endpoint, {
      signal: controller.signal,
      headers: {
        ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
      ...options,
    });
    clearTimeout(timeoutId);

    if (res.status === 401 && !endpoint.includes('/api/auth/me')) {
      state.user = null;
      renderNav();
    }

    const text = await res.text();
    let data;
    try { data = JSON.parse(text); }
    catch { throw new Error('Server returned invalid JSON response'); }

    if (!res.ok) throw new Error(data?.error || data?.message || `Server Error (${res.status})`);
    return data;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') throw new Error('Request timed out. Please check your connection.');
    console.error(`[TechNova API] ${endpoint}:`, err.message);
    throw err;
  }
}

// ============================================================================
// 6. SOCIAL MEDIA SHARING (Facebook)
// ============================================================================
function shareToFacebook(productId, title, price) {
  const productUrl = `${window.location.origin}/#/product/${productId}`;
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(`🚀 เช็กฮาร์ดแวร์ตัวท็อป ${title} ราคา ${formatPrice(price)} ที่ TechNova Showroom!`)}`;
  
  // Open Facebook Share Pop-up
  const width = 600, height = 450;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;
  window.open(shareUrl, 'facebook-share-dialog', `width=${width},height=${height},top=${top},left=${left}`);
  
  showToast(state.lang === 'th' ? `แชร์ "${title}" ไปยัง Facebook เรียบร้อยแล้ว!` : `Shared "${title}" to Facebook!`, 'success');
}

// ============================================================================
// 7. PDPA COOKIE CONSENT BANNER
// ============================================================================
function initCookieConsent() {
  const banner = document.getElementById('cookieConsentBanner');
  const hasConsented = localStorage.getItem('technova_cookie_consent');
  if (banner && !hasConsented) {
    banner.style.display = 'flex';
  }
}

function acceptCookieConsent() {
  const banner = document.getElementById('cookieConsentBanner');
  if (banner) {
    banner.classList.add('hiding');
    setTimeout(() => {
      banner.style.display = 'none';
      localStorage.setItem('technova_cookie_consent', 'true');
    }, 300);
  }
  showToast(state.lang === 'th' ? 'บันทึกการยอมรับคุกกี้เรียบร้อยแล้ว' : 'Cookie consent preferences saved', 'success');
}

// ============================================================================
// 8. SLIDE-OVER SHOPPING BAG DRAWER
// ============================================================================
function openBag() {
  const wrapper = document.getElementById('bagDrawerWrapper');
  if (wrapper) {
    wrapper.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderBagItems();
  }
}

function closeBag() {
  const wrapper = document.getElementById('bagDrawerWrapper');
  if (wrapper) {
    wrapper.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function updateBagUI() {
  const count = state.cart.reduce((s, i) => s + (i.quantity || 0), 0);
  const el = document.getElementById('navBagCount');
  if (el) {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  }
  renderBagItems();
}

function renderBagItems() {
  const listEl = document.getElementById('bagItemsList');
  const footerEl = document.getElementById('bagFooter');
  if (!listEl || !footerEl) return;

  if (state.cart.length === 0) {
    listEl.innerHTML = `
      <div class="bag-empty-state">
        <div class="icon">🛍️</div>
        <h4 style="font-size:16px;font-weight:700;color:var(--text-pure);margin-bottom:6px;">${t('bagEmptyTitle')}</h4>
        <p style="font-size:13px;color:var(--text-secondary);margin-bottom:24px;">${t('bagEmptyDesc')}</p>
        <button class="btn btn-primary btn-sm" onclick="closeBag();location.hash='#/products';">${t('exploreStore')}</button>
      </div>`;
    footerEl.innerHTML = '';
    return;
  }

  const subtotal = state.cart.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);

  listEl.innerHTML = state.cart.map((item, idx) => `
    <div class="bag-item-row">
      <div class="bag-item-thumb">
        ${item.thumbnail
          ? `<img src="${item.thumbnail}" alt="${escHtml(item.title)}" loading="lazy">`
          : `<div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:24px;">${item.icon || '📦'}</div>`}
      </div>
      <div class="bag-item-info">
        <a href="#/product/${item.id}" onclick="closeBag();" class="bag-item-title">${escHtml(item.title)}</a>
        <div class="bag-item-price">${formatPrice(item.price)}</div>
        <div class="bag-item-controls">
          <div class="qty-stepper" style="transform:scale(0.85);transform-origin:left center;">
            <button class="qty-step-btn" onclick="updateCartQty(${idx},-1)" aria-label="Decrease">${Icons.minus}</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-step-btn" onclick="updateCartQty(${idx},1)" aria-label="Increase">${Icons.plus}</button>
          </div>
          <button onclick="removeFromCart(${idx})" style="color:var(--text-muted);padding:4px;display:flex;" title="Remove" aria-label="Remove item">
            ${Icons.trash}
          </button>
        </div>
      </div>
    </div>`).join('');

  footerEl.innerHTML = `
    <div class="bag-subtotal-row">
      <span>${t('subtotal')}</span>
      <span class="bag-subtotal-price">${formatPrice(subtotal)}</span>
    </div>
    <div class="bag-shipping-note">${t('freeShipping')}</div>
    <button class="btn btn-primary" style="width:100%;" onclick="closeBag();location.hash='#/checkout';">
      ${t('proceedCheckout')}
    </button>`;
}

function addToCart(product, qty = 1, variant = null) {
  if (!product?.id) return;
  const existing = state.cart.find(i => i.id === product.id && i.variant === variant);
  if (existing) {
    existing.quantity = Math.min((existing.quantity || 1) + qty, 99);
  } else {
    state.cart.push({
      id: product.id,
      title: product.title || 'Hardware',
      price: Number(product.price) || 0,
      quantity: qty,
      thumbnail: product.thumbnail || (product.images?.[0]?.url ?? null),
      icon: product.icon || '📦',
      variant,
      stock: product.stock,
    });
  }
  saveCart();
  showToast(`${state.lang === 'th' ? 'เพิ่มลงในถุงแล้ว' : 'Added to Bag'}: ${product.title}`, 'success');
  openBag();
}

function updateCartQty(idx, delta) {
  if (!state.cart[idx]) return;
  state.cart[idx].quantity = Math.max(0, (state.cart[idx].quantity || 1) + delta);
  if (state.cart[idx].quantity === 0) state.cart.splice(idx, 1);
  saveCart();
}

function removeFromCart(idx) {
  state.cart.splice(idx, 1);
  saveCart();
  showToast(state.lang === 'th' ? 'ลบสินค้าออกจากถุงแล้ว' : 'Item removed from bag', 'info');
}

// ============================================================================
// 9. SEARCH OVERLAY (Debounced & Instant)
// ============================================================================
function openSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('globalSearchInput');
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (input) { input.value = ''; setTimeout(() => input.focus(), 180); }
  renderSearchResults('');
}

function closeSearch() {
  const overlay = document.getElementById('searchOverlay');
  if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
}

async function renderSearchResults(query) {
  const resultsEl = document.getElementById('searchResults');
  const popularEl = document.getElementById('popularSearches');
  const clearBtn = document.getElementById('searchClearBtn');
  if (!resultsEl) return;

  if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

  if (!query.trim()) {
    if (popularEl) popularEl.style.display = 'block';
    resultsEl.innerHTML = '';
    return;
  }
  if (popularEl) popularEl.style.display = 'none';

  clearTimeout(state._searchDebounceTimer);
  resultsEl.innerHTML = `<div style="padding:20px;color:var(--text-muted);font-size:13.5px;text-align:center;">Searching...</div>`;

  state._searchDebounceTimer = setTimeout(async () => {
    try {
      const products = await api(`/api/products?q=${encodeURIComponent(query.trim())}`);
      if (!products.length) {
        resultsEl.innerHTML = `
          <div style="padding:30px 0;text-align:center;color:var(--text-muted);font-size:14px;">
            ${state.lang === 'th' ? 'ไม่พบสินค้าที่ตรงกับคำค้นหา' : 'No matching products found for'} "<b style="color:var(--text-pure);">${escHtml(query)}</b>"
          </div>`;
        return;
      }
      resultsEl.innerHTML = products.slice(0, 8).map(p => `
        <a href="#/product/${p.id}" onclick="closeSearch();" class="search-result-item">
          <div class="search-result-thumb">
            ${p.thumbnail
              ? `<img src="${p.thumbnail}" alt="${escHtml(p.title)}" loading="lazy">`
              : `<div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:20px;">${p.icon || '📦'}</div>`}
          </div>
          <div class="search-result-info">
            <div class="search-result-title">${escHtml(p.title)}</div>
            <div class="search-result-meta">${escHtml(p.category_name || 'Showroom')} · ${p.stock > 0 ? t('inStock') : t('specialOrder')}</div>
          </div>
          <div class="search-result-price">${formatPrice(p.price)}</div>
        </a>`).join('');
    } catch {
      resultsEl.innerHTML = `<div style="padding:20px;color:var(--danger);font-size:13.5px;">Search error. Please try again.</div>`;
    }
  }, 280);
}

// ============================================================================
// 10. WISHLIST MANAGEMENT
// ============================================================================
function toggleWishlist(productId) {
  const pId = Number(productId);
  if (!pId) return;
  const idx = state.wishlist.indexOf(pId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast(state.lang === 'th' ? 'นำออกจาก Wishlist แล้ว' : 'Removed from Curated Wishlist', 'info');
  } else {
    state.wishlist.push(pId);
    showToast(state.lang === 'th' ? 'บันทึกใน Wishlist แล้ว ❤️' : 'Saved to Curated Wishlist ❤️', 'success');
  }
  saveWishlist();
  document.querySelectorAll(`[data-wishid="${pId}"]`).forEach(el => {
    const isNowWished = state.wishlist.includes(pId);
    el.classList.toggle('active', isNowWished);
    el.innerHTML = isNowWished ? Icons.heartFilled : Icons.heart;
  });
}

function updateWishlistUI() {
  const el = document.getElementById('navWishCount');
  if (el) {
    const count = state.wishlist.length;
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  }
}

// ============================================================================
// 11. INLINE MODALS
// ============================================================================
function showModal(title, bodyHtml, onConfirm = null, confirmText = 'Confirm') {
  const existing = document.getElementById('tn-modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'tn-modal-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:500;
    background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);
    display:flex;align-items:center;justify-content:center;padding:20px;
    animation:fadeIn 0.2s ease;
  `;
  overlay.innerHTML = `
    <div style="background:var(--surface);border:1px solid var(--border);border-radius:24px;
      padding:32px;max-width:520px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,0.25);
      animation:slideUp 0.25s var(--transition-smooth);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;">
        <h3 style="font-size:20px;font-weight:700;">${title}</h3>
        <button onclick="closeModal()" style="color:var(--text-muted);display:flex;padding:4px;background:none;border:none;cursor:pointer;">${Icons.x}</button>
      </div>
      <div id="modal-body">${bodyHtml}</div>
      ${onConfirm ? `
        <div style="display:flex;gap:12px;margin-top:24px;justify-content:flex-end;">
          <button class="btn btn-secondary" onclick="closeModal()">${t('cancel')}</button>
          <button class="btn btn-primary" id="modal-confirm-btn">${confirmText}</button>
        </div>` : ''}
    </div>
  `;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';

  if (onConfirm) {
    const confirmBtn = overlay.querySelector('#modal-confirm-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', onConfirm);
    }
  }

  const firstInput = overlay.querySelector('input, textarea, select');
  if (firstInput) setTimeout(() => firstInput.focus(), 100);
}

function closeModal() {
  const overlay = document.getElementById('tn-modal-overlay');
  if (overlay) overlay.remove();
  document.body.style.overflow = '';
}

// ============================================================================
// 12. NAVIGATION BAR
// ============================================================================
function renderNav() {
  const navRight = document.getElementById('navRight');
  if (!navRight) return;

  const cartCount = state.cart.reduce((s, i) => s + (i.quantity || 0), 0);
  const wishCount = state.wishlist.length;
  const u = state.user;

  navRight.innerHTML = `
    <!-- Language Switcher -->
    <button class="control-pill" onclick="toggleLanguage()" title="Switch Language (TH / EN)">
      ${Icons.globe}
      <span>${state.lang.toUpperCase()}</span>
    </button>

    <!-- Theme Switcher (Dark / Light) -->
    <button class="control-pill" onclick="toggleTheme()" title="Toggle Light / Dark Mode">
      ${state.theme === 'dark' ? Icons.sun : Icons.moon}
    </button>

    <!-- Search Trigger -->
    <button class="nav-icon-btn" onclick="openSearch()" aria-label="Search" title="Search (Press /)">
      ${Icons.search}
    </button>

    <!-- Wishlist Trigger -->
    <a href="#/wishlist" class="nav-icon-btn" aria-label="Wishlist" title="Curated Wishlist">
      ${Icons.heart}
      <span class="badge-dot" id="navWishCount" style="${wishCount > 0 ? '' : 'display:none;'}">${wishCount}</span>
    </a>

    <!-- Shopping Bag Trigger (Dynamic Badge) -->
    <button class="nav-icon-btn" onclick="openBag()" aria-label="Shopping Bag" title="Shopping Bag">
      ${Icons.bag}
      <span class="badge-dot" id="navBagCount" style="${cartCount > 0 ? '' : 'display:none;'}">${cartCount}</span>
    </button>

    <!-- User Account State -->
    ${u
      ? `<a href="#/profile" class="user-nav-pill" title="My Account">
          <div class="user-avatar-mini">
            ${u.avatar ? `<img src="${u.avatar}" alt="${escHtml(u.name)}">` : escHtml(u.name.charAt(0).toUpperCase())}
          </div>
          <span>${t('helloUser', { name: escHtml(u.name.split(' ')[0]) })}</span>
        </a>`
      : `<a href="#/login" class="btn btn-secondary btn-sm" style="padding:6px 14px;font-size:12.5px;">
          ${Icons.user}
          <span>${t('signInPrompt')}</span>
        </a>`
    }`;

  const currentHash = location.hash || '#/';
  document.querySelectorAll('.nav-item').forEach(el => {
    const navPath = el.getAttribute('data-nav');
    const catId = el.getAttribute('data-cat-nav');
    const isActive = (navPath && currentHash.startsWith(`#${navPath}`)) ||
                     (catId && currentHash.includes(`category=${catId}`));
    el.classList.toggle('active', isActive);
  });
}

function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ============================================================================
// 13. VIEW: HOMEPAGE (With Promotional Hero & Featured Products with FB Share)
// ============================================================================
async function viewHome() {
  const products = await api('/api/products').catch(() => []);
  const featuredProducts = products.slice(0, 6);

  return `
    <!-- Promotional Hero Section -->
    <section class="hero">
      <div class="wrap hero-content">
        <div class="hero-promo-badge">
          ${t('promoTag')}
        </div>
        <div class="hero-eyebrow">FLAGSHIP SHOWROOM 2026</div>
        <h1 class="hero-title">${t('heroTitle')}</h1>
        <p class="hero-subtitle">${t('heroSub')}</p>
        
        <div class="hero-actions">
          <a href="#/products" class="btn btn-primary btn-lg">${t('shopNowBtn')}</a>
          <a href="#/products?category=1" class="btn-link" style="font-size:15.5px;">
            ${t('exploreGamingBtn')} ${Icons.arrowRight}
          </a>
        </div>

        <div class="hero-showcase-wrap">
          <div class="hero-image-stage">
            <img
              src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1400&q=85"
              alt="NovaStation Titan Apex — Liquid Cooled Gaming Rig"
              loading="eager"
            >
            <div class="hero-badge-overlay">
              <div class="badge-name">NovaStation Titan Apex — Liquid Cooled Gaming Rig</div>
              <div class="badge-spec">Intel Core i9-14900KS · RTX 4090 Titanium · Custom Hardline Liquid</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Recommendation Wizard (ระบบช่วยเลือกสินค้าอัจฉริยะ) -->
    ${renderRecommendationWizard()}

    <!-- Featured Products & Best Sellers Section (สินค้าแนะนำ & ขายดี) -->
    <section class="section" style="background:var(--bg);">
      <div class="wrap">
        <div class="section-header">
          <div>
            <div class="section-eyebrow">CURATED COLLECTION</div>
            <h2 class="section-title">${t('featuredHeading')}</h2>
            <p class="section-sub">${t('featuredSub')}</p>
          </div>
          <a href="#/products" class="btn btn-secondary btn-sm">${t('allCollections')} ${Icons.arrowRight}</a>
        </div>

        <div class="product-grid">
          ${featuredProducts.map(p => renderFeaturedProductCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- 8 Digital Showroom Domain Portals -->
    <section class="section" style="background:var(--bg-subtle);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
      <div class="wrap">
        <div class="section-header">
          <div>
            <div class="section-eyebrow">DIGITAL SHOWROOM</div>
            <h2 class="section-title">${state.lang === 'th' ? 'สำรวจตามหมวดหมู่เทคโนโลยี' : 'Explore by Domain.'}</h2>
            <p class="section-sub">${state.lang === 'th' ? 'เลือกหมวดหมู่เพื่อดูฮาร์ดแวร์และข้อมูลสเปกทางเทคนิค' : 'Select a category to view bespoke hardware and technical specifications.'}</p>
          </div>
          <a href="#/products" class="btn btn-secondary btn-sm">${t('exploreStore')} ${Icons.arrowRight}</a>
        </div>
        <div class="category-grid">${renderCategoryPortals()}</div>
      </div>
    </section>

    <!-- Bento Highlights Section -->
    <section class="section">
      <div class="wrap">
        <div class="section-header">
          <div>
            <div class="section-eyebrow">ARCHITECTURAL EXCELLENCE</div>
            <h2 class="section-title">The Foundry of Possibility.</h2>
            <p class="section-sub">${state.lang === 'th' ? 'ฮาร์ดแวร์ระดับไฮเอนด์เพื่อครีเอเตอร์ วิศวกร และเกมเมอร์ระดับแถวหน้า' : 'Uncompromising hardware crafted for creators, engineers, and elite gamers.'}</p>
          </div>
        </div>
        <div class="bento-grid">
          <div class="bento-card bento-card-dark span-8">
            <div class="bento-content">
              <div class="bento-tag">NVIDIA ADA LOVELACE ARCHITECTURE</div>
              <h3 class="bento-title">Unprecedented Neural Graphics Silicon</h3>
              <p class="bento-desc">24GB G6X VRAM with Dual-Axial Vapor Chamber, DLSS 3.5 Neural Reconstruction, and 83 Teraflops of shader compute.</p>
              <div class="bento-price-row">
                <a href="#/products?category=2" class="btn btn-primary btn-sm">${state.lang === 'th' ? 'ดูการ์ดจอและชิ้นส่วน' : 'Explore PC Components'}</a>
              </div>
            </div>
            <div class="bento-image-wrap">
              <img src="https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=85" alt="RTX Silicon" loading="lazy">
            </div>
          </div>

          <div class="bento-card span-4">
            <div class="bento-content">
              <div class="bento-tag">CNC MAGNESIUM UNIBODY</div>
              <h3 class="bento-title" style="font-size:22px;">AeroBook Studio Carbon 16"</h3>
              <p class="bento-desc" style="font-size:13.5px;">3.2K 165Hz Mini-LED Liquid Retina display with 22-hour battery life.</p>
              <div class="bento-price-row">
                <a href="#/products?category=3" class="btn-link">${state.lang === 'th' ? 'ดูโน้ตบุ๊ก' : 'View Laptops'} ${Icons.arrowRight}</a>
              </div>
            </div>
            <div class="bento-image-wrap" style="min-height:200px;">
              <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85" alt="AeroBook" loading="lazy">
            </div>
          </div>

          <div class="bento-card span-6">
            <div class="bento-content">
              <div class="bento-tag">NANO-IPS 6K COLOR CALIBRATION</div>
              <h3 class="bento-title">ProArt Horizon 32" 6K Retina</h3>
              <p class="bento-desc">Factory calibrated ΔE &lt; 1 with integrated Thunderbolt 4 96W power delivery workstation hub.</p>
              <div class="bento-price-row">
                <a href="#/products?category=4" class="btn btn-secondary btn-sm">${state.lang === 'th' ? 'ดูจอมอนิเตอร์' : 'Explore Displays'}</a>
              </div>
            </div>
            <div class="bento-image-wrap">
              <img src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85" alt="ProArt Display" loading="lazy">
            </div>
          </div>

          <div class="bento-card span-6">
            <div class="bento-content">
              <div class="bento-tag">DOUBLE-GASKET ACOUSTIC TUNING</div>
              <h3 class="bento-title">Keychron Q1 Max Full-CNC</h3>
              <p class="bento-desc">Solid 6063 aerospace aluminum body with custom Jupiter switches and acoustic foam dampening.</p>
              <div class="bento-price-row">
                <a href="#/products?category=5" class="btn btn-secondary btn-sm">${state.lang === 'th' ? 'ดูคีย์บอร์ดและอุปกรณ์' : 'Explore Peripherals'}</a>
              </div>
            </div>
            <div class="bento-image-wrap">
              <img src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85" alt="Keychron Q1" loading="lazy">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Standards & VIP Concierge -->
    <section class="section" style="background:var(--bg-subtle);border-top:1px solid var(--border);border-bottom:1px solid var(--border);">
      <div class="wrap">
        <div class="story-hero-block">
          <div class="section-eyebrow">UNCOMPROMISING SERVICE</div>
          <h2>The TechNova Standard.</h2>
          <p>${state.lang === 'th' ? 'บริการระดับพรีเมียม จัดส่งด่วนพิเศษ พร้อมการรับประกันและผู้เชี่ยวชาญดูแลตลอด 24 ชม.' : 'Experience concierge support, rapid dispatch, and official manufacturer coverage backed by certified specialists.'}</p>
        </div>
        <div class="assurance-grid" style="border:none;max-width:900px;margin:0 auto;">
          <div class="assurance-item" style="padding:24px;">
            <div class="icon" style="font-size:32px;">🛡️</div>
            <div class="title" style="font-size:15px;margin:8px 0 4px;">${t('warranty2y')}</div>
            <div class="sub">${state.lang === 'th' ? 'เปลี่ยนเครื่องใหม่ทันที ไม่มีค่าใช้จ่ายแอบแฝง' : 'Direct replacement with zero deductible on all hardware'}</div>
          </div>
          <div class="assurance-item" style="padding:24px;">
            <div class="icon" style="font-size:32px;">⚡</div>
            <div class="title" style="font-size:15px;margin:8px 0 4px;">${t('courier24h')}</div>
            <div class="sub">${state.lang === 'th' ? 'จัดส่งพร้อมประกันภัยแบบเรียลไทม์' : 'Free insured delivery with realtime GPS tracking'}</div>
          </div>
          <div class="assurance-item" style="padding:24px;">
            <div class="icon" style="font-size:32px;">💎</div>
            <div class="title" style="font-size:15px;margin:8px 0 4px;">${t('vipConcierge')}</div>
            <div class="sub">${state.lang === 'th' ? 'ทีมวิศวกรดูแลระบบ Liquid Cooled และ Server Silicon' : 'Dedicated specialists for custom liquid builds & server silicon'}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Subscription Section (สำหรับผู้ใช้และ Guest รับข่าวสาร & สิทธิพิเศษ) -->
    ${renderNewsletterSection()}
  `;
}

// ============================================================================
// 13.6 NEWSLETTER SUBSCRIPTION SECTION
// ============================================================================
function renderNewsletterSection() {
  return `
    <section class="section newsletter-section" id="newsletterSection">
      <div class="wrap">
        <div class="newsletter-card">
          <div class="newsletter-badge">${t('newsletterBadge')}</div>
          <h2 class="newsletter-title">${t('newsletterTitle')}</h2>
          <p class="newsletter-sub">${t('newsletterSub')}</p>

          <form class="newsletter-form" id="newsletterForm" onsubmit="handleNewsletterSubscribe(event)">
            <div class="newsletter-input-wrap">
              <input
                type="email"
                id="newsletterEmailInput"
                class="newsletter-input"
                placeholder="${t('newsletterPlaceholder')}"
                required
                autocomplete="email"
              />
              <button type="submit" class="btn btn-primary newsletter-btn" id="newsletterSubmitBtn">
                <span>${t('newsletterBtn')}</span>
                ${Icons.arrowRight}
              </button>
            </div>
          </form>

          <div class="newsletter-privacy">${t('newsletterPrivacy')}</div>
        </div>
      </div>
    </section>
  `;
}

async function handleNewsletterSubscribe(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('newsletterEmailInput');
  const btn = document.getElementById('newsletterSubmitBtn');
  if (!input) return;

  const rawEmail = input.value || '';
  const email = rawEmail.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email || !emailRegex.test(email)) {
    showToast(t('newsletterInvalid'), 'error');
    input.focus();
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>${state.lang === 'th' ? 'กำลังบันทึก...' : 'Subscribing...'}</span>`;
  }

  try {
    const res = await api('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email })
    });

    if (res.alreadySubscribed) {
      showToast(t('newsletterAlready'), 'info');
    } else {
      showToast(t('newsletterSuccess'), 'success');
      input.value = '';
    }
  } catch (err) {
    showToast(err.message || t('newsletterInvalid'), 'error');
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span>${t('newsletterBtn')}</span> ${Icons.arrowRight}`;
    }
  }
}

// ============================================================================
// 13.5 PRODUCT RECOMMENDATION WIZARD ENGINE
// ============================================================================
function renderRecommendationWizard() {
  const w = state.wizard || { purpose: 'gaming', budget: 'budget_mid', formFactor: 'desktop', results: null, isClosest: false };
  const purpose = w.purpose || 'gaming';
  const budget = w.budget || 'budget_mid';
  const formFactor = w.formFactor || 'desktop';

  return `
    <section class="wizard-section" id="recommendationWizard">
      <div class="wrap">
        <div class="wizard-card-wrapper">
          <div class="wizard-header">
            <div class="wizard-badge">⚡ ${t('wizardBadge')}</div>
            <h2 class="wizard-title">${t('wizardTitle')}</h2>
            <p class="wizard-subtitle">${t('wizardSub')}</p>
          </div>

          <div class="wizard-steps-grid">
            <!-- Step 1: Purpose -->
            <div class="wizard-step-box">
              <div class="wizard-step-title">
                <span class="wizard-step-number">1</span>
                <span>${t('wizardStep1')}</span>
              </div>
              <div class="wizard-options-list">
                <button type="button" class="wizard-opt-btn ${purpose === 'gaming' ? 'selected' : ''}" onclick="selectWizardOption('purpose', 'gaming', this)">
                  <span class="wizard-opt-icon">🎮</span>
                  <span>${t('wizardOptGaming')}</span>
                </button>
                <button type="button" class="wizard-opt-btn ${purpose === 'creative' ? 'selected' : ''}" onclick="selectWizardOption('purpose', 'creative', this)">
                  <span class="wizard-opt-icon">🎨</span>
                  <span>${t('wizardOptCreative')}</span>
                </button>
                <button type="button" class="wizard-opt-btn ${purpose === 'portable' ? 'selected' : ''}" onclick="selectWizardOption('purpose', 'portable', this)">
                  <span class="wizard-opt-icon">💼</span>
                  <span>${t('wizardOptPortable')}</span>
                </button>
                <button type="button" class="wizard-opt-btn ${purpose === 'custom' ? 'selected' : ''}" onclick="selectWizardOption('purpose', 'custom', this)">
                  <span class="wizard-opt-icon">⌨️</span>
                  <span>${t('wizardOptCustom')}</span>
                </button>
              </div>
            </div>

            <!-- Step 2: Budget -->
            <div class="wizard-step-box">
              <div class="wizard-step-title">
                <span class="wizard-step-number">2</span>
                <span>${t('wizardStep2')}</span>
              </div>
              <div class="wizard-options-list">
                <button type="button" class="wizard-opt-btn ${budget === 'budget_low' ? 'selected' : ''}" onclick="selectWizardOption('budget', 'budget_low', this)">
                  <span class="wizard-opt-icon">💵</span>
                  <span>${t('wizardOptBudgetLow')}</span>
                </button>
                <button type="button" class="wizard-opt-btn ${budget === 'budget_mid' ? 'selected' : ''}" onclick="selectWizardOption('budget', 'budget_mid', this)">
                  <span class="wizard-opt-icon">💎</span>
                  <span>${t('wizardOptBudgetMid')}</span>
                </button>
                <button type="button" class="wizard-opt-btn ${budget === 'budget_high' ? 'selected' : ''}" onclick="selectWizardOption('budget', 'budget_high', this)">
                  <span class="wizard-opt-icon">👑</span>
                  <span>${t('wizardOptBudgetHigh')}</span>
                </button>
                <button type="button" class="wizard-opt-btn ${budget === 'budget_any' ? 'selected' : ''}" onclick="selectWizardOption('budget', 'budget_any', this)">
                  <span class="wizard-opt-icon">🌐</span>
                  <span>${t('wizardOptBudgetAny')}</span>
                </button>
              </div>
            </div>

            <!-- Step 3: Form Factor -->
            <div class="wizard-step-box">
              <div class="wizard-step-title">
                <span class="wizard-step-number">3</span>
                <span>${t('wizardStep3')}</span>
              </div>
              <div class="wizard-options-list">
                <button type="button" class="wizard-opt-btn ${formFactor === 'desktop' ? 'selected' : ''}" onclick="selectWizardOption('formFactor', 'desktop', this)">
                  <span class="wizard-opt-icon">🖥️</span>
                  <span>${t('wizardOptDesktop')}</span>
                </button>
                <button type="button" class="wizard-opt-btn ${formFactor === 'portable' ? 'selected' : ''}" onclick="selectWizardOption('formFactor', 'portable', this)">
                  <span class="wizard-opt-icon">🪶</span>
                  <span>${t('wizardOptPortMob')}</span>
                </button>
                <button type="button" class="wizard-opt-btn ${formFactor === 'modular' ? 'selected' : ''}" onclick="selectWizardOption('formFactor', 'modular', this)">
                  <span class="wizard-opt-icon">⚙️</span>
                  <span>${t('wizardOptModular')}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="wizard-actions">
            <button type="button" class="btn btn-primary btn-lg" onclick="runRecommendationWizard()">
              <span>${t('wizardBtn')}</span>
            </button>
            <button type="button" class="btn btn-secondary" onclick="resetRecommendationWizard()">
              <span>${t('wizardReset')}</span>
            </button>
          </div>

          <div id="wizardResultsSlot" style="${w.results ? '' : 'display:none;'}">
            ${w.results ? renderWizardResultsHtml(w.results, w.isClosest) : ''}
          </div>
        </div>
      </div>
    </section>
  `;
}

function selectWizardOption(step, value, btnEl) {
  if (!state.wizard) state.wizard = {};
  state.wizard[step] = value;
  if (btnEl && btnEl.parentElement) {
    btnEl.parentElement.querySelectorAll('.wizard-opt-btn').forEach(b => b.classList.remove('selected'));
    btnEl.classList.add('selected');
  }
}

async function runRecommendationWizard() {
  const slot = document.getElementById('wizardResultsSlot');
  if (!slot) return;

  // Ensure products list is loaded
  if (!state.products || state.products.length === 0) {
    try {
      state.products = await api('/api/products');
    } catch {
      state.products = [];
    }
  }

  const products = state.products || [];
  if (!products.length) {
    showToast('Could not load products for recommendation', 'error');
    return;
  }

  const { purpose = 'gaming', budget = 'budget_mid', formFactor = 'desktop' } = state.wizard || {};

  // Scoring algorithm
  const scored = products.map(p => {
    let score = 50; // base score
    let reasons = [];

    // 1. Purpose match
    if (purpose === 'gaming') {
      if (p.category_id === 1) { score += 40; reasons.push('Gaming System'); }
      else if (p.category_id === 2) { score += 30; reasons.push('GPU Silicon'); }
      else if (/game|titan|rtx|rog|handheld/i.test(p.title + ' ' + p.description)) { score += 25; reasons.push('High-FPS Gaming'); }
    } else if (purpose === 'creative') {
      if (p.category_id === 3 || p.category_id === 4) { score += 40; reasons.push('Creator Workstation & Display'); }
      else if (/proart|retina|studio|carbon|6k|nano-ips|color/i.test(p.title + ' ' + p.description)) { score += 35; reasons.push('Color Calibrated'); }
    } else if (purpose === 'portable') {
      if (p.category_id === 3) { score += 40; reasons.push('Portable Ultrabook'); }
      else if (p.category_id === 8) { score += 30; reasons.push('Mobile Hub & Dock'); }
      else if (/aerobook|portable|light|battery|mobile/i.test(p.title + ' ' + p.description)) { score += 30; reasons.push('Ultra-light Chassis'); }
    } else if (purpose === 'custom') {
      if (p.category_id === 5) { score += 40; reasons.push('Precision Peripherals'); }
      else if (p.category_id === 6) { score += 30; reasons.push('High-Speed Gen5 Storage'); }
      else if (/keychron|keyboard|switch|cnc|sound|mechanical|nvme/i.test(p.title + ' ' + p.description)) { score += 35; reasons.push('Custom Acoustics & Feel'); }
    }

    // 2. Budget match
    const price = Number(p.price) || 0;
    if (budget === 'budget_low') {
      if (price <= 30000) { score += 30; reasons.push('Within Budget'); }
      else { score -= 25; }
    } else if (budget === 'budget_mid') {
      if (price >= 20000 && price <= 65000) { score += 30; reasons.push('Sweet-Spot Value'); }
      else if (price < 20000) { score += 15; }
      else { score -= 20; }
    } else if (budget === 'budget_high') {
      if (price > 55000) { score += 35; reasons.push('Flagship Performance'); }
      else { score += 10; }
    } else if (budget === 'budget_any') {
      score += 20;
    }

    // 3. Form factor match
    if (formFactor === 'desktop') {
      if (p.category_id === 1 || p.category_id === 4) { score += 20; reasons.push('Desktop Experience'); }
      else if (/rig|titan|display|monitor|station/i.test(p.title)) { score += 15; }
    } else if (formFactor === 'portable') {
      if (p.category_id === 3 || p.category_id === 8) { score += 20; reasons.push('Portable Setup'); }
      else if (/aerobook|carbon|laptop|hub/i.test(p.title)) { score += 15; }
    } else if (formFactor === 'modular') {
      if ([2, 5, 6, 7].includes(p.category_id)) { score += 20; reasons.push('Modular Component'); }
      else if (/rtx|silicon|ssd|keychron|nvme|wi-fi/i.test(p.title)) { score += 15; }
    }

    // Stock bonus
    if (p.stock > 0) score += 5;

    return { product: p, score: Math.min(99, Math.max(45, score)), reasons };
  });

  scored.sort((a, b) => b.score - a.score);

  // Filter top items
  let best = scored.filter(s => s.score >= 80);
  let isClosest = false;

  if (best.length === 0) {
    best = scored.slice(0, 3);
    isClosest = true;
  } else {
    best = best.slice(0, 3);
  }

  state.wizard.results = best;
  state.wizard.isClosest = isClosest;

  slot.style.display = 'block';
  slot.innerHTML = renderWizardResultsHtml(best, isClosest);

  // Smooth scroll down to results
  slot.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  showToast(isClosest ? (state.lang === 'th' ? 'แนะนำสินค้าใกล้เคียงที่สุด' : 'Closest matching tech found') : (state.lang === 'th' ? 'พบสินค้าที่ตรงความต้องการของคุณ!' : 'Found perfect matching hardware!'), 'success');
}

function resetRecommendationWizard() {
  state.wizard = { purpose: 'gaming', budget: 'budget_mid', formFactor: 'desktop', results: null, isClosest: false };
  const slot = document.getElementById('wizardResultsSlot');
  if (slot) {
    slot.style.display = 'none';
    slot.innerHTML = '';
  }
  const root = document.getElementById('recommendationWizard');
  if (root) {
    root.querySelectorAll('.wizard-step-box').forEach((box, idx) => {
      box.querySelectorAll('.wizard-opt-btn').forEach((btn, bIdx) => {
        btn.classList.toggle('selected', bIdx === 0);
      });
    });
  }
  showToast(state.lang === 'th' ? 'รีเซ็ตตัวช่วยเลือกสินค้าแล้ว' : 'Wizard reset', 'info');
}

function renderWizardResultsHtml(results, isClosest) {
  return `
    <div class="wizard-results-container">
      <div class="wizard-results-header">
        <div>
          <h3 style="font-size:22px;font-weight:800;color:var(--text-pure);">
            ${isClosest ? t('wizardClosestTitle') : t('wizardResultsTitle')}
          </h3>
          <p style="font-size:14px;color:var(--text-secondary);margin-top:4px;">
            ${state.lang === 'th' ? 'วิเคราะห์จากวัตถุประสงค์ งบประมาณ และรูปแบบการใช้งานที่คุณเลือก' : 'Analyzed from your specified workflow, budget target, and form factor.'}
          </p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="resetRecommendationWizard()">
          ${t('wizardReset')}
        </button>
      </div>

      <div class="product-grid" style="margin-bottom:0;">
        ${results.map(({ product, score, reasons }) => renderWizardProductCard(product, score, reasons)).join('')}
      </div>
    </div>
  `;
}

function renderWizardProductCard(p, score, reasons) {
  const isWish = state.wishlist.includes(Number(p.id));
  const inStock = (p.stock || 0) > 0;

  return `
    <div class="prod-card" style="border: 1.5px solid var(--accent);box-shadow: 0 8px 24px rgba(0, 113, 227, 0.12);">
      <button
        class="prod-card-wish ${isWish ? 'active' : ''}"
        data-wishid="${p.id}"
        onclick="toggleWishlist(${p.id})"
        title="${isWish ? 'Remove from Wishlist' : 'Save to Wishlist'}"
        aria-label="${isWish ? 'Remove from Wishlist' : 'Save to Wishlist'}">
        ${isWish ? Icons.heartFilled : Icons.heart}
      </button>

      <a href="#/product/${p.id}" class="prod-card-thumb">
        ${p.thumbnail
          ? `<img src="${p.thumbnail}" alt="${escHtml(p.title)}" loading="lazy">`
          : `<div style="font-size:60px;">${p.icon || '📦'}</div>`}
      </a>

      <div class="prod-card-body">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <span class="match-pill-tag">🎯 ${t('wizardMatchScore', { n: score })}</span>
          <span class="prod-card-cat" style="margin-bottom:0;">${escHtml(p.category_name || 'Showroom')}</span>
        </div>

        <a href="#/product/${p.id}" class="prod-card-title">${escHtml(p.title)}</a>
        <div class="prod-card-specs">${escHtml(p.description || '')}</div>
        
        <div class="prod-card-price-row">
          <div class="prod-card-price">${formatPrice(p.price)}</div>
          <span class="stock-pill in-stock" style="font-size:11px;padding:2px 8px;">${t('inStock')}</span>
        </div>

        <div class="prod-card-actions">
          <button
            class="prod-card-add-btn"
            onclick="handleQuickAdd(${p.id})"
            ${inStock ? '' : 'disabled style="opacity:0.5;cursor:not-allowed;"'}>
            ${Icons.bag}
            <span>${t('addToBag')}</span>
          </button>

          <!-- Facebook Share Button -->
          <button
            class="btn btn-facebook"
            onclick="shareToFacebook(${p.id}, '${escHtml(p.title).replace(/'/g, "\\'")}', ${p.price})"
            title="Share on Facebook">
            ${Icons.facebook}
            <span>${t('shareFacebook')}</span>
          </button>
        </div>
      </div>
    </div>`;
}

// Featured Product Card with Facebook Share Button
function renderFeaturedProductCard(p) {
  const isWish = state.wishlist.includes(Number(p.id));
  const inStock = (p.stock || 0) > 0;
  return `
    <div class="prod-card">
      <button
        class="prod-card-wish ${isWish ? 'active' : ''}"
        data-wishid="${p.id}"
        onclick="toggleWishlist(${p.id})"
        title="${isWish ? 'Remove from Wishlist' : 'Save to Wishlist'}"
        aria-label="${isWish ? 'Remove from Wishlist' : 'Save to Wishlist'}">
        ${isWish ? Icons.heartFilled : Icons.heart}
      </button>

      <a href="#/product/${p.id}" class="prod-card-thumb">
        ${p.thumbnail
          ? `<img src="${p.thumbnail}" alt="${escHtml(p.title)}" loading="lazy">`
          : `<div style="font-size:60px;">${p.icon || '📦'}</div>`}
      </a>

      <div class="prod-card-body">
        <div class="prod-card-cat">${escHtml(p.category_name || 'Technology')}</div>
        <a href="#/product/${p.id}" class="prod-card-title">${escHtml(p.title)}</a>
        <div class="prod-card-specs">${escHtml(p.description || '')}</div>
        
        <div class="prod-card-price-row">
          <div class="prod-card-price">${formatPrice(p.price)}</div>
          <span class="stock-pill in-stock" style="font-size:11px;padding:2px 8px;">${t('inStock')}</span>
        </div>

        <div class="prod-card-actions">
          <button
            class="prod-card-add-btn"
            onclick="handleQuickAdd(${p.id})"
            ${inStock ? '' : 'disabled style="opacity:0.5;cursor:not-allowed;"'}>
            ${Icons.bag}
            <span>${t('addToBag')}</span>
          </button>

          <!-- Facebook Share Button -->
          <button
            class="btn btn-facebook"
            onclick="shareToFacebook(${p.id}, '${escHtml(p.title).replace(/'/g, "\\'")}', ${p.price})"
            title="Share on Facebook">
            ${Icons.facebook}
            <span>${t('shareFacebook')}</span>
          </button>
        </div>
      </div>
    </div>`;
}

function renderCategoryPortals() {
  const cats = [
    { id: 1, name: t('navGaming'), icon: '⚡', desc: state.lang === 'th' ? 'เกมมิ่งริกส์และเครื่องเล่นเกมพกพา' : 'Custom Liquid-Cooled Rigs & Handhelds' },
    { id: 2, name: t('navPC'), icon: '🧠', desc: state.lang === 'th' ? 'การ์ดจอ, ซีพียู และแรมระดับเรือธง' : 'Flagship GPUs, CPUs & Memory Silicon' },
    { id: 3, name: t('navLaptops'), icon: '💻', desc: state.lang === 'th' ? 'สตูดิโอเวิร์กสเตชันและอัลตร้าบุ๊ก' : 'Studio Workstations & Ultra-Thin' },
    { id: 4, name: t('navDisplays'), icon: '🖥️', desc: state.lang === 'th' ? 'จอ 6K Nano-IPS & 240Hz OLED' : '6K Nano-IPS & 240Hz Curved OLED' },
    { id: 5, name: t('navPeripherals'), icon: '⌨️', desc: state.lang === 'th' ? 'คีย์บอร์ด CNC และเมาส์ระดับพรีเมียม' : 'CNC Mechanical Keyboards & Precision' },
    { id: 6, name: t('navStorage'), icon: '💾', desc: state.lang === 'th' ? 'Gen5 NVMe และสตอเรจความเร็วสูง' : 'Gen5 NVMe & Enterprise SSD' },
    { id: 7, name: t('navNetworking'), icon: '📡', desc: state.lang === 'th' ? 'Enterprise Wi-Fi 7 เกตเวย์' : 'Enterprise Wi-Fi 7 Gateways' },
    { id: 8, name: t('navAccessories'), icon: '🔌', desc: state.lang === 'th' ? 'Thunderbolt 4 Hubs & แท่นชาร์จ' : 'Thunderbolt 4 Hubs & Docks' },
  ];
  return cats.map(c => `
    <a href="#/products?category=${c.id}" class="cat-portal-card">
      <div class="cat-icon-badge">${c.icon}</div>
      <h3 class="cat-name">${escHtml(c.name)}</h3>
      <div class="cat-count">${escHtml(c.desc)}</div>
      <div class="cat-arrow">${t('exploreDomain')} ${Icons.arrowRight}</div>
    </a>`).join('');
}

// ============================================================================
// 13.8 CUSTOM HARDWARE STUDIO (PC BUILDER & LAPTOP CONFIGURATOR)
// ============================================================================
const pcHardwareCatalog = {
  cpu: {
    label: { th: 'หน่วยประมวลผล (Processor / CPU)', en: 'Processor (CPU)' },
    icon: '🧠',
    items: [
      { id: 'intel_i9', name: 'Intel Core i9-14900KS Special Edition (6.2 GHz, 24-Cores)', price: 24900, watts: 250, img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80', desc: 'Flagship 24-core powerhouse for extreme compute, streaming & AI workloads' },
      { id: 'amd_r9', name: 'AMD Ryzen 9 7950X3D (16-Core 3D V-Cache)', price: 22500, watts: 120, img: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=80', desc: '144MB Ultra 3D V-Cache architecture for world-record gaming frame rates' },
      { id: 'intel_i7', name: 'Intel Core i7-14700K (20-Cores, 5.6 GHz Turbo)', price: 16500, watts: 200, img: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80', desc: 'High-performance hybrid architecture engineered for heavy gaming & productivity' },
      { id: 'amd_r7', name: 'AMD Ryzen 7 7800X3D (8-Core 3D V-Cache)', price: 15900, watts: 120, img: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=80', desc: 'The most efficient and beloved high-FPS pure gaming desktop silicon' }
    ]
  },
  mb: {
    label: { th: 'เมนบอร์ด (Motherboard / Mainboard)', en: 'Motherboard (Mainboard)' },
    icon: '⚡',
    items: [
      { id: 'asus_z790', name: 'ASUS ROG Maximus Z790 Dark Hero (PCIe 5.0, Wi-Fi 7)', price: 26900, watts: 50, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80', desc: '20+1 Power stages, Dual Thunderbolt 4, Robust VRM heatsinks' },
      { id: 'msi_x670', name: 'MSI MEG X670E ACE E-ATX Flagship Architecture', price: 24500, watts: 50, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80', desc: 'Quad Gen5 M.2 slots, 10G Super LAN, Extreme overclocking PCB' },
      { id: 'asus_b760', name: 'ASUS TUF Gaming B760-Plus WiFi DDR5', price: 7900, watts: 40, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80', desc: 'Military-grade components, PCIe 5.0, Wi-Fi 6E connectivity' },
      { id: 'gb_b650', name: 'GIGABYTE B650 AORUS Elite AX DDR5', price: 8200, watts: 40, img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80', desc: 'Direct 14+2+1 Phases, Gen5 M.2 with EZ-Latch Click thermal design' }
    ]
  },
  gpu: {
    label: { th: 'การ์ดจอ (Graphics Silicon / GPU)', en: 'Graphics Silicon (GPU)' },
    icon: '🎮',
    items: [
      { id: 'rtx4090', name: 'NVIDIA GeForce RTX 4090 24GB Titanium OC Liquid', price: 78900, watts: 450, img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80', desc: '24GB G6X, 83 TFLOPS Shader compute, 4K/8K Extreme Ray Tracing' },
      { id: 'rtx4080s', name: 'NVIDIA GeForce RTX 4080 Super 16GB OC Edition', price: 42900, watts: 320, img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80', desc: '16GB G6X, DLSS 3.5 Neural Reconstruction, Precision vapor chamber' },
      { id: 'rtx4070tis', name: 'NVIDIA GeForce RTX 4070 Ti Super 16GB Dual-Fan', price: 32500, watts: 285, img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80', desc: '16GB VRAM on 256-bit bus for high refresh 1440p and 4K mastery' },
      { id: 'rx7900xtx', name: 'AMD Radeon RX 7900 XTX 24GB RDNA 3', price: 38900, watts: 355, img: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=80', desc: '24GB GDDR6 with Chiplet architecture & DisplayPort 2.1 support' }
    ]
  },
  ram: {
    label: { th: 'หน่วยความจำ (RAM Memory)', en: 'Memory (RAM)' },
    icon: '💾',
    items: [
      { id: 'gskill_64', name: '64GB (2x32GB) DDR5 6400MHz G.Skill Trident Z5 RGB CL32', price: 10900, watts: 15, img: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80', desc: 'Hand-screened DDR5 ICs, Brushed aluminum heatspreader' },
      { id: 'corsair_32', name: '32GB (2x16GB) DDR5 6000MHz Corsair Dominator Titanium', price: 6500, watts: 10, img: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80', desc: 'DHX cooling technology, 11-zone Capellix RGB illumination' },
      { id: 'kingston_32', name: '32GB (2x16GB) DDR5 5600MHz Kingston Fury Beast Low-Profile', price: 4200, watts: 10, img: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=400&q=80', desc: 'Plug N Play automatic overclocking with sleek black heatspreader' }
    ]
  },
  storage: {
    label: { th: 'ที่เก็บข้อมูล (NVMe SSD Storage)', en: 'Primary Storage (SSD)' },
    icon: '💽',
    items: [
      { id: 'samsung_2tb', name: '2TB Samsung 990 PRO PCIe 4.0 NVMe (7,450 MB/s)', price: 6900, watts: 8, img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80', desc: 'Nickel coating with thermal guard for continuous heavy read/write' },
      { id: 'crucial_4tb', name: '4TB Crucial T700 Gen5 PCIe 5.0 (12,400 MB/s)', price: 16500, watts: 12, img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80', desc: 'Next-gen PCIe Gen5 speeds with premium extruded aluminum heatsink' },
      { id: 'wd_1tb', name: '1TB WD_BLACK SN850X PCIe 4.0 NVMe (7,300 MB/s)', price: 3690, watts: 6, img: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=400&q=80', desc: 'Dedicated Game Mode 2.0 with low latency background loading' }
    ]
  },
  psu: {
    label: { th: 'พาวเวอร์ซัพพลาย (Power Supply / PSU)', en: 'Power Supply (PSU)' },
    icon: '🔌',
    items: [
      { id: 'corsair_1600', name: 'Corsair AX1600i 1600W 80 PLUS Titanium Digital ATX', price: 18900, watts: 0, img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80', desc: 'Gallium Nitride (GaN) transistors, Digital DSP, 10-year warranty' },
      { id: 'seasonic_1200', name: 'Seasonic Vertex GX-1200 1200W ATX 3.0 80 PLUS Gold', price: 8900, watts: 0, img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80', desc: 'Native PCIe Gen 5 12VHPWR cable, Fluid dynamic bearing fan' },
      { id: 'corsair_850', name: 'Corsair RM850x 850W 80 PLUS Gold Fully Modular', price: 5200, watts: 0, img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80', desc: 'Zero RPM fan mode, 105°C Japanese electrolytic capacitors' }
    ]
  },
  case: {
    label: { th: 'เคสและระบบระบายความร้อน (Chassis & Liquid Cooling)', en: 'Chassis & Cooling' },
    icon: '📦',
    items: [
      { id: 'lianli_o11', name: 'Lian Li O11 Dynamic EVO XL + 360mm Hydro AIO Liquid', price: 14900, watts: 30, img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80', desc: 'Seamless panoramic tempered glass, multi-directional airflow chamber' },
      { id: 'nzxt_h9', name: 'NZXT H9 Flow Dual-Chamber + Kraken Elite 360 RGB LCD', price: 12900, watts: 30, img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80', desc: 'Integrated 2.36" LCD screen pump cap with dual-chamber layout' },
      { id: 'fractal_north', name: 'Fractal Design North Charcoal Black (Real Walnut Front)', price: 5900, watts: 15, img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80', desc: 'Natural wood detailing with fine-mesh ventilation and brass trim' }
    ]
  }
};

const laptopStudioCatalog = {
  models: [
    {
      id: 'aerobook_16',
      name: 'AeroBook Studio Carbon 16"',
      tagline: 'Ultralight Magnesium-Alloy · 3.2K 165Hz Mini-LED',
      basePrice: 59900,
      specs: 'Intel Core Ultra 9 185H · RTX 4070 8GB · 99.9Wh Battery · 1.48 kg',
      img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'novabook_14',
      name: 'NovaBook Pro Titanium 14"',
      tagline: 'Anodized Aerospace Titanium · 2.8K 120Hz OLED',
      basePrice: 45900,
      specs: 'AMD Ryzen 9 8945HS · RTX 4060 8GB · 100% DCI-P3 · 1.35 kg',
      img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'titanbook_17',
      name: 'TitanBook Ultra Workstation 17.3"',
      tagline: 'Desktop Replacement · 4K 144Hz ProArt Calibrated',
      basePrice: 89900,
      specs: 'Intel Core i9-14900HX · RTX 4090 16GB 175W TGP · Vapor Chamber · 2.65 kg',
      img: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80'
    }
  ],
  upgrades: {
    ram: {
      label: { th: 'หน่วยความจำ RAM (DDR5 5600MHz)', en: 'RAM Memory (DDR5)' },
      options: [
        { id: 'ram_16', name: '16GB DDR5 Dual-Channel', delta: 0, tag: 'Standard' },
        { id: 'ram_32', name: '32GB DDR5 5600MHz High-Speed', delta: 2500, tag: 'Recommended' },
        { id: 'ram_64', name: '64GB DDR5 5600MHz Ultra-Density', delta: 6000, tag: 'Extreme' }
      ]
    },
    storage: {
      label: { th: 'ความจุ SSD (PCIe 4.0 NVMe)', en: 'SSD Storage (Gen4 NVMe)' },
      options: [
        { id: 'ssd_512', name: '512GB PCIe 4.0 NVMe (5,000 MB/s)', delta: 0, tag: 'Standard' },
        { id: 'ssd_1tb', name: '1TB PCIe 4.0 Ultra-Fast (7,400 MB/s)', delta: 3000, tag: 'Best Seller' },
        { id: 'ssd_2tb', name: '2TB PCIe 4.0 Ultra-Fast (7,400 MB/s)', delta: 7000, tag: 'Pro Creator' }
      ]
    },
    care: {
      label: { th: 'แพ็กเกจการรับประกันและการดูแล (Warranty & Care)', en: 'Warranty & Care Package' },
      options: [
        { id: 'care_std_1y', name: 'TechNova Standard Care 1 ปี (ส่งศูนย์ฟรี)', delta: 0, tag: 'Standard' },
        { id: 'care_onsite_3y', name: 'Onsite Service VIP 3 ปี + คุ้มครองอุบัติเหตุ Accidental Damage', delta: 2900, tag: 'Popular' },
        { id: 'care_prem_5y', name: 'Ultimate Premier Care 5 ปี + 24H Hot-Swap เปลี่ยนเครื่องทันที', delta: 5900, tag: 'VIP Flagship' }
      ]
    }
  }
};

async function viewCustomStudio() {
  const activeTab = state.studio?.activeTab || 'pc';

  return `
    <div class="studio-container">
      <!-- Studio Header -->
      <div class="studio-header">
        <div class="studio-badge">🛠️ ${t('studioBadge')}</div>
        <h1 class="studio-title">${t('studioTitle')}</h1>
        <p class="studio-subtitle">${t('studioSub')}</p>
      </div>

      <!-- Top Tab Switcher -->
      <div class="studio-tab-bar">
        <button type="button" class="studio-tab-btn ${activeTab === 'pc' ? 'active' : ''}" onclick="switchStudioTab('pc')">
          ${t('tabPC')}
        </button>
        <button type="button" class="studio-tab-btn ${activeTab === 'laptop' ? 'active' : ''}" onclick="switchStudioTab('laptop')">
          ${t('tabLaptop')}
        </button>
      </div>

      <!-- 2-Column Studio Layout -->
      <div class="studio-layout">
        <!-- Left Column: Configurator -->
        <div class="studio-config-column" id="studioConfigCol">
          ${activeTab === 'pc' ? renderPcBuilderView() : renderLaptopStudioView()}
        </div>

        <!-- Right Column: Sticky Summary Panel -->
        <div class="studio-summary-column">
          <div class="summary-sticky-panel" id="studioSummaryPanel">
            ${renderStudioSummary()}
          </div>
        </div>
      </div>
    </div>
  `;
}

function switchStudioTab(tab) {
  if (!state.studio) state.studio = {};
  state.studio.activeTab = tab;
  renderApp();
}

function renderPcBuilderView() {
  const currentSelections = state.studio?.pc || {};
  const categories = Object.keys(pcHardwareCatalog);

  return categories.map(catKey => {
    const cat = pcHardwareCatalog[catKey];
    const catLabel = cat.label[state.lang] || cat.label.en;
    const selectedId = currentSelections[catKey] || cat.items[0].id;

    return `
      <div class="part-category-section" id="partSection_${catKey}">
        <div class="part-category-header">
          <div class="part-category-title">
            <span style="font-size:20px;">${cat.icon}</span>
            <span>${catLabel}</span>
          </div>
          <span class="match-pill-tag" style="margin-bottom:0;">Required</span>
        </div>

        <div class="part-options-grid">
          ${cat.items.map(item => {
            const isSelected = item.id === selectedId;
            return `
              <div
                class="part-option-card ${isSelected ? 'selected' : ''}"
                onclick="selectPcPart('${catKey}', '${item.id}')"
                role="button"
                tabindex="0">
                <div class="part-thumb">
                  <img src="${item.img}" alt="${escHtml(item.name)}" loading="lazy">
                </div>
                <div class="part-info">
                  <div class="part-name">${escHtml(item.name)}</div>
                  <div class="part-desc">${escHtml(item.desc)}</div>
                </div>
                <div class="part-price-meta">
                  <div class="part-price">${formatPrice(item.price)}</div>
                  ${item.watts > 0 ? `<div class="part-watts">⚡ ${item.watts}W</div>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderLaptopStudioView() {
  const laptopState = state.studio?.laptop || { baseModel: 'aerobook_16', ram: 'ram_32', storage: 'ssd_1tb', care: 'care_onsite_3y' };
  const currentModelId = laptopState.baseModel || 'aerobook_16';
  const upgrades = laptopStudioCatalog.upgrades;

  return `
    <!-- Step 1: Base Laptop Models -->
    <div class="part-category-section">
      <div class="part-category-header">
        <div class="part-category-title">
          <span style="font-size:20px;">💻</span>
          <span>1. เลือกรุ่นโน้ตบุ๊กหลัก (Choose Base Laptop Model)</span>
        </div>
        <span class="match-pill-tag" style="margin-bottom:0;">Base Hardware</span>
      </div>

      <div class="laptop-model-cards">
        ${laptopStudioCatalog.models.map(m => {
          const isSelected = m.id === currentModelId;
          return `
            <div
              class="laptop-base-card ${isSelected ? 'selected' : ''}"
              onclick="selectLaptopBase('${m.id}')"
              role="button"
              tabindex="0">
              <div class="laptop-base-thumb">
                <img src="${m.img}" alt="${escHtml(m.name)}" loading="lazy">
              </div>
              <div style="font-size:15.5px;font-weight:700;color:var(--text-pure);margin-bottom:4px;">${escHtml(m.name)}</div>
              <div style="font-size:12px;color:var(--accent);font-weight:600;margin-bottom:8px;">${escHtml(m.tagline)}</div>
              <div style="font-size:12px;color:var(--text-secondary);line-height:1.45;margin-bottom:12px;flex:1;">${escHtml(m.specs)}</div>
              <div style="font-family:'JetBrains Mono',monospace;font-size:18px;font-weight:800;color:var(--text-pure);margin-top:auto;">
                ${formatPrice(m.basePrice)}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Step 2: Configurable Upgrades -->
    ${Object.keys(upgrades).map((upKey, idx) => {
      const up = upgrades[upKey];
      const upLabel = up.label[state.lang] || up.label.en;
      const selectedOptionId = laptopState[upKey] || up.options[0].id;

      return `
        <div class="part-category-section">
          <div class="part-category-header">
            <div class="part-category-title">
              <span style="font-size:20px;">${upKey === 'ram' ? '💾' : upKey === 'storage' ? '💽' : '🛡️'}</span>
              <span>${idx + 2}. ${upLabel}</span>
            </div>
            <span class="match-pill-tag" style="margin-bottom:0;">Configurable</span>
          </div>

          <div class="part-options-grid">
            ${up.options.map(opt => {
              const isSelected = opt.id === selectedOptionId;
              return `
                <div
                  class="part-option-card ${isSelected ? 'selected' : ''}"
                  onclick="selectLaptopUpgrade('${upKey}', '${opt.id}')"
                  role="button"
                  tabindex="0">
                  <div class="part-info">
                    <div style="display:flex;align-items:center;gap:8px;">
                      <span class="part-name" style="margin-bottom:0;">${escHtml(opt.name)}</span>
                      <span class="stock-pill in-stock" style="font-size:10.5px;padding:1px 6px;">${escHtml(opt.tag)}</span>
                    </div>
                  </div>
                  <div class="part-price-meta">
                    <div class="part-price" style="color:${opt.delta > 0 ? 'var(--accent)' : 'var(--success)'};">
                      ${opt.delta === 0 ? (state.lang === 'th' ? 'รวมในราคาพื้นฐาน' : 'Included') : `+${formatPrice(opt.delta)}`}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('')}
  `;
}

function renderStudioSummary() {
  const activeTab = state.studio?.activeTab || 'pc';

  if (activeTab === 'pc') {
    const pc = state.studio?.pc || {};
    let totalPrice = 0;
    let totalWatts = 0;
    const itemsBreakdown = [];

    Object.keys(pcHardwareCatalog).forEach(catKey => {
      const cat = pcHardwareCatalog[catKey];
      const selectedId = pc[catKey] || cat.items[0].id;
      const item = cat.items.find(i => i.id === selectedId) || cat.items[0];
      totalPrice += item.price;
      totalWatts += (item.watts || 0);
      itemsBreakdown.push({
        catLabel: cat.label[state.lang] || cat.label.en,
        name: item.name,
        price: item.price,
        watts: item.watts
      });
    });

    const recommendedPsu = Math.max(750, Math.ceil((totalWatts * 1.35) / 100) * 100);
    const wattPercent = Math.min(100, Math.round((totalWatts / recommendedPsu) * 100));

    return `
      <div class="summary-header">
        <h3 class="summary-title">${t('summaryTitle')}</h3>
        <p style="font-size:12.5px;color:var(--text-muted);margin-top:2px;">Custom Desktop PC Architecture</p>
      </div>

      <!-- Selected Items Breakdown -->
      <div class="summary-items-list">
        ${itemsBreakdown.map(i => `
          <div class="summary-item-row">
            <span class="summary-item-label">${i.catLabel.split('(')[0]}</span>
            <span class="summary-item-val" title="${escHtml(i.name)}">${escHtml(i.name.split('(')[0])} (${formatPrice(i.price)})</span>
          </div>
        `).join('')}
      </div>

      <!-- Realtime Wattage Gauge -->
      <div class="wattage-meter-box">
        <div class="wattage-header">
          <span>⚡ ${t('estWattage')}</span>
          <span class="wattage-val">${totalWatts}W</span>
        </div>
        <div class="wattage-bar-track">
          <div class="wattage-bar-fill" style="width:${wattPercent}%;"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-muted);margin-top:6px;">
          <span>${t('recPsu')}: <b>${recommendedPsu}W+</b></span>
          <span>Load ~${wattPercent}%</span>
        </div>
      </div>

      <!-- Total & Add to Bag -->
      <div class="summary-total-box">
        <div class="summary-total-row">
          <span class="summary-total-label">${t('totalCustomPrice')}</span>
          <span class="summary-total-price">${formatPrice(totalPrice)}</span>
        </div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">Includes VAT, Professional Assembly &amp; 2-Year VIP Care</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        <button class="btn btn-primary btn-lg" style="width:100%;" onclick="addCustomStudioToCart()">
          ${t('addCustomToCart')}
        </button>
        <button class="btn btn-secondary btn-sm" style="width:100%;" onclick="resetCustomStudio()">
          ${t('resetStudio')}
        </button>
      </div>
    `;
  } else {
    // Mode 2: Laptop Summary
    const laptopState = state.studio?.laptop || { baseModel: 'aerobook_16', ram: 'ram_32', storage: 'ssd_1tb', care: 'care_onsite_3y' };
    const baseModel = laptopStudioCatalog.models.find(m => m.id === laptopState.baseModel) || laptopStudioCatalog.models[0];
    
    const ramOpt = laptopStudioCatalog.upgrades.ram.options.find(o => o.id === laptopState.ram) || laptopStudioCatalog.upgrades.ram.options[0];
    const ssdOpt = laptopStudioCatalog.upgrades.storage.options.find(o => o.id === laptopState.storage) || laptopStudioCatalog.upgrades.storage.options[0];
    const careOpt = laptopStudioCatalog.upgrades.care.options.find(o => o.id === laptopState.care) || laptopStudioCatalog.upgrades.care.options[0];

    const totalPrice = baseModel.basePrice + ramOpt.delta + ssdOpt.delta + careOpt.delta;

    return `
      <div class="summary-header">
        <h3 class="summary-title">${t('summaryTitle')}</h3>
        <p style="font-size:12.5px;color:var(--text-muted);margin-top:2px;">Bespoke Laptop Configuration</p>
      </div>

      <!-- Selected Items Breakdown -->
      <div class="summary-items-list">
        <div class="summary-item-row">
          <span class="summary-item-label">Base Model</span>
          <span class="summary-item-val">${escHtml(baseModel.name)} (${formatPrice(baseModel.basePrice)})</span>
        </div>
        <div class="summary-item-row">
          <span class="summary-item-label">RAM Memory</span>
          <span class="summary-item-val">${escHtml(ramOpt.name)} (${ramOpt.delta === 0 ? 'Included' : '+' + formatPrice(ramOpt.delta)})</span>
        </div>
        <div class="summary-item-row">
          <span class="summary-item-label">SSD Storage</span>
          <span class="summary-item-val">${escHtml(ssdOpt.name)} (${ssdOpt.delta === 0 ? 'Included' : '+' + formatPrice(ssdOpt.delta)})</span>
        </div>
        <div class="summary-item-row">
          <span class="summary-item-label">Warranty &amp; Care</span>
          <span class="summary-item-val">${escHtml(careOpt.name.split('+')[0])} (${careOpt.delta === 0 ? 'Included' : '+' + formatPrice(careOpt.delta)})</span>
        </div>
      </div>

      <!-- Total & Add to Bag -->
      <div class="summary-total-box">
        <div class="summary-total-row">
          <span class="summary-total-label">${t('totalCustomPrice')}</span>
          <span class="summary-total-price">${formatPrice(totalPrice)}</span>
        </div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">Factory Calibrated with Laser-Etched Serial Number</div>
      </div>

      <div style="display:flex;flex-direction:column;gap:10px;">
        <button class="btn btn-primary btn-lg" style="width:100%;" onclick="addCustomStudioToCart()">
          ${t('addCustomToCart')}
        </button>
        <button class="btn btn-secondary btn-sm" style="width:100%;" onclick="resetCustomStudio()">
          ${t('resetStudio')}
        </button>
      </div>
    `;
  }
}

function selectPcPart(catKey, partId) {
  if (!state.studio) state.studio = { activeTab: 'pc', pc: {}, laptop: {} };
  if (!state.studio.pc) state.studio.pc = {};
  state.studio.pc[catKey] = partId;

  // Update selection UI in part category section
  const section = document.getElementById(`partSection_${catKey}`);
  if (section) {
    const items = pcHardwareCatalog[catKey]?.items || [];
    section.querySelectorAll('.part-option-card').forEach((card, idx) => {
      const isSelected = items[idx]?.id === partId;
      card.classList.toggle('selected', isSelected);
    });
  }

  // Update Summary Panel
  const panel = document.getElementById('studioSummaryPanel');
  if (panel) panel.innerHTML = renderStudioSummary();
}

function selectLaptopBase(modelId) {
  if (!state.studio) state.studio = { activeTab: 'laptop', pc: {}, laptop: {} };
  if (!state.studio.laptop) state.studio.laptop = {};
  state.studio.laptop.baseModel = modelId;

  const col = document.getElementById('studioConfigCol');
  const panel = document.getElementById('studioSummaryPanel');
  if (col) col.innerHTML = renderLaptopStudioView();
  if (panel) panel.innerHTML = renderStudioSummary();
}

function selectLaptopUpgrade(upKey, optionId) {
  if (!state.studio) state.studio = { activeTab: 'laptop', pc: {}, laptop: {} };
  if (!state.studio.laptop) state.studio.laptop = {};
  state.studio.laptop[upKey] = optionId;

  const col = document.getElementById('studioConfigCol');
  const panel = document.getElementById('studioSummaryPanel');
  if (col) col.innerHTML = renderLaptopStudioView();
  if (panel) panel.innerHTML = renderStudioSummary();
}

function addCustomStudioToCart() {
  const activeTab = state.studio?.activeTab || 'pc';

  if (activeTab === 'pc') {
    const pc = state.studio?.pc || {};
    let totalPrice = 0;
    const specsArray = [];

    Object.keys(pcHardwareCatalog).forEach(catKey => {
      const cat = pcHardwareCatalog[catKey];
      const selectedId = pc[catKey] || cat.items[0].id;
      const item = cat.items.find(i => i.id === selectedId) || cat.items[0];
      totalPrice += item.price;
      specsArray.push(`${cat.icon} ${item.name.split('(')[0].trim()}`);
    });

    const customPcItem = {
      id: `custom_pc_${Date.now()}`,
      title: `${t('customPcBuildTitle')} (${specsArray[0].split(' ')[1]} · ${specsArray[2].split(' ')[1]})`,
      price: totalPrice,
      quantity: 1,
      variant: specsArray.join(' | '),
      thumbnail: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=400&q=80',
      category_name: 'Custom Desktop PC'
    };

    state.cart.push(customPcItem);
    saveCart();
    updateBagUI();
    showToast(state.lang === 'th' ? `เพิ่มชุดประกอบคอมพิวเตอร์ลงในถุงแล้ว (${formatPrice(totalPrice)})` : `Custom PC Build added to Bag (${formatPrice(totalPrice)})`, 'success');
    openBag();
  } else {
    // Mode 2: Laptop
    const laptopState = state.studio?.laptop || { baseModel: 'aerobook_16', ram: 'ram_32', storage: 'ssd_1tb', care: 'care_onsite_3y' };
    const baseModel = laptopStudioCatalog.models.find(m => m.id === laptopState.baseModel) || laptopStudioCatalog.models[0];
    const ramOpt = laptopStudioCatalog.upgrades.ram.options.find(o => o.id === laptopState.ram) || laptopStudioCatalog.upgrades.ram.options[0];
    const ssdOpt = laptopStudioCatalog.upgrades.storage.options.find(o => o.id === laptopState.storage) || laptopStudioCatalog.upgrades.storage.options[0];
    const careOpt = laptopStudioCatalog.upgrades.care.options.find(o => o.id === laptopState.care) || laptopStudioCatalog.upgrades.care.options[0];

    const totalPrice = baseModel.basePrice + ramOpt.delta + ssdOpt.delta + careOpt.delta;
    const specDetails = `${baseModel.name} · ${ramOpt.name} · ${ssdOpt.name} · ${careOpt.name.split('+')[0]}`;

    const customLaptopItem = {
      id: `custom_laptop_${Date.now()}`,
      title: `${t('customLaptopTitle')} — ${baseModel.name}`,
      price: totalPrice,
      quantity: 1,
      variant: specDetails,
      thumbnail: baseModel.img,
      category_name: 'Custom Laptop'
    };

    state.cart.push(customLaptopItem);
    saveCart();
    updateBagUI();
    showToast(state.lang === 'th' ? `เพิ่มโน้ตบุ๊กสั่งปรับแต่งลงในถุงแล้ว (${formatPrice(totalPrice)})` : `Custom Configured Laptop added to Bag (${formatPrice(totalPrice)})`, 'success');
    openBag();
  }
}

function resetCustomStudio() {
  state.studio = {
    activeTab: state.studio?.activeTab || 'pc',
    pc: {
      cpu: 'intel_i9',
      mb: 'asus_z790',
      gpu: 'rtx4090',
      ram: 'gskill_64',
      storage: 'samsung_2tb',
      psu: 'corsair_1600',
      case: 'lianli_o11',
    },
    laptop: {
      baseModel: 'aerobook_16',
      ram: 'ram_16',
      storage: 'ssd_512',
      care: 'care_std_1y',
    }
  };
  renderApp();
  showToast(state.lang === 'th' ? 'รีเซ็ตสเปกเริ่มต้นเรียบร้อยแล้ว' : 'Configuration reset to defaults', 'info');
}

// ============================================================================
// 14. VIEW: PRODUCTS CATALOG
// ============================================================================
async function viewProducts(params = new URLSearchParams()) {
  const catParam = params.get('category') || '';
  const sortParam = params.get('sort') || '';
  const searchParam = params.get('q') || '';

  const qs = new URLSearchParams();
  if (catParam) qs.set('category', catParam);
  if (sortParam) qs.set('sort', sortParam);
  if (searchParam) qs.set('q', searchParam);

  const [products, categories] = await Promise.all([
    api(`/api/products?${qs.toString()}`),
    api('/api/categories'),
  ]);

  state.products = products || [];
  state.categories = categories || [];

  const currentCat = categories.find(c => String(c.id) === String(catParam));

  return `
    <div class="wrap" style="padding-top:20px;">
      <div class="catalog-header">
        <h1 class="catalog-title">${currentCat ? escHtml(currentCat.name) : t('allCollections')}</h1>
        <p class="catalog-sub">
          ${currentCat
            ? `Curated showcase for ${escHtml(currentCat.name)} engineering.`
            : 'The complete portfolio of world-class technology and precision hardware.'}
        </p>
      </div>

      <div class="filter-bar">
        <div class="category-chips">
          <a href="#/products" class="chip ${!catParam ? 'active' : ''}">${t('allCollections')}</a>
          ${categories.map(c => `
            <a href="#/products?category=${c.id}${sortParam ? '&sort=' + sortParam : ''}"
               class="chip ${String(catParam) === String(c.id) ? 'active' : ''}">
              ${escHtml(c.name)}
            </a>`).join('')}
        </div>
        <div class="filter-actions">
          <select class="select-box" onchange="location.hash='#/products?category=${catParam}&sort='+this.value">
            <option value="" ${!sortParam ? 'selected' : ''}>Featured</option>
            <option value="price_asc" ${sortParam === 'price_asc' ? 'selected' : ''}>Price: Low to High</option>
            <option value="price_desc" ${sortParam === 'price_desc' ? 'selected' : ''}>Price: High to Low</option>
            <option value="newest" ${sortParam === 'newest' ? 'selected' : ''}>Newest Releases</option>
          </select>
        </div>
      </div>

      ${products.length === 0
        ? `<div style="text-align:center;padding:100px 0;color:var(--text-muted);">
            <div style="font-size:48px;margin-bottom:12px;">🔍</div>
            <h3>No products found</h3>
            <a href="#/products" class="btn btn-primary" style="margin-top:16px;">View All Collections</a>
           </div>`
        : `<div class="product-grid">${products.map(renderFeaturedProductCard).join('')}</div>`
      }
    </div>`;
}

async function handleQuickAdd(productId) {
  try {
    const product = await api(`/api/products/${productId}`);
    addToCart(product, 1, null);
  } catch {
    showToast('Could not add item to cart', 'error');
  }
}

// ============================================================================
// 15. VIEW: PRODUCT DETAIL
// ============================================================================
let _detailQty = 1;

async function viewProductDetail(id) {
  if (!id) return viewHome();

  const [product, reviews] = await Promise.all([
    api(`/api/products/${id}`),
    api(`/api/reviews/${id}`).catch(() => []),
  ]);

  if (!product?.id) throw new Error('Product not found');

  const images = (product.images?.length > 0)
    ? product.images
    : [{ id: 0, url: product.thumbnail || '' }];

  const isWish = state.wishlist.includes(Number(product.id));
  _detailQty = 1;

  const stockClass = product.stock > 5 ? 'in-stock' : product.stock > 0 ? 'low' : 'out';
  const stockLabel = product.stock > 5 ? t('inStock') : product.stock > 0 ? t('lowStock', { n: product.stock }) : t('specialOrder');

  return `
    <div class="wrap">
      <div class="detail-layout">
        <!-- Gallery -->
        <div class="gallery-sticky">
          <div class="gallery-stage" id="galleryMainStage">
            ${images[0].url
              ? `<img src="${images[0].url}" id="activeGalleryImg" alt="${escHtml(product.title)}">`
              : `<div style="font-size:100px;">${product.icon || '📦'}</div>`}
          </div>
          ${images.length > 1 ? `
            <div class="gallery-thumbs-row">
              ${images.map((img, idx) => `
                <div class="thumb-item ${idx === 0 ? 'active' : ''}" onclick="switchGalleryImg('${escHtml(img.url)}', this)" role="button" tabindex="0">
                  <img src="${img.url}" alt="${escHtml(product.title)} view ${idx + 1}" loading="lazy">
                </div>`).join('')}
            </div>` : ''}
        </div>

        <!-- Purchase Column -->
        <div class="detail-info">
          <div class="detail-eyebrow">${escHtml(product.category_name || 'FLAGSHIP HARDWARE')}</div>
          <h1 class="detail-title">${escHtml(product.title)}</h1>

          <div class="detail-rating-row">
            <span class="stars-gold">★ ★ ★ ★ ★</span>
            <span><b>${product.avg_rating || '5.0'}</b> (${product.review_count || reviews.length || 3} ${t('verifiedReviews')})</span>
          </div>

          <div class="detail-price-box">
            <div>
              <div class="detail-price">${formatPrice(product.price)}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">Includes VAT &amp; 2-Year Care</div>
            </div>
            <span class="stock-pill ${stockClass}">
              <span style="width:6px;height:6px;border-radius:50%;background:currentColor;"></span>
              ${stockLabel}
            </span>
          </div>

          <p class="detail-desc-text">${escHtml(product.description || '')}</p>

          <div class="option-group">
            <div class="option-label">Finish / Architecture</div>
            <div class="option-pills">
              <button class="opt-pill active" onclick="selectVariant(this)">Titanium Black</button>
              <button class="opt-pill" onclick="selectVariant(this)">Anodized Silver</button>
              <button class="opt-pill" onclick="selectVariant(this)">Carbon Graphite</button>
            </div>
          </div>

          <div class="qty-stepper-row">
            <span style="font-size:13px;font-weight:600;color:var(--text-pure);">Quantity:</span>
            <div class="qty-stepper">
              <button class="qty-step-btn" onclick="changeDetailQty(-1)" aria-label="Decrease">${Icons.minus}</button>
              <span class="qty-value" id="detailQtyVal">1</span>
              <button class="qty-step-btn" onclick="changeDetailQty(1)" aria-label="Increase">${Icons.plus}</button>
            </div>
          </div>

          <div class="detail-actions-row">
            <button class="btn btn-primary btn-lg" style="flex:1.2;"
              onclick="addDetailToBag(${product.id})"
              ${product.stock <= 0 ? 'disabled style="opacity:0.5;"' : ''}>
              ${Icons.bag} ${t('addToBag')}
            </button>

            <button class="btn btn-dark btn-lg" style="flex:1;"
              onclick="handleBuyNow(${product.id})"
              ${product.stock <= 0 ? 'disabled style="opacity:0.5;"' : ''}>
              ⚡ ${t('buyNow')}
            </button>

            <!-- Facebook Share Button -->
            <button class="btn btn-facebook"
              onclick="shareToFacebook(${product.id}, '${escHtml(product.title).replace(/'/g, "\\'")}', ${product.price})"
              title="Share on Facebook">
              ${Icons.facebook} ${t('shareFacebook')}
            </button>

            <button class="btn btn-secondary"
              data-wishid="${product.id}"
              onclick="toggleWishlist(${product.id})"
              title="Wishlist"
              style="${isWish ? 'color:var(--danger);' : ''}">
              ${isWish ? Icons.heartFilled : Icons.heart}
            </button>
          </div>

          <div class="assurance-grid">
            <div class="assurance-item"><div class="icon">🛡️</div><div class="title">2-Year Warranty</div><div class="sub">Direct replacement</div></div>
            <div class="assurance-item"><div class="icon">⚡</div><div class="title">24H Courier</div><div class="sub">White-glove delivery</div></div>
            <div class="assurance-item"><div class="icon">💎</div><div class="title">VIP Concierge</div><div class="sub">24/7 Specialist support</div></div>
          </div>
        </div>
      </div>

      <!-- Storytelling & Specs Matrix -->
      <section class="storytelling-section">
        <div class="story-hero-block">
          <div class="section-eyebrow">ENGINEERING BREAKDOWN</div>
          <h2>Engineered for performance.</h2>
          <p>Crafted with uncompromising precision. From silicon thermal architecture to acoustic dampening, every millimeter is designed for peak computational mastery.</p>
        </div>

        <div class="specs-table-box">
          <h3 style="font-size:20px;font-weight:700;margin-bottom:24px;">${t('specsMatrix')}</h3>
          <div class="specs-grid">
            <div class="spec-item"><div class="spec-label">Chassis &amp; Material</div><div class="spec-val">CNC Machined 6063 Aluminum &amp; Magnesium Unibody</div></div>
            <div class="spec-item"><div class="spec-label">Thermal Management</div><div class="spec-val">Dual-Axial Vapor Chamber with Ultra-Low dB Acoustics</div></div>
            <div class="spec-item"><div class="spec-label">Connectivity</div><div class="spec-val">Thunderbolt 4 / PCIe 5.0 / Wi-Fi 7 Ultra-Broadband</div></div>
            <div class="spec-item"><div class="spec-label">Power &amp; Efficiency</div><div class="spec-val">Titanium 80 Plus Efficiency Architecture</div></div>
            <div class="spec-item"><div class="spec-label">Warranty Coverage</div><div class="spec-val">24-Month TechNova Global Care + Rapid Swap</div></div>
            <div class="spec-item"><div class="spec-label">Origin &amp; Testing</div><div class="spec-val">Individually Stress-Tested &amp; Factory Calibrated</div></div>
          </div>
        </div>

        <div class="reviews-section">
          <h3 style="font-size:22px;font-weight:700;margin-bottom:24px;">${t('verifiedReviews')}</h3>
          ${reviews.length === 0
            ? `<p style="color:var(--text-muted);font-size:14px;padding:24px 0;">No reviews yet. Be the first client to review this flagship hardware.</p>`
            : reviews.map(r => `
              <div class="review-item">
                <div class="review-avatar">${r.user_name ? escHtml(r.user_name.charAt(0).toUpperCase()) : 'C'}</div>
                <div class="review-content" style="flex:1;">
                  <h4>${escHtml(r.user_name || 'Verified Client')} <span class="stars-gold">${'★'.repeat(Math.min(5, Math.max(1, r.rating || 5)))}</span></h4>
                  <div class="review-date">${new Date(r.created_at).toLocaleDateString()} · Verified Buyer</div>
                  <p class="review-text">${escHtml(r.comment || '')}</p>
                </div>
              </div>`).join('')
          }
        </div>
      </section>
    </div>`;
}

function switchGalleryImg(url, el) {
  const mainImg = document.getElementById('activeGalleryImg');
  if (mainImg && url) mainImg.src = url;
  document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
  el?.classList.add('active');
}

function selectVariant(el) {
  document.querySelectorAll('.opt-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
}

function changeDetailQty(delta) {
  _detailQty = Math.max(1, Math.min(99, _detailQty + delta));
  const el = document.getElementById('detailQtyVal');
  if (el) el.textContent = _detailQty;
}

async function addDetailToBag(productId) {
  try {
    const product = await api(`/api/products/${productId}`);
    const variant = document.querySelector('.opt-pill.active')?.textContent?.trim() || 'Default';
    addToCart(product, _detailQty, variant);
  } catch {
    showToast('Could not add item to bag', 'error');
  }
}

async function handleBuyNow(productId) {
  try {
    const product = await api(`/api/products/${productId}`);
    const variant = document.querySelector('.opt-pill.active')?.textContent?.trim() || 'Default';
    addToCart(product, _detailQty, variant);
    closeBag();
    location.hash = '#/checkout';
  } catch {
    showToast('Could not proceed to checkout', 'error');
  }
}

// ============================================================================
// 16. VIEW: MARKETING REGISTRATION FORM
// ============================================================================
async function viewRegister() {
  if (state.user) { location.hash = '#/'; return ''; }

  return `
    <div class="wrap">
      <div class="reg-marketing-card">
        <div style="text-align:center;margin-bottom:28px;">
          <div style="font-size:36px;margin-bottom:8px;">💎</div>
          <h2 style="font-size:28px;font-weight:800;margin-bottom:8px;">${state.lang === 'th' ? 'สมัครสมาชิก TechNova Club' : 'Create TechNova Account'}</h2>
          <p style="font-size:14px;color:var(--text-secondary);">
            ${state.lang === 'th' ? 'รับสิทธิพิเศษ ส่วนลดสมาชิก 10% และบริการดูแลระดับ VIP Concierge' : 'Join our exclusive technology club for member privileges & VIP concierge.'}
          </p>
        </div>

        <form id="marketingRegisterForm" onsubmit="handleMarketingRegister(event)">
          
          <!-- 1. Name & Email -->
          <div class="field-group">
            <label class="field-label">${state.lang === 'th' ? 'ชื่อ-นามสกุล' : 'Full Name'} *</label>
            <input type="text" id="regName" class="input-field" placeholder="${state.lang === 'th' ? 'เช่น ยศวริศ อาจนนท์ลา' : 'e.g. Alex Harrison'}" required>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="field-group">
              <label class="field-label">${state.lang === 'th' ? 'อีเมล' : 'Email Address'} *</label>
              <input type="email" id="regEmail" class="input-field" placeholder="client@technova.com" required>
            </div>
            <div class="field-group">
              <label class="field-label">${state.lang === 'th' ? 'เบอร์โทรศัพท์' : 'Phone Number'} *</label>
              <input type="tel" id="regPhone" class="input-field" placeholder="081-xxx-xxxx" required>
            </div>
          </div>

          <!-- 2. Date of Birth & Gender -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="field-group">
              <label class="field-label">${state.lang === 'th' ? 'วัน/เดือน/ปีเกิด' : 'Date of Birth'}</label>
              <input type="date" id="regDob" class="input-field">
            </div>
            <div class="field-group">
              <label class="field-label">${state.lang === 'th' ? 'เพศ' : 'Gender'}</label>
              <select id="regGender" class="input-field" style="cursor:pointer;">
                <option value="unspecified">${state.lang === 'th' ? 'ไม่ระบุ / Prefer not to say' : 'Prefer not to say'}</option>
                <option value="male">${state.lang === 'th' ? 'ชาย / Male' : 'Male'}</option>
                <option value="female">${state.lang === 'th' ? 'หญิง / Female' : 'Female'}</option>
                <option value="other">${state.lang === 'th' ? 'อื่นๆ / Other' : 'Other'}</option>
              </select>
            </div>
          </div>

          <!-- 3. Acquisition Channel (ช่องทางที่รู้จักเรา) -->
          <div class="field-group">
            <label class="field-label">${state.lang === 'th' ? 'รู้จักเราผ่านช่องทางใด?' : 'How did you hear about us?'}</label>
            <select id="regChannel" class="input-field" style="cursor:pointer;">
              <option value="facebook">Facebook</option>
              <option value="tiktok">TikTok</option>
              <option value="instagram">Instagram</option>
              <option value="google">Google Search</option>
              <option value="friends">${state.lang === 'th' ? 'เพื่อน / คนรู้จักแนะนำ' : 'Friend Recommendation'}</option>
              <option value="other">${state.lang === 'th' ? 'อื่นๆ' : 'Other'}</option>
            </select>
          </div>

          <!-- 4. Personalized Tech Profile Setup Wizard (3-Step Chip System) -->
          <div class="tech-profile-wizard-card">
            <div class="tech-profile-header">
              <div class="tech-profile-badge">
                <span>⚡</span>
                <span>${state.lang === 'th' ? 'ปรับแต่งโปรไฟล์เทคโนโลยีของคุณ' : 'Personalize Your Tech Profile'}</span>
              </div>
              <h3 class="tech-profile-title">
                ${state.lang === 'th' ? 'เลือกแนวทางและสไตล์ฮาร์ดแวร์ที่คุณสนใจ' : 'Tailor Your Tech Experience'}
              </h3>
              <p class="tech-profile-desc">
                ${state.lang === 'th' ? 'เราจะคัดสรรสินค้า ดีลส่วนลด และคอนเทนต์พิเศษให้ตรงกับความต้องการของคุณมากที่สุด' : 'We will curate hardware recommendations, special deals, and guides aligned with your passion.'}
              </p>
            </div>

            <!-- Step 1: Primary Hardware Focus (Single Select) -->
            <div class="tech-step-group">
              <div class="tech-step-heading">
                <span class="tech-step-pill">1</span>
                <span class="tech-step-label">${state.lang === 'th' ? 'เลือกสายเทคโนโลยีหลักที่คุณสนใจ (Primary Hardware Focus)' : 'Primary Hardware Focus (Choose 1)'}</span>
              </div>
              <div class="tech-chips-grid step-1-grid">
                <label class="tech-chip-item">
                  <input type="radio" name="regPrimaryInterest" value="gaming" checked>
                  <div class="tech-chip-card">
                    <span class="tech-chip-icon">🎮</span>
                    <div class="tech-chip-text">
                      <span class="tech-chip-title">${state.lang === 'th' ? 'PC Gaming & Esports' : 'PC Gaming & Esports'}</span>
                      <span class="tech-chip-sub">${state.lang === 'th' ? 'เกมมิ่งริกส์, จอไว และอุปกรณ์แข่งขัน' : 'High FPS Rigs, Handhelds & Fast Displays'}</span>
                    </div>
                    <span class="tech-chip-check">✓</span>
                  </div>
                </label>

                <label class="tech-chip-item">
                  <input type="radio" name="regPrimaryInterest" value="creator">
                  <div class="tech-chip-card">
                    <span class="tech-chip-icon">🎨</span>
                    <div class="tech-chip-text">
                      <span class="tech-chip-title">${state.lang === 'th' ? 'Content Creation & 3D' : 'Content Creation & 3D'}</span>
                      <span class="tech-chip-sub">${state.lang === 'th' ? 'จอ 4K OLED, เรนเดอร์ 3D และกราฟิก' : '4K OLED, Color Grading & 3D Renders'}</span>
                    </div>
                    <span class="tech-chip-check">✓</span>
                  </div>
                </label>

                <label class="tech-chip-item">
                  <input type="radio" name="regPrimaryInterest" value="enterprise">
                  <div class="tech-chip-card">
                    <span class="tech-chip-icon">💼</span>
                    <div class="tech-chip-text">
                      <span class="tech-chip-title">${state.lang === 'th' ? 'Enterprise & Workstation' : 'Enterprise & Workstation'}</span>
                      <span class="tech-chip-sub">${state.lang === 'th' ? 'เซิร์ฟเวอร์, เครือข่าย Wi-Fi 7, แท่นด็อกกิ้ง' : 'Servers, Wi-Fi 7 Core & Docks'}</span>
                    </div>
                    <span class="tech-chip-check">✓</span>
                  </div>
                </label>

                <label class="tech-chip-item">
                  <input type="radio" name="regPrimaryInterest" value="custom_desk">
                  <div class="tech-chip-card">
                    <span class="tech-chip-icon">⌨️</span>
                    <div class="tech-chip-text">
                      <span class="tech-chip-title">${state.lang === 'th' ? 'Custom Keyboards & Desk Setup' : 'Custom Keyboards & Desk Setup'}</span>
                      <span class="tech-chip-sub">${state.lang === 'th' ? 'คีย์บอร์ด CNC, เมาส์ และโต๊ะทำงานสวย' : 'CNC Mechanicals, Desk Mats & Ergonomics'}</span>
                    </div>
                    <span class="tech-chip-check">✓</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Step 2: Experience & Setup Preference (Single Select) -->
            <div class="tech-step-group">
              <div class="tech-step-heading">
                <span class="tech-step-pill">2</span>
                <span class="tech-step-label">${state.lang === 'th' ? 'สไตล์อุปกรณ์ที่คุณชื่นชอบ (Setup Preference)' : 'Setup & Performance Style (Choose 1)'}</span>
              </div>
              <div class="tech-chips-grid step-2-grid">
                <label class="tech-chip-item">
                  <input type="radio" name="regSetupStyle" value="flagship" checked>
                  <div class="tech-chip-card">
                    <span class="tech-chip-icon">🔥</span>
                    <div class="tech-chip-text">
                      <span class="tech-chip-title">${state.lang === 'th' ? 'Ultimate Flagship' : 'Ultimate Flagship'}</span>
                      <span class="tech-chip-sub">${state.lang === 'th' ? 'ประสิทธิภาพสูงสุด ไร้ขีดจำกัด' : 'Max Performance & Zero Compromise'}</span>
                    </div>
                    <span class="tech-chip-check">✓</span>
                  </div>
                </label>

                <label class="tech-chip-item">
                  <input type="radio" name="regSetupStyle" value="value">
                  <div class="tech-chip-card">
                    <span class="tech-chip-icon">🌱</span>
                    <div class="tech-chip-text">
                      <span class="tech-chip-title">${state.lang === 'th' ? 'Best Value / ROI' : 'Best Value / ROI'}</span>
                      <span class="tech-chip-sub">${state.lang === 'th' ? 'คุ้มค่าเงินและตอบโจทย์สูงสุด' : 'High Performance-to-Price Ratio'}</span>
                    </div>
                    <span class="tech-chip-check">✓</span>
                  </div>
                </label>

                <label class="tech-chip-item">
                  <input type="radio" name="regSetupStyle" value="silent_minimal">
                  <div class="tech-chip-card">
                    <span class="tech-chip-icon">🤫</span>
                    <div class="tech-chip-text">
                      <span class="tech-chip-title">${state.lang === 'th' ? 'Minimal & Silent' : 'Minimal & Silent'}</span>
                      <span class="tech-chip-sub">${state.lang === 'th' ? 'เรียบหรู เสียงเงียบ และคลีน' : 'Clean Aesthetics & Whisper Quiet'}</span>
                    </div>
                    <span class="tech-chip-check">✓</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Step 3: Deal & Notification Preferences (Multi Select) -->
            <div class="tech-step-group">
              <div class="tech-step-heading">
                <span class="tech-step-pill">3</span>
                <span class="tech-step-label">${state.lang === 'th' ? 'ข้อมูลและสิทธิพิเศษที่คุณต้องการรับ (Notification Preferences)' : 'Topics & Deals You Want (Select all that apply)'}</span>
              </div>
              <div class="tech-chips-grid step-3-grid">
                <label class="tech-chip-item">
                  <input type="checkbox" name="regTopics" value="flash_deals" checked>
                  <div class="tech-chip-card">
                    <span class="tech-chip-icon">⚡</span>
                    <div class="tech-chip-text">
                      <span class="tech-chip-title">${state.lang === 'th' ? 'Flash Sale & คูปอง' : 'Flash Sales & Coupons'}</span>
                      <span class="tech-chip-sub">${state.lang === 'th' ? 'รับส่วนลด VIP 10-30% ก่อนใคร' : 'Exclusive VIP 10-30% Discounts'}</span>
                    </div>
                    <span class="tech-chip-check">✓</span>
                  </div>
                </label>

                <label class="tech-chip-item">
                  <input type="checkbox" name="regTopics" value="new_releases" checked>
                  <div class="tech-chip-card">
                    <span class="tech-chip-icon">📦</span>
                    <div class="tech-chip-text">
                      <span class="tech-chip-title">${state.lang === 'th' ? 'ฮาร์ดแวร์เปิดตัวใหม่' : 'New Hardware Launches'}</span>
                      <span class="tech-chip-sub">${state.lang === 'th' ? 'สิทธิ์จองสินค้ารอบแรก (Day 1)' : 'First-day launch preorder access'}</span>
                    </div>
                    <span class="tech-chip-check">✓</span>
                  </div>
                </label>

                <label class="tech-chip-item">
                  <input type="checkbox" name="regTopics" value="tuning_guides">
                  <div class="tech-chip-card">
                    <span class="tech-chip-icon">🛠️</span>
                    <div class="tech-chip-text">
                      <span class="tech-chip-title">${state.lang === 'th' ? 'คู่มือประกอบ & ปรับแต่ง' : 'DIY & Tuning Guides'}</span>
                      <span class="tech-chip-sub">${state.lang === 'th' ? 'ทริคประกอบคอมและระบายความร้อน' : 'Thermal & Overclock benchmarks'}</span>
                    </div>
                    <span class="tech-chip-check">✓</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <!-- 5. Password & Confirm -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div class="field-group">
              <label class="field-label">${state.lang === 'th' ? 'รหัสผ่าน (อย่างน้อย 6 ตัว)' : 'Password'} *</label>
              <input type="password" id="regPass" class="input-field" placeholder="••••••••" minlength="6" required>
            </div>
            <div class="field-group">
              <label class="field-label">${state.lang === 'th' ? 'ยืนยันรหัสผ่าน' : 'Confirm Password'} *</label>
              <input type="password" id="regPassConfirm" class="input-field" placeholder="••••••••" minlength="6" required>
            </div>
          </div>

          <!-- 6. Consents -->
          <div style="margin:20px 0 28px;display:flex;flex-direction:column;gap:12px;">
            <label style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--text-secondary);cursor:pointer;">
              <input type="checkbox" id="chkMarketingConsent" checked style="margin-top:3px;accent-color:var(--accent);">
              <span>${state.lang === 'th' ? 'ยินยอมรับข้อมูลข่าวสารโปรโมชัน ส่วนลดพิเศษ และสิทธิประโยชน์สมาชิกผ่านทางอีเมลและ SMS' : 'I agree to receive promotional updates, VIP discounts, and member perks via Email/SMS.'}</span>
            </label>
            <label style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:var(--text-secondary);cursor:pointer;">
              <input type="checkbox" id="chkTermsConsent" required checked style="margin-top:3px;accent-color:var(--accent);">
              <span>${state.lang === 'th' ? 'ฉันได้อ่านและยอมรับ เงื่อนไขการให้บริการ และ นโยบายความเป็นส่วนตัว (PDPA) ของ TechNova' : 'I have read and agree to TechNova Terms of Service and Privacy Policy.'} *</span>
            </label>
          </div>

          <button type="submit" id="regSubmitBtn" class="btn btn-primary btn-lg" style="width:100%;">
            ${state.lang === 'th' ? 'ยืนยันการสมัครสมาชิก' : 'Create Account & Join VIP Club'}
          </button>
        </form>

        <div style="text-align:center;margin-top:24px;font-size:13.5px;color:var(--text-muted);">
          ${state.lang === 'th' ? 'มีบัญชีสมาชิกอยู่แล้ว?' : 'Already have an account?'} <a href="#/login" style="color:var(--accent);font-weight:700;">${t('clientSignIn')}</a>
        </div>
      </div>
    </div>`;
}

async function handleMarketingRegister(e) {
  e.preventDefault();
  const btn = document.getElementById('regSubmitBtn');
  const name = document.getElementById('regName')?.value?.trim();
  const email = document.getElementById('regEmail')?.value?.trim();
  const phone = document.getElementById('regPhone')?.value?.trim();
  const birth_date = document.getElementById('regDob')?.value || null;
  const gender = document.getElementById('regGender')?.value || 'unspecified';
  const referral_source = document.getElementById('regChannel')?.value || null;

  // Extract Tech Profile Preferences
  const primary_interest = document.querySelector('input[name="regPrimaryInterest"]:checked')?.value || 'gaming';
  const setup_style = document.querySelector('input[name="regSetupStyle"]:checked')?.value || 'flagship';
  const subscribed_topics = Array.from(document.querySelectorAll('input[name="regTopics"]:checked')).map(el => el.value);

  const pass = document.getElementById('regPass')?.value;
  const passConfirm = document.getElementById('regPassConfirm')?.value;

  if (!name || !email || !pass) {
    showToast(state.lang === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill all required fields', 'error');
    return;
  }
  if (pass !== passConfirm) {
    showToast(state.lang === 'th' ? 'รหัสผ่านทั้งสองช่องไม่ตรงกัน' : 'Passwords do not match', 'error');
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Processing...'; }

  try {
    const res = await api('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        password: pass,
        phone,
        birth_date,
        gender,
        referral_source,
        primary_interest,
        setup_style,
        subscribed_topics,
      }),
    });

    state.user = res.user;
    renderNav();
    showToast(state.lang === 'th' ? 'สมัครสมาชิกสำเร็จ! ยินดีต้อนรับสู่ TechNova 🎉' : 'Registration Successful! Welcome to TechNova 🎉', 'success');
    location.hash = '#/';
  } catch (err) {
    showToast(err.message || 'Registration failed', 'error');
    if (btn) { btn.disabled = false; btn.textContent = state.lang === 'th' ? 'ยืนยันการสมัครสมาชิก' : 'Create Account'; }
  }
}

// ============================================================================
// 17. VIEW: AUTH LOGIN
// ============================================================================
async function viewLogin() {
  if (state.user) { location.hash = '#/'; return ''; }

  return `
    <div class="wrap" style="max-width:440px;padding:80px 20px;">
      <div class="card-panel">
        <h2 style="font-size:24px;font-weight:700;margin-bottom:8px;">${t('clientSignIn')}</h2>
        <p style="font-size:13.5px;color:var(--text-secondary);margin-bottom:24px;">
          ${state.lang === 'th' ? 'เข้าถึง Wishlist, ติดตามสถานะพัสดุ และบริการ VIP' : 'Access your curated wishlist, past orders, and concierge support.'}
        </p>

        <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:12px;margin-bottom:20px;">
          <div style="font-size:11px;font-weight:700;color:var(--text-muted);margin-bottom:8px;">QUICK DEMO ACCOUNTS:</div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="fillDemoLogin('admin@store.com','admin123')">👑 Admin</button>
            <button class="btn btn-secondary btn-sm" style="flex:1;" onclick="fillDemoLogin('customer@store.com','customer123')">👤 VIP Client</button>
          </div>
        </div>

        <form id="loginForm" onsubmit="handleLogin(event)">
          <div class="field-group">
            <label class="field-label">${state.lang === 'th' ? 'อีเมล' : 'Email Address'}</label>
            <input type="email" id="logEmail" class="input-field" placeholder="client@technova.com" autocomplete="email" required>
          </div>
          <div class="field-group">
            <label class="field-label">${state.lang === 'th' ? 'รหัสผ่าน' : 'Password'}</label>
            <input type="password" id="logPass" class="input-field" placeholder="••••••••" autocomplete="current-password" required>
          </div>
          <button type="submit" id="loginBtn" class="btn btn-primary btn-lg" style="width:100%;margin-top:12px;">
            ${t('signInPrompt')}
          </button>
        </form>

        <div style="text-align:center;margin-top:20px;font-size:13px;color:var(--text-muted);">
          ${state.lang === 'th' ? 'ยังไม่มีบัญชี?' : 'New to TechNova?'} <a href="#/register" style="color:var(--accent);font-weight:700;">${t('register')}</a>
        </div>
      </div>
    </div>`;
}

function fillDemoLogin(email, pass) {
  const e = document.getElementById('logEmail');
  const p = document.getElementById('logPass');
  if (e) e.value = email;
  if (p) p.value = pass;
  showToast(`Demo filled: ${email}`, 'info');
}

async function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById('loginBtn');
  const email = document.getElementById('logEmail')?.value?.trim();
  const password = document.getElementById('logPass')?.value;
  if (!email || !password) return;
  if (btn) { btn.disabled = true; btn.textContent = 'Signing in...'; }
  try {
    const res = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    state.user = res.user;
    renderNav();
    showToast(`${state.lang === 'th' ? 'ยินดีต้อนรับกลับ' : 'Welcome back'}, ${res.user.name}!`, 'success');
    location.hash = res.user.role === 'admin' ? '#/admin' : '#/';
  } catch (err) {
    showToast(err.message || 'Login failed', 'error');
    if (btn) { btn.disabled = false; btn.textContent = t('signInPrompt'); }
  }
}

async function handleLogout() {
  try { await api('/api/auth/logout', { method: 'POST' }); } catch { /* ignore */ }
  state.user = null;
  renderNav();
  showToast(state.lang === 'th' ? 'ออกจากระบบเรียบร้อยแล้ว' : 'Signed out successfully', 'info');
  location.hash = '#/';
}

// ============================================================================
// 18. VIEW: CHECKOUT & CELEBRATION POPUP
// ============================================================================
let _selectedAddressId = null;
let _activeCouponCode = null;
let _couponDiscount = 0;

async function viewCheckout() {
  if (state.cart.length === 0) {
    return `
      <div class="wrap" style="text-align:center;padding:100px 0;">
        <div style="font-size:48px;margin-bottom:16px;">🛍️</div>
        <h2>${t('bagEmptyTitle')}</h2>
        <p style="color:var(--text-secondary);margin:12px 0 24px;">${t('bagEmptyDesc')}</p>
        <a href="#/products" class="btn btn-primary">${t('exploreStore')}</a>
      </div>`;
  }

  if (!state.user) {
    return `
      <div class="wrap" style="text-align:center;padding:100px 0;">
        <div style="font-size:48px;margin-bottom:16px;">🔐</div>
        <h2>${state.lang === 'th' ? 'กรุณาเข้าสู่ระบบก่อนสั่งซื้อ' : 'Sign In to Continue'}</h2>
        <p style="color:var(--text-secondary);margin:12px 0 24px;">${state.lang === 'th' ? 'เข้าสู่ระบบเพื่อบันทึกและจัดการข้อมูลคำสั่งซื้อ' : 'Please sign in to proceed with your checkout.'}</p>
        <a href="#/login" class="btn btn-primary">${t('signInPrompt')}</a>
      </div>`;
  }

  let addresses = [];
  try { addresses = await api('/api/addresses'); } catch { /* no address */ }

  if (addresses.length > 0) {
    const def = addresses.find(a => a.is_default) || addresses[0];
    _selectedAddressId = def.id;
  } else {
    _selectedAddressId = null;
  }

  _activeCouponCode = null;
  _couponDiscount = 0;
  const subtotal = state.cart.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);

  return `
    <div class="wrap">
      <div class="catalog-header" style="border:none;padding-bottom:0;">
        <h1 class="catalog-title">${state.lang === 'th' ? 'ยืนยันและชำระเงิน' : 'Express Checkout'}</h1>
        <p class="catalog-sub">Secure 256-bit encrypted transaction.</p>
      </div>

      <div class="checkout-grid">
        <div>
          <!-- Delivery Address -->
          <div class="card-panel">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
              <h3 class="card-panel-title" style="margin:0;border:none;padding:0;">1. Delivery Address</h3>
              <button class="btn btn-secondary btn-sm" onclick="showAddressModal()">
                ${Icons.map} ${addresses.length > 0 ? 'Manage Addresses' : '+ Add Address'}
              </button>
            </div>

            <div id="addressOptionsList">
              ${addresses.length > 0
                ? addresses.map(addr => `
                  <div class="address-pick-card ${addr.id === _selectedAddressId ? 'selected' : ''}"
                       onclick="selectAddressCard(this, ${addr.id})">
                    <div style="font-weight:600;font-size:14.5px;margin-bottom:4px;">
                      ${escHtml(addr.recipient_name)} (${escHtml(addr.phone || '')})
                      ${addr.is_default ? `<span class="chip" style="font-size:10px;padding:2px 8px;">Default</span>` : ''}
                    </div>
                    <div style="font-size:13.5px;color:var(--text-secondary);">
                      ${escHtml([addr.address_line, addr.subdistrict, addr.district, addr.province, addr.postal_code].filter(Boolean).join(' '))}
                    </div>
                  </div>`).join('')
                : `<div style="color:var(--text-muted);font-size:14px;padding:12px 0;">
                    ${state.lang === 'th' ? 'ยังไม่มีที่อยู่จัดส่ง กรุณากด "+ Add Address"' : 'No addresses saved. Click "+ Add Address"'}
                   </div>`
              }
            </div>
          </div>

          <!-- Payment Options -->
          <div class="card-panel">
            <h3 class="card-panel-title">2. Payment Method</h3>
            <div class="pay-card-option selected" onclick="selectPayOption(this)">
              <div>
                <div style="font-weight:600;">PromptPay Instant QR</div>
                <div style="font-size:12.5px;color:var(--text-secondary);">Zero transaction fee · Instant verification</div>
              </div>
              <span class="pay-tag">PromptPay</span>
            </div>
            <div class="pay-card-option" onclick="selectPayOption(this)">
              <div>
                <div style="font-weight:600;">Credit / Debit Card</div>
                <div style="font-size:12.5px;color:var(--text-secondary);">Visa, Mastercard, American Express</div>
              </div>
              <span class="pay-tag">Card</span>
            </div>
            <div class="pay-card-option" onclick="selectPayOption(this)">
              <div>
                <div style="font-weight:600;">Cash on Delivery</div>
                <div style="font-size:12.5px;color:var(--text-secondary);">Pay upon secure inspection</div>
              </div>
              <span class="pay-tag">COD</span>
            </div>
          </div>
        </div>

        <!-- Order Summary Sticky Box -->
        <div>
          <div class="card-panel" style="position:sticky;top:80px;">
            <h3 class="card-panel-title">${state.lang === 'th' ? 'สรุปรายการคำสั่งซื้อ' : 'Order Summary'}</h3>

            <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:20px;">
              ${state.cart.map(item => `
                <div style="display:flex;justify-content:space-between;font-size:13.5px;gap:12px;">
                  <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;">${escHtml(item.title)} × ${item.quantity}</span>
                  <span class="mono" style="font-weight:600;white-space:nowrap;">${formatPrice(item.price * item.quantity)}</span>
                </div>`).join('')}
            </div>

            <!-- Coupon Input -->
            <div style="margin-bottom:18px;">
              <div style="display:flex;gap:8px;">
                <input type="text" id="chkCoupon" class="input-field"
                  placeholder="Promo Code (TECHNOVA / VIP5000)"
                  style="text-transform:uppercase;"
                  onkeydown="if(event.key==='Enter')applyCoupon()">
                <button class="btn btn-secondary btn-sm" onclick="applyCoupon()">Apply</button>
              </div>
              <div id="couponFeedback" style="font-size:12px;margin-top:6px;"></div>
            </div>

            <div style="border-top:1px solid var(--border);padding:16px 0;display:flex;flex-direction:column;gap:8px;font-size:14px;">
              <div style="display:flex;justify-content:space-between;color:var(--text-secondary);">
                <span>${t('subtotal')}</span>
                <span class="mono">${formatPrice(subtotal)}</span>
              </div>
              <div style="display:flex;justify-content:space-between;color:var(--text-secondary);">
                <span>Courier Delivery</span>
                <span style="color:var(--success);font-weight:600;">FREE (24H)</span>
              </div>
              <div id="discountRow" style="display:none;flex-direction:row;justify-content:space-between;color:var(--success);">
                <span>Discount</span>
                <span class="mono" id="discountVal"></span>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:800;color:var(--text-pure);margin-top:8px;padding-top:8px;border-top:1px solid var(--border-light);">
                <span>Total Amount</span>
                <span class="mono" id="checkoutTotalVal">${formatPrice(subtotal)}</span>
              </div>
            </div>

            <button class="btn btn-primary btn-lg" style="width:100%;margin-top:16px;" id="checkoutSubmitBtn" onclick="submitOrder()">
              ${state.lang === 'th' ? 'ชำระเงินและยืนยันคำสั่งซื้อ' : 'Authorize & Pay Now'}
            </button>
            <p style="font-size:11px;color:var(--text-muted);text-align:center;margin-top:8px;">
              🔒 256-bit SSL Encrypted · Secured by TechNova Pay
            </p>
          </div>
        </div>
      </div>
    </div>`;
}

function selectAddressCard(el, id) {
  document.querySelectorAll('.address-pick-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  _selectedAddressId = id;
}

function selectPayOption(el) {
  document.querySelectorAll('.pay-card-option').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

function applyCoupon() {
  const code = (document.getElementById('chkCoupon')?.value || '').trim().toUpperCase();
  const fb = document.getElementById('couponFeedback');
  const subtotal = state.cart.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0);

  if (!code) { if (fb) fb.innerHTML = `<span style="color:var(--danger);">Please enter coupon code.</span>`; return; }

  const coupons = { TECHNOVA: { type: 'pct', val: 0.10 }, VIP5000: { type: 'fixed', val: 5000, min: 50000 } };
  const coupon = coupons[code];

  if (!coupon) {
    if (fb) fb.innerHTML = `<span style="color:var(--danger);">❌ Invalid coupon code.</span>`;
    return;
  }
  if (coupon.min && subtotal < coupon.min) {
    if (fb) fb.innerHTML = `<span style="color:var(--danger);">Minimum order ${formatPrice(coupon.min)} required.</span>`;
    return;
  }

  const discount = coupon.type === 'pct' ? subtotal * coupon.val : coupon.val;
  _activeCouponCode = code;
  _couponDiscount = discount;
  const total = Math.max(0, subtotal - discount);

  if (fb) fb.innerHTML = `<span style="color:var(--success);">✓ Discount Applied! (−${formatPrice(discount)})</span>`;
  const totalEl = document.getElementById('checkoutTotalVal');
  if (totalEl) totalEl.textContent = formatPrice(total);
  const discRow = document.getElementById('discountRow');
  const discVal = document.getElementById('discountVal');
  if (discRow) discRow.style.display = 'flex';
  if (discVal) discVal.textContent = `−${formatPrice(discount)}`;
}

async function submitOrder() {
  if (state.cart.length === 0) { showToast('Your bag is empty', 'error'); return; }
  if (!state.user) { showToast('Please sign in first', 'error'); location.hash = '#/login'; return; }

  if (!_selectedAddressId) {
    showToast(state.lang === 'th' ? 'กรุณาเลือกที่อยู่จัดส่ง' : 'Please select delivery address', 'error');
    return;
  }

  const btn = document.getElementById('checkoutSubmitBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Authorizing...'; }

  const items = state.cart.map(i => ({
    product_id: i.id,
    quantity: i.quantity,
    unit_price: i.price,
  }));

  try {
    const res = await api('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ items, address_id: _selectedAddressId, coupon_code: _activeCouponCode }),
    });

    const orderId = res.order_id || res.id;
    const paidTotal = res.total || state.cart.reduce((s, i) => s + i.price * i.quantity, 0) - _couponDiscount;

    state.cart = [];
    saveCart();
    _activeCouponCode = null;
    _couponDiscount = 0;

    // Show celebratory popup modal as requested
    showModal(
      t('orderSuccessTitle'),
      `
      <div style="text-align:center;padding:12px 0;">
        <div style="font-size:48px;margin-bottom:12px;">🎉</div>
        <p style="font-size:15px;color:var(--text-secondary);margin-bottom:20px;">
          ${t('orderSuccessDesc')}
        </p>
        <div style="background:var(--bg-secondary);border-radius:16px;padding:16px;margin-bottom:20px;text-align:left;">
          <div style="font-size:13px;color:var(--text-muted);">Order Tracking ID:</div>
          <div class="mono" style="font-size:18px;font-weight:800;color:var(--accent);">#TN-${String(orderId).padStart(5, '0')}</div>
          <div style="font-size:13px;color:var(--text-muted);margin-top:8px;">Total Paid: <b>${formatPrice(paidTotal)}</b></div>
        </div>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="closeModal();location.hash='#/my-orders';">
            ${t('viewMyOrders')}
          </button>
          <button class="btn btn-secondary" onclick="closeModal();location.hash='#/products';">
            ${t('continueShopping')}
          </button>
        </div>
      </div>
      `,
      null
    );

    showToast(state.lang === 'th' ? 'สั่งซื้อและชำระเงินสำเร็จแล้ว!' : 'Order Placed & Payment Successful!', 'success');
  } catch (err) {
    showToast(err.message || 'Order authorization failed', 'error');
    if (btn) { btn.disabled = false; btn.textContent = state.lang === 'th' ? 'ชำระเงินและยืนยันคำสั่งซื้อ' : 'Authorize & Pay Now'; }
  }
}

function showAddressModal() {
  const bodyHtml = `
    <div class="field-group">
      <label class="field-label">Recipient Full Name *</label>
      <input type="text" id="modalAddrName" class="input-field" placeholder="e.g. Somchai Srisuk" value="${escHtml(state.user?.name || '')}">
    </div>
    <div class="field-group">
      <label class="field-label">Phone Number *</label>
      <input type="text" id="modalAddrPhone" class="input-field" placeholder="081-xxx-xxxx" value="${escHtml(state.user?.phone || '')}">
    </div>
    <div class="field-group">
      <label class="field-label">Address Line *</label>
      <input type="text" id="modalAddrLine" class="input-field" placeholder="e.g. 88/19 TechNova Tower, Sukhumvit Rd">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div class="field-group">
        <label class="field-label">Province *</label>
        <input type="text" id="modalAddrProvince" class="input-field" placeholder="Bangkok" value="Bangkok">
      </div>
      <div class="field-group">
        <label class="field-label">Postal Code *</label>
        <input type="text" id="modalAddrPostal" class="input-field" placeholder="10110" value="10110">
      </div>
    </div>`;

  showModal('Add Delivery Address', bodyHtml, async function () {
    const name = document.getElementById('modalAddrName')?.value?.trim();
    const phone = document.getElementById('modalAddrPhone')?.value?.trim();
    const line = document.getElementById('modalAddrLine')?.value?.trim();
    const province = document.getElementById('modalAddrProvince')?.value?.trim() || 'Bangkok';
    const postal = document.getElementById('modalAddrPostal')?.value?.trim() || '10110';

    if (!name || !phone || !line) {
      showToast('Please fill all required fields (*)', 'error'); return;
    }
    try {
      const created = await api('/api/addresses', {
        method: 'POST',
        body: JSON.stringify({ recipient_name: name, phone, address_line: line, province, postal_code: postal }),
      });
      _selectedAddressId = created.id;
      closeModal();
      showToast('Address saved!', 'success');
      renderApp();
    } catch (err) {
      showToast(err.message || 'Could not save address', 'error');
    }
  });
}

// ============================================================================
// 19. VIEW: WISHLIST & ORDER TRACKING
// ============================================================================
async function viewWishlist() {
  const products = await api('/api/products').catch(() => []);
  const wishProducts = (products || []).filter(p => state.wishlist.includes(Number(p.id)));

  return `
    <div class="wrap" style="padding:40px 0 80px;">
      <div class="catalog-header">
        <h1 class="catalog-title">${t('curatedWishlist')}</h1>
        <p class="catalog-sub">Your personal collection of flagship hardware.</p>
      </div>
      ${wishProducts.length === 0
        ? `<div style="text-align:center;padding:80px 0;color:var(--text-muted);">
            <div style="font-size:48px;margin-bottom:12px;">❤️</div>
            <h3>Your wishlist is currently empty</h3>
            <a href="#/products" class="btn btn-primary" style="margin-top:16px;">Browse Showcase</a>
           </div>`
        : `<div class="product-grid">${wishProducts.map(renderFeaturedProductCard).join('')}</div>`
      }
    </div>`;
}

async function viewMyOrders() {
  if (!state.user) { location.hash = '#/login'; return ''; }

  const orders = await api('/api/orders/my').catch(() => []);

  const getTimelineStep = (status, step) => {
    const steps = ['pending', 'paid', 'shipped', 'delivered'];
    const currentIdx = steps.indexOf(status);
    const stepIdx = step - 1;
    if (currentIdx >= stepIdx) return 'done';
    if (currentIdx === stepIdx - 1) return 'active';
    return '';
  };

  return `
    <div class="wrap" style="padding:40px 0 80px;">
      <div class="catalog-header" style="display:flex;justify-content:space-between;align-items:flex-end;">
        <div>
          <h1 class="catalog-title">${t('orderTracking')}</h1>
          <p class="catalog-sub">Track real-time shipment status and dispatch records.</p>
        </div>
        <a href="#/products" class="btn btn-secondary btn-sm">+ New Order</a>
      </div>

      ${orders.length === 0
        ? `<div style="text-align:center;padding:80px 0;color:var(--text-muted);">
            <div style="font-size:48px;margin-bottom:12px;">📦</div>
            <h3>No previous orders found</h3>
            <a href="#/products" class="btn btn-primary" style="margin-top:16px;">Shop Now</a>
           </div>`
        : `<div style="display:flex;flex-direction:column;gap:24px;">
            ${orders.map(o => {
              const statusColor = { pending: 'var(--warning)', paid: 'var(--accent)', shipped: 'var(--accent)', delivered: 'var(--success)', cancelled: 'var(--danger)' }[o.status] || 'var(--text-muted)';
              return `
              <div class="card-panel">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
                  <div>
                    <span class="mono" style="font-weight:800;font-size:16px;">ORDER #TN-${String(o.id).padStart(5, '0')}</span>
                    <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${new Date(o.created_at).toLocaleString()}</div>
                  </div>
                  <span style="font-size:12px;font-weight:700;padding:4px 14px;border-radius:999px;background:${statusColor}22;color:${statusColor};">
                    ${o.status.toUpperCase()}
                  </span>
                </div>

                ${o.status !== 'cancelled' ? `
                <div class="order-timeline">
                  <div class="timeline-step ${getTimelineStep(o.status, 1) || 'done'}">
                    <div class="timeline-dot">${getTimelineStep(o.status, 1) === 'done' ? '✓' : '1'}</div>
                    <div class="timeline-label">Order Placed</div>
                  </div>
                  <div class="timeline-step ${getTimelineStep(o.status, 2)}">
                    <div class="timeline-dot">${getTimelineStep(o.status, 2) === 'done' ? '✓' : '2'}</div>
                    <div class="timeline-label">Payment</div>
                  </div>
                  <div class="timeline-step ${getTimelineStep(o.status, 3)}">
                    <div class="timeline-dot">${getTimelineStep(o.status, 3) === 'done' ? '✓' : '3'}</div>
                    <div class="timeline-label">Dispatched</div>
                  </div>
                  <div class="timeline-step ${getTimelineStep(o.status, 4)}">
                    <div class="timeline-dot">${getTimelineStep(o.status, 4) === 'done' ? '✓' : '4'}</div>
                    <div class="timeline-label">Delivered</div>
                  </div>
                </div>` : ''}

                <div style="margin:20px 0;border-top:1px solid var(--border-light);padding-top:14px;">
                  ${(o.items || []).map(it => `
                    <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:13.5px;">
                      <span>${escHtml(it.title || 'Hardware Component')} × ${it.quantity}</span>
                      <span class="mono">${formatPrice((it.unit_price || 0) * (it.quantity || 1))}</span>
                    </div>`).join('')}
                </div>

                <div style="border-top:1px solid var(--border);padding-top:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                  <div style="font-size:13px;color:var(--text-muted);">
                    ${Icons.map} <b>${escHtml(o.recipient_name || 'VIP Client')}</b>
                    ${o.address_line ? `· ${escHtml(o.address_line)}` : ''}
                  </div>
                  <div>
                    <span style="font-size:13px;color:var(--text-muted);margin-right:8px;">Total:</span>
                    <span class="mono" style="font-size:18px;font-weight:800;">${formatPrice(o.total_price)}</span>
                  </div>
                </div>
              </div>`;
            }).join('')}
           </div>`
      }
    </div>`;
}

// ============================================================================
// 20. VIEW: USER PROFILE
// ============================================================================
async function viewProfile() {
  if (!state.user) { location.hash = '#/login'; return ''; }

  let addresses = [];
  try { addresses = await api('/api/addresses'); } catch { /* no addresses */ }

  const tab = state.profileTab;

  return `
    <div class="wrap" style="max-width:800px;padding:40px 20px 100px;">
      <div class="card-panel" style="margin-bottom:24px;">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
          <div style="display:flex;align-items:center;gap:20px;">
            <div style="width:64px;height:64px;border-radius:50%;background:var(--text-pure);color:var(--bg);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:700;overflow:hidden;flex-shrink:0;">
              ${state.user.avatar
                ? `<img src="${state.user.avatar}" style="width:100%;height:100%;object-fit:cover;" alt="Avatar">`
                : escHtml(state.user.name.charAt(0).toUpperCase())}
            </div>
            <div>
              <h2 style="font-size:22px;font-weight:700;">${escHtml(state.user.name)}</h2>
              <div style="font-size:13.5px;color:var(--text-muted);">${escHtml(state.user.email)} · ${state.user.role.toUpperCase()}</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${state.user.role === 'admin' ? `<a href="#/admin" class="btn btn-dark btn-sm">👑 Admin Suite</a>` : ''}
            <a href="#/my-orders" class="btn btn-secondary btn-sm">📦 ${t('orderTracking')}</a>
            <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="handleLogout()">Sign Out</button>
          </div>
        </div>
      </div>

      <div class="tab-nav">
        <button class="tab-btn ${tab === 'info' ? 'active' : ''}" onclick="setProfileTab('info')">Personal Information</button>
        <button class="tab-btn ${tab === 'address' ? 'active' : ''}" onclick="setProfileTab('address')">Address Book (${addresses.length})</button>
        <button class="tab-btn ${tab === 'security' ? 'active' : ''}" onclick="setProfileTab('security')">Password &amp; Security</button>
      </div>

      ${tab === 'info' ? `
        <div class="card-panel">
          <h3 class="card-panel-title">Edit Profile</h3>
          <form onsubmit="handleUpdateProfile(event)">
            <div class="field-group">
              <label class="field-label">Full Name *</label>
              <input type="text" id="profName" class="input-field" value="${escHtml(state.user.name)}" required>
            </div>
            <div class="field-group">
              <label class="field-label">Phone Number</label>
              <input type="text" id="profPhone" class="input-field" value="${escHtml(state.user.phone || '')}" placeholder="081-xxx-xxxx">
            </div>
            <div class="field-group">
              <label class="field-label">Avatar Image</label>
              <input type="file" id="profAvatar" class="input-field" accept="image/*">
            </div>
            <button type="submit" id="profSubmitBtn" class="btn btn-primary" style="margin-top:12px;">Save Profile Changes</button>
          </form>
        </div>` : ''}

      ${tab === 'address' ? `
        <div class="card-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
            <h3 class="card-panel-title" style="margin:0;border:none;padding:0;">Saved Delivery Addresses</h3>
            <button class="btn btn-primary btn-sm" onclick="showAddressModal()">+ Add New Address</button>
          </div>
          ${addresses.length === 0
            ? `<p style="color:var(--text-muted);padding:20px 0;">No addresses saved yet.</p>`
            : addresses.map(a => `
              <div class="address-pick-card" style="cursor:default;margin-bottom:14px;">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
                  <div style="flex:1;">
                    <div style="font-weight:600;font-size:15px;margin-bottom:4px;">
                      ${escHtml(a.recipient_name)} (${escHtml(a.phone || '')})
                      ${a.is_default ? `<span class="chip" style="font-size:10px;padding:2px 8px;margin-left:6px;">Default</span>` : ''}
                    </div>
                    <div style="font-size:13.5px;color:var(--text-secondary);">
                      ${escHtml([a.address_line, a.subdistrict, a.district, a.province, a.postal_code].filter(Boolean).join(', '))}
                    </div>
                  </div>
                  <div style="display:flex;gap:6px;flex-shrink:0;">
                    ${!a.is_default ? `<button class="btn btn-secondary btn-sm" onclick="setDefaultAddress(${a.id})">Set Default</button>` : ''}
                    <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="deleteAddress(${a.id})">Delete</button>
                  </div>
                </div>
              </div>`).join('')
          }
        </div>` : ''}

      ${tab === 'security' ? `
        <div class="card-panel">
          <h3 class="card-panel-title">Change Account Password</h3>
          <form onsubmit="handleChangePassword(event)">
            <div class="field-group">
              <label class="field-label">Current Password *</label>
              <input type="password" id="oldPass" class="input-field" placeholder="••••••••" required>
            </div>
            <div class="field-group">
              <label class="field-label">New Password * (min 6 characters)</label>
              <input type="password" id="newPass" class="input-field" placeholder="••••••••" minlength="6" required>
            </div>
            <div class="field-group">
              <label class="field-label">Confirm New Password *</label>
              <input type="password" id="confirmPass" class="input-field" placeholder="••••••••" minlength="6" required>
            </div>
            <button type="submit" id="pwdSubmitBtn" class="btn btn-primary" style="margin-top:12px;">Update Password</button>
          </form>
        </div>` : ''}
    </div>`;
}

function setProfileTab(tab) { state.profileTab = tab; renderApp(); }

async function handleUpdateProfile(e) {
  e.preventDefault();
  const name = document.getElementById('profName')?.value?.trim();
  const phone = document.getElementById('profPhone')?.value?.trim();
  const file = document.getElementById('profAvatar')?.files?.[0];
  if (!name) return;
  const btn = document.getElementById('profSubmitBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Saving...'; }
  const fd = new FormData();
  fd.append('name', name);
  if (phone) fd.append('phone', phone);
  if (file) fd.append('avatar', file);
  try {
    const res = await api('/api/auth/profile', { method: 'PUT', body: fd });
    state.user = res.user;
    renderNav();
    showToast('Profile updated successfully!', 'success');
    renderApp();
  } catch (err) {
    showToast(err.message || 'Update failed', 'error');
    if (btn) { btn.disabled = false; btn.textContent = 'Save Profile Changes'; }
  }
}

async function handleChangePassword(e) {
  e.preventDefault();
  const curr = document.getElementById('oldPass')?.value;
  const next = document.getElementById('newPass')?.value;
  const confirm = document.getElementById('confirmPass')?.value;
  if (next !== confirm) { showToast('New passwords do not match', 'error'); return; }
  if (next.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
  const btn = document.getElementById('pwdSubmitBtn');
  if (btn) { btn.disabled = true; btn.textContent = 'Updating...'; }
  try {
    await api('/api/auth/change-password', { method: 'PUT', body: JSON.stringify({ currentPassword: curr, newPassword: next }) });
    showToast('Password changed successfully!', 'success');
    document.getElementById('oldPass').value = '';
    document.getElementById('newPass').value = '';
    document.getElementById('confirmPass').value = '';
  } catch (err) {
    showToast(err.message || 'Password change failed', 'error');
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'Update Password'; }
  }
}

async function deleteAddress(id) {
  if (!confirm('Delete this address permanently?')) return;
  try {
    await api(`/api/addresses/${id}`, { method: 'DELETE' });
    showToast('Address deleted', 'info');
    renderApp();
  } catch (err) { showToast(err.message || 'Delete failed', 'error'); }
}

async function setDefaultAddress(id) {
  try {
    await api(`/api/addresses/${id}/default`, { method: 'PUT' });
    showToast('Default address updated', 'success');
    renderApp();
  } catch (err) { showToast(err.message || 'Update failed', 'error'); }
}

// ============================================================================
// 21. VIEW: EXECUTIVE ADMIN SUITE
// ============================================================================
async function viewAdmin() {
  if (!state.user || state.user.role !== 'admin') {
    return `
      <div class="wrap" style="max-width:500px;padding:100px 20px;text-align:center;">
        <div class="card-panel">
          <div style="font-size:48px;margin-bottom:16px;">👑</div>
          <h2 style="font-size:24px;font-weight:700;margin-bottom:8px;">Executive Admin Suite</h2>
          <p style="font-size:14px;color:var(--text-secondary);margin-bottom:24px;">Administrative credentials required.</p>
          <button class="btn btn-primary btn-lg" style="width:100%;margin-bottom:12px;" onclick="autoAdminLogin()">
            👑 Log In as Administrator
          </button>
          <a href="#/login" class="btn btn-secondary btn-sm" style="width:100%;display:block;">Client Sign In</a>
        </div>
      </div>`;
  }

  let stats = {}, products = [], categories = [], orders = [], users = [], subscribers = [], tagsData = { tags: [] }, clickEvents = [];
  try {
    [stats, products, categories, orders, users, subscribers, tagsData, clickEvents] = await Promise.all([
      api('/api/admin/stats').catch(() => ({})),
      api('/api/products').catch(() => []),
      api('/api/categories').catch(() => []),
      api('/api/orders').catch(() => []),
      api('/api/admin/users').catch(() => []),
      api('/api/newsletter/subscribers').catch(() => []),
      api('/api/admin/tags').catch(() => ({ tags: [] })),
      api('/api/track/events').catch(() => []),
    ]);
  } catch { /* defaults */ }

  const tab = state.adminTab;

  return `
    <div class="wrap admin-container">
      <div class="catalog-header" style="display:flex;justify-content:space-between;align-items:flex-end;">
        <div>
          <div class="section-eyebrow">EXECUTIVE SUITE</div>
          <h1 class="catalog-title">Showroom Management</h1>
        </div>
        <button class="btn btn-primary" onclick="showAddProductModal()">+ Add New Hardware</button>
      </div>

      <div class="tab-nav">
        <button class="tab-btn ${tab === 'overview' ? 'active' : ''}" onclick="setAdminTab('overview')">Overview &amp; KPIs</button>
        <button class="tab-btn ${tab === 'products' ? 'active' : ''}" onclick="setAdminTab('products')">Inventory (${products.length})</button>
        <button class="tab-btn ${tab === 'orders' ? 'active' : ''}" onclick="setAdminTab('orders')">Client Orders (${orders.length})</button>
        <button class="tab-btn ${tab === 'categories' ? 'active' : ''}" onclick="setAdminTab('categories')">Domains (${categories.length})</button>
        <button class="tab-btn ${tab === 'users' ? 'active' : ''}" onclick="setAdminTab('users')">Users (${users.length})</button>
        <button class="tab-btn ${tab === 'subscribers' ? 'active' : ''}" onclick="setAdminTab('subscribers')">Subscribers (${subscribers.length})</button>
        <button class="tab-btn ${tab === 'campaigns' ? 'active' : ''}" onclick="setAdminTab('campaigns')">Marketing Campaigns 🚀</button>
      </div>

      ${tab === 'overview' ? `
        <div class="kpi-grid">
          <div class="kpi-card"><div class="kpi-label">Gross Revenue</div><div class="kpi-value">${formatPrice(stats.totalSales || 0)}</div></div>
          <div class="kpi-card"><div class="kpi-label">Total Orders</div><div class="kpi-value">${stats.totalOrders || 0}</div></div>
          <div class="kpi-card"><div class="kpi-label">Pending Dispatch</div><div class="kpi-value" style="color:var(--warning);">${stats.pendingOrders || 0}</div></div>
          <div class="kpi-card"><div class="kpi-label">Showroom SKUs</div><div class="kpi-value">${stats.totalProducts || products.length}</div></div>
          <div class="kpi-card"><div class="kpi-label">Registered Clients</div><div class="kpi-value">${stats.totalCustomers || users.length}</div></div>
        </div>
        <div class="card-panel" style="margin-top:24px;">
          <h3 class="card-panel-title">Low Stock Hardware Alerts</h3>
          ${!(stats.lowStockProducts?.length)
            ? `<p style="color:var(--text-muted);">All hardware inventory is well stocked. ✓</p>`
            : `<div style="display:flex;flex-direction:column;gap:8px;">
                ${stats.lowStockProducts.map(p => `
                  <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid var(--border-light);">
                    <span style="font-weight:500;">${escHtml(p.title)}</span>
                    <span class="stock-pill low">Only ${p.stock} Units Left</span>
                  </div>`).join('')}
               </div>`}
        </div>` : ''}

      ${tab === 'products' ? `
        <div class="card-panel" style="overflow-x:auto;">
          <table class="data-table">
            <thead><tr><th>Preview</th><th>Title</th><th>Domain</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
            <tbody>
              ${products.map(p => `
                <tr>
                  <td>${p.thumbnail ? `<img src="${p.thumbnail}" style="width:40px;height:40px;border-radius:8px;object-fit:cover;">` : (p.icon || '📦')}</td>
                  <td><b>${escHtml(p.title)}</b></td>
                  <td><span class="chip">${escHtml(p.category_name || 'Showroom')}</span></td>
                  <td class="mono">${formatPrice(p.price)}</td>
                  <td class="mono" style="${(p.stock || 0) <= 5 ? 'color:var(--warning);font-weight:600;' : ''}">${p.stock || 0}</td>
                  <td style="display:flex;gap:6px;align-items:center;">
                    <button class="btn btn-secondary btn-sm" onclick="editProductStockModal(${p.id},${p.stock || 0})">Edit Stock</button>
                    <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="deleteProduct(${p.id})">Delete</button>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>` : ''}

      ${tab === 'orders' ? `
        <div class="card-panel" style="overflow-x:auto;">
          <table class="data-table">
            <thead><tr><th>Order #</th><th>Date</th><th>Client</th><th>Total</th><th>Status</th><th>Tracking / Courier</th><th>Update Status</th></tr></thead>
            <tbody>
              ${orders.length === 0 ? `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted);">No orders yet.</td></tr>` : ''}
              ${orders.map(o => `
                <tr>
                  <td class="mono" style="font-weight:700;">#TN-${String(o.id).padStart(5, '0')}</td>
                  <td>${new Date(o.created_at).toLocaleDateString()}</td>
                  <td>${escHtml(o.recipient_name || 'VIP Client')}</td>
                  <td class="mono"><b>${formatPrice(o.total_price)}</b></td>
                  <td>
                    <span style="font-size:11.5px;font-weight:700;padding:3px 10px;border-radius:999px;
                      background:${{ pending:'#FEF3C722', paid:'#0071E322', shipped:'#10B98122', delivered:'#10B98122', cancelled:'#E11D4822' }[o.status]};
                      color:${{ pending:'var(--warning)', paid:'var(--accent)', shipped:'var(--success)', delivered:'var(--success)', cancelled:'var(--danger)' }[o.status]};">
                      ${o.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    ${o.tracking_number
                      ? `<div style="font-size:12px;font-family:monospace;font-weight:700;color:var(--accent);">${escHtml(o.tracking_number)}</div>
                         <div style="font-size:11px;color:var(--text-muted);">${escHtml(o.carrier || 'TechNova Express')}</div>`
                      : '<span style="font-size:12px;color:var(--text-muted);">-</span>'}
                  </td>
                  <td>
                    <select class="select-box" style="padding:5px 10px;font-size:12px;" onchange="updateOrderStatus(${o.id}, this.value)">
                      ${['pending','paid','shipped','delivered','cancelled'].map(s =>
                        `<option value="${s}" ${o.status === s ? 'selected' : ''}>${s.charAt(0).toUpperCase() + s.slice(1)}</option>`).join('')}
                    </select>
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>` : ''}

      ${tab === 'categories' ? `
        <div class="card-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
            <h3 class="card-panel-title" style="margin:0;border:none;">Showroom Domains</h3>
            <button class="btn btn-primary btn-sm" onclick="showAddCategoryModal()">+ Add Domain</button>
          </div>
          <table class="data-table">
            <thead><tr><th>ID</th><th>Domain Name</th><th>Action</th></tr></thead>
            <tbody>
              ${categories.map(c => `
                <tr>
                  <td class="mono">${c.id}</td>
                  <td><b>${escHtml(c.name)}</b></td>
                  <td><button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="deleteCategory(${c.id})">Delete</button></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>` : ''}

      ${tab === 'users' ? `
        <div class="card-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
            <div>
              <h3 class="card-panel-title" style="margin:0;border:none;">User Management &amp; Governance</h3>
              <p style="font-size:13px;color:var(--text-muted);margin-top:2px;">Total ${users.length} registered accounts across customer &amp; admin roles</p>
            </div>
            <button class="btn btn-primary btn-sm" onclick="showAddUserModal()">+ Add New User</button>
          </div>
          <div style="overflow-x:auto;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Marketing Tags</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${users.length === 0 ? `<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text-muted);">No registered users.</td></tr>` : ''}
                ${users.map(u => {
                  const isSelf = state.user && state.user.id === u.id;
                  const safeName = escHtml(u.name);
                  const safeEmail = escHtml(u.email);
                  const dateStr = u.created_at ? new Date(u.created_at).toLocaleDateString() : '-';
                  let userTags = [];
                  try {
                    userTags = typeof u.tags === 'string' ? JSON.parse(u.tags || '[]') : (u.tags || []);
                  } catch (_) { userTags = []; }

                  return `
                  <tr>
                    <td>
                      <div style="display:flex;align-items:center;gap:10px;">
                        <div style="width:36px;height:36px;border-radius:50%;background:var(--accent-light);color:var(--accent);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0;overflow:hidden;">
                          ${u.avatar ? `<img src="${u.avatar}" style="width:100%;height:100%;object-fit:cover;">` : safeName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div style="font-weight:600;display:flex;align-items:center;gap:6px;">
                            ${safeName}
                            ${isSelf ? `<span style="font-size:10px;padding:2px 7px;border-radius:999px;background:var(--accent);color:#fff;font-weight:700;">YOU</span>` : ''}
                          </div>
                          <div style="font-size:12px;color:var(--text-muted);display:flex;align-items:center;gap:6px;margin-top:2px;">
                            <span>ID: #${u.id}</span>
                            ${u.primary_interest ? `<span style="font-size:10.5px;padding:1px 7px;border-radius:4px;background:rgba(0,113,227,0.1);color:var(--accent);font-weight:600;">${u.primary_interest === 'gaming' ? '🎮 Gaming' : u.primary_interest === 'creator' ? '🎨 Creator' : u.primary_interest === 'enterprise' ? '💼 Enterprise' : u.primary_interest === 'custom_desk' ? '⌨️ Custom Desk' : escHtml(u.primary_interest)}</span>` : ''}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>${safeEmail}</td>
                    <td>
                      <div style="display:flex;flex-wrap:wrap;gap:4px;max-width:240px;">
                        ${userTags.length > 0 ? userTags.map(t => `<span class="tag-badge ${t.includes('Paid') ? 'paid' : (t.includes('Bought') ? 'bought' : '')}">🏷️ ${escHtml(t)}</span>`).join('') : '<span style="font-size:11px;color:var(--text-muted);">-</span>'}
                      </div>
                    </td>
                    <td>
                      <span class="chip" style="${u.role === 'admin' ? 'background:rgba(0,113,227,0.12);color:var(--accent);font-weight:700;' : ''}">
                        ${u.role === 'admin' ? '👑 ADMIN' : 'CUSTOMER'}
                      </span>
                    </td>
                    <td>
                      ${u.is_banned
                        ? `<span style="font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;background:rgba(220,38,38,0.12);color:var(--danger);">BANNED</span>`
                        : `<span style="font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;background:rgba(5,150,105,0.12);color:var(--success);">ACTIVE</span>`
                      }
                    </td>
                    <td style="font-size:13px;color:var(--text-muted);">${dateStr}</td>
                    <td>
                      <div style="display:flex;gap:6px;align-items:center;flex-wrap:nowrap;">
                        <button class="btn btn-secondary btn-sm" onclick="showEditUserModal(${u.id}, '${safeName.replace(/'/g, "\\'")}', '${safeEmail.replace(/'/g, "\\'")}', '${escHtml(u.phone || '')}', '${u.role}', ${u.is_banned ? 1 : 0})">
                          Edit
                        </button>
                        <button class="btn btn-secondary btn-sm" style="${u.is_banned ? 'color:var(--success);' : 'color:var(--warning);'}" onclick="toggleUserBan(${u.id}, ${u.is_banned ? 0 : 1})" ${isSelf ? 'disabled style="opacity:0.35;cursor:not-allowed;"' : ''}>
                          ${u.is_banned ? 'Unban' : 'Ban'}
                        </button>
                        <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="confirmDeleteUser(${u.id}, '${safeName.replace(/'/g, "\\'")}')" ${isSelf ? 'disabled style="opacity:0.35;cursor:not-allowed;"' : ''}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>` : ''}

      ${tab === 'subscribers' ? `
        <div class="card-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
            <div>
              <h3 class="card-panel-title" style="margin:0;border:none;">Newsletter Subscribers</h3>
              <p style="font-size:13px;color:var(--text-muted);margin-top:2px;">Total ${subscribers.length} email addresses subscribed to TechNova Private Dispatch</p>
            </div>
          </div>
          <div style="overflow-x:auto;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email Address</th>
                  <th>Marketing Tags</th>
                  <th>Subscribed At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${subscribers.length === 0 ? `<tr><td colspan="5" style="text-align:center;padding:40px;color:var(--text-muted);">No newsletter subscribers yet.</td></tr>` : ''}
                ${subscribers.map(s => {
                  const safeEmail = escHtml(s.email);
                  const dateStr = s.created_at ? new Date(s.created_at).toLocaleString() : '-';
                  let subTags = [];
                  try {
                    subTags = typeof s.tags === 'string' ? JSON.parse(s.tags || '[]') : (s.tags || []);
                  } catch (_) { subTags = []; }

                  return `
                  <tr>
                    <td class="mono">#${s.id}</td>
                    <td><b>${safeEmail}</b></td>
                    <td>
                      <div style="display:flex;flex-wrap:wrap;gap:4px;max-width:240px;">
                        ${subTags.length > 0 ? subTags.map(t => `<span class="tag-badge">🏷️ ${escHtml(t)}</span>`).join('') : '<span style="font-size:11px;color:var(--text-muted);">-</span>'}
                      </div>
                    </td>
                    <td style="font-size:13px;color:var(--text-muted);">${dateStr}</td>
                    <td>
                      <button class="btn btn-secondary btn-sm" style="color:var(--danger);" onclick="confirmDeleteSubscriber(${s.id}, '${safeEmail.replace(/'/g, "\\'")}')">
                        Remove
                      </button>
                    </td>
                  </tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>` : ''}

      ${tab === 'campaigns' ? renderAdminCampaignsTab(tagsData, clickEvents) : ''}
    </div>`;
}

function renderAdminCampaignsTab(tagsData, clickEvents) {
  const tagsList = tagsData.tags || [];
  const totalAudience = tagsData.totalAudience || 0;

  return `
    <div style="display:grid;grid-template-columns:1.8fr 1.2fr;gap:24px;align-items:start;">
      <!-- Left Column: Campaign Email Composer & Audience Segmentation -->
      <div>
        <div class="card-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;border-bottom:1px solid var(--border-light);padding-bottom:14px;">
            <div>
              <h3 class="card-panel-title" style="margin:0;border:none;">🚀 Targeted Marketing Campaign Composer</h3>
              <p style="font-size:13px;color:var(--text-muted);margin-top:2px;">Compose and dispatch personalized segmented email blasts with dynamic click tracking.</p>
            </div>
            <span class="stock-pill in-stock" style="font-size:12px;">Total Audience: ${totalAudience}</span>
          </div>

          <form id="marketingCampaignForm" onsubmit="handleSendCampaign(event)">
            <!-- 1. Tag Segmentation Selector -->
            <div class="field-group" style="margin-bottom:20px;">
              <label class="field-label" style="display:flex;justify-content:space-between;align-items:center;">
                <span>🎯 Target Audience Segmentation (เลือกกลุ่มเป้าหมายตามแท็ก) *</span>
                <span id="targetAudienceCount" style="font-size:12px;color:var(--accent);font-weight:700;">Reaching: All (${totalAudience})</span>
              </label>
              <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;">
                <label class="audience-pill-item active" onclick="toggleAudienceTagSelection(this)">
                  <input type="checkbox" name="campaignTargetTag" value="all" checked onchange="updateAudienceSelection(this)">
                  <span>🌐 All Audience (${totalAudience})</span>
                </label>
                ${tagsList.map(t => `
                  <label class="audience-pill-item" onclick="toggleAudienceTagSelection(this)">
                    <input type="checkbox" name="campaignTargetTag" value="${escHtml(t.tag)}" onchange="updateAudienceSelection(this)">
                    <span>🏷️ ${escHtml(t.tag)} (${t.totalCount})</span>
                  </label>
                `).join('')}
              </div>
            </div>

            <!-- 2. Campaign Header & Subject -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
              <div class="field-group">
                <label class="field-label">หัวข้ออีเมล (Subject Line) *</label>
                <input type="text" id="cmpSubject" class="input-field" placeholder="⚡ ข้อเสนอพิเศษ: อัปเกรดเซ็ตติ้งฮาร์ดแวร์ของคุณวันนี้" required>
              </div>
              <div class="field-group">
                <label class="field-label">ป้ายแบนเนอร์ (Banner Badge)</label>
                <input type="text" id="cmpBanner" class="input-field" placeholder="🔥 VIP EXCLUSIVE" value="🔥 VIP EXCLUSIVE">
              </div>
            </div>

            <div class="field-group">
              <label class="field-label">พาดหัวในอีเมล (Headline) *</label>
              <input type="text" id="cmpHeadline" class="input-field" placeholder="TechNova VIP Dispatch: Exclusive Hardware Drop" required>
            </div>

            <!-- 3. Message Body -->
            <div class="field-group">
              <label class="field-label">เนื้อหาอีเมล (Message Body — เว้นบรรทัดเพื่อแยกย่อหน้า) *</label>
              <textarea id="cmpContent" class="input-field" rows="5" placeholder="สวัสดีครับ สมาชิกคนสำคัญของ TechNova IT\n\nเราขอมอบสิทธิพิเศษเฉพาะคุณสำหรับการสั่งซื้ออุปกรณ์เกมมิ่งและสตูดิโอเวิร์กสเตชันรุ่นใหม่ล่าสุด พร้อมรับส่วนลดและของแถมพิเศษเมื่อคลิกสั่งซื้อผ่านลิงก์นี้ครับ..." required></textarea>
            </div>

            <!-- 4. CTA and Click Tracking Settings -->
            <div style="background:var(--bg-subtle);border:1px solid var(--border);border-radius:var(--radius-sm);padding:16px;margin-bottom:20px;">
              <div style="font-size:13px;font-weight:700;color:var(--accent);margin-bottom:12px;display:flex;align-items:center;gap:6px;">
                <span>🎯 Call to Action &amp; Auto-Tagging Engine (ระบบแท็กอัตโนมัติเมื่อลูกค้าคลิก)</span>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
                <div class="field-group" style="margin-bottom:0;">
                  <label class="field-label">ข้อความปุ่มกด (CTA Label) *</label>
                  <input type="text" id="cmpCtaText" class="input-field" value="สำรวจข้อเสนอและรับสิทธิ์ทันที →" required>
                </div>
                <div class="field-group" style="margin-bottom:0;">
                  <label class="field-label">แท็กที่จะติดเมื่อคลิก (Click Auto-Tag) *</label>
                  <input type="text" id="cmpCtaTag" class="input-field" value="Clicked-VIPCampaign" placeholder="e.g. Clicked-FlashSale2026" required>
                </div>
              </div>
              <div class="field-group" style="margin-top:14px;margin-bottom:0;">
                <label class="field-label">ปลายทาง Landing Page (Destination URL) *</label>
                <input type="text" id="cmpCtaUrl" class="input-field" value="http://localhost:3000/#/products" required>
              </div>
            </div>

            <button type="submit" id="btnSendCampaign" class="btn btn-primary btn-lg" style="width:100%;">
              🚀 ส่งแคมเปญหาผู้รับที่เลือก (Dispatch Campaign Blast)
            </button>
          </form>
        </div>
      </div>

      <!-- Right Column: Tag Analytics & Real-Time Click Logs -->
      <div>
        <!-- Available Segment Tags Card -->
        <div class="card-panel" style="margin-bottom:24px;">
          <h3 class="card-panel-title" style="margin:0 0 12px;border:none;">🏷️ Available Audience Segments</h3>
          <p style="font-size:12.5px;color:var(--text-muted);margin-bottom:14px;">Real-time segment breakdown based on purchase history, registration choices, and tracked clicks.</p>
          
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${tagsList.length === 0 ? '<div style="font-size:13px;color:var(--text-muted);">No custom tags detected yet.</div>' : ''}
            ${tagsList.map(t => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--bg-subtle);border-radius:8px;border:1px solid var(--border-light);">
                <div style="display:flex;align-items:center;gap:6px;">
                  <span class="tag-badge ${t.tag.includes('Paid') ? 'paid' : (t.tag.includes('Bought') ? 'bought' : '')}">🏷️ ${escHtml(t.tag)}</span>
                </div>
                <div style="font-size:12.5px;font-weight:700;color:var(--text);font-family:monospace;">${t.totalCount} recipients</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Recent Click Tracking Events -->
        <div class="card-panel">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <h3 class="card-panel-title" style="margin:0;border:none;">🎯 Real-Time Click Events</h3>
            <span class="stock-pill in-stock" style="font-size:11px;">${clickEvents.length} Clicks Tracked</span>
          </div>
          <div style="overflow-x:auto;max-height:360px;overflow-y:auto;">
            <table class="data-table" style="font-size:12px;">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Tag Applied</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                ${clickEvents.length === 0 ? '<tr><td colspan="3" style="text-align:center;padding:24px;color:var(--text-muted);">No tracked clicks recorded yet.</td></tr>' : ''}
                ${clickEvents.slice(0, 30).map(e => `
                  <tr>
                    <td>
                      <div style="font-weight:600;">${escHtml(e.email)}</div>
                      <div style="font-size:10.5px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px;">${escHtml(e.redirect_url || '/')}</div>
                    </td>
                    <td>
                      <span class="tag-badge ${e.tag.includes('Paid') ? 'paid' : ''}" style="font-size:10px;">${escHtml(e.tag)}</span>
                    </td>
                    <td style="font-size:11px;color:var(--text-muted);white-space:nowrap;">
                      ${e.created_at ? new Date(e.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '-'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function toggleAudienceTagSelection(labelEl) {
  const chk = labelEl.querySelector('input[type="checkbox"]');
  if (!chk) return;
  labelEl.classList.toggle('active', chk.checked);
}

function updateAudienceSelection(inputEl) {
  const form = document.getElementById('marketingCampaignForm');
  if (!form) return;
  const allChk = form.querySelector('input[name="campaignTargetTag"][value="all"]');
  const otherChks = Array.from(form.querySelectorAll('input[name="campaignTargetTag"]:not([value="all"])'));

  if (inputEl.value === 'all') {
    if (inputEl.checked) {
      otherChks.forEach(c => { c.checked = false; c.closest('label')?.classList.remove('active'); });
    }
  } else {
    if (inputEl.checked && allChk) {
      allChk.checked = false;
      allChk.closest('label')?.classList.remove('active');
    }
  }

  // Update counter
  const selected = Array.from(form.querySelectorAll('input[name="campaignTargetTag"]:checked')).map(c => c.value);
  const countLabel = document.getElementById('targetAudienceCount');
  if (countLabel) {
    countLabel.textContent = selected.includes('all') || selected.length === 0 ? 'Reaching: All Audience' : `Reaching Segments: ${selected.join(', ')}`;
  }
}

async function handleSendCampaign(e) {
  e.preventDefault();
  const form = document.getElementById('marketingCampaignForm');
  const btn = document.getElementById('btnSendCampaign');

  const selectedTags = Array.from(form.querySelectorAll('input[name="campaignTargetTag"]:checked')).map(c => c.value);
  const subject = document.getElementById('cmpSubject')?.value?.trim();
  const bannerBadge = document.getElementById('cmpBanner')?.value?.trim();
  const headline = document.getElementById('cmpHeadline')?.value?.trim();
  const content = document.getElementById('cmpContent')?.value?.trim();
  const ctaText = document.getElementById('cmpCtaText')?.value?.trim();
  const ctaUrl = document.getElementById('cmpCtaUrl')?.value?.trim();
  const ctaTag = document.getElementById('cmpCtaTag')?.value?.trim();

  if (!subject || !headline || !content) {
    showToast('Please fill all required campaign fields', 'error');
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = 'Sending Campaign... 🚀'; }

  try {
    const res = await api('/api/admin/campaigns/send', {
      method: 'POST',
      body: JSON.stringify({
        targetTags: selectedTags.length === 0 ? ['all'] : selectedTags,
        subject,
        headline,
        bannerBadge,
        content,
        ctaText,
        ctaUrl,
        ctaTag,
      }),
    });

    showToast(`🎉 ${res.message || 'แคมเปญถูกจัดส่งเรียบร้อยแล้ว!'}`, 'success');
    renderApp();
  } catch (err) {
    showToast(err.message || 'Campaign dispatch failed', 'error');
    if (btn) { btn.disabled = false; btn.textContent = '🚀 ส่งแคมเปญหาผู้รับที่เลือก (Dispatch Campaign Blast)'; }
  }
}

function setAdminTab(tab) { state.adminTab = tab; renderApp(); }

async function autoAdminLogin() {
  try {
    const res = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: 'admin@store.com', password: 'admin123' }) });
    state.user = res.user;
    renderNav();
    showToast('Logged in as Administrator 👑', 'success');
    renderApp();
  } catch (err) { showToast('Admin login failed: ' + err.message, 'error'); }
}

async function updateOrderStatus(orderId, status) {
  if (status === 'shipped') {
    const defaultTracking = `TNX-${String(orderId).padStart(4, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    showModal('จัดส่งสินค้า (Ship Order #' + orderId + ')', `
      <div class="field-group">
        <label class="field-label">บริษัทขนส่ง (Courier / Carrier) *</label>
        <select id="shipCarrier" class="select-box" style="width:100%;">
          <option value="TechNova Express">TechNova Express (VIP Direct)</option>
          <option value="Flash Express">Flash Express</option>
          <option value="Kerry Express">Kerry Express</option>
          <option value="SCG Logistics">SCG Logistics</option>
        </select>
      </div>
      <div class="field-group">
        <label class="field-label">หมายเลขพัสดุจัดส่ง (Tracking Number) *</label>
        <input type="text" id="shipTracking" class="input-field" value="${defaultTracking}" required>
      </div>
      <p style="font-size:12.5px;color:var(--text-muted);margin:0;">ระบบจะส่งอีเมลแจ้งเตือนการจัดส่งและรหัสติดตามพัสดุให้ลูกค้าโดยอัตโนมัติ 🚀</p>
    `, async function() {
      const carrier = document.getElementById('shipCarrier')?.value || 'TechNova Express';
      const tracking_number = document.getElementById('shipTracking')?.value?.trim() || defaultTracking;
      try {
        await api(`/api/orders/${orderId}/status`, {
          method: 'PUT',
          body: JSON.stringify({ status: 'shipped', carrier, tracking_number }),
        });
        closeModal();
        showToast(`พัสดุคำสั่งซื้อ #${orderId} ถูกจัดส่งและส่งอีเมลแจ้งลูกค้าแล้ว 🚀`, 'success');
        renderApp();
      } catch (err) {
        showToast(err.message || 'Status update failed', 'error');
      }
    });
    return;
  }

  try {
    await api(`/api/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
    showToast(`Order status updated to ${status}`, 'success');
    renderApp();
  } catch (err) { showToast(err.message || 'Status update failed', 'error'); }
}

function editProductStockModal(productId, currentStock) {
  showModal('Edit Stock Quantity', `
    <div class="field-group">
      <label class="field-label">New Stock Quantity</label>
      <input type="number" id="newStockVal" class="input-field" value="${currentStock}" min="0" max="9999">
    </div>`, async function () {
    const val = parseInt(document.getElementById('newStockVal')?.value || '0', 10);
    if (isNaN(val) || val < 0) { showToast('Please enter valid quantity', 'error'); return; }
    try {
      await api(`/api/products/${productId}`, { method: 'PUT', body: JSON.stringify({ stock: val }) });
      closeModal();
      showToast('Stock updated successfully', 'success');
      renderApp();
    } catch (err) { showToast(err.message || 'Update failed', 'error'); }
  });
}

async function deleteProduct(id) {
  if (!confirm('Remove this hardware from showroom?')) return;
  try {
    await api(`/api/products/${id}`, { method: 'DELETE' });
    showToast('Product removed', 'info');
    renderApp();
  } catch (err) { showToast(err.message || 'Delete failed', 'error'); }
}

function showAddProductModal() {
  showModal('Add New Hardware', `
    <div class="field-group"><label class="field-label">Product Title *</label>
      <input type="text" id="apTitle" class="input-field" placeholder="e.g. NovaStation Titan Pro"></div>
    <div class="field-group"><label class="field-label">Price (฿) *</label>
      <input type="number" id="apPrice" class="input-field" placeholder="e.g. 89900" min="0"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div class="field-group"><label class="field-label">Stock Qty</label>
        <input type="number" id="apStock" class="input-field" value="10" min="0"></div>
      <div class="field-group"><label class="field-label">Category ID</label>
        <input type="number" id="apCat" class="input-field" value="1" min="1"></div>
    </div>
    <div class="field-group"><label class="field-label">Description</label>
      <textarea id="apDesc" class="input-field" rows="3" placeholder="Premium flagship hardware..."></textarea></div>`,
    async function () {
      const title = document.getElementById('apTitle')?.value?.trim();
      const price = parseFloat(document.getElementById('apPrice')?.value || '0');
      const stock = parseInt(document.getElementById('apStock')?.value || '10', 10);
      const cat = parseInt(document.getElementById('apCat')?.value || '1', 10);
      const desc = document.getElementById('apDesc')?.value?.trim();
      if (!title || !price) { showToast('Title and price required', 'error'); return; }
      try {
        await api('/api/products', { method: 'POST', body: JSON.stringify({ title, price, stock, category_id: cat, description: desc || 'Premium flagship hardware.' }) });
        closeModal();
        showToast('Product added to showroom!', 'success');
        renderApp();
      } catch (err) { showToast(err.message || 'Failed to add product', 'error'); }
    });
}

function showAddCategoryModal() {
  showModal('Add Showroom Domain', `
    <div class="field-group"><label class="field-label">Domain Name *</label>
      <input type="text" id="acName" class="input-field" placeholder="e.g. Audio & Sound"></div>`,
    async function () {
      const name = document.getElementById('acName')?.value?.trim();
      if (!name) { showToast('Domain name required', 'error'); return; }
      try {
        await api('/api/categories', { method: 'POST', body: JSON.stringify({ name }) });
        closeModal();
        showToast('Domain created!', 'success');
        renderApp();
      } catch (err) { showToast(err.message || 'Failed', 'error'); }
    });
}

async function deleteCategory(id) {
  if (!confirm('Delete this category?')) return;
  try {
    await api(`/api/categories/${id}`, { method: 'DELETE' });
    showToast('Category deleted', 'info');
    renderApp();
  } catch (err) { showToast(err.message || 'Failed', 'error'); }
}

function showAddUserModal() {
  const bodyHtml = `
    <div class="field-group">
      <label class="field-label">Full Name (ชื่อ-นามสกุล) *</label>
      <input type="text" id="nuName" class="input-field" placeholder="e.g. Somchai Srivichai">
    </div>
    <div class="field-group">
      <label class="field-label">Email Address (อีเมล) *</label>
      <input type="email" id="nuEmail" class="input-field" placeholder="e.g. user@technova.com">
    </div>
    <div class="field-group">
      <label class="field-label">Phone Number (เบอร์โทรศัพท์)</label>
      <input type="tel" id="nuPhone" class="input-field" placeholder="e.g. 081-234-5678">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div class="field-group">
        <label class="field-label">Role (สิทธิ์การใช้งาน)</label>
        <select id="nuRole" class="select-box" style="width:100%;">
          <option value="customer" selected>Customer (ลูกค้าทั่วไป)</option>
          <option value="admin">Administrator (ผู้ดูแลระบบ)</option>
        </select>
      </div>
      <div class="field-group">
        <label class="field-label">Account Status (สถานะ)</label>
        <select id="nuStatus" class="select-box" style="width:100%;">
          <option value="active" selected>Active (ปกติ)</option>
          <option value="banned">Banned (ระงับใช้งาน)</option>
        </select>
      </div>
    </div>
    <div class="field-group">
      <label class="field-label">Initial Password (รหัสผ่านเริ่มต้น) *</label>
      <input type="password" id="nuPassword" class="input-field" placeholder="Minimum 6 characters (อย่างน้อย 6 ตัวอักษร)">
    </div>
  `;

  showModal('+ Add New User (เพิ่มผู้ใช้ใหม่)', bodyHtml, async function () {
    const name = document.getElementById('nuName')?.value?.trim();
    const email = document.getElementById('nuEmail')?.value?.trim();
    const phone = document.getElementById('nuPhone')?.value?.trim();
    const role = document.getElementById('nuRole')?.value || 'customer';
    const status = document.getElementById('nuStatus')?.value || 'active';
    const password = document.getElementById('nuPassword')?.value;

    if (!name || !email || !password) {
      showToast('กรุณากรอกชื่อ อีเมล และรหัสผ่าน', 'error');
      return;
    }
    if (password.length < 6) {
      showToast('รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร', 'error');
      return;
    }

    try {
      await api('/api/admin/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, phone, role, status, password })
      });
      closeModal();
      showToast('สร้างบัญชีผู้ใช้ใหม่เรียบร้อยแล้ว ✓', 'success');
      renderApp();
    } catch (err) {
      showToast(err.message || 'สร้างผู้ใช้ไม่สำเร็จ', 'error');
    }
  }, 'Create User');
}

function showEditUserModal(userId, currentName, currentEmail, currentPhone, currentRole, currentBanned) {
  const isSelf = state.user && state.user.id === userId;
  const bodyHtml = `
    <div class="field-group">
      <label class="field-label">Full Name (ชื่อ-นามสกุล) *</label>
      <input type="text" id="euName" class="input-field" value="${escHtml(currentName || '')}">
    </div>
    <div class="field-group">
      <label class="field-label">Email Address (อีเมล) *</label>
      <input type="email" id="euEmail" class="input-field" value="${escHtml(currentEmail || '')}">
    </div>
    <div class="field-group">
      <label class="field-label">Phone Number (เบอร์โทรศัพท์)</label>
      <input type="tel" id="euPhone" class="input-field" value="${escHtml(currentPhone === '-' ? '' : currentPhone || '')}" placeholder="081-xxx-xxxx">
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div class="field-group">
        <label class="field-label">Role (สิทธิ์)</label>
        <select id="euRole" class="select-box" style="width:100%;">
          <option value="customer" ${currentRole === 'customer' ? 'selected' : ''}>Customer</option>
          <option value="admin" ${currentRole === 'admin' ? 'selected' : ''}>Administrator</option>
        </select>
      </div>
      <div class="field-group">
        <label class="field-label">Account Status (สถานะ)</label>
        <select id="euStatus" class="select-box" style="width:100%;" ${isSelf ? 'disabled title="ไม่สามารถระงับบัญชีตัวเองได้"' : ''}>
          <option value="active" ${!currentBanned ? 'selected' : ''}>Active (ปกติ)</option>
          <option value="banned" ${currentBanned ? 'selected' : ''}>Banned (ระงับใช้งาน)</option>
        </select>
      </div>
    </div>
    <div class="field-group">
      <label class="field-label">New Password (เปลี่ยนรหัสผ่านใหม่ — เว้นว่างไว้หากไม่ต้องการเปลี่ยน)</label>
      <input type="password" id="euPassword" class="input-field" placeholder="Leave blank to keep current password">
    </div>
  `;

  showModal(`Edit User (แก้ไขผู้ใช้ #${userId})`, bodyHtml, async function () {
    const name = document.getElementById('euName')?.value?.trim();
    const email = document.getElementById('euEmail')?.value?.trim();
    const phone = document.getElementById('euPhone')?.value?.trim();
    const role = document.getElementById('euRole')?.value || currentRole;
    const status = document.getElementById('euStatus')?.value || (currentBanned ? 'banned' : 'active');
    const password = document.getElementById('euPassword')?.value;

    if (!name || !email) {
      showToast('กรุณาระบุชื่อและอีเมล', 'error');
      return;
    }
    if (password && password.trim().length > 0 && password.trim().length < 6) {
      showToast('รหัสผ่านใหม่ต้องยาวอย่างน้อย 6 ตัวอักษร', 'error');
      return;
    }

    const payload = { name, email, phone, role, status };
    if (password && password.trim().length >= 6) {
      payload.password = password.trim();
    }

    try {
      await api(`/api/admin/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      closeModal();
      showToast('อัปเดตข้อมูลผู้ใช้เรียบร้อยแล้ว ✓', 'success');
      renderApp();
    } catch (err) {
      showToast(err.message || 'แก้ไขข้อมูลไม่สำเร็จ', 'error');
    }
  }, 'Save Changes');
}

function confirmDeleteUser(userId, userName) {
  if (state.user && state.user.id === userId) {
    showToast('ไม่สามารถลบบัญชีผู้ดูแลระบบที่กำลังล็อกอินอยู่ได้', 'error');
    return;
  }

  showModal(
    'Confirm Delete User',
    `
    <div style="text-align:center;padding:12px 0;">
      <div style="font-size:44px;margin-bottom:12px;">⚠️</div>
      <p style="font-size:15.5px;font-weight:600;color:var(--text-pure);margin-bottom:8px;">
        คุณแน่ใจหรือไม่ว่าต้องการลบบัญชีของ <b>${escHtml(userName)}</b> (ID: #${userId})?
      </p>
      <p style="font-size:13px;color:var(--danger);line-height:1.5;">
        การลบนี้จะลบข้อมูลที่เกี่ยวข้องทั้งหมดอย่างถาวร (ที่อยู่, ประวัติคำสั่งซื้อ, รีวิว, รายการที่อยากได้)
      </p>
    </div>
    `,
    async function () {
      try {
        await api(`/api/admin/users/${userId}`, { method: 'DELETE' });
        closeModal();
        showToast(`ลบบัญชีผู้ใช้ ${userName} เรียบร้อยแล้ว`, 'info');
        renderApp();
      } catch (err) {
        showToast(err.message || 'ลบผู้ใช้ไม่สำเร็จ', 'error');
      }
    },
    'Delete User'
  );
}

async function toggleUserBan(userId, targetBanned) {
  if (state.user && state.user.id === userId && targetBanned) {
    showToast('ไม่สามารถระงับบัญชีของตัวเองได้', 'error');
    return;
  }
  try {
    await api(`/api/admin/users/${userId}/ban`, {
      method: 'PUT',
      body: JSON.stringify({ is_banned: targetBanned })
    });
    showToast(targetBanned ? 'ระงับการใช้งานบัญชีนี้แล้ว' : 'ยกเลิกการระงับบัญชีเรียบร้อยแล้ว', targetBanned ? 'warning' : 'success');
    renderApp();
  } catch (err) {
    showToast(err.message || 'ดำเนินการไม่สำเร็จ', 'error');
  }
}

async function toggleUserRole(userId, newRole) {
  try {
    await api(`/api/admin/users/${userId}/role`, { method: 'PUT', body: JSON.stringify({ role: newRole }) });
    showToast(`User role updated to ${newRole}`, 'success');
    renderApp();
  } catch (err) { showToast(err.message || 'Role update failed', 'error'); }
}

function confirmDeleteSubscriber(subscriberId, subscriberEmail) {
  showModal(
    'Confirm Remove Subscriber',
    `
    <div style="text-align:center;padding:12px 0;">
      <div style="font-size:44px;margin-bottom:12px;">📬</div>
      <p style="font-size:15.5px;font-weight:600;color:var(--text-pure);margin-bottom:8px;">
        คุณต้องการลบอีเมล <b>${escHtml(subscriberEmail)}</b> ออกจากรายชื่อรับข่าวสารหรือไม่?
      </p>
      <p style="font-size:13px;color:var(--text-muted);line-height:1.5;">
        หลังจากลบแล้ว ผู้ใช้นี้จะสามารถกดลงทะเบียนรับข่าวสารเพื่อรับอีเมลต้อนรับใหม่อีกครั้งได้
      </p>
    </div>
    `,
    async function () {
      try {
        await api(`/api/admin/subscribers/${subscriberId}`, { method: 'DELETE' });
        closeModal();
        showToast(`ลบผู้รับข่าวสาร ${subscriberEmail} เรียบร้อยแล้ว`, 'info');
        renderApp();
      } catch (err) {
        showToast(err.message || 'ลบไม่สำเร็จ', 'error');
      }
    },
    'Remove Subscriber'
  );
}

// ============================================================================
// 22. ROUTER & SPA ENGINE
// ============================================================================
const routes = {
  '/': viewHome,
  '/products': viewProducts,
  '/builder': viewCustomStudio,
  '/studio': viewCustomStudio,
  '/wishlist': viewWishlist,
  '/checkout': viewCheckout,
  '/my-orders': viewMyOrders,
  '/login': viewLogin,
  '/register': viewRegister,
  '/profile': viewProfile,
  '/admin': viewAdmin,
};

async function renderApp() {
  const app = document.getElementById('app');
  if (!app) return;

  const hash = location.hash.slice(1) || '/';
  const [routePath, queryString] = hash.split('?');
  const params = new URLSearchParams(queryString || '');

  renderNav();
  updateStaticTexts();
  window.scrollTo({ top: 0, behavior: 'instant' });

  try {
    let content;
    if (routePath.startsWith('/product/')) {
      const id = routePath.split('/')[2];
      if (!id || isNaN(Number(id))) throw new Error('Invalid product ID');
      content = await viewProductDetail(id);
    } else if (routePath === '/cart') {
      openBag();
      content = await viewProducts(params);
    } else {
      const handler = routes[routePath] || viewHome;
      content = await handler(params);
    }

    if (content !== undefined && content !== null) {
      app.innerHTML = content;
    }
  } catch (err) {
    console.error('[TechNova Router]', err);
    app.innerHTML = `
      <div class="wrap" style="text-align:center;padding:100px 0;">
        <div style="font-size:48px;margin-bottom:16px;">⚠️</div>
        <h2 style="font-size:24px;font-weight:700;margin-bottom:8px;">${state.lang === 'th' ? 'เกิดข้อผิดพลาดในการโหลดหน้า' : 'Something went wrong'}</h2>
        <p style="color:var(--text-secondary);max-width:400px;margin:0 auto 28px;">${escHtml(err.message)}</p>
        <button class="btn btn-primary" onclick="renderApp()">${state.lang === 'th' ? 'ลองใหม่อีกครั้ง' : 'Try Again'}</button>
      </div>`;
  }
}

// ============================================================================
// 23. INITIALIZATION
// ============================================================================
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const me = await api('/api/auth/me');
    if (me?.user) state.user = me.user;
  } catch { /* not logged in */ }

  renderNav();
  updateBagUI();
  updateWishlistUI();
  initCookieConsent();
  renderApp();

  const searchInput = document.getElementById('globalSearchInput');
  const searchBackdrop = document.getElementById('searchBackdrop');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const searchClearBtn = document.getElementById('searchClearBtn');

  searchInput?.addEventListener('input', e => renderSearchResults(e.target.value));
  searchClearBtn?.addEventListener('click', () => {
    if (searchInput) { searchInput.value = ''; searchInput.focus(); }
    renderSearchResults('');
  });
  searchBackdrop?.addEventListener('click', closeSearch);
  searchCloseBtn?.addEventListener('click', closeSearch);

  document.querySelectorAll('.search-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const q = pill.getAttribute('data-query');
      if (searchInput && q) { searchInput.value = q; renderSearchResults(q); }
    });
  });

  document.getElementById('bagBackdrop')?.addEventListener('click', closeBag);
  document.getElementById('bagCloseBtn')?.addEventListener('click', closeBag);

  const mobBtn = document.getElementById('mobileMenuBtn');
  const mobSheet = document.getElementById('mobileNavSheet');
  mobBtn?.addEventListener('click', () => mobSheet?.classList.toggle('open'));
  document.querySelectorAll('.mob-link').forEach(link =>
    link.addEventListener('click', () => mobSheet?.classList.remove('open'))
  );

  window.addEventListener('keydown', e => {
    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeSearch();
      closeBag();
      closeModal();
    }
  });
});

window.addEventListener('hashchange', renderApp);
