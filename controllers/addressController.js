/**
 * ============================================================================
 *  controllers/addressController.js — Customer Address Book Management
 * ============================================================================
 */

const db = require('../db/init');
const { AppError } = require('../middleware/errorHandler');
const { parseId, sanitizeString } = require('../middleware/validator');

const addressController = {
  // GET /api/addresses
  getAll: (req, res, next) => {
    const addresses = db
      .prepare('SELECT * FROM addresses WHERE user_id = ? ORDER BY is_default DESC, id DESC')
      .all(req.session.user.id);
    res.json(addresses);
  },

  // POST /api/addresses
  create: (req, res, next) => {
    const recipient_name = sanitizeString(req.body.recipient_name);
    const phone = sanitizeString(req.body.phone);
    const address_line = sanitizeString(req.body.address_line);
    const subdistrict = sanitizeString(req.body.subdistrict);
    const district = sanitizeString(req.body.district);
    const province = sanitizeString(req.body.province);
    const postal_code = sanitizeString(req.body.postal_code);

    if (!recipient_name || !phone || !address_line) {
      throw new AppError('กรุณากรอกชื่อผู้รับ เบอร์โทรศัพท์ และที่อยู่ให้ครบถ้วน', 400);
    }

    const userId = req.session.user.id;
    const isFirst = db.prepare('SELECT COUNT(*) AS c FROM addresses WHERE user_id = ?').get(userId).c === 0;

    const info = db
      .prepare(
        `INSERT INTO addresses (user_id, recipient_name, phone, address_line, subdistrict, district, province, postal_code, is_default)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        userId,
        recipient_name,
        phone,
        address_line,
        subdistrict || '',
        district || '',
        province || '',
        postal_code || '',
        isFirst ? 1 : 0
      );

    res.status(201).json({ id: info.lastInsertRowid });
  },

  // PUT /api/addresses/:id
  update: (req, res, next) => {
    const addressId = parseId(req.params.id, 'Address ID');
    const userId = req.session.user.id;

    const existing = db.prepare('SELECT id FROM addresses WHERE id = ? AND user_id = ?').get(addressId, userId);
    if (!existing) throw new AppError('ไม่พบที่อยู่นี้', 404);

    const recipient_name = sanitizeString(req.body.recipient_name);
    const phone = sanitizeString(req.body.phone);
    const address_line = sanitizeString(req.body.address_line);
    const subdistrict = sanitizeString(req.body.subdistrict);
    const district = sanitizeString(req.body.district);
    const province = sanitizeString(req.body.province);
    const postal_code = sanitizeString(req.body.postal_code);

    if (!recipient_name || !phone || !address_line) {
      throw new AppError('กรุณากรอกชื่อผู้รับ เบอร์โทรศัพท์ และที่อยู่ให้ครบถ้วน', 400);
    }

    db.prepare(
      `UPDATE addresses SET recipient_name=?, phone=?, address_line=?, subdistrict=?, district=?, province=?, postal_code=?
       WHERE id = ? AND user_id = ?`
    ).run(recipient_name, phone, address_line, subdistrict, district, province, postal_code, addressId, userId);

    res.json({ ok: true });
  },

  // DELETE /api/addresses/:id
  delete: (req, res, next) => {
    const addressId = parseId(req.params.id, 'Address ID');
    const userId = req.session.user.id;

    const existing = db.prepare('SELECT id FROM addresses WHERE id = ? AND user_id = ?').get(addressId, userId);
    if (!existing) throw new AppError('ไม่พบที่อยู่นี้', 404);

    db.prepare('DELETE FROM addresses WHERE id = ? AND user_id = ?').run(addressId, userId);
    res.json({ ok: true });
  },

  // PUT /api/addresses/:id/default
  setDefault: (req, res, next) => {
    const addressId = parseId(req.params.id, 'Address ID');
    const userId = req.session.user.id;

    const existing = db.prepare('SELECT id FROM addresses WHERE id = ? AND user_id = ?').get(addressId, userId);
    if (!existing) throw new AppError('ไม่พบที่อยู่นี้', 404);

    db.transaction(() => {
      db.prepare('UPDATE addresses SET is_default = 0 WHERE user_id = ?').run(userId);
      db.prepare('UPDATE addresses SET is_default = 1 WHERE id = ? AND user_id = ?').run(addressId, userId);
    })();

    res.json({ ok: true });
  },
};

module.exports = addressController;
