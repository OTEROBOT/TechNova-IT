/**
 * ============================================================================
 *  db/init.js
 * ============================================================================
 *  ภาษาที่ใช้: JavaScript (รันบน Node.js)
 *
 *  ไฟล์นี้ทำหน้าที่:
 *   1. เปิด/สร้างฐานข้อมูล SQLite โดยใช้ไลบรารี "sql.js"
 *      (sql.js คือ SQLite ที่คอมไพล์เป็น WebAssembly แล้ว จึงไม่ต้องติดตั้ง
 *       โปรแกรมเสริมสำหรับคอมไพล์ภาษา C/C++ ใดๆ ในเครื่อง ทำให้ npm install
 *       ผ่านได้ชัวร์ทุกเครื่อง แม้เป็นโน้ตบุ๊กที่ไม่เคยลง build tools มาก่อน)
 *   2. สร้างตาราง (schema) ทั้งหมดของระบบร้านค้า
 *   3. ใส่ข้อมูลตัวอย่าง (seed) ตอนรันครั้งแรกเท่านั้น
 *   4. ห่อ API ของ sql.js ให้หน้าตาเหมือนไลบรารียอดนิยม "better-sqlite3"
 *      (มีเมธอด .prepare(sql).get()/.all()/.run()) เพื่อให้ไฟล์ routes/*.js
 *      ทุกไฟล์เขียนโค้ดแบบเดียวกันได้หมด ไม่ต้องรู้รายละเอียดภายในของ sql.js
 *
 *  วิธีต่อยอด:
 *   - อยากเพิ่มตารางใหม่ → เพิ่มคำสั่ง CREATE TABLE ในฟังก์ชัน createSchemaAndSeed()
 *   - อยากเพิ่มคอลัมน์ในตารางเดิม → แก้ตรง CREATE TABLE ตารางนั้น แล้วลบไฟล์
 *     db/store.sqlite ทิ้ง (ฐานข้อมูลจะถูกสร้างใหม่พร้อมข้อมูลตัวอย่างตอนรันรอบถัดไป)
 * ============================================================================
 */

const initSqlJs = require('sql.js');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'store.sqlite');
const BCRYPT_SALT_ROUNDS = 12;

// ตัวแปรเก็บ instance ฐานข้อมูลจริงของ sql.js (ตั้งค่าตอนโหลดเสร็จ ดูล่างสุดของไฟล์)
let sqljsDb = null;
let inTransaction = false;

// บันทึกฐานข้อมูล (ที่อยู่ใน memory) ลงไฟล์ .sqlite บนดิสก์อย่างปลอดภัย
function persist() {
  if (inTransaction) return; // รอให้ commit transaction ให้เสร็จก่อน export
  try {
    if (!sqljsDb) return;
    const data = sqljsDb.export();
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, Buffer.from(data));
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error('[Database Persistence Error]', err);
  }
}

// ----------------------------------------------------------------------------
// ตัวห่อ (wrapper) ให้ sql.js มีหน้าตาการใช้งานแบบเดียวกับ better-sqlite3
// เพื่อให้ routes/*.js เรียกใช้แบบ db.prepare(sql).get(...) / .all(...) / .run(...) ได้เลย
// ----------------------------------------------------------------------------
class Statement {
  constructor(sql) {
    this.sql = sql;
  }
  // .get() -> คืนแถวเดียว (ใช้ตอนอยากได้ข้อมูล 1 รายการ เช่น หา user ตาม id)
  get(...params) {
    const stmt = sqljsDb.prepare(this.sql);
    stmt.bind(params);
    const row = stmt.step() ? stmt.getAsObject() : undefined;
    stmt.free();
    return row;
  }
  // .all() -> คืนหลายแถวเป็น array (ใช้ตอนอยากได้ข้อมูลเป็นลิสต์ เช่น สินค้าทั้งหมด)
  all(...params) {
    const stmt = sqljsDb.prepare(this.sql);
    stmt.bind(params);
    const rows = [];
    while (stmt.step()) rows.push(stmt.getAsObject());
    stmt.free();
    return rows;
  }
  // .run() -> ใช้กับคำสั่งที่ไม่คืนข้อมูล เช่น INSERT/UPDATE/DELETE
  // คืนค่า lastInsertRowid (id ล่าสุดที่เพิ่ง insert) และ changes (จำนวนแถวที่ถูกแก้ไข)
  run(...params) {
    const stmt = sqljsDb.prepare(this.sql);
    stmt.bind(params);
    stmt.step();
    stmt.free();
    const idResult = sqljsDb.exec('SELECT last_insert_rowid() AS id');
    const lastInsertRowid = idResult[0]?.values[0]?.[0] || 0;
    const changes = sqljsDb.getRowsModified();
    persist(); // บันทึกลงไฟล์ทันทีทุกครั้งที่มีการเปลี่ยนแปลงข้อมูล
    return { lastInsertRowid, changes };
  }
}

