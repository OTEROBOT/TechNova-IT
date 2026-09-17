/**
 * ============================================================================
 *  controllers/authController.js — User Authentication & Account Management
 * ============================================================================
 */

const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');
const db = require('../db/init');
const { AppError } = require('../middleware/errorHandler');
const { sanitizeString, isValidEmail } = require('../middleware/validator');
const { uploadAvatar } = require('../utils/upload');
const { sendResetPasswordEmail, sendRegistrationWelcomeEmail } = require('../utils/mailer');

const BCRYPT_SALT_ROUNDS = db.SALT_ROUNDS || 12;

function publicUser(user) {
  if (!user) return null;
  let parsedTags = [];
  try {
    parsedTags = JSON.parse(user.tags || '[]');
  } catch (_) {
    parsedTags = [];
  }
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    avatar: user.avatar,
    role: user.role,
    primary_interest: user.primary_interest || null,
    setup_style: user.setup_style || null,
    subscribed_topics: user.subscribed_topics || null,
    birth_date: user.birth_date || null,
    gender: user.gender || null,
    referral_source: user.referral_source || null,
    tags: parsedTags,
    created_at: user.created_at,
  };
}

const authController = {
  // POST /api/auth/register
  register: (req, res, next) => {
    const email = sanitizeString(req.body.email).toLowerCase();
    const name = sanitizeString(req.body.name);
    const phone = sanitizeString(req.body.phone);
    const password = req.body.password;

    // Tech Profile Preferences (3-Step Setup Wizard)
    const techPrefs = req.body.tech_preferences || req.body.techPreferences || {};
    const primary_interest = sanitizeString(req.body.primary_interest || req.body.primaryInterest || techPrefs.primary_interest || techPrefs.primaryInterest);
    const setup_style = sanitizeString(req.body.setup_style || req.body.setupStyle || techPrefs.setup_style || techPrefs.desk_style || techPrefs.setupStyle);
    let subscribed_topics = req.body.subscribed_topics || req.body.subscribedTopics || techPrefs.subscribed_topics || techPrefs.subscribedTopics;
    if (Array.isArray(subscribed_topics)) {
      subscribed_topics = JSON.stringify(subscribed_topics.map((t) => sanitizeString(t)).filter(Boolean));
    } else if (typeof subscribed_topics === 'string' && subscribed_topics.trim()) {
      subscribed_topics = sanitizeString(subscribed_topics);
    } else {
      subscribed_topics = null;
    }

    const birth_date = sanitizeString(req.body.birth_date || req.body.birthDate || techPrefs.birth_date);
    const gender = sanitizeString(req.body.gender || techPrefs.gender);
    const referral_source = sanitizeString(req.body.referral_source || req.body.referralSource || techPrefs.referral_source);

    // Initial Registration Tags
    const initialTags = ['Registered-Client'];
    if (primary_interest) {
      const interestTag =
        primary_interest === 'custom_desk'
          ? 'Interested-Custom-Desk'
          : `Interested-${primary_interest.charAt(0).toUpperCase() + primary_interest.slice(1)}`;
      initialTags.push(interestTag);
    }

    if (!email || !password || !name) {
      throw new AppError('กรุณากรอกข้อมูลให้ครบถ้วน (อีเมล, ชื่อ, รหัสผ่าน)', 400);
    }
    if (!isValidEmail(email)) {
      throw new AppError('รูปแบบอีเมลไม่ถูกต้อง', 400);
    }
    if (typeof password !== 'string' || password.length < 6) {
      throw new AppError('รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร', 400);
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      throw new AppError('อีเมลนี้ถูกใช้งานในระบบแล้ว', 400);
    }

    const hash = bcrypt.hashSync(password, BCRYPT_SALT_ROUNDS);
    const info = db
      .prepare(
        `INSERT INTO users (
          email, password, name, phone, role,
          primary_interest, setup_style, subscribed_topics,
          birth_date, gender, referral_source, tags
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        email,
        hash,
        name,
        phone || null,
        'customer',
        primary_interest || null,
        setup_style || null,
        subscribed_topics || null,
        birth_date || null,
        gender || null,
        referral_source || null,
        JSON.stringify(initialTags)
      );

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid);
    req.session.user = publicUser(user);

    // Send personalized asynchronous welcome email on registration
    sendRegistrationWelcomeEmail(email, name, {
      primary_interest,
      setup_style,
      subscribed_topics,
    }).catch((err) => {
      console.error('[Registration Mail Error]', err.message);
    });

    res.status(201).json({ user: req.session.user, message: 'ลงทะเบียนสำเร็จ' });
  },

  // POST /api/auth/login
  login: (req, res, next) => {
    const email = sanitizeString(req.body.email).toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      throw new AppError('กรุณากรอกอีเมลและรหัสผ่าน', 400);
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new AppError('อีเมลหรือรหัสผ่านไม่ถูกต้อง', 401);
    }
    if (user.is_banned) {
      throw new AppError('บัญชีนี้ถูกระงับการใช้งาน กรุณาติดต่อผู้ดูแลระบบ', 403);
    }

    req.session.user = publicUser(user);
    res.json({ user: req.session.user });
  },

  // POST /api/auth/logout
  logout: (req, res, next) => {
    req.session.destroy((err) => {
      if (err) return next(new AppError('เกิดข้อผิดพลาดในการออกจากระบบ', 500));
      res.clearCookie('connect.sid');
      res.json({ ok: true });
    });
  },

  // GET /api/auth/me
  getMe: (req, res, next) => {
    if (!req.session.user) {
      return res.json({ user: null });
    }
    const freshUser = db.prepare('SELECT * FROM users WHERE id = ?').get(req.session.user.id);
    if (!freshUser) {
      req.session.user = null;
      return res.json({ user: null });
    }
    req.session.user = publicUser(freshUser);
    res.json({ user: req.session.user });
  },

  // POST /api/auth/forgot-password
  forgotPassword: async (req, res, next) => {
    try {
      const email = sanitizeString(req.body.email).toLowerCase();
      if (!email) throw new AppError('กรุณาระบุอีเมล', 400);

      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

      // Defend against user enumeration by returning consistent response
      if (!user) {
        return res.json({
          ok: true,
          message: 'ถ้าอีเมลนี้มีอยู่ในระบบ เราได้ส่งลิงก์รีเซ็ตไปให้แล้ว',
        });
      }

      const token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
      db.prepare('UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?').run(
        token,
        expires,
        user.id
      );

      const result = await sendResetPasswordEmail(user.email, token);
      res.json({
        ok: true,
        message: 'ถ้าอีเมลนี้มีอยู่ในระบบ เราได้ส่งลิงก์รีเซ็ตไปให้แล้ว',
        devResetLink: result.simulated ? result.resetLink : undefined,
      });
    } catch (err) {
      next(err);
    }
  },

  // POST /api/auth/reset-password
  resetPassword: (req, res, next) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      throw new AppError('ข้อมูลไม่ครบถ้วน', 400);
    }
    if (typeof newPassword !== 'string' || newPassword.length < 6) {
      throw new AppError('รหัสผ่านใหม่ต้องยาวอย่างน้อย 6 ตัวอักษร', 400);
    }

    const user = db.prepare('SELECT * FROM users WHERE reset_token = ?').get(token);
    if (!user) {
      throw new AppError('ลิงก์รีเซ็ตไม่ถูกต้องหรือถูกใช้ไปแล้ว', 400);
    }
    if (new Date(user.reset_token_expires) < new Date()) {
      throw new AppError('ลิงก์รีเซ็ตนี้หมดอายุแล้ว กรุณาขอลิงก์ใหม่', 400);
    }

    const hash = bcrypt.hashSync(newPassword, BCRYPT_SALT_ROUNDS);
    db.prepare('UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?').run(
      hash,
      user.id
    );

    res.json({ ok: true, message: 'ตั้งรหัสผ่านใหม่สำเร็จแล้ว กรุณาเข้าสู่ระบบ' });
  },

  // PUT /api/auth/change-password
  changePassword: (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      throw new AppError('กรุณากรอกรหัสผ่านเดิมและรหัสผ่านใหม่', 400);
    }
    if (typeof newPassword !== 'string' || newPassword.length < 6) {
      throw new AppError('รหัสผ่านใหม่ต้องยาวอย่างน้อย 6 ตัวอักษร', 400);
    }

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.session.user.id);
    if (!user || !bcrypt.compareSync(currentPassword, user.password)) {
      throw new AppError('รหัสผ่านเดิมไม่ถูกต้อง', 400);
    }

    const hash = bcrypt.hashSync(newPassword, BCRYPT_SALT_ROUNDS);
    db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hash, user.id);
    res.json({ ok: true });
  },

  // PUT /api/auth/profile
  updateProfile: (req, res, next) => {
    uploadAvatar(req, res, (err) => {
      if (err) return next(err);

      try {
        const name = sanitizeString(req.body.name);
        const phone = sanitizeString(req.body.phone);
        const userId = req.session.user.id;

        if (!name) throw new AppError('กรุณาระบุชื่อผู้ใช้งาน', 400);

        if (req.file) {
          const oldUser = db.prepare('SELECT avatar FROM users WHERE id = ?').get(userId);
          if (oldUser && oldUser.avatar && !oldUser.avatar.startsWith('http')) {
            const oldPath = path.join(__dirname, '..', 'public', oldUser.avatar);
            fs.unlink(oldPath, () => {});
          }
          const avatarPath = `/uploads/avatars/${req.file.filename}`;
          db.prepare('UPDATE users SET name = ?, phone = ?, avatar = ? WHERE id = ?').run(
            name,
            phone || null,
            avatarPath,
            userId
          );
        } else {
          db.prepare('UPDATE users SET name = ?, phone = ? WHERE id = ?').run(
            name,
            phone || null,
            userId
          );
        }

        const updated = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
        req.session.user = publicUser(updated);
        res.json({ user: req.session.user });
      } catch (innerErr) {
        next(innerErr);
      }
    });
  },
};

module.exports = authController;
