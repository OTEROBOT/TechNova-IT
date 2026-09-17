/**
 * ============================================================================
 *  controllers/adminController.js — Executive Dashboard KPIs & User Governance
 * ============================================================================
 */

const bcrypt = require('bcryptjs');
const db = require('../db/init');
const { AppError } = require('../middleware/errorHandler');
const { parseId, validateEnum, sanitizeString, isValidEmail } = require('../middleware/validator');

const BCRYPT_SALT_ROUNDS = db.SALT_ROUNDS || 12;

const adminController = {
  // GET /api/admin/stats
  getStats: (req, res, next) => {
    const totalSales =
      db.prepare("SELECT COALESCE(SUM(total_price), 0) AS s FROM orders WHERE status != 'cancelled'").get()?.s || 0;
    const totalOrders = db.prepare('SELECT COUNT(*) AS c FROM orders').get()?.c || 0;
    const pendingOrders = db.prepare("SELECT COUNT(*) AS c FROM orders WHERE status = 'pending'").get()?.c || 0;
    const totalProducts = db.prepare('SELECT COUNT(*) AS c FROM products').get()?.c || 0;
    const totalCustomers = db.prepare("SELECT COUNT(*) AS c FROM users WHERE role = 'customer'").get()?.c || 0;
    const lowStockProducts = db
      .prepare('SELECT id, title, stock, price FROM products WHERE stock <= 5 ORDER BY stock ASC')
      .all();

    // Last 7 days sales breakdown for charts
    const salesByDay = db
      .prepare(
        `SELECT DATE(created_at) AS day, SUM(total_price) AS total
         FROM orders
         WHERE status != 'cancelled' AND created_at >= DATE('now', '-7 days')
         GROUP BY DATE(created_at)
         ORDER BY day ASC`
      )
      .all();

    // Top 5 selling products by quantity
    const topProducts = db
      .prepare(
        `SELECT p.title, SUM(oi.quantity) AS sold, SUM(oi.quantity * oi.unit_price) AS revenue
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         JOIN orders o ON oi.order_id = o.id
         WHERE o.status != 'cancelled'
         GROUP BY p.id
         ORDER BY sold DESC
         LIMIT 5`
      )
      .all();

    res.json({
      totalSales,
      totalOrders,
      pendingOrders,
      totalProducts,
      totalCustomers,
      lowStockProducts,
      salesByDay,
      topProducts,
    });
  },

  // GET /api/admin/users
  getUsers: (req, res, next) => {
    const users = db
      .prepare('SELECT id, email, name, phone, avatar, role, is_banned, primary_interest, setup_style, subscribed_topics, birth_date, gender, referral_source, created_at FROM users ORDER BY id DESC')
      .all();
    res.json(users);
  },

  // POST /api/admin/users
  createUser: (req, res, next) => {
    const name = sanitizeString(req.body.name);
    const rawEmail = req.body.email;
    const email = sanitizeString(rawEmail).toLowerCase();
    const phone = sanitizeString(req.body.phone);
    const password = req.body.password;
    const role = req.body.role ? validateEnum(req.body.role, ['customer', 'admin'], 'Role') : 'customer';

    if (!name || !email || !password) {
      throw new AppError('กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, อีเมล, รหัสผ่าน)', 400);
    }
    if (!isValidEmail(email)) {
      throw new AppError('รูปแบบอีเมลไม่ถูกต้อง', 400);
    }
    if (typeof password !== 'string' || password.trim().length < 6) {
      throw new AppError('รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร', 400);
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      throw new AppError('อีเมลนี้ถูกใช้งานในระบบแล้ว', 400);
    }

    const hash = bcrypt.hashSync(password.trim(), BCRYPT_SALT_ROUNDS);
    const isBanned = req.body.is_banned ? 1 : (req.body.status === 'banned' ? 1 : 0);

    const info = db
      .prepare('INSERT INTO users (name, email, password, phone, role, is_banned) VALUES (?, ?, ?, ?, ?, ?)')
      .run(name, email, hash, phone || null, role, isBanned);

    const newUser = db
      .prepare('SELECT id, email, name, phone, avatar, role, is_banned, created_at FROM users WHERE id = ?')
      .get(info.lastInsertRowid);

    res.status(201).json({
      ok: true,
      user: newUser,
      message: 'สร้างผู้ใช้งานสำเร็จเรียบร้อย',
    });
  },

  // PUT /api/admin/users/:id
  updateUser: (req, res, next) => {
    const targetUserId = parseId(req.params.id, 'User ID');
    const existing = db.prepare('SELECT * FROM users WHERE id = ?').get(targetUserId);
    if (!existing) throw new AppError('ไม่พบผู้ใช้งานนี้', 404);

    const name = req.body.name !== undefined ? sanitizeString(req.body.name) : existing.name;
    const rawEmail = req.body.email !== undefined ? req.body.email : existing.email;
    const email = sanitizeString(rawEmail).toLowerCase();
    const phone = req.body.phone !== undefined ? sanitizeString(req.body.phone) : existing.phone;
    const role = req.body.role ? validateEnum(req.body.role, ['customer', 'admin'], 'Role') : existing.role;

    if (!name || !email) {
      throw new AppError('ชื่อและอีเมลต้องไม่เป็นค่าว่าง', 400);
    }
    if (!isValidEmail(email)) {
      throw new AppError('รูปแบบอีเมลไม่ถูกต้อง', 400);
    }

    // Check duplicate email
    const duplicate = db.prepare('SELECT id FROM users WHERE email = ? AND id != ?').get(email, targetUserId);
    if (duplicate) {
      throw new AppError('อีเมลนี้ถูกใช้งานโดยบัญชีอื่นแล้ว', 400);
    }

    // Determine ban status
    let isBanned = existing.is_banned;
    if (req.body.status !== undefined) {
      isBanned = req.body.status === 'banned' ? 1 : 0;
    } else if (req.body.is_banned !== undefined) {
      isBanned = req.body.is_banned ? 1 : 0;
    }

    // Security Rules for Self-Modification
    if (targetUserId === req.session.user.id) {
      if (isBanned === 1) {
        throw new AppError('ไม่สามารถระงับบัญชีของตัวเองได้', 400);
      }
      if (existing.role === 'admin' && role !== 'admin') {
        const adminCount = db.prepare("SELECT COUNT(*) AS c FROM users WHERE role = 'admin'").get()?.c || 0;
        if (adminCount <= 1) {
          throw new AppError('ไม่สามารถลดสิทธิ์ได้ เนื่องจากต้องมีผู้ดูแลระบบอย่างน้อย 1 คนในระบบ', 400);
        }
      }
    }

    // Password Update
    let newHash = null;
    if (req.body.password && typeof req.body.password === 'string' && req.body.password.trim().length > 0) {
      if (req.body.password.trim().length < 6) {
        throw new AppError('รหัสผ่านใหม่ต้องยาวอย่างน้อย 6 ตัวอักษร', 400);
      }
      newHash = bcrypt.hashSync(req.body.password.trim(), BCRYPT_SALT_ROUNDS);
    }

    if (newHash) {
      db.prepare('UPDATE users SET name = ?, email = ?, phone = ?, role = ?, is_banned = ?, password = ? WHERE id = ?')
        .run(name, email, phone || null, role, isBanned, newHash, targetUserId);
    } else {
      db.prepare('UPDATE users SET name = ?, email = ?, phone = ?, role = ?, is_banned = ? WHERE id = ?')
        .run(name, email, phone || null, role, isBanned, targetUserId);
    }

    // Update active session if self
    if (targetUserId === req.session.user.id) {
      req.session.user.name = name;
      req.session.user.email = email;
      req.session.user.phone = phone || null;
      req.session.user.role = role;
    }

    const updatedUser = db
      .prepare('SELECT id, email, name, phone, avatar, role, is_banned, created_at FROM users WHERE id = ?')
      .get(targetUserId);

    res.json({
      ok: true,
      user: updatedUser,
      message: 'อัปเดตข้อมูลผู้ใช้งานเรียบร้อยแล้ว',
    });
  },

  // DELETE /api/admin/users/:id
  deleteUser: (req, res, next) => {
    const targetUserId = parseId(req.params.id, 'User ID');

    // Enforce Security Rule: Prevent self-deletion
    if (targetUserId === req.session.user.id) {
      throw new AppError('ไม่สามารถลบบัญชีผู้ดูแลระบบที่กำลังใช้งานอยู่ได้', 400);
    }

    const existing = db.prepare('SELECT id, role, email FROM users WHERE id = ?').get(targetUserId);
    if (!existing) throw new AppError('ไม่พบผู้ใช้งานนี้', 404);

    if (existing.role === 'admin') {
      const adminCount = db.prepare("SELECT COUNT(*) AS c FROM users WHERE role = 'admin'").get()?.c || 0;
      if (adminCount <= 1) {
        throw new AppError('ไม่สามารถลบผู้ดูแลระบบคนสุดท้ายของระบบได้', 400);
      }
    }

    // Cascade delete in transaction to maintain database integrity
    const deleteTx = db.transaction((userId, userEmail) => {
      db.prepare('DELETE FROM wishlist WHERE user_id = ?').run(userId);
      db.prepare('DELETE FROM reviews WHERE user_id = ?').run(userId);
      db.prepare('DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE user_id = ?)').run(userId);
      db.prepare('DELETE FROM orders WHERE user_id = ?').run(userId);
      db.prepare('DELETE FROM addresses WHERE user_id = ?').run(userId);
      db.prepare('DELETE FROM users WHERE id = ?').run(userId);
      if (userEmail) {
        db.prepare('DELETE FROM newsletter_subscribers WHERE email = ?').run(userEmail);
      }
    });

    deleteTx(targetUserId, existing.email);

    res.json({
      ok: true,
      message: 'ลบผู้ใช้งานและข้อมูลที่เกี่ยวข้องเรียบร้อยแล้ว',
    });
  },

  // DELETE /api/admin/subscribers/:id or :email
  deleteSubscriber: (req, res, next) => {
    const param = req.params.id || req.params.email;
    let info;
    if (/^\d+$/.test(param)) {
      info = db.prepare('DELETE FROM newsletter_subscribers WHERE id = ?').run(parseInt(param, 10));
    } else {
      const email = sanitizeString(param).toLowerCase();
      info = db.prepare('DELETE FROM newsletter_subscribers WHERE email = ?').run(email);
    }
    res.json({ ok: true, message: 'ลบข้อมูลผู้รับข่าวสารเรียบร้อยแล้ว', changes: info.changes });
  },

  // PUT /api/admin/users/:id/role (Compatibility)
  updateUserRole: (req, res, next) => {
    const targetUserId = parseId(req.params.id, 'User ID');
    const role = validateEnum(req.body.role, ['customer', 'admin'], 'Role');

    // Prevent removing the last admin from the system
    if (targetUserId === req.session.user.id && role !== 'admin') {
      const adminCount = db.prepare("SELECT COUNT(*) AS c FROM users WHERE role = 'admin'").get()?.c || 0;
      if (adminCount <= 1) {
        throw new AppError('ไม่สามารถลดสิทธิ์ได้ เนื่องจากต้องมีผู้ดูแลระบบอย่างน้อย 1 คนในระบบ', 400);
      }
    }

    const existing = db.prepare('SELECT id FROM users WHERE id = ?').get(targetUserId);
    if (!existing) throw new AppError('ไม่พบผู้ใช้งานนี้', 404);

    db.prepare('UPDATE users SET role = ? WHERE id = ?').run(role, targetUserId);
    res.json({ ok: true, message: 'Role updated' });
  },

  // PUT /api/admin/users/:id/ban (Compatibility)
  toggleUserBan: (req, res, next) => {
    const targetUserId = parseId(req.params.id, 'User ID');
    const isBanned = req.body.is_banned ? 1 : 0;

    if (targetUserId === req.session.user.id) {
      throw new AppError('ไม่สามารถระงับบัญชีของตัวเองได้', 400);
    }

    const existing = db.prepare('SELECT id FROM users WHERE id = ?').get(targetUserId);
    if (!existing) throw new AppError('ไม่พบผู้ใช้งานนี้', 404);

    db.prepare('UPDATE users SET is_banned = ? WHERE id = ?').run(isBanned, targetUserId);
    res.json({ ok: true, is_banned: isBanned });
  },

  // GET /api/admin/tags (Get unique tags & audience summary)
  getTagsSummary: (req, res, next) => {
    const users = db.prepare('SELECT id, email, name, tags FROM users').all();
    const subs = db.prepare('SELECT id, email, tags FROM newsletter_subscribers').all();

    const tagCounts = {};
    const emailsByTag = {};

    function processItem(item, type) {
      let tags = [];
      try {
        tags = JSON.parse(item.tags || '[]');
      } catch (_) {
        tags = [];
      }
      if (!Array.isArray(tags)) tags = [];

      for (const t of tags) {
        if (!t) continue;
        if (!tagCounts[t]) {
          tagCounts[t] = { tag: t, userCount: 0, subCount: 0, totalCount: 0 };
          emailsByTag[t] = new Set();
        }
        if (type === 'user') tagCounts[t].userCount++;
        if (type === 'subscriber') tagCounts[t].subCount++;
        emailsByTag[t].add(item.email.toLowerCase());
      }
    }

    users.forEach((u) => processItem(u, 'user'));
    subs.forEach((s) => processItem(s, 'subscriber'));

    const allEmails = new Set();
    users.forEach((u) => allEmails.add(u.email.toLowerCase()));
    subs.forEach((s) => allEmails.add(s.email.toLowerCase()));

    const tagsList = Object.keys(tagCounts).map((t) => ({
      tag: t,
      userCount: tagCounts[t].userCount,
      subCount: tagCounts[t].subCount,
      totalCount: emailsByTag[t].size,
    }));

    tagsList.sort((a, b) => b.totalCount - a.totalCount);

    res.json({
      tags: tagsList,
      totalUsers: users.length,
      totalSubscribers: subs.length,
      totalAudience: allEmails.size,
    });
  },

  // GET /api/admin/campaigns/audience (Preview target audience by tags)
  getAudiencePreview: (req, res, next) => {
    const rawTags = req.query.tags;
    const requestedTags = rawTags
      ? rawTags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean)
      : ['all'];

    const users = db.prepare('SELECT id, email, name, tags FROM users').all();
    const subs = db.prepare('SELECT id, email, tags FROM newsletter_subscribers').all();

    const audienceMap = new Map();

    const isAll = requestedTags.includes('all') || requestedTags.length === 0;

    function evaluateRecipient(item, type) {
      const email = item.email.toLowerCase();
      let tags = [];
      try {
        tags = JSON.parse(item.tags || '[]');
      } catch (_) {
        tags = [];
      }
      if (!Array.isArray(tags)) tags = [];

      let match = isAll;
      if (!match) {
        match = requestedTags.some((rt) => tags.includes(rt));
      }

      if (match) {
        if (!audienceMap.has(email)) {
          audienceMap.set(email, {
            email,
            name: item.name || email.split('@')[0],
            tags,
            source: type,
          });
        } else {
          // Merge tags
          const existing = audienceMap.get(email);
          existing.tags = Array.from(new Set([...existing.tags, ...tags]));
        }
      }
    }

    users.forEach((u) => evaluateRecipient(u, 'user'));
    subs.forEach((s) => evaluateRecipient(s, 'subscriber'));

    const list = Array.from(audienceMap.values());
    res.json({
      count: list.length,
      recipients: list.slice(0, 100), // Preview sample up to 100
      tags: requestedTags,
    });
  },

  // POST /api/admin/campaigns/send (Send segmented batch emails with click-tracking)
  sendMarketingCampaign: async (req, res, next) => {
    const rawTargetTags = req.body.targetTags || req.body.target_tags;
    const subject = req.body.subject;
    const headline = req.body.headline;
    const content = req.body.content;
    const ctaText = req.body.ctaText || req.body.cta_text;
    const ctaUrl = req.body.ctaUrl || req.body.cta_url;
    const ctaTag = req.body.ctaTag || req.body.cta_tag;
    const bannerBadge = req.body.bannerBadge || req.body.banner_badge;

    if (!subject || !headline || !content) {
      throw new AppError('กรุณาระบุ หัวข้ออีเมล (Subject), พาดหัว (Headline) และเนื้อหา (Content)', 400);
    }

    const cleanSubject = sanitizeString(subject);
    const cleanHeadline = sanitizeString(headline);
    const cleanCtaText = sanitizeString(ctaText || 'สำรวจข้อเสนอพิเศษ →');
    const cleanCtaUrl = sanitizeString(ctaUrl || 'http://localhost:3000/#/products');
    const cleanCtaTag = sanitizeString(ctaTag || 'Campaign-Clicked');
    const cleanBannerBadge = sanitizeString(bannerBadge || '🔥 VIP EXCLUSIVE');

    let tags = [];
    if (Array.isArray(rawTargetTags)) tags = rawTargetTags.map((t) => sanitizeString(t)).filter(Boolean);
    else if (typeof rawTargetTags === 'string' && rawTargetTags.trim()) {
      tags = rawTargetTags.split(',').map((t) => sanitizeString(t.trim())).filter(Boolean);
    }
    if (tags.length === 0) tags = ['all'];

    const isAll = tags.includes('all');

    // Collect matching recipients
    const users = db.prepare('SELECT id, email, name, tags FROM users').all();
    const subs = db.prepare('SELECT id, email, tags FROM newsletter_subscribers').all();

    const audienceMap = new Map();

    function matchAndCollect(item, type) {
      const email = item.email.toLowerCase();
      let itemTags = [];
      try {
        itemTags = JSON.parse(item.tags || '[]');
      } catch (_) {
        itemTags = [];
      }
      if (!Array.isArray(itemTags)) itemTags = [];

      let match = isAll;
      if (!match) {
        match = tags.some((rt) => itemTags.includes(rt));
      }

      if (match && !audienceMap.has(email)) {
        audienceMap.set(email, {
          email,
          name: item.name || email.split('@')[0],
          tags: itemTags,
        });
      }
    }

    users.forEach((u) => matchAndCollect(u, 'user'));
    subs.forEach((s) => matchAndCollect(s, 'subscriber'));

    const recipients = Array.from(audienceMap.values());
    if (recipients.length === 0) {
      throw new AppError('ไม่พบกลุ่มเป้าหมายที่ตรงกับแท็กที่เลือก', 400);
    }

    const { sendCampaignEmail } = require('../utils/mailer');
    const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

    let sentCount = 0;
    let failedCount = 0;

    // Dispatch emails (concurrently with Promise.allSettled)
    const dispatchPromises = recipients.map(async (rec) => {
      // Build dynamic click tracking URL
      const trackingUrl = `${SITE_URL}/api/track/click?email=${encodeURIComponent(rec.email)}&tag=${encodeURIComponent(cleanCtaTag)}&redirect=${encodeURIComponent(cleanCtaUrl)}`;

      try {
        const result = await sendCampaignEmail({
          toEmail: rec.email,
          name: rec.name,
          subject: cleanSubject,
          headline: cleanHeadline,
          content: content,
          ctaText: cleanCtaText,
          ctaTrackingUrl: trackingUrl,
          bannerBadge: cleanBannerBadge,
        });

        if (result.success || result.simulated) sentCount++;
        else failedCount++;
      } catch (err) {
        failedCount++;
      }
    });

    await Promise.allSettled(dispatchPromises);

    res.json({
      ok: true,
      success: true,
      message: `ส่งแคมเปญสำเร็จ ${sentCount} รายการ (ไม่สำเร็จ ${failedCount})`,
      totalTargeted: recipients.length,
      sentCount,
      failedCount,
      tagsUsed: tags,
      ctaTag: cleanCtaTag,
    });
  },
};

module.exports = adminController;