const db = {
  prepare(sql) {
    return new Statement(sql);
  },
  // รันคำสั่ง SQL ดิบๆ ได้หลายคำสั่งพร้อมกัน (คั่นด้วย ;) ใช้ตอนสร้างตาราง
  exec(sql) {
    sqljsDb.exec(sql);
    persist();
  },
  pragma(pragmaSql) {
    if (pragmaSql) sqljsDb.exec(`PRAGMA ${pragmaSql};`);
  },
  // ใช้ครอบหลายคำสั่งที่ต้องสำเร็จพร้อมกันทั้งหมด (เช่น ตัดสต็อกสินค้า + สร้างออเดอร์)
  transaction(fn) {
    return (...args) => {
      inTransaction = true;
      try {
        sqljsDb.exec('BEGIN TRANSACTION;');
        const result = fn(...args);
        sqljsDb.exec('COMMIT;');
        inTransaction = false;
        persist();
        return result;
      } catch (err) {
        try { sqljsDb.exec('ROLLBACK;'); } catch (_) {}
        inTransaction = false;
        throw err;
      }
    };
  },
  SALT_ROUNDS: BCRYPT_SALT_ROUNDS,
};

// ----------------------------------------------------------------------------
// โครงสร้างตารางทั้งหมด + ดัชนีประสิทธิภาพ + ข้อมูลตัวอย่าง
// ----------------------------------------------------------------------------
function createSchemaAndSeed() {
  sqljsDb.exec(`
    PRAGMA foreign_keys = ON;
    -- ผู้ใช้งาน: ทั้งลูกค้าและแอดมิน แยกด้วยคอลัมน์ role
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,           -- เก็บเป็น hash (bcrypt) ไม่เก็บรหัสผ่านตรงๆ
      name TEXT NOT NULL,
      phone TEXT,
      avatar TEXT,                      -- path รูปโปรไฟล์ที่อัปโหลด เช่น /uploads/avatars/xxx.png
      role TEXT NOT NULL DEFAULT 'customer', -- 'customer' หรือ 'admin'
      is_banned INTEGER NOT NULL DEFAULT 0,  -- 0 = ปกติ, 1 = ถูกระงับใช้งาน
      primary_interest TEXT,            -- สายเทคโนโลยีหลัก (gaming, creator, enterprise, custom_desk)
      setup_style TEXT,                 -- สไตล์อุปกรณ์ (flagship, value, silent_minimal)
      subscribed_topics TEXT,           -- หัวข้อข่าวสาร (JSON string เช่น ["flash_deals","new_releases"])
      birth_date TEXT,
      gender TEXT,
      referral_source TEXT,
      tags TEXT DEFAULT '[]',           -- แท็กการตลาด (JSON string เช่น ["Customer-Paid","Interested-Gaming"])
      reset_token TEXT,                 -- token สุ่มสำหรับลืมรหัสผ่าน (หมดอายุได้)
      reset_token_expires DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- ที่อยู่จัดส่งของลูกค้า (1 คนมีได้หลายที่อยู่ เหมือน Shopee/Lazada)
    CREATE TABLE IF NOT EXISTS addresses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      recipient_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      address_line TEXT NOT NULL,
      subdistrict TEXT,
      district TEXT,
      province TEXT,
      postal_code TEXT,
      is_default INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- หมวดหมู่สินค้า
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );

    -- สินค้า
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      icon TEXT DEFAULT '📦',      -- ไอคอน emoji ใช้เป็น fallback ตอนยังไม่มีรูปอัปโหลด
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );

    -- รูปสินค้า (1 สินค้ามีได้หลายรูป) — อัปโหลดจริงผ่านแอดมิน เก็บไว้ที่ public/uploads/products
    CREATE TABLE IF NOT EXISTS product_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      filename TEXT NOT NULL,     -- เช่น "168123123-notebook.jpg"
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    -- คำสั่งซื้อ
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      address_id INTEGER,
      total_price REAL NOT NULL,       -- ยอดรวมหลังหักส่วนลดแล้ว
      discount_amount REAL DEFAULT 0,
      coupon_code TEXT,
      status TEXT NOT NULL DEFAULT 'pending', -- pending, paid, shipped, delivered, cancelled
      tracking_number TEXT,            -- หมายเลขพัสดุจัดส่ง (เช่น TNX-883921)
      carrier TEXT,                    -- บริษัทขนส่ง (เช่น TechNova Express / Flash Express)
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (address_id) REFERENCES addresses(id)
    );

    -- รายการสินค้าในแต่ละคำสั่งซื้อ
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    -- รีวิว + ให้ดาวสินค้า
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      order_id INTEGER,             -- อ้างอิงออเดอร์ที่ซื้อจริง (ใช้ตรวจว่าเป็น "ซื้อแล้ว")
      rating INTEGER NOT NULL,      -- 1-5 ดาว
      comment TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    -- สินค้าโปรด (wishlist)
    CREATE TABLE IF NOT EXISTS wishlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (product_id) REFERENCES products(id)
    );

    -- คูปองส่วนลด
    CREATE TABLE IF NOT EXISTS coupons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL,             -- 'percent' (ลด %) หรือ 'fixed' (ลดเป็นบาท)
      value REAL NOT NULL,
      min_order REAL DEFAULT 0,       -- ยอดขั้นต่ำที่ใช้คูปองได้
      usage_limit INTEGER,            -- ใช้ได้กี่ครั้ง (NULL = ไม่จำกัด)
      used_count INTEGER DEFAULT 0,
      expires_at DATETIME,
      active INTEGER NOT NULL DEFAULT 1
    );

    -- สมาชิกรับข่าวสารทางอีเมล (Newsletter Subscribers)
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      tags TEXT DEFAULT '[]',          -- แท็กการตลาด (JSON string)
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- บันทึกสถิติการคลิกลิงก์และ Auto-Tagging จากอีเมลการตลาด
    CREATE TABLE IF NOT EXISTS click_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      tag TEXT NOT NULL,
      redirect_url TEXT,
      ip_address TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- ดัชนีประสิทธิภาพ (Performance Indexes) สำหรับ Foreign Keys และ Query ยอดนิยม
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
    CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
    CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
    CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);
    CREATE INDEX IF NOT EXISTS idx_order_items_product ON order_items(product_id);
    CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);
    CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
    CREATE INDEX IF NOT EXISTS idx_wishlist_user ON wishlist(user_id);
    CREATE INDEX IF NOT EXISTS idx_addresses_user ON addresses(user_id);
    CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
    CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);
    CREATE INDEX IF NOT EXISTS idx_click_events_email ON click_events(email);
    CREATE INDEX IF NOT EXISTS idx_click_events_tag ON click_events(tag);
  `);

  const userCount = db.prepare('SELECT COUNT(*) AS c FROM users').get().c;
  if (userCount === 0) {
    seedData();
    console.log('✅ สร้างฐานข้อมูลและใส่ข้อมูลตัวอย่างเรียบร้อยแล้ว');
  }
}

