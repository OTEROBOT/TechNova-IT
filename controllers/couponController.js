/**
 * ============================================================================
 *  controllers/couponController.js — Promotional Discounts & Coupon Engine
 * ============================================================================
 */

const db = require('../db/init');
const { AppError } = require('../middleware/errorHandler');
const { parseId, parseNumber, sanitizeString, validateEnum } = require('../middleware/validator');

const couponController = {
  // GET /api/coupons (Admin)
  getAll: (req, res, next) => {
    const coupons = db.prepare('SELECT * FROM coupons ORDER BY id DESC').all();
    res.json(coupons);
  },

  // POST /api/coupons (Admin)
  create: (req, res, next) => {
    const code = sanitizeString(req.body.code).toUpperCase();
    const type = validateEnum(req.body.type, ['percent', 'fixed'], 'Coupon Type');
    const value = parseNumber(req.body.value, 'Discount Value', 0);
    const min_order = req.body.min_order ? parseNumber(req.body.min_order, 'Min Order', 0) : 0;
    const usage_limit = req.body.usage_limit ? parseInt(req.body.usage_limit, 10) : null;
    const expires_at = req.body.expires_at ? sanitizeString(req.body.expires_at) : null;

    if (!code) throw new AppError('กรุณาระบุโค้ดส่วนลด', 400);

    const existing = db.prepare('SELECT id FROM coupons WHERE code = ?').get(code);
    if (existing) throw new AppError('มีรหัสคูปองนี้อยู่ในระบบแล้ว', 400);

    const info = db
      .prepare(
        'INSERT INTO coupons (code, type, value, min_order, usage_limit, expires_at) VALUES (?, ?, ?, ?, ?, ?)'
      )
      .run(code, type, value, min_order, usage_limit, expires_at);

    res.status(201).json({ id: info.lastInsertRowid });
  },

  // PUT /api/coupons/:id (Admin)
  update: (req, res, next) => {
    const couponId = parseId(req.params.id, 'Coupon ID');
    const type = validateEnum(req.body.type, ['percent', 'fixed'], 'Coupon Type');
    const value = parseNumber(req.body.value, 'Discount Value', 0);
    const min_order = req.body.min_order ? parseNumber(req.body.min_order, 'Min Order', 0) : 0;
    const usage_limit = req.body.usage_limit ? parseInt(req.body.usage_limit, 10) : null;
    const expires_at = req.body.expires_at ? sanitizeString(req.body.expires_at) : null;
    const active = req.body.active ? 1 : 0;

    const existing = db.prepare('SELECT id FROM coupons WHERE id = ?').get(couponId);
    if (!existing) throw new AppError('ไม่พบข้อมูลคูปองนี้', 404);

    db.prepare(
      `UPDATE coupons SET type=?, value=?, min_order=?, usage_limit=?, expires_at=?, active=? WHERE id=?`
    ).run(type, value, min_order, usage_limit, expires_at, active, couponId);

    res.json({ ok: true });
  },

  // DELETE /api/coupons/:id (Admin)
  delete: (req, res, next) => {
    const couponId = parseId(req.params.id, 'Coupon ID');
    const existing = db.prepare('SELECT id FROM coupons WHERE id = ?').get(couponId);
    if (!existing) throw new AppError('ไม่พบข้อมูลคูปองนี้', 404);

    db.prepare('DELETE FROM coupons WHERE id = ?').run(couponId);
    res.json({ ok: true });
  },

  // POST /api/coupons/validate (Customer)
  validate: (req, res, next) => {
    const code = sanitizeString(req.body.code).toUpperCase();
    const orderTotal = parseNumber(req.body.orderTotal, 'Order Total', 0);

    if (!code) throw new AppError('กรุณาระบุโค้ดส่วนลด', 400);

    const coupon = db.prepare('SELECT * FROM coupons WHERE code = ? AND active = 1').get(code);
    if (!coupon) throw new AppError('ไม่พบโค้ดส่วนลดนี้ หรือถูกปิดการใช้งานแล้ว', 400);

    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      throw new AppError('โค้ดส่วนลดนี้หมดอายุการใช้งานแล้ว', 400);
    }
    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      throw new AppError('โค้ดส่วนลดนี้ถูกใช้ครบตามจำนวนสิทธิ์แล้ว', 400);
    }
    if (orderTotal < coupon.min_order) {
      throw new AppError(`ยอดสั่งซื้อขั้นต่ำสำหรับโค้ดนี้คือ ฿${coupon.min_order.toLocaleString()}`, 400);
    }

    const discount = coupon.type === 'percent' ? (orderTotal * coupon.value) / 100 : coupon.value;
    res.json({
      code: coupon.code,
      discount: Math.min(discount, orderTotal),
      type: coupon.type,
      value: coupon.value,
    });
  },
};

module.exports = couponController;
