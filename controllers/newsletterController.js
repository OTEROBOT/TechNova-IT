/**
 * ============================================================================
 *  controllers/newsletterController.js — Newsletter Subscription Engine
 * ============================================================================
 */

const db = require('../db/init');
const { AppError } = require('../middleware/errorHandler');
const { sanitizeString, isValidEmail } = require('../middleware/validator');
const { sendNewsletterWelcomeEmail } = require('../utils/mailer');

const newsletterController = {
  // POST /api/subscribe or POST /api/newsletter/subscribe
  subscribe: async (req, res, next) => {
    const rawEmail = req.body?.email;
    const email = sanitizeString(rawEmail).toLowerCase();

    if (!email) {
      throw new AppError('กรุณาระบุอีเมลสำหรับการติดตามข่าวสาร', 400);
    }
    if (!isValidEmail(email)) {
      throw new AppError('รูปแบบอีเมลไม่ถูกต้อง กรุณาระบุอีเมลที่ถูกต้อง เช่น user@example.com', 400);
    }

    // Check if already subscribed
    const existing = db.prepare('SELECT id, email FROM newsletter_subscribers WHERE email = ?').get(email);
    let subscriberId = existing?.id;

    if (existing) {
      // Re-subscription: update timestamp
      db.prepare("UPDATE newsletter_subscribers SET created_at = datetime('now') WHERE id = ?").run(existing.id);
    } else {
      // Fresh subscription: insert record
      const info = db.prepare('INSERT INTO newsletter_subscribers (email) VALUES (?)').run(email);
      subscriberId = info.lastInsertRowid;
    }

    // Always send/re-send welcome email dispatch upon valid subscription event
    sendNewsletterWelcomeEmail(email).catch((err) => {
      console.error('[Newsletter Mail Error]', err.message);
    });

    if (existing) {
      return res.status(200).json({
        ok: true,
        id: subscriberId,
        message: 'คุณได้ลงทะเบียนรับข่าวสารเรียบร้อยแล้ว ระบบได้จัดส่งอีเมลต้อนรับให้อีกครั้ง ขอบคุณที่ไว้วางใจ TechNova IT',
        alreadySubscribed: true,
        reSubscribed: true,
      });
    }

    res.status(201).json({
      ok: true,
      id: subscriberId,
      message: 'Subscribed successfully',
    });
  },

  // GET /api/newsletter/subscribers (Admin)
  getSubscribers: (req, res, next) => {
    const subscribers = db.prepare('SELECT * FROM newsletter_subscribers ORDER BY created_at DESC').all();
    res.json(subscribers);
  },

  // DELETE /api/newsletter/subscribers/:id (Admin)
  deleteSubscriber: (req, res, next) => {
    const param = req.params.id;
    let info;
    if (/^\d+$/.test(param)) {
      info = db.prepare('DELETE FROM newsletter_subscribers WHERE id = ?').run(parseInt(param, 10));
    } else {
      const email = sanitizeString(param).toLowerCase();
      info = db.prepare('DELETE FROM newsletter_subscribers WHERE email = ?').run(email);
    }
    res.json({ ok: true, message: 'Subscriber removed successfully', changes: info.changes });
  },
};

module.exports = newsletterController;