function seedData() {
  // --- ผู้ใช้ตัวอย่าง (Bcrypt Cost Factor: 12) ---
  const insertUser = db.prepare(
    'INSERT INTO users (email, password, name, phone, role) VALUES (?, ?, ?, ?, ?)'
  );
  insertUser.run('admin@store.com', bcrypt.hashSync('admin123', BCRYPT_SALT_ROUNDS), 'ผู้ดูแลระบบ TechNova', '080-000-0000', 'admin');
  const customerId = insertUser.run(
    'customer@store.com',
    bcrypt.hashSync('customer123', BCRYPT_SALT_ROUNDS),
    'กิตติศักดิ์ วรเสถียร (VIP)',
    '081-888-9999',
    'customer'
  ).lastInsertRowid;

  // --- ที่อยู่ตัวอย่างของลูกค้าทดสอบ ---
  db.prepare(
    `INSERT INTO addresses (user_id, recipient_name, phone, address_line, subdistrict, district, province, postal_code, is_default)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)`
  ).run(customerId, 'กิตติศักดิ์ วรเสถียร', '081-888-9999', '88/19 อาคารเทคโนว่า ทาวเวอร์ ชั้น 24 ถนนสุขุมวิท', 'คลองเตยเหนือ', 'วัฒนา', 'กรุงเทพมหานคร', '10110');

  // --- 8 หมวดหมู่โชว์รูมระดับโลก ---
  const insertCat = db.prepare('INSERT INTO categories (name) VALUES (?)');
  const catIds = {
    gaming: insertCat.run('Gaming').lastInsertRowid,
    pc_parts: insertCat.run('PC Components').lastInsertRowid,
    laptops: insertCat.run('Laptops').lastInsertRowid,
    monitors: insertCat.run('Monitors').lastInsertRowid,
    peripherals: insertCat.run('Peripherals').lastInsertRowid,
    storage: insertCat.run('Storage').lastInsertRowid,
    networking: insertCat.run('Networking').lastInsertRowid,
    accessories: insertCat.run('Accessories').lastInsertRowid,
  };

  // --- รายการสินค้า High-End Showroom ---
  const insertProduct = db.prepare(
    'INSERT INTO products (category_id, title, description, price, stock, icon) VALUES (?, ?, ?, ?, ?, ?)'
  );

  const products = [
    // 1. Gaming
    [
      catIds.gaming,
      'NovaStation Titan Apex — Liquid Cooled Gaming Rig',
      'The zenith of gaming engineering. Intel Core i9-14900KS, Custom Hard-line Liquid Cooling, NVIDIA GeForce RTX 4090 24GB Titanium Edition, 64GB DDR5-7200MHz, 4TB Gen5 NVMe SSD. Handcrafted in aircraft-grade anodized aluminum chassis.',
      189900,
      4,
      '⚡',
    ],
    [
      catIds.gaming,
      'NovaHandheld Horizon X Pro (OLED 144Hz)',
      'Handheld PC flagship powered by AMD Ryzen Z1 Extreme, 8.4" 144Hz 2.5K OLED Touch Display, 32GB LPDDR5X, 2TB PCIe 4.0 SSD, Hall-Effect Analog Triggers.',
      34900,
      12,
      '🎮',
    ],

    // 2. PC Components
    [
      catIds.pc_parts,
      'NVIDIA GeForce RTX 4090 Founders Titanium',
      'The definitive graphics architecture. 24GB G6X VRAM, Ada Lovelace Silicon, DLSS 3.5 Neural Ray Reconstruction, Dual-Axial Flow-Through Vapor Chamber.',
      79900,
      6,
      '💎',
    ],
    [
      catIds.pc_parts,
      'Intel Core i9-14900KS Special Edition 6.2GHz',
      '24 Cores (8 Performance + 16 Efficient), 32 Threads, up to 6.2 GHz Thermal Velocity Boost. Factory-binned silicon for elite overclocking precision.',
      28900,
      15,
      '🧠',
    ],
    [
      catIds.pc_parts,
      'Corsair Dominator Titanium RGB 64GB (2x32GB) DDR5-7200',
      'Forged aluminum heatspreaders with interchangeable top bars, patented DHX cooling, precision-tuned timings for next-gen memory bandwidth.',
      16900,
      20,
      '⚡',
    ],

    // 3. Laptops
    [
      catIds.laptops,
      'AeroBook Studio Carbon 16" (M-Pro Architecture)',
      'Ultra-thin CNC Magnesium unibody. 16.0" 3.2K 165Hz Mini-LED Liquid Retina XDR, Intel Core Ultra 9, RTX 4080 Max-Q, 32GB RAM, 2TB SSD, 22-Hour Battery.',
      119900,
      8,
      '💻',
    ],
    [
      catIds.laptops,
      'NovaBlade Stealth 14" Slim Magnesium',
      '0.58-inch ultra-compact profile, 14.5" 3K 120Hz OLED Display, AMD Ryzen 9 8945HS, RTX 4070 8GB, 32GB LPDDR5X, Vapor Chamber Cooling.',
      79900,
      10,
      '💻',
    ],

    // 4. Monitors
    [
      catIds.monitors,
      'ProArt Horizon Studio 32" 6K Nano-IPS Pro Display',
      '6016 x 3384 native resolution, 99% DCI-P3, 100% Adobe RGB, Factory Calibrated ΔE < 1, 1600 nits Peak HDR, Thunderbolt 4 96W Power Delivery Hub.',
      89900,
      5,
      '🖥️',
    ],
    [
      catIds.monitors,
      'Odyssey Horizon OLED G9 49" 240Hz 0.03ms Ultra-Wide',
      'Dual QHD (5120x1440) 32:9 Curved OLED, 0.03ms Response Time, 240Hz Refresh Rate, DisplayHDR True Black 400, Neo Quantum Processor.',
      59900,
      7,
      '🖥️',
    ],

    // 5. Peripherals
    [
      catIds.peripherals,
      'Keychron Q1 Max Full-CNC Wireless Mechanical Keyboard',
      'Solid 6063 Aluminum Body, Double-Gasket Acoustic Mount, Gateron Jupiter Banana Switches, PBT Keycaps, Tri-Mode 2.4GHz/BT5.1/USB-C.',
      8900,
      25,
      '⌨️',
    ],
    [
      catIds.peripherals,
      'Logitech G PRO X Superlight 2 DEX (Magnesium)',
      'Sub-50g ultra-lightweight ergonomic mouse, HERO 2 32,000 DPI Sensor, LIGHTFORCE Hybrid Optical Switches, 8000Hz Wireless Polling Rate.',
      5990,
      30,
      '🖱️',
    ],

    // 6. Storage
    [
      catIds.storage,
      'Samsung 990 PRO 4TB Heatsink PCIe 5.0/4.0 NVMe',
      'Sequential Read up to 7,450 MB/s, Sequential Write up to 6,900 MB/s. Integrated Nickel-Coated Custom Thermal Armor for constant peak performance.',
      14900,
      35,
      '💾',
    ],

    // 7. Networking
    [
      catIds.networking,
      'UniFi Dream Wall Pro Wi-Fi 7 Enterprise Gateway',
      'Integrated Wi-Fi 7 AP, 10G SFP+ LAN/WAN, Multi-Gig PoE Ports, 1.3" Touchscreen Display, Zero-Touch Global Remote Management.',
      39900,
      6,
      '📡',
    ],

    // 8. Accessories
    [
      catIds.accessories,
      'CalDigit TS4 Thunderbolt 4 Studio Station (18-Port)',
      'Ultimate workstation dock. Dual 6K display support, 98W host charging, 2.5GbE LAN, UHS-II SD/microSD, 5x USB-A, 3x Thunderbolt 4.',
      15900,
      18,
      '🔌',
    ],
    [
      catIds.accessories,
      'Nomad Base One Max MagSafe Titanium Dual Charger',
      'Solid CNC Machined Metal & Glass Base, Official 15W MagSafe Fast Charging, Integrated Apple Watch Ultra Fast Charger.',
      5990,
      40,
      '⚡',
    ],
  ];

  const productIds = products.map((p) => insertProduct.run(...p).lastInsertRowid);

  // --- ใส่รูปสินค้าสตูดิโอความละเอียดสูง ---
  const insertImage = db.prepare(
    'INSERT INTO product_images (product_id, filename, sort_order) VALUES (?, ?, ?)'
  );

  const sampleImages = {
    // NovaStation Titan
    0: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=1200&q=85',
    ],
    // NovaHandheld
    1: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85',
    ],
    // RTX 4090
    2: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=85',
    ],
    // i9 14900KS
    3: [
      'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=1200&q=85',
    ],
    // Dominator RAM
    4: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1200&q=85',
    ],
    // AeroBook Studio 16"
    5: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1200&q=85',
    ],
    // NovaBlade 14"
    6: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=1200&q=85',
    ],
    // ProArt Horizon 32"
    7: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=85',
    ],
    // Odyssey G9
    8: [
      'https://images.unsplash.com/photo-1551645120-d70bfe84c826?auto=format&fit=crop&w=1200&q=85',
    ],
    // Keychron Q1 Max
    9: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=85',
    ],
    // Logitech G PRO X Superlight 2
    10: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=85',
    ],
    // Samsung 990 PRO
    11: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1200&q=85',
    ],
    // UniFi Dream Wall
    12: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=85',
    ],
    // CalDigit TS4
    13: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1200&q=85',
    ],
    // Nomad MagSafe Base
    14: [
      'https://images.unsplash.com/photo-1622445262464-84b14e3235b3?auto=format&fit=crop&w=1200&q=85',
    ],
  };

  Object.entries(sampleImages).forEach(([idx, urls]) => {
    const pId = productIds[Number(idx)];
    if (pId) {
      urls.forEach((url, sIdx) => {
        insertImage.run(pId, url, sIdx);
      });
    }
  });

  // --- รีวิวตัวอย่างระดับพรีเมียม ---
  const insertReview = db.prepare(
    'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)'
  );
  insertReview.run(
    productIds[0],
    customerId,
    5,
    'งานประกอบเนียนระดับงานศิลปะ ระบบระบายความร้อนเงียบสนิทแม้รันเรนเดอร์ 3D หนักๆ คุ้มค่าที่สุดสำหรับสตูดิโอมืออาชีพครับ'
  );
  insertReview.run(
    productIds[2],
    customerId,
    5,
    'การ์ดจอแรงที่สุดในโลกตัวจริง งานวัสดุ Titanium แข็งแกร่ง อุณหภูมิเย็นมาก ประทับใจการบริการของ TechNova มากครับ'
  );
  insertReview.run(
    productIds[5],
    customerId,
    5,
    'หน้าจอ Mini-LED คมชัดระดับโปรกล้อง แบตเตอรี่อยู่ได้ทั้งวัน สัมผัสคีย์บอร์ดและทัชแพดพรีเมียมมาก'
  );

  // --- คูปองส่วนลด ---
  const insertCoupon = db.prepare(
    'INSERT INTO coupons (code, type, value, min_order, usage_limit) VALUES (?, ?, ?, ?, ?)'
  );
  insertCoupon.run('TECHNOVA', 'percent', 10, 1000, 500); // ลด 10% เมื่อช้อปครบ 1000
  insertCoupon.run('VIP5000', 'fixed', 5000, 50000, 100); // ลด 5,000 บาท เมื่อช้อปครบ 50,000
}

