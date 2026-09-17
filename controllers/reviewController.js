/**
 * ============================================================================
 *  controllers/reviewController.js — Customer Reviews & Verified Ratings
 * ============================================================================
 */

const db = require('../db/init');
const { AppError } = require('../middleware/errorHandler');
const { parseId, parseNumber, sanitizeString } = require('../middleware/validator');

const reviewController = {
  // GET /api/reviews/product/:productId
  getByProduct: (req, res, next) => {
    const productId = parseId(req.params.productId, 'Product ID');
    const reviews = db
      .prepare(
        `SELECT r.*, u.name AS user_name, u.avatar AS user_avatar
         FROM reviews r
         JOIN users u ON r.user_id = u.id
         WHERE r.product_id = ?
         ORDER BY r.created_at DESC`
      )
      .all(productId);
    res.json(reviews);
  },

  // POST /api/reviews
  create: (req, res, next) => {
    const productId = parseId(req.body.product_id, 'Product ID');
    const rating = parseNumber(req.body.rating, 'Rating', 1, 5);
    const comment = sanitizeString(req.body.comment);
    const userId = req.session.user.id;

    // Verified purchase check
    const purchased = db
      .prepare(
        `SELECT oi.id FROM order_items oi
         JOIN orders o ON oi.order_id = o.id
         WHERE o.user_id = ? AND oi.product_id = ?
         LIMIT 1`
      )
      .get(userId, productId);

    if (!purchased) {
      throw new AppError('คุณสามารถเขียนรีวิวได้เฉพาะสินค้าที่เคยสั่งซื้อจริงเท่านั้น', 403);
    }

    // 1 review per product per user (Update existing or Insert new)
    const existing = db
      .prepare('SELECT id FROM reviews WHERE product_id = ? AND user_id = ?')
      .get(productId, userId);

    if (existing) {
      db.prepare('UPDATE reviews SET rating = ?, comment = ? WHERE id = ?').run(
        rating,
        comment || '',
        existing.id
      );
      return res.json({ id: existing.id, updated: true });
    }

    const info = db
      .prepare('INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)')
      .run(productId, userId, rating, comment || '');

    res.status(201).json({ id: info.lastInsertRowid });
  },

  // DELETE /api/reviews/:id
  delete: (req, res, next) => {
    const reviewId = parseId(req.params.id, 'Review ID');
    const review = db.prepare('SELECT * FROM reviews WHERE id = ?').get(reviewId);
    if (!review) throw new AppError('ไม่พบรีวิวนี้', 404);

    const isOwner = review.user_id === req.session.user.id;
    const isAdmin = req.session.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      throw new AppError('ไม่มีสิทธิ์ลบรีวิวนี้', 403);
    }

    db.prepare('DELETE FROM reviews WHERE id = ?').run(reviewId);
    res.json({ ok: true });
  },
};

module.exports = reviewController;
