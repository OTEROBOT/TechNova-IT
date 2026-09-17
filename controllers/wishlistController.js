/**
 * ============================================================================
 *  controllers/wishlistController.js — Customer Curated Wishlist
 * ============================================================================
 */

const db = require('../db/init');
const { AppError } = require('../middleware/errorHandler');
const { parseId } = require('../middleware/validator');

const wishlistController = {
  // GET /api/wishlist
  getAll: (req, res, next) => {
    const items = db
      .prepare(
        `SELECT w.id AS wishlist_id, p.*
         FROM wishlist w
         JOIN products p ON w.product_id = p.id
         WHERE w.user_id = ?
         ORDER BY w.created_at DESC`
      )
      .all(req.session.user.id);
    res.json(items);
  },

  // POST /api/wishlist
  add: (req, res, next) => {
    const productId = parseId(req.body.product_id, 'Product ID');
    const userId = req.session.user.id;

    const product = db.prepare('SELECT id FROM products WHERE id = ?').get(productId);
    if (!product) throw new AppError('ไม่พบสินค้านี้', 404);

    const existing = db
      .prepare('SELECT id FROM wishlist WHERE user_id = ? AND product_id = ?')
      .get(userId, productId);

    if (existing) {
      return res.json({ ok: true, alreadyExists: true });
    }

    db.prepare('INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)').run(userId, productId);
    res.status(201).json({ ok: true });
  },

  // DELETE /api/wishlist/:productId
  remove: (req, res, next) => {
    const productId = parseId(req.params.productId, 'Product ID');
    const userId = req.session.user.id;

    db.prepare('DELETE FROM wishlist WHERE user_id = ? AND product_id = ?').run(userId, productId);
    res.json({ ok: true });
  },
};

module.exports = wishlistController;