function migrateSchema() {
  try {
    // 1. Migrate Users Table
    const userTableInfo = sqljsDb.exec("PRAGMA table_info(users);");
    const userColumns = userTableInfo[0]?.values?.map((row) => row[1]) || [];

    const userColumnsToAdd = [
      { name: 'primary_interest', type: 'TEXT' },
      { name: 'setup_style', type: 'TEXT' },
      { name: 'subscribed_topics', type: 'TEXT' },
      { name: 'birth_date', type: 'TEXT' },
      { name: 'gender', type: 'TEXT' },
      { name: 'referral_source', type: 'TEXT' },
      { name: 'tags', type: "TEXT DEFAULT '[]'" },
    ];

    for (const col of userColumnsToAdd) {
      if (!userColumns.includes(col.name)) {
        try {
          sqljsDb.exec(`ALTER TABLE users ADD COLUMN ${col.name} ${col.type};`);
        } catch (err) {
          console.error(`Migration error adding column users.${col.name}:`, err.message);
        }
      }
    }

    // 2. Migrate Orders Table (tracking_number & carrier)
    const ordersTableInfo = sqljsDb.exec("PRAGMA table_info(orders);");
    const orderColumns = ordersTableInfo[0]?.values?.map((row) => row[1]) || [];
    const orderColumnsToAdd = [
      { name: 'tracking_number', type: 'TEXT' },
      { name: 'carrier', type: 'TEXT' },
    ];
    for (const col of orderColumnsToAdd) {
      if (!orderColumns.includes(col.name)) {
        try {
          sqljsDb.exec(`ALTER TABLE orders ADD COLUMN ${col.name} ${col.type};`);
        } catch (err) {
          console.error(`Migration error adding column orders.${col.name}:`, err.message);
        }
      }
    }

    // 3. Migrate Newsletter Subscribers Table (tags)
    const subTableInfo = sqljsDb.exec("PRAGMA table_info(newsletter_subscribers);");
    const subColumns = subTableInfo[0]?.values?.map((row) => row[1]) || [];
    if (!subColumns.includes('tags')) {
      try {
        sqljsDb.exec("ALTER TABLE newsletter_subscribers ADD COLUMN tags TEXT DEFAULT '[]';");
      } catch (err) {
        console.error('Migration error adding column newsletter_subscribers.tags:', err.message);
      }
    }

    // 4. Create Click Events Table if not exists
    sqljsDb.exec(`
      CREATE TABLE IF NOT EXISTS click_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        tag TEXT NOT NULL,
        redirect_url TEXT,
        ip_address TEXT,
        user_agent TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_click_events_email ON click_events(email);
      CREATE INDEX IF NOT EXISTS idx_click_events_tag ON click_events(tag);
    `);

    persist();
  } catch (err) {
    console.error('[Schema Migration Error]', err.message);
  }
}

