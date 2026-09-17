/**
 * ============================================================================
 *  controllers/categoryController.js — Showroom Category Management
 * ============================================================================
 */

const db = require('../db/init');
const { AppError } = require('../middleware/errorHandler');
const { parseId, sanitizeString } = require('../middleware/validator');

const categoryController = {
  // GET /api/categories
  getAll: (req, res, next) => {
    const categories = db.prepare('SELECT * FROM categories ORDER BY id ASC').all();
    res.json(categories);
  },

  // POST /api/categories
  create: (req, res, next) => {
    const name = sanitizeString(req.body.name);
    if (!name) throw new AppError('กรุณากรอกชื่อหมวดหมู่', 400);

    const info = db.prepare('INSERT INTO categories (name) VALUES (?)').run(name);
    res.status(201).json({ id: info.lastInsertRowid });
  },

  // PUT /api/categories/:id
  update: (req, res, next) => {
    const catId = parseId(req.params.id, 'Category ID');
    const name = sanitizeString(req.body.name);
    if (!name) throw new AppError('กรุณากรอกชื่อหมวดหมู่', 400);

    const existing = db.prepare('SELECT id FROM categories WHERE id = ?').get(catId);
    if (!existing) throw new AppError('ไม่พบหมวดหมู่นี้', 404);

    db.prepare('UPDATE categories SET name = ? WHERE id = ?').run(name, catId);
    res.json({ ok: true });
  },

  // DELETE /api/categories/:id
  delete: (req, res, next) => {
    const catId = parseId(req.params.id, 'Category ID');
    const productCount = db
      .prepare('SELECT COUNT(*) AS c FROM products WHERE category_id = ?')
      .get(catId)?.c || 0;

    if (productCount > 0) {
      throw new AppError(`ลบไม่ได้ เนื่องจากยังมีสินค้าอยู่ในหมวดนี้ ${productCount} รายการ`, 400);
    }

    db.prepare('DELETE FROM categories WHERE id = ?').run(catId);
    res.json({ ok: true });
  },
};

module.exports = categoryController;