// ----------------------------------------------------------------------------
// Marketing Tagging Helper Functions
// ----------------------------------------------------------------------------
db.addTagsToEmail = function (rawEmail, newTags) {
  if (!rawEmail) return [];
  const email = String(rawEmail).trim().toLowerCase();
  const tagsToAdd = (Array.isArray(newTags) ? newTags : [newTags])
    .map((t) => String(t).trim())
    .filter(Boolean);
  if (tagsToAdd.length === 0) return [];

  // Update in users table
  const user = db.prepare('SELECT id, tags FROM users WHERE email = ?').get(email);
  if (user) {
    let currentTags = [];
    try {
      currentTags = JSON.parse(user.tags || '[]');
    } catch (_) {
      currentTags = [];
    }
    if (!Array.isArray(currentTags)) currentTags = [];
    let updated = false;
    for (const tag of tagsToAdd) {
      if (!currentTags.includes(tag)) {
        currentTags.push(tag);
        updated = true;
      }
    }
    if (updated) {
      db.prepare('UPDATE users SET tags = ? WHERE id = ?').run(JSON.stringify(currentTags), user.id);
    }
  }

  // Update in newsletter_subscribers table
  const sub = db.prepare('SELECT id, tags FROM newsletter_subscribers WHERE email = ?').get(email);
  if (sub) {
    let subTags = [];
    try {
      subTags = JSON.parse(sub.tags || '[]');
    } catch (_) {
      subTags = [];
    }
    if (!Array.isArray(subTags)) subTags = [];
    let subUpdated = false;
    for (const tag of tagsToAdd) {
      if (!subTags.includes(tag)) {
        subTags.push(tag);
        subUpdated = true;
      }
    }
    if (subUpdated) {
      db.prepare('UPDATE newsletter_subscribers SET tags = ? WHERE id = ?').run(JSON.stringify(subTags), sub.id);
    }
  }

  return tagsToAdd;
};

db.addTagsToUserId = function (userId, newTags) {
  if (!userId) return [];
  const tagsToAdd = (Array.isArray(newTags) ? newTags : [newTags])
    .map((t) => String(t).trim())
    .filter(Boolean);
  if (tagsToAdd.length === 0) return [];

  const user = db.prepare('SELECT id, email, tags FROM users WHERE id = ?').get(userId);
  if (!user) return [];

  let currentTags = [];
  try {
    currentTags = JSON.parse(user.tags || '[]');
  } catch (_) {
    currentTags = [];
  }
  if (!Array.isArray(currentTags)) currentTags = [];
  let updated = false;
  for (const tag of tagsToAdd) {
    if (!currentTags.includes(tag)) {
      currentTags.push(tag);
      updated = true;
    }
  }
  if (updated) {
    db.prepare('UPDATE users SET tags = ? WHERE id = ?').run(JSON.stringify(currentTags), user.id);
  }

  if (user.email) {
    // Also sync subscriber record if exists
    const sub = db.prepare('SELECT id, tags FROM newsletter_subscribers WHERE email = ?').get(user.email);
    if (sub) {
      let subTags = [];
      try {
        subTags = JSON.parse(sub.tags || '[]');
      } catch (_) {
        subTags = [];
      }
      if (!Array.isArray(subTags)) subTags = [];
      let subUpdated = false;
      for (const tag of tagsToAdd) {
        if (!subTags.includes(tag)) {
          subTags.push(tag);
          subUpdated = true;
        }
      }
      if (subUpdated) {
        db.prepare('UPDATE newsletter_subscribers SET tags = ? WHERE id = ?').run(JSON.stringify(subTags), sub.id);
      }
    }
  }

  return currentTags;
};

// ----------------------------------------------------------------------------
// sql.js ต้องโหลดไฟล์ .wasm แบบ async ตอนเริ่มโปรแกรม
// server.js จะรอ (await) ค่า db.ready ให้เสร็จก่อน แล้วค่อยเปิดพอร์ตรับ request
// ----------------------------------------------------------------------------
db.ready = initSqlJs().then((SQL) => {
  if (fs.existsSync(DB_FILE)) {
    sqljsDb = new SQL.Database(fs.readFileSync(DB_FILE));
  } else {
    sqljsDb = new SQL.Database();
  }
  createSchemaAndSeed();
  migrateSchema();
});

module.exports = db;
